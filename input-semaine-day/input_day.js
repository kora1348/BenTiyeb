let totalVariations = 0; // Variable globale pour stocker la somme des variations
let cryptoCount = 0; // Variable pour compter le nombre de cryptos traitées (jusqu'à 149)

// Fonction pour vider les cellules de variation existantes
function clearExistingVariations() {
const cryptos = [
  "1INCH", "1MBABYDOGE", "ADA", "ARB", "AVAX", "BCH", "BNB", "BOME", "BONK",
  "BTC", "CRV", "DOGE", "ENA", "ETH", "ETHFI", "FIL", "HBAR", "IP", "KAITO",
  "LINK", "LTC", "NEAR", "NEO", "ORDI", "PEPE", "PNUT", "SHIB", "SOL", "SUI",
  "TIA", "TRUMP", "WIF", "WLD", "XRP"
];

  cryptos.forEach((symbol) => {
    const cryptoRow = document.getElementById(symbol);
    if (cryptoRow) {
      // Supprimer toutes les cellules sauf la première (nom de la crypto)
      while (cryptoRow.cells.length > 1) {
        cryptoRow.deleteCell(1);
      }
    }
  });
}

async function fetchCryptoData(symbol, startDate, endDate) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDC&interval=1d&startTime=${startDate}&endTime=${endDate}`
    );
    const data = await response.json();

    // Mise à jour du tableau avec les données et la couleur
    const cryptoRow = document.getElementById(symbol);
    let shouldDisplay = false; // Variable pour vérifier si une variation >= 7% existe
    let isShort = false; // Variable pour vérifier si une variation <= -7% existe

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
      totalVariations += weeklyVariation; // Ajout de la variation à la somme globale
      cryptoCount++; // Incrément du compteur
      updateTotalAndAverageVariations(); // Mise à jour des éléments HTML pour le total et la moyenne

      const cellIndex = i + 1; // Décalage d'une cellule pour éviter la première cellule (Crypto)
      const variationCell = cryptoRow.insertCell(cellIndex);
      const variationValue = weeklyVariation.toFixed(2);

      // Conversion des timestamps pour affichage formaté
      const openTime = new Date(data[i][0]);
      const closeTime = new Date(data[i][6]);

      function formatDate(date) {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(2); // deux derniers chiffres
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${month}/${day}/${year} ${hours}:${minutes}`;
      }

      function formatHour(date) {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `(${hours}:${minutes})`;
      }

      const formattedOpenTime = `${formatDate(openTime)} ${formatHour(
        openTime
      )}`;
      const formattedCloseTime = `${formatDate(closeTime)} ${formatHour(
        closeTime
      )}`;

      // Mise à jour du contenu de la cellule
      variationCell.textContent = `${formattedOpenTime} - ${formattedCloseTime} : (${variationValue}%)`;

      // Ajouter la classe "positive" ou "negative" en fonction de la variation
      if (weeklyVariation > 0) {
        variationCell.classList.add("positive");
      } else if (weeklyVariation < 0) {
        variationCell.classList.add("negative");
      }
    }
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${symbol}:`,
      error
    );
  }
}

// Fonction pour mettre à jour l'affichage du total et de la moyenne des variations
function updateTotalAndAverageVariations() {
  const totalVariationsElement = document.getElementById("totalVariations");
  const averageVariationsElement = document.getElementById("averageVariations");

  totalVariationsElement.textContent = `Total des variations : ${totalVariations.toFixed(
    2
  )}%`;

  // Calcul de la moyenne sur 151 cryptos et conversion au format pourcentage
  const averageVariations =
    (totalVariations / Math.min(cryptoCount, 151)) * 100;
  averageVariationsElement.textContent = `Moyenne des variations : ${averageVariations.toFixed(
    2
  )}%`;
}

// Fonction pour récupérer les données pour la période spécifiée
function fetchDataForPeriod() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  // Convertir les dates en timestamp
  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = new Date(endDate).getTime();

  // Réinitialiser les variables globales
  totalVariations = 0;
  cryptoCount = 0;

  // Vider les anciennes variations avant de récupérer les nouvelles
  clearExistingVariations();

  
  // Mettre à jour la date de mise à jour
  document.getElementById("updateDate").textContent =
    new Date().toLocaleDateString();
}

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
