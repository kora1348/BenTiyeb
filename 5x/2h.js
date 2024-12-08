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

        if (totalVariation > 5.00 && totalVariation <= 5.99) {
            totalCell.classList.add("positive");
            const pElement = document.createElement("p");
            pElement.id = `${symbol}_status`;
            pElement.classList.add("positive");
            pElement.textContent = `${symbol}: LONG, ${totalVariation.toFixed(2)}%`;
            cryptoNamesElement.appendChild(pElement);
            showPopup(`${symbol}: LONG signal détecté - 2 HEURES(${totalVariation.toFixed(2)}%)`);
        }  else if (totalVariation >= -5.99 && totalVariation <= -5.00) {
            totalCell.classList.add("negative");
            const pElement = document.createElement("p");
            pElement.id = `${symbol}_status`;
            pElement.classList.add("negative");
            pElement.textContent = `${symbol}: SHORT, ${totalVariation.toFixed(2)}%`;
            cryptoNamesElement.appendChild(pElement);
            showPopup(`${symbol}: SHORT signal détecté - 2 HEURES(${totalVariation.toFixed(2)}%)`);
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
    "XEM", "XLM", "XRP", "XTZ", "XVG", "XVS", "YFI", "YGG", "ZEC", "ZIL", "ZK", "ZRO", "ZRX"]; // Ajoutez d'autres symboles crypto si nécessaire
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
