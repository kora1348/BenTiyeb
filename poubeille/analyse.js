let positiveCountItem1 = 0;
let negativeCountItem1 = 0;
let positiveCountItem2 = 0;
let negativeCountItem2 = 0;

async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=2`
        );
        const data = await response.json();
  
        let totalVariation = 0;
        const cryptoRow = document.getElementById(symbol);
  
        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
            const variationValue = weeklyVariation.toFixed(2);

            // Ajout des dates et heures de début et de fin
            const weekStartDate = new Date(data[i][0]);
            const weekEndDate = new Date(data[i][6]);
            const optionsStart = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric" };
            const optionsEnd = { hour: "numeric", minute: "numeric" };
  
            const variationCell = cryptoRow.insertCell(i + 1);
            variationCell.textContent = `${weekStartDate.toLocaleDateString(
                "fr-FR",
                optionsStart
            )} (${weekStartDate.toLocaleTimeString("fr-FR", optionsEnd)}) - ${weekEndDate.toLocaleDateString(
                "fr-FR",
                optionsStart
            )} (${weekEndDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;
  
            if (weeklyVariation > 0) {
                variationCell.classList.add("positive");
                if (i === 0) positiveCountItem1++;
                if (i === 1) positiveCountItem2++;
            } else if (weeklyVariation < 0) {
                variationCell.classList.add("negative");
                if (i === 0) negativeCountItem1++;
                if (i === 1) negativeCountItem2++;
            }
  
            totalVariation += weeklyVariation;
        }
  
        const totalCell = cryptoRow.insertCell(data.length + 1);
        totalCell.style.textAlign = 'center';
        const totalValue = totalVariation.toFixed(2);
        totalCell.textContent = `${totalValue}%`;
        totalCell.classList.add(totalVariation > 0 ? "positive" : "negative");
        
    } catch (error) {
        console.error(
            `Erreur lors de la récupération des données pour ${symbol}:`,
            error
        );
    }
}
  
// Appel de la fonction pour obtenir les taux de variation des cryptos
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

// Affichage des résultats finaux
function afficherResultats() {
    const differenceItem1 = positiveCountItem1 - negativeCountItem1;
    const differenceItem2 = positiveCountItem2 - negativeCountItem2;

    const itemResult1 = document.getElementById("itemResult1");
    itemResult1.innerHTML = `
        <div class="positive">Positifs: ${positiveCountItem1}</div>
        <div class="negative">Negatifs: ${negativeCountItem1}</div>
        <div class="${differenceItem1 >= 0 ? 'positive' : 'negative'}">Difference: ${differenceItem1}</div>
    `;

    const itemResult2 = document.getElementById("itemResult2");
    itemResult2.innerHTML = `
        <div class="positive">Positifs: ${positiveCountItem2}</div>
        <div class="negative">Negatifs: ${negativeCountItem2}</div>
        <div class="${differenceItem2 >= 0 ? 'positive' : 'negative'}">Difference: ${differenceItem2}</div>
    `;
}

// Appel de la fonction après avoir récupéré les données de toutes les cryptos
setTimeout(afficherResultats, 2000);


// Appel de la fonction pour obtenir les taux de variation des cryptos

   
    
  
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
  
  