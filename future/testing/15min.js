
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

// Fonction pour additionner tous les intervalles positifs
function countNegativeIntervals(cryptoData) {
  let negativeIntervalleCount = 0;

  cryptoData.forEach((crypto) => {
    // Compter seulement les taux de variation négatifs
    if (crypto.totalVariation < 0) {
      negativeIntervalleCount++;
    }
  });

  // Afficher le nombre dans la balise avec l'ID "positiveIntervalle"
  const negativeIntervalleDiv = document.getElementById("negativeIntervalle");
  negativeIntervalleDiv.textContent = `Nombre d'intervalles negatifs : ${negativeIntervalleCount}`;
  // negativeIntervalleDiv.style.color = "red";
  // negativeIntervalleDiv.style.fontWeight = "bold"; 
}

function countPositiveIntervals(cryptoData) {
  let positiveIntervalleCount = 0;

  cryptoData.forEach((crypto) => {
    // Compter seulement les taux de variation négatifs
    if (crypto.totalVariation > 0) {
      positiveIntervalleCount++;
    }
  });

  // Afficher le nombre dans la balise avec l'ID "positiveIntervalle"
  const positiveIntervalleDiv = document.getElementById("positiveIntervalle");
  positiveIntervalleDiv.textContent = `Nombre d'intervalles positifs : ${positiveIntervalleCount}`;
  // positiveIntervalleDiv.style.color = "green";
  // positiveIntervalleDiv.style.fontWeight = "bold";
}


// Fonction pour calculer et afficher la différence entre les nombres d'intervalles positifs et négatifs
function calculateAndDisplayDifference(cryptoData) {
  let positiveIntervalleCount = 0;
  let negativeIntervalleCount = 0;

  cryptoData.forEach((crypto) => {
    positiveIntervalleCount += crypto.positiveCount;
    negativeIntervalleCount += crypto.negativeCount;
  });

  // Calculer la différence
  const difference = positiveIntervalleCount - negativeIntervalleCount;

  // Afficher la différence dans la balise avec l'ID "totalPositiveNegativeIntervalle"
  const totalPositiveNegativeIntervalleDiv = document.getElementById("totalPositiveNegativeIntervalle");
  totalPositiveNegativeIntervalleDiv.textContent = `Différence : ${difference}`;

  // Appliquer la couleur en fonction de la différence
  totalPositiveNegativeIntervalleDiv.style.color = difference > 0 ? "red" : "green";
  totalPositiveNegativeIntervalleDiv.style.fontWeight = "bold";
}



function mettreAJourHeure() {
  var elementHeure = document.getElementById('heure');
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
  heuresMaintenant = heuresMaintenant < 10 ? '0' + heuresMaintenant : heuresMaintenant;
  minutesMaintenant = minutesMaintenant < 10 ? '0' + minutesMaintenant : minutesMaintenant;
  secondesMaintenant = secondesMaintenant < 10 ? '0' + secondesMaintenant : secondesMaintenant;

  heuresActuelle = heuresActuelle < 10 ? '0' + heuresActuelle : heuresActuelle;
  minutesActuelle = minutesActuelle < 10 ? '0' + minutesActuelle : minutesActuelle;
  secondesActuelle = secondesActuelle < 10 ? '0' + secondesActuelle : secondesActuelle;

  // Mettre à jour le contenu de l'élément avec les deux heures
  elementHeure.innerHTML = heuresActuelle + ':' + minutesActuelle + ':' + secondesActuelle;
}

// Appeler la fonction pour mettre à jour l'heure
mettreAJourHeure();


// Fonction pour récupérer les données des cryptos depuis l'API
async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=15m&limit=1`
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
  // Calculer et afficher le total des taux de variation sur toutes les crypto-monnaies
  calculateAndDisplayTotal(cryptoDataArray);

  // Calculer et afficher la somme des intervalles positifs
  countPositiveIntervals(cryptoDataArray);
  countNegativeIntervals(cryptoDataArray);
  calculateAndDisplayDifference(cryptoDataArray);
});