async function fetchCryptoData(symbol, startDateFilter, endDateFilter) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=3`
        );
        const data = await response.json();

        let totalVariation = 0;

        const cryptoRow = document.getElementById(symbol);

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
            const cellIndex = i + 1;

            const variationCell = cryptoRow.insertCell(cellIndex);
            const variationValue = weeklyVariation.toFixed(2);

            const weekStartDate = new Date(data[i][0]);
            const weekEndDate = new Date(data[i][6]);

            // Vérifier si les données correspondent à la plage de dates spécifiée
            if (
                weekStartDate >= startDateFilter &&
                weekEndDate <= endDateFilter
            ) {
                const optionsStart = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric" };
                const optionsEnd = { hour: "numeric", minute: "numeric" };

                variationCell.textContent = `${weekStartDate.toLocaleDateString(
                    "fr-FR",
                    optionsStart
                )} (${weekStartDate.toLocaleTimeString("fr-FR", optionsEnd)}) - ${weekEndDate.toLocaleDateString(
                    "fr-FR",
                    optionsStart
                )} (${weekEndDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;

                if (weeklyVariation > 0) {
                    variationCell.classList.add("positive");
                } else if (weeklyVariation < 0) {
                    variationCell.classList.add("negative");
                }

                totalVariation += weeklyVariation;
            } else {
                variationCell.textContent = "Non inclus dans la plage.";
                variationCell.style.color = "gray";
            }
        }

        const totalCell = cryptoRow.insertCell(data.length + 1);
        const totalValue = totalVariation.toFixed(2);
        totalCell.style.textAlign = 'center';

        const cryptoNamesElement = document.getElementById('cryptoNames');

        if (totalVariation >= -79.99 && totalVariation <= -70.00) {
            totalCell.classList.add("positive");
            cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
        }

        if (totalVariation < 0) {
            totalCell.classList.add("negative");
        }

        totalCell.textContent = `${totalValue}%`;

    } catch (error) {
        console.error(
            `Erreur lors de la récupération des données pour ${symbol}:`,
            error
        );
    }
}

// Exemple d'utilisation avec un filtre de date et heure
const startDate = new Date("2024-12-01T20:00:00"); // Date de début
const endDate = new Date("2024-12-01T20:30:00"); // Date de fin
fetchCryptoData("1INCH", startDate, endDate);
fetchCryptoData("MOG", startDate, endDate);
fetchCryptoData("BONK", startDate, endDate);
fetchCryptoData("CAT", startDate, endDate);
fetchCryptoData("CHEEMS", startDate, endDate);
fetchCryptoData("FLOKI", startDate, endDate);
fetchCryptoData("LUNC", startDate, endDate);
fetchCryptoData("PEPE", startDate, endDate);
fetchCryptoData("ACT", startDate, endDate);
fetchCryptoData("ACX", startDate, endDate);
fetchCryptoData("ADA", startDate, endDate);
fetchCryptoData("AERGO", startDate, endDate);
fetchCryptoData("AERO", startDate, endDate);
fetchCryptoData("AEVO", startDate, endDate);
fetchCryptoData("AGLD", startDate, endDate);
fetchCryptoData("AI", startDate, endDate);
fetchCryptoData("AKT", startDate, endDate);
fetchCryptoData("ALGO", startDate, endDate);
fetchCryptoData("ALICE", startDate, endDate);
fetchCryptoData("ALPACA", startDate, endDate);
fetchCryptoData("ALPHA", startDate, endDate);
fetchCryptoData("ALT", startDate, endDate);
fetchCryptoData("AMB", startDate, endDate);
fetchCryptoData("ANKR", startDate, endDate);
fetchCryptoData("APE", startDate, endDate);
fetchCryptoData("AXS", startDate, endDate);
fetchCryptoData("BADGER", startDate, endDate);
fetchCryptoData("BAKE", startDate, endDate);
fetchCryptoData("BAL", startDate, endDate);
fetchCryptoData("BANANA", startDate, endDate);
fetchCryptoData("BAND", startDate, endDate);
fetchCryptoData("BAN", startDate, endDate);
fetchCryptoData("BAT", startDate, endDate);
fetchCryptoData("BB", startDate, endDate);
fetchCryptoData("BCH", startDate, endDate);
fetchCryptoData("BEAMX", startDate, endDate);
fetchCryptoData("BEL", startDate, endDate);
fetchCryptoData("BICO", startDate, endDate);
fetchCryptoData("BIGTIME", startDate, endDate);
fetchCryptoData("BTC", startDate, endDate);
fetchCryptoData("C98", startDate, endDate);
fetchCryptoData("CAKE", startDate, endDate);
fetchCryptoData("CATI", startDate, endDate);
fetchCryptoData("CELO", startDate, endDate);
fetchCryptoData("CELR", startDate, endDate);
fetchCryptoData("CETUS", startDate, endDate);
fetchCryptoData("CFX", startDate, endDate);
fetchCryptoData("CHESS", startDate, endDate);
fetchCryptoData("CHILLGUY", startDate, endDate);
fetchCryptoData("CHR", startDate, endDate);
fetchCryptoData("CHZ", startDate, endDate);
fetchCryptoData("CKB", startDate, endDate);
fetchCryptoData("COMBO", startDate, endDate);
fetchCryptoData("DOGE", startDate, endDate);
fetchCryptoData("DOGS", startDate, endDate);
fetchCryptoData("DOT", startDate, endDate);
fetchCryptoData("DRIFT", startDate, endDate);
fetchCryptoData("DUSK", startDate, endDate);
fetchCryptoData("DYDX", startDate, endDate);
fetchCryptoData("DYM", startDate, endDate);
fetchCryptoData("EDU", startDate, endDate);
fetchCryptoData("EGLD", startDate, endDate);
fetchCryptoData("EIGEN", startDate, endDate);
fetchCryptoData("ENA", startDate, endDate);
fetchCryptoData("ENJ", startDate, endDate);
fetchCryptoData("ENS", startDate, endDate);
fetchCryptoData("FLOW", startDate, endDate);
fetchCryptoData("FLUX", startDate, endDate);
fetchCryptoData("FTM", startDate, endDate);
fetchCryptoData("FXS", startDate, endDate);
fetchCryptoData("GALA", startDate, endDate);
fetchCryptoData("GHST", startDate, endDate);
fetchCryptoData("GLM", startDate, endDate);
fetchCryptoData("GMT", startDate, endDate);
fetchCryptoData("GMX", startDate, endDate);
fetchCryptoData("GOAT", startDate, endDate);
fetchCryptoData("GRASS", startDate, endDate);
fetchCryptoData("GRT", startDate, endDate);
fetchCryptoData("GTC", startDate, endDate);
fetchCryptoData("IOST", startDate, endDate);
fetchCryptoData("IOTA", startDate, endDate);
fetchCryptoData("IOTX", startDate, endDate);
fetchCryptoData("IO", startDate, endDate);
fetchCryptoData("JASMY", startDate, endDate);
fetchCryptoData("JOE", startDate, endDate);
fetchCryptoData("JUP", startDate, endDate);
fetchCryptoData("KAIA", startDate, endDate);
fetchCryptoData("KAS", startDate, endDate);
fetchCryptoData("KAVA", startDate, endDate);
fetchCryptoData("KDA", startDate, endDate);
fetchCryptoData("KNC", startDate, endDate);
fetchCryptoData("KOMA", startDate, endDate);
fetchCryptoData("KSM", startDate, endDate);
fetchCryptoData("MAGIC", startDate, endDate);
fetchCryptoData("MANA", startDate, endDate);
fetchCryptoData("MANTA", startDate, endDate);
fetchCryptoData("MASK", startDate, endDate);
fetchCryptoData("MAVIA", startDate, endDate);
fetchCryptoData("MAV", startDate, endDate);
fetchCryptoData("MBOX", startDate, endDate);
fetchCryptoData("MEME", startDate, endDate);
fetchCryptoData("METIS", startDate, endDate);
fetchCryptoData("MEW", startDate, endDate);
fetchCryptoData("MINA", startDate, endDate);
fetchCryptoData("MKR", startDate, endDate);
fetchCryptoData("MOODENG", startDate, endDate);
fetchCryptoData("MORPHO", startDate, endDate);
fetchCryptoData("MOVE", startDate, endDate);
fetchCryptoData("NTRN", startDate, endDate);
fetchCryptoData("NULS", startDate, endDate);
fetchCryptoData("OGN", startDate, endDate);
fetchCryptoData("OMG", startDate, endDate);
fetchCryptoData("OMNI", startDate, endDate);
fetchCryptoData("OM", startDate, endDate);
fetchCryptoData("ONDO", startDate, endDate);
fetchCryptoData("ONE", startDate, endDate);
fetchCryptoData("ONG", startDate, endDate);
fetchCryptoData("ONT", startDate, endDate);
fetchCryptoData("OP", startDate, endDate);
fetchCryptoData("ORCA", startDate, endDate);
fetchCryptoData("ORDI", startDate, endDate);
fetchCryptoData("OXT", startDate, endDate);
fetchCryptoData("PENDLE", startDate, endDate);
fetchCryptoData("PEOPLE", startDate, endDate);
fetchCryptoData("RAYSOL", startDate, endDate);
fetchCryptoData("RDNT", startDate, endDate);
fetchCryptoData("REEF", startDate, endDate);
fetchCryptoData("REI", startDate, endDate);
fetchCryptoData("RENDER", startDate, endDate);
fetchCryptoData("REZ", startDate, endDate);
fetchCryptoData("RIF", startDate, endDate);
fetchCryptoData("RLC", startDate, endDate);
fetchCryptoData("RONIN", startDate, endDate);
fetchCryptoData("ROSE", startDate, endDate);
fetchCryptoData("RPL", startDate, endDate);
fetchCryptoData("RSR", startDate, endDate);
fetchCryptoData("RUNE", startDate, endDate);
fetchCryptoData("RVN", startDate, endDate);
fetchCryptoData("SAFE", startDate, endDate);
fetchCryptoData("STEEM", startDate, endDate);
fetchCryptoData("STG", startDate, endDate);
fetchCryptoData("STMX", startDate, endDate);
fetchCryptoData("STORJ", startDate, endDate);
fetchCryptoData("STRK", startDate, endDate);
fetchCryptoData("STX", startDate, endDate);
fetchCryptoData("SUI", startDate, endDate);
fetchCryptoData("SUN", startDate, endDate);
fetchCryptoData("SUPER", startDate, endDate);
fetchCryptoData("SUSHI", startDate, endDate);
fetchCryptoData("SWELL", startDate, endDate);
fetchCryptoData("SXP", startDate, endDate);
fetchCryptoData("SYN", startDate, endDate);
fetchCryptoData("SYS", startDate, endDate);
fetchCryptoData("TURBO", startDate, endDate);
fetchCryptoData("T", startDate, endDate);
fetchCryptoData("TWT", startDate, endDate);
fetchCryptoData("UMA", startDate, endDate);
fetchCryptoData("UNI", startDate, endDate);
fetchCryptoData("", startDate, endDate);
fetchCryptoData("USTC", startDate, endDate);
fetchCryptoData("UXLINK", startDate, endDate);
fetchCryptoData("VET", startDate, endDate);
fetchCryptoData("VIDT", startDate, endDate);
fetchCryptoData("VIRTUAL", startDate, endDate);
fetchCryptoData("VOXEL", startDate, endDate);
fetchCryptoData("WAXP", startDate, endDate);
fetchCryptoData("WIF", startDate, endDate);
fetchCryptoData("WLD", startDate, endDate);
fetchCryptoData("ZEC", startDate, endDate);
fetchCryptoData("ZEN", startDate, endDate);
fetchCryptoData("ZETA", startDate, endDate);
fetchCryptoData("ZIL", startDate, endDate);
fetchCryptoData("ZK", startDate, endDate);
fetchCryptoData("ZRO", startDate, endDate);
fetchCryptoData("ZRX", startDate, endDate);

   
    
    
  
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