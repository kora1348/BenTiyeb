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
  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

function formatHour(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `(${hours}:${minutes})`;
}

async function fetchCryptoData(symbol, startDate, endDate) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&startTime=${startDate}&endTime=${endDate}`
    );
    const data = await response.json();
    const cryptoRow = document.getElementById(symbol);

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const variation = ((closePrice - openPrice) / openPrice) * 100;
      totalVariations += variation;
      cryptoCount++;
      updateTotalAndAverageVariations();

      const cellIndex = i + 1;
      const variationCell = cryptoRow.insertCell(cellIndex);
      const openTime = new Date(data[i][0]);
      const closeTime = new Date(data[i][6]);

      variationCell.textContent = `${formatDate(openTime)} ${formatHour(openTime)} - ${formatDate(closeTime)} ${formatHour(closeTime)} : (${variation.toFixed(2)}%)`;

      if (variation > 0) {
        variationCell.classList.add("positive");
      } else if (variation < 0) {
        variationCell.classList.add("negative");
      }
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}

function updateTotalAndAverageVariations() {
  const totalEl = document.getElementById("totalVariations");
  const averageEl = document.getElementById("averageVariations");

  totalEl.textContent = `Total des variations : ${totalVariations.toFixed(2)}%`;
  const avg = (totalVariations / Math.min(cryptoCount, 151)) * 100;
  averageEl.textContent = `Moyenne des variations : ${avg.toFixed(2)}%`;
}

function getTodayRangeTimestamps() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const end = start + 24 * 60 * 60 * 1000 - 1; // Fin de journée
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

  const startTimestamp = new Date(startDateVal).getTime();
  const endTimestamp = new Date(endDateVal).getTime();

  loadData(startTimestamp, endTimestamp);
}

// Charger automatiquement les données de la date du jour quand la page s’ouvre
window.addEventListener("DOMContentLoaded", () => {
  const { start, end } = getTodayRangeTimestamps();
  loadData(start, end);
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
