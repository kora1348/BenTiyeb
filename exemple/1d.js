let totalVariations = 0; // Variable globale pour stocker la somme des variations
let cryptoCount = 0; // Variable pour compter le nombre de cryptos traitées (jusqu'à 149)

async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=1`
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

    // Calcul de la moyenne sur 149 cryptos et conversion au format pourcentage
    const averageVariations = (totalVariations / Math.min(cryptoCount, 149)) * 100;
    averageVariationsElement.textContent = `Moyenne des variations : ${averageVariations.toFixed(2)}%`;
}


    
    // Appel de la fonction pour obtenir les taux de variation des cryptos
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