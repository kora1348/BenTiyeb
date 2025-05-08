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
let cryptosWithData = [];

async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`);
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

  // MA20 du volume
  for (let i = 19; i < data.length; i++) {
    let sum = 0;
    for (let j = i - 19; j <= i; j++) sum += data[j].volume;
    data[i].volumeMA20 = sum / 20;
  }

  // RSI
  for (let i = 14; i < data.length; i++) {
    let gains = 0, losses = 0;
    for (let j = i - 13; j <= i; j++) {
      const change = data[j].close - data[j - 1].close;
      change > 0 ? gains += change : losses -= change;
    }
    const rs = (gains / 14) / (losses / 14 || 1);
    data[i].rsi = 100 - (100 / (1 + rs));
  }

  const last = data[data.length - 1];
  const prev1 = data[data.length - 2];
  const prev2 = data[data.length - 3];

  // Zones de support/résistance
  crypto.supportResistance = "-";
  if (last.low > prev1.low && prev1.low < prev2.low) {
    crypto.supportResistance = "🟢 Support";
  } else if (last.high < prev1.high && prev1.high > prev2.high) {
    crypto.supportResistance = "🔴 Résistance";
  }

  // Divergence
  crypto.divergence = "-";
  const rsi1 = prev2.rsi;
  const rsi2 = prev1.rsi;
  const rsi3 = last.rsi;
  if (rsi1 && rsi2 && rsi3) {
    if (prev2.close > prev1.close && prev1.close > last.close &&
        rsi1 < rsi2 && rsi2 < rsi3) {
      crypto.divergence = "📈 Divergence HAUSSIÈRE";
    }
    if (prev2.close < prev1.close && prev1.close < last.close &&
        rsi1 > rsi2 && rsi2 > rsi3) {
      crypto.divergence = "📉 Divergence BAISSIÈRE";
    }
  }

  // Signal d'entrée
  crypto.signal = "HOLD";
  if (last.volume > last.volumeMA20) {
    const rsi = last.rsi;
    if (rsi > 50 && rsi < 70 && last.close > prev1.high) {
      crypto.signal = "LONG";
    } else if (rsi < 50 && rsi > 30 && last.close < prev1.low) {
      crypto.signal = "SHORT";
    }
  }

  // Tendance
  crypto.trend = "-";
  if (last.close > prev1.close && prev1.close > prev2.close) {
    crypto.trend = "HAUSSIÈRE";
  } else if (last.close < prev1.close && prev1.close < prev2.close) {
    crypto.trend = "BAISSIÈRE";
  }

  // ⚠️ Alerte entrée
  crypto.entryAlert = "-";
  if (crypto.signal === "LONG" && (last.rsi < 50 || crypto.supportResistance === "🟢 Support")) {
    crypto.entryAlert = "⚠️ Entrée LONG conseillée";
  }
  if (crypto.signal === "SHORT" && (last.rsi > 50 || crypto.supportResistance === "🔴 Résistance")) {
    crypto.entryAlert = "⚠️ Entrée SHORT conseillée";
  }

  // ⚠️ Détection de sortie
  crypto.exitAlert = "-";
  if (crypto.signal === "LONG" && (last.rsi > 70 || crypto.supportResistance === "🔴 Résistance")) {
    crypto.exitAlert = "⚠️ SORTIE LONG CONSEILLÉE";
  }
  if (crypto.signal === "SHORT" && (last.rsi < 30 || crypto.supportResistance === "🟢 Support")) {
    crypto.exitAlert = "⚠️ SORTIE SHORT CONSEILLÉE";
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
    if (crypto.signal === "LONG") row.classList.add("row-long");
    if (crypto.signal === "SHORT") row.classList.add("row-short");

    row.innerHTML = `
      <td>${crypto.symbol}(F)</td>
      <td class="${variation >= 0 ? 'positive' : 'negative'}">${variation.toFixed(2)}%</td>
      <td>${lastCandle.volume.toFixed(2)} (${lastCandle.volumeMA20?.toFixed(2) || 'N/A'})</td>
      <td>${lastCandle.rsi?.toFixed(2) || 'N/A'}</td>
      <td class="signal ${crypto.signal.toLowerCase()}">${crypto.signal}</td>
      <td>${crypto.trend || '-'}</td>
      <td>${crypto.supportResistance}</td>
      <td>${crypto.divergence}</td>
      <td style="color: orange;">${crypto.entryAlert}</td>
      <td style="color: orange;">${crypto.exitAlert}</td>
    `;
    tableBody.appendChild(row);
  });
}

async function main() {
  const results = await Promise.all(cryptos.map(fetchCryptoData));
  cryptosWithData = results.filter(r => r !== null).map(calculateIndicators);
  updateTable();
}

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
