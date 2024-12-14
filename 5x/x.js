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
            const weekEndDate = new Date(data[i][6]);   // Timestamp de fin
  
            // Ajouter la variation avec l'intervalle
            const variationCell = cryptoRow.insertCell(i + 1);
            variationCell.textContent = `${weekStartDate.toLocaleDateString(
                "fr-FR",
                optionsDate
            )} (${weekStartDate.toLocaleTimeString("fr-FR", optionsTime)}) - ${weekEndDate.toLocaleDateString(
                "fr-FR",
                optionsDate
            )} (${weekEndDate.toLocaleTimeString("fr-FR", optionsTime)}): ${variation.toFixed(2)}%`;
  
            variationCell.classList.add(variation > 0 ? "positive" : "negative");
  
            totalVariation += variation;
        }
  
        const totalCell = cryptoRow.insertCell(-1);
        totalCell.textContent = `${totalVariation.toFixed(2)}%`;
        totalCell.style.textAlign = "center";
  
        // Ne pas effacer cryptoNames ici car on veut garder les éléments affichés
        const cryptoNamesElement = document.getElementById("cryptoNames");
        document.querySelector(`#${symbol}_status`)?.remove();
  
        if (totalVariation >= 7.00) {
            totalCell.classList.add("negative");
            const pElement = document.createElement("p");
            pElement.id = `${symbol}_status`;
            pElement.classList.add("negative");
            pElement.textContent = `${symbol}: SHORT, ${totalVariation.toFixed(2)}%`;
            cryptoNamesElement.appendChild(pElement);
            showPopup(`${symbol}: SHORT signal détecté - 5 MINUTES(${totalVariation.toFixed(2)}%)`);
        }  else if (totalVariation  <= -7.00) {
            totalCell.classList.add("positive");
            const pElement = document.createElement("p");
            pElement.id = `${symbol}_status`;
            pElement.classList.add("positive");
            pElement.textContent = `${symbol}: LONG, ${totalVariation.toFixed(2)}%`;
            cryptoNamesElement.appendChild(pElement);
            showPopup(`${symbol}: LONG signal détecté - 5 MINUTES(${totalVariation.toFixed(2)}%)`);
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    }
  }
  
  // Fonction pour calculer et ajuster l'intervalle de rafraîchissement
  function calculerProchainRafraichissement() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
  
    // Calculer l'écart en secondes jusqu'au prochain 0 minutes 40
    const nextRefreshInSeconds = (1 * 60 + 30) - (minutes * 60 + seconds) % (1 * 60 + 30);
  
    return nextRefreshInSeconds * 1000; // Convertir en millisecondes
  }
  
  // Démarrage de l'actualisation
  function startAutoRefresh() {
    const cryptoSymbols = ["1INCH","MOG","BONK","CAT","CHEEMS","FLOKI","LUNC","PEPE","ACT","ACX","ADA","AERGO","AERO","AEVO","AGLD","AI","AKT","ALGO","ALICE","ALPACA","ALPHA","ALT","AMB","ANKR","APE","AXS","BADGER","BAKE","BAL","BANANA","BAND","BAN","BAT","BB","BCH","BEAMX","BEL","BICO","BIGTIME","BTC","C98","CAKE","CATI","CELO","CELR","CETUS","CFX","CHESS","CHILLGUY","CHR","CHZ","CKB","COMBO","DOGE","DOGS","DOT","DRIFT","DUSK","DYDX","DYM","EDU","EGLD","EIGEN","ENA","ENJ","ENS","FLOW","FLUX","FTM","FXS","GALA","GHST","GLM","GMT","GMX","GOAT","GRASS","GRT","GTC","IOST","IOTA","IOTX","IO","JASMY","JOE","JUP","KAIA","KAS","KAVA","KDA","KNC","KOMA","KSM","MAGIC","MANA","MANTA","MASK","MAVIA","MAV","MBOX","MEME","METIS","MEW","MINA","MKR","MOODENG","MORPHO","MOVE","NTRN","NULS","OGN","OMG","OMNI","OM","ONDO","ONE","ONG","ONT","OP","ORCA","ORDI","OXT","PENDLE","PEOPLE","RAYSOL","RDNT","REEF","REI","RENDER","REZ","RIF","RLC","RONIN","ROSE","RPL","RSR","RUNE","RVN","SAFE","STEEM","STG","STMX","STORJ","STRK","STX","SUI","SUN","SUPER","SUSHI","SWELL","SXP","SYN","SYS","TURBO","T","TWT","UMA","UNI","","USTC","UXLINK","VET","VIDT","VIRTUAL","VOXEL","WAXP","WIF","WLD","ZEC","ZEN","ZETA","ZIL","ZK","ZRO","ZRX",]; // Ajoutez d'autres symboles crypto si nécessaire
    cryptoSymbols.forEach((symbol) => fetchCryptoData(symbol));
  
    mettreAJourHeure();
  }
  
  // Fonction pour mettre à jour l'heure
  function mettreAJourHeure() {
    var elementHeure = document.getElementById('heure');
    var maintenant = new Date();
  
    var heureFormatee = maintenant.toLocaleString();
    elementHeure.textContent = heureFormatee;
  }
  
  // Lancer l'actualisation immédiate, puis la répéter toutes les 2 minutes 30
  startAutoRefresh();
  setInterval(() => {
    startAutoRefresh();
  }, calculerProchainRafraichissement());
  