// Liste des cryptos à analyser
const cryptos = [
  "ADA", "ARB", "AVAX", "BCH", "BNB", "BOME", "BONK", "BTC", "CRV", "DOGE",
  "ENA", "ETH", "ETHFI", "FIL", "HBAR", "IP", "KAITO", "LINK", "LTC", "NEAR",
  "NEO", "ORDI", "PEPE", "PNUT", "SHIB", "SOL", "SUI", "TIA", "TRUMP", "WIF",
  "WLD", "XRP", "TST",
];

const interval = "1d"; // Intervalle des données (1 jour)
const limit = 100;     // Nombre de points de données à récupérer
let cryptosWithData = []; // Stocke les données des cryptos
let currentDate = null;   // Pour stocker la date historique sélectionnée

// Fonction principale - Récupère les données et met à jour le tableau
async function main() {
  // Afficher un indicateur de chargement
  document.getElementById("cryptoTableBody").innerHTML = 
    '<tr><td colspan="10" style="text-align: center;">Chargement en cours...</td></tr>';
  
  // Récupère les données pour toutes les cryptos
  const results = await Promise.all(cryptos.map(fetchCryptoData));
  
  // Filtre les cryptos valides et calcule les indicateurs
  cryptosWithData = results.filter(r => r !== null).map(calculateIndicators);
  
  // Met à jour le tableau
  updateTable();
}

// Récupère les données d'une crypto depuis l'API Binance
async function fetchCryptoData(symbol) {
  try {
    // Construit l'URL avec les paramètres
    let url = `https://api.binance.com/api/v3/klines?symbol=${symbol}USDC&interval=${interval}&limit=${limit}`;
    
    // Si une date historique est sélectionnée, on l'ajoute aux paramètres
    if (currentDate) {
      url += `&endTime=${currentDate.getTime() + 86400000}`; // +1 jour pour inclure la date
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Symbole invalide : ${symbol}`);
    
    const data = await response.json();
    return {
      symbol,
      data: data.map((candle) => ({
        time: candle[0],         // Timestamp
        open: parseFloat(candle[1]),  // Prix d'ouverture
        high: parseFloat(candle[2]),  // Prix le plus haut
        low: parseFloat(candle[3]),   // Prix le plus bas
        close: parseFloat(candle[4]), // Prix de clôture
        volume: parseFloat(candle[5])  // Volume
      }))
    };
  } catch (error) {
    console.warn(`Crypto ignorée : ${symbol} - ${error.message}`);
    return null;
  }
}

// Calcule tous les indicateurs techniques pour une crypto
function calculateIndicators(crypto) {
  const data = crypto.data;

  // 1. Calcul de la moyenne mobile du volume (20 périodes)
  for (let i = 19; i < data.length; i++) {
    let sum = 0;
    for (let j = i - 19; j <= i; j++) sum += data[j].volume;
    data[i].volumeMA20 = sum / 20;
  }

  // 2. Calcul du RSI (14 périodes)
  for (let i = 14; i < data.length; i++) {
    let gains = 0, losses = 0;
    for (let j = i - 13; j <= i; j++) {
      const change = data[j].close - data[j - 1].close;
      change > 0 ? (gains += change) : (losses -= change);
    }
    const rs = gains / 14 / (losses / 14 || 1);
    data[i].rsi = 100 - 100 / (1 + rs);
  }

  // Récupère les 3 dernières bougies
  const last = data[data.length - 1];
  const prev1 = data[data.length - 2];
  const prev2 = data[data.length - 3];

  // 3. Détection des supports/résistances
  crypto.supportResistance = "-";
  if (last.low > prev1.low && prev1.low < prev2.low) {
    crypto.supportResistance = "🟢 Support";
  } else if (last.high < prev1.high && prev1.high > prev2.high) {
    crypto.supportResistance = "🔴 Résistance";
  }

  // 4. Détection des divergences RSI/prix
  crypto.divergence = "-";
  if (prev2.rsi && prev1.rsi && last.rsi) {
    // Divergence haussière (prix baisse mais RSI monte)
    if (prev2.close > prev1.close && prev1.close > last.close && 
        prev2.rsi < prev1.rsi && prev1.rsi < last.rsi) {
      crypto.divergence = "📈 Divergence HAUSSIÈRE";
    }
    // Divergence baissière (prix monte mais RSI baisse)
    if (prev2.close < prev1.close && prev1.close < last.close && 
        prev2.rsi > prev1.rsi && prev1.rsi > last.rsi) {
      crypto.divergence = "📉 Divergence BAISSIÈRE";
    }
  }

  // 5. Génération des signaux
  crypto.signal = "HOLD";
  if (last.volume > last.volumeMA20) {
    const rsi = last.rsi;
    // Signal LONG si RSI entre 50-70 et clôture au-dessus du high précédent
    if (rsi > 50 && rsi < 70 && last.close > prev1.high) {
      crypto.signal = "LONG";
    } 
    // Signal SHORT si RSI entre 30-50 et clôture en-dessous du low précédent
    else if (rsi < 50 && rsi > 30 && last.close < prev1.low) {
      crypto.signal = "SHORT";
    }
  }

  // 6. Détection de la tendance
  crypto.trend = "-";
  if (last.close > prev1.close && prev1.close > prev2.close) {
    crypto.trend = "HAUSSIÈRE";
  } else if (last.close < prev1.close && prev1.close < prev2.close) {
    crypto.trend = "BAISSIÈRE";
  }

  // 7. Alertes d'entrée
  crypto.entryAlert = "-";
  if (crypto.signal === "LONG" && (last.rsi < 50 || crypto.supportResistance === "🟢 Support")) {
    crypto.entryAlert = "⚠️ Entrée LONG conseillée";
  }
  if (crypto.signal === "SHORT" && (last.rsi > 50 || crypto.supportResistance === "🔴 Résistance")) {
    crypto.entryAlert = "⚠️ Entrée SHORT conseillée";
  }

  // 8. Alertes de sortie
  crypto.exitAlert = "-";
  if (crypto.signal === "LONG" && (last.rsi > 70 || crypto.supportResistance === "🔴 Résistance")) {
    crypto.exitAlert = "⚠️ SORTIE LONG CONSEILLÉE";
  }
  if (crypto.signal === "SHORT" && (last.rsi < 30 || crypto.supportResistance === "🟢 Support")) {
    crypto.exitAlert = "⚠️ SORTIE SHORT CONSEILLÉE";
  }

  return crypto;
}

// Met à jour le tableau HTML avec les données
function updateTable(filter = "ALL") {
  const tableBody = document.getElementById("cryptoTableBody");
  tableBody.innerHTML = "";
  
  // Met à jour le titre avec la date si historique
  const title = document.querySelector("h2");
  if (currentDate) {
    const dateStr = currentDate.toLocaleDateString('fr-FR');
    title.textContent = `Trading - Historique (${dateStr})`;
  } else {
    title.textContent = "Trading - 2 heures (normal)";
    document.getElementById("heure").textContent = new Date().toLocaleString('fr-FR');
  }
  
  // Parcours toutes les cryptos et crée les lignes du tableau
  cryptosWithData.forEach((crypto) => {
    // Filtre selon le type de signal si besoin
    if (filter !== "ALL" && crypto.signal !== filter) return;
    
    const lastCandle = crypto.data[crypto.data.length - 1];
    const variation = ((lastCandle.close - lastCandle.open) / lastCandle.open) * 100;
    
    const row = document.createElement("tr");
    // Ajoute une classe CSS selon le signal
    if (crypto.signal === "LONG") row.classList.add("row-long");
    if (crypto.signal === "SHORT") row.classList.add("row-short");
    
    // Remplit la ligne avec les données
    row.innerHTML = `
      <td>${crypto.symbol}(F)</td>
      <td class="${variation >= 0 ? "positive" : "negative"}">${variation.toFixed(2)}%</td>
      <td>${lastCandle.volume.toFixed(2)} (${lastCandle.volumeMA20?.toFixed(2) || "N/A"})</td>
      <td>${lastCandle.rsi?.toFixed(2) || "N/A"}</td>
      <td class="signal ${crypto.signal.toLowerCase()}">${crypto.signal}</td>
      <td>${crypto.trend || "-"}</td>
      <td>${crypto.supportResistance}</td>
      <td>${crypto.divergence}</td>
      <td style="color: orange;">${crypto.entryAlert}</td>
      <td style="color: orange;">${crypto.exitAlert}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Charge les données pour une date historique
function loadHistoricalData() {
  const dateInput = document.getElementById('historicalDate');
  if (!dateInput.value) return;
  
  currentDate = new Date(dateInput.value);
  main(); // Relance le chargement des données avec la nouvelle date
}

// Réinitialise à la date actuelle
function resetToCurrent() {
  currentDate = null;
  document.getElementById('historicalDate').value = '';
  main();
}

// Lance l'application
main();
// Actualise toutes les minutes
setInterval(main, 60000);

