// Fonction pour afficher les totaux positifs supérieurs ou égaux à 2 dans la balise avec l'ID "messagePositive"
function displayPositiveTotals(cryptoData) {
  const messagePositive = document.getElementById("messagePositive");
  messagePositive.innerHTML = ""; // Effacer le contenu précédent

  cryptoData.forEach((crypto) => {
    const symbol = crypto.symbol;
    const totalVariation = crypto.totalVariation;
    const positiveCount = crypto.positiveCount;

    // Afficher uniquement si le total positif est supérieur ou égal à 2
    if (positiveCount >= 28) {
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

// Fonction pour afficher les totaux positifs supérieurs ou égaux à 2 dans la balise avec l'ID "messagePositive"
function displayNegativeTotals(cryptoData) {
  const messageNegative = document.getElementById("messageNegative");
  messageNegative.innerHTML = ""; // Effacer le contenu précédent

  cryptoData.forEach((crypto) => {
    const symbol = crypto.symbol;
    const totalVariation = crypto.totalVariation;
    const negativeCount = crypto.negativeCount;

    // Afficher uniquement si le total positif est supérieur ou égal à 2
    if (negativeCount >= 28) {
      // Ajouter des classes de couleur au total
      const totalText = `${symbol}: ${totalVariation.toFixed(2)}%`;
      const totalElement = document.createElement("p");
      totalElement.textContent = totalText;
      totalElement.style.color =
        totalVariation > 0 ? "red" : totalVariation < 0 ? "green" : "black";

      messageNegative.appendChild(totalElement);
    }
  });
}

// Fonction pour calculer et afficher le total des taux de variation sur toutes les crypto-monnaies
function calculateAndDisplayTotal(cryptoData) {
  let totalIntervalle = 0;

  cryptoData.forEach((crypto) => {
    totalIntervalle += crypto.totalVariation;
  });

  // Afficher le total dans la balise avec l'ID "totalIntervalle"
  const totalIntervalleDiv = document.getElementById("totalIntervalle");
  totalIntervalleDiv.textContent = `Total Intervalle: ${totalIntervalle.toFixed(2)}%`;
}

// Fonction pour récupérer les données des cryptos depuis l'API
async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=1`
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
  // Appel de la fonction pour obtenir les taux de variation des cryptos
  fetchCryptoData("1INCH"),
fetchCryptoData("AAVE"),
fetchCryptoData("ACH"),
fetchCryptoData("ADA"),
fetchCryptoData("AGIX"),
fetchCryptoData("AGLD"),
fetchCryptoData("ALGO"),
fetchCryptoData("ALICE"),
fetchCryptoData("ALPHA"),
fetchCryptoData("AMB"),
fetchCryptoData("ANKR"),
fetchCryptoData("ANT"),
fetchCryptoData("APE"),
fetchCryptoData("API3"),
fetchCryptoData("APT"),
fetchCryptoData("ARB"),
fetchCryptoData("ARKM"),
fetchCryptoData("ARPA"),
fetchCryptoData("AR"),
fetchCryptoData("ASTR"),
fetchCryptoData("ATA"),
fetchCryptoData("ATOM"),
fetchCryptoData("AUDIO"),
fetchCryptoData("AVAX"),
fetchCryptoData("AXS"),
fetchCryptoData("BAKE"),
fetchCryptoData("BAL"),
fetchCryptoData("BAND"),
fetchCryptoData("BAT"),
fetchCryptoData("BCH"),
fetchCryptoData("BEL"),
fetchCryptoData("BLZ"),
fetchCryptoData("BNB"),
fetchCryptoData("BNT"),
fetchCryptoData("BNX"),
fetchCryptoData("BTC"),
fetchCryptoData("C98"),
fetchCryptoData("CELO"),
fetchCryptoData("CELR"),
fetchCryptoData("CFX"),
fetchCryptoData("CHR"),
fetchCryptoData("CHZ"),
fetchCryptoData("CKB"),
fetchCryptoData("COMBO"),
fetchCryptoData("COMP"),
fetchCryptoData("COTI"),
fetchCryptoData("CRV"),
fetchCryptoData("CTK"),
fetchCryptoData("CTSI"),
fetchCryptoData("CVX"),
fetchCryptoData("CYBER"),
fetchCryptoData("DAR"),
fetchCryptoData("DASH"),
fetchCryptoData("DENT"),
fetchCryptoData("DGB"),
fetchCryptoData("DOGE"),
fetchCryptoData("DOT"),
fetchCryptoData("DUSK"),
fetchCryptoData("DYDX"),
fetchCryptoData("EDU"),
fetchCryptoData("EGLD"),
fetchCryptoData("ENJ"),
fetchCryptoData("ENS"),
fetchCryptoData("EOS"),
fetchCryptoData("ETC"),
fetchCryptoData("ETH"),
fetchCryptoData("FET"),
fetchCryptoData("FLM"),
fetchCryptoData("FLOKI"),
fetchCryptoData("FLOW"),
fetchCryptoData("FTM"),
fetchCryptoData("FXS"),
fetchCryptoData("GALA"),
fetchCryptoData("GAL"),
fetchCryptoData("GMT"),
fetchCryptoData("GMX"),
fetchCryptoData("GRT"),
fetchCryptoData("GTC"),
fetchCryptoData("HBAR"),
fetchCryptoData("HFT"),
fetchCryptoData("HIFI"),
fetchCryptoData("HIGH"),
fetchCryptoData("HOT"),
fetchCryptoData("ICP"),
fetchCryptoData("ICX"),
fetchCryptoData("IDEX"),
fetchCryptoData("ID"),
fetchCryptoData("IMX"),
fetchCryptoData("INJ"),
fetchCryptoData("IOST"),
fetchCryptoData("IOTA"),
fetchCryptoData("IOTX"),
fetchCryptoData("JASMY"),
fetchCryptoData("JOE"),
fetchCryptoData("KAVA"),
fetchCryptoData("KEY"),
fetchCryptoData("KLAY"),
fetchCryptoData("KNC"),
fetchCryptoData("KSM"),
fetchCryptoData("LDO"),
fetchCryptoData("LEVER"),
fetchCryptoData("LINA"),
fetchCryptoData("LINK"),
fetchCryptoData("LIT"),
fetchCryptoData("LPT"),
fetchCryptoData("LQTY"),
fetchCryptoData("LRC"),
fetchCryptoData("LTC"),
fetchCryptoData("LUNA"),
fetchCryptoData("LUNC"),
fetchCryptoData("MAGIC"),
fetchCryptoData("MANA"),
fetchCryptoData("MASK"),
fetchCryptoData("MATIC"),
fetchCryptoData("MAV"),
fetchCryptoData("MDT"),
fetchCryptoData("MINA"),
fetchCryptoData("MKR"),
fetchCryptoData("MTL"),
fetchCryptoData("NEAR"),
fetchCryptoData("NEO"),
fetchCryptoData("NKN"),
fetchCryptoData("NMR"),
fetchCryptoData("OCEAN"),
fetchCryptoData("OGN"),
fetchCryptoData("OMG"),
fetchCryptoData("OM"),
fetchCryptoData("ONE"),
fetchCryptoData("ONT"),
fetchCryptoData("PENDLE"),
fetchCryptoData("PEPE"),
fetchCryptoData("PERP"),
fetchCryptoData("PHB"),
fetchCryptoData("QNT"),
fetchCryptoData("QTUM"),
fetchCryptoData("RAD"),
fetchCryptoData("REEF"),
fetchCryptoData("REN"),
fetchCryptoData("RLC"),
fetchCryptoData("RNDR"),
fetchCryptoData("ROSE"),
fetchCryptoData("RSR"),
fetchCryptoData("RUNE"),
fetchCryptoData("RVN"),
fetchCryptoData("SAND"),
fetchCryptoData("SEI"),
fetchCryptoData("SFP"),
fetchCryptoData("SHIB"),
fetchCryptoData("SKL"),
fetchCryptoData("SNX"),
fetchCryptoData("SOL"),
fetchCryptoData("SPELL"),
fetchCryptoData("SSV"),
fetchCryptoData("STORJ"),
fetchCryptoData("STX"),
fetchCryptoData("SUI"),
fetchCryptoData("SUSHI"),
fetchCryptoData("SXP"),
fetchCryptoData("THETA"),
fetchCryptoData("TLM"),
fetchCryptoData("TRB"),
fetchCryptoData("TRU"),
fetchCryptoData("TRX"),
fetchCryptoData("T"),
fetchCryptoData("UMA"),
fetchCryptoData("UNFI"),
fetchCryptoData("UNI"),
fetchCryptoData("USDC"),
fetchCryptoData("VET"),
fetchCryptoData("WAVES"),
fetchCryptoData("WLD"),
fetchCryptoData("WOO"),
fetchCryptoData("XEC"),
fetchCryptoData("XEM"),
fetchCryptoData("XLM"),
fetchCryptoData("XMR"),
fetchCryptoData("XRP"),
fetchCryptoData("XTZ"),
fetchCryptoData("XVG"),
fetchCryptoData("XVS"),
fetchCryptoData("YFI"),
fetchCryptoData("YGG"),
fetchCryptoData("ZEC"),
fetchCryptoData("ZEN"),
fetchCryptoData("ZIL"),
fetchCryptoData("ZRX"),
];

// Attendre que toutes les promesses soient résolues
Promise.all(cryptoDataPromises).then((cryptoDataArray) => {
  // Trier le tableau par le totalVariation de manière croissante
  cryptoDataArray.sort((a, b) => a.totalVariation - b.totalVariation);

  // Filtrer les totaux positifs et négatifs
  const positiveTotals = cryptoDataArray.filter(item => item.totalVariation >= 0);
  const negativeTotals = cryptoDataArray.filter(item => item.totalVariation < 0);

  // Afficher les totaux positifs triés de la plus petite à la plus grande
  displayPositiveTotals(positiveTotals);

  // Afficher les totaux négatifs triés de la plus grande à la plus petite
  negativeTotals.sort((a, b) => b.totalVariation - a.totalVariation);
  displayNegativeTotals(negativeTotals);

  // Calculer et afficher le total des taux de variation sur toutes les crypto-monnaies
  calculateAndDisplayTotal(cryptoDataArray);
});
