async function fetchCryptoData(symbol) {
    try {
      // Récupérer les données des 3 derniers jours
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=2`
      );
      const data = await response.json();
  
      // Vérifier s'il y a suffisamment de données
      if (data.length < 2) {
        console.error("Pas assez de données pour calculer les variations.");
        return;
      }
  
      // Extraire les données d'il y a 2 jours
      const twoDaysAgoData = data[data.length - 2];
      const openPrice = parseFloat(twoDaysAgoData[1]);
      const highPrice = parseFloat(twoDaysAgoData[2]); // Prix le plus haut
      const lowPrice = parseFloat(twoDaysAgoData[3]); // Prix le plus bas
      const highVariation = ((highPrice - openPrice) / openPrice) * 100;
      const lowVariation = ((lowPrice - openPrice) / openPrice) * 100;
  
      // Calcul de la différence totale
      const totalVariation = highVariation - Math.abs(lowVariation);
  
      // Formatage des dates
      const startDate = new Date(twoDaysAgoData[0]); // Date de début
      const endDate = new Date(twoDaysAgoData[6]); // Date de fin
  
      const optionsStart = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      const optionsEnd = { hour: "2-digit", minute: "2-digit" };
  
      const formattedStartDate =
        startDate.toLocaleDateString("fr-FR", optionsStart) +
        ` (${startDate.toLocaleTimeString("fr-FR", optionsEnd)})`;
      const formattedEndDate =
        endDate.toLocaleDateString("fr-FR", optionsStart) +
        ` (${endDate.toLocaleTimeString("fr-FR", optionsEnd)})`;
  
      // Mise à jour du tableau
      const cryptoRow = document.getElementById(symbol);
  
      // Colonne Item 1 (date et heure)
      const item1Cell = cryptoRow.insertCell();
      item1Cell.textContent = `${formattedStartDate} - ${formattedEndDate}`;
  
      // Colonne Prix le plus haut
      const highPriceCell = cryptoRow.insertCell();
      highPriceCell.textContent = `${highVariation.toFixed(2)}%`;
      highPriceCell.classList.add(highVariation > 0 ? "positive" : "negative");
  
      // Colonne Prix le plus bas
      const lowPriceCell = cryptoRow.insertCell();
      lowPriceCell.textContent = `${lowVariation.toFixed(2)}%`;
      lowPriceCell.classList.add(lowVariation > 0 ? "positive" : "negative");
  
      // Colonne Total (différence)
      const totalCell = cryptoRow.insertCell();
      totalCell.textContent = `${totalVariation.toFixed(2)}%`;
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
  