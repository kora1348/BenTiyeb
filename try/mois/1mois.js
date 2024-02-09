async function fetchCryptoData(symbol) {
  try {
      const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}TRY&interval=1M&limit=3`
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
      if (totalVariation >= -108 && totalVariation <= -90) {
          totalCell.classList.add("positive");
          cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
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

  fetchCryptoData("ACE");
  fetchCryptoData("ACH");
  fetchCryptoData("ADA");
  fetchCryptoData("AGIX");
  fetchCryptoData("ALGO");
  fetchCryptoData("ALICE");
  fetchCryptoData("ANKR");
  fetchCryptoData("APE");
  fetchCryptoData("API3");
  fetchCryptoData("APT");
  fetchCryptoData("ARB");
  fetchCryptoData("ARKM");
  fetchCryptoData("ATOM");
  fetchCryptoData("AUDIO");
  fetchCryptoData("AVAX");
  fetchCryptoData("AXS");
  fetchCryptoData("BCH");;
  fetchCryptoData("BNB");
  fetchCryptoData("BTC");
  fetchCryptoData("CFX");
  fetchCryptoData("CHZ");
  fetchCryptoData("COMBO");
  fetchCryptoData("COMP");
  fetchCryptoData("CYBER");
  fetchCryptoData("DAR");
  fetchCryptoData("DENT");
  fetchCryptoData("DOGE");
  fetchCryptoData("DOT");
  fetchCryptoData("DYDX");
  fetchCryptoData("EDU");
  fetchCryptoData("ENJ");
  fetchCryptoData("ENS");
  fetchCryptoData("EOS");
  fetchCryptoData("ETC");
  fetchCryptoData("ETH");
  fetchCryptoData("FET");
  fetchCryptoData("FIL");
  fetchCryptoData("FLOKI");
  fetchCryptoData("FRONT");
  fetchCryptoData("FTM");
  fetchCryptoData("GALA");
  fetchCryptoData("GAL");
  fetchCryptoData("GAS");
  fetchCryptoData("GMT");
  fetchCryptoData("GRT");
  fetchCryptoData("HOT");
  fetchCryptoData("ICP");
  fetchCryptoData("INJ");
  fetchCryptoData("IOTA");
  fetchCryptoData("JASMY");
  fetchCryptoData("JOE");
  fetchCryptoData("JTO");
  fetchCryptoData("LEVER");
  fetchCryptoData("LINK");
  fetchCryptoData("LOOM");
  fetchCryptoData("LPT");
  fetchCryptoData("LRC");
  fetchCryptoData("LTC");
  fetchCryptoData("LUNC");
  fetchCryptoData("MATIC");
  fetchCryptoData("MAV");
  fetchCryptoData("MINA");
  fetchCryptoData("MOVR");
  fetchCryptoData("MTL");
  fetchCryptoData("NEAR");
  fetchCryptoData("NEO");
  fetchCryptoData("NFP");
  fetchCryptoData("NTRN");
  fetchCryptoData("OCEAN");
  fetchCryptoData("OGN");
  fetchCryptoData("ONE");
  fetchCryptoData("ONT");
  fetchCryptoData("OP");
  fetchCryptoData("ORDI");
  fetchCryptoData("PEPE");
  fetchCryptoData("RAD");
  fetchCryptoData("REEF");
  fetchCryptoData("RNDR");
  fetchCryptoData("ROSE");
  fetchCryptoData("RVN");
  fetchCryptoData("SAND");
  fetchCryptoData("SEI");
  fetchCryptoData("SFP");
  fetchCryptoData("SHIB");
  fetchCryptoData("SKL");
  fetchCryptoData("SLP");
  fetchCryptoData("SOL");
  fetchCryptoData("SPELL");
  fetchCryptoData("STORJ");
  fetchCryptoData("STRAX");
  fetchCryptoData("STX");
  fetchCryptoData("SUI");
  fetchCryptoData("SUPER");
  fetchCryptoData("SXP");
  fetchCryptoData("TIA");
  fetchCryptoData("TLM");
  fetchCryptoData("TRB");
  fetchCryptoData("TRX");
  fetchCryptoData("TWT");
  fetchCryptoData("UMA");
  fetchCryptoData("UNFI");
  fetchCryptoData("UNI");
  fetchCryptoData("USDT");
  fetchCryptoData("USTC");
  fetchCryptoData("VET");
  fetchCryptoData("WAVES");
  fetchCryptoData("WLD");
  fetchCryptoData("XEC");
  fetchCryptoData("XLM");
  fetchCryptoData("XRP");
  fetchCryptoData("XVG");
  fetchCryptoData("XVS");
  fetchCryptoData("ZIL");



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