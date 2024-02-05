async function fetchCryptoData(symbol) {
  try {
      // Récupérer des informations détaillées sur une paire spécifique
      const informationsPaireResponse = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
      const informationsPaireData = await informationsPaireResponse.json();

      console.log('Informations détaillées sur la paire', symbol, ':', informationsPaireData);

      // Faites ce que vous avez besoin de faire avec les données récupérées ici
      
  } catch (error) {
      console.error(
          `Erreur lors de la récupération des données pour ${symbol}:`,
          error
      );
  }
}

// Exemple d'utilisation avec une paire spécifique (remplacez par la paire que vous souhaitez)
fetchCryptoData('BTCUSDT');
