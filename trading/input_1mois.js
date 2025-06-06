let totalVariations = 0; // Variable globale pour stocker la somme des variations
let cryptoCount = 0; // Variable pour compter le nombre de cryptos traitées (jusqu'à 149)
let cryptoVariations = {}; // Objet pour stocker les variations par crypto

// Fonction pour vider les cellules de variation existantes
function clearExistingVariations() {
  const cryptos = [
    "1INCH",
    "AAVE",
    "ACE",
    "ACH",
    "ACX",
    "ACT",
    "ADA",
    "AEVO",
    "AGIX",
    "AGLD",
    "AI",
    "AI16Z",
    "AIXBT",
    "AERGO",
    "ALCHE",
    "ALGO",
    "ALICE",
    "ALPACA",
    "ALPHA",
    "ALT",
    "AMB",
    "ANKR",
    "APE",
    "API3",
    "APT",
    "AR",
    "ARB",
    "ARK",
    "ARKM",
    "ARPA",
    "ANIME",
    "ASTR",
    "ATA",
    "ATOM",
    "AUCTION",
    "AVAAI",
    "AVA",
    "AVAX",
    "AXL",
    "AXS",
    "B3",
    "BAN",
    "BANANA",
    "BANANAS31",
    "BAND",
    "BAT",
    "BAKE",
    "BB",
    "BCH",
    "BEAMX",
    "BEL",
    "BERA",
    "BICO",
    "BID",
    "BIGTIME",
    "BIO",
    "BMT",
    "BNB",
    "BNT",
    "BNX",
    "BOME",
    "BOND",
    "BONK",
    "BR",
    "BRETT",
    "BROCCOLI714",
    "BROCCOLIF3B",
    "BSV",
    "BSW",
    "BTC",
    "BTCDOM",
    "BABY",
    "BABYDOGE",
    "BLUR",
    "BLZ",
    "CAKE",
    "CAT",
    "CATI",
    "C98",
    "CELO",
    "CELR",
    "CETUS",
    "CFX",
    "CGPT",
    "CHESS",
    "CHILLGUY",
    "CHR",
    "CHZ",
    "CKB",
    "COMBO",
    "COMP",
    "COOKIE",
    "COS",
    "COTI",
    "COW",
    "CRV",
    "CTK",
    "CTSI",
    "CVX",
    "CVC",
    "CYBER",
    "D",
    "DAR",
    "DASH",
    "DEGEN",
    "DEGO",
    "DENT",
    "DEXE",
    "DF",
    "DGB",
    "DIA",
    "DODOX",
    "DOGE",
    "DOGS",
    "DOT",
    "DUSK",
    "DYDX",
    "DYM",
    "EDU",
    "EGLD",
    "EIGEN",
    "EOS",
    "ENA",
    "ENJ",
    "ENS",
    "EPIC",
    "ETC",
    "ETH",
    "ETHFI",
    "ETHW",
    "FARTCOIN",
    "FET",
    "FIDA",
    "FIL",
    "FIO",
    "FLM",
    "FLOKI",
    "FLOW",
    "FLUX",
    "FORM",
    "FORTH",
    "FRONT",
    "FTM",
    "FTT",
    "FUN",
    "FXS",
    "G",
    "GALA",
    "GAS",
    "GHST",
    "GLM",
    "GLMR",
    "GMT",
    "GMX",
    "GOAT",
    "GPS",
    "GRASS",
    "GRT",
    "GRIFFAIN",
    "GTC",
    "GUN",
    "GUNTHY",
    "HBAR",
    "HFT",
    "HIFI",
    "HIGH",
    "HIPPO",
    "HIVE",
    "HMSTR",
    "HOT",
    "HOOK",
    "ICX",
    "ID",
    "IDEX",
    "ILV",
    "IMX",
    "INJ",
    "IOST",
    "IOTA",
    "IOTX",
    "IO",
    "IP",
    "JASMY",
    "JELLYJELLY",
    "JOE",
    "JTO",
    "JUP",
    "KAIA",
    "KAITO",
    "KAS",
    "KAVA",
    "KDA",
    "KEY",
    "KMNO",
    "KLAY",
    "KNC",
    "KOMA",
    "KSM",
    "LDO",
    "LEVER",
    "LINA",
    "LINK",
    "LISTA",
    "LIT",
    "LOKA",
    "LOOM",
    "LPT",
    "LQTY",
    "LRC",
    "LSK",
    "LTC",
    "LUNA2",
    "LUNC",
    "LAYER",
    "LUMIA",
    "MAGIC",
    "MANA",
    "MANTA",
    "MASK",
    "MAV",
    "MAVIA",
    "MBOX",
    "MDT",
    "ME",
    "MELANIA",
    "MEME",
    "METIS",
    "MINA",
    "MEW",
    "MKR",
    "MLN",
    "MOCA",
    "MOG",
    "MOODENG",
    "MORPHO",
    "MOVR",
    "MOVE",
    "MTL",
    "MUBARAK",
    "MYRO",
    "NEAR",
    "NEO",
    "NEIRO",
    "NEIROETH",
    "NFP",
    "NIL",
    "NKN",
    "NMR",
    "NOT",
    "NTRN",
    "OCEAN",
    "OGN",
    "OM",
    "OMG",
    "OMNI",
    "ONDO",
    "ONE",
    "ONG",
    "ONT",
    "OP",
    "OXT",
    "ORDI",
    "ORBS",
    "ORCA",
    "PARTI",
    "PAXG",
    "PEOPLE",
    "PENDLE",
    "PENGU",
    "PEPE",
    "PERP",
    "PHA",
    "PHB",
    "PIPPIN",
    "PIXEL",
    "PLUME",
    "PNUT",
    "POL",
    "POLYX",
    "PONKE",
    "POPCAT",
    "PORTAL",
    "POWR",
    "PROM",
    "PYTH",
    "QNT",
    "QTUM",
    "QUICK",
    "RAD",
    "RARE",
    "RAY",
    "RAYSOL",
    "RATS",
    "RDNT",
    "REEF",
    "REI",
    "REN",
    "RENDER",
    "REZ",
    "RIF",
    "RLC",
    "RNDR",
    "RONIN",
    "ROSE",
    "RPL",
    "RSR",
    "RUNE",
    "RVN",
    "S",
    "SAFE",
    "SAGA",
    "SAND",
    "SANTOS",
    "SAT",
    "SATS",
    "SC",
    "SCR",
    "SCRT",
    "SEI",
    "SFP",
    "SHIB",
    "SHELL",
    "SIREN",
    "SKL",
    "SLP",
    "SLERF",
    "SNX",
    "SOL",
    "SOLV",
    "SONIC",
    "SPELL",
    "SPX",
    "SRM",
    "SSV",
    "STEEM",
    "STMX",
    "STORJ",
    "STPT",
    "STRAX",
    "STRK",
    "STG",
    "STX",
    "SUN",
    "SUI",
    "SUPER",
    "SUSHI",
    "SXP",
    "SYN",
    "SYS",
    "T",
    "TAO",
    "THETA",
    "THE",
    "TIA",
    "TLM",
    "TNSR",
    "TON",
    "TOKEN",
    "TRB",
    "TRU",
    "TRUMP",
    "TRX",
    "TST",
    "TURBO",
    "TUT",
    "TWT",
    "UMA",
    "UNFI",
    "UNI",
    "USUAL",
    "USTC",
    "VANRY",
    "VANA",
    "VET",
    "VELODROME",
    "VIC",
    "VINE",
    "VIRTUAL",
    "VOXEL",
    "VTHO",
    "VVV",
    "W",
    "WAL",
    "WAVES",
    "WAXP",
    "WHY",
    "WIF",
    "WLD",
    "WOO",
    "X",
    "XAI",
    "XEC",
    "XEM",
    "XLM",
    "XRP",
    "XTZ",
    "XVG",
    "XVS",
    "YFI",
    "YGG",
    "ZEC",
    "ZEN",
    "ZEREBRO",
    "ZETA",
    "ZIL",
    "ZK",
    "ZRO",
    "ZRX",
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
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1M&startTime=${startDate}&endTime=${endDate}`
    );
    const data = await response.json();

    // Mise à jour du tableau avec les données et la couleur
    const cryptoRow = document.getElementById(symbol);
    let cryptoTotalVariation = 0; // Total des variations pour cette crypto
    let periodCount = 0; // Nombre de périodes pour cette crypto

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
      
      // Ajouter à la variation totale pour cette crypto
      cryptoTotalVariation += weeklyVariation;
      periodCount++;
      
      // Ajouter à la variation globale
      totalVariations += weeklyVariation;
      cryptoCount++;
      
      const cellIndex = i + 1;
      const variationCell = cryptoRow.insertCell(cellIndex);
      const variationValue = weeklyVariation.toFixed(2);

      // Formatage des dates
      const startDateObj = new Date(data[i][0]);
      const endDateObj = new Date(data[i][6]);
      
      const startDateStr = `${startDateObj.getDate().toString().padStart(2, '0')}/${(startDateObj.getMonth()+1).toString().padStart(2, '0')}/${startDateObj.getFullYear().toString().slice(-2)}`;
      const startTimeStr = `${startDateObj.getHours().toString().padStart(2, '0')}:${startDateObj.getMinutes().toString().padStart(2, '0')}`;
      
      const endDateStr = `${endDateObj.getDate().toString().padStart(2, '0')}/${(endDateObj.getMonth()+1).toString().padStart(2, '0')}/${endDateObj.getFullYear().toString().slice(-2)}`;
      const endTimeStr = `${endDateObj.getHours().toString().padStart(2, '0')}:${endDateObj.getMinutes().toString().padStart(2, '0')}`;
      
      variationCell.textContent = `${startDateStr} ${startTimeStr} (${startTimeStr}) - ${endDateStr} ${endTimeStr} (${endTimeStr}) : (${variationValue}%)`;

      if (weeklyVariation > 0) {
        variationCell.classList.add("positive");
      } else if (weeklyVariation < 0) {
        variationCell.classList.add("negative");
      }
    }
    
    // Stocker la variation totale pour cette crypto
    cryptoVariations[symbol] = {
      total: cryptoTotalVariation,
      average: periodCount > 0 ? cryptoTotalVariation / periodCount : 0
    };
    
    // Ajouter une cellule avec le total pour cette crypto
    const totalCell = cryptoRow.insertCell(cryptoRow.cells.length);
    totalCell.textContent = `Total: ${cryptoTotalVariation.toFixed(2)}%`;
    
    // Ajoute la classe en fonction du signe de la variation
    if (cryptoTotalVariation > 0) {
        totalCell.classList.add("positive");
    } else if (cryptoTotalVariation < 0) {
        totalCell.classList.add("negative");
    } else {
        totalCell.classList.add("neutral");
    }
    
    updateTotalAndAverageVariations();
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

  totalVariationsElement.textContent = `Total des variations : ${totalVariations.toFixed(2)}%`;

  const averageVariations = cryptoCount > 0 ? totalVariations / cryptoCount : 0;
  averageVariationsElement.textContent = `Moyenne des variations : ${averageVariations.toFixed(2)}%`;

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

  // Appel de la fonction pour obtenir les taux de variation des cryptos
  fetchCryptoData("1INCH", startTimestamp, endTimestamp);
  fetchCryptoData("AAVE", startTimestamp, endTimestamp);
  fetchCryptoData("ACE", startTimestamp, endTimestamp);
  fetchCryptoData("ACH", startTimestamp, endTimestamp);
  fetchCryptoData("ACX", startTimestamp, endTimestamp);
  fetchCryptoData("ACT", startTimestamp, endTimestamp);
  fetchCryptoData("ADA", startTimestamp, endTimestamp);
  fetchCryptoData("AEVO", startTimestamp, endTimestamp);
  fetchCryptoData("AGIX", startTimestamp, endTimestamp);
  fetchCryptoData("AGLD", startTimestamp, endTimestamp);
  fetchCryptoData("AI", startTimestamp, endTimestamp);
  fetchCryptoData("AI16Z", startTimestamp, endTimestamp);
  fetchCryptoData("AIXBT", startTimestamp, endTimestamp);
  fetchCryptoData("AERGO", startTimestamp, endTimestamp);
  fetchCryptoData("ALCHE", startTimestamp, endTimestamp);
  fetchCryptoData("ALGO", startTimestamp, endTimestamp);
  fetchCryptoData("ALICE", startTimestamp, endTimestamp);
  fetchCryptoData("ALPACA", startTimestamp, endTimestamp);
  fetchCryptoData("ALPHA", startTimestamp, endTimestamp);
  fetchCryptoData("ALT", startTimestamp, endTimestamp);
  fetchCryptoData("AMB", startTimestamp, endTimestamp);
  fetchCryptoData("ANKR", startTimestamp, endTimestamp);
  fetchCryptoData("APE", startTimestamp, endTimestamp);
  fetchCryptoData("API3", startTimestamp, endTimestamp);
  fetchCryptoData("APT", startTimestamp, endTimestamp);
  fetchCryptoData("AR", startTimestamp, endTimestamp);
  fetchCryptoData("ARB", startTimestamp, endTimestamp);
  fetchCryptoData("ARK", startTimestamp, endTimestamp);
  fetchCryptoData("ARKM", startTimestamp, endTimestamp);
  fetchCryptoData("ARPA", startTimestamp, endTimestamp);
  fetchCryptoData("ANIME", startTimestamp, endTimestamp);
  fetchCryptoData("ASTR", startTimestamp, endTimestamp);
  fetchCryptoData("ATA", startTimestamp, endTimestamp);
  fetchCryptoData("ATOM", startTimestamp, endTimestamp);
  fetchCryptoData("AUCTION", startTimestamp, endTimestamp);
  fetchCryptoData("AVAAI", startTimestamp, endTimestamp);
  fetchCryptoData("AVA", startTimestamp, endTimestamp);
  fetchCryptoData("AVAX", startTimestamp, endTimestamp);
  fetchCryptoData("AXL", startTimestamp, endTimestamp);
  fetchCryptoData("AXS", startTimestamp, endTimestamp);
  fetchCryptoData("B3", startTimestamp, endTimestamp);
  fetchCryptoData("BAN", startTimestamp, endTimestamp);
  fetchCryptoData("BANANA", startTimestamp, endTimestamp);
  fetchCryptoData("BANANAS31", startTimestamp, endTimestamp);
  fetchCryptoData("BAND", startTimestamp, endTimestamp);
  fetchCryptoData("BAT", startTimestamp, endTimestamp);
  fetchCryptoData("BAKE", startTimestamp, endTimestamp);
  fetchCryptoData("BB", startTimestamp, endTimestamp);
  fetchCryptoData("BCH", startTimestamp, endTimestamp);
  fetchCryptoData("BEAMX", startTimestamp, endTimestamp);
  fetchCryptoData("BEL", startTimestamp, endTimestamp);
  fetchCryptoData("BERA", startTimestamp, endTimestamp);
  fetchCryptoData("BICO", startTimestamp, endTimestamp);
  fetchCryptoData("BID", startTimestamp, endTimestamp);
  fetchCryptoData("BIGTIME", startTimestamp, endTimestamp);
  fetchCryptoData("BIO", startTimestamp, endTimestamp);
  fetchCryptoData("BMT", startTimestamp, endTimestamp);
  fetchCryptoData("BNB", startTimestamp, endTimestamp);
  fetchCryptoData("BNT", startTimestamp, endTimestamp);
  fetchCryptoData("BNX", startTimestamp, endTimestamp);
  fetchCryptoData("BOME", startTimestamp, endTimestamp);
  fetchCryptoData("BOND", startTimestamp, endTimestamp);
  fetchCryptoData("BONK", startTimestamp, endTimestamp);
  fetchCryptoData("BR", startTimestamp, endTimestamp);
  fetchCryptoData("BRETT", startTimestamp, endTimestamp);
  fetchCryptoData("BROCCOLI714", startTimestamp, endTimestamp);
  fetchCryptoData("BROCCOLIF3B", startTimestamp, endTimestamp);
  fetchCryptoData("BSV", startTimestamp, endTimestamp);
  fetchCryptoData("BSW", startTimestamp, endTimestamp);
  fetchCryptoData("BTC", startTimestamp, endTimestamp);
  fetchCryptoData("BTCDOM", startTimestamp, endTimestamp);
  fetchCryptoData("BABY", startTimestamp, endTimestamp);
  fetchCryptoData("BABYDOGE", startTimestamp, endTimestamp);
  fetchCryptoData("BLUR", startTimestamp, endTimestamp);
  fetchCryptoData("BLZ", startTimestamp, endTimestamp);
  fetchCryptoData("CAKE", startTimestamp, endTimestamp);
  fetchCryptoData("CAT", startTimestamp, endTimestamp);
  fetchCryptoData("CATI", startTimestamp, endTimestamp);
  fetchCryptoData("C98", startTimestamp, endTimestamp);
  fetchCryptoData("CELO", startTimestamp, endTimestamp);
  fetchCryptoData("CELR", startTimestamp, endTimestamp);
  fetchCryptoData("CETUS", startTimestamp, endTimestamp);
  fetchCryptoData("CFX", startTimestamp, endTimestamp);
  fetchCryptoData("CGPT", startTimestamp, endTimestamp);
  fetchCryptoData("CHESS", startTimestamp, endTimestamp);
  fetchCryptoData("CHILLGUY", startTimestamp, endTimestamp);
  fetchCryptoData("CHR", startTimestamp, endTimestamp);
  fetchCryptoData("CHZ", startTimestamp, endTimestamp);
  fetchCryptoData("CKB", startTimestamp, endTimestamp);
  fetchCryptoData("COMBO", startTimestamp, endTimestamp);
  fetchCryptoData("COMP", startTimestamp, endTimestamp);
  fetchCryptoData("COOKIE", startTimestamp, endTimestamp);
  fetchCryptoData("COS", startTimestamp, endTimestamp);
  fetchCryptoData("COTI", startTimestamp, endTimestamp);
  fetchCryptoData("COW", startTimestamp, endTimestamp);
  fetchCryptoData("CRV", startTimestamp, endTimestamp);
  fetchCryptoData("CTK", startTimestamp, endTimestamp);
  fetchCryptoData("CTSI", startTimestamp, endTimestamp);
  fetchCryptoData("CVX", startTimestamp, endTimestamp);
  fetchCryptoData("CVC", startTimestamp, endTimestamp);
  fetchCryptoData("CYBER", startTimestamp, endTimestamp);
  fetchCryptoData("D", startTimestamp, endTimestamp);
  fetchCryptoData("DAR", startTimestamp, endTimestamp);
  fetchCryptoData("DASH", startTimestamp, endTimestamp);
  fetchCryptoData("DEGEN", startTimestamp, endTimestamp);
  fetchCryptoData("DEGO", startTimestamp, endTimestamp);
  fetchCryptoData("DENT", startTimestamp, endTimestamp);
  fetchCryptoData("DEXE", startTimestamp, endTimestamp);
  fetchCryptoData("DF", startTimestamp, endTimestamp);
  fetchCryptoData("DGB", startTimestamp, endTimestamp);
  fetchCryptoData("DIA", startTimestamp, endTimestamp);
  fetchCryptoData("DODOX", startTimestamp, endTimestamp);
  fetchCryptoData("DOGE", startTimestamp, endTimestamp);
  fetchCryptoData("DOGS", startTimestamp, endTimestamp);
  fetchCryptoData("DOT", startTimestamp, endTimestamp);
  fetchCryptoData("DUSK", startTimestamp, endTimestamp);
  fetchCryptoData("DYDX", startTimestamp, endTimestamp);
  fetchCryptoData("DYM", startTimestamp, endTimestamp);
  fetchCryptoData("EDU", startTimestamp, endTimestamp);
  fetchCryptoData("EGLD", startTimestamp, endTimestamp);
  fetchCryptoData("EIGEN", startTimestamp, endTimestamp);
  fetchCryptoData("EOS", startTimestamp, endTimestamp);
  fetchCryptoData("ENA", startTimestamp, endTimestamp);
  fetchCryptoData("ENJ", startTimestamp, endTimestamp);
  fetchCryptoData("ENS", startTimestamp, endTimestamp);
  fetchCryptoData("EPIC", startTimestamp, endTimestamp);
  fetchCryptoData("ETC", startTimestamp, endTimestamp);
  fetchCryptoData("ETH", startTimestamp, endTimestamp);
  fetchCryptoData("ETHFI", startTimestamp, endTimestamp);
  fetchCryptoData("ETHW", startTimestamp, endTimestamp);
  fetchCryptoData("FARTCOIN", startTimestamp, endTimestamp);
  fetchCryptoData("FET", startTimestamp, endTimestamp);
  fetchCryptoData("FIDA", startTimestamp, endTimestamp);
  fetchCryptoData("FIL", startTimestamp, endTimestamp);
  fetchCryptoData("FIO", startTimestamp, endTimestamp);
  fetchCryptoData("FLM", startTimestamp, endTimestamp);
  fetchCryptoData("FLOKI", startTimestamp, endTimestamp);
  fetchCryptoData("FLOW", startTimestamp, endTimestamp);
  fetchCryptoData("FLUX", startTimestamp, endTimestamp);
  fetchCryptoData("FORM", startTimestamp, endTimestamp);
  fetchCryptoData("FORTH", startTimestamp, endTimestamp);
  fetchCryptoData("FRONT", startTimestamp, endTimestamp);
  fetchCryptoData("FTM", startTimestamp, endTimestamp);
  fetchCryptoData("FTT", startTimestamp, endTimestamp);
  fetchCryptoData("FUN", startTimestamp, endTimestamp);
  fetchCryptoData("FXS", startTimestamp, endTimestamp);
  fetchCryptoData("G", startTimestamp, endTimestamp);
  fetchCryptoData("GALA", startTimestamp, endTimestamp);
  fetchCryptoData("GAS", startTimestamp, endTimestamp);
  fetchCryptoData("GHST", startTimestamp, endTimestamp);
  fetchCryptoData("GLM", startTimestamp, endTimestamp);
  fetchCryptoData("GLMR", startTimestamp, endTimestamp);
  fetchCryptoData("GMT", startTimestamp, endTimestamp);
  fetchCryptoData("GMX", startTimestamp, endTimestamp);
  fetchCryptoData("GOAT", startTimestamp, endTimestamp);
  fetchCryptoData("GPS", startTimestamp, endTimestamp);
  fetchCryptoData("GRASS", startTimestamp, endTimestamp);
  fetchCryptoData("GRT", startTimestamp, endTimestamp);
  fetchCryptoData("GRIFFAIN", startTimestamp, endTimestamp);
  fetchCryptoData("GTC", startTimestamp, endTimestamp);
  fetchCryptoData("GUN", startTimestamp, endTimestamp);
  fetchCryptoData("GUNTHY", startTimestamp, endTimestamp);
  fetchCryptoData("HBAR", startTimestamp, endTimestamp);
  fetchCryptoData("HFT", startTimestamp, endTimestamp);
  fetchCryptoData("HIFI", startTimestamp, endTimestamp);
  fetchCryptoData("HIGH", startTimestamp, endTimestamp);
  fetchCryptoData("HIPPO", startTimestamp, endTimestamp);
  fetchCryptoData("HIVE", startTimestamp, endTimestamp);
  fetchCryptoData("HMSTR", startTimestamp, endTimestamp);
  fetchCryptoData("HOT", startTimestamp, endTimestamp);
  fetchCryptoData("HOOK", startTimestamp, endTimestamp);
  fetchCryptoData("ICX", startTimestamp, endTimestamp);
  fetchCryptoData("ID", startTimestamp, endTimestamp);
  fetchCryptoData("IDEX", startTimestamp, endTimestamp);
  fetchCryptoData("ILV", startTimestamp, endTimestamp);
  fetchCryptoData("IMX", startTimestamp, endTimestamp);
  fetchCryptoData("INJ", startTimestamp, endTimestamp);
  fetchCryptoData("IOST", startTimestamp, endTimestamp);
  fetchCryptoData("IOTA", startTimestamp, endTimestamp);
  fetchCryptoData("IOTX", startTimestamp, endTimestamp);
  fetchCryptoData("IO", startTimestamp, endTimestamp);
  fetchCryptoData("IP", startTimestamp, endTimestamp);
  fetchCryptoData("JASMY", startTimestamp, endTimestamp);
  fetchCryptoData("JELLYJELLY", startTimestamp, endTimestamp);
  fetchCryptoData("JOE", startTimestamp, endTimestamp);
  fetchCryptoData("JTO", startTimestamp, endTimestamp);
  fetchCryptoData("JUP", startTimestamp, endTimestamp);
  fetchCryptoData("KAIA", startTimestamp, endTimestamp);
  fetchCryptoData("KAITO", startTimestamp, endTimestamp);
  fetchCryptoData("KAS", startTimestamp, endTimestamp);
  fetchCryptoData("KAVA", startTimestamp, endTimestamp);
  fetchCryptoData("KDA", startTimestamp, endTimestamp);
  fetchCryptoData("KEY", startTimestamp, endTimestamp);
  fetchCryptoData("KMNO", startTimestamp, endTimestamp);
  fetchCryptoData("KLAY", startTimestamp, endTimestamp);
  fetchCryptoData("KNC", startTimestamp, endTimestamp);
  fetchCryptoData("KOMA", startTimestamp, endTimestamp);
  fetchCryptoData("KSM", startTimestamp, endTimestamp);
  fetchCryptoData("LDO", startTimestamp, endTimestamp);
  fetchCryptoData("LEVER", startTimestamp, endTimestamp);
  fetchCryptoData("LINA", startTimestamp, endTimestamp);
  fetchCryptoData("LINK", startTimestamp, endTimestamp);
  fetchCryptoData("LISTA", startTimestamp, endTimestamp);
  fetchCryptoData("LIT", startTimestamp, endTimestamp);
  fetchCryptoData("LOKA", startTimestamp, endTimestamp);
  fetchCryptoData("LOOM", startTimestamp, endTimestamp);
  fetchCryptoData("LPT", startTimestamp, endTimestamp);
  fetchCryptoData("LQTY", startTimestamp, endTimestamp);
  fetchCryptoData("LRC", startTimestamp, endTimestamp);
  fetchCryptoData("LSK", startTimestamp, endTimestamp);
  fetchCryptoData("LTC", startTimestamp, endTimestamp);
  fetchCryptoData("LUNA2", startTimestamp, endTimestamp);
  fetchCryptoData("LUNC", startTimestamp, endTimestamp);
  fetchCryptoData("LAYER", startTimestamp, endTimestamp);
  fetchCryptoData("LUMIA", startTimestamp, endTimestamp);
  fetchCryptoData("MAGIC", startTimestamp, endTimestamp);
  fetchCryptoData("MANA", startTimestamp, endTimestamp);
  fetchCryptoData("MANTA", startTimestamp, endTimestamp);
  fetchCryptoData("MASK", startTimestamp, endTimestamp);
  fetchCryptoData("MAV", startTimestamp, endTimestamp);
  fetchCryptoData("MAVIA", startTimestamp, endTimestamp);
  fetchCryptoData("MBOX", startTimestamp, endTimestamp);
  fetchCryptoData("MDT", startTimestamp, endTimestamp);
  fetchCryptoData("ME", startTimestamp, endTimestamp);
  fetchCryptoData("MELANIA", startTimestamp, endTimestamp);
  fetchCryptoData("MEME", startTimestamp, endTimestamp);
  fetchCryptoData("METIS", startTimestamp, endTimestamp);
  fetchCryptoData("MINA", startTimestamp, endTimestamp);
  fetchCryptoData("MEW", startTimestamp, endTimestamp);
  fetchCryptoData("MKR", startTimestamp, endTimestamp);
  fetchCryptoData("MLN", startTimestamp, endTimestamp);
  fetchCryptoData("MOCA", startTimestamp, endTimestamp);
  fetchCryptoData("MOG", startTimestamp, endTimestamp);
  fetchCryptoData("MOODENG", startTimestamp, endTimestamp);
  fetchCryptoData("MORPHO", startTimestamp, endTimestamp);
  fetchCryptoData("MOVR", startTimestamp, endTimestamp);
  fetchCryptoData("MOVE", startTimestamp, endTimestamp);
  fetchCryptoData("MTL", startTimestamp, endTimestamp);
  fetchCryptoData("MUBARAK", startTimestamp, endTimestamp);
  fetchCryptoData("MYRO", startTimestamp, endTimestamp);
  fetchCryptoData("NEAR", startTimestamp, endTimestamp);
  fetchCryptoData("NEO", startTimestamp, endTimestamp);
  fetchCryptoData("NEIRO", startTimestamp, endTimestamp);
  fetchCryptoData("NEIROETH", startTimestamp, endTimestamp);
  fetchCryptoData("NFP", startTimestamp, endTimestamp);
  fetchCryptoData("NIL", startTimestamp, endTimestamp);
  fetchCryptoData("NKN", startTimestamp, endTimestamp);
  fetchCryptoData("NMR", startTimestamp, endTimestamp);
  fetchCryptoData("NOT", startTimestamp, endTimestamp);
  fetchCryptoData("NTRN", startTimestamp, endTimestamp);
  fetchCryptoData("OCEAN", startTimestamp, endTimestamp);
  fetchCryptoData("OGN", startTimestamp, endTimestamp);
  fetchCryptoData("OM", startTimestamp, endTimestamp);
  fetchCryptoData("OMG", startTimestamp, endTimestamp);
  fetchCryptoData("OMNI", startTimestamp, endTimestamp);
  fetchCryptoData("ONDO", startTimestamp, endTimestamp);
  fetchCryptoData("ONE", startTimestamp, endTimestamp);
  fetchCryptoData("ONG", startTimestamp, endTimestamp);
  fetchCryptoData("ONT", startTimestamp, endTimestamp);
  fetchCryptoData("OP", startTimestamp, endTimestamp);
  fetchCryptoData("OXT", startTimestamp, endTimestamp);
  fetchCryptoData("ORDI", startTimestamp, endTimestamp);
  fetchCryptoData("ORBS", startTimestamp, endTimestamp);
  fetchCryptoData("ORCA", startTimestamp, endTimestamp);
  fetchCryptoData("PARTI", startTimestamp, endTimestamp);
  fetchCryptoData("PAXG", startTimestamp, endTimestamp);
  fetchCryptoData("PEOPLE", startTimestamp, endTimestamp);
  fetchCryptoData("PENDLE", startTimestamp, endTimestamp);
  fetchCryptoData("PENGU", startTimestamp, endTimestamp);
  fetchCryptoData("PEPE", startTimestamp, endTimestamp);
  fetchCryptoData("PERP", startTimestamp, endTimestamp);
  fetchCryptoData("PHA", startTimestamp, endTimestamp);
  fetchCryptoData("PHB", startTimestamp, endTimestamp);
  fetchCryptoData("PIPPIN", startTimestamp, endTimestamp);
  fetchCryptoData("PIXEL", startTimestamp, endTimestamp);
  fetchCryptoData("PLUME", startTimestamp, endTimestamp);
  fetchCryptoData("PNUT", startTimestamp, endTimestamp);
  fetchCryptoData("POL", startTimestamp, endTimestamp);
  fetchCryptoData("POLYX", startTimestamp, endTimestamp);
  fetchCryptoData("PONKE", startTimestamp, endTimestamp);
  fetchCryptoData("POPCAT", startTimestamp, endTimestamp);
  fetchCryptoData("PORTAL", startTimestamp, endTimestamp);
  fetchCryptoData("POWR", startTimestamp, endTimestamp);
  fetchCryptoData("PROM", startTimestamp, endTimestamp);
  fetchCryptoData("PYTH", startTimestamp, endTimestamp);
  fetchCryptoData("QNT", startTimestamp, endTimestamp);
  fetchCryptoData("QTUM", startTimestamp, endTimestamp);
  fetchCryptoData("QUICK", startTimestamp, endTimestamp);
  fetchCryptoData("RAD", startTimestamp, endTimestamp);
  fetchCryptoData("RARE", startTimestamp, endTimestamp);
  fetchCryptoData("RAY", startTimestamp, endTimestamp);
  fetchCryptoData("RAYSOL", startTimestamp, endTimestamp);
  fetchCryptoData("RATS", startTimestamp, endTimestamp);
  fetchCryptoData("RDNT", startTimestamp, endTimestamp);
  fetchCryptoData("REEF", startTimestamp, endTimestamp);
  fetchCryptoData("REI", startTimestamp, endTimestamp);
  fetchCryptoData("REN", startTimestamp, endTimestamp);
  fetchCryptoData("RENDER", startTimestamp, endTimestamp);
  fetchCryptoData("REZ", startTimestamp, endTimestamp);
  fetchCryptoData("RIF", startTimestamp, endTimestamp);
  fetchCryptoData("RLC", startTimestamp, endTimestamp);
  fetchCryptoData("RNDR", startTimestamp, endTimestamp);
  fetchCryptoData("RONIN", startTimestamp, endTimestamp);
  fetchCryptoData("ROSE", startTimestamp, endTimestamp);
  fetchCryptoData("RPL", startTimestamp, endTimestamp);
  fetchCryptoData("RSR", startTimestamp, endTimestamp);
  fetchCryptoData("RUNE", startTimestamp, endTimestamp);
  fetchCryptoData("RVN", startTimestamp, endTimestamp);
  fetchCryptoData("S", startTimestamp, endTimestamp);
  fetchCryptoData("SAFE", startTimestamp, endTimestamp);
  fetchCryptoData("SAGA", startTimestamp, endTimestamp);
  fetchCryptoData("SAND", startTimestamp, endTimestamp);
  fetchCryptoData("SANTOS", startTimestamp, endTimestamp);
  fetchCryptoData("SAT", startTimestamp, endTimestamp);
  fetchCryptoData("SATS", startTimestamp, endTimestamp);
  fetchCryptoData("SC", startTimestamp, endTimestamp);
  fetchCryptoData("SCR", startTimestamp, endTimestamp);
  fetchCryptoData("SCRT", startTimestamp, endTimestamp);
  fetchCryptoData("SEI", startTimestamp, endTimestamp);
  fetchCryptoData("SFP", startTimestamp, endTimestamp);
  fetchCryptoData("SHIB", startTimestamp, endTimestamp);
  fetchCryptoData("SHELL", startTimestamp, endTimestamp);
  fetchCryptoData("SIREN", startTimestamp, endTimestamp);
  fetchCryptoData("SKL", startTimestamp, endTimestamp);
  fetchCryptoData("SLP", startTimestamp, endTimestamp);
  fetchCryptoData("SLERF", startTimestamp, endTimestamp);
  fetchCryptoData("SNX", startTimestamp, endTimestamp);
  fetchCryptoData("SOL", startTimestamp, endTimestamp);
  fetchCryptoData("SOLV", startTimestamp, endTimestamp);
  fetchCryptoData("SONIC", startTimestamp, endTimestamp);
  fetchCryptoData("SPELL", startTimestamp, endTimestamp);
  fetchCryptoData("SPX", startTimestamp, endTimestamp);
  fetchCryptoData("SRM", startTimestamp, endTimestamp);
  fetchCryptoData("SSV", startTimestamp, endTimestamp);
  fetchCryptoData("STEEM", startTimestamp, endTimestamp);
  fetchCryptoData("STMX", startTimestamp, endTimestamp);
  fetchCryptoData("STORJ", startTimestamp, endTimestamp);
  fetchCryptoData("STPT", startTimestamp, endTimestamp);
  fetchCryptoData("STRAX", startTimestamp, endTimestamp);
  fetchCryptoData("STRK", startTimestamp, endTimestamp);
  fetchCryptoData("STG", startTimestamp, endTimestamp);
  fetchCryptoData("STX", startTimestamp, endTimestamp);
  fetchCryptoData("SUN", startTimestamp, endTimestamp);
  fetchCryptoData("SUI", startTimestamp, endTimestamp);
  fetchCryptoData("SUPER", startTimestamp, endTimestamp);
  fetchCryptoData("SUSHI", startTimestamp, endTimestamp);
  fetchCryptoData("SXP", startTimestamp, endTimestamp);
  fetchCryptoData("SYN", startTimestamp, endTimestamp);
  fetchCryptoData("SYS", startTimestamp, endTimestamp);
  fetchCryptoData("T", startTimestamp, endTimestamp);
  fetchCryptoData("TAO", startTimestamp, endTimestamp);
  fetchCryptoData("THETA", startTimestamp, endTimestamp);
  fetchCryptoData("THE", startTimestamp, endTimestamp);
  fetchCryptoData("TIA", startTimestamp, endTimestamp);
  fetchCryptoData("TLM", startTimestamp, endTimestamp);
  fetchCryptoData("TNSR", startTimestamp, endTimestamp);
  fetchCryptoData("TON", startTimestamp, endTimestamp);
  fetchCryptoData("TOKEN", startTimestamp, endTimestamp);
  fetchCryptoData("TRB", startTimestamp, endTimestamp);
  fetchCryptoData("TRU", startTimestamp, endTimestamp);
  fetchCryptoData("TRUMP", startTimestamp, endTimestamp);
  fetchCryptoData("TRX", startTimestamp, endTimestamp);
  fetchCryptoData("TST", startTimestamp, endTimestamp);
  fetchCryptoData("TURBO", startTimestamp, endTimestamp);
  fetchCryptoData("TUT", startTimestamp, endTimestamp);
  fetchCryptoData("TWT", startTimestamp, endTimestamp);
  fetchCryptoData("UMA", startTimestamp, endTimestamp);
  fetchCryptoData("UNFI", startTimestamp, endTimestamp);
  fetchCryptoData("UNI", startTimestamp, endTimestamp);
  fetchCryptoData("USUAL", startTimestamp, endTimestamp);
  fetchCryptoData("USTC", startTimestamp, endTimestamp);
  fetchCryptoData("VANRY", startTimestamp, endTimestamp);
  fetchCryptoData("VANA", startTimestamp, endTimestamp);
  fetchCryptoData("VET", startTimestamp, endTimestamp);
  fetchCryptoData("VELODROME", startTimestamp, endTimestamp);
  fetchCryptoData("VIC", startTimestamp, endTimestamp);
  fetchCryptoData("VINE", startTimestamp, endTimestamp);
  fetchCryptoData("VIRTUAL", startTimestamp, endTimestamp);
  fetchCryptoData("VOXEL", startTimestamp, endTimestamp);
  fetchCryptoData("VTHO", startTimestamp, endTimestamp);
  fetchCryptoData("VVV", startTimestamp, endTimestamp);
  fetchCryptoData("W", startTimestamp, endTimestamp);
  fetchCryptoData("WAL", startTimestamp, endTimestamp);
  fetchCryptoData("WAVES", startTimestamp, endTimestamp);
  fetchCryptoData("WAXP", startTimestamp, endTimestamp);
  fetchCryptoData("WHY", startTimestamp, endTimestamp);
  fetchCryptoData("WIF", startTimestamp, endTimestamp);
  fetchCryptoData("WLD", startTimestamp, endTimestamp);
  fetchCryptoData("WOO", startTimestamp, endTimestamp);
  fetchCryptoData("X", startTimestamp, endTimestamp);
  fetchCryptoData("XAI", startTimestamp, endTimestamp);
  fetchCryptoData("XEC", startTimestamp, endTimestamp);
  fetchCryptoData("XEM", startTimestamp, endTimestamp);
  fetchCryptoData("XLM", startTimestamp, endTimestamp);
  fetchCryptoData("XRP", startTimestamp, endTimestamp);
  fetchCryptoData("XTZ", startTimestamp, endTimestamp);
  fetchCryptoData("XVG", startTimestamp, endTimestamp);
  fetchCryptoData("XVS", startTimestamp, endTimestamp);
  fetchCryptoData("YFI", startTimestamp, endTimestamp);
  fetchCryptoData("YGG", startTimestamp, endTimestamp);
  fetchCryptoData("ZEC", startTimestamp, endTimestamp);
  fetchCryptoData("ZEN", startTimestamp, endTimestamp);
  fetchCryptoData("ZEREBRO", startTimestamp, endTimestamp);
  fetchCryptoData("ZETA", startTimestamp, endTimestamp);
  fetchCryptoData("ZIL", startTimestamp, endTimestamp);
  fetchCryptoData("ZK", startTimestamp, endTimestamp);
  fetchCryptoData("ZRO", startTimestamp, endTimestamp);
  fetchCryptoData("ZRX", startTimestamp, endTimestamp);


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