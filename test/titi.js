function initDates() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  let startDate;
  if (currentMonth < 6) {
    startDate = new Date(currentYear, 0, 1);
  } else {
    startDate = new Date(currentYear, 6, 1);
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  document.getElementById('startDate').value = formatDate(startDate);
  document.getElementById('endDate').value = formatDate(today);
}

async function fetchCryptoData(symbol, startDateStr, endDateStr) {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1M&limit=6`);
    const data = await response.json();

    const cryptoRow = document.getElementById(symbol);
    while (cryptoRow.cells.length > 1) {
      cryptoRow.deleteCell(1);
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Fonction de comparaison mois/année
    function isMonthInRange(candleDate, start, end) {
      const cY = candleDate.getFullYear();
      const cM = candleDate.getMonth();
      const sY = start.getFullYear();
      const sM = start.getMonth();
      const eY = end.getFullYear();
      const eM = end.getMonth();

      return (cY > sY || (cY === sY && cM >= sM)) &&
             (cY < eY || (cY === eY && cM <= eM));
    }

    let totalVariation = 0;
    let filteredCount = 0;

    for (let i = 0; i < data.length; i++) {
      const candleStartDate = new Date(data[i][0]);
      if (isMonthInRange(candleStartDate, startDate, endDate)) {
        const openPrice = parseFloat(data[i][1]);
        const closePrice = parseFloat(data[i][4]);
        const monthlyVariation = ((closePrice - openPrice) / openPrice) * 100;

        const cellIndex = filteredCount + 1;
        const variationCell = cryptoRow.insertCell(cellIndex);
        const variationValue = monthlyVariation.toFixed(2);

        const optionsDate = { year: "2-digit", month: "2-digit" };
        variationCell.textContent = `${candleStartDate.toLocaleDateString("fr-FR", optionsDate)} : ${variationValue}%`;

        variationCell.classList.toggle("positive", monthlyVariation > 0);
        variationCell.classList.toggle("negative", monthlyVariation < 0);

        totalVariation += monthlyVariation;
        filteredCount++;
      }
    }

    // Ajouter des cellules vides pour les mois non présents
    for (let j = filteredCount + 1; j <= 6; j++) {
      cryptoRow.insertCell(j).textContent = "-";
    }

    const totalCell = cryptoRow.insertCell(7);
    totalCell.textContent = `${totalVariation.toFixed(2)}%`;
    totalCell.style.textAlign = "center";
    totalCell.className = totalVariation < 0 ? "negative" : "positive";

    // Affichage statut
    const cryptoNamesElement = document.getElementById("cryptoNames");
    cryptoNamesElement.innerHTML = "";
    if (totalVariation >= -79.99 && totalVariation <= -70.0) {
      cryptoNamesElement.innerHTML = `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalVariation.toFixed(2)}%</p>`;
    } else if (totalVariation < 0) {
      cryptoNamesElement.innerHTML = `<p id="${symbol}_status" class="negative">${symbol}: SHORT, ${totalVariation.toFixed(2)}%</p>`;
    } else {
      cryptoNamesElement.innerHTML = `<p id="${symbol}_status">${symbol}: ${totalVariation.toFixed(2)}%</p>`;
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}

window.onload = () => {
  initDates();

  const validateBtn = document.getElementById('validateBtn');
  validateBtn.addEventListener('click', () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
      alert("Merci de choisir les deux dates.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("La date d'entrée doit être antérieure ou égale à la date de sortie.");
      return;
    }

    fetchCryptoData("1INCH", startDate, endDate);
    fetchCryptoData("BTC", startDate, endDate);
  });

  // Chargement initial sans filtre (dates par défaut)
  fetchCryptoData("1INCH", document.getElementById('startDate').value, document.getElementById('endDate').value);
  fetchCryptoData("BTC", document.getElementById('startDate').value, document.getElementById('endDate').value);
};
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
