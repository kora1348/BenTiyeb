const cryptos = [
  "1INCH", "1MBABYDOGE", "ADA", "ARB", "AVAX", "BCH", "BNB", "BOME", "BONK",
  "BTC", "CRV", "DOGE", "ENA", "ETH", "ETHFI", "FIL", "HBAR", "KAITO",
  "LINK", "LTC", "NEAR", "NEO", "ORDI", "PEPE", "PNUT", "SHIB", "SOL", "SUI",
  "TIA", "TRUMP", "WIF", "WLD", "XRP"
];

let totalVariations = 0;
let cryptoCount = 0;

function clearExistingVariations() {
  cryptos.forEach((symbol) => {
    const cryptoRow = document.getElementById(symbol);
    if (cryptoRow) {
      while (cryptoRow.cells.length > 1) {
        cryptoRow.deleteCell(1);
      }
    }
  });
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatHour(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `(${hours}:${minutes})`;
}

async function fetchCryptoData(symbol, startDate, endDate) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&startTime=${startDate}&endTime=${endDate}`
    );
    const data = await response.json();
    const cryptoRow = document.getElementById(symbol);

    if (!data.length) return;

    let totalVariation = 0;

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const variation = ((closePrice - openPrice) / openPrice) * 100;
      totalVariation += variation;
    }

    const variationCell = cryptoRow.insertCell(1);
    const startDateFormatted = formatDate(new Date(startDate));
    const endDateFormatted = formatDate(new Date(endDate));
    variationCell.textContent = `${startDateFormatted} - ${endDateFormatted} : (${totalVariation.toFixed(2)}%)`;

    if (totalVariation > 0) {
      variationCell.classList.add("positive");
    } else if (totalVariation < 0) {
      variationCell.classList.add("negative");
    }

    totalVariations += totalVariation;
    cryptoCount++;
    updateTotalVariations();

  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}


function updateTotalVariations() {
  const totalEl = document.getElementById("totalVariations");
  totalEl.textContent = `Total des variations : ${totalVariations.toFixed(2)}%`;
}

function getTodayRangeTimestamps() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const end = start + 24 * 60 * 60 * 1000 - 1;
  return { start, end };
}

function loadData(startTimestamp, endTimestamp) {
  clearExistingVariations();
  totalVariations = 0;
  cryptoCount = 0;

  cryptos.forEach(symbol => {
    fetchCryptoData(symbol, startTimestamp, endTimestamp);
  });
}

function fetchDataForPeriod() {
  const startDateVal = document.getElementById("startDate").value;
  const endDateVal = document.getElementById("endDate").value;

  if (!startDateVal || !endDateVal) {
    alert("Veuillez sélectionner une plage de dates.");
    return;
  }

  const startTimestamp = Date.parse(startDateVal);
  const endTimestamp = Date.parse(endDateVal);

  loadData(startTimestamp, endTimestamp);
}

window.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const startOfHour = new Date(now);
  startOfHour.setMinutes(0, 0, 0);

  function toInputDateTimeString(date) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  document.getElementById("startDate").value = toInputDateTimeString(startOfHour);
  document.getElementById("endDate").value = toInputDateTimeString(now);

  fetchDataForPeriod();
});



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

function exportToExcel() {
  const table = document.querySelector("table");
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, "Données Crypto");
  XLSX.writeFile(wb, "donnees_crypto.xlsx");
}
