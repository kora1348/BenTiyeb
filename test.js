async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1m&limit=50`);
        const data = await response.json();

        let totalVariation = 0;
        const cryptoRow = document.getElementById(symbol) || document.getElementById('cryptoTable').insertRow();
        cryptoRow.id = symbol;

        if (!document.getElementById(symbol)) {
            const cryptoNameCell = cryptoRow.insertCell(0);
            cryptoNameCell.textContent = symbol;
        }

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const intervalVariation = ((closePrice - openPrice) / openPrice) * 100;
            const cellIndex = i + 1;

            const variationCell = cryptoRow.insertCell(cellIndex);
            const variationValue = intervalVariation.toFixed(2);
            const intervalStartDate = new Date(data[i][0]);
            const intervalEndDate = new Date(data[i][6]);
            const optionsStart = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric" };
            const optionsEnd = { hour: "numeric", minute: "numeric" };
            variationCell.textContent = `${intervalStartDate.toLocaleDateString("fr-FR", optionsStart)} (${intervalStartDate.toLocaleTimeString("fr-FR", optionsEnd)}) - ${intervalEndDate.toLocaleDateString("fr-FR", optionsStart)} (${intervalEndDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;

            if (intervalVariation > 0) {
                variationCell.classList.add("positive");
            } else if (intervalVariation < 0) {
                variationCell.classList.add("negative");
            }

            totalVariation += intervalVariation;
        }

        const averageVariation = totalVariation / data.length;
        const averageValue = averageVariation.toFixed(2);
        const averageCell = cryptoRow.insertCell(data.length + 1);
        averageCell.style.textAlign = 'center';
        averageCell.textContent = `Moyenne: ${averageValue}%`;

        if (averageVariation < 0) {
            averageCell.classList.add("negative");
        } else {
            averageCell.classList.add("positive");
        }

        const cryptoNamesElement = document.getElementById('cryptoNames');
        if (averageVariation <= -0.03) {
            cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: ${averageValue}%</p>`;
        }

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    }
}

function mettreAJourHeure() {
    const elementHeure = document.getElementById('heure');
    const maintenant = new Date();
    const heureActuelle = new Date(maintenant);

    maintenant.setHours(maintenant.getHours() + 3);
    maintenant.setMinutes(maintenant.getMinutes() + 20);

    const heuresMaintenant = maintenant.getHours().toString().padStart(2, '0');
    const minutesMaintenant = maintenant.getMinutes().toString().padStart(2, '0');
    const secondesMaintenant = maintenant.getSeconds().toString().padStart(2, '0');

    const heuresActuelle = heureActuelle.getHours().toString().padStart(2, '0');
    const minutesActuelle = heureActuelle.getMinutes().toString().padStart(2, '0');
    const secondesActuelle = heureActuelle.getSeconds().toString().padStart(2, '0');

    elementHeure.innerHTML = `${heuresActuelle}:${minutesActuelle}:${secondesActuelle} - ${heuresMaintenant}:${minutesMaintenant}:${secondesMaintenant}`;
}

const cryptoSymbols = [
    "1INCH", "AAVE", "ACE", "ACH", "ADA", "AEVO", "AGIX", "AGLD", "ALGO", "ALICE", "ALPHA", "ALT", "AMB", "ANKR", "ANT", "APE", "API3", "APT", "AR", "ARB",
    "ARK", "ARKM", "ARPA", "ASTR", "ATA", "ATOM", "AUCTION", "AUDIO", "AVAX", "AXL", "AXS", "BADGER", "BAKE", "BAL", "BAND", "BAT", "BCH", "BEAMX", "BEL",
    "BICO", "BLUR", "BLZ", "BNB", "BNT", "BNX", "BOME", "BOND", "BONK", "BTC", "C98", "CAKE", "CELO", "CELR", "CFX", "CHR", "CHZ", "COMBO", "COMP", "COTI",
    "CRV", "CTK", "CTSI", "CVX", "CYBER", "DAR", "DASH", "DENT", "DGB", "DOGE", "DOT", "DUSK", "DYM", "DYDX", "EDU", "EGLD", "ENJ", "ENS", "EOS", "ETC",
    "ETH", "ETHFI", "FET", "FIL", "FLM", "FLOKI", "FLOW", "FRONT", "FTM", "FXS", "GALA", "GAL", "GAS", "GLMR", "GMT", "GMX", "GRT", "GTC", "HBAR", "HFT",
    "HIFI", "HIGH", "HOOK", "HOT", "ICP", "ICX", "IDEX", "ID", "ILV", "IMX", "INJ", "IOST", "IOTA", "IOTX", "JASMY", "JOE", "JTO", "JUP", "KAVA", "KEY",
    "KLAY", "KNC", "KSM", "LDO", "LEVER", "LINA", "LINK", "LIT", "LOOM", "LPT", "LQTY", "LRC", "LSK", "LTC", "LUNC", "MAGIC", "MANTA", "MANA", "MASK",
    "MATIC", "MAV", "MBL", "MDT", "MEME", "METIS", "MINA", "MKR", "MOVR", "MTL", "NEAR", "NEO", "NFP", "NKN", "NMR", "NTRN", "OCEAN", "OGN", "OMG", "ONE",
    "ONDO", "ONG", "ONT", "OP", "ORBS", "ORDI", "OXT", "PENDLE", "PEOPLE", "PEPE", "PERP", "PHB", "PIXEL", "POLYX", "PORTAL", "POWR", "PYTH", "QNT", "QTUM",
    "RAD", "RDNT", "REEF", "REN", "RLC", "RNDR", "RONIN", "ROSE", "RSR", "RUNE", "RVN", "SAND", "1000SATS", "SEI", "SFP", "SHIB", "SKL", "SLP", "SNT",
    "SNX", "SOL", "SPELL", "SSV", "STEEM", "STG", "STMX", "STORJ", "STPT", "STRAX", "STRK", "STX", "SUI", "SUPER", "SUSHI", "SXP", "THETA", "TIA", "TLM",
    "TRB", "TRU", "TRX", "T", "TWT", "UMA", "UNFI", "UNI", "USDC", "USTC", "USDT", "VET", "WAVES", "WAXP", "WIF", "WLD", "WOO", "XEM", "XLM", "XRP", "XTZ",
    "XVG", "XVS", "YFI", "YGG", "ZEC", "ZEN", "ZIL", "ZRX"
];

function updateAllCryptoData() {
    document.getElementById('cryptoTable').querySelector('tbody').innerHTML = ''; // Clear existing rows
    document.getElementById('cryptoNames').innerHTML = ''; // Clear existing status
    cryptoSymbols.forEach(symbol => fetchCryptoData(symbol));
}

// Mettre à jour l'heure toutes les secondes
setInterval(mettreAJourHeure, 1000);

// Mettre à jour les données toutes les minutes
updateAllCryptoData();
setInterval(updateAllCryptoData, 60000);