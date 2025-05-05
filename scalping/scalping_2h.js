// Fonction pour afficher une notification système
function showPopup(message) {
    const currentDate = new Date().toLocaleString();
    const messageWithDate = `${message} - ${currentDate}`;
  
    if (Notification.permission === "granted") {
      new Notification("Signal Crypto", {
        body: messageWithDate,
        icon: "https://example.com/icon.png",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Signal Crypto", {
            body: messageWithDate,
            icon: "https://example.com/icon.png",
          });
        }
      });
    }
  }
  
  // Fonction pour effacer les notifications précédentes (ne touche pas cryptoNames)
  function clearNotifications() {
    // Ne fait rien pour cryptoNamesElement, car nous ne voulons pas effacer son contenu ici
  }
  
  // Fonction pour récupérer et afficher les données crypto
  async function fetchCryptoData(symbol) {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=2h&limit=1`
      );
      const data = await response.json();
  
      if (!data || data.length === 0) {
        console.error(`Aucune donnée reçue pour ${symbol}`);
        return;
      }
  
      let totalVariation = 0;
      const cryptoRow = document.getElementById(symbol);
  
      // Réinitialiser les cellules
      while (cryptoRow.cells.length > 1) {
        cryptoRow.deleteCell(1);
      }
  
      for (let i = 0; i < data.length; i++) {
        const openPrice = parseFloat(data[i][1]);
        const closePrice = parseFloat(data[i][4]);
        const variation = ((closePrice - openPrice) / openPrice) * 100;
  
        // Options pour le formatage de la date et l'heure
        const optionsDate = { day: "2-digit", month: "2-digit", year: "2-digit" };
        const optionsTime = { hour: "2-digit", minute: "2-digit" };
  
        // Récupérer les dates de début et de fin
        const weekStartDate = new Date(data[i][0]); // Timestamp de début
        const weekEndDate = new Date(data[i][6]); // Timestamp de fin
  
        // Ajouter la variation avec l'intervalle
        const variationCell = cryptoRow.insertCell(i + 1);
        variationCell.textContent = `${weekStartDate.toLocaleDateString(
          "fr-FR",
          optionsDate
        )} (${weekStartDate.toLocaleTimeString(
          "fr-FR",
          optionsTime
        )}) - ${weekEndDate.toLocaleDateString(
          "fr-FR",
          optionsDate
        )} (${weekEndDate.toLocaleTimeString(
          "fr-FR",
          optionsTime
        )}): ${variation.toFixed(2)}%`;
  
        variationCell.classList.add(variation > 0 ? "positive" : "negative");
  
        totalVariation += variation;
      }
  
      const totalCell = cryptoRow.insertCell(-1);
      totalCell.textContent = `${totalVariation.toFixed(2)}%`;
      totalCell.style.textAlign = "center";
  
      // Ne pas effacer cryptoNames ici car on veut garder les éléments affichés
      const cryptoNamesElement = document.getElementById("cryptoNames");
      document.querySelector(`#${symbol}_status`)?.remove();
  
      if (totalVariation >= 10) {
        totalCell.classList.add("positive");
        const pElement = document.createElement("p");
        pElement.id = `${symbol}_status`;
        pElement.classList.add("positive");
        pElement.textContent = `${symbol}: LONG, ${totalVariation.toFixed(2)}%`;
        cryptoNamesElement.appendChild(pElement);
        showPopup(
          `${symbol}: LONG signal détecté - 2 HEURE(${totalVariation.toFixed(
            2
          )}%)`
        );
      } else if (totalVariation <= -10) {
        totalCell.classList.add("negative");
        const pElement = document.createElement("p");
        pElement.id = `${symbol}_status`;
        pElement.classList.add("negative");
        pElement.textContent = `${symbol}: SHORT, ${totalVariation.toFixed(2)}%`;
        cryptoNamesElement.appendChild(pElement);
        showPopup(
          `${symbol}: SHORT signal détecté - 2 HEURE(${totalVariation.toFixed(
            2
          )}%)`
        );
      }
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des données pour ${symbol}:`,
        error
      );
    }
  }
  
  // Fonction pour calculer et ajuster l'intervalle de rafraîchissement
  function calculerProchainRafraichissement() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
  
    // Calculer l'écart en secondes jusqu'au prochain 0 minutes 40
    const nextRefreshInSeconds =
      1 * 60 + 30 - ((minutes * 60 + seconds) % (1 * 60 + 30));
  
    return nextRefreshInSeconds * 1000; // Convertir en millisecondes
  }
  
  // Démarrage de l'actualisation
  function startAutoRefresh() {
    const cryptoSymbols = [
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
    ]; // Ajoutez d'autres symboles crypto si nécessaire
    cryptoSymbols.forEach((symbol) => fetchCryptoData(symbol));
  
    mettreAJourHeure();
  }
  
  // Fonction pour mettre à jour l'heure
  function mettreAJourHeure() {
    var elementHeure = document.getElementById("heure");
    var maintenant = new Date();
  
    var heureFormatee = maintenant.toLocaleString();
    elementHeure.textContent = heureFormatee;
  }
  
  // Lancer l'actualisation immédiate, puis la répéter toutes les 2 minutes 30
  startAutoRefresh();
  setInterval(() => {
    startAutoRefresh();
  }, calculerProchainRafraichissement());
  