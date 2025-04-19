function dateToTimestamp(dateTimeStr) {
  const [dateStr, timeStr] = dateTimeStr.split(' ');
  const [day, month, year] = dateStr.split('/');
  const [hours, minutes] = timeStr ? timeStr.split(':') : ['00', '00'];
  
  // Créer la date en spécifiant le fuseau horaire (Europe/Paris pour la France)
  const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00+01:00`);
  return date.getTime();
}

// Calcule le nombre de minutes depuis minuit jusqu'à l'heure donnée en tenant compte du fuseau horaire
function getMinutesSinceMidnight(dateTimeStr) {
  const [dateStr, timeStr] = dateTimeStr.split(' ');
  const [day, month, year] = dateStr.split('/');
  const [hours, minutes] = timeStr.split(':');
  
  const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
  const midnight = new Date(date);
  midnight.setHours(0, 0, 0, 0);
  
  return Math.floor((date - midnight) / (1000 * 60));
}

// Fonction principale pour récupérer et afficher les données crypto
async function fetchCryptoData(symbol, startDate, endDate = null) {
  try {
    const startTime = dateToTimestamp(startDate);
    const endTime = endDate ? dateToTimestamp(endDate) : Date.now();
    
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1m&startTime=${startTime}&endTime=${endTime}`
    );
    const data = await response.json();

    let totalVariation = 0;
    let intervalCount = 0;
    const cryptoRow = document.getElementById(symbol);

    // Vider toutes les cellules sauf la première (nom de la crypto)
    while (cryptoRow.cells.length > 1) {
      cryptoRow.deleteCell(1);
    }

    // Parcourir les données et additionner les variations
    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const minuteVariation = ((closePrice - openPrice) / openPrice) * 100;
      
      totalVariation += minuteVariation;
      intervalCount++;
    }

    // Calculer la moyenne sur le nombre d'intervalles disponibles
    const averageVariation = intervalCount > 0 ? totalVariation / intervalCount : 0;
    
    // Ajouter la cellule avec le résultat
    const resultCell = cryptoRow.insertCell(-1);
    const resultValue = averageVariation.toFixed(2);
    resultCell.textContent = `${resultValue}% (sur ${intervalCount} min)`;
    resultCell.style.textAlign = "center";

    // Mettre à jour l'affichage des recommandations
    const cryptoNamesElement = document.getElementById("cryptoNames");
    const existingStatus = document.getElementById(`${symbol}_status`);
    
    if (existingStatus) {
      existingStatus.remove();
    }

    // Utiliser averageVariation pour les décisions
    if (averageVariation >= 12) {
      resultCell.classList.add("positive");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${resultValue}%</p>`;
    } else if (averageVariation <= -12) {
      resultCell.classList.add("negative");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: SHORT, ${resultValue}%</p>`;
    } else {
      // Ajouter un cas neutre si nécessaire
      resultCell.classList.add("neutral");
      cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="neutral">${symbol}: NEUTRE, ${resultValue}%</p>`;
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
  }
}

// Rafraîchit toutes les données avec une nouvelle période
function refreshAllDataWithDateRange() {
  const dateInput = prompt("Entrez la date et heure (format JJ/MM/AAAA HH:MM):", "19/04/2025 01:10");
  if (!dateInput) return;
  
  // Vider les résultats précédents
  document.getElementById("cryptoNames").innerHTML = "";
  
  // Liste des cryptos à analyser
    const allCryptos = ["1INCH","AAVE","ACE","ACH","ACX","ACT","ADA","AEVO","AGIX","AGLD","AI","AI16Z","AIXBT","AERGO","ALCHE","ALGO","ALICE","ALPACA","ALPHA","ALT","AMB","ANKR","APE","API3","APT","AR","ARB","ARK","ARKM","ARPA","ANIME","ASTR","ATA","ATOM","AUCTION","AVAAI","AVA","AVAX","AXL","AXS","B3","BADGER","BAL","BAN","BANANA","BANANAS31","BAND","BAT","BAKE","BB","BCH","BEAMX","BEL","BERA","BICO","BID","BIGTIME","BIO","BMT","BNB","BNT","BNX","BOME","BOND","BONK","BR","BRETT","BROCCOLI714","BROCCOLIF3B","BSV","BSW","BTC","BTCDOM","BABY","BABYDOGE","BLUR","BLZ","CAKE","CAT","CATI","C98","CELO","CELR","CETUS","CFX","CGPT","CHESS","CHILLGUY","CHR","CHZ","CKB","COMBO","COMP","COOKIE","COS","COTI","COW","CRV","CTK","CTSI","CVX","CVC","CYBER","D","DAR","DASH","DEGEN","DEGO","DENT","DEXE","DF","DGB","DIA","DODOX","DOGE","DOGS","DOT","DUSK","DYDX","DYM","EDU","EGLD","EIGEN","EOS","ENA","ENJ","ENS","EPIC","ETC","ETH","ETHFI","ETHW","FARTCOIN","FET","FIDA","FIL","FIO","FLM","FLOKI","FLOW","FLUX","FORM","FORTH","FRONT","FTM","FTT","FUN","FXS","G","GALA","GAS","GHST","GLM","GLMR","GMT","GMX","GOAT","GPS","GRASS","GRT","GRIFFAIN","GTC","GUN","GUNTHY","HBAR","HFT","HIFI","HIGH","HIPPO","HIVE","HMSTR","HOT","HOOK","ICX","ID","IDEX","ILV","IMX","INJ","IOST","IOTA","IOTX","IO","IP","JASMY","JELLYJELLY","JOE","JTO","JUP","KAIA","KAITO","KAS","KAVA","KDA","KEY","KMNO","KLAY","KNC","KOMA","KSM","LDO","LEVER","LINA","LINK","LISTA","LIT","LOKA","LOOM","LPT","LQTY","LRC","LSK","LTC","LUNA2","LUNC","LAYER","LUMIA","MAGIC","MANA","MANTA","MASK","MAV","MAVIA","MBOX","MDT","ME","MELANIA","MEME","METIS","MINA","MEW","MKR","MLN","MOCA","MOG","MOODENG","MORPHO","MOVR","MOVE","MTL","MUBARAK","MYRO","NEAR","NEO","NEIRO","NEIROETH","NFP","NIL","NKN","NMR","NOT","NTRN","NULS","OCEAN","OGN","OM","OMG","OMNI","ONDO","ONE","ONG","ONT","OP","OXT","ORDI","ORBS","ORCA","PARTI","PAXG","PEOPLE","PENDLE","PENGU","PEPE","PERP","PHA","PHB","PIPPIN","PIXEL","PLUME","PNUT","POL","POLYX","PONKE","POPCAT","PORTAL","POWR","PROM","PYTH","QNT","QTUM","QUICK","RAD","RARE","RAY","RAYSOL","RATS","RDNT","REEF","REI","REN","RENDER","REZ","RIF","RLC","RNDR","RONIN","ROSE","RPL","RSR","RUNE","RVN","S","SAFE","SAGA","SAND","SANTOS","SAT","SATS","SC","SCR","SCRT","SEI","SFP","SHIB","SHELL","SIREN","SKL","SLP","SLERF","SNT","SNX","SOL","SOLV","SONIC","SPELL","SPX","SRM","SSV","STEEM","STMX","STORJ","STPT","STRAX","STRK","STG","STX","SUN","SUI","SUPER","SUSHI","SXP","SYN","SYS","T","TAO","THETA","THE","TIA","TLM","TNSR","TON","TOKEN","TRB","TRU","TRUMP","TRX","TST","TURBO","TUT","TWT","UMA","UNFI","UNI","USUAL","USTC","VANRY","VANA","VET","VELODROME","VIC","VIDT","VINE","VIRTUAL","VOXEL","VTHO","VVV","W","WAL","WAVES","WAXP","WHY","WIF","WLD","WOO","X","XAI","XEC","XEM","XLM","XRP","XTZ","XVG","XVS","YFI","YGG","ZEC","ZEN","ZEREBRO","ZETA","ZIL","ZK","ZRO","ZRX"];
  
  
  // Appeler fetchCryptoData pour chaque crypto
  allCryptos.forEach(crypto => {
    fetchCryptoData(crypto, dateInput);
  });
}

// Initialisation de la page
document.addEventListener("DOMContentLoaded", function() {
  // Créer le bouton de rafraîchissement
  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Entrer date/heure";
  refreshButton.onclick = refreshAllDataWithDateRange;
  document.body.insertBefore(refreshButton, document.body.firstChild);
  
  // Créer le tableau de base
  const table = document.createElement("table");
  const headerRow = table.insertRow();
  headerRow.insertCell().textContent = "Crypto";
  headerRow.insertCell().textContent = "Résultat";
  document.body.appendChild(table);
  
  // Créer une ligne pour chaque crypto
  const cryptos = ["1INCH"];
  cryptos.forEach(crypto => {
    const row = table.insertRow();
    row.id = crypto;
    row.insertCell().textContent = crypto;
  });
  
  // Créer un div pour les recommandations
  const recommendationsDiv = document.createElement("div");
  recommendationsDiv.id = "cryptoNames";
  document.body.appendChild(recommendationsDiv);
  
  // Charger les données initiales avec une heure par défaut
  const DEFAULT_DATE = "19/04/2025 01:10";
  cryptos.forEach(crypto => {
    fetchCryptoData(crypto, DEFAULT_DATE);
  });
});