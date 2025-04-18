// Fonction pour convertir une date en timestamp
function dateToTimestamp(dateStr) {
  const parts = dateStr.split('/');
  const usDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return new Date(usDateStr).getTime();
}

// Fonction pour calculer le nombre de jours entre deux dates
function getDaysBetweenDates(startDate, endDate) {
  const start = dateToTimestamp(startDate);
  const end = endDate ? dateToTimestamp(endDate) : Date.now();
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure les deux jours
}

// Fonction principale pour récupérer les données
async function fetchCryptoData(symbol, startDate = "01/01/2025", endDate = null) {
  try {
    const startTime = dateToTimestamp(startDate);
    const endTime = endDate ? dateToTimestamp(endDate) : Date.now();
    
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&startTime=${startTime}&endTime=${endTime}`
    );
    const data = await response.json();

    let totalVariation = 0;
    const cryptoRow = document.getElementById(symbol);

    // Vider toutes les cellules sauf la première (nom de la crypto)
    while (cryptoRow.cells.length > 1) {
      cryptoRow.deleteCell(1);
    }

    // Créer les colonnes pour chaque jour
    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const dailyVariation = ((closePrice - openPrice) / openPrice) * 100;
      
      const variationCell = cryptoRow.insertCell(-1); // Insère à la fin
      const variationValue = dailyVariation.toFixed(2);
      
      const dayDate = new Date(data[i][0]);
      variationCell.textContent = `${dayDate.toLocaleDateString("fr-FR")}: ${variationValue}%`;

      if (dailyVariation > 0) {
        variationCell.classList.add("positive");
      } else if (dailyVariation < 0) {
        variationCell.classList.add("negative");
      }

      totalVariation += dailyVariation;
    }

    // Ajouter la cellule Total à la fin
    const totalCell = cryptoRow.insertCell(-1);
    const totalValue = totalVariation.toFixed(2);
    totalCell.textContent = `${totalValue}%`;
    totalCell.style.textAlign = "center";

    // Mettre à jour l'affichage des recommandations
    const cryptoNamesElement = document.getElementById("cryptoNames");
    const existingStatus = document.getElementById(`${symbol}_status`);
    
    if (existingStatus) {
      existingStatus.remove();
    }

    if (totalVariation < -60) {
      totalCell.classList.add("positive");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
    } else if (totalVariation < 0) {
      totalCell.classList.add("negative");
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}

// Fonction pour initialiser/mettre à jour le tableau
function updateTableStructure(startDate, endDate) {
  const daysCount = getDaysBetweenDates(startDate, endDate);
  const table = document.querySelector("table");
  
  // Mettre à jour l'en-tête
  const headerRow = table.rows[0];
  while (headerRow.cells.length > 1) {
    headerRow.deleteCell(1);
  }
  
  // Ajouter les colonnes pour chaque jour
  for (let i = 0; i < daysCount; i++) {
    const headerCell = headerRow.insertCell(-1);
    headerCell.textContent = `Jour ${i+1}`;
  }
  
  // Ajouter la colonne Total
  const totalHeader = headerRow.insertCell(-1);
  totalHeader.textContent = "Total";
}

// Fonction pour rafraîchir toutes les données avec une période spécifique
function refreshAllDataWithDateRange() {
  const startDateInput = prompt("Entrez la date de début (format JJ/MM/AAAA):", "01/01/2025");
  if (!startDateInput) return;
  
  const endDateInput = prompt("Entrez la date de fin (format JJ/MM/AAAA, laissez vide pour aujourd'hui):", "");
  
  // Mettre à jour la structure du tableau
  updateTableStructure(startDateInput, endDateInput || new Date().toLocaleDateString("fr-FR"));
  
  // Vider les résultats précédents
  document.getElementById("cryptoNames").innerHTML = "";
  
  // Appeler fetchCryptoData pour chaque crypto
  const allCryptos = ["ETH", "BTC", "SOL"];
  allCryptos.forEach(crypto => {
    fetchCryptoData(crypto, startDateInput, endDateInput || null);
  });
}

// Initialisation
document.addEventListener("DOMContentLoaded", function() {
  // Créer le bouton de rafraîchissement
  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Changer la période";
  refreshButton.onclick = refreshAllDataWithDateRange;
  document.body.insertBefore(refreshButton, document.body.firstChild);
  
  // Appel initial avec la date par défaut
  updateTableStructure("01/01/2025", new Date().toLocaleDateString("fr-FR"));
  fetchCryptoData("ETH");
});

