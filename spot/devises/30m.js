 // Liste des devises FIAT reconnues sur Binance
    const FIAT_CODES = ["AED", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", 
                        "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KES", 
                        "KRW", "MXN", "NGN", "NOK", "NZD", "PHP", "PLN", "RUB", "SEK", 
                        "SGD", "THB", "TRY", "TWD", "UAH", "USD", "USDC", "USDT", "VND", 
                        "ZAR"];

    let ALL_SYMBOLS = [];
    let ACTIVE_SYMBOLS = [];

    // Fonction pour récupérer toutes les paires FIAT/FIAT et FIAT/USDC disponibles
    async function chargerPairesFiat() {
      try {
        const res = await fetch("https://api.binance.com/api/v3/exchangeInfo");
        const data = await res.json();
        
        ALL_SYMBOLS = data.symbols
          .filter(s => {
            const quote = s.quoteAsset;
            const base = s.baseAsset;
            
            // Inclure les paires FIAT/FIAT et FIAT/USDC
            return (FIAT_CODES.includes(base) && FIAT_CODES.includes(quote)) ||
                   (FIAT_CODES.includes(base) && quote === "USDC");
          })
          .map(s => `${s.baseAsset}/${s.quoteAsset}`);
          
        // Filtrer pour ne garder que les paires intéressantes
        ACTIVE_SYMBOLS = ALL_SYMBOLS.filter(pair => {
          const [base, quote] = pair.split('/');
          return true;
        });
        
        console.log("Paires disponibles:", ACTIVE_SYMBOLS);
      } catch (error) {
        console.error("Erreur lors du chargement des paires:", error);
      }
    }

    // Fonction pour récupérer les données historiques depuis Binance
    async function getHistoricalData(pair, interval = '15m', limit = 9) {
      try {
        const [base, quote] = pair.split('/');
        const symbol = `${base}${quote}`;
        
        const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
        const data = await res.json();
        
        return data.map(item => {
          return {
            time: new Date(item[0]),
            open: parseFloat(item[1]),
            close: parseFloat(item[4])
          };
        });
      } catch (error) {
        console.error(`Erreur pour la paire ${pair}:`, error);
        return null;
      }
    }

    // Fonction pour formater l'heure
    function formatTime(date) {
      return date.toTimeString().substring(0, 5);
    }

    // Fonction pour afficher une ligne de données
    async function afficherLigneDevise(pair, data, tbody) {
      if (!data || data.length < 2) {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 11;
        cell.textContent = `Données insuffisantes pour ${pair}`;
        return;
      }

      const row = tbody.insertRow();
      const pairCell = row.insertCell();
      pairCell.textContent = pair;

      let symbolSequence = "";

      // Afficher les données du plus ancien au plus récent (de gauche à droite)
      for (let i = 0; i < data.length; i++) {
        const current = data[i];
        const next = data[i + 1];
        const cell = row.insertCell();

        let variationText = "(N/A)";
        let variationClass = "";
        let variationSymbol = "";

        if (next) {
          const variation = ((next.close - current.close) / current.close) * 100;
          variationText = `(${variation.toFixed(2)}%)`;
          variationClass = variation > 0 ? "positive" : "negative";
          variationSymbol = variation > 0 ? "+" : "-";

          // Ajouter le symbole à la séquence (sauf pour le dernier élément)
          if (i < data.length - 1) {
            symbolSequence += variationSymbol;
          }
        }

        const adjustedTime = new Date(current.time.getTime() + 15 * 60 * 1000);
        const displayText = `${formatTime(adjustedTime)} ${variationText}`;
        cell.textContent = displayText;
        if (variationClass) {
          cell.classList.add(variationClass);
        }
      }

      // Ajouter la séquence de tendance (de Item 2 à Item 8)
      const trendSequence = symbolSequence.substring(0, 7); // Prend les 7 premiers caractères (Item 2 à 8)
      const symbolCell = row.insertCell();
      symbolCell.textContent = trendSequence;
      symbolCell.style.fontWeight = "bold";
      symbolCell.style.fontSize = "1.2em";
      
      // Colorer la cellule de tendance en fonction de la majorité
      const positiveCount = (trendSequence.match(/\+/g) || []).length;
      const negativeCount = (trendSequence.match(/-/g) || []).length;
      
      if (positiveCount > negativeCount) {
        symbolCell.style.color = "green";
      } else if (negativeCount > positiveCount) {
        symbolCell.style.color = "red";
      }
    }

    // Fonction principale pour charger toutes les devises
    async function chargerToutesDevises() {
      const tbody = document.querySelector("#forexTable tbody");
      tbody.innerHTML = "";
      
      document.getElementById("lastUpdate").textContent = `Dernière mise à jour: ${new Date().toLocaleTimeString()}`;

      for (const pair of ACTIVE_SYMBOLS) {
        try {
          const data = await getHistoricalData(pair);
          if (data) {
            await afficherLigneDevise(pair, data, tbody);
          }
        } catch (error) {
          console.error(`Erreur avec la paire ${pair}:`, error);
        }
      }
    }

    // Initialisation
    (async () => {
      await chargerPairesFiat();
      await chargerToutesDevises();
      
      // Actualisation automatique toutes les 15 minutes
      setInterval(chargerToutesDevises, 15 * 60 * 1000);
    })();