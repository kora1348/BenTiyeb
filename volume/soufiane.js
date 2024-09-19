// Objets pour stocker les résultats des deux intervalles
const cryptoResults5m = {};
const cryptoResults15m = {};

// Fonction pour vérifier et afficher dans le div #cryptoNames si les deux conditions sont remplies
function checkAndDisplayLong(symbol) {
    const percentageVolume5m = cryptoResults5m[symbol];
    const percentageVolume15m = cryptoResults15m[symbol];

    // Vérifie si les deux pourcentages sont dans les plages définies

    //// 5 Minutes //// 

    if ( (percentageVolume5m >= 80 && percentageVolume5m <= 89 ) ) {
        const cryptoNamesDiv_5m = document.getElementById('cryptoNames_5m');
        const cryptoInfo = `${symbol}: LONG, ${percentageVolume5m.toFixed(2)}%`;
        
        if (!cryptoNamesDiv_5m.textContent.includes(cryptoInfo)) {
            const cryptoInfoElement = document.createElement('p');
            cryptoInfoElement.textContent = cryptoInfo;
            cryptoInfoElement.classList.add('positive'); // Ajoute une classe positive
            cryptoNamesDiv_5m.appendChild(cryptoInfoElement);
        }
    } else if ( (percentageVolume5m >= -89 && percentageVolume5m <= -80 ) ) {
        const cryptoNamesDiv_5m = document.getElementById('cryptoNames_5m');
        const cryptoInfo = `${symbol}: SORTH, ${percentageVolume5m.toFixed(2)}%`;
        
        if (!cryptoNamesDiv_5m.textContent.includes(cryptoInfo)) {
            const cryptoInfoElement = document.createElement('p');
            cryptoInfoElement.textContent = cryptoInfo;
            cryptoInfoElement.classList.add('negative'); // Ajoute une classe negative
            cryptoNamesDiv_5m.appendChild(cryptoInfoElement);
        }
    }

    //// 15 Minutes //// 
    
    if ( (percentageVolume15m >= 80 && percentageVolume15m <= 89 ) ) {
        const cryptoNamesDiv_15m = document.getElementById('cryptoNames_15m');
        const cryptoInfo = `${symbol}: LONG, ${percentageVolume15m.toFixed(2)}%`;
        
        if (!cryptoNamesDiv_15m.textContent.includes(cryptoInfo)) {
            const cryptoInfoElement = document.createElement('p');
            cryptoInfoElement.textContent = cryptoInfo;
            cryptoInfoElement.classList.add('positive'); // Ajoute une classe positive
            cryptoNamesDiv_15m.appendChild(cryptoInfoElement);
        }
    } else if ( (percentageVolume15m >= -89 && percentageVolume15m <= -80 ) ) {
        const cryptoNamesDiv_15m = document.getElementById('cryptoNames_15m');
        const cryptoInfo = `${symbol}: SORTH, ${percentageVolume15m.toFixed(2)}%`;
        
        if (!cryptoNamesDiv_15m.textContent.includes(cryptoInfo)) {
            const cryptoInfoElement = document.createElement('p');
            cryptoInfoElement.textContent = cryptoInfo;
            cryptoInfoElement.classList.add('negative'); // Ajoute une classe negative
            cryptoNamesDiv_15m.appendChild(cryptoInfoElement);
        }
    }
}


// Fonction pour récupérer les données de Binance pour l'intervalle de 5 minutes
async function fetchCryptoData5Min(symbol) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=1`);
        const data = await response.json();

        const takerBuyVolume = parseFloat(data[0][9]);
        const totalVolume = parseFloat(data[0][5]);
        const takerSellVolume = totalVolume - takerBuyVolume;
        const percentageDifference = ((takerBuyVolume - takerSellVolume) / totalVolume) * 100;

        // Enregistre le résultat dans l'objet global
        cryptoResults5m[symbol] = percentageDifference;

        // Vérifie si la condition avec fetchCryptoData15Min est aussi remplie
        checkAndDisplayLong(symbol);

        // Logique pour remplir les cellules du tableau
        const cryptoRow = document.getElementById(`${symbol}_5m`);
        const dateCell = cryptoRow.insertCell(1);
        const volumeCell = cryptoRow.insertCell(2);
        const dominanceCell = cryptoRow.insertCell(3);
        const percentageCell = cryptoRow.insertCell(4);

        dateCell.textContent = new Date(data[0][0]).toLocaleString("fr-FR");
        volumeCell.textContent = `Acheteurs: ${takerBuyVolume.toFixed(2)}, Vendeurs: ${takerSellVolume.toFixed(2)}`;
        dominanceCell.textContent = takerBuyVolume > takerSellVolume ? 'Plus d\'acheteurs' : 'Plus de vendeurs';
        percentageCell.textContent = `${percentageDifference.toFixed(2)}%`;

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol} (5m):`, error);
    }
}

// Fonction pour récupérer les données de Binance pour l'intervalle de 15 minutes
async function fetchCryptoData15Min(symbol) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=15m&limit=1`);
        const data = await response.json();

        const takerBuyVolume = parseFloat(data[0][9]);
        const totalVolume = parseFloat(data[0][5]);
        const takerSellVolume = totalVolume - takerBuyVolume;
        const percentageDifference = ((takerBuyVolume - takerSellVolume) / totalVolume) * 100;

        // Enregistre le résultat dans l'objet global
        cryptoResults15m[symbol] = percentageDifference;

        // Vérifie si la condition avec fetchCryptoData5Min est aussi remplie
        checkAndDisplayLong(symbol);

        // Logique pour remplir les cellules du tableau
        const cryptoRow = document.getElementById(`${symbol}_15m`);
        const dateCell = cryptoRow.insertCell(1);
        const volumeCell = cryptoRow.insertCell(2);
        const dominanceCell = cryptoRow.insertCell(3);
        const percentageCell = cryptoRow.insertCell(4);

        dateCell.textContent = new Date(data[0][0]).toLocaleString("fr-FR");
        volumeCell.textContent = `Acheteurs: ${takerBuyVolume.toFixed(2)}, Vendeurs: ${takerSellVolume.toFixed(2)}`;
        dominanceCell.textContent = takerBuyVolume > takerSellVolume ? 'Plus d\'acheteurs' : 'Plus de vendeurs';
        percentageCell.textContent = `${percentageDifference.toFixed(2)}%`;

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol} (15m):`, error);
    }
}

// Liste des symboles de cryptomonnaies
const symbols = [
    '1INCH', 'AAVE', 'ACE', 'ACH', 'ADA', 'AEVO', 'AGLD', 'AI', 'ALGO', 'ALICE', 'ALPACA', 'ALPHA', 'ALT', 'AMB', 'ANKR', 'APE', 'API3', 
    'APT', 'ARB', 'ARK', 'ARKM', 'ARPA', 'AR', 'ASTR', 'ATA', 'ATOM', 'AUCTION', 'AVAX', 'AXL', 'AXS', 'BADGER', 'BAKE', 'BAL', 'BANANA', 
    'BAND', 'BAT', 'BB', 'BCH', 'BEAMX', 'BEL', 'BICO', 'BLUR', 'BLZ', 'BNB', 'BNT', 'BNX', 'BOME', 'BOND', 'BONK', 'BTC', 'C98', 'CAKE', 
    'CELO', 'CELR', 'CFX', 'CHR', 'CHZ', 'CKB', 'COMBO', 'COMP', 'COTI', 'CRV', 'CTSI', 'CYBER', 'DAR', 'DASH', 'DENT', 'DOGE', 'DOGS', 
    'DOT', 'DUSK', 'DYDX', 'DYM', 'EDU', 'EGLD', 'ENA', 'ENJ', 'ENS', 'EOS', 'ETC', 'ETH', 'ETHFI', 'FET', 'FIL', 'FLM', 'FLOKI', 'FLOW', 
    'FTM', 'FXS', 'GALA', 'GAS', 'GLM', 'GMT', 'GMX', 'GRT', 'GTC', 'G', 'HBAR', 'HFT', 'HIFI', 'HIGH', 'HOOK', 'HOT', 'ICP', 'ICX', 'ID', 
    'ILV', 'IMX', 'INJ', 'IOST', 'IOTA', 'IOTX', 'IO', 'JASMY', 'JOE', 'JTO', 'JUP', 'KAVA', 'KEY', 'KLAY', 'KNC', 'KSM', 'LDO', 'LEVER', 
    'LINA', 'LINK', 'LISTA', 'LIT', 'LOOM', 'LPT', 'LQTY', 'LRC', 'LSK', 'LTC', 'LUNC', 'MAGIC', 'MANA', 'MANTA', 'MASK', 'MATIC', 'MAV', 
    'MEME', 'METIS', 'MINA', 'MKR', 'MOVR', 'MTL', 'NEAR', 'NEO', 'NFP', 'NKN', 'NMR', 'NOT', 'NTRN', 'OGN', 'OMG', 'OMNI', 'OM', 'ONE', 
    'ONG', 'ONT', 'OP', 'ORDI', 'OXT', 'PENDLE', 'PEOPLE', 'PEPE', 'PERP', 'PHB', 'PIXEL', 'POLYX', 'PORTAL', 'POWR', 'PYTH', 'QNT', 'QTUM', 
    'RARE', 'RATS', 'RDNT', 'REEF', 'RENDER', 'REN', 'REZ', 'RIF', 'RLC', 'RONIN', 'ROSE', 'RSR', 'RUNE', 'RVN', 'SAGA', 'SAND', 'SATS', 
    'SEI', 'SFP', 'SHIB', 'SKL', 'SNX', 'SOL', 'SPELL', 'SSV', 'STEEM', 'STG', 'STMX', 'STORJ', 'STRK', 'STX', 'SUI', 'SUN', 'SUPER', 'SUSHI', 
    'SXP', 'SYN', 'SYS', 'TAO', 'THETA', 'TIA', 'TLM', 'TNSR', 'TON', 'TRB', 'TRU', 'TRX', 'TWT', 'UMA', 'UNFI', 'UNI', 'USTC', 'VANRY', 
    'VET', 'VIDT', 'VOXEL', 'WAXP', 'WIF', 'WLD', 'WOO', 'W', 'XAI', 'XEC', 'XEM', 'XLM', 'XMR', 'XRP', 'XTZ', 'XVG', 'XVS', 'YFI', 'YGG', 
    'ZEC', 'ZIL', 'ZK', 'ZRO', 'ZRX'
];


// Récupération des données pour chaque symbole
symbols.forEach(symbol => {
    fetchCryptoData5Min(symbol);  // Pour l'intervalle de 5 minutes
    fetchCryptoData15Min(symbol); // Pour l'intervalle de 15 minutes
});
