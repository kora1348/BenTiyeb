let totalVariations = 0; // Variable globale pour stocker la somme des variations
let cryptoCount = 0; // Variable pour compter le nombre de cryptos traitées (jusqu'à 149)

// Vérification de la prise en charge des notifications
if (!("Notification" in window)) {
    alert("Ce navigateur ne supporte pas les notifications.");
} else if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

// Fonction pour récupérer les données d'une crypto
// Fonction pour récupérer les données d'une crypto
async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=15m&limit=1`
        );
        const data = await response.json();

        const cryptoRow = document.getElementById(symbol);
        if (!cryptoRow) {
            console.error(`Ligne non trouvée pour ${symbol}`);
            return;
        }

        // Supprimer toutes les cellules sauf la première (nom de la crypto)
        while (cryptoRow.cells.length > 1) {
            cryptoRow.deleteCell(1);
        }

        let shouldDisplay = false; // Vérifie si une variation >= 7% existe
        let isShort = false; // Vérifie si une variation <= -7% existe

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;

            totalVariations += weeklyVariation; // Ajout de la variation à la somme globale
            cryptoCount++; // Incrément du compteur
            updateTotalAndAverageVariations(); // Mise à jour des éléments HTML pour le total et la moyenne

            const variationCell = cryptoRow.insertCell(i + 1);
            const variationValue = weeklyVariation.toFixed(2);

            variationCell.textContent = `${variationValue}%`;

            // Ajouter la classe "positive" ou "negative" en fonction de la variation
            if (weeklyVariation > 0) {
                variationCell.classList.add("positive");
            } else if (weeklyVariation < 0) {
                variationCell.classList.add("negative");
            }

    
        }

        const statusElementId = `${symbol}_status`;

        // Mettre à jour ou afficher le statut LONG/SHORT
        const existingStatusElement = document.getElementById(statusElementId);
        if (existingStatusElement) {
            existingStatusElement.textContent = `${symbol}: ${shouldDisplay ? "SHORT" : "LONG"}`;
            existingStatusElement.className = shouldDisplay ? "negative" : "positive";
        } else {
            const statusElement = document.createElement("p");
            statusElement.id = statusElementId;
            statusElement.className = shouldDisplay ? "negative" : "positive";
            statusElement.textContent = `${symbol}: ${shouldDisplay ? "SHORT" : "LONG"}`;
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    }
}


// Fonction pour mettre à jour l'affichage du total et de la moyenne des variations
function updateTotalAndAverageVariations() {
    const totalVariationsElement = document.getElementById('totalVariations');
    const averageVariationsElement = document.getElementById('averageVariations');

    totalVariationsElement.textContent = `Total des variations : ${totalVariations.toFixed(2)}%`;

    // Calcul de la moyenne sur 149 cryptos et conversion au format pourcentage
    const averageVariations = (totalVariations / Math.min(cryptoCount, 149)) * 100;
    averageVariationsElement.textContent = `Moyenne des variations : ${averageVariations.toFixed(2)}%`;

    // Vérifier les conditions pour afficher une notification
    if (cryptoCount >= 149) { // Attendre d'avoir traité toutes les cryptos
        if (averageVariations >= 100) {
            showNotification("5 MINUTES - LONG signal détecté !");
        } else if (averageVariations <= -100) {
            showNotification("5 MINUTES - SHORT signal détecté !");
        }
    }
}

// Fonction pour afficher une notification
function showNotification(message) {
    if (Notification.permission === "granted") {
        new Notification("Signal Crypto", {
            body: message,
            icon: "https://example.com/notification-icon.png", // Remplacez par une URL d'icône valide
        });
    }
}

// Fonction pour rafraîchir les données
async function refreshCryptoData() {
    totalVariations = 0; // Réinitialiser la somme des variations
    cryptoCount = 0; // Réinitialiser le compteur de cryptos

    const symbols = ["1INCH","MOG","BONK","CAT","CHEEMS","FLOKI","LUNC","PEPE","ACT","ACX","ADA","AERGO","AERO","AEVO","AGLD","AI","AKT","ALGO","ALICE","ALPACA","ALPHA","ALT","AMB","ANKR","APE","AXS","BADGER","BAKE","BAL","BANANA","BAND","BAN","BAT","BB","BCH","BEAMX","BEL","BICO","BIGTIME","BTC","C98","CAKE","CATI","CELO","CELR","CETUS","CFX","CHESS","CHILLGUY","CHR","CHZ","CKB","COMBO","DOGE","DOGS","DOT","DRIFT","DUSK","DYDX","DYM","EDU","EGLD","EIGEN","ENA","ENJ","ENS","FLOW","FLUX","FTM","FXS","GALA","GHST","GLM","GMT","GMX","GOAT","GRASS","GRT","GTC","IOST","IOTA","IOTX","IO","JASMY","JOE","JUP","KAIA","KAS","KAVA","KDA","KNC","KOMA","KSM","MAGIC","MANA","MANTA","MASK","MAVIA","MAV","MBOX","MEME","METIS","MEW","MINA","MKR","MOODENG","MORPHO","MOVE","NTRN","NULS","OGN","OMG","OMNI","OM","ONDO","ONE","ONG","ONT","OP","ORCA","ORDI","OXT","PENDLE","PEOPLE","RAYSOL","RDNT","REEF","REI","RENDER","REZ","RIF","RLC","RONIN","ROSE","RPL","RSR","RUNE","RVN","SAFE","STEEM","STG","STMX","STORJ","STRK","STX","SUI","SUN","SUPER","SUSHI","SWELL","SXP","SYN","SYS","TURBO","T","TWT","UMA","UNI","","USTC","UXLINK","VET","VIDT","VIRTUAL","VOXEL","WAXP","WIF","WLD","ZEC","ZEN","ZETA","ZIL","ZK","ZRO","ZRX",]; // Liste des cryptos à traiter
    for (const symbol of symbols) {
        await fetchCryptoData(symbol);
    }
}

// Rafraîchissement automatique toutes les 50 secondes
setInterval(refreshCryptoData, 50000);

// Lancer une première fois la récupération des données
refreshCryptoData();

    
    
  
  function mettreAJourHeure() {
      var elementHeure = document.getElementById('heure');
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
      heuresMaintenant = heuresMaintenant < 10 ? '0' + heuresMaintenant : heuresMaintenant;
      minutesMaintenant = minutesMaintenant < 10 ? '0' + minutesMaintenant : minutesMaintenant;
      secondesMaintenant = secondesMaintenant < 10 ? '0' + secondesMaintenant : secondesMaintenant;
  
      heuresActuelle = heuresActuelle < 10 ? '0' + heuresActuelle : heuresActuelle;
      minutesActuelle = minutesActuelle < 10 ? '0' + minutesActuelle : minutesActuelle;
      secondesActuelle = secondesActuelle < 10 ? '0' + secondesActuelle : secondesActuelle;
  
      // Mettre à jour le contenu de l'élément avec les deux heures
      elementHeure.innerHTML = heuresActuelle + ':' + minutesActuelle + ':' + secondesActuelle;
  }
  
  // Appeler la fonction pour mettre à jour l'heure
  mettreAJourHeure();