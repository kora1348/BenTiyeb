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
  'MEXC',
  'Gemini'
];

// Liste de cryptos à analyser
const cryptos = [
  "ADA", "ARB", "AVAX", "BCH", "BNB", "BOME", "BONK", "BTC", "CRV", "DOGE",
  "ENA", "ETH", "ETHFI", "FIL", "HBAR", "KAITO", "LINK", "LTC", "NEAR", "NEO",
  "ORDI", "PEPE", "PNUT", "SHIB", "SOL", "SUI", "TIA", "TRUMP", "WIF", "WLD", "XRP"
];

// Mapping CoinGecko IDs (indispensable, car les IDs ne sont pas toujours les mêmes que les symboles)
const coinGeckoIds = {
  BTC: "bitcoin",
  ETH: "ethereum",
  ADA: "cardano",
  XRP: "ripple",
  BNB: "binancecoin",
  SOL: "solana",
  DOGE: "dogecoin",
  LTC: "litecoin",
  LINK: "chainlink",
  AVAX: "avalanche-2",
  SHIB: "shiba-inu",
  NEAR: "near",
  BCH: "bitcoin-cash",
  FIL: "filecoin",
  PEPE: "pepe",
  SUI: "sui",
  TIA: "celestia",
  WLD: "worldcoin-wld",
  BONK: "bonk",
  BOME: "book-of-meme",
  PNUT: "pnut",
  CRV: "curve-dao-token",
  ARB: "arbitrum",
  ENA: "ethena",
  ETHFI: "ether.fi",
  HBAR: "hedera-hashgraph",
  KAITO: "kaito",
  NEO: "neo",
  ORDI: "ordinals",
  TRUMP: "maga",
  WIF: "dogwifhat",
  MATIC: "matic-network" // Exemples de tokens supplémentaires
};

async function fetchCryptoPrices(symbol) {
  const id = coinGeckoIds[symbol];
  if (!id) return;

  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/tickers`);
  const data = await response.json();

  const tickers = data.tickers.filter(t =>
    exchanges.includes(t.market.name) && t.target === 'USDT'
  );

  if (tickers.length === 0) return;

  const prices = [];
  const table = document.createElement('table');
  table.classList.add('crypto-table');
  table.innerHTML = `
    <thead>
      <tr><th colspan="2">${symbol}</th></tr>
      <tr><th>Plateforme</th><th>Prix ${symbol} (USD)</th></tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector('tbody');

  tickers.forEach(ticker => {
    const price = parseFloat(ticker.last);
    prices.push({ exchange: ticker.market.name, price });

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${ticker.market.name}</td>
      <td>$${price.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  if (prices.length < 2) return;

  const sorted = prices.sort((a, b) => a.price - b.price);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const spread = max.price - min.price;
  const spreadPercent = (spread / min.price) * 100;

  const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;

  const spreadInfo = document.createElement('p');
  spreadInfo.textContent = `💹 Spread: $${spread.toFixed(2)} (Entre ${min.exchange} et ${max.exchange}) (${spreadPercent.toFixed(2)}%)`;

  const avgInfo = document.createElement('p');
  avgInfo.textContent = `📊 Prix moyen ${symbol} (1D approx): $${avgPrice.toFixed(2)}`;

  const alert = document.createElement('p');
  if (spread > 50) {
    alert.textContent = `🚨 Arbitrage possible sur ${symbol} !`;
    alert.style.color = 'red';
  }

  const container = document.getElementById('results');
  container.appendChild(table);
  container.appendChild(avgInfo);
  container.appendChild(spreadInfo);
  container.appendChild(alert);
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
