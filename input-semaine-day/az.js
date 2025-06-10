const cryptos = [
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


let btcTotal = 0;

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

function formatMonth(date) {
  const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const month = monthNames[date.getMonth()];
  const year = String(date.getFullYear()).slice(2);
  return `${month} ${year}`;
}

async function fetchMonthlyCryptoData(symbol, startDate, endDate) {
  try {
    const months = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate && months.length < 6) {
      const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);

      months.push({
        start: monthStart.getTime(),
        end: monthEnd.getTime()
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    const cryptoRow = document.getElementById(symbol);
    let totalVariation = 0;

    for (let i = 0; i < months.length; i++) {
      const { start, end } = months[i];
      const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&startTime=${start}&endTime=${end}`);
      const data = await response.json();

      if (!data.length) continue;

      const openPrice = parseFloat(data[0][1]);
      const closePrice = parseFloat(data[data.length - 1][4]);
      const variation = ((closePrice - openPrice) / openPrice) * 100;

      const variationCell = cryptoRow.insertCell(i + 1);
      variationCell.textContent = `${formatMonth(new Date(start))}: ${variation.toFixed(2)}%`;

      if (variation > 0) {
        variationCell.classList.add("positive");
      } else if (variation < 0) {
        variationCell.classList.add("negative");
      }

      totalVariation += variation;
    }

    // Total column
    const totalCell = cryptoRow.insertCell(-1);
    totalCell.textContent = `${totalVariation.toFixed(2)}%`;
    if (totalVariation > 0) totalCell.classList.add("positive");
    else if (totalVariation < 0) totalCell.classList.add("negative");

    // BTC reference
    if (symbol === "BTC") {
      btcTotal = totalVariation;
      const btcDiffCell = cryptoRow.insertCell(-1);
      btcDiffCell.textContent = "-";
    } else {
      const diffWithBTCCell = cryptoRow.insertCell(-1);
      const diffWithBTC = btcTotal - totalVariation;
      diffWithBTCCell.textContent = `${diffWithBTC.toFixed(2)}%`;
      if (diffWithBTC >= 90) diffWithBTCCell.classList.add("negative");
      else if (diffWithBTC <= -90) diffWithBTCCell.classList.add("positive");
    }

  } catch (error) {
    console.error(`Erreur pour ${symbol} :`, error);
  }
}

async function loadMonthlyData(startTimestamp, endTimestamp) {
  clearExistingVariations();
  btcTotal = 0;

  // 1. Charger BTC d'abord
  await fetchMonthlyCryptoData("BTC", startTimestamp, endTimestamp);

  // 2. Ensuite les autres cryptos
  for (const symbol of cryptos) {
    if (symbol !== "BTC") {
      await fetchMonthlyCryptoData(symbol, startTimestamp, endTimestamp);
    }
  }
}

function fetchDataForPeriod() {
  const startDateVal = document.getElementById("startDate").value;
  const endDateVal = document.getElementById("endDate").value;

  if (!startDateVal || !endDateVal) {
    alert("Veuillez sélectionner une plage de dates.");
    return;
  }

  const startDate = new Date(startDateVal);
  const endDate = new Date(endDateVal);
  const sixMonthsAgo = new Date(endDate);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  const effectiveStartDate = startDate > sixMonthsAgo ? startDate : sixMonthsAgo;

  loadMonthlyData(effectiveStartDate.getTime(), endDate.getTime());
}

window.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 5);

  function toInputDateTimeString(date) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  document.getElementById("startDate").value = toInputDateTimeString(sixMonthsAgo);
  document.getElementById("endDate").value = toInputDateTimeString(now);

  fetchDataForPeriod();
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

function exportToExcel() {
  const table = document.querySelector("table");
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table, { skipHeader: false });

  // Insérer "Total des variations : xx.xx%" dans la cellule B1
  ws["B1"] = { t: "s", v: `Total des variations : ${totalVariations.toFixed(2)}%` };

  // Générer les noms
  const startDateVal = document.getElementById("startDate").value;
  const endDateVal = document.getElementById("endDate").value;

  // Fonction pour formater la date au format JJ-MM-AAAA
  const formatDateForSheet = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const startFormatted = formatDateForSheet(startDateVal);
  const endFormatted = formatDateForSheet(endDateVal);
  
  // Nom du fichier (gardé comme avant)
  const formatDateForFilename = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year}_${hours}h${minutes}`;
  };

  const filenameStart = formatDateForFilename(startDateVal);
  const filenameEnd = formatDateForFilename(endDateVal);
  const filename = `crypto_${filenameStart}a_${filenameEnd}.xlsx`;

  // Nom de la feuille - format simplifié comme demandé
  const sheetName = `${startFormatted}_${endFormatted}`.substring(0, 31);

  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}