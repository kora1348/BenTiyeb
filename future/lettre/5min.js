// Fonction pour afficher les totaux positifs supérieurs ou égaux à 2 dans la balise avec l'ID "messagePositive"
function displayPositiveTotals(cryptoData) {
  const messagePositive = document.getElementById("messagePositive");
  messagePositive.innerHTML = ""; // Effacer le contenu précédent

  cryptoData.forEach((crypto) => {
    const symbol = crypto.symbol;
    const totalVariation = crypto.totalVariation;
    const positiveCount = crypto.positiveCount;
    const negativeCount = crypto.negativeCount;

    // Afficher uniquement si le total positif est supérieur ou égal à 2
    if (positiveCount >= 2) {
      // Ajouter des classes de couleur au total
      const totalText = `${symbol}: ${totalVariation.toFixed(2)}%`;
      const totalElement = document.createElement("p");
      totalElement.textContent = totalText;
      totalElement.style.color =
        totalVariation > 0 ? "green" : totalVariation < 0 ? "red" : "black";

      messagePositive.appendChild(totalElement);
    }
  });
}

async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=15m&limit=5`
    );
    const data = await response.json();

    // Calcul du total des taux de variation sur 4 intervalles de 15 minutes
    let totalVariation = 0;
    let positiveCount = 0;
    let negativeCount = 0;

    // Mise à jour du tableau avec les données et la couleur
    const cryptoRow = document.getElementById(symbol);

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const intervalVariation = ((closePrice - openPrice) / openPrice) * 100;
      const cellIndex = i + 1; // Décalage d'une cellule pour éviter la première cellule (Crypto)

      const variationCell = cryptoRow.insertCell(cellIndex);
      const variationValue = intervalVariation.toFixed(2);
      const timestamp = parseInt(data[i][0]);
      const dateValue = new Date(timestamp);
      const hour = dateValue.getHours();
      const minute = dateValue.getMinutes();
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      variationCell.textContent = `${formattedTime}: ${variationValue}%`;

      // Ajouter des classes de couleur aux cellules individuelles
      if (intervalVariation > 0) {
        variationCell.style.color = "green";
        positiveCount++;
      } else if (intervalVariation < 0) {
        variationCell.style.color = "red";
        negativeCount++;
      }

      totalVariation += intervalVariation; // Ajouter la variation de l'intervalle au total
    }

    // Ajouter des classes de couleur au total
    const totalCell = cryptoRow.insertCell(data.length + 1);
    totalCell.textContent = `Total: ${totalVariation.toFixed(2)}%`;
    totalCell.style.color =
      totalVariation > 0 ? "green" : totalVariation < 0 ? "red" : "black";

    const positiveCell = cryptoRow.insertCell(data.length + 2);
    positiveCell.textContent = `Positif: ${positiveCount}`;
    positiveCell.style.color = "green";

    const negativeCell = cryptoRow.insertCell(data.length + 3);
    negativeCell.textContent = `Negatif: ${negativeCount}`;
    negativeCell.style.color = "red";

    // Retourner les données pour l'affichage des totaux
    return {
      symbol,
      totalVariation,
      positiveCount,
      negativeCount,
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}

// Appeler la fonction pour chaque crypto-monnaie
const cryptoDataPromises = [
  fetchCryptoData("1INCH"),
  fetchCryptoData("AAVE"),
  fetchCryptoData("ACH"),
  fetchCryptoData("ADA"),
  fetchCryptoData("AGIX"),
  fetchCryptoData("AGLD"),
  fetchCryptoData("ALGO"),
  fetchCryptoData("ALICE"),
  fetchCryptoData("ALPHA"),
];

// Attendre que toutes les promesses soient résolues
Promise.all(cryptoDataPromises).then((cryptoDataArray) => {
  // Trier le tableau par le totalVariation de manière décroissante
  cryptoDataArray.sort((a, b) => b.totalVariation - a.totalVariation);

  // Afficher les totaux positifs triés
  displayPositiveTotals(cryptoDataArray);
});
