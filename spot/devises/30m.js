// 1. Liste des devises FIAT reconnues
const FIAT_CODES = ["AED", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", 
                    "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KES", 
                    "KRW", "MXN", "NGN", "NOK", "NZD", "PHP", "PLN", "RUB", "SEK", 
                    "SGD", "THB", "TRY", "TWD", "UAH", "USD", "USDC", "USDT", "VND", 
                    "ZAR"];

let ACTIVE_SYMBOLS = [];

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
    
    ACTIVE_SYMBOLS = donnees.symbols
      .filter(symbole => {
        const deviseBase = symbole.baseAsset;
        const deviseQuote = symbole.quoteAsset;
        
        // On garde seulement les paires FIAT/FIAT ou FIAT/USDC
        return (FIAT_CODES.includes(deviseBase) && 
               (FIAT_CODES.includes(deviseQuote) || deviseQuote === "USDC"));
               // Il manquait cette parenthèse fermante ici ----^
      })
      .map(symbole => `${symbole.baseAsset}/${symbole.quoteAsset}`);
    
    console.log("Paires chargées:", ACTIVE_SYMBOLS);
  } catch (erreur) {
    console.error("Erreur de chargement:", erreur);
  }
}

// 5. Récupération des données historiques
async function getDonneesHistoriques(paire, intervalle = '30m', limite = 9) {
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

// 6. Affichage d'une ligne du tableau
async function afficherLigne(paire, donnees, tableau) {
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

    const tempsAjuste = new Date(item.temps.getTime() + 15 * 60 * 1000);
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

// 7. Fonction principale
async function chargerToutesDevises() {
  const tableau = document.querySelector("#forexTable tbody");
  tableau.innerHTML = "";
  
  document.getElementById("lastUpdate").textContent = 
    `Dernière mise à jour: ${new Date().toLocaleString()}`;

  let pairesAffichees = 0;

  for (const paire of ACTIVE_SYMBOLS) {
    try {
      const donnees = await getDonneesHistoriques(paire);
      if (donnees) {
        const affichee = await afficherLigne(paire, donnees, tableau);
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
    cellule.textContent = "Aucune paire récente trouvée";
  }
}

// 8. Lancement de l'application
(async function demarrer() {
  await chargerPairesDisponibles();
  await chargerToutesDevises();
  
  // Actualisation automatique toutes les 15 minutes
  setInterval(chargerToutesDevises, 15 * 60 * 1000);
})();