let totalVariations = 0;
let cryptoCount = 0;

async function fetchCryptoData(symbol, startTime, endTime) {
	try {
		const response = await fetch(
			`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&startTime=${startTime}&endTime=${endTime}&limit=1000`
		);
		const data = await response.json();

		const cryptoRow = document.getElementById(symbol);
		cryptoRow.innerHTML = `<td>${symbol}</td>`; // Réinitialisation

		totalVariations = 0;
		cryptoCount = 0;

		for (let i = 0; i < data.length; i++) {
			const openPrice = parseFloat(data[i][1]);
			const closePrice = parseFloat(data[i][4]);
			const variation = ((closePrice - openPrice) / openPrice) * 100;
			totalVariations += variation;
			cryptoCount++;

			const variationCell = cryptoRow.insertCell(-1);
			variationCell.textContent = `${variation.toFixed(2)}%`;
			variationCell.classList.add(variation > 0 ? "positive" : "negative");
		}

		updateTotalAndAverageVariations();
	} catch (error) {
		console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
	}
}

function updateTotalAndAverageVariations() {
	document.getElementById('totalVariations').textContent = `Total des variations : ${totalVariations.toFixed(2)}%`;
	const avg = cryptoCount > 0 ? totalVariations / cryptoCount : 0;
	document.getElementById('averageVariations').textContent = `Moyenne des variations : ${avg.toFixed(2)}%`;
}

function fetchDataForRange() {
	const startDate = new Date(document.getElementById('startDate').value);
	const endDate = new Date(document.getElementById('endDate').value);

	if (!startDate || !endDate || startDate >= endDate) {
		alert("Veuillez choisir une plage horaire valide.");
		return;
	}

	const startTime = startDate.getTime();
	const endTime = endDate.getTime();

	fetchCryptoData("ETH", startTime, endTime);
	fetchCryptoData("1INCH", startTime, endTime);
	fetchCryptoData("MOG", startTime, endTime);
fetchCryptoData("BONK", startTime, endTime);
fetchCryptoData("CAT", startTime, endTime);
fetchCryptoData("CHEEMS", startTime, endTime);
fetchCryptoData("FLOKI", startTime, endTime);
fetchCryptoData("LUNC", startTime, endTime);
fetchCryptoData("PEPE", startTime, endTime);
fetchCryptoData("ACT", startTime, endTime);
fetchCryptoData("ACX", startTime, endTime);
fetchCryptoData("ADA", startTime, endTime);
fetchCryptoData("AERGO", startTime, endTime);
fetchCryptoData("AERO", startTime, endTime);
fetchCryptoData("AEVO", startTime, endTime);
fetchCryptoData("AGLD", startTime, endTime);
fetchCryptoData("AI", startTime, endTime);
fetchCryptoData("AKT", startTime, endTime);
fetchCryptoData("ALGO", startTime, endTime);
fetchCryptoData("ALICE", startTime, endTime);
fetchCryptoData("ALPACA", startTime, endTime);
fetchCryptoData("ALPHA", startTime, endTime);
fetchCryptoData("ALT", startTime, endTime);
fetchCryptoData("AMB", startTime, endTime);
fetchCryptoData("ANKR", startTime, endTime);
fetchCryptoData("APE", startTime, endTime);
fetchCryptoData("AXS", startTime, endTime);
fetchCryptoData("BADGER", startTime, endTime);
fetchCryptoData("BAKE", startTime, endTime);
fetchCryptoData("BAL", startTime, endTime);
fetchCryptoData("BANANA", startTime, endTime);
fetchCryptoData("BAND", startTime, endTime);
fetchCryptoData("BAN", startTime, endTime);
fetchCryptoData("BAT", startTime, endTime);
fetchCryptoData("BB", startTime, endTime);
fetchCryptoData("BCH", startTime, endTime);
fetchCryptoData("BEAMX", startTime, endTime);
fetchCryptoData("BEL", startTime, endTime);
fetchCryptoData("BICO", startTime, endTime);
fetchCryptoData("BIGTIME", startTime, endTime);
fetchCryptoData("BTC", startTime, endTime);
fetchCryptoData("C98", startTime, endTime);
fetchCryptoData("CAKE", startTime, endTime);
fetchCryptoData("CATI", startTime, endTime);
fetchCryptoData("CELO", startTime, endTime);
fetchCryptoData("CELR", startTime, endTime);
fetchCryptoData("CETUS", startTime, endTime);
fetchCryptoData("CFX", startTime, endTime);
fetchCryptoData("CHESS", startTime, endTime);
fetchCryptoData("CHILLGUY", startTime, endTime);
fetchCryptoData("CHR", startTime, endTime);
fetchCryptoData("CHZ", startTime, endTime);
fetchCryptoData("CKB", startTime, endTime);
fetchCryptoData("COMBO", startTime, endTime);
fetchCryptoData("DOGE", startTime, endTime);
fetchCryptoData("DOGS", startTime, endTime);
fetchCryptoData("DOT", startTime, endTime);
fetchCryptoData("DRIFT", startTime, endTime);
fetchCryptoData("DUSK", startTime, endTime);
fetchCryptoData("DYDX", startTime, endTime);
fetchCryptoData("DYM", startTime, endTime);
fetchCryptoData("EDU", startTime, endTime);
fetchCryptoData("EGLD", startTime, endTime);
fetchCryptoData("EIGEN", startTime, endTime);
fetchCryptoData("ENA", startTime, endTime);
fetchCryptoData("ENJ", startTime, endTime);
fetchCryptoData("ENS", startTime, endTime);
fetchCryptoData("ETHFI", startTime, endTime);
fetchCryptoData("FLOW", startTime, endTime);
fetchCryptoData("FLUX", startTime, endTime);
fetchCryptoData("FTM", startTime, endTime);
fetchCryptoData("FXS", startTime, endTime);
fetchCryptoData("GALA", startTime, endTime);
fetchCryptoData("GHST", startTime, endTime);
fetchCryptoData("GLM", startTime, endTime);
fetchCryptoData("GMT", startTime, endTime);
fetchCryptoData("GMX", startTime, endTime);
fetchCryptoData("GOAT", startTime, endTime);
fetchCryptoData("GRASS", startTime, endTime);
fetchCryptoData("GRT", startTime, endTime);
fetchCryptoData("GTC", startTime, endTime);
fetchCryptoData("IOST", startTime, endTime);
fetchCryptoData("IOTA", startTime, endTime);
fetchCryptoData("IOTX", startTime, endTime);
fetchCryptoData("IO", startTime, endTime);
fetchCryptoData("JASMY", startTime, endTime);
fetchCryptoData("JOE", startTime, endTime);
fetchCryptoData("JUP", startTime, endTime);
fetchCryptoData("KAIA", startTime, endTime);
fetchCryptoData("KAS", startTime, endTime);
fetchCryptoData("KAVA", startTime, endTime);
fetchCryptoData("KDA", startTime, endTime);
fetchCryptoData("KNC", startTime, endTime);
fetchCryptoData("KOMA", startTime, endTime);
fetchCryptoData("KSM", startTime, endTime);
fetchCryptoData("MAGIC", startTime, endTime);
fetchCryptoData("MANA", startTime, endTime);
fetchCryptoData("MANTA", startTime, endTime);
fetchCryptoData("MASK", startTime, endTime);
fetchCryptoData("MAVIA", startTime, endTime);
fetchCryptoData("MAV", startTime, endTime);
fetchCryptoData("MBOX", startTime, endTime);
fetchCryptoData("MEME", startTime, endTime);
fetchCryptoData("METIS", startTime, endTime);
fetchCryptoData("MEW", startTime, endTime);
fetchCryptoData("MINA", startTime, endTime);
fetchCryptoData("MKR", startTime, endTime);
fetchCryptoData("MOODENG", startTime, endTime);
fetchCryptoData("MORPHO", startTime, endTime);
fetchCryptoData("MOVE", startTime, endTime);
fetchCryptoData("NTRN", startTime, endTime);
fetchCryptoData("NULS", startTime, endTime);
fetchCryptoData("OGN", startTime, endTime);
fetchCryptoData("OMG", startTime, endTime);
fetchCryptoData("OMNI", startTime, endTime);
fetchCryptoData("OM", startTime, endTime);
fetchCryptoData("ONDO", startTime, endTime);
fetchCryptoData("ONE", startTime, endTime);
fetchCryptoData("ONG", startTime, endTime);
fetchCryptoData("ONT", startTime, endTime);
fetchCryptoData("OP", startTime, endTime);
fetchCryptoData("ORCA", startTime, endTime);
fetchCryptoData("ORDI", startTime, endTime);
fetchCryptoData("OXT", startTime, endTime);
fetchCryptoData("PENDLE", startTime, endTime);
fetchCryptoData("PEOPLE", startTime, endTime);
fetchCryptoData("RAYSOL", startTime, endTime);
fetchCryptoData("RDNT", startTime, endTime);
fetchCryptoData("REEF", startTime, endTime);
fetchCryptoData("REI", startTime, endTime);
fetchCryptoData("RENDER", startTime, endTime);
fetchCryptoData("REZ", startTime, endTime);
fetchCryptoData("RIF", startTime, endTime);
fetchCryptoData("RLC", startTime, endTime);
fetchCryptoData("RONIN", startTime, endTime);
fetchCryptoData("ROSE", startTime, endTime);
fetchCryptoData("RPL", startTime, endTime);
fetchCryptoData("RSR", startTime, endTime);
fetchCryptoData("RUNE", startTime, endTime);
fetchCryptoData("RVN", startTime, endTime);
fetchCryptoData("SAFE", startTime, endTime);
fetchCryptoData("STEEM", startTime, endTime);
fetchCryptoData("STG", startTime, endTime);
fetchCryptoData("STMX", startTime, endTime);
fetchCryptoData("STORJ", startTime, endTime);
fetchCryptoData("STRK", startTime, endTime);
fetchCryptoData("STX", startTime, endTime);
fetchCryptoData("SUI", startTime, endTime);
fetchCryptoData("SUN", startTime, endTime);
fetchCryptoData("SUPER", startTime, endTime);
fetchCryptoData("SUSHI", startTime, endTime);
fetchCryptoData("SWELL", startTime, endTime);
fetchCryptoData("SXP", startTime, endTime);
fetchCryptoData("SYN", startTime, endTime);
fetchCryptoData("SYS", startTime, endTime);
fetchCryptoData("TURBO", startTime, endTime);
fetchCryptoData("T", startTime, endTime);
fetchCryptoData("TWT", startTime, endTime);
fetchCryptoData("UMA", startTime, endTime);
fetchCryptoData("UNI", startTime, endTime);
fetchCryptoData("", startTime, endTime);
fetchCryptoData("USTC", startTime, endTime);
fetchCryptoData("UXLINK", startTime, endTime);
fetchCryptoData("VET", startTime, endTime);
fetchCryptoData("VIDT", startTime, endTime);
fetchCryptoData("VIRTUAL", startTime, endTime);
fetchCryptoData("VOXEL", startTime, endTime);
fetchCryptoData("WAXP", startTime, endTime);
fetchCryptoData("WIF", startTime, endTime);
fetchCryptoData("WLD", startTime, endTime);
fetchCryptoData("ZEC", startTime, endTime);
fetchCryptoData("ZEN", startTime, endTime);
fetchCryptoData("ZETA", startTime, endTime);
fetchCryptoData("ZIL", startTime, endTime);
fetchCryptoData("ZK", startTime, endTime);
fetchCryptoData("ZRO", startTime, endTime);
fetchCryptoData("ZRX", startTime, endTime);
	
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