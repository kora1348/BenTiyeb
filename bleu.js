async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=3m&limit=1`
        );
        const data = await response.json();
  
        let totalVariation = 0;
        const cryptoRow = document.getElementById(symbol);
  
        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
            const cellIndex = i + 1;
  
            const variationCell = cryptoRow.insertCell(cellIndex);
            const variationValue = weeklyVariation.toFixed(2);
            const weekStartDate = new Date(data[i][0]);
            const weekEndDate = new Date(data[i][6]);
            const optionsStart = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric" };
            const optionsEnd = { hour: "numeric", minute: "numeric" };
            variationCell.textContent = `${weekStartDate.toLocaleDateString(
                "fr-FR",
                optionsStart
            )} (${weekStartDate.toLocaleTimeString("fr-FR", optionsEnd)}) - ${weekEndDate.toLocaleDateString(
                "fr-FR",
                optionsStart
            )} (${weekEndDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;
  
            if (weeklyVariation > 0) {
                variationCell.classList.add("positive");
            } else if (weeklyVariation < 0) {
                variationCell.classList.add("negative");
            }
  
            totalVariation += weeklyVariation;
        }
  
        const totalCell = cryptoRow.insertCell(data.length + 1);
        const totalValue = totalVariation.toFixed(2);
        totalCell.style.textAlign = 'center';
  
        const cryptoNamesElement = document.getElementById('cryptoNames');
  
        // Stockage des cryptos positifs
        if (totalVariation > 0) {
            totalCell.classList.add("positive");
            positiveCryptos.push(symbol);
        }
  
        if ((totalVariation >= -5.99 && totalVariation <= -5.00) || (totalVariation >= 70.00 && totalVariation <= 79.99)) {
            totalCell.classList.add("negative");
        }
  
        if (totalVariation < 0) {
            totalCell.classList.add("negative");
        }
  
        totalCell.textContent = `${totalValue}%`;
  
    } catch (error) {
        console.error(
            `Erreur lors de la récupération des données pour ${symbol}:`,
            error
        );
    }
}
  
// Tableau pour stocker les cryptos
const positiveCryptos = [];
  
// Appel de la fonction pour obtenir les taux de variation des cryptos
const cryptos = [
    "1INCH", "AAVE", "ACE", "ACH", "ADA", "AEVO", "AGLD", "AI", "ALGO",
    "ALICE", "ALPACA", "ALPHA", "ALT", "AMB", "ANKR", "APE", "API3", "APT", "ARB",
    "ARKM", "ARK", "ARPA", "AR", "ASTR", "ATA", "ATOM", "AUCTION", "AVAX", "AXL",
    "AXS", "BADGER", "BAKE", "BAL", "BANANA", "BAND", "BAT", "BB", "BCH", "BEAMX",
    "BEL", "BICO", "BLUR", "BLZ", "BNB", "BNT", "BNX", "BOME", "BOND", "BONK",
    "BTC", "C98", "CAKE", "CELO", "CELR", "CFX", "CHR", "CHZ", "CKB", "COMBO",
    "COMP", "COTI", "CRV", "CTSI", "CYBER", "DAR", "DASH", "DENT", "DOGE", "DOT",
    "DUSK", "DYDX", "DYM", "EDU", "EGLD", "ENA", "ENJ", "ENS", "EOS", "ETC",
    "ETHFI", "ETH", "FET", "FIL", "FLM", "FLOKI", "FLOW", "FTM", "FXS", "GALA",
    "GAS", "GLM", "GMT", "GMX", "GRT", "GTC", "G", "HBAR", "HFT", "HIFI", "HIGH",
    "HOOK", "HOT", "ICP", "ICX", "ID", "ILV", "IMX", "INJ", "IOST", "IOTA", "IOTX",
    "IO", "JASMY", "JOE", "JTO", "JUP", , "KAVA", "KEY", "KLAY", "KNC", "KSM",
    "LDO", "LEVER", "LINA", "LINK", "LISTA", "LIT", "LOOM", "LPT", "LQTY", "LRC",
    "LSK", "LTC", "LUNC", "MAGIC", "MANA", "MANTA", "MASK", "MATIC", "MAV", "MEME",
    "METIS", "MINA", "MKR", "MOVR", "MTL", "NEAR", "NEO", "NFP", "NKN", "NMR",
    "NOT", "NTRN", "OGN", "OMG", "OMNI", "OM", "ONE", "ONG", "ONT", "OP", "ORDI",
    "OXT", "PENDLE", "PEOPLE", "PEPE", "PERP", "PHB", "PIXEL", "POLYX", "PORTAL",
    "POWR", "PYTH", "QNT", "QTUM", "RARE", "RATS", "RDNT", "REEF", "RENDER", "REN",
    "REZ", "RIF", "RLC", "RONIN", "ROSE", "RSR", "RUNE", "RVN", "SAGA", "SAND",
    "SATS ", "SEI", "SFP", "SHIB", "SKL", "SNX", "SOL", "SPELL", "SSV", "STEEM",
    "STG", "STMX", "STORJ", "STRK", "STX", "SUI", "SUN", "SUPER", "SUSHI", "SXP",
    "SYN", "SYS", "TAO", "THETA", "TIA", "TLM", "TNSR", "TON", "TRB", "TRU", "TRX",
    "TWT", "UMA", "UNFI", "UNI", "USTC", "VANRY", "VET", "VIDT", "VOXEL", "WAXP",
    "WIF", "WLD", "WOO", "W", "XAI", "XEC", "XEM", "XLM", "XMR", "XRP", "XTZ",
    "XVG", "XVS", "YFI", "YGG", "ZEC", "ZIL", "ZK", "ZRO", "ZRX" 
];
  
cryptos.forEach(symbol => fetchCryptoData(symbol));

// Une fois toutes les cryptos traitées, afficher une crypto aléatoire avec PILE ou FACE
setTimeout(() => {
    if (cryptos.length > 0) {
        const randomIndex = Math.floor(Math.random() * cryptos.length);
        const randomCrypto = cryptos[randomIndex];
        const pileOuFace = Math.random() < 0.5 ? "POSITIF" : "NEGATIF";
        document.getElementById('cryptoNames').innerHTML = `<p>${randomCrypto}: ${pileOuFace}</p>`;
    } else {
        document.getElementById('cryptoNames').innerHTML = `<p>Aucune crypto trouvée.</p>`;
    }
}, 5000); // Attente de 5 secondes pour laisser le temps aux fetch d'être terminés


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

