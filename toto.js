const exchanges = [
  'Binance', 'Coinbase', 'Kraken', 'Bitfinex', 'Bitstamp',
  'Bybit', 'Crypto.com', 'KuCoin', 'OKX', 'MEXC', 'Gemini'
];

const cryptos = [
  "ADA", "ARB", "AVAX", "BCH", "BNB", "BOME", "BONK", "BTC", "CRV", "DOGE",
  "ENA", "ETH", "ETHFI", "FIL", "HBAR", "KAITO", "LINK", "LTC", "NEAR", "NEO",
  "ORDI", "PEPE", "PNUT", "SHIB", "SOL", "SUI", "TIA", "TRUMP", "WIF", "WLD", "XRP"
];

async function fetchCryptoPrices(symbol) {
  const container = document.getElementById('results');
  const response = await fetch(`https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${symbol}&tsym=USD&api_key=YOUR_API_KEY`);
  const data = await response.json();

  if (!data.Data || !data.Data.Exchanges) return;

  const prices = data.Data.Exchanges
    .filter(t => exchanges.includes(t.MARKET))
    .map(t => ({
      exchange: t.MARKET,
      price: t.PRICE
    }));

  if (prices.length < 2) return;

  const table = document.createElement('table');
  table.classList.add('crypto-table');
  table.innerHTML = `
    <thead>
      <tr><th colspan="2">${symbol} - USD</th></tr>
      <tr><th>Plateforme</th><th>Prix (USD)</th></tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector('tbody');

  prices.forEach(({ exchange, price }) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${exchange}</td><td>${price}</td>`;
    tbody.appendChild(row);
  });

  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const spread = max.price - min.price;
  const spreadPercent = (spread / min.price) * 100;
  const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;

  const avgInfo = document.createElement('p');
  avgInfo.textContent = `📊 Prix moyen ${symbol} (USD): ${avgPrice.toFixed(6)}`;

  const spreadInfo = document.createElement('p');
  spreadInfo.textContent = `💹 Spread: ${spread.toFixed(6)} (Entre ${min.exchange} et ${max.exchange}) (${spreadPercent.toFixed(2)}%)`;

  const alert = document.createElement('p');
  if (spreadPercent > 0.5) {
    alert.textContent = `🚨 Arbitrage possible sur ${symbol} (USD) !`;
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
