 // Fonction pour mettre à jour l'heure
    function updateTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString('fr-FR');
      document.getElementById('heure').textContent = `Heure actuelle: ${timeString}`;
    }

    // Mettre à jour l'heure immédiatement puis toutes les secondes
    updateTime();
    setInterval(updateTime, 1000);

    // Fonction principale pour charger les données
    async function loadCryptoData() {
      try {
        // 1. Récupérer la liste des symboles futures USDT
        const response = await fetch('https://fapi.binance.com/fapi/v1/exchangeInfo');
        const data = await response.json();
        
        // Filtrer les paires USDT et extraire les symboles
        const usdtFutures = data.symbols
          .filter(s => s.quoteAsset === 'USDT' && s.status === 'TRADING')
          .map(s => s.baseAsset)
          .filter((value, index, self) => self.indexOf(value) === index) // Supprimer les doublons
          .sort();
        
        // 2. Mettre à jour la date de dernière mise à jour
        const updateDate = new Date().toLocaleDateString('fr-FR');
        document.getElementById('lastUpdate').textContent = `Mise à jour: ${updateDate}`;
        
        // 3. Créer le tableau
        const tableBody = document.getElementById('cryptoTableBody');
        tableBody.innerHTML = ''; // Vider le tableau
        
        // 4. Pour chaque crypto, créer une ligne et charger les données
        for (const symbol of usdtFutures) {
          const row = document.createElement('tr');
          row.id = symbol;
          
          // Cellule Crypto
          const cryptoTd = document.createElement('td');
          cryptoTd.textContent = symbol;
          row.appendChild(cryptoTd);
          
          // Ajouter la ligne au tableau
          tableBody.appendChild(row);
          
          // Charger les données pour cette crypto
          fetchCryptoData(symbol);
        }
        
        // Cacher le message de chargement
        document.getElementById('loading').style.display = 'none';
        
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        document.getElementById('loading').textContent = 'Erreur lors du chargement des données. Veuillez réessayer.';
      }
    }

    // Fonction pour récupérer les données d'une crypto spécifique
    async function fetchCryptoData(symbol) {
      try {
        // Récupération des données de prix (spot pour la variation)
        const priceResponse = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=7`
        );
        const priceData = await priceResponse.json();

        // Récupération des funding rates
        const fundingResponse = await fetch(
          `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol}USDT&limit=72`
        );
        const fundingData = await fundingResponse.json();

        const cryptoRow = document.getElementById(symbol);
        const dateOptions = { year: "2-digit", month: "2-digit", day: "2-digit" };

        for (let i = 0; i < priceData.length; i++) {
          // Définition des plages horaires spécifiques à Binance (02h00 - 01h59 UTC)
          const candleOpenTime = new Date(priceData[i][0]);
          const candleCloseTime = new Date(priceData[i][6]);
          
          // La bougie du jour J commence à 02h00 UTC de J et finit à 01h59 UTC de J+1
          const dayStart = new Date(candleOpenTime);
          dayStart.setHours(2, 0, 0, 0); // 02:00:00.000 UTC
          
          const dayEnd = new Date(dayStart);
          dayEnd.setDate(dayEnd.getDate() + 1);
          dayEnd.setHours(1, 59, 59, 999); // 01:59:59.999 UTC du lendemain

          // Calcul de la variation de prix
          const openPrice = parseFloat(priceData[i][1]);
          const closePrice = parseFloat(priceData[i][4]);
          const priceVariation = ((closePrice - openPrice) / openPrice) * 100;

          // Calcul du funding rate journalier (somme des 3 taux de la période 02h-01h59)
          let dailyFunding = 0;
          let fundingCount = 0;
          
          fundingData.forEach(rate => {
            const rateTime = new Date(rate.fundingTime);
            if (rateTime >= dayStart && rateTime < dayEnd) {
              dailyFunding += parseFloat(rate.fundingRate) * 100;
              fundingCount++;
            }
          });

          // Formatage des valeurs
          const formattedDate = dayStart.toLocaleDateString("fr-FR", dateOptions);
          const formattedVariation = priceVariation.toFixed(2) + '%';
          const formattedFunding = fundingCount > 0 ? dailyFunding.toFixed(5) + '%' : 'N/A';

          // Création des cellules
          const itemCell = document.createElement('td');
          itemCell.textContent = `${formattedDate}: ${formattedVariation}`;
          itemCell.className = priceVariation > 0 ? "positive" : priceVariation < 0 ? "negative" : "";

          const fundCell = document.createElement('td');
          fundCell.textContent = `${formattedDate}: ${formattedFunding}`;
          fundCell.className = dailyFunding > 0 ? "positive" : dailyFunding < 0 ? "negative" : "";
          fundCell.style.textAlign = "center";

          // Ajout des cellules à la ligne
          cryptoRow.appendChild(itemCell);
          cryptoRow.appendChild(fundCell);
        }

      } catch (error) {
        console.error(`Erreur pour ${symbol}:`, error);
        const errorCell = document.createElement('td');
        errorCell.colSpan = 14;
        errorCell.textContent = `Erreur de chargement`;
        errorCell.style.color = "red";
        document.getElementById(symbol).appendChild(errorCell);
      }
    }

    // Démarrer le chargement des données
    loadCryptoData();

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
