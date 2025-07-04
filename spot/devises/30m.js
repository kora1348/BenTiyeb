// Liste des devises FIAT reconnues sur Binance
const FIAT_CODES = ["AED", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", 
                    "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KES", 
                    "KRW", "MXN", "NGN", "NOK", "NZD", "PHP", "PLN", "RUB", "SEK", 
                    "SGD", "THB", "TRY", "TWD", "UAH", "USD", "USDC", "USDT", "VND", 
                    "ZAR"];

let ALL_SYMBOLS = [];
let ACTIVE_SYMBOLS = [];

// Fonction pour formater la date et l'heure (JJ/MM/AA HH:MM)
function formatDateTime(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

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
    const cell = row.insertCell();

    let variationText = "";
    let variationClass = "";
    let variationSymbol = "";

    // Pour l'Item 9 (dernier élément), on calcule la variation avec l'élément précédent
    if (i === data.length - 1 && i > 0) {
      const prev = data[i - 1];
      const variation = ((current.close - prev.close) / prev.close) * 100;
      variationText = `(${variation.toFixed(2)}%)`;
      variationClass = variation > 0 ? "positive" : "negative";
      variationSymbol = variation > 0 ? "+" : "-";
    } 
    // Pour les autres items, on calcule la variation avec le suivant
    else if (i < data.length - 1) {
      const next = data[i + 1];
      const variation = ((next.close - current.close) / current.close) * 100;
      variationText = `(${variation.toFixed(2)}%)`;
      variationClass = variation > 0 ? "positive" : "negative";
      variationSymbol = variation > 0 ? "+" : "-";

      // Ajouter le symbole à la séquence (pour les items 2 à 8)
      if (i > 0 && i < 8) {
        symbolSequence += variationSymbol;
      }
    }

    const adjustedTime = new Date(current.time.getTime() + 15 * 60 * 1000);
    const displayText = `${formatDateTime(adjustedTime)} ${variationText}`;
    cell.textContent = displayText;
    if (variationClass) {
      cell.classList.add(variationClass);
    }
  }

  // Ajouter la séquence de tendance (items 2 à 8)
  const symbolCell = row.insertCell();
  symbolCell.style.fontWeight = "bold";
  symbolCell.style.fontSize = "1.2em";
  
  // Créer un span pour chaque caractère avec la couleur appropriée
  symbolSequence.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.color = char === '+' ? 'green' : 'red';
    symbolCell.appendChild(span);
  });

  // Colorer la cellule de tendance en fonction de la majorité
  const positiveCount = (symbolSequence.match(/\+/g) || []).length;
  const negativeCount = (symbolSequence.match(/-/g) || []).length;
  
  if (positiveCount > negativeCount) {
    symbolCell.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
  } else if (negativeCount > positiveCount) {
    symbolCell.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
  }
}

// Fonction principale pour charger toutes les devises
async function chargerToutesDevises() {
  const tbody = document.querySelector("#forexTable tbody");
  tbody.innerHTML = "";
  
  document.getElementById("lastUpdate").textContent = `Dernière mise à jour: ${new Date().toLocaleString()}`;

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