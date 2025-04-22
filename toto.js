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
    const startTime = endTime - (1 * 4 * 60 * 60 * 1000); // 7 intervalles de 4h en arrière

    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=4h&startTime=${startTime}&endTime=${endTime}&limit=1`
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

    if (totalVariation >= 500) {
      totalCell.classList.add("positive");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
    } else if (totalVariation <= -500) {
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
  for (let i = 1; i <= 1; i++) {
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
    "AGLD",
    "AI",
    "AIXBT",
    "ALGO",
    "ALICE",
    "ALPACA",
    "ALPHA",
    "ALT",
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
    "BOME",
    "BONK",
    "BROCCOLI714",
    "BSW",
    "BTC",
    "BABY",
    "BLUR",
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
    "KNC",
    "KSM",
    "LDO",
    "LEVER",
    "LINK",
    "LISTA",
    "LOKA",
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
    "OGN",
    "OM",
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
    "REI",
    "RENDER",
    "REZ",
    "RIF",
    "RLC",
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
    "SSV",
    "STEEM",
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
    "WAXP",
    "WIF",
    "WLD",
    "WOO",
    "XAI",
    "XEC",
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
  for (let i = 1; i <= 1; i++) {
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