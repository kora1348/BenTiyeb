 async function fetchBTCPrices() {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/tickers');
      const data = await response.json();

      // Plateformes que tu veux comparer — tu peux en ajouter ici
      const exchanges = [
        'Binance',
        'Coinbase Exchange',
        'Kraken',
        'Bitfinex',
        'Bitstamp',
        'Bybit',
        'Crypto.com Exchange',
        'KuCoin',
        'OKX',
        'Gemini'
      ];

      // Filtrer les tickers pertinents
      const tickers = data.tickers.filter(t =>
        exchanges.includes(t.market.name) && t.target === 'USDT'
      );

      const tableBody = document.querySelector('#priceTable tbody');
      tableBody.innerHTML = '';

      const prices = [];

      tickers.forEach(ticker => {
        const price = parseFloat(ticker.last);
        prices.push({ exchange: ticker.market.name, price });

        const row = `
          <tr>
            <td>${ticker.market.name}</td>
            <td>$${price.toFixed(2)}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });

      // Calcul du spread (écart max - min)
      const sortedPrices = prices.sort((a, b) => a.price - b.price);
      const min = sortedPrices[0];
      const max = sortedPrices[sortedPrices.length - 1];
      const spreadValue = max.price - min.price;

      document.getElementById('spread').innerText = 
        `💹 Spread: $${spreadValue.toFixed(2)} (Entre ${min.exchange} et ${max.exchange})`;

      // Prix moyen 1D (approximé via moyenne simple)
      const avgPrice = prices.reduce((acc, p) => acc + p.price, 0) / prices.length;
      document.getElementById('average').innerText = 
        `📊 Prix moyen approximatif BTC (1D): $${avgPrice.toFixed(2)}`;

      // Alerte si spread > seuil
      const SEUIL_ARBITRAGE = 50; // Tu peux changer ce seuil
      if (spreadValue >= SEUIL_ARBITRAGE) {
        document.getElementById('alert').innerText =
          `🚨 Opportunité d'arbitrage détectée ! Spread = $${spreadValue.toFixed(2)}`;
      } else {
        document.getElementById('alert').innerText = '';
      }
    }

    fetchBTCPrices();