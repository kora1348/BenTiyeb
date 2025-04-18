// Fonction pour convertir une date en timestamp
function dateToTimestamp(dateStr) {
  return new Date(dateStr).getTime();
}

// Fonction principale pour récupérer les données
async function fetchCryptoData(symbol, startDate = "2025-01-01", endDate = null) {
  try {
    // Convertir les dates en timestamp
    const startTime = dateToTimestamp(startDate);
    const endTime = endDate ? dateToTimestamp(endDate) : Date.now();
    
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&startTime=${startTime}&endTime=${endTime}`
    );
    const data = await response.json();

    // Calcul du total des taux de variation
    let totalVariation = 0;
    const cryptoRow = document.getElementById(symbol);

    // Vider les cellules existantes sauf la première (nom de la crypto)
    while (cryptoRow.cells.length > 1) {
      cryptoRow.deleteCell(1);
    }

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const dailyVariation = ((closePrice - openPrice) / openPrice) * 100;
      
      const variationCell = cryptoRow.insertCell(i + 1);
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

    // Ajouter la cellule pour afficher le total de variation
    const totalCell = cryptoRow.insertCell(data.length + 1);
    const totalValue = totalVariation.toFixed(2);
    totalCell.textContent = `${totalValue}%`;
    totalCell.style.textAlign = "center";

    const cryptoNamesElement = document.getElementById("cryptoNames");

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

// Fonction pour rafraîchir toutes les données avec une période spécifique
function refreshAllDataWithDateRange() {
  const startDateInput = prompt("Entrez la date de début (format YYYY-MM-DD):", "2025-01-01");
  if (!startDateInput) return;
  
  const endDateInput = prompt("Entrez la date de fin (format YYYY-MM-DD, laissez vide pour aujourd'hui):", "");
  
  // Vider les résultats précédents
  document.getElementById("cryptoNames").innerHTML = "";
  
  // Appeler fetchCryptoData pour chaque crypto avec les nouvelles dates
  const allCryptos = ["ETH", "BTC", "SOL"]; // Ajoutez toutes vos cryptos ici
  allCryptos.forEach(crypto => {
    fetchCryptoData(crypto, startDateInput, endDateInput || null);
  });
}

// Appel initial avec la date par défaut (01/01/2025)
fetchCryptoData("ETH");

// Fonction pour l'heure (gardée inchangée)
function mettreAJourHeure() {
  var elementHeure = document.getElementById("heure");
  var maintenant = new Date();
  var heureActuelle = new Date(maintenant);
  maintenant.setHours(maintenant.getHours() + 3);
  maintenant.setMinutes(maintenant.getMinutes() + 20);

  var heuresMaintenant = maintenant.getHours();
  var minutesMaintenant = maintenant.getMinutes();
  var secondesMaintenant = maintenant.getSeconds();

  var heuresActuelle = heureActuelle.getHours();
  var minutesActuelle = heureActuelle.getMinutes();
  var secondesActuelle = heureActuelle.getSeconds();

  heuresMaintenant = heuresMaintenant < 10 ? "0" + heuresMaintenant : heuresMaintenant;
  minutesMaintenant = minutesMaintenant < 10 ? "0" + minutesMaintenant : minutesMaintenant;
  secondesMaintenant = secondesMaintenant < 10 ? "0" + secondesMaintenant : secondesMaintenant;

  heuresActuelle = heuresActuelle < 10 ? "0" + heuresActuelle : heuresActuelle;
  minutesActuelle = minutesActuelle < 10 ? "0" + minutesActuelle : minutesActuelle;
  secondesActuelle = secondesActuelle < 10 ? "0" + secondesActuelle : secondesActuelle;

  elementHeure.innerHTML = heuresActuelle + ":" + minutesActuelle + ":" + secondesActuelle;
}

// Mettre à jour l'heure toutes les secondes
setInterval(mettreAJourHeure, 1000);
mettreAJourHeure();

// Ajouter un bouton pour rafraîchir avec une nouvelle période
document.addEventListener("DOMContentLoaded", function() {
  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Changer la période";
  refreshButton.onclick = refreshAllDataWithDateRange;
  document.body.insertBefore(refreshButton, document.body.firstChild);
});