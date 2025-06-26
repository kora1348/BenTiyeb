const symbols = [
  "BTC",
  "FDUSD",
  "FET",
  "FIL",
  "FLOKI",
  "FLUX",
  "FORM",
];

const priceData = {};

async function fetchCryptoData(symbol) {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=10`
  );
  const data = await res.json();
  return data.map((d) => parseFloat(d[4])); // prix de clôture
}

function pearsonCorrelation(x, y) {
  const n = x.length;
  const avgX = x.reduce((a, b) => a + b, 0) / n;
  const avgY = y.reduce((a, b) => a + b, 0) / n;

  const numerator = x
    .map((xi, i) => (xi - avgX) * (y[i] - avgY))
    .reduce((a, b) => a + b, 0);

  const denominator = Math.sqrt(
    x.map((xi) => Math.pow(xi - avgX, 2)).reduce((a, b) => a + b, 0) *
    y.map((yi) => Math.pow(yi - avgY, 2)).reduce((a, b) => a + b, 0)
  );

  return denominator === 0 ? 0 : numerator / denominator;
}

function percentageChange(arr) {
  const first = arr[0];
  const last = arr[arr.length - 1];
  return ((last - first) / first) * 100;
}

async function generateMatrix() {
  const changes = {};

  for (const symbol of symbols) {
    const data = await fetchCryptoData(symbol);
    priceData[symbol] = data;
    changes[symbol] = percentageChange(data);
  }

  let html = "<table><tr><th></th>";
  for (const s of symbols) html += `<th>${s}</th>`;
  html += "</tr>";

  for (const sym1 of symbols) {
    html += `<tr><th>${sym1}</th>`;
    for (const sym2 of symbols) {
      const corr = pearsonCorrelation(priceData[sym1], priceData[sym2]);
      const rounded = corr.toFixed(2);
      let cls = "low";

      if (Math.abs(corr) > 0.9 && sym1 !== sym2) {
        cls = "very-high";
      } else if (Math.abs(corr) > 0.8) {
        cls = "high";
      } else if (Math.abs(corr) > 0.5) {
        cls = "medium";
      }

      html += `<td class="${cls}">${rounded}</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("correlationMatrix").innerHTML = html;
}

generateMatrix();
setInterval(generateMatrix, 5 * 60 * 1000);
