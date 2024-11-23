async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=4`
        );
        const data = await response.json();

        const cryptoRow = document.getElementById(symbol);

        // Variables pour suivre les variations et calculer le total
        let variations = [];
        let totalVariation = 0;

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const variation = ((closePrice - openPrice) / openPrice) * 100;

            variations.push(variation); // Stocke les variations dans un tableau
            totalVariation += variation; // Additionne les variations pour le total

            // Ajout dans la table pour chaque intervalle
            const variationCell = cryptoRow.insertCell(i + 1);
            variationCell.textContent = `${variation.toFixed(2)}%`;
            variationCell.classList.add(variation > 0 ? "positive" : "negative");
        }

        // Ajoute le total des variations dans la dernière cellule
        const totalCell = cryptoRow.insertCell(data.length + 1);
        totalCell.textContent = `${totalVariation.toFixed(2)}%`;
        totalCell.style.textAlign = "center";
        totalCell.classList.add(totalVariation > 0 ? "positive" : "negative");

        // Vérifie les conditions pour afficher dans #cryptoNames
        const cryptoNamesElement = document.getElementById("cryptoNames");
        if (
            variations[0] < 0 && // Premier intervalle négatif
            variations[1] > 0 && // Deuxième intervalle positif
            variations[2] > 0 && // Troisième intervalle positif
            variations[3] > 0    // Quatrième intervalle positif
        ) {
            cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG (Total: ${totalVariation.toFixed(2)}%)</p>`;
        }

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    }
}


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