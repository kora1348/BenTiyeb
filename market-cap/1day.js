let totalVariations = 0; // Variable globale pour stocker la somme des variations
let cryptoCount = 0; // Variable pour compter le nombre de cryptos traitées (jusqu'à 149)

async function fetchCryptoData(symbol, startDate, endDate) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&startTime=${startDate}&endTime=${endDate}`
        );
        const data = await response.json();

        // Mise à jour du tableau avec les données et la couleur
        const cryptoRow = document.getElementById(symbol);
        let shouldDisplay = false; // Variable pour vérifier si une variation >= 7% existe
        let isShort = false; // Variable pour vérifier si une variation <= -7% existe

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
            totalVariations += weeklyVariation; // Ajout de la variation à la somme globale
            cryptoCount++; // Incrément du compteur
            updateTotalAndAverageVariations(); // Mise à jour des éléments HTML pour le total et la moyenne

            const cellIndex = i + 1; // Décalage d'une cellule pour éviter la première cellule (Crypto)
            const variationCell = cryptoRow.insertCell(cellIndex);
            const variationValue = weeklyVariation.toFixed(2);

            variationCell.textContent = `${variationValue}%`;

            // Ajouter la classe "positive" ou "negative" en fonction de la variation
            if (weeklyVariation > 0) {
                variationCell.classList.add("positive");
            } else if (weeklyVariation < 0) {
                variationCell.classList.add("negative");
            }

        }

    } catch (error) {
        console.error(
            `Erreur lors de la récupération des données pour ${symbol}:`,
            error
        );
    }
}

// Fonction pour mettre à jour l'affichage du total et de la moyenne des variations
function updateTotalAndAverageVariations() {
    const totalVariationsElement = document.getElementById('totalVariations');
    const averageVariationsElement = document.getElementById('averageVariations');

    totalVariationsElement.textContent = `Total des variations : ${totalVariations.toFixed(2)}%`;

    // Calcul de la moyenne sur 151 cryptos et conversion au format pourcentage
    const averageVariations = (totalVariations / Math.min(cryptoCount, 151)) * 100;
    averageVariationsElement.textContent = `Moyenne des variations : ${averageVariations.toFixed(2)}%`;
}

// Fonction pour récupérer les données pour la période spécifiée
function fetchDataForPeriod() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Convertir les dates en timestamp
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    // Réinitialiser les variables globales
    totalVariations = 0;
    cryptoCount = 0;

    // Appel de la fonction pour obtenir les taux de variation des cryptos
    fetchCryptoData("ETH", startTimestamp, endTimestamp);
    fetchCryptoData("1INCH", startTimestamp, endTimestamp);
	fetchCryptoData("MOG", startTimestamp, endTimestamp);
fetchCryptoData("BONK", startTimestamp, endTimestamp);
fetchCryptoData("CAT", startTimestamp, endTimestamp);
fetchCryptoData("CHEEMS", startTimestamp, endTimestamp);
fetchCryptoData("FLOKI", startTimestamp, endTimestamp);
fetchCryptoData("LUNC", startTimestamp, endTimestamp);
fetchCryptoData("PEPE", startTimestamp, endTimestamp);
fetchCryptoData("ACT", startTimestamp, endTimestamp);
fetchCryptoData("ACX", startTimestamp, endTimestamp);
fetchCryptoData("ADA", startTimestamp, endTimestamp);
fetchCryptoData("AERGO", startTimestamp, endTimestamp);
fetchCryptoData("AERO", startTimestamp, endTimestamp);
fetchCryptoData("AEVO", startTimestamp, endTimestamp);
fetchCryptoData("AGLD", startTimestamp, endTimestamp);
fetchCryptoData("AI", startTimestamp, endTimestamp);
fetchCryptoData("AKT", startTimestamp, endTimestamp);
fetchCryptoData("ALGO", startTimestamp, endTimestamp);
fetchCryptoData("ALICE", startTimestamp, endTimestamp);
fetchCryptoData("ALPACA", startTimestamp, endTimestamp);
fetchCryptoData("ALPHA", startTimestamp, endTimestamp);
fetchCryptoData("ALT", startTimestamp, endTimestamp);
fetchCryptoData("AMB", startTimestamp, endTimestamp);
fetchCryptoData("ANKR", startTimestamp, endTimestamp);
fetchCryptoData("APE", startTimestamp, endTimestamp);
fetchCryptoData("AXS", startTimestamp, endTimestamp);
fetchCryptoData("BADGER", startTimestamp, endTimestamp);
fetchCryptoData("BAKE", startTimestamp, endTimestamp);
fetchCryptoData("BAL", startTimestamp, endTimestamp);
fetchCryptoData("BANANA", startTimestamp, endTimestamp);
fetchCryptoData("BAND", startTimestamp, endTimestamp);
fetchCryptoData("BAN", startTimestamp, endTimestamp);
fetchCryptoData("BAT", startTimestamp, endTimestamp);
fetchCryptoData("BB", startTimestamp, endTimestamp);
fetchCryptoData("BCH", startTimestamp, endTimestamp);
fetchCryptoData("BEAMX", startTimestamp, endTimestamp);
fetchCryptoData("BEL", startTimestamp, endTimestamp);
fetchCryptoData("BICO", startTimestamp, endTimestamp);
fetchCryptoData("BIGTIME", startTimestamp, endTimestamp);
fetchCryptoData("BTC", startTimestamp, endTimestamp);
fetchCryptoData("C98", startTimestamp, endTimestamp);
fetchCryptoData("CAKE", startTimestamp, endTimestamp);
fetchCryptoData("CATI", startTimestamp, endTimestamp);
fetchCryptoData("CELO", startTimestamp, endTimestamp);
fetchCryptoData("CELR", startTimestamp, endTimestamp);
fetchCryptoData("CETUS", startTimestamp, endTimestamp);
fetchCryptoData("CFX", startTimestamp, endTimestamp);
fetchCryptoData("CHESS", startTimestamp, endTimestamp);
fetchCryptoData("CHILLGUY", startTimestamp, endTimestamp);
fetchCryptoData("CHR", startTimestamp, endTimestamp);
fetchCryptoData("CHZ", startTimestamp, endTimestamp);
fetchCryptoData("CKB", startTimestamp, endTimestamp);
fetchCryptoData("COMBO", startTimestamp, endTimestamp);
fetchCryptoData("DOGE", startTimestamp, endTimestamp);
fetchCryptoData("DOGS", startTimestamp, endTimestamp);
fetchCryptoData("DOT", startTimestamp, endTimestamp);
fetchCryptoData("DRIFT", startTimestamp, endTimestamp);
fetchCryptoData("DUSK", startTimestamp, endTimestamp);
fetchCryptoData("DYDX", startTimestamp, endTimestamp);
fetchCryptoData("DYM", startTimestamp, endTimestamp);
fetchCryptoData("EDU", startTimestamp, endTimestamp);
fetchCryptoData("EGLD", startTimestamp, endTimestamp);
fetchCryptoData("EIGEN", startTimestamp, endTimestamp);
fetchCryptoData("ENA", startTimestamp, endTimestamp);
fetchCryptoData("ENJ", startTimestamp, endTimestamp);
fetchCryptoData("ENS", startTimestamp, endTimestamp);
fetchCryptoData("ETHFI", startTimestamp, endTimestamp);
fetchCryptoData("FLOW", startTimestamp, endTimestamp);
fetchCryptoData("FLUX", startTimestamp, endTimestamp);
fetchCryptoData("FTM", startTimestamp, endTimestamp);
fetchCryptoData("FXS", startTimestamp, endTimestamp);
fetchCryptoData("GALA", startTimestamp, endTimestamp);
fetchCryptoData("GHST", startTimestamp, endTimestamp);
fetchCryptoData("GLM", startTimestamp, endTimestamp);
fetchCryptoData("GMT", startTimestamp, endTimestamp);
fetchCryptoData("GMX", startTimestamp, endTimestamp);
fetchCryptoData("GOAT", startTimestamp, endTimestamp);
fetchCryptoData("GRASS", startTimestamp, endTimestamp);
fetchCryptoData("GRT", startTimestamp, endTimestamp);
fetchCryptoData("GTC", startTimestamp, endTimestamp);
fetchCryptoData("IOST", startTimestamp, endTimestamp);
fetchCryptoData("IOTA", startTimestamp, endTimestamp);
fetchCryptoData("IOTX", startTimestamp, endTimestamp);
fetchCryptoData("IO", startTimestamp, endTimestamp);
fetchCryptoData("JASMY", startTimestamp, endTimestamp);
fetchCryptoData("JOE", startTimestamp, endTimestamp);
fetchCryptoData("JUP", startTimestamp, endTimestamp);
fetchCryptoData("KAIA", startTimestamp, endTimestamp);
fetchCryptoData("KAS", startTimestamp, endTimestamp);
fetchCryptoData("KAVA", startTimestamp, endTimestamp);
fetchCryptoData("KDA", startTimestamp, endTimestamp);
fetchCryptoData("KNC", startTimestamp, endTimestamp);
fetchCryptoData("KOMA", startTimestamp, endTimestamp);
fetchCryptoData("KSM", startTimestamp, endTimestamp);
fetchCryptoData("MAGIC", startTimestamp, endTimestamp);
fetchCryptoData("MANA", startTimestamp, endTimestamp);
fetchCryptoData("MANTA", startTimestamp, endTimestamp);
fetchCryptoData("MASK", startTimestamp, endTimestamp);
fetchCryptoData("MAVIA", startTimestamp, endTimestamp);
fetchCryptoData("MAV", startTimestamp, endTimestamp);
fetchCryptoData("MBOX", startTimestamp, endTimestamp);
fetchCryptoData("MEME", startTimestamp, endTimestamp);
fetchCryptoData("METIS", startTimestamp, endTimestamp);
fetchCryptoData("MEW", startTimestamp, endTimestamp);
fetchCryptoData("MINA", startTimestamp, endTimestamp);
fetchCryptoData("MKR", startTimestamp, endTimestamp);
fetchCryptoData("MOODENG", startTimestamp, endTimestamp);
fetchCryptoData("MORPHO", startTimestamp, endTimestamp);
fetchCryptoData("MOVE", startTimestamp, endTimestamp);
fetchCryptoData("NTRN", startTimestamp, endTimestamp);
fetchCryptoData("NULS", startTimestamp, endTimestamp);
fetchCryptoData("OGN", startTimestamp, endTimestamp);
fetchCryptoData("OMG", startTimestamp, endTimestamp);
fetchCryptoData("OMNI", startTimestamp, endTimestamp);
fetchCryptoData("OM", startTimestamp, endTimestamp);
fetchCryptoData("ONDO", startTimestamp, endTimestamp);
fetchCryptoData("ONE", startTimestamp, endTimestamp);
fetchCryptoData("ONG", startTimestamp, endTimestamp);
fetchCryptoData("ONT", startTimestamp, endTimestamp);
fetchCryptoData("OP", startTimestamp, endTimestamp);
fetchCryptoData("ORCA", startTimestamp, endTimestamp);
fetchCryptoData("ORDI", startTimestamp, endTimestamp);
fetchCryptoData("OXT", startTimestamp, endTimestamp);
fetchCryptoData("PENDLE", startTimestamp, endTimestamp);
fetchCryptoData("PEOPLE", startTimestamp, endTimestamp);
fetchCryptoData("RAYSOL", startTimestamp, endTimestamp);
fetchCryptoData("RDNT", startTimestamp, endTimestamp);
fetchCryptoData("REEF", startTimestamp, endTimestamp);
fetchCryptoData("REI", startTimestamp, endTimestamp);
fetchCryptoData("RENDER", startTimestamp, endTimestamp);
fetchCryptoData("REZ", startTimestamp, endTimestamp);
fetchCryptoData("RIF", startTimestamp, endTimestamp);
fetchCryptoData("RLC", startTimestamp, endTimestamp);
fetchCryptoData("RONIN", startTimestamp, endTimestamp);
fetchCryptoData("ROSE", startTimestamp, endTimestamp);
fetchCryptoData("RPL", startTimestamp, endTimestamp);
fetchCryptoData("RSR", startTimestamp, endTimestamp);
fetchCryptoData("RUNE", startTimestamp, endTimestamp);
fetchCryptoData("RVN", startTimestamp, endTimestamp);
fetchCryptoData("SAFE", startTimestamp, endTimestamp);
fetchCryptoData("STEEM", startTimestamp, endTimestamp);
fetchCryptoData("STG", startTimestamp, endTimestamp);
fetchCryptoData("STMX", startTimestamp, endTimestamp);
fetchCryptoData("STORJ", startTimestamp, endTimestamp);
fetchCryptoData("STRK", startTimestamp, endTimestamp);
fetchCryptoData("STX", startTimestamp, endTimestamp);
fetchCryptoData("SUI", startTimestamp, endTimestamp);
fetchCryptoData("SUN", startTimestamp, endTimestamp);
fetchCryptoData("SUPER", startTimestamp, endTimestamp);
fetchCryptoData("SUSHI", startTimestamp, endTimestamp);
fetchCryptoData("SWELL", startTimestamp, endTimestamp);
fetchCryptoData("SXP", startTimestamp, endTimestamp);
fetchCryptoData("SYN", startTimestamp, endTimestamp);
fetchCryptoData("SYS", startTimestamp, endTimestamp);
fetchCryptoData("TURBO", startTimestamp, endTimestamp);
fetchCryptoData("T", startTimestamp, endTimestamp);
fetchCryptoData("TWT", startTimestamp, endTimestamp);
fetchCryptoData("UMA", startTimestamp, endTimestamp);
fetchCryptoData("UNI", startTimestamp, endTimestamp);
fetchCryptoData("", startTimestamp, endTimestamp);
fetchCryptoData("USTC", startTimestamp, endTimestamp);
fetchCryptoData("UXLINK", startTimestamp, endTimestamp);
fetchCryptoData("VET", startTimestamp, endTimestamp);
fetchCryptoData("VIDT", startTimestamp, endTimestamp);
fetchCryptoData("VIRTUAL", startTimestamp, endTimestamp);
fetchCryptoData("VOXEL", startTimestamp, endTimestamp);
fetchCryptoData("WAXP", startTimestamp, endTimestamp);
fetchCryptoData("WIF", startTimestamp, endTimestamp);
fetchCryptoData("WLD", startTimestamp, endTimestamp);
fetchCryptoData("ZEC", startTimestamp, endTimestamp);
fetchCryptoData("ZEN", startTimestamp, endTimestamp);
fetchCryptoData("ZETA", startTimestamp, endTimestamp);
fetchCryptoData("ZIL", startTimestamp, endTimestamp);
fetchCryptoData("ZK", startTimestamp, endTimestamp);
fetchCryptoData("ZRO", startTimestamp, endTimestamp);
fetchCryptoData("ZRX", startTimestamp, endTimestamp);

    // Mettre à jour la date de mise à jour
    document.getElementById('updateDate').textContent = new Date().toLocaleDateString();
}



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