const API_KEY = "c9abb437327a4242ac6af22e70f95f7d";
const SYMBOL = "AED/MAD";

async function chargerLigneAEDMAD() {
  const url = `https://api.twelvedata.com/time_series?symbol=${SYMBOL}&interval=15min&outputsize=9&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const tbody = document.querySelector("#cryptoTable tbody");
  tbody.innerHTML = "";

  if (!data.values || data.values.length < 2) {
    const row = tbody.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 11;
    cell.textContent = "Pas assez de données.";
    return;
  }

  const reversedValues = data.values.slice().reverse();
  const row = tbody.insertRow();
  const pairCell = row.insertCell();
  pairCell.textContent = SYMBOL;

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
      
      // On ne commence à ajouter des symboles qu'à partir de l'item 2 (i >= 1)
      // Et on s'arrête avant l'item 9 (i < 8)
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

  // Ajoute la cellule pour la séquence de symboles (items 2 à 8)
  const symbolCell = row.insertCell();
  symbolCell.textContent = symbolSequence;
  symbolCell.style.fontWeight = "bold";
  symbolCell.style.fontSize = "1.2em";
}

chargerLigneAEDMAD();
setInterval(chargerLigneAEDMAD, 60000);