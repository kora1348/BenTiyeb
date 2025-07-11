async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=7`
    );
    const data = await response.json();

    // Calcul du total des taux de variation sur 3 semaines
    let totalVariation = 0;

    // Mise à jour du tableau avec les données et la couleur
    const cryptoRow = document.getElementById(symbol);

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
      const cellIndex = i + 1; // Décalage d'une cellule pour éviter la première cellule (Crypto)

      const variationCell = cryptoRow.insertCell(cellIndex);
      const variationValue = weeklyVariation.toFixed(2);
      const weekStartDate = new Date(data[i][0]);
      const weekEndDate = new Date(data[i][6]);
      const optionsStart = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      };
      const optionsEnd = { hour: "numeric", minute: "numeric" };
      variationCell.textContent = `${weekStartDate.toLocaleDateString(
        "fr-FR",
        optionsStart
      )} (${weekStartDate.toLocaleTimeString(
        "fr-FR",
        optionsEnd
      )}) - ${weekEndDate.toLocaleDateString(
        "fr-FR",
        optionsStart
      )} (${weekEndDate.toLocaleTimeString(
        "fr-FR",
        optionsEnd
      )}): ${variationValue}%`;

      // Ajouter la classe "positive" ou "negative" en fonction de la variation hebdomadaire
      if (weeklyVariation > 0) {
        variationCell.classList.add("positive");
      } else if (weeklyVariation < 0) {
        variationCell.classList.add("negative");
      }

      totalVariation += weeklyVariation; // Ajouter la variation hebdomadaire au total
    }

    // Ajouter la cellule pour afficher le total de variation
    const totalCell = cryptoRow.insertCell(data.length + 1);
    const totalValue = totalVariation.toFixed(2);
    totalCell.style.textAlign = "center";

    const cryptoNamesElement = document.getElementById("cryptoNames");

    // Ajouter la classe "positive" pour le total dans la plage spécifiée
    if (totalVariation >= -79.99 && totalVariation <= -70.0) {
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

fetchCryptoData("1INCH");
fetchCryptoData("AAVE");
fetchCryptoData("ACE");
fetchCryptoData("ACH");
fetchCryptoData("ACX");
fetchCryptoData("ACT");
fetchCryptoData("ADA");
fetchCryptoData("AEVO");
fetchCryptoData("AGIX");
fetchCryptoData("AGLD");
fetchCryptoData("AI");
fetchCryptoData("AI16Z");
fetchCryptoData("AIXBT");
fetchCryptoData("AERGO");
fetchCryptoData("ALCHE");
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
fetchCryptoData("AR");
fetchCryptoData("ARB");
fetchCryptoData("ARK");
fetchCryptoData("ARKM");
fetchCryptoData("ARPA");
fetchCryptoData("ANIME");
fetchCryptoData("ASTR");
fetchCryptoData("ATA");
fetchCryptoData("ATOM");
fetchCryptoData("AUCTION");
fetchCryptoData("AVAAI");
fetchCryptoData("AVA");
fetchCryptoData("AVAX");
fetchCryptoData("AXL");
fetchCryptoData("AXS");
fetchCryptoData("B3");
fetchCryptoData("BAN");
fetchCryptoData("BANANA");
fetchCryptoData("BANANAS31");
fetchCryptoData("BAND");
fetchCryptoData("BAT");
fetchCryptoData("BAKE");
fetchCryptoData("BB");
fetchCryptoData("BCH");
fetchCryptoData("BEAMX");
fetchCryptoData("BEL");
fetchCryptoData("BERA");
fetchCryptoData("BICO");
fetchCryptoData("BID");
fetchCryptoData("BIGTIME");
fetchCryptoData("BIO");
fetchCryptoData("BMT");
fetchCryptoData("BNB");
fetchCryptoData("BNT");
fetchCryptoData("BNX");
fetchCryptoData("BOME");
fetchCryptoData("BOND");
fetchCryptoData("BONK");
fetchCryptoData("BR");
fetchCryptoData("BRETT");
fetchCryptoData("BROCCOLI714");
fetchCryptoData("BROCCOLIF3B");
fetchCryptoData("BSV");
fetchCryptoData("BSW");
fetchCryptoData("BTC");
fetchCryptoData("BTCDOM");
fetchCryptoData("BABY");
fetchCryptoData("BABYDOGE");
fetchCryptoData("BLUR");
fetchCryptoData("BLZ");
fetchCryptoData("CAKE");
fetchCryptoData("CAT");
fetchCryptoData("CATI");
fetchCryptoData("C98");
fetchCryptoData("CELO");
fetchCryptoData("CELR");
fetchCryptoData("CETUS");
fetchCryptoData("CFX");
fetchCryptoData("CGPT");
fetchCryptoData("CHESS");
fetchCryptoData("CHILLGUY");
fetchCryptoData("CHR");
fetchCryptoData("CHZ");
fetchCryptoData("CKB");
fetchCryptoData("COMBO");
fetchCryptoData("COMP");
fetchCryptoData("COOKIE");
fetchCryptoData("COS");
fetchCryptoData("COTI");
fetchCryptoData("COW");
fetchCryptoData("CRV");
fetchCryptoData("CTK");
fetchCryptoData("CTSI");
fetchCryptoData("CVX");
fetchCryptoData("CVC");
fetchCryptoData("CYBER");
fetchCryptoData("D");
fetchCryptoData("DAR");
fetchCryptoData("DASH");
fetchCryptoData("DEGEN");
fetchCryptoData("DEGO");
fetchCryptoData("DENT");
fetchCryptoData("DEXE");
fetchCryptoData("DF");
fetchCryptoData("DGB");
fetchCryptoData("DIA");
fetchCryptoData("DODOX");
fetchCryptoData("DOGE");
fetchCryptoData("DOGS");
fetchCryptoData("DOT");
fetchCryptoData("DUSK");
fetchCryptoData("DYDX");
fetchCryptoData("DYM");
fetchCryptoData("EDU");
fetchCryptoData("EGLD");
fetchCryptoData("EIGEN");
fetchCryptoData("EOS");
fetchCryptoData("ENA");
fetchCryptoData("ENJ");
fetchCryptoData("ENS");
fetchCryptoData("EPIC");
fetchCryptoData("ETC");
fetchCryptoData("ETH");
fetchCryptoData("ETHFI");
fetchCryptoData("ETHW");
fetchCryptoData("FARTCOIN");
fetchCryptoData("FET");
fetchCryptoData("FIDA");
fetchCryptoData("FIL");
fetchCryptoData("FIO");
fetchCryptoData("FLM");
fetchCryptoData("FLOKI");
fetchCryptoData("FLOW");
fetchCryptoData("FLUX");
fetchCryptoData("FORM");
fetchCryptoData("FORTH");
fetchCryptoData("FRONT");
fetchCryptoData("FTM");
fetchCryptoData("FTT");
fetchCryptoData("FUN");
fetchCryptoData("FXS");
fetchCryptoData("G");
fetchCryptoData("GALA");
fetchCryptoData("GAS");
fetchCryptoData("GHST");
fetchCryptoData("GLM");
fetchCryptoData("GLMR");
fetchCryptoData("GMT");
fetchCryptoData("GMX");
fetchCryptoData("GOAT");
fetchCryptoData("GPS");
fetchCryptoData("GRASS");
fetchCryptoData("GRT");
fetchCryptoData("GRIFFAIN");
fetchCryptoData("GTC");
fetchCryptoData("GUN");
fetchCryptoData("GUNTHY");
fetchCryptoData("HBAR");
fetchCryptoData("HFT");
fetchCryptoData("HIFI");
fetchCryptoData("HIGH");
fetchCryptoData("HIPPO");
fetchCryptoData("HIVE");
fetchCryptoData("HMSTR");
fetchCryptoData("HOT");
fetchCryptoData("HOOK");
fetchCryptoData("ICX");
fetchCryptoData("ID");
fetchCryptoData("IDEX");
fetchCryptoData("ILV");
fetchCryptoData("IMX");
fetchCryptoData("INJ");
fetchCryptoData("IOST");
fetchCryptoData("IOTA");
fetchCryptoData("IOTX");
fetchCryptoData("IO");
fetchCryptoData("IP");
fetchCryptoData("JASMY");
fetchCryptoData("JELLYJELLY");
fetchCryptoData("JOE");
fetchCryptoData("JTO");
fetchCryptoData("JUP");
fetchCryptoData("KAIA");
fetchCryptoData("KAITO");
fetchCryptoData("KAS");
fetchCryptoData("KAVA");
fetchCryptoData("KDA");
fetchCryptoData("KEY");
fetchCryptoData("KMNO");
fetchCryptoData("KLAY");
fetchCryptoData("KNC");
fetchCryptoData("KOMA");
fetchCryptoData("KSM");
fetchCryptoData("LDO");
fetchCryptoData("LEVER");
fetchCryptoData("LINA");
fetchCryptoData("LINK");
fetchCryptoData("LISTA");
fetchCryptoData("LIT");
fetchCryptoData("LOKA");
fetchCryptoData("LOOM");
fetchCryptoData("LPT");
fetchCryptoData("LQTY");
fetchCryptoData("LRC");
fetchCryptoData("LSK");
fetchCryptoData("LTC");
fetchCryptoData("LUNA2");
fetchCryptoData("LUNC");
fetchCryptoData("LAYER");
fetchCryptoData("LUMIA");
fetchCryptoData("MAGIC");
fetchCryptoData("MANA");
fetchCryptoData("MANTA");
fetchCryptoData("MASK");
fetchCryptoData("MAV");
fetchCryptoData("MAVIA");
fetchCryptoData("MBOX");
fetchCryptoData("MDT");
fetchCryptoData("ME");
fetchCryptoData("MELANIA");
fetchCryptoData("MEME");
fetchCryptoData("METIS");
fetchCryptoData("MINA");
fetchCryptoData("MEW");
fetchCryptoData("MKR");
fetchCryptoData("MLN");
fetchCryptoData("MOCA");
fetchCryptoData("MOG");
fetchCryptoData("MOODENG");
fetchCryptoData("MORPHO");
fetchCryptoData("MOVR");
fetchCryptoData("MOVE");
fetchCryptoData("MTL");
fetchCryptoData("MUBARAK");
fetchCryptoData("MYRO");
fetchCryptoData("NEAR");
fetchCryptoData("NEO");
fetchCryptoData("NEIRO");
fetchCryptoData("NEIROETH");
fetchCryptoData("NFP");
fetchCryptoData("NIL");
fetchCryptoData("NKN");
fetchCryptoData("NMR");
fetchCryptoData("NOT");
fetchCryptoData("NTRN");
fetchCryptoData("OCEAN");
fetchCryptoData("OGN");
fetchCryptoData("OM");
fetchCryptoData("OMG");
fetchCryptoData("OMNI");
fetchCryptoData("ONDO");
fetchCryptoData("ONE");
fetchCryptoData("ONG");
fetchCryptoData("ONT");
fetchCryptoData("OP");
fetchCryptoData("OXT");
fetchCryptoData("ORDI");
fetchCryptoData("ORBS");
fetchCryptoData("ORCA");
fetchCryptoData("PARTI");
fetchCryptoData("PAXG");
fetchCryptoData("PEOPLE");
fetchCryptoData("PENDLE");
fetchCryptoData("PENGU");
fetchCryptoData("PEPE");
fetchCryptoData("PERP");
fetchCryptoData("PHA");
fetchCryptoData("PHB");
fetchCryptoData("PIPPIN");
fetchCryptoData("PIXEL");
fetchCryptoData("PLUME");
fetchCryptoData("PNUT");
fetchCryptoData("POL");
fetchCryptoData("POLYX");
fetchCryptoData("PONKE");
fetchCryptoData("POPCAT");
fetchCryptoData("PORTAL");
fetchCryptoData("POWR");
fetchCryptoData("PROM");
fetchCryptoData("PYTH");
fetchCryptoData("QNT");
fetchCryptoData("QTUM");
fetchCryptoData("QUICK");
fetchCryptoData("RAD");
fetchCryptoData("RARE");
fetchCryptoData("RAY");
fetchCryptoData("RAYSOL");
fetchCryptoData("RATS");
fetchCryptoData("RDNT");
fetchCryptoData("REEF");
fetchCryptoData("REI");
fetchCryptoData("REN");
fetchCryptoData("RENDER");
fetchCryptoData("REZ");
fetchCryptoData("RIF");
fetchCryptoData("RLC");
fetchCryptoData("RNDR");
fetchCryptoData("RONIN");
fetchCryptoData("ROSE");
fetchCryptoData("RPL");
fetchCryptoData("RSR");
fetchCryptoData("RUNE");
fetchCryptoData("RVN");
fetchCryptoData("S");
fetchCryptoData("SAFE");
fetchCryptoData("SAGA");
fetchCryptoData("SAND");
fetchCryptoData("SANTOS");
fetchCryptoData("SAT");
fetchCryptoData("SATS");
fetchCryptoData("SC");
fetchCryptoData("SCR");
fetchCryptoData("SCRT");
fetchCryptoData("SEI");
fetchCryptoData("SFP");
fetchCryptoData("SHIB");
fetchCryptoData("SHELL");
fetchCryptoData("SIREN");
fetchCryptoData("SKL");
fetchCryptoData("SLP");
fetchCryptoData("SLERF");
fetchCryptoData("SNX");
fetchCryptoData("SOL");
fetchCryptoData("SOLV");
fetchCryptoData("SONIC");
fetchCryptoData("SPELL");
fetchCryptoData("SPX");
fetchCryptoData("SRM");
fetchCryptoData("SSV");
fetchCryptoData("STEEM");
fetchCryptoData("STMX");
fetchCryptoData("STORJ");
fetchCryptoData("STPT");
fetchCryptoData("STRAX");
fetchCryptoData("STRK");
fetchCryptoData("STG");
fetchCryptoData("STX");
fetchCryptoData("SUN");
fetchCryptoData("SUI");
fetchCryptoData("SUPER");
fetchCryptoData("SUSHI");
fetchCryptoData("SXP");
fetchCryptoData("SYN");
fetchCryptoData("SYS");
fetchCryptoData("T");
fetchCryptoData("TAO");
fetchCryptoData("THETA");
fetchCryptoData("THE");
fetchCryptoData("TIA");
fetchCryptoData("TLM");
fetchCryptoData("TNSR");
fetchCryptoData("TON");
fetchCryptoData("TOKEN");
fetchCryptoData("TRB");
fetchCryptoData("TRU");
fetchCryptoData("TRUMP");
fetchCryptoData("TRX");
fetchCryptoData("TST");
fetchCryptoData("TURBO");
fetchCryptoData("TUT");
fetchCryptoData("TWT");
fetchCryptoData("UMA");
fetchCryptoData("UNFI");
fetchCryptoData("UNI");
fetchCryptoData("USUAL");
fetchCryptoData("USTC");
fetchCryptoData("VANRY");
fetchCryptoData("VANA");
fetchCryptoData("VET");
fetchCryptoData("VELODROME");
fetchCryptoData("VIC");
fetchCryptoData("VINE");
fetchCryptoData("VIRTUAL");
fetchCryptoData("VOXEL");
fetchCryptoData("VTHO");
fetchCryptoData("VVV");
fetchCryptoData("W");
fetchCryptoData("WAL");
fetchCryptoData("WAVES");
fetchCryptoData("WAXP");
fetchCryptoData("WHY");
fetchCryptoData("WIF");
fetchCryptoData("WLD");
fetchCryptoData("WOO");
fetchCryptoData("X");
fetchCryptoData("XAI");
fetchCryptoData("XEC");
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
fetchCryptoData("ZEREBRO");
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
