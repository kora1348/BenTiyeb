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

// Fonction pour effacer les notifications précédentes avant d'en ajouter de nouvelles
async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=5`
        );
        const data = await response.json();

        if (!data || data.length === 0) {
            console.error(`Aucune donnée reçue pour ${symbol}`);
            return;
        }

        const cryptoRow = document.getElementById(symbol);

        // Réinitialiser les cellules
        while (cryptoRow.cells.length > 1) {
            cryptoRow.deleteCell(1);
        }

        const variations = [];

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]); // Prix d'ouverture
            const highPrice = parseFloat(data[i][2]); // Prix le plus haut
            const lowPrice = parseFloat(data[i][3]);  // Prix le plus bas
            const openDate = new Date(data[i][0]);    // Timestamp d'ouverture

            // Calcul des variations extrêmes
            const highVariation = ((highPrice - openPrice) / openPrice) * 100;
            const lowVariation = ((lowPrice - openPrice) / openPrice) * 100;

            // Choisir le taux de variation à afficher
            const selectedVariation =
                Math.abs(highVariation) > Math.abs(lowVariation) ? highVariation : lowVariation;

            variations.push(selectedVariation);

            // Formatage de la date et de l'heure
            const optionsDate = { day: "2-digit", month: "2-digit", year: "2-digit" };
            const optionsTime = { hour: "2-digit", minute: "2-digit" };

            // Ajouter les données dans une cellule
            const variationCell = cryptoRow.insertCell(i + 1);
            variationCell.textContent = `Variation: ${
                selectedVariation > 0 ? "+" : ""
            }${selectedVariation.toFixed(2)}% (${openDate.toLocaleDateString(
                "fr-FR",
                optionsDate
            )}, ${openDate.toLocaleTimeString("fr-FR", optionsTime)})`;

            // Ajouter un style CSS en fonction du signe de la variation
            if (selectedVariation > 0) {
                variationCell.classList.add("positive");
            } else {
                variationCell.classList.add("negative");
            }
        }

        // Comparaison des variations pour déterminer la notification
        const maxVariation = Math.max(...variations);
        const minVariation = Math.min(...variations);

        const cryptoNamesElement = document.getElementById("cryptoNames");

        // Ajouter la notification dans la div et en popup
        if (variations[0] === minVariation) {
            const message = `${symbol}: Signal LONG détecté (Variation: ${minVariation.toFixed(2)}%)`;
            cryptoNamesElement.innerHTML += `<p class="positive">${message}</p>`;
            showPopup(message);
        } else if (variations[0] === maxVariation) {
            const message = `${symbol}: Signal SHORT détecté (Variation: ${maxVariation.toFixed(2)}%)`;
            cryptoNamesElement.innerHTML += `<p class="negative">${message}</p>`;
            showPopup(message);
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
    const elementHeure = document.getElementById('heure');
    const maintenant = new Date();

    const heureFormatee = maintenant.toLocaleString();
    elementHeure.textContent = heureFormatee;
}

// Lancer l'actualisation immédiate, puis la répéter
startAutoRefresh();
setInterval(() => {
    clearNotifications(); // Nettoyer les notifications avant chaque rafraîchissement
    startAutoRefresh();
}, calculerProchainRafraichissement());
