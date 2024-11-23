// Fonction pour afficher une notification système
function showPopup(message) {
    // Obtenez la date actuelle
    const currentDate = new Date().toLocaleString();

    // Ajouter la date au message
    const messageWithDate = `${message} - ${currentDate}`;

    // Vérifier si les notifications sont autorisées
    if (Notification.permission === "granted") {
        new Notification("Signal Crypto", {
            body: messageWithDate,
            icon: "https://example.com/icon.png", // Remplacez par une URL d'icône appropriée
        });
    } else if (Notification.permission !== "denied") {
        // Demander la permission si elle n'a pas encore été donnée
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification("Signal Crypto", {
                    body: messageWithDate,
                    icon: "https://example.com/icon.png", // Remplacez par une URL d'icône appropriée
                });
            }
        });
    }
}

// Fonction pour effacer les notifications précédentes
function clearNotifications() {
    const cryptoNamesElement = document.getElementById("cryptoNames");
    cryptoNamesElement.innerHTML = '';  // Vider les notifications précédentes
}

// Fonction pour récupérer et afficher les données crypto
async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=1`
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

            const variationCell = cryptoRow.insertCell(i + 1);
            variationCell.textContent = `${variation.toFixed(2)}%`;
            variationCell.classList.add(variation > 0 ? "positive" : "negative");

            totalVariation += variation;
        }

        // Calcul du total
        const totalCell = cryptoRow.insertCell(-1);
        totalCell.textContent = `${totalVariation.toFixed(2)}%`;
        totalCell.style.textAlign = "center";

        // Effacer les notifications avant d'en afficher de nouvelles
        clearNotifications();

        const cryptoNamesElement = document.getElementById("cryptoNames");

        // Supprimer l'ancien statut
        document.querySelector(`#${symbol}_status`)?.remove();

        // Ajouter le nouveau statut
        if (totalVariation >= -3.99 && totalVariation <= -3.00) {
            totalCell.classList.add("positive");
            cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalVariation.toFixed(2)}%</p>`;
            showPopup(`${symbol}: LONG signal détecté (${totalVariation.toFixed(2)}%)`);
        } else if (totalVariation >= 3.00 && totalVariation <= 3.99) {
            totalCell.classList.add("negative");
            cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: SHORT, ${totalVariation.toFixed(2)}%</p>`;
            showPopup(`${symbol}: SHORT signal détecté (${totalVariation.toFixed(2)}%)`);
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    }
}

// Démarrage de l'actualisation
function startAutoRefresh() {
    const cryptoSymbols = ["1INCH", "AAVE", "ACE", "ACH", "ADA", "AEVO", "AGLD", "AI", "ALGO", "ALICE", "ALPACA", "ALPHA",
    "ALT", "AMB", "ANKR", "APE", "API3", "APT", "ARB", "ARKM", "ARK", "ARPA", "AR", "ASTR", "ATA",
    "ATOM", "AUCTION", "AVAX", "AXL", "AXS", "BADGER", "BAKE", "BAL", "BANANA", "BAND", "BAT", "BB",
    "BCH", "BEAMX", "BEL", "BICO", "BLUR", "BLZ", "BNB", "BNT", "BNX", "BOME", "BONK", "BOND", "BTC",
    "C98", "CAKE", "CELO", "CELR", "CFX", "CHR", "CHZ", "CKB", "COMBO", "COMP", "COTI", "CRV",
    "CTSI", "CYBER", "DAR", "DASH", "DENT", "DOGE", "DOGS", "DOT", "DUSK", "DYDX", "DYM", "EDU",
    "EGLD", "ENA", "ENJ", "ENS", "EOS", "ETC", "ETHFI", "ETH", "FET", "FIL", "FLM", "FLOKI", "FLOW",
    "FTM", "FXS", "GALA", "GAS", "GLM", "GMT", "GMX", "GRT", "GTC", "G", "HBAR", "HFT", "HIFI",
    "HIGH", "HOOK", "HOT", "ICP", "ICX", "ID", "ILV", "IMX", "INJ", "IOST", "IOTA", "IOTX", "IO",
    "JASMY", "JOE", "JTO", "JUP", "KAVA", "KEY", "KLAY", "KNC", "KSM", "LDO", "LEVER", "LINA", "LINK", 
    "LISTA", "LIT", "LOOM", "LPT", "LQTY", "LRC", "LSK", "LTC", "LUNC", "MAGIC", "MANA", "MANTA", 
    "MASK", "MAV", "MEME", "METIS", "MINA", "MKR", "MOVR", "MTL", "NEAR", "NEO", "NFP", "NKN", 
    "NMR", "NOT", "NTRN", "OGN", "OMG", "OMNI", "OM", "ONE", "ONG", "ONT", "OP", "ORDI", "OXT", 
    "PENDLE", "PEOPLE", "PEPE", "PERP", "PHB", "PIXEL", "POLYX", "PORTAL", "POWR", "PYTH", "QNT", 
    "QTUM", "RARE", "RDNT", "REEF", "RENDER", "REN", "REZ", "RIF", "RLC", "RONIN", "ROSE", "RSR", 
    "RUNE", "RVN", "SAGA", "SAND", "SEI", "SFP", "SHIB", "SKL", "SNX", "SOL", "SPELL", "SSV", 
    "STEEM", "STG", "STMX", "STORJ", "STRK", "STX", "SUI", "SUN", "SUPER", "SUSHI", "SXP", "SYN", 
    "SYS", "TAO", "THETA", "TIA", "TLM", "TNSR", "TON", "TRB", "TRU", "TRX", "TWT", "UMA", "UNFI", 
    "UNI", "USTC", "VANRY", "VET", "VIDT", "VOXEL", "WAXP", "WIF", "WLD", "WOO", "W", "XAI", "XEC", 
    "XEM", "XLM", "XRP", "XTZ", "XVG", "XVS", "YFI", "YGG", "ZEC", "ZIL", "ZK", "ZRO", "ZRX" ]; // Ajoutez d'autres symboles crypto si nécessaire
    cryptoSymbols.forEach((symbol) => fetchCryptoData(symbol));
}

// Lancer l'actualisation immédiate, puis la répéter toutes les 10 secondes
startAutoRefresh();
setInterval(startAutoRefresh, 150000);


  

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