async function fetchAllSpotSymbols() {
  const url = 'https://api.binance.com/api/v3/exchangeInfo';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const activeSymbols = data.symbols.filter(s => s.status === 'TRADING');
    const filtered = activeSymbols.filter(s =>
      ['ETH'].includes(s.quoteAsset)
    );
    return filtered.map(s => ({
      base: s.baseAsset,
      quote: s.quoteAsset,
      symbol: s.symbol
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des symboles :", error);
    return [];
  }
}

async function fetchCryptoData(symbol, base, quote) {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=30m&limit=7`);
    const data = await response.json();

    if (data.length !== 7) return;

    let totalVariation = 0;
    const tbody = document.querySelector("#cryptoTable tbody");
    const row = document.createElement("tr");
    row.id = symbol;

    const labelCell = document.createElement("td");
    labelCell.textContent = `${base}/${quote}`;
    row.appendChild(labelCell);

    let motif = '';

    for (let i = 0; i < 7; i++) {
      const open = parseFloat(data[i][1]);
      const close = parseFloat(data[i][4]);
      const variation = ((close - open) / open) * 100;
      const cell = document.createElement("td");
      const val = variation.toFixed(2);
      cell.textContent = `${val}%`;

      if (variation > 0) {
        cell.classList.add("positive");
        motif += '+';
      } else if (variation < 0) {
        cell.classList.add("negative");
        motif += '-';
      } else {
        motif += '0';
      }

      row.appendChild(cell);
      totalVariation += variation;
    }

    row.setAttribute('data-motif', motif);

    const totalCell = document.createElement("td");
    totalCell.textContent = `${totalVariation.toFixed(2)}%`;
    totalCell.style.textAlign = "center";
    if (totalVariation > 0) {
      totalCell.classList.add("positive");
    } else {
      totalCell.classList.add("negative");
    }
    row.appendChild(totalCell);

    tbody.appendChild(row);
  } catch (err) {
    console.error(`Erreur pour ${symbol} :`, err);
  }
}

let allSymbols = [];

async function loadAll() {
  document.querySelector("#cryptoTable tbody").innerHTML = '';
  document.getElementById("cryptoNames").innerHTML = '';
  document.getElementById("resultCount").textContent = 'Chargement...';

  allSymbols = await fetchAllSpotSymbols();

  for (let { symbol, base, quote } of allSymbols) {
    await fetchCryptoData(symbol, base, quote);
  }

  const loadedCount = document.querySelectorAll("#cryptoTable tbody tr").length;
  document.getElementById("resultCount").textContent = `${loadedCount} paires chargées`;
}

function filterPattern() {
  const pattern = document.getElementById("patternInput").value.trim();
  if (pattern.length !== 7 || !/^[+-]+$/.test(pattern)) {
    alert("Veuillez entrer exactement 7 caractères (+ ou -).");
    return;
  }

  let count = 0;
  document.querySelectorAll("#cryptoTable tbody tr").forEach(row => {
    const motif = row.getAttribute('data-motif');
    if (motif === pattern) {
      row.style.display = '';
      count++;
    } else {
      row.style.display = 'none';
    }
  });

  document.getElementById("resultCount").textContent = `${count} résultat(s) trouvé(s)`;
}

function resetTable() {
  document.querySelectorAll("#cryptoTable tbody tr").forEach(row => {
    row.style.display = '';
  });
  document.getElementById("resultCount").textContent = '';
}

document.getElementById("loadButton").addEventListener("click", loadAll);
document.getElementById("filterButton").addEventListener("click", filterPattern);
document.getElementById("resetButton").addEventListener("click", resetTable);




function mettreAJourHeure() {
  var elementHeure = document.getElementById("heure");
  var maintenant = new Date();

  // Créer une copie de l'heure actuelle
  var heureActuelle = new Date(maintenant);

  // Ajouter 3 heures et 20 minutes à l'heure actuelle
  maintenant.setHours(maintenant.getHours() + 3);
  maintenant.setMinutes(maintenant.getMinutes() + 20);

  var heuresMaintenant = maintenant.getHours();
  var minutesMaintenant = maintenant.getMinutes();
  var secondesMaintenant = maintenant.getSeconds();

  var heuresActuelle = heureActuelle.getHours();
  var minutesActuelle = heureActuelle.getMinutes();
  var secondesActuelle = heureActuelle.getSeconds();

  // Ajouter un zéro devant les chiffres < 10
  heuresMaintenant =
    heuresMaintenant < 10 ? "0" + heuresMaintenant : heuresMaintenant;
  minutesMaintenant =
    minutesMaintenant < 10 ? "0" + minutesMaintenant : minutesMaintenant;
  secondesMaintenant =
    secondesMaintenant < 10 ? "0" + secondesMaintenant : secondesMaintenant;

  heuresActuelle = heuresActuelle < 10 ? "0" + heuresActuelle : heuresActuelle;
  minutesActuelle =
    minutesActuelle < 10 ? "0" + minutesActuelle : minutesActuelle;
  secondesActuelle =
    secondesActuelle < 10 ? "0" + secondesActuelle : secondesActuelle;

  // Mettre à jour le contenu de l'élément avec les deux heures
  elementHeure.innerHTML =
    heuresActuelle + ":" + minutesActuelle + ":" + secondesActuelle;
}

// Appeler la fonction pour mettre à jour l'heure
mettreAJourHeure();
