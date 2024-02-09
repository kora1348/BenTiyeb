async function fetchCryptoData(symbol) {
  try {
      const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}EUR&interval=1w&limit=1`
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
      if (totalVariation >= -29.99 && totalVariation <= -20.00) {
          totalCell.classList.add("positive");
          cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
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

  fetchCryptoData("ADA");
  fetchCryptoData("APT");
  fetchCryptoData("ARB");
  fetchCryptoData("ATOM");
  fetchCryptoData("AVAX");
  fetchCryptoData("BCH");
  fetchCryptoData("BNB");
  fetchCryptoData("BTC");
  fetchCryptoData("CHZ");
  fetchCryptoData("DOGE");
  fetchCryptoData("DOT");
  fetchCryptoData("EGLD");
  fetchCryptoData("ETH");
  fetchCryptoData("FTM");
  fetchCryptoData("GALA");
  fetchCryptoData("GMT");
  fetchCryptoData("GRT");
  fetchCryptoData("ICP");
  fetchCryptoData("LINK");
  fetchCryptoData("LTC");
  fetchCryptoData("MATIC");
  fetchCryptoData("NEAR");
  fetchCryptoData("OP");
  fetchCryptoData("SHIB");
  fetchCryptoData("SOL");
  fetchCryptoData("SUI");
  fetchCryptoData("TRX");
  fetchCryptoData("VET");
  fetchCryptoData("XLM");
  fetchCryptoData("XRP");



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