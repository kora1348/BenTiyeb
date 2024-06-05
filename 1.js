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

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const monthlyVariation = ((closePrice - openPrice) / openPrice) * 100;
            const variationCell = document.createElement('td');
            const variationValue = monthlyVariation.toFixed(2);
            const monthStartDate = new Date(data[i][0]);

            variationCell.textContent = `${monthStartDate.toLocaleDateString("fr-FR")}: ${variationValue}%`;

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

        // Mise à jour du status
        const cryptoNamesElement = document.getElementById('cryptoNames');
        if (totalVariation <= -0.01) {
            cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
        }

        // Trouver les deux plus grandes variations
        variations.sort((a, b) => b.variation - a.variation);
        const top1 = variations[0];
        const top2 = variations[1];

        // Calculer le nombre d'intervalles (bougies) entre les deux dates
        const interval1 = data.findIndex(d => new Date(d[0]).getTime() === top1.date.getTime());
        const interval2 = data.findIndex(d => new Date(d[0]).getTime() === top2.date.getTime());
        const nombreIntervalles = Math.abs(interval1 - interval2) - 1;

        // Ajout des informations spécifiques pour ETH
        if (symbol === 'ETH') {
            const cryptoList = document.getElementById('cryptoList');
            const cryptoInfo = `ETH : ${top1.variation.toFixed(2)}% (${top1.date.toLocaleDateString("fr-FR")}) - ${top2.variation.toFixed(2)}% (${top2.date.toLocaleDateString("fr-FR")}) = ${nombreIntervalles}`;

            cryptoList.textContent = cryptoInfo;
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

