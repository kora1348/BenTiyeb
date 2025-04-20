// Variables globales pour stocker les totaux de toutes les cryptos
const totalVariations = [];

// Fonction pour formater une date au format JJ/MM/AA HH:MM
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} (${hours}:${minutes})`;
}

// Convertit une date format JJ/MM/AAAA HH:MM en timestamp
function dateToTimestamp(dateStr) {
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hours, minutes] = timePart ? timePart.split(':') : ['00', '00'];
  
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`).getTime();
}

async function fetchCryptoData(symbol, endDateStr = null) {
  try {
    const endTime = endDateStr ? dateToTimestamp(endDateStr) : Date.now();
    const startTime = endTime - (7 * 4 * 60 * 60 * 1000); // 7 intervalles de 4h en arrière

    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=4h&startTime=${startTime}&endTime=${endTime}&limit=7`
    );
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status} lors de la récupération des données pour ${symbol}`);
    }
    const data = await response.json();

    if (!data || data.length === 0) {
      console.error(`Aucune donnée trouvée pour ${symbol}`);
      return;
    }

    const cryptoRow = document.getElementById(symbol);
    while (cryptoRow.cells.length > 1) {
      cryptoRow.deleteCell(1);
    }

    // Afficher les 7 derniers intervalles de 4h
    data.forEach(item => {
      const startTime = new Date(item[0]);
      const endTime = new Date(item[0] + (4 * 60 * 60 * 1000) - 1); // 4h plus tard -1ms
      
      const openPrice = parseFloat(item[1]);
      const closePrice = parseFloat(item[4]);

      if (!isNaN(openPrice) && !isNaN(closePrice)) {
        const variation = ((closePrice - openPrice) / openPrice) * 100;
        const variationValue = variation.toFixed(2);
        
        const intervalCell = cryptoRow.insertCell(-1);
        intervalCell.textContent = `${formatDate(startTime)} - ${formatDate(endTime)}: ${variationValue}%`;
        
        if (variation > 0) {
          intervalCell.classList.add("positive");
        } else if (variation < 0) {
          intervalCell.classList.add("negative");
        }
      }
    });

    // Calcul du total (somme des variations)
    const totalVariation = data.reduce((sum, item) => {
      const openPrice = parseFloat(item[1]);
      const closePrice = parseFloat(item[4]);
      return sum + ((closePrice - openPrice) / openPrice) * 100;
    }, 0);

    const totalCell = cryptoRow.insertCell(-1);
    const totalValue = totalVariation.toFixed(2);
    totalCell.textContent = `${totalValue}%`;
    totalCell.style.textAlign = "center";

    const cryptoNamesElement = document.getElementById("cryptoNames");
    const existingStatus = document.getElementById(`${symbol}_status`);
    if (existingStatus) {
      existingStatus.remove();
    }

    if (totalVariation >= 30) {
      totalCell.classList.add("positive");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
    } else if (totalVariation < -30) {
      totalCell.classList.add("negative");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: SHORT, ${totalValue}%</p>`;
    }

    totalVariations.push(totalVariation);
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}

function updateTableStructure() {
  const table = document.querySelector("table");
  const headerRow = table.rows[0];
  
  while (headerRow.cells.length > 1) {
    headerRow.deleteCell(1);
  }

  // Colonnes pour les 7 intervalles
  for (let i = 1; i <= 7; i++) {
    headerRow.insertCell(-1).textContent = `Intervalle ${i}`;
  }

  // Colonne Total
  headerRow.insertCell(-1).textContent = "Total";
}

function refreshAllDataWithDateRange() {
  const endDateInput = prompt("Entrez la date de fin (format JJ/MM/AAAA HH:MM, laissez vide pour maintenant):", "");
  
  // Réinitialiser les totaux globaux
  totalVariations.length = 0;

  updateTableStructure();
  document.getElementById("cryptoNames").innerHTML = "";

  const allCryptos = [
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
"BADGER",
"BAL",
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
"NULS",
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
"SNT",
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
"VIDT",
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

  const table = document.querySelector("table");

  allCryptos.forEach((crypto) => {
    let row = document.getElementById(crypto);
    if (!row) {
      row = table.insertRow();
      row.id = crypto;
      row.insertCell().textContent = crypto;
    }
    fetchCryptoData(crypto, endDateInput || null);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Changer la période";
  refreshButton.onclick = refreshAllDataWithDateRange;
  document.body.insertBefore(refreshButton, document.body.firstChild);

  const table = document.createElement("table");
  const headerRow = table.insertRow();
  headerRow.insertCell().textContent = "Crypto";
  
  // Colonnes pour les 7 intervalles
  for (let i = 1; i <= 7; i++) {
    headerRow.insertCell().textContent = `Intervalle ${i}`;
  }
  
  // Colonne Total
  headerRow.insertCell().textContent = "Total";
  
  document.body.appendChild(table);

  const recommendationsDiv = document.createElement("div");
  recommendationsDiv.id = "cryptoNames";
  document.body.appendChild(recommendationsDiv);

  // Charger directement les données avec la date actuelle
  refreshAllDataWithDateRange();
});