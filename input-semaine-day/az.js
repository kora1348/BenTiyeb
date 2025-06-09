const cryptos = [
  "1INCH", "1MBABYDOGE", "ADA", "ARB", "AVAX", "BCH", "BNB", "BOME", "BONK",
  "BTC", "CRV", "DOGE", "ENA", "ETH", "ETHFI", "FIL", "HBAR", "KAITO",
  "LINK", "LTC", "NEAR", "NEO", "ORDI", "PEPE", "PNUT", "SHIB", "SOL", "SUI",
  "TIA", "TRUMP", "WIF", "WLD", "XRP"
];

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

function formatMonth(date) {
  const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const month = monthNames[date.getMonth()];
  const year = String(date.getFullYear()).slice(2);
  return `${month} ${year}`;
}

async function fetchMonthlyCryptoData(symbol, startDate, endDate) {
  try {
    // Créer un tableau de 6 mois entre startDate et endDate
    const months = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate && months.length < 6) {
      // Début du mois
      const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      // Fin du mois
      const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);
      
      months.push({
        start: monthStart.getTime(),
        end: monthEnd.getTime()
      });
      
      // Passer au mois suivant
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    const cryptoRow = document.getElementById(symbol);
    let totalVariation = 0;
    
    for (let i = 0; i < months.length; i++) {
      const {start, end} = months[i];
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&startTime=${start}&endTime=${end}`
      );
      const data = await response.json();

      if (!data.length) continue;

      // Prendre le premier jour (ouverture) et dernier jour (fermeture) du mois
      const openPrice = parseFloat(data[0][1]);
      const closePrice = parseFloat(data[data.length - 1][4]);
      const variation = ((closePrice - openPrice) / openPrice) * 100;

      const variationCell = cryptoRow.insertCell(i + 1);
      variationCell.textContent = `${formatMonth(new Date(start))}: ${variation.toFixed(2)}%`;

      if (variation > 0) {
        variationCell.classList.add("positive");
      } else if (variation < 0) {
        variationCell.classList.add("negative");
      }

      totalVariation += variation;
    }

    // Ajouter la cellule Total à la fin
    const totalCell = cryptoRow.insertCell(-1);
    totalCell.textContent = `${totalVariation.toFixed(2)}%`;
    
    // Appliquer le style en fonction du total
    if (totalVariation > 0) {
      totalCell.classList.add("positive");
    } else if (totalVariation < 0) {
      totalCell.classList.add("negative");
    }

  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}

function loadMonthlyData(startTimestamp, endTimestamp) {
  clearExistingVariations();
  cryptos.forEach(symbol => {
    fetchMonthlyCryptoData(symbol, startTimestamp, endTimestamp);
  });
}

function fetchDataForPeriod() {
  const startDateVal = document.getElementById("startDate").value;
  const endDateVal = document.getElementById("endDate").value;

  if (!startDateVal || !endDateVal) {
    alert("Veuillez sélectionner une plage de dates.");
    return;
  }

  const startDate = new Date(startDateVal);
  const endDate = new Date(endDateVal);

  // Calculer la date de début 6 mois avant la date de fin
  const sixMonthsAgo = new Date(endDate);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5); // 5 car nous incluons le mois actuel

  // Utiliser la date la plus récente entre startDate et sixMonthsAgo
  const effectiveStartDate = startDate > sixMonthsAgo ? startDate : sixMonthsAgo;

  loadMonthlyData(effectiveStartDate.getTime(), endDate.getTime());
}

window.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 5); // 5 car nous incluons le mois actuel

  function toInputDateTimeString(date) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  document.getElementById("startDate").value = toInputDateTimeString(sixMonthsAgo);
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
  const ws = XLSX.utils.table_to_sheet(table, { skipHeader: false });

  // Insérer "Total des variations : xx.xx%" dans la cellule B1
  ws["B1"] = { t: "s", v: `Total des variations : ${totalVariations.toFixed(2)}%` };

  // Générer les noms
  const startDateVal = document.getElementById("startDate").value;
  const endDateVal = document.getElementById("endDate").value;

  // Fonction pour formater la date au format JJ-MM-AAAA
  const formatDateForSheet = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const startFormatted = formatDateForSheet(startDateVal);
  const endFormatted = formatDateForSheet(endDateVal);
  
  // Nom du fichier (gardé comme avant)
  const formatDateForFilename = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year}_${hours}h${minutes}`;
  };

  const filenameStart = formatDateForFilename(startDateVal);
  const filenameEnd = formatDateForFilename(endDateVal);
  const filename = `crypto_${filenameStart}a_${filenameEnd}.xlsx`;

  // Nom de la feuille - format simplifié comme demandé
  const sheetName = `${startFormatted}_${endFormatted}`.substring(0, 31);

  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}