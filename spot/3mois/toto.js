async function fetchAllSpotSymbols() {
  const url = 'https://api.binance.com/api/v3/exchangeInfo';
  try {
    const response = await fetch(url);
    const data = await response.json();

    // On filtre uniquement les paires SPOT qui sont actives
    const activeSymbols = data.symbols.filter(s => s.status === 'TRADING');

    // Exemple : pour chaque paire qui se termine par USDT, BUSD, TUSD, USDC, BTC, ETH, etc.
    const filtered = activeSymbols.filter(s => 
      ['USDT', 'USDC', 'BUSD', 'TUSD', 'BTC', 'ETH', 'FDUSD', 'DAI', 'EUR', 'TRY', 'BNB'].includes(s.quoteAsset)
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
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1w&limit=7`
    );
    const data = await response.json();

    let totalVariation = 0;
    const cryptoRow = document.getElementById(symbol) || document.createElement("tr");
    cryptoRow.id = symbol;

    const labelCell = document.createElement("td");
    labelCell.textContent = `${base}/${quote}`;
    cryptoRow.appendChild(labelCell);

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
      const variationCell = document.createElement("td");
      const variationValue = weeklyVariation.toFixed(2);

      const weekStartDate = new Date(data[i][0]);
      const weekEndDate = new Date(data[i][6]);
      const optionsStart = {
        year: "2-digit", month: "2-digit", day: "2-digit",
        hour: "numeric", minute: "numeric",
      };
      const optionsEnd = { hour: "numeric", minute: "numeric" };

      variationCell.textContent = `${weekStartDate.toLocaleDateString("fr-FR", optionsStart)} (${weekStartDate.toLocaleTimeString("fr-FR", optionsEnd)}) - ${weekEndDate.toLocaleDateString("fr-FR", optionsStart)} (${weekEndDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;

      if (weeklyVariation > 0) {
        variationCell.classList.add("positive");
      } else if (weeklyVariation < 0) {
        variationCell.classList.add("negative");
      }

      cryptoRow.appendChild(variationCell);
      totalVariation += weeklyVariation;
    }

    const totalCell = document.createElement("td");
    const totalValue = totalVariation.toFixed(2);
    totalCell.textContent = `${totalValue}%`;
    totalCell.style.textAlign = "center";
    cryptoRow.appendChild(totalCell);

    const table = document.getElementById("cryptoTable");
    table.appendChild(cryptoRow);

    const cryptoNamesElement = document.getElementById("cryptoNames");
    if (totalVariation >= -79.99 && totalVariation <= -70.0) {
      totalCell.classList.add("positive");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
    } else if (totalVariation < 0) {
      totalCell.classList.add("negative");
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}

async function loadAll() {
  const symbols = await fetchAllSpotSymbols();
  for (let { symbol, base, quote } of symbols) {
    await fetchCryptoData(symbol, base, quote);
  }
}

document.getElementById("loadButton").addEventListener("click", loadAll);




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
