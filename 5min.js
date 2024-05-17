async function fetchCryptoData(symbol) {
    try {
        // Obtenir la date actuelle
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const month = currentDate.getMonth(); // Les mois en JavaScript sont de 0 à 11
        const day = currentDate.getDate();

        // Dates dynamiques pour les années 2022, 2023 et 2024
        const date2022 = new Date(currentYear - 2, month, day, 23, 55).getTime();
        const date2023 = new Date(currentYear - 1, month, day, 23, 55).getTime();
        const date2024 = new Date(currentYear, month, day, 23, 55).getTime();

        // Requête pour le 17 mai 2024 (ou la date actuelle)
        const response2024 = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&startTime=${date2024}&endTime=${date2024 + 300000}&limit=1`
        );
        const data2024 = await response2024.json();

        // Requête pour le 17 mai 2023 (ou la même date un an avant)
        const response2023 = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&startTime=${date2023}&endTime=${date2023 + 300000}&limit=1`
        );
        const data2023 = await response2023.json();

        // Requête pour le 17 mai 2022 (ou la même date deux ans avant)
        const response2022 = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&startTime=${date2022}&endTime=${date2022 + 300000}&limit=1`
        );
        const data2022 = await response2022.json();

        if (data2024.length === 0 || data2023.length === 0 || data2022.length === 0) {
            throw new Error('Données non disponibles pour les dates spécifiées.');
        }

        const openPrice2024 = parseFloat(data2024[0][1]);
        const closePrice2024 = parseFloat(data2024[0][4]);
        const dailyVariation2024 = ((closePrice2024 - openPrice2024) / openPrice2024) * 100;

        const openPrice2023 = parseFloat(data2023[0][1]);
        const closePrice2023 = parseFloat(data2023[0][4]);
        const dailyVariation2023 = ((closePrice2023 - openPrice2023) / openPrice2023) * 100;

        const openPrice2022 = parseFloat(data2022[0][1]);
        const closePrice2022 = parseFloat(data2022[0][4]);
        const dailyVariation2022 = ((closePrice2022 - openPrice2022) / openPrice2022) * 100;

        // Mise à jour du tableau avec les données et la couleur
        const cryptoRow = document.getElementById(symbol);
        const cell2022 = cryptoRow.insertCell(1);
        const cell2023 = cryptoRow.insertCell(2);
        const cell2024 = cryptoRow.insertCell(3);

        const bougieStartHour2022 = new Date(date2022).toLocaleTimeString("fr-FR", optionsEnd);
        const bougieEndHour2022 = new Date(date2022 + 300000).toLocaleTimeString("fr-FR", optionsEnd);
        cell2022.textContent = `${new Date(date2022).toLocaleDateString("fr-FR", optionsStart)} ${bougieStartHour2022} - ${bougieEndHour2022}: ${dailyVariation2022.toFixed(2)}%`;

        const bougieStartHour2023 = new Date(date2023).toLocaleTimeString("fr-FR", optionsEnd);
        const bougieEndHour2023 = new Date(date2023 + 300000).toLocaleTimeString("fr-FR", optionsEnd);
        cell2023.textContent = `${new Date(date2023).toLocaleDateString("fr-FR", optionsStart)} ${bougieStartHour2023} - ${bougieEndHour2023}: ${dailyVariation2023.toFixed(2)}%`;

        const bougieStartHour2024 = new Date(date2024).toLocaleTimeString("fr-FR", optionsEnd);
        const bougieEndHour2024 = new Date(date2024 + 300000).toLocaleTimeString("fr-FR", optionsEnd);
        cell2024.textContent = `${new Date(date2024).toLocaleDateString("fr-FR", optionsStart)} ${bougieStartHour2024} - ${bougieEndHour2024}: ${dailyVariation2024.toFixed(2)}%`;

        // Ajout des classes CSS en fonction des variations
        if (dailyVariation2022 > 0) {
            cell2022.classList.add("positive");
        } else {
            cell2022.classList.add("negative");
        }

        if (dailyVariation2023 > 0) {
            cell2023.classList.add("positive");
        } else {
            cell2023.classList.add("negative");
        }

        if (dailyVariation2024 > 0) {
            cell2024.classList.add("positive");
        } else {
            cell2024.classList.add("negative");
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
fetchCryptoData("ACE");
fetchCryptoData("ACH");
fetchCryptoData("ADA");
fetchCryptoData("AEVO");
fetchCryptoData("AGIX");
fetchCryptoData("AGLD");
fetchCryptoData("ALGO");
fetchCryptoData("ALICE");
fetchCryptoData("ALPHA");
fetchCryptoData("ALT");
fetchCryptoData("AMB");
fetchCryptoData("ANKR");
fetchCryptoData("ANT");
fetchCryptoData("APE");
fetchCryptoData("API3");
fetchCryptoData("APT");
fetchCryptoData("AR");
fetchCryptoData("ARB");
fetchCryptoData("ARK");
fetchCryptoData("ARKM");
fetchCryptoData("ARPA");
fetchCryptoData("ASTR");
fetchCryptoData("ATA");
fetchCryptoData("ATOM");
fetchCryptoData("AUCTION");
fetchCryptoData("AUDIO");
fetchCryptoData("AVAX");
fetchCryptoData("AXL");
fetchCryptoData("AXS");
fetchCryptoData("BADGER");
fetchCryptoData("BAKE");
fetchCryptoData("BAL");
fetchCryptoData("BAND");
fetchCryptoData("BAT");
fetchCryptoData("BCH");
fetchCryptoData("BEAMX");
fetchCryptoData("BEL");
fetchCryptoData("BICO");
fetchCryptoData("BLUR");
fetchCryptoData("BLZ");
fetchCryptoData("BNB");
fetchCryptoData("BNT");
fetchCryptoData("BNX");
fetchCryptoData("BOME");
fetchCryptoData("BOND");
fetchCryptoData("BONK");
fetchCryptoData("BTC");
fetchCryptoData("C98");
fetchCryptoData("CAKE");
fetchCryptoData("CELO");
fetchCryptoData("CELR");
fetchCryptoData("CFX");
fetchCryptoData("CHR");
fetchCryptoData("CHZ");
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
fetchCryptoData("DYM");
fetchCryptoData("DYDX");
fetchCryptoData("EDU");
fetchCryptoData("EGLD");
fetchCryptoData("ENJ");
fetchCryptoData("ENS");
fetchCryptoData("EOS");
fetchCryptoData("ETC");
fetchCryptoData("ETH");
fetchCryptoData("ETHFI");
fetchCryptoData("FET");
fetchCryptoData("FIL");
fetchCryptoData("FLM");
fetchCryptoData("FLOKI");
fetchCryptoData("FLOW");
fetchCryptoData("FRONT");
fetchCryptoData("FTM");
fetchCryptoData("FXS");
fetchCryptoData("GALA");
fetchCryptoData("GAL");
fetchCryptoData("GAS");
fetchCryptoData("GLMR");
fetchCryptoData("GMT");
fetchCryptoData("GMX");
fetchCryptoData("GRT");
fetchCryptoData("GTC");
fetchCryptoData("HBAR");
fetchCryptoData("HFT");
fetchCryptoData("HIFI");
fetchCryptoData("HIGH");
fetchCryptoData("HOOK");
fetchCryptoData("HOT");
fetchCryptoData("ICP");
fetchCryptoData("ICX");
fetchCryptoData("IDEX");
fetchCryptoData("ID");
fetchCryptoData("ILV");
fetchCryptoData("IMX");
fetchCryptoData("INJ");
fetchCryptoData("IOST");
fetchCryptoData("IOTA");
fetchCryptoData("IOTX");
fetchCryptoData("JASMY");
fetchCryptoData("JOE");
fetchCryptoData("JTO");
fetchCryptoData("JUP");
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
fetchCryptoData("LOOM");
fetchCryptoData("LPT");
fetchCryptoData("LQTY");
fetchCryptoData("LRC");
fetchCryptoData("LSK");
fetchCryptoData("LTC");
fetchCryptoData("LUNC");
fetchCryptoData("MAGIC");
fetchCryptoData("MANTA");
fetchCryptoData("MANA");
fetchCryptoData("MASK");
fetchCryptoData("MATIC");
fetchCryptoData("MAV");
fetchCryptoData("MBL");
fetchCryptoData("MDT");
fetchCryptoData("MEME");
fetchCryptoData("METIS");
fetchCryptoData("MINA");
fetchCryptoData("MKR");
fetchCryptoData("MOVR");
fetchCryptoData("MTL");
fetchCryptoData("NEAR");
fetchCryptoData("NEO");
fetchCryptoData("NFP");
fetchCryptoData("NKN");
fetchCryptoData("NMR");
fetchCryptoData("NTRN");
fetchCryptoData("OCEAN");
fetchCryptoData("OGN");
fetchCryptoData("OMG");
fetchCryptoData("ONE");
fetchCryptoData("ONDO")
fetchCryptoData("ONG");
fetchCryptoData("ONT");
fetchCryptoData("OP");
fetchCryptoData("ORBS");
fetchCryptoData("ORDI");
fetchCryptoData("OXT");
fetchCryptoData("PENDLE");
fetchCryptoData("PEOPLE");
fetchCryptoData("PEPE");
fetchCryptoData("PERP");
fetchCryptoData("PHB");
fetchCryptoData("PIXEL");
fetchCryptoData("POLYX");
fetchCryptoData("PORTAL");
fetchCryptoData("POWR");
fetchCryptoData("PYTH");
fetchCryptoData("QNT");
fetchCryptoData("QTUM");
fetchCryptoData("RAD");
fetchCryptoData("RDNT");
fetchCryptoData("REEF");
fetchCryptoData("REN");
fetchCryptoData("RLC");
fetchCryptoData("RNDR");
fetchCryptoData("RONIN");
fetchCryptoData("ROSE");
fetchCryptoData("RSR");
fetchCryptoData("RUNE");
fetchCryptoData("RVN");
fetchCryptoData("SAND");
fetchCryptoData("1000SATS");
fetchCryptoData("SEI");
fetchCryptoData("SFP");
fetchCryptoData("SHIB");
fetchCryptoData("SKL");
fetchCryptoData("SLP");
fetchCryptoData("SNT");
fetchCryptoData("SNX");
fetchCryptoData("SOL");
fetchCryptoData("SPELL");
fetchCryptoData("SSV");
fetchCryptoData("STEEM");
fetchCryptoData("STG");
fetchCryptoData("STMX");
fetchCryptoData("STORJ");
fetchCryptoData("STPT");
fetchCryptoData("STRAX");
fetchCryptoData("STRK");
fetchCryptoData("STX");
fetchCryptoData("SUI");
fetchCryptoData("SUPER");
fetchCryptoData("SUSHI");
fetchCryptoData("SXP");
fetchCryptoData("THETA");
fetchCryptoData("TIA");
fetchCryptoData("TLM");
fetchCryptoData("TRB");
fetchCryptoData("TRU");
fetchCryptoData("TRX");
fetchCryptoData("T");
fetchCryptoData("TWT");
fetchCryptoData("UMA");
fetchCryptoData("UNFI");
fetchCryptoData("UNI");
fetchCryptoData("USDC");
fetchCryptoData("USTC");
fetchCryptoData("USDT");
fetchCryptoData("VET");
fetchCryptoData("WAVES");
fetchCryptoData("WAXP");
fetchCryptoData("WIF");
fetchCryptoData("WLD");
fetchCryptoData("WOO");
fetchCryptoData("XEM");
fetchCryptoData("XLM");
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

