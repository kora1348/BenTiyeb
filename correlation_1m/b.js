const symbols = [
  "BTC",
  "BABY",
  "BANANAS31",
  "BANANA",
  "BCH",
  "BEAMX",
  "BERA",
  "BIGTIME",
  "BIO",
  "BLUR",
  "BMT",
  "BNB",
  "BOME",
  "BONK",
  "BROCCOLI714",
];

const priceData = {};

async function fetchCryptoData(symbol) {
  try {
    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1m&limit=15`
    );
    const data = await res.json();
    return data.map((d) => parseFloat(d[4])); // prix de clôture
  } catch (err) {
    console.error(`Erreur en récupérant les données pour ${symbol}:`, err);
    return Array(15).fill(0); // Retourne des zéros pour éviter que tout plante
  }
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

async function generateMatrix() {
  const correlationMatrix = [];

  for (const symbol of symbols) {
    const data = await fetchCryptoData(symbol);
    priceData[symbol] = data;
  }

  // Création de la matrice HTML
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

  // ✅ Affichage de la tendance BTC : ici c’est le bon endroit
  const btcPrices = priceData["BTC"];
  if (btcPrices && btcPrices.length >= 2) {
    const btcTrend = btcPrices[btcPrices.length - 1] > btcPrices[0] ? "LONG" : "SHORT";
    const trendBox = document.getElementById("btcTrend");
    trendBox.innerHTML = `<strong>BTC est actuellement : ${btcTrend}</strong><br>
      Prix initial : ${btcPrices[0]} — Prix final : ${btcPrices[btcPrices.length - 1]}`;
  }
}


// Génère au chargement et chaque 5 minutes
generateMatrix();
setInterval(generateMatrix, 5 * 60 * 1000);
