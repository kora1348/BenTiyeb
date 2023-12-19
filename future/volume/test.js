// Fonction pour vérifier et afficher une notification
function checkAndNotify(symbol, volumes, averageVolume, percentageThresholdLong) {
    const longElement = document.getElementById(`long_${symbol}`);
    const isLong = volumes.every(volume => volume > averageVolume * (percentageThresholdLong / 100));


    if (isLong) {
        longElement.textContent = "LONG";
        longElement.classList.add("long", "positive"); // Ajout de la classe "positive" pour LONG
        createNotification(symbol, `Le volume de ${symbol} est supérieur à 90% de la moyenne`);
    } else {
        longElement.textContent = "-";
    }
	// Ajout de la notification de test ici
    createNotification("Test Crypto", "Ceci est un message de test");
}

// Fonction pour créer une notification de navigateur
function createNotification(cryptoName, message) {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                try {
                    // Fermer toutes les notifications précédentes
                    const notifications = Notification.get();

                    notifications.forEach(notification => {
                        notification.close();
                    });

                    // Créer une nouvelle notification
                    const notification = new Notification(cryptoName, { body: message });

                    // Détruire la notification après 1 minute
                    setTimeout(() => {
                        notification.close();
                    }, 60000);
                } catch (error) {
                    console.error("Erreur lors de la création de la notification:", error);
                }
            } else {
                console.error("Permission de notification non accordée");
            }
        }).catch(error => {
            console.error("Erreur lors de la demande de permission de notification:", error);
        });
    }
}


// Fonction pour rafraîchir les données d'une crypto
async function refreshData(symbol) {
    while (true) {
        await fetchCryptoData(symbol);
        mettreAJourHeure(); // Appeler la fonction pour mettre à jour l'heure
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5000 millisecondes pour 5 secondes
    }
}

// Fonction pour demander la permission de notification
function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            console.log("Permission de notification:", permission);
        }).catch(error => {
            console.error("Erreur lors de la demande de permission de notification:", error);
        });
    }
}

async function fetchCryptoData(symbol) {
	try {
		const response = await fetch(
			`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1m&limit=5`
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
		const isLong = volumes.every(volume => volume > averageVolume * (percentageThresholdLong / 100));



		if (isLong) {
			longElement.textContent = "LONG";
			longElement.classList.add("long", "positive"); // Ajout de la classe "positive" pour LONG
			cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG</p>`;
		} else {
			longElement.textContent = "-";
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



// Exécutez la fonction pour demander la permission de notification
requestPermission();

// Appel de la fonction pour obtenir les taux de variation des cryptos
refreshData("1INCH");
refreshData("AAVE");
refreshData("ACH");
refreshData("ADA");
refreshData("AGIX");
refreshData("AGLD");
refreshData("ALGO");
refreshData("ALICE");
refreshData("ALPHA");
refreshData("ALPACA");
refreshData("AMB");
refreshData("ANKR");
refreshData("ANT");
refreshData("APE");
refreshData("API3");
refreshData("APT");
refreshData("ARB");
refreshData("ARK");
refreshData("ARKM");
refreshData("ARPA");
refreshData("AR");
refreshData("ASTR");
refreshData("ATA");
refreshData("ATOM");
refreshData("AUCTION");
refreshData("AUDIO");
refreshData("AVAX");
refreshData("AXS");
refreshData("BADGER");
refreshData("BAKE");
refreshData("BAL");
refreshData("BAND");
refreshData("BAT");
refreshData("BCH");
refreshData("BEAMX");
refreshData("BEL");
refreshData("BICO");
refreshData("BIGTIME");
refreshData("BLUEBIRD");
refreshData("BLUR");
refreshData("BLZ");
refreshData("BNB");
refreshData("BNT");
refreshData("BNX");
refreshData("BOND");
refreshData("BSV");
refreshData("BTCDOM");
refreshData("BTC");
refreshData("C98");
refreshData("CELO");
refreshData("CELR");
refreshData("CFX");
refreshData("CHR");
refreshData("CHZ");
refreshData("CKB");
refreshData("COMBO");
refreshData("COMP");
refreshData("COTI");
refreshData("CRV");
refreshData("CTK");
refreshData("CTSI");
refreshData("CVX");
refreshData("CYBER");
refreshData("DAR");
refreshData("DASH");
refreshData("DENT");
refreshData("DGB");
refreshData("DOGE");
refreshData("DOT");
refreshData("DUSK");
refreshData("DYDX");
refreshData("EDU");
refreshData("EGLD");
refreshData("ENJ");
refreshData("ENS");
refreshData("EOS");
refreshData("ETC");
refreshData("ETH");
refreshData("FET");
refreshData("FLM");
refreshData("FLOKI");
refreshData("FLOW");
refreshData("FTM");
refreshData("FXS");
refreshData("GALA");
refreshData("GAL");
refreshData("GMT");
refreshData("GMX");
refreshData("GRT");
refreshData("GTC");
refreshData("HBAR");
refreshData("HFT");
refreshData("HIFI");
refreshData("HIGH");
refreshData("HOT");
refreshData("ICP");
refreshData("ICX");
refreshData("IDEX");
refreshData("ID");
refreshData("IMX");
refreshData("INJ");
refreshData("IOST");
refreshData("IOTA");
refreshData("IOTX");
refreshData("JASMY");
refreshData("JOE");
refreshData("KAVA");
refreshData("KEY");
refreshData("KLAY");
refreshData("KNC");
refreshData("KSM");
refreshData("LDO");
refreshData("LEVER");
refreshData("LINA");
refreshData("LINK");
refreshData("LIT");
refreshData("LPT");
refreshData("LQTY");
refreshData("LRC");
refreshData("LTC");
refreshData("LUNA");
refreshData("LUNC");
refreshData("MAGIC");
refreshData("MANA");
refreshData("MASK");
refreshData("MATIC");
refreshData("MAV");
refreshData("MDT");
refreshData("MINA");
refreshData("MKR");
refreshData("MTL");
refreshData("NEAR");
refreshData("NEO");
refreshData("NKN");
refreshData("NMR");
refreshData("OCEAN");
refreshData("OGN");
refreshData("OMG");
refreshData("OM");
refreshData("ONE");
refreshData("ONT");
refreshData("PENDLE");
refreshData("PEPE");
refreshData("PERP");
refreshData("PHB");
refreshData("QNT");
refreshData("QTUM");
refreshData("RAD");
refreshData("RATS");
refreshData("REEF");
refreshData("REN");
refreshData("RLC");
refreshData("RNDR");
refreshData("ROSE");
refreshData("RSR");
refreshData("RUNE");
refreshData("RVN");
refreshData("SAND");
refreshData("SATS");
refreshData("SEI");
refreshData("SFP");
refreshData("SHIB");
refreshData("SKL");
refreshData("SNX");
refreshData("SNT");
refreshData("SOL");
refreshData("SPELL");
refreshData("SSV");
refreshData("STORJ");
refreshData("STX");
refreshData("SUI");
refreshData("SUSHI");
refreshData("SXP");
refreshData("THETA");
refreshData("TLM");
refreshData("TRB");
refreshData("TRU");
refreshData("TRX");
refreshData("T");
refreshData("UMA");
refreshData("UNFI");
refreshData("UNI");
refreshData("USDC");
refreshData("VET");
refreshData("WAVES");
refreshData("WLD");
refreshData("WOO");
refreshData("XEC");
refreshData("XEM");
refreshData("XLM");
refreshData("XMR");
refreshData("XRP");
refreshData("XTZ");
refreshData("XVG");
refreshData("XVS");
refreshData("YFI");
refreshData("YGG");
refreshData("ZEC");
refreshData("ZIL");
refreshData("ZRX");