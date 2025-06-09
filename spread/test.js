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

const cryptos = [
  "ADA", "ARB", "AVAX", "BCH", "BNB", "BOME", "BONK", "BTC", "CRV", "DOGE",
  "ENA", "ETH", "ETHFI", "FIL", "HBAR", "KAITO", "LINK", "LTC", "NEAR", "NEO",
  "ORDI", "PEPE", "PNUT", "SHIB", "SOL", "SUI", "TIA", "TRUMP", "WIF", "WLD", "XRP"
];

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
  MATIC: "matic-network"
};

async function fetchCryptoPrices(symbol) {
  const id = coinGeckoIds[symbol];
  if (!id) return;

  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/tickers`);
  const data = await response.json();

  // Regrouper les tickers par devise (USD, USDT, EUR, etc.)
  const groupedByCurrency = {};

  data.tickers.forEach(t => {
    if (exchanges.includes(t.market.name)) {
      if (!groupedByCurrency[t.target]) {
        groupedByCurrency[t.target] = [];
      }
      groupedByCurrency[t.target].push({
        exchange: t.market.name,
        price: parseFloat(t.last),
        currency: t.target
      });
    }
  });

  const container = document.getElementById('results');

  Object.entries(groupedByCurrency).forEach(([currency, prices]) => {
    if (prices.length < 2) return;

    const table = document.createElement('table');
    table.classList.add('crypto-table');
    table.innerHTML = `
      <thead>
        <tr><th colspan="2">${symbol} - ${currency}</th></tr>
        <tr><th>Plateforme</th><th>Prix (${currency})</th></tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    prices.forEach(({ exchange, price }) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${exchange}</td>
        <td>${price}</td>
      `;
      tbody.appendChild(row);
    });

    // Calcul du prix moyen et spread
    const sorted = [...prices].sort((a, b) => a.price - b.price);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const spread = max.price - min.price;
    const spreadPercent = (spread / min.price) * 100;
    const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;

    const avgInfo = document.createElement('p');
    avgInfo.textContent = `📊 Prix moyen ${symbol} (${currency}): ${avgPrice.toFixed(6)}`;

    const spreadInfo = document.createElement('p');
    spreadInfo.textContent = `💹 Spread: ${spread.toFixed(6)} (Entre ${min.exchange} et ${max.exchange}) (${spreadPercent.toFixed(2)}%)`;

    const alert = document.createElement('p');
    if (spreadPercent > 0.5) {
      alert.textContent = `🚨 Arbitrage possible sur ${symbol} (${currency}) !`;
      alert.style.color = 'red';
    }

    container.appendChild(table);
    container.appendChild(avgInfo);
    container.appendChild(spreadInfo);
    if (spreadPercent > 0.5) container.appendChild(alert);
  });
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
