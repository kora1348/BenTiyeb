// =============================================
// PARTIE COMMUNE
// =============================================

// 1. Fonction pour mettre à jour l'heure
function mettreAJourHeure() {
  const elementHeure = document.getElementById("heure");
  const maintenant = new Date();
  
  const heures = maintenant.getHours().toString().padStart(2, '0');
  const minutes = maintenant.getMinutes().toString().padStart(2, '0');
  const secondes = maintenant.getSeconds().toString().padStart(2, '0');
  
  elementHeure.innerHTML = `Heure actuelle: ${heures}:${minutes}:${secondes}`;
}

// Mise à jour de l'heure toutes les secondes
setInterval(mettreAJourHeure, 1000);
mettreAJourHeure();

// Mise à jour de la date de dernière actualisation
function updateLastUpdate() {
  document.getElementById("lastUpdate").textContent = 
    `Dernière mise à jour: ${new Date().toLocaleString()}`;
}

// =============================================
// PARTIE FOREX
// =============================================

// 1. Liste des devises FIAT reconnues
const FIAT_CODES = ["AED", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", 
                    "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KES", 
                    "KRW", "MXN", "NGN", "NOK", "NZD", "PHP", "PLN", "RUB", "SEK", 
                    "SGD", "THB", "TRY", "TWD", "UAH", "USD", "USDC", "USDT", "VND", 
                    "ZAR"];

let ACTIVE_FOREX_SYMBOLS = [];

// 2. Fonction pour vérifier si une date est aujourd'hui
function estAujourdhui(date) {
  const aujourdhui = new Date();
  return date.getDate() === aujourdhui.getDate() && 
         date.getMonth() === aujourdhui.getMonth() && 
         date.getFullYear() === aujourdhui.getFullYear();
}

// 3. Formatage de la date (JJ/MM/AA HH:MM)
function formaterDateHeure(date) {
  const jour = String(date.getDate()).padStart(2, '0');
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const annee = String(date.getFullYear()).slice(-2);
  const heures = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${jour}/${mois}/${annee} ${heures}:${minutes}`;
}

// 4. Chargement des paires disponibles sur Binance
async function chargerPairesDisponibles() {
  try {
    const reponse = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    const donnees = await reponse.json();
    
    ACTIVE_FOREX_SYMBOLS = donnees.symbols
      .filter(symbole => {
        const deviseBase = symbole.baseAsset;
        const deviseQuote = symbole.quoteAsset;
        
        // On garde seulement les paires FIAT/FIAT ou FIAT/USDC
        return (FIAT_CODES.includes(deviseBase) && 
               (FIAT_CODES.includes(deviseQuote) || deviseQuote === "USDC"));
      })
      .map(symbole => `${symbole.baseAsset}/${symbole.quoteAsset}`);
    
    console.log("Paires Forex chargées:", ACTIVE_FOREX_SYMBOLS);
  } catch (erreur) {
    console.error("Erreur de chargement Forex:", erreur);
  }
}

// 5. Récupération des données historiques Forex
async function getDonneesHistoriquesForex(paire, intervalle = '30m', limite = 9) {
  try {
    const [base, quote] = paire.split('/');
    const symbole = `${base}${quote}`;
    
    const reponse = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbole}&interval=${intervalle}&limit=${limite}`
    );
    const donnees = await reponse.json();
    
    return donnees.map(item => ({
      temps: new Date(item[0]),
      open: parseFloat(item[1]),
      close: parseFloat(item[4])
    }));
  } catch (erreur) {
    console.error(`Erreur pour ${paire}:`, erreur);
    return null;
  }
}

// 6. Affichage d'une ligne du tableau Forex
async function afficherLigneForex(paire, donnees, tableau) {
  if (!donnees || donnees.length < 2) return false;

  // Vérification si les données sont à jour
  const dernierItem = donnees[donnees.length - 1].temps;
  if (!estAujourdhui(dernierItem)) return false;

  const ligne = tableau.insertRow();
  const cellulePaire = ligne.insertCell();
  cellulePaire.textContent = paire;

  let sequenceTendance = "";

  // Parcours des 9 items
  for (let i = 0; i < donnees.length; i++) {
    const item = donnees[i];
    const cellule = ligne.insertCell();

    let texteVariation = "";
    let classeVariation = "";
    let symboleVariation = "";

    // Calcul de la variation
    if (i === donnees.length - 1 && i > 0) {
      // Pour le dernier item (Item 9), on compare avec l'Item 8
      const precedent = donnees[i - 1];
      const variation = ((item.close - precedent.close) / precedent.close) * 100;
      texteVariation = `(${variation.toFixed(2)}%)`;
      classeVariation = variation > 0 ? "positive" : "negative";
      symboleVariation = variation > 0 ? "+" : "-";
    } else if (i < donnees.length - 1) {
      // Pour les autres items, on compare avec l'item suivant
      const suivant = donnees[i + 1];
      const variation = ((suivant.close - item.close) / item.close) * 100;
      texteVariation = `(${variation.toFixed(2)}%)`;
      classeVariation = variation > 0 ? "positive" : "negative";
      symboleVariation = variation > 0 ? "+" : "-";

      // Construction de la séquence de tendance (items 2 à 8)
      if (i > 0 && i < 8) {
        sequenceTendance += symboleVariation;
      }
    }

    const tempsAjuste = new Date(item.temps.getTime() + 60 * 60 * 1000);
    cellule.textContent = `${formaterDateHeure(tempsAjuste)} ${texteVariation}`;
    if (classeVariation) cellule.classList.add(classeVariation);
  }

  // Affichage de la tendance
  const celluleTendance = ligne.insertCell();
  celluleTendance.style.fontWeight = "bold";

  sequenceTendance.split('').forEach(symbole => {
    const span = document.createElement('span');
    span.textContent = symbole;
    span.style.color = symbole === '+' ? 'green' : 'red';
    celluleTendance.appendChild(span);
  });

  return true;
}

// 7. Fonction principale Forex
async function chargerToutesDevises() {
  const tableau = document.querySelector("#forexTable tbody");
  tableau.innerHTML = "";
  
  updateLastUpdate();

  let pairesAffichees = 0;

  for (const paire of ACTIVE_FOREX_SYMBOLS) {
    try {
      const donnees = await getDonneesHistoriquesForex(paire);
      if (donnees) {
        const affichee = await afficherLigneForex(paire, donnees, tableau);
        if (affichee) pairesAffichees++;
      }
    } catch (erreur) {
      console.error(`Erreur avec ${paire}:`, erreur);
    }
  }

  if (pairesAffichees === 0) {
    const ligne = tableau.insertRow();
    const cellule = ligne.insertCell();
    cellule.colSpan = 11;
    cellule.textContent = "Aucune paire Forex récente trouvée";
  }
}

// =============================================
// PARTIE CRYPTO
// =============================================

let ALL_CRYPTO_SYMBOLS = [];

// 1. Chargement des paires crypto disponibles
async function fetchAllCryptoSymbols() {
  const url = 'https://api.binance.com/api/v3/exchangeInfo';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const activeSymbols = data.symbols.filter(s => s.status === 'TRADING');
    const filtered = activeSymbols.filter(s =>
      ['ETH'].includes(s.quoteAsset)
    );
    return filtered.map(s => ({
      base: s.baseAsset,
      quote: s.quoteAsset,
      symbol: s.symbol
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des symboles crypto:", error);
    return [];
  }
}

// 2. Récupération des données crypto
async function fetchCryptoData(symbol, base, quote) {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=30m&limit=7`);
    const data = await response.json();

    if (data.length !== 7) return;

    let totalVariation = 0;
    const tbody = document.querySelector("#cryptoTable tbody");
    const row = document.createElement("tr");
    row.id = symbol;

    const labelCell = document.createElement("td");
    labelCell.textContent = `${base}/${quote}`;
    row.appendChild(labelCell);

    let motif = '';

    for (let i = 0; i < 7; i++) {
      const open = parseFloat(data[i][1]);
      const close = parseFloat(data[i][4]);
      const variation = ((close - open) / open) * 100;
      const cell = document.createElement("td");
      const val = variation.toFixed(2);
      cell.textContent = `${val}%`;

      if (variation > 0) {
        cell.classList.add("positive");
        motif += '+';
      } else if (variation < 0) {
        cell.classList.add("negative");
        motif += '-';
      } else {
        motif += '0';
      }

      row.appendChild(cell);
      totalVariation += variation;
    }

    row.setAttribute('data-motif', motif);

    const totalCell = document.createElement("td");
    totalCell.textContent = `${totalVariation.toFixed(2)}%`;
    totalCell.style.textAlign = "center";
    if (totalVariation > 0) {
      totalCell.classList.add("positive");
    } else {
      totalCell.classList.add("negative");
    }
    row.appendChild(totalCell);

    tbody.appendChild(row);
  } catch (err) {
    console.error(`Erreur pour ${symbol} :`, err);
  }
}

// 3. Chargement de toutes les cryptos
async function loadAllCryptos() {
  document.querySelector("#cryptoTable tbody").innerHTML = '';
  document.getElementById("resultCount").textContent = 'Chargement...';
  updateLastUpdate();

  ALL_CRYPTO_SYMBOLS = await fetchAllCryptoSymbols();

  for (let { symbol, base, quote } of ALL_CRYPTO_SYMBOLS) {
    await fetchCryptoData(symbol, base, quote);
  }

  const loadedCount = document.querySelectorAll("#cryptoTable tbody tr").length;
  document.getElementById("resultCount").textContent = `${loadedCount} paires crypto chargées`;
}

// 4. Filtrage par motif
function filterPattern() {
  const pattern = document.getElementById("patternInput").value.trim();
  if (pattern.length !== 7 || !/^[+-]+$/.test(pattern)) {
    alert("Veuillez entrer exactement 7 caractères (+ ou -).");
    return;
  }

  let count = 0;
  document.querySelectorAll("#cryptoTable tbody tr").forEach(row => {
    const motif = row.getAttribute('data-motif');
    if (motif === pattern) {
      row.style.display = '';
      count++;
    } else {
      row.style.display = 'none';
    }
  });

  document.getElementById("resultCount").textContent = `${count} résultat(s) trouvé(s)`;
}

// 5. Réinitialisation du tableau crypto
function resetCryptoTable() {
  document.querySelectorAll("#cryptoTable tbody tr").forEach(row => {
    row.style.display = '';
  });
  document.getElementById("resultCount").textContent = '';
}

// =============================================
// PARTIE CORRESPONDANCE FOREX-CRYPTO
// =============================================

let savedPatterns = [];

// 1. Récupérer toutes les tendances Forex
function getAllForexTrends() {
  const trends = [];
  document.querySelectorAll("#forexTable tbody tr").forEach(row => {
    const trendCell = row.cells[row.cells.length - 1];
    let trend = '';
    trendCell.querySelectorAll('span').forEach(span => {
      trend += span.textContent;
    });
    if (trend.length === 7) {
      trends.push({
        pair: row.cells[0].textContent,
        trend: trend
      });
    }
  });
  return trends;
}

// 2. Filtrer les cryptos avec les tendances Forex
function filterCryptoWithForexTrends() {
  const forexTrends = getAllForexTrends();
  const cryptoRows = document.querySelectorAll("#cryptoTable tbody tr");
  let matches = [];

  forexTrends.forEach(forex => {
    cryptoRows.forEach(row => {
      const cryptoPattern = row.getAttribute('data-motif');
      if (cryptoPattern === forex.trend) {
        matches.push({
          forexPair: forex.pair,
          forexTrend: forex.trend,
          cryptoPair: row.cells[0].textContent,
          cryptoPattern: cryptoPattern
        });
        row.style.backgroundColor = '#fffacd';
      } else {
        row.style.backgroundColor = '';
      }
    });
  });

  savedPatterns = matches;
  displayMatches();
  return matches;
}

// 3. Afficher les correspondances trouvées
function displayMatches() {
  const matchTable = document.querySelector("#matchTable tbody");
  matchTable.innerHTML = "";

  if (savedPatterns.length === 0) {
    const row = matchTable.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 4;
    cell.textContent = "Aucune correspondance trouvée.";
    return;
  }

  savedPatterns.forEach(match => {
    const row = matchTable.insertRow();

    const forexCell = row.insertCell();
    forexCell.textContent = match.forexPair;

    const trendCell = row.insertCell();
    trendCell.innerHTML = match.forexTrend
      .split('')
      .map(s => `<span style="color:${s === '+' ? 'green' : 'red'}">${s}</span>`)
      .join('');

    const cryptoCell = row.insertCell();
    cryptoCell.textContent = match.cryptoPair;

    const motifCell = row.insertCell();
    motifCell.innerHTML = match.cryptoPattern
      .split('')
      .map(s => `<span style="color:${s === '+' ? 'green' : 'red'}">${s}</span>`)
      .join('');
  });
}


// 4. Bouton pour lancer la recherche de correspondances
function addMatchButton() {
  const filterControls = document.getElementById("filterControls");
  const matchButton = document.createElement("button");
  matchButton.id = "matchButton";
  matchButton.textContent = "Trouver correspondances Forex-Crypto";
  matchButton.style.marginLeft = "10px";
  matchButton.addEventListener("click", filterCryptoWithForexTrends);
  filterControls.appendChild(matchButton);
}

// Ajouter le bouton au chargement
document.addEventListener("DOMContentLoaded", addMatchButton);

// =============================================
// INITIALISATION
// =============================================

// Écouteurs d'événements
document.getElementById("filterButton").addEventListener("click", filterPattern);
document.getElementById("resetButton").addEventListener("click", resetCryptoTable);

// Lancement de l'application
(async function demarrer() {
  await chargerPairesDisponibles();
  await chargerToutesDevises();
  await loadAllCryptos();
  
  // Actualisation automatique toutes les 15 minutes
  setInterval(() => {
    chargerToutesDevises();
    loadAllCryptos();
  }, 15 * 60 * 1000);
})();