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
        `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=1`
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
  
      if (totalVariation >= 4) {
        totalCell.classList.add("positive");
        const pElement = document.createElement("p");
        pElement.id = `${symbol}_status`;
        pElement.classList.add("positive");
        pElement.textContent = `${symbol}: LONG, ${totalVariation.toFixed(2)}%`;
        cryptoNamesElement.appendChild(pElement);
        showPopup(
          `${symbol}: LONG signal détecté - 1 HEURE(${totalVariation.toFixed(
            2
          )}%)`
        );
      } else if (totalVariation <= -4) {
        totalCell.classList.add("negative");
        const pElement = document.createElement("p");
        pElement.id = `${symbol}_status`;
        pElement.classList.add("negative");
        pElement.textContent = `${symbol}: SHORT, ${totalVariation.toFixed(2)}%`;
        cryptoNamesElement.appendChild(pElement);
        showPopup(
          `${symbol}: SHORT signal détecté - 1 HEURE(${totalVariation.toFixed(
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
    const cryptos = [
 "1INCH",
"1MBABYDOGE",
"AAVE",
"ACE",
"ACH",
"ACT",
"ACX",
"ADA",
"AERGO",
"AERO",
"AEVO",
"AGLD",
"AI16Z",
"AIOT",
"AIU",
"AIXBT",
"AKT",
"ALCH",
"ALGO",
"ALICE",
"ALPHA",
"ALPINE",
"ALT",
"ANIME",
"ANKR",
"APE",
"API3",
"APT",
"AR",
"ARB",
"ARC",
"ARK",
"ARKM",
"ARPA",
"ASR",
"ASTR",
"ATA",
"ATH",
"ATOM",
"AUCTION",
"AVA",
"AVAAI",
"AVAX",
"AXL",
"AXS",
"B2",
"B3",
"BABY",
"BAKE",
"BAN",
"BANANA",
"BANANAS31",
"BAND",
"BANK",
"BAT",
"BB",
"BCH",
"BEAMX",
"BEL",
"BERA",
"BICO",
"BID",
"BIGTIME",
"BIO",
"BLUR",
"BNB",
"BNT",
"BOME",
"BONK",
"BR",
"BRETT",
"BROCCOLI714",
"BROCCOLIF3B",
"BSV",
"BSW",
"BTCDOM",
"BTM",
"CAT",
"CHEEMS",
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
"CYBER",
"DASH",
"DEEP",
"DEFI",
"DYM",
"EDU",
"EGLD",
"EIGEN",
"ENA",
"ENJ",
"ENS",
"EOS",
"EPIC",
"EPT",
"ETC",
"FLM",
"FLOKI",
"FLOW",
"FLUX",
"FORM",
"FORTH",
"FUN",
"FXS",
"GALA",
"GAS",
"GHST",
"GLM",
"GMT",
"GMX",
"GOAT",
"GPS",
"GRASS",
"HMSTR",
"HOOK",
"HOT",
"HYPER",
"ICP",
"ICX",
"ID",
"ILV",
"IMX",
"INIT",
"INJ",
"IO",
"IOST",
"IOTA",
"IOTX",
"KOMA",
"KSM",
"LAYER",
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
"MILK",
"MINA",
"MKR",
"MLN",
"MOCA",
"MOG",
"MOODENG",
"MORPHO",
"MOVE",
"MOVR",
"MTL",
"MUBARAK",
"MYRO",
"NEAR",
"OP",
"ORCA",
"ORDI",
"OXT",
"PARTI",
"PAXG",
"PENDLE",
"PENGU",
"PEOPLE",
"PEPE",
"PERP",
"PHA",
"PYTH",
"QNT",
"QTUM",
"QUICK",
"RARE",
"RAYSOL",
"RDNT",
"RED",
"REI",
"RENDER",
"REZ",
"RIF",
"RLC",
"RONIN",
"SHIB",
"SKL",
"SLERF",
"SNX",
"SOL",
"SOLV",
"SONIC",
"SPELL",
"SPX",
"SSV",
"STEEM",
"STG",
"STO",
"STORJ",
"SYS",
"TAO",
"THE",
"THETA",
"TIA",
"TLM",
"TNSR",
"TOKEN",
"TON",
"TRB",
"TRU",
"TRUMP",
"TRX",
"TST",
"VET",
"VIC",
"VINE",
"VIRTUAL",
"VOXEL",
"VTHO",
"VVV",
"W",
"WAL",
"WAXP",
"WCT",
"WHY",
"WIF",
"WLD",
"WOO",
"X",
"XAI",
"XEC",
"ZEN",
"ZEREBRO",
"ZETA",
"ZIL",
"ZK",
"ZRO",
"ZRX",

];
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
  