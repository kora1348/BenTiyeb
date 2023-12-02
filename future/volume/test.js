async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=8`
    );
    
   
    
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${symbol}:`,
      error
    );
  }
}

  // Appel de la fonction pour obtenir les taux de variation des cryptos
  fetchCryptoData("1INCH");
  