async function fetchCryptoData(symbol) {
	const cryptoRow = document.getElementById(symbol);
	let totalVariation = 0;
	const now = new Date();
  
	// Heure actuelle (ex : 17h)
	const currentHour = now.getHours();
  
	for (let i = 0; i < 2; i++) {
	  const targetDate = new Date(now);
	  targetDate.setDate(now.getDate() - i);
	  targetDate.setMinutes(0, 0, 0);
	  targetDate.setHours(currentHour);
	  const startTime = targetDate.getTime();
	  const endTime = startTime + 60 * 60 * 1000; // +1h
  
	  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&startTime=${startTime}&endTime=${endTime}`;
  
	  try {
		const response = await fetch(url);
		const data = await response.json();
  
		const variationCell = cryptoRow.insertCell(1); // insérer à gauche
  
		if (data.length === 0) {
		  variationCell.textContent = "Pas de données";
		  continue;
		}
  
		const openPrice = parseFloat(data[0][1]);
		const closePrice = parseFloat(data[0][4]);
		const variation = ((closePrice - openPrice) / openPrice) * 100;
		const variationValue = variation.toFixed(2);
  
		// Formatage des dates
		const startDate = new Date(data[0][0]);
		const endDate = new Date(data[0][6]);
		const optionsStart = {
		  year: "2-digit",
		  month: "2-digit",
		  day: "2-digit",
		  hour: "numeric",
		  minute: "numeric",
		};
		const optionsEnd = {
		  hour: "numeric",
		  minute: "numeric",
		};
  
		variationCell.textContent = `${startDate.toLocaleDateString(
		  "fr-FR",
		  optionsStart
		)} (${startDate.toLocaleTimeString(
		  "fr-FR",
		  optionsEnd
		)}) - ${endDate.toLocaleDateString(
		  "fr-FR",
		  optionsStart
		)} (${endDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;
  
		// Ajout couleur
		if (variation > 0) {
		  variationCell.classList.add("positive");
		} else if (variation < 0) {
		  variationCell.classList.add("negative");
		}
  
		totalVariation += variation;
	  } catch (error) {
		console.error(`Erreur pour ${symbol} à la date ${new Date(startTime)}:`, error);
	  }
	}
  
	// Total en dernière cellule
	const totalCell = cryptoRow.insertCell(11);
	const totalValue = totalVariation.toFixed(2);
	totalCell.textContent = `${totalValue}%`;
	totalCell.style.textAlign = "center";
	totalCell.classList.add(totalVariation >= 0 ? "positive" : "negative");
  
	const cryptoNamesElement = document.getElementById("cryptoNames");
	if (totalVariation >= -79.99 && totalVariation <= -70.0) {
	  cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
	}
  }
  
  
  fetchCryptoData("1INCH");
  fetchCryptoData("MOG");
  fetchCryptoData("BONK");
  fetchCryptoData("CAT");
  fetchCryptoData("CHEEMS");
  fetchCryptoData("FLOKI");
  fetchCryptoData("LUNC");
  fetchCryptoData("PEPE");
  fetchCryptoData("ACT");
  fetchCryptoData("ACX");
  fetchCryptoData("ADA");
  fetchCryptoData("AERGO");
  fetchCryptoData("AERO");
  fetchCryptoData("AEVO");
  fetchCryptoData("AGLD");
  fetchCryptoData("AI");
  fetchCryptoData("AKT");
  fetchCryptoData("ALGO");
  fetchCryptoData("ALICE");
  fetchCryptoData("ALPACA");
  fetchCryptoData("ALPHA");
  fetchCryptoData("ALT");
  fetchCryptoData("AMB");
  fetchCryptoData("ANKR");
  fetchCryptoData("APE");
  fetchCryptoData("AXS");
  fetchCryptoData("BADGER");
  fetchCryptoData("BAKE");
  fetchCryptoData("BAL");
  fetchCryptoData("BANANA");
  fetchCryptoData("BAND");
  fetchCryptoData("BAN");
  fetchCryptoData("BAT");
  fetchCryptoData("BB");
  fetchCryptoData("BCH");
  fetchCryptoData("BEAMX");
  fetchCryptoData("BEL");
  fetchCryptoData("BICO");
  fetchCryptoData("BIGTIME");
  fetchCryptoData("BTC");
  fetchCryptoData("C98");
  fetchCryptoData("CAKE");
  fetchCryptoData("CATI");
  fetchCryptoData("CELO");
  fetchCryptoData("CELR");
  fetchCryptoData("CETUS");
  fetchCryptoData("CFX");
  fetchCryptoData("CHESS");
  fetchCryptoData("CHILLGUY");
  fetchCryptoData("CHR");
  fetchCryptoData("CHZ");
  fetchCryptoData("CKB");
  fetchCryptoData("COMBO");
  fetchCryptoData("DOGE");
  fetchCryptoData("DOGS");
  fetchCryptoData("DOT");
  fetchCryptoData("DRIFT");
  fetchCryptoData("DUSK");
  fetchCryptoData("DYDX");
  fetchCryptoData("DYM");
  fetchCryptoData("EDU");
  fetchCryptoData("EGLD");
  fetchCryptoData("EIGEN");
  fetchCryptoData("ENA");
  fetchCryptoData("ENJ");
  fetchCryptoData("ENS");
  fetchCryptoData("ETHFI");
  fetchCryptoData("ETH");
  fetchCryptoData("FLOW");
  fetchCryptoData("FLUX");
  fetchCryptoData("FTM");
  fetchCryptoData("FXS");
  fetchCryptoData("GALA");
  fetchCryptoData("GHST");
  fetchCryptoData("GLM");
  fetchCryptoData("GMT");
  fetchCryptoData("GMX");
  fetchCryptoData("GOAT");
  fetchCryptoData("GRASS");
  fetchCryptoData("GRT");
  fetchCryptoData("GTC");
  fetchCryptoData("IOST");
  fetchCryptoData("IOTA");
  fetchCryptoData("IOTX");
  fetchCryptoData("IO");
  fetchCryptoData("JASMY");
  fetchCryptoData("JOE");
  fetchCryptoData("JUP");
  fetchCryptoData("KAIA");
  fetchCryptoData("KAS");
  fetchCryptoData("KAVA");
  fetchCryptoData("KDA");
  fetchCryptoData("KNC");
  fetchCryptoData("KOMA");
  fetchCryptoData("KSM");
  fetchCryptoData("MAGIC");
  fetchCryptoData("MANA");
  fetchCryptoData("MANTA");
  fetchCryptoData("MASK");
  fetchCryptoData("MAVIA");
  fetchCryptoData("MAV");
  fetchCryptoData("MBOX");
  fetchCryptoData("MEME");
  fetchCryptoData("METIS");
  fetchCryptoData("MEW");
  fetchCryptoData("MINA");
  fetchCryptoData("MKR");
  fetchCryptoData("MOODENG");
  fetchCryptoData("MORPHO");
  fetchCryptoData("MOVE");
  fetchCryptoData("NTRN");
  fetchCryptoData("NULS");
  fetchCryptoData("OGN");
  fetchCryptoData("OMG");
  fetchCryptoData("OMNI");
  fetchCryptoData("OM");
  fetchCryptoData("ONDO");
  fetchCryptoData("ONE");
  fetchCryptoData("ONG");
  fetchCryptoData("ONT");
  fetchCryptoData("OP");
  fetchCryptoData("ORCA");
  fetchCryptoData("ORDI");
  fetchCryptoData("OXT");
  fetchCryptoData("PENDLE");
  fetchCryptoData("PEOPLE");
  fetchCryptoData("RAYSOL");
  fetchCryptoData("RDNT");
  fetchCryptoData("REEF");
  fetchCryptoData("REI");
  fetchCryptoData("RENDER");
  fetchCryptoData("REZ");
  fetchCryptoData("RIF");
  fetchCryptoData("RLC");
  fetchCryptoData("RONIN");
  fetchCryptoData("ROSE");
  fetchCryptoData("RPL");
  fetchCryptoData("RSR");
  fetchCryptoData("RUNE");
  fetchCryptoData("RVN");
  fetchCryptoData("SAFE");
  fetchCryptoData("STEEM");
  fetchCryptoData("STG");
  fetchCryptoData("STMX");
  fetchCryptoData("STORJ");
  fetchCryptoData("STRK");
  fetchCryptoData("STX");
  fetchCryptoData("SUI");
  fetchCryptoData("SUN");
  fetchCryptoData("SUPER");
  fetchCryptoData("SUSHI");
  fetchCryptoData("SWELL");
  fetchCryptoData("SXP");
  fetchCryptoData("SYN");
  fetchCryptoData("SYS");
  fetchCryptoData("TURBO");
  fetchCryptoData("T");
  fetchCryptoData("TWT");
  fetchCryptoData("UMA");
  fetchCryptoData("UNI");
  fetchCryptoData("");
  fetchCryptoData("USTC");
  fetchCryptoData("UXLINK");
  fetchCryptoData("VET");
  fetchCryptoData("VIDT");
  fetchCryptoData("VIRTUAL");
  fetchCryptoData("VOXEL");
  fetchCryptoData("WAXP");
  fetchCryptoData("WIF");
  fetchCryptoData("WLD");
  fetchCryptoData("ZEC");
  fetchCryptoData("ZEN");
  fetchCryptoData("ZETA");
  fetchCryptoData("ZIL");
  fetchCryptoData("ZK");
  fetchCryptoData("ZRO");
  fetchCryptoData("ZRX");
  
  function mettreAJourHeure() {
    var elementHeure = document.getElementById("heure");
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
    heuresMaintenant =
      heuresMaintenant < 10 ? "0" + heuresMaintenant : heuresMaintenant;
    minutesMaintenant =
      minutesMaintenant < 10 ? "0" + minutesMaintenant : minutesMaintenant;
    secondesMaintenant =
      secondesMaintenant < 10 ? "0" + secondesMaintenant : secondesMaintenant;
  
    heuresActuelle = heuresActuelle < 10 ? "0" + heuresActuelle : heuresActuelle;
    minutesActuelle =
      minutesActuelle < 10 ? "0" + minutesActuelle : minutesActuelle;
    secondesActuelle =
      secondesActuelle < 10 ? "0" + secondesActuelle : secondesActuelle;
  
    // Mettre à jour le contenu de l'élément avec les deux heures
    elementHeure.innerHTML =
      heuresActuelle + ":" + minutesActuelle + ":" + secondesActuelle;
  }
  
  // Appeler la fonction pour mettre à jour l'heure
  mettreAJourHeure();
  