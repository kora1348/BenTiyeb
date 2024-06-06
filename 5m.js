async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1M`
        );
        const data = await response.json();

        // Création d'une nouvelle ligne pour la crypto
        const cryptoRow = document.createElement('tr');
        const cryptoCell = document.createElement('td');
        cryptoCell.textContent = symbol;
        cryptoRow.appendChild(cryptoCell);

        // Calcul du total des variations mensuelles
        let totalVariation = 0;
        let variations = [];

        // Obtenir la date actuelle
        const currentDate = new Date();

        // Récupérer les données de variation pour les périodes disponibles
        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const monthlyVariation = ((closePrice - openPrice) / openPrice) * 100;
            const variationCell = document.createElement('td');
            const variationValue = monthlyVariation.toFixed(2);
            const monthStartDate = new Date(data[i][0]);
            const formattedDate = monthStartDate.toLocaleDateString("fr-FR");

            variationCell.textContent = `${formattedDate}: ${variationValue}%`;

            // Ajouter la classe "positive" ou "negative" en fonction de la variation mensuelle
            if (monthlyVariation > 0) {
                variationCell.classList.add("positive");
            } else if (monthlyVariation < 0) {
                variationCell.classList.add("negative");
            }

            cryptoRow.appendChild(variationCell);
            totalVariation += monthlyVariation; // Ajouter la variation mensuelle au total

            // Stocker les variations et les dates pour l'analyse ultérieure
            variations.push({ date: monthStartDate, variation: monthlyVariation });
        }

        // Ajouter la cellule pour afficher le total de variation
        const totalCell = document.createElement('td');
        const totalValue = totalVariation.toFixed(2);
        totalCell.style.textAlign = 'center';
        totalCell.textContent = `${totalValue}%`;

        // Ajouter la classe "positive" ou "negative" pour le total
        if (totalVariation > 0) {
            totalCell.classList.add("positive");
        } else if (totalVariation < 0) {
            totalCell.classList.add("negative");
        }

        cryptoRow.appendChild(totalCell);

        // Ajouter la ligne au tableau
        document.getElementById('cryptoData').appendChild(cryptoRow);

        // Trouver les deux plus grandes variations
        variations.sort((a, b) => b.variation - a.variation);
        let top1, top2;

        for (let i = 0; i < variations.length - 1; i++) {
            if (variations[i + 1].date.getTime() < variations[i].date.getTime()) {
                top1 = variations[i];
                top2 = variations[i + 1];
                break;
            }
        }

        // Calculer le nombre d'intervalles (bougies) entre les deux dates
        const interval1 = data.findIndex(d => new Date(d[0]).getTime() === top1.date.getTime());
        const interval2 = data.findIndex(d => new Date(d[0]).getTime() === top2.date.getTime());
        const nombreIntervalles = Math.abs(interval1 - interval2) - 1;

        // Ajouter les informations spécifiques pour chaque crypto
        const cryptoList = document.getElementById('cryptoList');
        let cryptoInfo = `${symbol} : ${top1.variation.toFixed(2)}% (${top1.date.toLocaleDateString("fr-FR")}) - ${top2.variation.toFixed(2)}% (${top2.date.toLocaleDateString("fr-FR")}) = ${nombreIntervalles}`;

        cryptoList.innerHTML += `<p>${cryptoInfo}</p>`;

    } catch (error) {
        console.error(
            `Erreur lors de la récupération des données pour ${symbol}:`,
            error
        );
    }
}



// Liste des cryptos
const cryptos = [
    '1INCH', 'AAVE', 'ACE', 'ACH', 'ADA', 'AEVO', 'AGIX', 'AGLD', 'ALGO',
    'ALICE', 'ALPHA', 'ALT', 'AMB', 'ANKR', 'ANT', 'APE', 'API3', 'APT',
    'AR', 'ARB', 'ARK', 'ARKM', 'ARPA', 'ASTR', 'ATA', 'ATOM', 'AUCTION',
    'AUDIO', 'AVAX', 'AXL', 'AXS', 'BADGER', 'BAKE', 'BAL', 'BAND', 'BAT',
    'BCH', 'BEAMX', 'BEL', 'BICO', 'BLUR', 'BLZ', 'BNB', 'BNT', 'BNX',
    'BOME', 'BOND', 'BONK', 'BTC', 'C98', 'CAKE', 'CELO', 'CELR', 'CFX',
    'CHR', 'CHZ', 'COMBO', 'COMP', 'COTI', 'CRV', 'CTK', 'CTSI', 'CVX',
    'CYBER', 'DAR', 'DASH', 'DENT', 'DGB', 'DOGE', 'DOT', 'DUSK', 'DYM',
    'DYDX', 'EDU', 'EGLD', 'ENJ', 'ENS', 'EOS', 'ETC', 'ETH', 'ETHFI',
    'FET', 'FIL', 'FLM', 'FLOKI', 'FLOW', 'FRONT', 'FTM', 'FXS', 'GALA',
    'GAL', 'GAS', 'GLMR', 'GMT', 'GMX', 'GRT', 'GTC', 'HBAR', 'HFT',
    'HIFI', 'HIGH', 'HOOK', 'HOT', 'ICP', 'ICX', 'IDEX', 'ID', 'ILV',
    'IMX', 'INJ', 'IOST', 'IOTA', 'IOTX', 'JASMY', 'JOE', 'JTO', 'JUP',
    'KAVA', 'KEY', 'KLAY', 'KNC', 'KSM', 'LDO', 'LEVER', 'LINA', 'LINK',
    'LIT', 'LOOM', 'LPT', 'LQTY', 'LRC', 'LSK', 'LTC', 'LUNC', 'MAGIC',
    'MANTA', 'MANA', 'MASK', 'MATIC', 'MAV', 'MBL', 'MDT', 'MEME', 'METIS',
    'MINA', 'MKR', 'MOVR', 'MTL', 'NEAR', 'NEO', 'NFP', 'NKN', 'NMR',
    'NTRN', 'OCEAN', 'OGN', 'OMG', 'ONE', 'ONDO', 'ONG', 'ONT', 'OP',
    'ORBS', 'ORDI', 'OXT', 'PENDLE', 'PEOPLE', 'PEPE', 'PERP', 'PHB',
    'PIXEL', 'POLYX', 'PORTAL', 'POWR', 'PYTH', 'QNT', 'QTUM', 'RAD',
    'RDNT', 'REEF', 'REN', 'RLC', 'RNDR', 'RONIN', 'ROSE', 'RSR', 'RUNE',
    'RVN', 'SAND', '1000SATS', 'SEI', 'SFP', 'SHIB', 'SKL', 'SLP', 'SNT',
    'SNX', 'SOL', 'SPELL', 'SSV', 'STEEM', 'STG', 'STMX', 'STORJ', 'STPT',
    'STRAX', 'STRK', 'STX', 'SUI', 'SUPER', 'SUSHI', 'SXP', 'THETA',
    'TIA', 'TLM', 'TRB', 'TRU', 'TRX', 'T', 'TWT', 'UMA', 'UNFI', 'UNI',
    'USDC', 'USTC', 'USDT', 'VET', 'WAVES', 'WAXP', 'WIF', 'WLD', 'WOO',
    'XEM', 'XLM', 'XRP', 'XTZ', 'XVG', 'XVS', 'YFI', 'YGG', 'ZEC', 'ZEN',
    'ZIL', 'ZRX'
];

cryptos.forEach(crypto => fetchCryptoData(crypto));

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

  
