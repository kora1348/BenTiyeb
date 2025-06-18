const symbols = [
  "BTC",
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

  "AIXBT",
  "AERGO",

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

  "AVA",
  "AVAX",
  "AXL",
  "AXS",

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

  "BIGTIME",
  "BIO",
  "BMT",
  "BNB",
  "BNT",
  "BNX",
  "BOME",
  "BOND",
  "BONK",

  "BSW",

  "BLUR",
  "BLZ",

  "CAKE",

  "CATI",
  "C98",
  "CELO",
  "CELR",
  "CETUS",
  "CFX",
  "CGPT",
  "CHESS",

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

  "DEGO",
  "DENT",
  "DEXE",
  "DF",
  "DGB",
  "DIA",

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

  "GPS",

  "GRT",

  "GTC",
  "GUN",

  "HBAR",
  "HFT",
  "HIFI",
  "HIGH",

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
  "JASMY",
  "JOE",
  "JTO",
  "JUP",
  "KAIA",
  "KAITO",

  "KAVA",
  "KDA",
  "KEY",
  "KMNO",
  "KLAY",
  "KNC",

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

  "LUNC",
  "LAYER",
  "LUMIA",
  "MAGIC",
  "MANA",
  "MANTA",
  "MASK",
  "MAV",

  "MBOX",
  "MDT",
  "ME",

  "MEME",
  "METIS",
  "MINA",

  "MKR",
  "MLN",

  "MOVR",
  "MOVE",
  "MTL",
  "MUBARAK",

  "NEAR",
  "NEO",
  "NEIRO",

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

  "PIXEL",

  "PNUT",
  "POL",
  "POLYX",

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

  "SAGA",
  "SAND",
  "SANTOS",

  "SC",
  "SCR",
  "SCRT",
  "SEI",
  "SFP",
  "SHIB",
  "SHELL",

  "SKL",
  "SLP",

  "SNX",
  "SOL",
  "SOLV",
  
  "SPELL",
  
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
  
    "VIRTUAL",
    "VOXEL",
    "VTHO",
  
    "W",
  
    "WAVES",
    "WAXP",
 
    "WIF",
    "WLD",
    "WOO",
 
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

    "ZIL",
    "ZK",
    "ZRO",
    "ZRX",
];
const priceData = {};
const alerts = [];

async function fetchCryptoData(symbol) {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=10`
  );
  const data = await res.json();
  return data.map((d) => parseFloat(d[4])); // prix de clôture
}

function pearsonCorrelation(x, y) {
  const n = x.length;
  const avgX = x.reduce((a, b) => a + b, 0) / n;
  const avgY = y.reduce((a, b) => a + b, 0) / n;

  const numerator = x
    .map((xi, i) => (xi - avgX) * (y[i] - avgY))
    .reduce((a, b) => a + b, 0);
  const denominator = Math.sqrt(
    x.map((xi) => Math.pow(xi - avgX, 2)).reduce((a, b) => a + b, 0) *
      y.map((yi) => Math.pow(yi - avgY, 2)).reduce((a, b) => a + b, 0)
  );
  return denominator === 0 ? 0 : numerator / denominator;
}

function percentageChange(arr) {
  const first = arr[0];
  const last = arr[arr.length - 1];
  return ((last - first) / first) * 100;
}

async function generateMatrix() {
  alerts.length = 0;
  const changes = {}; // variation en %

  for (const symbol of symbols) {
    const data = await fetchCryptoData(symbol);
    priceData[symbol] = data;
    changes[symbol] = percentageChange(data);
  }

  // Génération de la matrice
  let html = "<table><tr><th></th>";
  for (const s of symbols) html += `<th>${s}</th>`;
  html += "</tr>";

  const recos = [];

  for (const sym1 of symbols) {
    html += `<tr><th>${sym1}</th>`;
    for (const sym2 of symbols) {
      const corr = pearsonCorrelation(priceData[sym1], priceData[sym2]);
      const rounded = corr.toFixed(2);
      let cls = "low";

      if (Math.abs(corr) > 0.9 && sym1 !== sym2) {
        cls = "very-high";
        const msg = `⚠️ Corrélation très forte (${rounded}) entre ${sym1} et ${sym2}`;
        alerts.push(msg);

        // Recommandation
        const diff = changes[sym1] - changes[sym2];
        if (Math.abs(diff) > 0.5) {
          if (diff > 0) {
            recos.push(`📉 SHORT ${sym1} ou 📈 LONG ${sym2}`);
          } else {
            recos.push(`📉 SHORT ${sym2} ou 📈 LONG ${sym1}`);
          }
        }
      } else if (Math.abs(corr) > 0.8) {
        cls = "high";
      } else if (Math.abs(corr) > 0.5) {
        cls = "medium";
      }

      html += `<td class="${cls}">${rounded}</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("correlationMatrix").innerHTML = html;

  // Alertes
  document.getElementById("alertBox").innerText =
    alerts.length > 0
      ? alerts.join("\n")
      : "Aucune corrélation très forte détectée.";

  // Recos
  const recoList = document.getElementById("recommendations");
  recoList.innerHTML = "";
  recos.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = r;
    recoList.appendChild(li);
  });
}

// Appel initial
generateMatrix();

// Répéter toutes les 5 minutes
setInterval(generateMatrix, 5 * 60 * 1000);
