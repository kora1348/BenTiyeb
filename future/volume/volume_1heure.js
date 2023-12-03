async function fetchCryptoData(symbol) {
	try {
		const response = await fetch(
			`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=5`
		);

		const data = await response.json();

		const volumes = [];
		const times = [];

		// Récupérez l'heure et le volume pour chaque intervalle
		for (let i = 0; i < 5; i++) {
			const time = new Date(data[i][0]).toLocaleTimeString('fr-FR', {
				hour: 'numeric',
				minute: 'numeric'
			});
			const volume = parseFloat(data[i][5]);

			times.push(time);
			volumes.push(volume);

			const formattedVolume = volume.toLocaleString('fr-FR', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}).replace(',', '.');
			const volumeElement = document.getElementById(`volume_${symbol}_${i + 1}`);
			volumeElement.textContent = `${time} (${formattedVolume} USDT)`;
		}

		// Calculez le total des volumes
		const totalVolume = volumes.reduce((acc, volume) => acc + volume, 0);

		// Mettez à jour le contenu HTML avec le total
		const formattedTotalVolume = totalVolume.toLocaleString('fr-FR', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).replace(',', '.');
		const totalElement = document.getElementById(`total_${symbol}`);
		totalElement.textContent = `${formattedTotalVolume} USDT`;

		// Calculez la moyenne des volumes
		const averageVolume = totalVolume / data.length; // Dans ce cas, 2 représente le nombre d'intervalles

		// Mettez à jour le contenu HTML avec la moyenne
		const formattedAverageVolume = averageVolume.toLocaleString('fr-FR', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).replace(',', '.');
		const averageElement = document.getElementById(`average_${symbol}`);
		averageElement.textContent = `${formattedAverageVolume} USDT`;

		const cryptoNamesElement = document.getElementById('cryptoNames');

		// Utilisez directement le pourcentage dans la condition (90 dans cet exemple)
		const percentageThresholdLong = 90;

		// Vérifiez si les volumes de chaque intervalle de volumes sont supérieurs à 90% de la moyenne totale
		const longElement = document.getElementById(`long_${symbol}`);
		console.log("Symbol:", symbol);
		console.log("Volumes:", volumes);
		console.log("Average Volume:", averageVolume);
		const isLong = volumes.every(volume => volume > averageVolume * (percentageThresholdLong / 100));

		console.log("Is LONG:", isLong);

		if (isLong) {
			longElement.textContent = "LONG";
			longElement.classList.add("long", "positive"); // Ajout de la classe "positive" pour LONG
			cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG</p>`;
		} else {
			longElement.textContent = "-";
		}

		// Utilisez directement le pourcentage dans la condition (90 dans cet exemple)
		const percentageThresholdShort = 90;

		// Vérifiez si les volumes de chaque intervalle de volumes sont inférieurs à 90% de la moyenne totale
		const shortElement = document.getElementById(`short_${symbol}`);
		if (volumes.every(volume => volume < averageVolume * (percentageThresholdShort / 100))) {
			shortElement.textContent = "SHORT";
			shortElement.classList.add("short", "negative"); // Ajout de la classe "negative" pour SHORT
			cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: SHORT</p>`;
		} else {
			shortElement.textContent = "-";
		}

	} catch (error) {
		console.error(
			`Erreur lors de la récupération des données pour ${symbol}:`,
			error
		);
	}
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



// Appel de la fonction pour obtenir les taux de variation des cryptos
fetchCryptoData("1INCH");
fetchCryptoData("AAVE");
fetchCryptoData("ACH");
fetchCryptoData("ADA");
fetchCryptoData("AGIX");
fetchCryptoData("AGLD");
fetchCryptoData("ALGO");
fetchCryptoData("ALICE");
fetchCryptoData("ALPHA");
fetchCryptoData("ALPACA");
fetchCryptoData("AMB");
fetchCryptoData("ANKR");
fetchCryptoData("ANT");
fetchCryptoData("APE");
fetchCryptoData("API3");
fetchCryptoData("APT");
fetchCryptoData("ARB");
fetchCryptoData("ARKM");
fetchCryptoData("ARPA");
fetchCryptoData("AR");
fetchCryptoData("ASTR");
fetchCryptoData("ATA");
fetchCryptoData("ATOM");
fetchCryptoData("AUDIO");
fetchCryptoData("AVAX");
fetchCryptoData("AXS");
fetchCryptoData("BAKE");
fetchCryptoData("BAL");
fetchCryptoData("BAND");
fetchCryptoData("BAT");
fetchCryptoData("BCH");
fetchCryptoData("BEL");
fetchCryptoData("BLZ");
fetchCryptoData("BNB");
fetchCryptoData("BNT");
fetchCryptoData("BNX");
fetchCryptoData("BTC");
fetchCryptoData("C98");
fetchCryptoData("CELO");
fetchCryptoData("CELR");
fetchCryptoData("CFX");
fetchCryptoData("CHR");
fetchCryptoData("CHZ");
fetchCryptoData("CKB");
fetchCryptoData("COMBO");
fetchCryptoData("COMP");
fetchCryptoData("COTI");
fetchCryptoData("CRV");
fetchCryptoData("CTK");
fetchCryptoData("CTSI");
fetchCryptoData("CVX");
fetchCryptoData("CYBER");
fetchCryptoData("DAR");
fetchCryptoData("DASH");
fetchCryptoData("DENT");
fetchCryptoData("DGB");
fetchCryptoData("DOGE");
fetchCryptoData("DOT");
fetchCryptoData("DUSK");
fetchCryptoData("DYDX");
fetchCryptoData("EDU");
fetchCryptoData("EGLD");
fetchCryptoData("ENJ");
fetchCryptoData("ENS");
fetchCryptoData("EOS");
fetchCryptoData("ETC");
fetchCryptoData("ETH");
fetchCryptoData("FET");
fetchCryptoData("FLM");
fetchCryptoData("FLOKI");
fetchCryptoData("FLOW");
fetchCryptoData("FTM");
fetchCryptoData("FXS");
fetchCryptoData("GALA");
fetchCryptoData("GAL");
fetchCryptoData("GMT");
fetchCryptoData("GMX");
fetchCryptoData("GRT");
fetchCryptoData("GTC");
fetchCryptoData("HBAR");
fetchCryptoData("HFT");
fetchCryptoData("HIFI");
fetchCryptoData("HIGH");
fetchCryptoData("HOT");
fetchCryptoData("ICP");
fetchCryptoData("ICX");
fetchCryptoData("IDEX");
fetchCryptoData("ID");
fetchCryptoData("IMX");
fetchCryptoData("INJ");
fetchCryptoData("IOST");
fetchCryptoData("IOTA");
fetchCryptoData("IOTX");
fetchCryptoData("JASMY");
fetchCryptoData("JOE");
fetchCryptoData("KAVA");
fetchCryptoData("KEY");
fetchCryptoData("KLAY");
fetchCryptoData("KNC");
fetchCryptoData("KSM");
fetchCryptoData("LDO");
fetchCryptoData("LEVER");
fetchCryptoData("LINA");
fetchCryptoData("LINK");
fetchCryptoData("LIT");
fetchCryptoData("LPT");
fetchCryptoData("LQTY");
fetchCryptoData("LRC");
fetchCryptoData("LTC");
fetchCryptoData("LUNA");
fetchCryptoData("LUNC");
fetchCryptoData("MAGIC");
fetchCryptoData("MANA");
fetchCryptoData("MASK");
fetchCryptoData("MATIC");
fetchCryptoData("MAV");
fetchCryptoData("MDT");
fetchCryptoData("MINA");
fetchCryptoData("MKR");
fetchCryptoData("MTL");
fetchCryptoData("NEAR");
fetchCryptoData("NEO");
fetchCryptoData("NKN");
fetchCryptoData("NMR");
fetchCryptoData("OCEAN");
fetchCryptoData("OGN");
fetchCryptoData("OMG");
fetchCryptoData("OM");
fetchCryptoData("ONE");
fetchCryptoData("ONT");
fetchCryptoData("PENDLE");
fetchCryptoData("PEPE");
fetchCryptoData("PERP");
fetchCryptoData("PHB");
fetchCryptoData("QNT");
fetchCryptoData("QTUM");
fetchCryptoData("RAD");
fetchCryptoData("REEF");
fetchCryptoData("REN");
fetchCryptoData("RLC");
fetchCryptoData("RNDR");
fetchCryptoData("ROSE");
fetchCryptoData("RSR");
fetchCryptoData("RUNE");
fetchCryptoData("RVN");
fetchCryptoData("SAND");
fetchCryptoData("SEI");
fetchCryptoData("SFP");
fetchCryptoData("SHIB");
fetchCryptoData("SKL");
fetchCryptoData("SNX");
fetchCryptoData("SNT");
fetchCryptoData("SOL");
fetchCryptoData("SPELL");
fetchCryptoData("SSV");
fetchCryptoData("STORJ");
fetchCryptoData("STX");
fetchCryptoData("SUI");
fetchCryptoData("SUSHI");
fetchCryptoData("SXP");
fetchCryptoData("THETA");
fetchCryptoData("TLM");
fetchCryptoData("TRB");
fetchCryptoData("TRU");
fetchCryptoData("TRX");
fetchCryptoData("T");
fetchCryptoData("UMA");
fetchCryptoData("UNFI");
fetchCryptoData("UNI");
fetchCryptoData("USDC");
fetchCryptoData("VET");
fetchCryptoData("WAVES");
fetchCryptoData("WLD");
fetchCryptoData("WOO");
fetchCryptoData("XEC");
fetchCryptoData("XEM");
fetchCryptoData("XLM");
fetchCryptoData("XMR");
fetchCryptoData("XRP");
fetchCryptoData("XTZ");
fetchCryptoData("XVG");
fetchCryptoData("XVS");
fetchCryptoData("YFI");
fetchCryptoData("YGG");
fetchCryptoData("ZEC");
fetchCryptoData("ZEN");
fetchCryptoData("ZIL");
fetchCryptoData("ZRX");