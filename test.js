const cryptos = [
  "ADA",
  "ARB",
  "AVAX",
  "BCH",
  "BNB",
  "BOME",
  "BONK",
  "BTC",
  "CRV",
  "DOGE",
  "ENA",
  "ETH",
  "ETHFI",
  "FIL",
  "HBAR",
  "IP",
  "KAITO",
  "LINK",
  "LTC",
  "NEAR",
  "NEO",
  "ORDI",
  "PEPE",
  "PNUT",
  "SHIB",
  "SOL",
  "SUI",
  "TIA",
  "TRUMP",
  "WIF",
  "WLD",
  "XRP",
];

const interval = "1m";
const limit = 201;

async function fetchData(symbol) {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`);
    const data = await res.json();

    const closes = data.map(k => parseFloat(k[4]));
    const volumes = data.map(k => parseFloat(k[5]));

    // Calcul EMA 200 du prix
    const k = 2 / (200 + 1);
    let ema = closes[0];
    for (let i = 1; i < closes.length; i++) {
      ema = closes[i] * k + ema * (1 - k);
    }

    const last = data[data.length - 1];
    const open = parseFloat(last[1]);
    const close = parseFloat(last[4]);
    const volume = parseFloat(last[5]);
    const variation = ((close - open) / open) * 100;

    let tendance = "-";
    let alerteEntree = "-";
    let alerteSortie = "-";

    if (close > ema) {
      tendance = "⚠️ Retournement possible (LONG)";
      alerteEntree = "Entrée LONG possible";
    } else if (close < ema && volume > moyenne(volume)) {
      tendance = "⬇️ Tendance baissière (SHORT)";
      alerteEntree = "Entrée SHORT possible";
    }

    return {
      symbol,
      variation: variation.toFixed(2),
      volume: volume.toFixed(2),
      ema: ema.toFixed(2),
      tendance,
      alerteEntree,
      alerteSortie
    };
  } catch (e) {
    console.error(`Erreur ${symbol}: `, e);
    return null;
  }
}

function moyenne(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

async function afficherTableau() {
  const table = document.getElementById("cryptoTableBody");
  table.innerHTML = "";

  const resultats = await Promise.all(cryptos.map(fetchData));
  resultats.filter(r => r).forEach(crypto => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${crypto.symbol}</td>
      <td class="${crypto.variation >= 0 ? 'positive' : 'negative'}">${crypto.variation}%</td>
      <td>${crypto.volume} (${crypto.ema})</td>
      <td>${crypto.tendance}</td>
      <td>${crypto.alerteEntree}</td>
      <td>${crypto.alerteSortie}</td>
    `;
    table.appendChild(row);
  });
}

afficherTableau();
setInterval(afficherTableau, 30000);

function mettreAJourHeure() {
  var elementHeure = document.getElementById("heure");
  var maintenant = new Date();

  // Créer une copie de l'heure actuelle
  var heureActuelle = new Date(maintenant);

  // Ajouter 3 heures et 20 minutes à l'heure actuelle
  maintenant.setHours(maintenant.getHours() + 3);
  maintenant.setMinutes(maintenant.getMinutes() + 20);

  var heuresMaintenant = maintenant.getHours();
  var minutesMaintenant = maintenant.getMinutes();
  var secondesMaintenant = maintenant.getSeconds();

  var heuresActuelle = heureActuelle.getHours();
  var minutesActuelle = heureActuelle.getMinutes();
  var secondesActuelle = heureActuelle.getSeconds();

  // Ajouter un zéro devant les chiffres < 10
  heuresMaintenant =
    heuresMaintenant < 10 ? "0" + heuresMaintenant : heuresMaintenant;
  minutesMaintenant =
    minutesMaintenant < 10 ? "0" + minutesMaintenant : minutesMaintenant;
  secondesMaintenant =
    secondesMaintenant < 10 ? "0" + secondesMaintenant : secondesMaintenant;

  heuresActuelle = heuresActuelle < 10 ? "0" + heuresActuelle : heuresActuelle;
  minutesActuelle =
    minutesActuelle < 10 ? "0" + minutesActuelle : minutesActuelle;
  secondesActuelle =
    secondesActuelle < 10 ? "0" + secondesActuelle : secondesActuelle;

  // Mettre à jour le contenu de l'élément avec les deux heures
  elementHeure.innerHTML =
    heuresActuelle + ":" + minutesActuelle + ":" + secondesActuelle;
}

// Appeler la fonction pour mettre à jour l'heure
mettreAJourHeure();
