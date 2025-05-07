// Configuration
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
const interval = "1h";
const limit = 100;

// 1. Fonction pour récupérer les données
async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`
    );
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
    console.error(`Erreur ${symbol}:`, error);
    return { symbol, data: [] };
  }
}

// 2. Calcul des indicateurs avec signal
function calculateIndicators(crypto) {
  const data = crypto.data;
  
  // Moyenne Mobile Volume
  for (let i = 19; i < data.length; i++) {
    let sum = 0;
    for (let j = i - 19; j <= i; j++) sum += data[j].volume;
    data[i].volumeMA20 = sum / 20;
  }
  
  // RSI
  for (let i = 14; i < data.length; i++) {
    let gains = 0, losses = 0;
    for (let j = i - 13; j <= i; j++) {
      const change = data[j].close - data[j-1].close;
      change > 0 ? gains += change : losses -= change;
    }
    const rs = (gains/14) / (losses/14);
    data[i].rsi = 100 - (100 / (1 + rs));
  }
  
  // Détection du signal
  const lastCandle = data[data.length - 1];
  const prevCandle = data[data.length - 2];
  
  crypto.signal = "HOLD";
  if (lastCandle.volume > lastCandle.volumeMA20) {
    if (lastCandle.rsi > 50 && lastCandle.close > prevCandle.high) {
      crypto.signal = "LONG";
    } 
    else if (lastCandle.rsi < 50 && lastCandle.close < prevCandle.low) {
      crypto.signal = "SHORT";
    }
  }
  
  return crypto;
}

// 3. Filtrage et affichage
function updateTable(filter = "ALL") {
  const tableBody = document.getElementById("cryptoTableBody");
  tableBody.innerHTML = ""; // Réinitialiser le tableau
  
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

// 4. Initialisation
let cryptosWithData = [];

async function main() {
  cryptosWithData = await Promise.all(cryptos.map(fetchCryptoData));
  cryptosWithData = cryptosWithData.map(calculateIndicators);
  updateTable();
}

// CSS
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

// HTML à ajouter
const filterControls = document.createElement('div');
filterControls.innerHTML = `
  <button onclick="updateTable('ALL')">Tout voir</button>
  <button onclick="updateTable('LONG')">Seulement LONG</button>
  <button onclick="updateTable('SHORT')">Seulement SHORT</button>
`;
document.body.prepend(filterControls);

// Lancer l'application
main();
setInterval(main, 60000);

fetchCryptoData("AAVE");
fetchCryptoData("ACE");
fetchCryptoData("ACH");
fetchCryptoData("ACX");
fetchCryptoData("ACT");
fetchCryptoData("ADA");
fetchCryptoData("AEVO");
fetchCryptoData("AGIX");
fetchCryptoData("AGLD");
fetchCryptoData("AI");
fetchCryptoData("AI16Z");
fetchCryptoData("AIXBT");
fetchCryptoData("AERGO");
fetchCryptoData("ALCHE");
fetchCryptoData("ALGO");
fetchCryptoData("ALICE");
fetchCryptoData("ALPACA");
fetchCryptoData("ALPHA");
fetchCryptoData("ALT");
fetchCryptoData("AMB");
fetchCryptoData("ANKR");
fetchCryptoData("APE");
fetchCryptoData("API3");
fetchCryptoData("APT");
fetchCryptoData("AR");
fetchCryptoData("ARB");
fetchCryptoData("ARK");
fetchCryptoData("ARKM");
fetchCryptoData("ARPA");
fetchCryptoData("ANIME");
fetchCryptoData("ASTR");
fetchCryptoData("ATA");
fetchCryptoData("ATOM");
fetchCryptoData("AUCTION");
fetchCryptoData("AVAAI");
fetchCryptoData("AVA");
fetchCryptoData("AVAX");
fetchCryptoData("AXL");
fetchCryptoData("AXS");
fetchCryptoData("B3");
fetchCryptoData("BADGER");
fetchCryptoData("BAL");
fetchCryptoData("BAN");
fetchCryptoData("BANANA");
fetchCryptoData("BANANAS31");
fetchCryptoData("BAND");
fetchCryptoData("BAT");
fetchCryptoData("BAKE");
fetchCryptoData("BB");
fetchCryptoData("BCH");
fetchCryptoData("BEAMX");
fetchCryptoData("BEL");
fetchCryptoData("BERA");
fetchCryptoData("BICO");
fetchCryptoData("BID");
fetchCryptoData("BIGTIME");
fetchCryptoData("BIO");
fetchCryptoData("BMT");
fetchCryptoData("BNB");
fetchCryptoData("BNT");
fetchCryptoData("BNX");
fetchCryptoData("BOME");
fetchCryptoData("BOND");
fetchCryptoData("BONK");
fetchCryptoData("BR");
fetchCryptoData("BRETT");
fetchCryptoData("BROCCOLI714");
fetchCryptoData("BROCCOLIF3B");
fetchCryptoData("BSV");
fetchCryptoData("BSW");
fetchCryptoData("BTC");
fetchCryptoData("BTCDOM");
fetchCryptoData("BABY");
fetchCryptoData("BABYDOGE");
fetchCryptoData("BLUR");
fetchCryptoData("BLZ");
fetchCryptoData("CAKE");
fetchCryptoData("CAT");
fetchCryptoData("CATI");
fetchCryptoData("C98");
fetchCryptoData("CELO");
fetchCryptoData("CELR");
fetchCryptoData("CETUS");
fetchCryptoData("CFX");
fetchCryptoData("CGPT");
fetchCryptoData("CHESS");
fetchCryptoData("CHILLGUY");
fetchCryptoData("CHR");
fetchCryptoData("CHZ");
fetchCryptoData("CKB");
fetchCryptoData("COMBO");
fetchCryptoData("COMP");
fetchCryptoData("COOKIE");
fetchCryptoData("COS");
fetchCryptoData("COTI");
fetchCryptoData("COW");
fetchCryptoData("CRV");
fetchCryptoData("CTK");
fetchCryptoData("CTSI");
fetchCryptoData("CVX");
fetchCryptoData("CVC");
fetchCryptoData("CYBER");
fetchCryptoData("D");
fetchCryptoData("DAR");
fetchCryptoData("DASH");
fetchCryptoData("DEGEN");
fetchCryptoData("DEGO");
fetchCryptoData("DENT");
fetchCryptoData("DEXE");
fetchCryptoData("DF");
fetchCryptoData("DGB");
fetchCryptoData("DIA");
fetchCryptoData("DODOX");
fetchCryptoData("DOGE");
fetchCryptoData("DOGS");
fetchCryptoData("DOT");
fetchCryptoData("DUSK");
fetchCryptoData("DYDX");
fetchCryptoData("DYM");
fetchCryptoData("EDU");
fetchCryptoData("EGLD");
fetchCryptoData("EIGEN");
fetchCryptoData("EOS");
fetchCryptoData("ENA");
fetchCryptoData("ENJ");
fetchCryptoData("ENS");
fetchCryptoData("EPIC");
fetchCryptoData("ETC");
fetchCryptoData("ETH");
fetchCryptoData("ETHFI");
fetchCryptoData("ETHW");
fetchCryptoData("FARTCOIN");
fetchCryptoData("FET");
fetchCryptoData("FIDA");
fetchCryptoData("FIL");
fetchCryptoData("FIO");
fetchCryptoData("FLM");
fetchCryptoData("FLOKI");
fetchCryptoData("FLOW");
fetchCryptoData("FLUX");
fetchCryptoData("FORM");
fetchCryptoData("FORTH");
fetchCryptoData("FRONT");
fetchCryptoData("FTM");
fetchCryptoData("FTT");
fetchCryptoData("FUN");
fetchCryptoData("FXS");
fetchCryptoData("G");
fetchCryptoData("GALA");
fetchCryptoData("GAS");
fetchCryptoData("GHST");
fetchCryptoData("GLM");
fetchCryptoData("GLMR");
fetchCryptoData("GMT");
fetchCryptoData("GMX");
fetchCryptoData("GOAT");
fetchCryptoData("GPS");
fetchCryptoData("GRASS");
fetchCryptoData("GRT");
fetchCryptoData("GRIFFAIN");
fetchCryptoData("GTC");
fetchCryptoData("GUN");
fetchCryptoData("GUNTHY");
fetchCryptoData("HBAR");
fetchCryptoData("HFT");
fetchCryptoData("HIFI");
fetchCryptoData("HIGH");
fetchCryptoData("HIPPO");
fetchCryptoData("HIVE");
fetchCryptoData("HMSTR");
fetchCryptoData("HOT");
fetchCryptoData("HOOK");
fetchCryptoData("ICX");
fetchCryptoData("ID");
fetchCryptoData("IDEX");
fetchCryptoData("ILV");
fetchCryptoData("IMX");
fetchCryptoData("INJ");
fetchCryptoData("IOST");
fetchCryptoData("IOTA");
fetchCryptoData("IOTX");
fetchCryptoData("IO");
fetchCryptoData("IP");
fetchCryptoData("JASMY");
fetchCryptoData("JELLYJELLY");
fetchCryptoData("JOE");
fetchCryptoData("JTO");
fetchCryptoData("JUP");
fetchCryptoData("KAIA");
fetchCryptoData("KAITO");
fetchCryptoData("KAS");
fetchCryptoData("KAVA");
fetchCryptoData("KDA");
fetchCryptoData("KEY");
fetchCryptoData("KMNO");
fetchCryptoData("KLAY");
fetchCryptoData("KNC");
fetchCryptoData("KOMA");
fetchCryptoData("KSM");
fetchCryptoData("LDO");
fetchCryptoData("LEVER");
fetchCryptoData("LINA");
fetchCryptoData("LINK");
fetchCryptoData("LISTA");
fetchCryptoData("LIT");
fetchCryptoData("LOKA");
fetchCryptoData("LOOM");
fetchCryptoData("LPT");
fetchCryptoData("LQTY");
fetchCryptoData("LRC");
fetchCryptoData("LSK");
fetchCryptoData("LTC");
fetchCryptoData("LUNA2");
fetchCryptoData("LUNC");
fetchCryptoData("LAYER");
fetchCryptoData("LUMIA");
fetchCryptoData("MAGIC");
fetchCryptoData("MANA");
fetchCryptoData("MANTA");
fetchCryptoData("MASK");
fetchCryptoData("MAV");
fetchCryptoData("MAVIA");
fetchCryptoData("MBOX");
fetchCryptoData("MDT");
fetchCryptoData("ME");
fetchCryptoData("MELANIA");
fetchCryptoData("MEME");
fetchCryptoData("METIS");
fetchCryptoData("MINA");
fetchCryptoData("MEW");
fetchCryptoData("MKR");
fetchCryptoData("MLN");
fetchCryptoData("MOCA");
fetchCryptoData("MOG");
fetchCryptoData("MOODENG");
fetchCryptoData("MORPHO");
fetchCryptoData("MOVR");
fetchCryptoData("MOVE");
fetchCryptoData("MTL");
fetchCryptoData("MUBARAK");
fetchCryptoData("MYRO");
fetchCryptoData("NEAR");
fetchCryptoData("NEO");
fetchCryptoData("NEIRO");
fetchCryptoData("NEIROETH");
fetchCryptoData("NFP");
fetchCryptoData("NIL");
fetchCryptoData("NKN");
fetchCryptoData("NMR");
fetchCryptoData("NOT");
fetchCryptoData("NTRN");
fetchCryptoData("NULS");
fetchCryptoData("OCEAN");
fetchCryptoData("OGN");
fetchCryptoData("OM");
fetchCryptoData("OMG");
fetchCryptoData("OMNI");
fetchCryptoData("ONDO");
fetchCryptoData("ONE");
fetchCryptoData("ONG");
fetchCryptoData("ONT");
fetchCryptoData("OP");
fetchCryptoData("OXT");
fetchCryptoData("ORDI");
fetchCryptoData("ORBS");
fetchCryptoData("ORCA");
fetchCryptoData("PARTI");
fetchCryptoData("PAXG");
fetchCryptoData("PEOPLE");
fetchCryptoData("PENDLE");
fetchCryptoData("PENGU");
fetchCryptoData("PEPE");
fetchCryptoData("PERP");
fetchCryptoData("PHA");
fetchCryptoData("PHB");
fetchCryptoData("PIPPIN");
fetchCryptoData("PIXEL");
fetchCryptoData("PLUME");
fetchCryptoData("PNUT");
fetchCryptoData("POL");
fetchCryptoData("POLYX");
fetchCryptoData("PONKE");
fetchCryptoData("POPCAT");
fetchCryptoData("PORTAL");
fetchCryptoData("POWR");
fetchCryptoData("PROM");
fetchCryptoData("PYTH");
fetchCryptoData("QNT");
fetchCryptoData("QTUM");
fetchCryptoData("QUICK");
fetchCryptoData("RAD");
fetchCryptoData("RARE");
fetchCryptoData("RAY");
fetchCryptoData("RAYSOL");
fetchCryptoData("RATS");
fetchCryptoData("RDNT");
fetchCryptoData("REEF");
fetchCryptoData("REI");
fetchCryptoData("REN");
fetchCryptoData("RENDER");
fetchCryptoData("REZ");
fetchCryptoData("RIF");
fetchCryptoData("RLC");
fetchCryptoData("RNDR");
fetchCryptoData("RONIN");
fetchCryptoData("ROSE");
fetchCryptoData("RPL");
fetchCryptoData("RSR");
fetchCryptoData("RUNE");
fetchCryptoData("RVN");
fetchCryptoData("S");
fetchCryptoData("SAFE");
fetchCryptoData("SAGA");
fetchCryptoData("SAND");
fetchCryptoData("SANTOS");
fetchCryptoData("SAT");
fetchCryptoData("SATS");
fetchCryptoData("SC");
fetchCryptoData("SCR");
fetchCryptoData("SCRT");
fetchCryptoData("SEI");
fetchCryptoData("SFP");
fetchCryptoData("SHIB");
fetchCryptoData("SHELL");
fetchCryptoData("SIREN");
fetchCryptoData("SKL");
fetchCryptoData("SLP");
fetchCryptoData("SLERF");
fetchCryptoData("SNT");
fetchCryptoData("SNX");
fetchCryptoData("SOL");
fetchCryptoData("SOLV");
fetchCryptoData("SONIC");
fetchCryptoData("SPELL");
fetchCryptoData("SPX");
fetchCryptoData("SRM");
fetchCryptoData("SSV");
fetchCryptoData("STEEM");
fetchCryptoData("STMX");
fetchCryptoData("STORJ");
fetchCryptoData("STPT");
fetchCryptoData("STRAX");
fetchCryptoData("STRK");
fetchCryptoData("STG");
fetchCryptoData("STX");
fetchCryptoData("SUN");
fetchCryptoData("SUI");
fetchCryptoData("SUPER");
fetchCryptoData("SUSHI");
fetchCryptoData("SXP");
fetchCryptoData("SYN");
fetchCryptoData("SYS");
fetchCryptoData("T");
fetchCryptoData("TAO");
fetchCryptoData("THETA");
fetchCryptoData("THE");
fetchCryptoData("TIA");
fetchCryptoData("TLM");
fetchCryptoData("TNSR");
fetchCryptoData("TON");
fetchCryptoData("TOKEN");
fetchCryptoData("TRB");
fetchCryptoData("TRU");
fetchCryptoData("TRUMP");
fetchCryptoData("TRX");
fetchCryptoData("TST");
fetchCryptoData("TURBO");
fetchCryptoData("TUT");
fetchCryptoData("TWT");
fetchCryptoData("UMA");
fetchCryptoData("UNFI");
fetchCryptoData("UNI");
fetchCryptoData("USUAL");
fetchCryptoData("USTC");
fetchCryptoData("VANRY");
fetchCryptoData("VANA");
fetchCryptoData("VET");
fetchCryptoData("VELODROME");
fetchCryptoData("VIC");
fetchCryptoData("VINE");
fetchCryptoData("VIRTUAL");
fetchCryptoData("VOXEL");
fetchCryptoData("VTHO");
fetchCryptoData("VVV");
fetchCryptoData("W");
fetchCryptoData("WAL");
fetchCryptoData("WAVES");
fetchCryptoData("WAXP");
fetchCryptoData("WHY");
fetchCryptoData("WIF");
fetchCryptoData("WLD");
fetchCryptoData("WOO");
fetchCryptoData("X");
fetchCryptoData("XAI");
fetchCryptoData("XEC");
fetchCryptoData("XEM");
fetchCryptoData("XLM");
fetchCryptoData("XRP");
fetchCryptoData("XTZ");
fetchCryptoData("XVG");
fetchCryptoData("XVS");
fetchCryptoData("YFI");
fetchCryptoData("YGG");
fetchCryptoData("ZEC");
fetchCryptoData("ZEN");
fetchCryptoData("ZEREBRO");
fetchCryptoData("ZETA");
fetchCryptoData("ZIL");
fetchCryptoData("ZK");
fetchCryptoData("ZRO");
fetchCryptoData("ZRX");

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
