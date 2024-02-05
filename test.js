async function getNewCryptos() {
    try {
      // Faites une requête à l'API CoinGecko pour obtenir les nouvelles cryptomonnaies.
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=5&page=1&sparkline=false');
  
      // Vérifiez si la requête a réussi (statut 200 OK).
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      // Parsez la réponse JSON.
      const newCryptos = await response.json();
  
      // Affichez les informations sur les nouvelles cryptos.
      newCryptos.forEach(crypto => {
        console.log(`Nom: ${crypto.name}, Symbole: ${crypto.symbol}, Prix: $${crypto.current_price}`);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des nouvelles cryptos :', error.message);
    }
  }
  
  // Appelez la fonction pour obtenir les nouvelles cryptos.
  getNewCryptos();
  