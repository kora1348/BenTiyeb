function dateToTimestamp(dateTimeStr) {
  const [dateStr, timeStr] = dateTimeStr.split(' ');
  const [day, month, year] = dateStr.split('/');
  const [hours, minutes] = timeStr ? timeStr.split(':') : ['00', '00'];
  
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`).getTime();
}

// Calcule le nombre d'heures entre deux dates
function getHoursBetweenDates(startDate, endDate) {
  const start = dateToTimestamp(startDate);
  const end = endDate ? dateToTimestamp(endDate) : Date.now();
  return Math.ceil((end - start) / (1000 * 60 * 60)); // en heures
}

// Fonction principale pour récupérer et afficher les données crypto
async function fetchCryptoData(symbol, startDate = "01/01/2025 01:00", endDate = null) {
  try {
    const startTime = dateToTimestamp(startDate);
    const endTime = endDate ? dateToTimestamp(endDate) : Date.now();
    
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&startTime=${startTime}&endTime=${endTime}`
    );
    const data = await response.json();

    let totalVariation = 0;
    const cryptoRow = document.getElementById(symbol);

    // Vider toutes les cellules sauf la première (nom de la crypto)
    while (cryptoRow.cells.length > 1) {
      cryptoRow.deleteCell(1);
    }

    // Créer les colonnes pour chaque heure
    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const hourlyVariation = ((closePrice - openPrice) / openPrice) * 100;
      
      const variationCell = cryptoRow.insertCell(-1);
      const variationValue = hourlyVariation.toFixed(2);
      
      const hourDate = new Date(data[i][0]);
      variationCell.textContent = `${hourDate.toLocaleDateString("fr-FR")} ${hourDate.getHours()}h: ${variationValue}%`;

      // Ajouter une classe CSS pour les valeurs positives/négatives
      if (hourlyVariation > 0) {
        variationCell.classList.add("positive");
      } else if (hourlyVariation < 0) {
        variationCell.classList.add("negative");
      }

      totalVariation += hourlyVariation;
    }

    // CALCUL DU TOTAL (moyenne des variations horaires)
    const hoursCount = data.length;
    const averageVariation = totalVariation / hoursCount;
    
    // Ajouter la cellule Total à la fin
    const totalCell = cryptoRow.insertCell(-1);
    const totalValue = averageVariation.toFixed(2);
    totalCell.textContent = `${totalValue}% (sur ${hoursCount} heures)`;
    totalCell.style.textAlign = "center";

    // Mettre à jour l'affichage des recommandations
    const cryptoNamesElement = document.getElementById("cryptoNames");
    const existingStatus = document.getElementById(`${symbol}_status`);
    
    if (existingStatus) {
      existingStatus.remove();
    }

    // Utiliser averageVariation pour les décisions
    if (averageVariation >= 12 ) {
      totalCell.classList.add("positive");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
    } else if (averageVariation < -12) {
      totalCell.classList.add("negative");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: SHORT, ${totalValue}%</p>`;
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}

// Met à jour la structure du tableau avec les colonnes des heures
function updateTableStructure(startDate, endDate) {
  const hoursCount = getHoursBetweenDates(startDate, endDate);
  const table = document.querySelector("table");
  
  // Mettre à jour l'en-tête
  const headerRow = table.rows[0];
  while (headerRow.cells.length > 1) {
    headerRow.deleteCell(1);
  }
  
  // Ajouter les colonnes pour chaque heure (groupées par jour pour la lisibilité)
  let currentDay = null;
  for (let i = 0; i < hoursCount; i++) {
    const date = new Date(dateToTimestamp(startDate) + i * 3600 * 1000);
    const dayStr = date.toLocaleDateString("fr-FR");
    
    if (dayStr !== currentDay) {
      currentDay = dayStr;
      const headerCell = headerRow.insertCell(-1);
      headerCell.textContent = dayStr;
      headerCell.colSpan = Math.min(24, hoursCount - i); // Max 24 heures par jour
    }
  }
  
  // Ajouter la colonne Total
  const totalHeader = headerRow.insertCell(-1);
  totalHeader.textContent = "Moyenne";
}

// Rafraîchit toutes les données avec une nouvelle période
function refreshAllDataWithDateRange() {
  const DEFAULT_START_DATE = "01/01/2025 01:00"; // Date de début fixe
  const endDateInput = prompt("Entrez la date de fin (format JJ/MM/AAAA HH:MM, laissez vide pour maintenant):", "");
  
  // Mettre à jour la structure du tableau
  updateTableStructure(DEFAULT_START_DATE, endDateInput || new Date().toLocaleDateString("fr-FR") + " " + new Date().getHours() + ":00");
  
  // Vider les résultats précédents
  document.getElementById("cryptoNames").innerHTML = "";
  
  // Liste des cryptos à analyser
  const allCryptos = ["1INCH","AAVE","ACE","ACH","ACX","ACT","ADA","AEVO","AGIX","AGLD","AI","AI16Z","AIXBT","AERGO","ALCHE","ALGO","ALICE","ALPACA","ALPHA","ALT","AMB","ANKR","APE","API3","APT","AR","ARB","ARK","ARKM","ARPA","ANIME","ASTR","ATA","ATOM","AUCTION","AVAAI","AVA","AVAX","AXL","AXS","B3","BADGER","BAL","BAN","BANANA","BANANAS31","BAND","BAT","BAKE","BB","BCH","BEAMX","BEL","BERA","BICO","BID","BIGTIME","BIO","BMT","BNB","BNT","BNX","BOME","BOND","BONK","BR","BRETT","BROCCOLI714","BROCCOLIF3B","BSV","BSW","BTC","BTCDOM","BABY","BABYDOGE","BLUR","BLZ","CAKE","CAT","CATI","C98","CELO","CELR","CETUS","CFX","CGPT","CHESS","CHILLGUY","CHR","CHZ","CKB","COMBO","COMP","COOKIE","COS","COTI","COW","CRV","CTK","CTSI","CVX","CVC","CYBER","D","DAR","DASH","DEGEN","DEGO","DENT","DEXE","DF","DGB","DIA","DODOX","DOGE","DOGS","DOT","DUSK","DYDX","DYM","EDU","EGLD","EIGEN","EOS","ENA","ENJ","ENS","EPIC","ETC","ETH","ETHFI","ETHW","FARTCOIN","FET","FIDA","FIL","FIO","FLM","FLOKI","FLOW","FLUX","FORM","FORTH","FRONT","FTM","FTT","FUN","FXS","G","GALA","GAS","GHST","GLM","GLMR","GMT","GMX","GOAT","GPS","GRASS","GRT","GRIFFAIN","GTC","GUN","GUNTHY","HBAR","HFT","HIFI","HIGH","HIPPO","HIVE","HMSTR","HOT","HOOK","ICX","ID","IDEX","ILV","IMX","INJ","IOST","IOTA","IOTX","IO","IP","JASMY","JELLYJELLY","JOE","JTO","JUP","KAIA","KAITO","KAS","KAVA","KDA","KEY","KMNO","KLAY","KNC","KOMA","KSM","LDO","LEVER","LINA","LINK","LISTA","LIT","LOKA","LOOM","LPT","LQTY","LRC","LSK","LTC","LUNA2","LUNC","LAYER","LUMIA","MAGIC","MANA","MANTA","MASK","MAV","MAVIA","MBOX","MDT","ME","MELANIA","MEME","METIS","MINA","MEW","MKR","MLN","MOCA","MOG","MOODENG","MORPHO","MOVR","MOVE","MTL","MUBARAK","MYRO","NEAR","NEO","NEIRO","NEIROETH","NFP","NIL","NKN","NMR","NOT","NTRN","NULS","OCEAN","OGN","OM","OMG","OMNI","ONDO","ONE","ONG","ONT","OP","OXT","ORDI","ORBS","ORCA","PARTI","PAXG","PEOPLE","PENDLE","PENGU","PEPE","PERP","PHA","PHB","PIPPIN","PIXEL","PLUME","PNUT","POL","POLYX","PONKE","POPCAT","PORTAL","POWR","PROM","PYTH","QNT","QTUM","QUICK","RAD","RARE","RAY","RAYSOL","RATS","RDNT","REEF","REI","REN","RENDER","REZ","RIF","RLC","RNDR","RONIN","ROSE","RPL","RSR","RUNE","RVN","S","SAFE","SAGA","SAND","SANTOS","SAT","SATS","SC","SCR","SCRT","SEI","SFP","SHIB","SHELL","SIREN","SKL","SLP","SLERF","SNT","SNX","SOL","SOLV","SONIC","SPELL","SPX","SRM","SSV","STEEM","STMX","STORJ","STPT","STRAX","STRK","STG","STX","SUN","SUI","SUPER","SUSHI","SXP","SYN","SYS","T","TAO","THETA","THE","TIA","TLM","TNSR","TON","TOKEN","TRB","TRU","TRUMP","TRX","TST","TURBO","TUT","TWT","UMA","UNFI","UNI","USUAL","USTC","VANRY","VANA","VET","VELODROME","VIC","VIDT","VINE","VIRTUAL","VOXEL","VTHO","VVV","W","WAL","WAVES","WAXP","WHY","WIF","WLD","WOO","X","XAI","XEC","XEM","XLM","XRP","XTZ","XVG","XVS","YFI","YGG","ZEC","ZEN","ZEREBRO","ZETA","ZIL","ZK","ZRO","ZRX"];
  
  // Appeler fetchCryptoData pour chaque crypto
  allCryptos.forEach(crypto => {
    fetchCryptoData(crypto, DEFAULT_START_DATE, endDateInput || null);
  });
}

// Initialisation de la page
document.addEventListener("DOMContentLoaded", function() {
  // Créer le bouton de rafraîchissement
  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Changer la période";
  refreshButton.onclick = refreshAllDataWithDateRange;
  document.body.insertBefore(refreshButton, document.body.firstChild);
  
  // Créer le tableau de base
  const table = document.createElement("table");
  const headerRow = table.insertRow();
  headerRow.insertCell().textContent = "Crypto";
  document.body.appendChild(table);
  
  // Créer une ligne pour chaque crypto
  const cryptos = [];
  cryptos.forEach(crypto => {
    const row = table.insertRow();
    row.id = crypto;
    row.insertCell().textContent = crypto;
  });
  
  // Créer un div pour les recommandations
  const recommendationsDiv = document.createElement("div");
  recommendationsDiv.id = "cryptoNames";
  document.body.appendChild(recommendationsDiv);
  
  // Appel initial avec une période par défaut
  const DEFAULT_START_DATE = "01/01/2025 01:00"; // Date de début fixe
  const defaultEnd = new Date().toLocaleDateString("fr-FR") + " " + new Date().getHours() + ":00";
  updateTableStructure(DEFAULT_START_DATE, defaultEnd);
  
  // Charger les données initiales
  allCryptos.forEach(crypto => {
    fetchCryptoData(crypto, DEFAULT_START_DATE, defaultEnd);
  });
});