async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=1`
    );
    const data = await response.json();

    // Calcul du total des taux de variation sur 4 intervalles de 15 minutes
    let totalVariation = 0;

    // Mise à jour du tableau avec les données et la couleur
    const cryptoRow = document.getElementById(symbol);

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const intervalVariation = ((closePrice - openPrice) / openPrice) * 100;
      const cellIndex = i + 1; // Décalage d'une cellule pour éviter la première cellule (Crypto)

      const variationCell = cryptoRow.insertCell(cellIndex);
      const variationValue = intervalVariation.toFixed(2);
      const timestamp = parseInt(data[i][0]);
      const dateValue = new Date(timestamp);
      const hour = dateValue.getHours();
      const minute = dateValue.getMinutes();
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      variationCell.textContent = `${formattedTime}: ${variationValue}%`;

      // Ne pas ajouter de classe de couleur aux cellules individuelles
      totalVariation += intervalVariation; // Ajouter la variation de l'intervalle au total
    }

    // Ajouter la cellule pour afficher le total de variation
    const totalCell = cryptoRow.insertCell(data.length + 1);
    const totalValue = totalVariation.toFixed(2);
    totalCell.textContent = `${totalValue}%`;

    if (totalVariation >= 0.80 && totalVariation <= 0.84) {
      totalCell.classList.add("positive");
    } else if (totalVariation <= -0.80 && totalVariation >= -0.84) {
      totalCell.classList.add("negative");
    }

    if ( (totalVariation >= 0.80 && totalVariation <= 0.84) ||  (totalVariation <= -0.80 && totalVariation >= -0.84)) {
      // Ajouter le nom de la crypto en dehors du tableau
      const cryptoNameDiv = document.getElementById("cryptoNames");
      const cryptoName = document.createElement("p");
      cryptoName.textContent = `${symbol} : ${totalValue}%`;
      cryptoNameDiv.appendChild(cryptoName);

      // Ajouter la classe CSS appropriée
      if (totalVariation >= 0.80 && totalVariation <= 0.84) {
        cryptoName.classList.add("positive");
      } else if (totalVariation <= -0.80 && totalVariation >= -0.84) {
        cryptoName.classList.add("negative");
      }
    }


  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${symbol}:`,
      error
    );
  }
}



  // Appel de la fonction pour obtenir les taux de variation des cryptos
  fetchCryptoData("WLD");
  
  function mettreAJourHeure() {
    var elementHeure = document.getElementById('heure');
    var maintenant = new Date();
    
    var heures = maintenant.getHours();
    var minutes = maintenant.getMinutes();
    var secondes = maintenant.getSeconds();
  
    // Ajouter un zéro devant les chiffres < 10
    heures = heures < 10 ? '0' + heures : heures;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    secondes = secondes < 10 ? '0' + secondes : secondes;
  
    // Mettre à jour le contenu de l'élément avec l'heure actuelle
    elementHeure.innerHTML = heures + ':' + minutes + ':' + secondes;
  }
  
  // Appeler la fonction une première fois pour afficher l'heure au chargement de la page
  mettreAJourHeure();
  
  // Actualiser l'heure chaque seconde
  // setInterval(mettreAJourHeure, 1000);

  // function refreshPage() {
  //   location.reload();
  // }
  

  // setInterval(refreshPage, 20000);
    