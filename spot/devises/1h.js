const API_KEY = "c9abb437327a4242ac6af22e70f95f7d";
const SYMBOLS = ["AED/MAD", "AED/EUR", "AED/GBP", "AED/KRW", "AED/SEK", "AED/TRY"]; // Tableau des paires à suivre

async function chargerDonneesDevise(symbol) {
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1h&outputsize=9&apikey=${API_KEY}`;
  const res = await fetch(url);
  return await res.json();
}

async function afficherLigneDevise(symbol, data, tbody) {
  if (!data.values || data.values.length < 2) {
    const row = tbody.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 11;
    cell.textContent = `Pas assez de données pour ${symbol}`;
    return;
  }

  const reversedValues = data.values.slice().reverse();
  const row = tbody.insertRow();
  const pairCell = row.insertCell();
  pairCell.textContent = symbol;

  let symbolSequence = "";

  for (let i = 0; i < reversedValues.length; i++) {
    const current = reversedValues[i];
    const previous = reversedValues[i - 1];
    const cell = row.insertCell();

    let variationText = "(N/A)";
    let variationClass = "";
    let variationSymbol = "";

    if (previous) {
      const variation = ((current.close - previous.close) / previous.close) * 100;
      variationText = `(${variation.toFixed(2)}%)`;
      variationClass = variation > 0 ? "positive" : "negative";
      
      if (i >= 1 && i < 8) {
        variationSymbol = variation > 0 ? "+" : "-";
        symbolSequence += variationSymbol;
      }
    }

    const displayText = `${current.datetime} ${variationText}`;
    cell.textContent = displayText;
    if (variationClass) {
      cell.classList.add(variationClass);
    }
  }

  const symbolCell = row.insertCell();
  symbolCell.textContent = symbolSequence;
  symbolCell.style.fontWeight = "bold";
  symbolCell.style.fontSize = "1.2em";
}

async function chargerToutesDevises() {
  const tbody = document.querySelector("#cryptoTable tbody");
  tbody.innerHTML = "";

  for (const symbol of SYMBOLS) {
    const data = await chargerDonneesDevise(symbol);
    await afficherLigneDevise(symbol, data, tbody);
  }
}

chargerToutesDevises();
setInterval(chargerToutesDevises, 60000);