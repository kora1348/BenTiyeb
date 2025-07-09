 async function fetchAllCryptoSymbols() {
      const url = 'https://api.binance.com/api/v3/exchangeInfo';
      try {
        const response = await fetch(url);
        const data = await response.json();
        const activeSymbols = data.symbols.filter(s => s.status === 'TRADING');
        const filtered = activeSymbols.filter(s =>
          ['USDT', 'USDC', 'BUSD', 'TUSD', 'BTC', 'ETH', 'FDUSD', 'DAI', 'EUR', 'TRY', 'BNB'].includes(s.quoteAsset)
        );
        return filtered.map(s => ({
          base: s.baseAsset,
          quote: s.quoteAsset,
          symbol: s.symbol
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des symboles:", error);
        return [];
      }
    }

    async function fetchPrices() {
      const url = 'https://api.binance.com/api/v3/ticker/price';
      try {
        const response = await fetch(url);
        const data = await response.json();
        const prices = {};
        data.forEach(p => prices[p.symbol] = parseFloat(p.price));
        return prices;
      } catch (error) {
        console.error("Erreur lors de la récupération des prix:", error);
        return {};
      }
    }

    async function detectArbitrage() {
      const pairs = await fetchAllCryptoSymbols();
      const prices = await fetchPrices();

      const tableBody = document.querySelector("#results tbody");
      tableBody.innerHTML = '';

      const uniqueAssets = [...new Set(pairs.map(p => p.base))];
      
      for (let asset of uniqueAssets) {
        const quotes = pairs.filter(p => p.base === asset);
        if (quotes.length < 2) continue;

        for (let i = 0; i < quotes.length; i++) {
          for (let j = 0; j < quotes.length; j++) {
            if (i === j) continue;

            const quote1 = quotes[i];
            const quote2 = quotes[j];

            // On cherche un lien entre quote1.quote et quote2.quote
            const intermediarySymbol = pairs.find(p => p.base === quote1.quote && p.quote === quote2.quote);
            if (!intermediarySymbol) continue;

            const symbolAB = quote1.symbol;
            const symbolBC = intermediarySymbol.symbol;
            const symbolAC = quote2.symbol;

            const priceAB = prices[symbolAB];
            const priceBC = prices[symbolBC];
            const priceAC = prices[symbolAC];

            if (!priceAB || !priceBC || !priceAC) continue;

            const theoreticalAC = priceAB / priceBC;
            const deviation = ((priceAC - theoreticalAC) / theoreticalAC) * 100;

            if (Math.abs(deviation) > 1) {
              const row = `<tr>
                <td>${asset}</td>
                <td>${quote1.quote}</td>
                <td>${quote2.quote}</td>
                <td>${priceAB.toFixed(6)}</td>
                <td>${priceBC.toFixed(6)}</td>
                <td>${priceAC.toFixed(6)}</td>
                <td>${theoreticalAC.toFixed(6)}</td>
                <td>${deviation.toFixed(2)}%</td>
                <td>${deviation > 0 ? 'SHORT' : 'LONG'}</td>
              </tr>`;
              tableBody.innerHTML += row;
            }
          }
        }
      }
    }

    detectArbitrage();