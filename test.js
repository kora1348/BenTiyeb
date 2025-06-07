async function fetchBTCPrices() {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/tickers');
      const data = await response.json();

      const exchanges = ['Binance', 'Coinbase Exchange', 'Kraken', 'Bitfinex', 'Bitstamp'];
      const tickers = data.tickers.filter(t => 
        exchanges.includes(t.market.name) && t.target === 'USDT'
      );

      const tableBody = document.querySelector('#priceTable tbody');
      tableBody.innerHTML = '';

      tickers.forEach(ticker => {
        const row = `
          <tr>
            <td>${ticker.market.name}</td>
            <td>$${parseFloat(ticker.last).toFixed(2)}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    }

    fetchBTCPrices();