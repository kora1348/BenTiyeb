const cryptos = [
  "1INCH",
  "AAVE",
  "ACE",
  "ACH",
  "ACT",
  "ACX",
  "ADA",
  "AERGOU",
  "AEROU",
  "AEVO",
  "AGLD",
  "AI",
  "AI16Z",
  "AIOT",
  "AIXBT",
  "AKT",
  "ALCH",
  "ALGO",
  "ALICE",
  "ALPHA",
  "ALPINE",
  "ALT",
  "ANIME",
  "ANKR",
  "APE",
  "API3",
  "APT",
  "AR",
  "ARB",
  "ARC",
  "ARK",
  "ARKM",
  "ARPA",
  "ASR",
  "ASTR",
  "ATA",
  "ATH",
  "ATOM",
  "AUCTION",
  "AVA",
  "AVAAI",
  "AVAX",
  "AXL",
  "AXS",
  "B2",
  "B3",
  "BABY",
  "BAKE",
  "BAN",
  "BANANA",
  "BANANAS31",
  "BAND",
  "BANK",
  "BB",
  "BCH",
  "BEAMX",
  "BEL",
  "BERA",
  "BICO",
  "BID",
  "BIGTIME",
  "BIO",
  "BLUR",
  "BMT",
  "BNB",
  "BNT",
  "BOME",
  "BONK",
  "BRETT",
  "BROCCOLI714",
  "BROCCOLIF3B",
  "BRUSDT",
  "BSV",
  "BSW",
  "BTC",
  "C98",
  "CAT",
  "CATI",
  "CELO",
  "CELR",
  "CETUS",
  "CFX",
  "CGPT",
  "CHEEMS",
  "CHESS",
  "CHILLGUY",
  "CHR",
  "CHZ",
  "CKB",
  "COMP",
  "COOKIE",
  "COS",
  "COTI",
  "COW",
  "CRV",
  "CTK",
  "CTSI",
  "CYBER",
  "D",
  "DASH",
  "DEEP",
  "DEFI",
  "DEGEN",
  "DEGO",
  "DENT",
  "DEXE",
  "DF",
  "DIA",
  "DODOX",
  "DOGE",
  "DOGS",
  "DOLO",
  "DOT",
  "DRIFT",
  "DUSK",
  "DYDX",
  "DYM",
  "EDU",
  "EGLD",
  "EIGEN",
  "ENA",
  "FLOKI",
  "LUNC",
  "MOG",
  "PEPE",
  "RATS",
  "SATS",
  "SHIB",
  "WHY",
  "X",
  "XEC",
];

const interval = "3m";
const limit = 100;
let cryptosWithData = [];

async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`);
    if (!response.ok) throw new Error(`Symbole invalide : ${symbol}`);
    const data = await response.json();
    return {
      symbol,
      data: data.map(candle => ({
        time: candle[0],
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
        volume: parseFloat(candle[5]),
      }))
    };
  } catch (error) {
    console.warn(`Crypto ignorée : ${symbol} - ${error.message}`);
    return null;
  }
}

function calculateIndicators(crypto) {
  const data = crypto.data;

  // MA20 du volume
  for (let i = 19; i < data.length; i++) {
    let sum = 0;
    for (let j = i - 19; j <= i; j++) sum += data[j].volume;
    data[i].volumeMA20 = sum / 20;
  }

  // RSI
  for (let i = 14; i < data.length; i++) {
    let gains = 0, losses = 0;
    for (let j = i - 13; j <= i; j++) {
      const change = data[j].close - data[j - 1].close;
      change > 0 ? gains += change : losses -= change;
    }
    const rs = (gains / 14) / (losses / 14 || 1);
    data[i].rsi = 100 - (100 / (1 + rs));
  }

  const last = data[data.length - 1];
  const prev1 = data[data.length - 2];
  const prev2 = data[data.length - 3];

  // Zones de support/résistance
  crypto.supportResistance = "-";
  if (last.low > prev1.low && prev1.low < prev2.low) {
    crypto.supportResistance = "🟢 Support";
  } else if (last.high < prev1.high && prev1.high > prev2.high) {
    crypto.supportResistance = "🔴 Résistance";
  }

  // Divergence
  crypto.divergence = "-";
  const rsi1 = prev2.rsi;
  const rsi2 = prev1.rsi;
  const rsi3 = last.rsi;
  if (rsi1 && rsi2 && rsi3) {
    if (prev2.close > prev1.close && prev1.close > last.close &&
        rsi1 < rsi2 && rsi2 < rsi3) {
      crypto.divergence = "📈 Divergence HAUSSIÈRE";
    }
    if (prev2.close < prev1.close && prev1.close < last.close &&
        rsi1 > rsi2 && rsi2 > rsi3) {
      crypto.divergence = "📉 Divergence BAISSIÈRE";
    }
  }

  // Signal d'entrée
  crypto.signal = "HOLD";
  if (last.volume > last.volumeMA20) {
    const rsi = last.rsi;
    if (rsi > 50 && rsi < 70 && last.close > prev1.high) {
      crypto.signal = "LONG";
    } else if (rsi < 50 && rsi > 30 && last.close < prev1.low) {
      crypto.signal = "SHORT";
    }
  }

  // Tendance
  crypto.trend = "-";
  if (last.close > prev1.close && prev1.close > prev2.close) {
    crypto.trend = "HAUSSIÈRE";
  } else if (last.close < prev1.close && prev1.close < prev2.close) {
    crypto.trend = "BAISSIÈRE";
  }

  // ⚠️ Alerte entrée
  crypto.entryAlert = "-";
  if (crypto.signal === "LONG" && (last.rsi < 50 || crypto.supportResistance === "🟢 Support")) {
    crypto.entryAlert = "⚠️ Entrée LONG conseillée";
  }
  if (crypto.signal === "SHORT" && (last.rsi > 50 || crypto.supportResistance === "🔴 Résistance")) {
    crypto.entryAlert = "⚠️ Entrée SHORT conseillée";
  }

  // ⚠️ Détection de sortie
  crypto.exitAlert = "-";
  if (crypto.signal === "LONG" && (last.rsi > 70 || crypto.supportResistance === "🔴 Résistance")) {
    crypto.exitAlert = "⚠️ SORTIE LONG CONSEILLÉE";
  }
  if (crypto.signal === "SHORT" && (last.rsi < 30 || crypto.supportResistance === "🟢 Support")) {
    crypto.exitAlert = "⚠️ SORTIE SHORT CONSEILLÉE";
  }

  return crypto;
}

function updateTable(filter = "ALL") {
  const tableBody = document.getElementById("cryptoTableBody");
  tableBody.innerHTML = "";
  cryptosWithData.forEach(crypto => {
    if (filter !== "ALL" && crypto.signal !== filter) return;
    const lastCandle = crypto.data[crypto.data.length - 1];
    const variation = ((lastCandle.close - lastCandle.open) / lastCandle.open) * 100;

    const row = document.createElement("tr");
    if (crypto.signal === "LONG") row.classList.add("row-long");
    if (crypto.signal === "SHORT") row.classList.add("row-short");

    row.innerHTML = `
      <td>${crypto.symbol}(F)</td>
      <td class="${variation >= 0 ? 'positive' : 'negative'}">${variation.toFixed(2)}%</td>
      <td>${lastCandle.volume.toFixed(2)} (${lastCandle.volumeMA20?.toFixed(2) || 'N/A'})</td>
      <td>${lastCandle.rsi?.toFixed(2) || 'N/A'}</td>
      <td class="signal ${crypto.signal.toLowerCase()}">${crypto.signal}</td>
      <td>${crypto.trend || '-'}</td>
      <td>${crypto.supportResistance}</td>
      <td>${crypto.divergence}</td>
      <td style="color: orange;">${crypto.entryAlert}</td>
      <td style="color: orange;">${crypto.exitAlert}</td>
    `;
    tableBody.appendChild(row);
  });
}

async function main() {
  const results = await Promise.all(cryptos.map(fetchCryptoData));
  cryptosWithData = results.filter(r => r !== null).map(calculateIndicators);
  updateTable();
}

main();
setInterval(main, 60000);



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
