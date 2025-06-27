const symbols = [
  "AAVE",
  "ACH",
  "ACT",
  "ACX",
  "ARB",
  "ARKM",
  "AR",
  "ATOM",
  "AUCTION",
  "A",
  "AVAX",
  "BABY",
  "BANANAS31",
  "BANANA",
  "BCH",
  "BEAMX",
  "BERA",
  "BIGTIME",
  "BIO",
  "BLUR",
  "BMT",
  "BNB",
  "BOME",
  "BONK",
  "BROCCOLI714",
  "BTC",
  "CHESS",
  "CHZ",
  "CKB",
  "COOKIE",
  "COW",
  "CRV",
  "CVC",
  "DF",
  "DOGE",
  "DOGS",
  "DOT",
  "DYDX",
  "EGLD",
  "EIGEN",
  "ENA",
  "ENJ",
  "ENS",
  "EPIC",
  "ETHFI",
  "ETH",
  "EURI",
  "EUR",
  "FDUSD",
  "FET",
  "FIL",
  "FLOKI",
  "FLUX",
  "FORM",
  "GALA",
  "GMT",
  "GMX",
  "GPS",
  "GUN",
  "HAEDAL",
  "HBAR",
  "HEI",
  "HIVE",
  "HMSTR",
  "HOME",
  "HUMA",
  "HYPER",
  "ICP",
  "IDEX",
  "INIT",
  "INJ",
  "IOTA",
  "JTO",
  "JUP",
  "JUV",
  "KAIA",
  "KAITO",
  "KERNEL",
  "KMNO",
  "NEAR",
  "NEIRO",
  "NEO",
  "NEWT",
  "NIL",
  "NOT",
  "NXPC",
  "OMNI",
  "OM",
  "ONDO",
  "ONT",
  "OP",
  "ORCA",
  "ORDI",
  "OSMO",
  "PARTI",
  "PAXG",
  "PENDLE",
  "PENGU",
  "PEOPLE",
  "RSR",
  "RUNE",
  "SAGA",
  "SAND",
  "SEI",
  "SHELL",
  "SHIB",
  "SIGN",
  "SLF",
  "SOL",
  "SOPH",
  "SPK",
  "STEEM",
  "STO",
  "STRK",
  "TURBO",
  "T",
  "TUT",
  "UNI",
  "USUAL",
  "UTK",
  "VANA",
  "VANRY",
  "VELODROME",
  "VET",
  "VIRTUAL",
  "WCT",
  "XRP",
  "XTZ",
  "YGG",
  "ZEN",
  "ZK",
  "ZRO",
];

async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDC&interval=1M`
    );
    const data = await response.json();

    if (!data || data.length === 0) throw new Error("Pas de données");

    const allLows = data.map((k) => parseFloat(k[3])); // Low (mèche la plus basse)
    const allHighs = data.map((k) => parseFloat(k[2])); // High (mèche la plus haute)

    const lowestPrice = Math.min(...allLows);
    const highestPrice = Math.max(...allHighs);
    const latestCandle = data[data.length - 1];
    const currentPrice = parseFloat(latestCandle[4]); // Close

    const percentFromLow = ((currentPrice - lowestPrice) / lowestPrice) * 100;
    const percentFromHigh =
      ((currentPrice - highestPrice) / highestPrice) * 100;

    const row = document.getElementById(symbol);
    row.insertCell(1).textContent = currentPrice.toFixed(6);
    row.insertCell(2).textContent = lowestPrice.toFixed(6);

    const diffLowCell = row.insertCell(3);
    diffLowCell.textContent = percentFromLow.toFixed(2) + "%";
    diffLowCell.classList.add(percentFromLow >= 0 ? "positive" : "negative");

    row.insertCell(4).textContent = highestPrice.toFixed(6);

    const diffHighCell = row.insertCell(5);
    diffHighCell.textContent = percentFromHigh.toFixed(2) + "%";
    diffHighCell.classList.add(percentFromHigh >= 0 ? "positive" : "negative");

    // ➕ Ajout du signal automatique
    const signalCell = row.insertCell(6);
    if (percentFromLow <= 30 && percentFromHigh <= -70) {
      signalCell.textContent = "🟢 LONG";
      signalCell.style.color = "green";
    } else if (percentFromLow >= 300 && percentFromHigh >= -30) {
      signalCell.textContent = "🔴 SHORT";
      signalCell.style.color = "red";
    } else {
      signalCell.textContent = "⚪ NEUTRE";
      signalCell.style.color = "gray";
    }
  } catch (error) {
    console.error(`Erreur pour ${symbol}:`, error);
    const row = document.getElementById(symbol);
    const errorCell = row.insertCell(1);
    errorCell.colSpan = 6;
    errorCell.textContent = "Données indisponibles";
    errorCell.style.color = "gray";
  }
}

// Lancer pour chaque symbole
symbols.forEach(fetchCryptoData);

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
