async function fetchCryptoData(symbol) {
  try {
      const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=3m&limit=1`
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
          const optionsStart = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric" };
          const optionsEnd = { hour: "numeric", minute: "numeric" };
          variationCell.textContent = `${weekStartDate.toLocaleDateString(
              "fr-FR",
              optionsStart
          )} (${weekStartDate.toLocaleTimeString("fr-FR", optionsEnd)}) - ${weekEndDate.toLocaleDateString(
              "fr-FR",
              optionsStart
          )} (${weekEndDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;

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
      totalCell.style.textAlign = 'center';

      const cryptoNamesElement = document.getElementById('cryptoNames');

      // Ajouter la classe "positive" pour le total dans la plage spécifiée
      if (totalVariation >= -3.99 && totalVariation <= -3.00) {
          totalCell.classList.add("positive");
          cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
      }

      if (totalVariation >= 3.00 && totalVariation <= 3.99) {
        totalCell.classList.add("negative");
        cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: SORTH, ${totalValue}%</p>`;
    }

      if(totalVariation < 0){
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
  fetchCryptoData("XRP");
  fetchCryptoData("XTZ");
  fetchCryptoData("XVG");
  fetchCryptoData("XVS");
  fetchCryptoData("YFI");
  fetchCryptoData("YGG");
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