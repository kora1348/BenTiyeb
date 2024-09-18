async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=1`
        );
        const data = await response.json();
  
        const takerBuyVolume = parseFloat(data[0][9]);   // Volume des acheteurs initiateurs
        const totalVolume = parseFloat(data[0][5]);      // Volume total de la période
        const takerSellVolume = totalVolume - takerBuyVolume; // Volume des vendeurs (on le déduit)
        const openTime = new Date(data[0][0]);  // Open Time
        const closeTime = new Date(data[0][6]); // Close Time
  
        const cryptoRow = document.getElementById(symbol);
  
        // Formatage des dates
        const optionsDate = { year: "2-digit", month: "2-digit", day: "2-digit" };
        const optionsTime = { hour: "numeric", minute: "numeric" };
        const openDateStr = `${openTime.toLocaleDateString("fr-FR", optionsDate)} ${openTime.toLocaleTimeString("fr-FR", optionsTime)}`;
        const closeDateStr = `${closeTime.toLocaleDateString("fr-FR", optionsDate)} ${closeTime.toLocaleTimeString("fr-FR", optionsTime)}`;
  
        // Insertion de la cellule pour afficher les dates
        const dateCell = cryptoRow.insertCell(1);
        dateCell.textContent = `${openDateStr} - ${closeDateStr}`;
  
        // Affichage du volume des acheteurs et vendeurs séparément
        const volumeCell = cryptoRow.insertCell(2);
        volumeCell.textContent = `Acheteurs: ${takerBuyVolume.toFixed(2)}, Vendeurs: ${takerSellVolume.toFixed(2)}`;

        // Ajouter une nouvelle colonne pour indiquer si le marché est dominé par les acheteurs ou les vendeurs
        const dominanceCell = cryptoRow.insertCell(3);
        if (takerBuyVolume > takerSellVolume) {
            dominanceCell.textContent = 'Plus d\'acheteurs';
            cryptoRow.classList.add('positive'); // Ajout de la classe CSS positive à la ligne entière
        } else {
            dominanceCell.textContent = 'Plus de vendeurs';
            cryptoRow.classList.add('negative'); // Ajout de la classe CSS negative à la ligne entière
        }

        // Calcul du pourcentage de différence entre les achats et les ventes
        const percentageDifference = ((takerBuyVolume - takerSellVolume) / totalVolume) * 100;

        // Insertion de la cellule pour afficher le pourcentage
        const percentageCell = cryptoRow.insertCell(4);
        percentageCell.textContent = `${percentageDifference.toFixed(2)}%`;

        // Affichage des valeurs de pourcentage spécifiques
        if ((percentageDifference >= 80 && percentageDifference <= 89) || (percentageDifference >= -89 && percentageDifference <= -80)) {
            const cryptoNamesDiv = document.getElementById('cryptoNames');
            const cryptoInfo = document.createElement('div');
            cryptoInfo.classList.add(percentageDifference > 0 ? 'positive' : 'negative');
            cryptoInfo.textContent = `${symbol}: ${percentageDifference > 0 ? 'LONG' : 'SHORT'}, ${percentageDifference.toFixed(2)}%`;
            cryptoNamesDiv.appendChild(cryptoInfo);
        }

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    }
}




// Appel de la fonction pour obtenir les données des cryptos
fetchCryptoData("1INCH");



    fetchCryptoData("AAVE");
    fetchCryptoData("ACE");
    fetchCryptoData("ACH");
    fetchCryptoData("ADA");
    fetchCryptoData("AEVO");
    fetchCryptoData("AGLD");
    fetchCryptoData("AI");
    fetchCryptoData("ALGO");
    fetchCryptoData("ALICE");
    fetchCryptoData("ALPACA");
    fetchCryptoData("ALPHA");
    fetchCryptoData("ALT");
    fetchCryptoData("AMB");
    fetchCryptoData("ANKR");
    fetchCryptoData("APE");
    fetchCryptoData("API3");
    fetchCryptoData("APT");
    fetchCryptoData("ARB");
    fetchCryptoData("ARKM");
    fetchCryptoData("ARK");
    fetchCryptoData("ARPA");
    fetchCryptoData("AR");
    fetchCryptoData("ASTR");
    fetchCryptoData("ATA");
    fetchCryptoData("ATOM");
    fetchCryptoData("AUCTION");
    fetchCryptoData("AVAX");
    fetchCryptoData("AXL");
    fetchCryptoData("AXS");
    fetchCryptoData("BADGER");
    fetchCryptoData("BAKE");
    fetchCryptoData("BAL");
    fetchCryptoData("BANANA");
    fetchCryptoData("BAND");
    fetchCryptoData("BAT");
    fetchCryptoData("BB");
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
    fetchCryptoData("CKB");
    fetchCryptoData("COMBO");
    fetchCryptoData("COMP");
    fetchCryptoData("COTI");
    fetchCryptoData("CRV");
    fetchCryptoData("CTSI");
    fetchCryptoData("CYBER");
    fetchCryptoData("DAR");
    fetchCryptoData("DASH");
    fetchCryptoData("DENT");
    fetchCryptoData("DOGE");
    fetchCryptoData("DOGS");
    fetchCryptoData("DOT");
    fetchCryptoData("DUSK");
    fetchCryptoData("DYDX");
    fetchCryptoData("DYM");
    fetchCryptoData("EDU");
    fetchCryptoData("EGLD");
    fetchCryptoData("ENA");
    fetchCryptoData("ENJ");
    fetchCryptoData("ENS");
    fetchCryptoData("EOS");
    fetchCryptoData("ETC");
    fetchCryptoData("ETHFI");
    fetchCryptoData("ETH");
    fetchCryptoData("FET");
    fetchCryptoData("FIL");
    fetchCryptoData("FLM");
    fetchCryptoData("FLOKI");
    fetchCryptoData("FLOW");
    fetchCryptoData("FTM");
    fetchCryptoData("FXS");
    fetchCryptoData("GALA");
    fetchCryptoData("GAS");
    fetchCryptoData("GLM");
    fetchCryptoData("GMT");
    fetchCryptoData("GMX");
    fetchCryptoData("GRT");
    fetchCryptoData("GTC");
    fetchCryptoData("G");
    fetchCryptoData("HBAR");
    fetchCryptoData("HFT");
    fetchCryptoData("HIFI");
    fetchCryptoData("HIGH");
    fetchCryptoData("HOOK");
    fetchCryptoData("HOT");
    fetchCryptoData("ICP");
    fetchCryptoData("ICX");
    fetchCryptoData("ID");
    fetchCryptoData("ILV");
    fetchCryptoData("IMX");
    fetchCryptoData("INJ");
    fetchCryptoData("IOST");
    fetchCryptoData("IOTA");
    fetchCryptoData("IOTX");
    fetchCryptoData("IO");
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
    fetchCryptoData("LISTA");
    fetchCryptoData("LIT");
    fetchCryptoData("LOOM");
    fetchCryptoData("LPT");
    fetchCryptoData("LQTY");
    fetchCryptoData("LRC");
    fetchCryptoData("LSK");
    fetchCryptoData("LTC");
    fetchCryptoData("LUNC");
    fetchCryptoData("MAGIC");
    fetchCryptoData("MANA");
    fetchCryptoData("MANTA");
    fetchCryptoData("MASK");
    fetchCryptoData("MATIC");
    fetchCryptoData("MAV");
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
    fetchCryptoData("NOT");
    fetchCryptoData("NTRN");
    fetchCryptoData("OGN");
    fetchCryptoData("OMG");
    fetchCryptoData("OMNI");
    fetchCryptoData("OM");
    fetchCryptoData("ONE");
    fetchCryptoData("ONG");
    fetchCryptoData("ONT");
    fetchCryptoData("OP");
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
    fetchCryptoData("RARE");
    fetchCryptoData("RATS");
    fetchCryptoData("RDNT");
    fetchCryptoData("REEF");
    fetchCryptoData("RENDER");
    fetchCryptoData("REN");
    fetchCryptoData("REZ");
    fetchCryptoData("RIF");
    fetchCryptoData("RLC");
    fetchCryptoData("RONIN");
    fetchCryptoData("ROSE");
    fetchCryptoData("RSR");
    fetchCryptoData("RUNE");
    fetchCryptoData("RVN");
    fetchCryptoData("SAGA");
    fetchCryptoData("SAND");
    fetchCryptoData("SATS");
    fetchCryptoData("SEI");
    fetchCryptoData("SFP");
    fetchCryptoData("SHIB");
    fetchCryptoData("SKL");
    fetchCryptoData("SNX");
    fetchCryptoData("SOL");
    fetchCryptoData("SPELL");
    fetchCryptoData("SSV");
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
    fetchCryptoData("SXP");
    fetchCryptoData("SYN");
    fetchCryptoData("SYS");
    fetchCryptoData("TAO");
    fetchCryptoData("THETA");
    fetchCryptoData("TIA");
    fetchCryptoData("TLM");
    fetchCryptoData("TNSR");
    fetchCryptoData("TON");
    fetchCryptoData("TRB");
    fetchCryptoData("TRU");
    fetchCryptoData("TRX");
    fetchCryptoData("TWT");
    fetchCryptoData("UMA");
    fetchCryptoData("UNFI");
    fetchCryptoData("UNI");
    fetchCryptoData("USTC");
    fetchCryptoData("VANRY");
    fetchCryptoData("VET");
    fetchCryptoData("VIDT");
    fetchCryptoData("VOXEL");
    fetchCryptoData("WAXP");
    fetchCryptoData("WIF");
    fetchCryptoData("WLD");
    fetchCryptoData("WOO");
    fetchCryptoData("W");
    fetchCryptoData("XAI");
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
    fetchCryptoData("ZIL");
    fetchCryptoData("ZK");
    fetchCryptoData("ZRO");
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
 