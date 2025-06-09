  const exchanges = ['Binance', 'MEXC'];

    const cryptos = [
   "DOGE",
     
    ];

    const coinGeckoIds = {
      BTC: "bitcoin", ETH: "ethereum", ADA: "cardano", XRP: "ripple",
      BNB: "binancecoin", SOL: "solana", DOGE: "dogecoin", LTC: "litecoin",
      LINK: "chainlink", AVAX: "avalanche-2", SHIB: "shiba-inu", NEAR: "near",
      BCH: "bitcoin-cash", FIL: "filecoin", PEPE: "pepe", SUI: "sui",
      TIA: "celestia", WLD: "worldcoin-wld", BONK: "bonk", BOME: "book-of-meme",
      PNUT: "pnut", CRV: "curve-dao-token", ARB: "arbitrum", ENA: "ethena",
      ETHFI: "ether.fi", HBAR: "hedera-hashgraph", KAITO: "kaito", NEO: "neo",
      ORDI: "ordinals", TRUMP: "maga", WIF: "dogwifhat", MATIC: "matic-network"
    };

    async function fetchCryptoPrices(symbol) {
      const id = coinGeckoIds[symbol];
      if (!id) return;

      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/tickers`);
      const data = await response.json();

      // Filtrer uniquement les tickers en USDT
      const usdtTickers = data.tickers.filter(t =>
        t.target === "USDT" && exchanges.includes(t.market.name)
      );

      if (usdtTickers.length < 2) return;

      const container = document.getElementById('results');
      const table = document.createElement('table');
      table.classList.add('crypto-table');
      table.innerHTML = `
        <thead>
          <tr><th colspan="2">${symbol} - USDT</th></tr>
          <tr><th>Plateforme</th><th>Prix (USDT)</th></tr>
        </thead>
        <tbody></tbody>
      `;

      const tbody = table.querySelector('tbody');

      usdtTickers.forEach(({ market, last }) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${market.name}</td><td>${parseFloat(last).toFixed(6)}</td>`;
        tbody.appendChild(row);
      });

      const prices = usdtTickers.map(t => parseFloat(t.last));
      const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const spread = max - min;
      const spreadPercent = (spread / min) * 100;

      const avgInfo = document.createElement('p');
      avgInfo.textContent = `📊 Prix moyen ${symbol} (USDT): ${avgPrice.toFixed(6)}`;

      const spreadInfo = document.createElement('p');
      spreadInfo.textContent = `💹 Spread: ${spread.toFixed(6)} (${spreadPercent.toFixed(2)}%)`;

      const alert = document.createElement('p');
      if (spreadPercent > 0.5) {
        alert.textContent = `🚨 Arbitrage possible sur ${symbol} !`;
        alert.style.color = 'red';
      }

      container.appendChild(table);
      container.appendChild(avgInfo);
      container.appendChild(spreadInfo);
      if (spreadPercent > 0.5) container.appendChild(alert);
    }

    async function runAll() {
      document.getElementById('results').innerHTML = '';
      for (const symbol of cryptos) {
        try {
          await fetchCryptoPrices(symbol);
        } catch (e) {
          console.error(`Erreur avec ${symbol}:`, e);
        }
      }
    }

    runAll();