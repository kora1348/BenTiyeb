async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=60`
    );
    const data = await response.json();

    const cryptoRow = document.getElementById(symbol);

    let lowestPrice = Infinity;
    let highestPrice = -Infinity; // Variable pour le prix le plus haut
    let lastLowPrice = parseFloat(data[data.length - 1][3]);
    let lastHighPrice = parseFloat(data[data.length - 1][2]); // Le prix haut de la dernière intervalle

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const lowPrice = parseFloat(data[i][3]);
      const highPrice = parseFloat(data[i][2]); // Récupération du prix le plus haut
      const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
      const cellIndex = i + 1;

      const variationCell = cryptoRow.insertCell(cellIndex);
      const variationValue = weeklyVariation.toFixed(2);
      const intervalStartDate = new Date(data[i][0]);
      const intervalEndDate = new Date(data[i][6]);
      const optionsStart = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      };
      const optionsEnd = { hour: "numeric", minute: "numeric" };
      variationCell.textContent = `${intervalStartDate.toLocaleDateString(
        "fr-FR",
        optionsStart
      )} (${intervalStartDate.toLocaleTimeString(
        "fr-FR",
        optionsEnd
      )}) - ${intervalEndDate.toLocaleDateString(
        "fr-FR",
        optionsStart
      )} (${intervalEndDate.toLocaleTimeString(
        "fr-FR",
        optionsEnd
      )}): ${variationValue}%`;

      if (weeklyVariation > 0) {
        variationCell.classList.add("positive");
      } else if (weeklyVariation < 0) {
        variationCell.classList.add("negative");
      }

      if (lowPrice < lowestPrice) {
        lowestPrice = lowPrice;
      }

      if (highPrice > highestPrice) {
        // Mise à jour du prix le plus haut
        highestPrice = highPrice;
      }
    }

    const lastCell = cryptoRow.insertCell(data.length + 1);

    // Vérification pour le prix le plus bas
    if (lastLowPrice <= lowestPrice) {
      lastCell.textContent = "Prix le plus bas (avec mèche)!";
      lastCell.classList.add("positive");

      const cryptoNamesElement = document.getElementById("cryptoNames");
      const symbolElement = document.createElement("div");
      symbolElement.textContent = symbol;
      symbolElement.textContent = `${symbol} - La tendance est baissière (LONG)`;
      symbolElement.classList.add("positive");
      cryptoNamesElement.appendChild(symbolElement);
    }
    // Vérification pour le prix le plus haut
    else if (lastHighPrice >= highestPrice) {
      lastCell.textContent = "Prix le plus haut!";
      lastCell.classList.add("negative");

      const cryptoNamesElement = document.getElementById("cryptoNames");
      const symbolElement = document.createElement("div");
      symbolElement.textContent = symbol;
      symbolElement.textContent = `${symbol} - La tendance est haussière (SHORT)`;
      symbolElement.classList.add("negative");
      cryptoNamesElement.appendChild(symbolElement);
    } else {
      lastCell.textContent = "";
    }
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${symbol}:`,
      error
    );
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
