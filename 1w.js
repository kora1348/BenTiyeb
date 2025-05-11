 // Liste des cryptomonnaies (paires USDT disponibles sur Binance)
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

    // Configuration de base
    let interval = "1w"; // 1d=daily, 1w=weekly, 1M=monthly
    const limit = 100;   // Nombre de bougies à récupérer
    let cryptosWithData = []; // Stockage des données
    let currentDate = null;   // Pour le mode historique

    // 1. Fonction principale qui lance tout
    async function main() {
      showLoading();
      
      try {
        // Met à jour la date d'affichage
        const now = new Date();
        document.getElementById("currentDate").textContent = now.toLocaleDateString('fr-FR');
        document.getElementById("heure").textContent = now.toLocaleTimeString('fr-FR');
        
        // Récupère les données pour toutes les cryptos
        const results = await Promise.all(
          cryptos.map(symbol => fetchCryptoData(symbol))
        );
        
        // Filtre et calcule les indicateurs
        cryptosWithData = results
          .filter(r => r !== null && r.data.length >= 20)
          .map(calculateIndicators)
          .filter(c => c !== null);
        
        // Met à jour le tableau
        updateTable();
        
      } catch (error) {
        showError("Erreur : " + error.message);
      }
    }

    // 2. Affiche un message de chargement
    function showLoading() {
      const tableBody = document.getElementById("cryptoTableBody");
      if (tableBody) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Chargement des données...</td></tr>';
      }
    }

    // 3. Affiche les erreurs
    function showError(message) {
      const tableBody = document.getElementById("cryptoTableBody");
      if (tableBody) {
        tableBody.innerHTML = `<tr><td colspan="7" style="color: red; text-align: center;">${message}</td></tr>`;
      }
      console.error(message);
    }

    // 4. Récupère les données d'une crypto
    async function fetchCryptoData(symbol) {
      try {
        // Construction de l'URL
        let url = `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`;
        
        // Ajoute la date si mode historique
        if (currentDate) {
          const endDate = new Date(currentDate);
          endDate.setUTCHours(23, 59, 59, 999);
          url += `&endTime=${endDate.getTime()}`;
        }
        
        // Requête à l'API Binance
        const response = await fetch(url);
        if (!response.ok) throw new Error("API non disponible");
        
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("Pas de données");
        
        // Formatage des données
        return {
          symbol,
          data: data.map(c => ({
            time: c[0],
            open: parseFloat(c[1]),
            high: parseFloat(c[2]),
            low: parseFloat(c[3]),
            close: parseFloat(c[4]),
            volume: parseFloat(c[5])
          }))
        };
        
      } catch (error) {
        console.warn(`Problème avec ${symbol}: ${error.message}`);
        return null;
      }
    }

    // 5. Calcule tous les indicateurs
    function calculateIndicators(crypto) {
      const data = crypto.data;
      
      // Moyenne Mobile Volume (20 périodes)
      for (let i = 19; i < data.length; i++) {
        let sum = 0;
        for (let j = i - 19; j <= i; j++) sum += data[j].volume;
        data[i].volumeMA20 = sum / 20;
      }
      
      // RSI (14 périodes)
      for (let i = 14; i < data.length; i++) {
        let gains = 0, losses = 0;
        for (let j = i - 13; j <= i; j++) {
          const change = data[j].close - data[j - 1].close;
          if (change > 0) gains += change;
          else losses -= change;
        }
        const rs = gains / 14 / (losses / 14 || 1);
        data[i].rsi = 100 - 100 / (1 + rs);
      }
      
      // Dernières bougies
      const last = data[data.length - 1];
      const prev1 = data[data.length - 2];
      const prev2 = data[data.length - 3];
      
      // Support/Résistance
      crypto.supportResistance = "-";
      if (last.low > prev1.low && prev1.low < prev2.low) {
        crypto.supportResistance = "🟢 Support";
      } else if (last.high < prev1.high && prev1.high > prev2.high) {
        crypto.supportResistance = "🔴 Résistance";
      }
      
      // Divergence
      crypto.divergence = "-";
      if (prev2.rsi && prev1.rsi && last.rsi) {
        if (prev2.close > prev1.close && prev1.close > last.close && 
            prev2.rsi < prev1.rsi && prev1.rsi < last.rsi) {
          crypto.divergence = "📈 Hausse";
        }
        if (prev2.close < prev1.close && prev1.close < last.close && 
            prev2.rsi > prev1.rsi && prev1.rsi > last.rsi) {
          crypto.divergence = "📉 Baisse";
        }
      }
      
      // Signal
      crypto.signal = "HOLD";
      if (last.volume > last.volumeMA20) {
        if (last.rsi > 50 && last.close > prev1.high) {
          crypto.signal = "LONG";
        } else if (last.rsi < 50 && last.close < prev1.low) {
          crypto.signal = "SHORT";
        }
      }
      
      return crypto;
    }

    // 6. Met à jour le tableau HTML
    function updateTable(filter = "ALL") {
      const tableBody = document.getElementById("cryptoTableBody");
      if (!tableBody) return;
      
      tableBody.innerHTML = "";
      
      // Met à jour le titre selon la période
      const title = document.getElementById("mainTitle");
      if (title) {
        let periodText = "";
        if (interval === "1d") periodText = "Journalier";
        else if (interval === "1w") periodText = "Hebdomadaire";
        else if (interval === "1M") periodText = "Mensuel";
        
        title.textContent = currentDate
          ? `Trading ${periodText} (${new Date(currentDate).toLocaleDateString('fr-FR')})`
          : `Trading ${periodText} - Live`;
      }
      
      // Remplit le tableau
      cryptosWithData.forEach(crypto => {
        if (filter !== "ALL" && crypto.signal !== filter) return;
        
        const last = crypto.data[crypto.data.length - 1];
        const change = ((last.close - last.open) / last.open) * 100;
        
        const row = document.createElement("tr");
        if (crypto.signal === "LONG") row.classList.add("row-long");
        if (crypto.signal === "SHORT") row.classList.add("row-short");
        
        row.innerHTML = `
          <td>${crypto.symbol}</td>
          <td class="${change >= 0 ? "positive" : "negative"}">${change.toFixed(2)}%</td>
          <td>${last.volume.toFixed(0)} (${last.volumeMA20?.toFixed(0) || "-"})</td>
          <td>${last.rsi?.toFixed(0) || "-"}</td>
          <td class="signal ${crypto.signal.toLowerCase()}">${crypto.signal}</td>
          <td>${crypto.supportResistance}</td>
          <td>${crypto.divergence}</td>
        `;
        tableBody.appendChild(row);
      });
    }

    // 7. Change la période (1d, 1w ou 1M)
    function changeTimeframe() {
      const select = document.getElementById("timeframe");
      if (select) {
        interval = select.value;
        main();
      }
    }

    // 8. Charge les données historiques
    function loadHistoricalData() {
      const input = document.getElementById("historicalDate");
      if (input && input.value) {
        currentDate = new Date(input.value);
        main();
      }
    }

    // 9. Reset à la date actuelle
    function resetToCurrent() {
      currentDate = null;
      const input = document.getElementById("historicalDate");
      if (input) input.value = "";
      main();
    }

    // Lance l'application quand la page est prête
    document.addEventListener("DOMContentLoaded", () => {
      // Initialisation
      main();
      
      // Actualise l'heure toutes les secondes
      setInterval(() => {
        const timeElement = document.getElementById("heure");
        if (timeElement) {
          timeElement.textContent = new Date().toLocaleTimeString("fr-FR");
        }
      }, 1000);
      
      // Actualise les données toutes les 5 minutes
      setInterval(main, 300000);
    });