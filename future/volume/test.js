async function fetchCryptoData(symbol) {
  try {
      const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=8`
      );

      const data = await response.json();

      // Calculez le taux de variation pour chaque intervalle
      let totalVariation = 0;
      for (let i = 0; i < data.length; i++) {
          const openPrice = parseFloat(data[i][1]);
          const closePrice = parseFloat(data[i][4]);
          const variation = ((closePrice - openPrice) / openPrice) * 100;
          const time = new Date(data[i][0]).toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric', hour12: false });

          // Mettez à jour le contenu HTML avec les taux de variation, l'heure et la couleur
          const element = document.getElementById(`variation_${symbol}_${i + 1}`);
          element.textContent = `${variation.toFixed(2)}% ${time}`;

          // Ajoutez la classe de couleur en fonction de la positivité ou de la négativité
          if (variation > 0) {
              element.classList.add("positive");
          } else if (variation < 0) {
              element.classList.add("negative");
          }

          // Calculez le total des taux de variation
          totalVariation += variation;
      }

      // Mettez à jour le contenu HTML avec le total et appliquez la classe de couleur bleue
      const totalElement = document.getElementById(`total_${symbol}`);
      totalElement.textContent = `${totalVariation.toFixed(2)}%`;
      totalElement.classList.add("total");

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