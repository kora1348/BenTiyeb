async function getNewCryptos() {
    try {
      // Faites une requête à l'API CoinGecko pour obtenir la liste de toutes les cryptomonnaies.
      const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
  
      // Vérifiez si la requête a réussi (statut 200 OK).
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      // Parsez la réponse JSON.
      const allCryptos = await response.json();
  
      // Obtenez la date actuelle du mois courant.
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Les mois sont indexés à partir de 0.
  
      // Parcourez la liste de toutes les cryptomonnaies.
      for (const crypto of allCryptos) {
        // Faites une requête pour obtenir plus d'informations sur chaque cryptomonnaie via CoinCap.
        const capResponse = await fetch(`https://api.coincap.io/v2/assets/${crypto.id}`);
  
        // Vérifiez si la requête a réussi (statut 200 OK).
        if (!capResponse.ok) {
          throw new Error(`Erreur HTTP : ${capResponse.status}`);
        }
  
        // Parsez la réponse JSON.
        const capData = await capResponse.json();
  
        // Vérifiez si la cryptomonnaie a été créée durant le mois courant.
        const cryptoDate = new Date(capData.data.created);
        if (cryptoDate.getMonth() + 1 === currentMonth) {
          console.log(`Nom: ${capData.data.name}, Symbole: ${capData.data.symbol}`);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des nouvelles cryptos :', error.message);
    }
  }
  
  // Appelez la fonction pour obtenir les nouvelles cryptos.
  getNewCryptos();
  