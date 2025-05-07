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

const interval = "1d";
const limit = 100;

async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`
    );
    if (!response.ok) throw new Error(`Symbole invalide : ${symbol}`);
    const data = await response.json();

    return {
      symbol,
      data: data.map(candle => ({
        time: candle[0],
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
        volume: parseFloat(candle[5]),
      }))
    };
  } catch (error) {
    console.warn(`Crypto ignorée : ${symbol} - ${error.message}`);
    return null;
  }
}

function calculateIndicators(crypto) {
  const data = crypto.data;

  // MA20 Volume
  for (let i = 19; i < data.length; i++) {
    let sum = 0;
    for (let j = i - 19; j <= i; j++) sum += data[j].volume;
    data[i].volumeMA20 = sum / 20;
  }

  // RSI 14
  for (let i = 14; i < data.length; i++) {
    let gains = 0, losses = 0;
    for (let j = i - 13; j <= i; j++) {
      const change = data[j].close - data[j - 1].close;
      change > 0 ? gains += change : losses -= change;
    }
    const rs = (gains / 14) / (losses / 14 || 1);
    data[i].rsi = 100 - (100 / (1 + rs));
  }

  // Signal
  const lastCandle = data[data.length - 1];
  const prevCandle = data[data.length - 2];
  crypto.signal = "HOLD";

  if (lastCandle.volume > lastCandle.volumeMA20) {
    // Conditions RSI sécurisées
    const rsi = lastCandle.rsi;

    if (rsi > 50 && rsi < 70 && lastCandle.close > prevCandle.high) {
      crypto.signal = "LONG";
    } else if (rsi < 50 && rsi > 30 && lastCandle.close < prevCandle.low) {
      crypto.signal = "SHORT";
    }
  }

  return crypto;
}

function updateTable(filter = "ALL") {
  const tableBody = document.getElementById("cryptoTableBody");
  tableBody.innerHTML = "";
  cryptosWithData.forEach(crypto => {
    if (filter !== "ALL" && crypto.signal !== filter) return;

    const lastCandle = crypto.data[crypto.data.length - 1];
    const variation = ((lastCandle.close - lastCandle.open) / lastCandle.open) * 100;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${crypto.symbol}(F)</td>
      <td class="${variation >= 0 ? 'positive' : 'negative'}">${variation.toFixed(2)}%</td>
      <td>${lastCandle.volume.toFixed(2)} (${lastCandle.volumeMA20?.toFixed(2) || 'N/A'})</td>
      <td>${lastCandle.rsi?.toFixed(2) || 'N/A'}</td>
      <td class="signal ${crypto.signal.toLowerCase()}">${crypto.signal}</td>
    `;
    tableBody.appendChild(row);
  });
}

let cryptosWithData = [];

async function main() {
  const results = await Promise.all(cryptos.map(fetchCryptoData));
  cryptosWithData = results.filter(r => r !== null).map(calculateIndicators);
  updateTable();
}

// CSS dynamiquement
const style = document.createElement('style');
style.textContent = `
  .positive { color: green; }
  .negative { color: red; }
  .signal.long { background-color: rgba(0,255,0,0.2); font-weight: bold; }
  .signal.short { background-color: rgba(255,0,0,0.2); font-weight: bold; }
  table { border-collapse: collapse; width: 100%; margin-top: 10px; }
  th, td { padding: 8px 12px; border: 1px solid #ddd; }
  button { margin-right: 5px; padding: 5px 10px; }
`;
document.head.appendChild(style);

// Filtres HTML
const filterControls = document.createElement('div');
filterControls.innerHTML = `
  <button onclick="updateTable('ALL')">Tout voir</button>
  <button onclick="updateTable('LONG')">Seulement LONG</button>
  <button onclick="updateTable('SHORT')">Seulement SHORT</button>
`;
document.body.prepend(filterControls);

// Start
main();
setInterval(main, 60000);




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
