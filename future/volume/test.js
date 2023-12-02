async function fetchCryptoData(symbol) {
  try {
      const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=8`
      );

      const data = await response.json();

      // Calculez le taux de variation pour chaque intervalle
      for (let i = 0; i < data.length; i++) {
          const openPrice = parseFloat(data[i][1]);
          const closePrice = parseFloat(data[i][4]);
          const variation = ((closePrice - openPrice) / openPrice) * 100;
          
          // Mettez à jour le contenu HTML avec les taux de variation
          const element = document.getElementById(`variation_${symbol}_${i + 1}`);
          element.textContent = variation.toFixed(2) + "%";
      }

  } catch (error) {
      console.error(
          `Erreur lors de la récupération des données pour ${symbol}:`,
          error
      );
  }
}

// Appel de la fonction pour obtenir les taux de variation des cryptos
fetchCryptoData("1INCH");
fetchCryptoData("BTC");