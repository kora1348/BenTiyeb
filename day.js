async function fetchCryptoData(symbol, interval, limit = 2) {
    const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`
    );
    const data = await response.json();
    return data;
}

function calculateChange(current, previous) {
    return ((current - previous) / previous) * 100;
}

async function updateCryptoRow(symbol) {
    const intervals = ['1d', '3d', '1w', '1M'];
    const row = document.getElementById(symbol);

    let totalChange = 0;

    for (const interval of intervals) {
        const data = await fetchCryptoData(symbol, interval);
        const currentClose = parseFloat(data[1][4]);
        const previousClose = parseFloat(data[0][4]);
        const change = calculateChange(currentClose, previousClose);
        const cell = row.insertCell();
        cell.innerText = change.toFixed(2) + '%';
        if (change > 0) {
            cell.classList.add('positive');
        } else if (change < 0) {
            cell.classList.add('negative');
        }
        totalChange += change;
    }

    const totalCell = row.insertCell();
    totalCell.innerText = totalChange.toFixed(2) + '%';

    const cryptoNamesElementRouge = document.getElementById('cryptoNamesRouge');
    const cryptoNamesElementVert = document.getElementById('cryptoNamesVert');

    if (totalChange > 0) {
        totalCell.classList.add('positive');
    } else if (totalChange < 0) {
        totalCell.classList.add('negative');
    }
        
        if (totalChange <= -50.00) {
            totalCell.classList.add("negative");
            cryptoNamesRouge.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: SHORT, ${totalChange.toFixed(2)}%</p>`;
        }

        if (totalChange >= 50.00) {
            totalCell.classList.add("positive");
            cryptoNamesVert.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalChange.toFixed(2)}%</p>`;
        }
    
}

async function updateAllCryptoRows() {
    const symbols = ['1INCH', 'AAVE', 'ACE', 'ACH', 'ADA', 'AEVO', 'AGIX', 'AGLD', 'ALGO', 'ALICE', 'ALPHA', 'ALT', 'AMB', 'ANKR', 'ANT', 'APE', 'API3', 'APT',  'ARB', 'ARK', 'ARKM', 'ARPA', 'ASTR', 'ATA', 'ATOM', 'AUCTION', 'AUDIO', 'AVAX', 'AXL', 'AXS', 'BAKE', 'BAL', 'BAND', 'BAT', 'BEAMX', 'BEL', 'BICO', 'BLUR', 'BLZ', 'BNB', 'BNT', 'BNX', 'BOME', 'BOND', 'BONK', 'BTC', 'C98', 'CAKE', 'CELO', 'CELR', 'CFX', 'CHR', 'CHZ', 'COMBO', 'COMP', 'COTI', 'CRV', 'CTK', 'CTSI', 'CVX', 'CYBER', 'DAR', 'DASH', 'DENT', 'DGB', 'DOGE', 'DOT', 'DUSK', 'DYM', 'DYDX', 'EDU', 'EGLD', 'ENJ', 'ENS', 'EOS', 'ETC', 'ETH', 'ETHFI', 'FET', 'FIL', 'FLM', 'FLOKI', 'FLOW', 'FRONT', 'FTM', 'FXS', 'GALA', 'GAL', 'GAS', 'GLMR', 'GMT', 'GMX', 'GRT', 'GTC', 'HBAR', 'HFT', 'HIFI', 'HIGH', 'HOOK', 'HOT', 'ICP', 'ICX', 'IDEX', 'ID', 'ILV', 'IMX', 'INJ', 'IOST', 'IOTA', 'IOTX', 'JASMY', 'JOE', 'JTO', 'JUP', 'KAVA', 'KEY', 'KLAY', 'KNC', 'KSM', 'LDO', 'LEVER', 'LINA', 'LINK', 'LIT', 'LOOM', 'LPT', 'LQTY', 'LRC', 'LSK', 'LTC', 'LUNC', 'MAGIC', 'MANA', 'MANTA', 'MASK', 'MATIC', 'MAV', 'MBL', 'MDT', 'MEME', 'METIS', 'MINA', 'MKR', 'MOVR', 'MTL', 'NEAR', 'NEO', 'NFP', 'NKN', 'NMR', 'NTRN', 'OCEAN', 'OGN', 'OMG', 'ONE', 'ONG', 'ONT', 'OP', 'ORDI', 'OXT', 'PENDLE', 'PEOPLE', 'PEPE', 'PERP', 'PHB', 'PIXEL', 'POLYX', 'PORTAL', 'POWR', 'PYTH', 'QNT', 'QTUM', 'RAD', 'RDNT', 'REEF', 'REN', 'RLC', 'RNDR', 'RONIN', 'ROSE', 'RSR', 'RUNE', 'RVN', 'SAND', '1000SATS', 'SEI', 'SFP', 'SHIB', 'SKL', 'SLP', 'SNT', 'SNX', 'SOL', 'SPELL', 'SSV', 'STEEM', 'STG', 'STMX', 'STORJ', 'STPT', 'STRAX', 'STRK', 'STX', 'SUI', 'SUPER', 'SUSHI', 'SXP', 'THETA', 'TIA', 'TLM', 'TRB', 'TRU', 'TRX', 'T', 'TWT', 'UMA', 'UNFI', 'UNI', 'USDC', 'USTC', 'VET', 'WAXP', 'WIF', 'WLD', 'WOO', 'XRP', 'YFI', 'YGG', 'ZEN', 'ZIL', 'ZRX'];

    for (const symbol of symbols) {
        await updateCryptoRow(symbol);
    }
}

document.addEventListener('DOMContentLoaded', updateAllCryptoRows);


// Appeler la fonction pour mettre à jour l'heure
mettreAJourHeure();

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
