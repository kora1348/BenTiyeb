const API_KEY = "c9abb437327a4242ac6af22e70f95f7d";
const SYMBOL = "AED/MAD";

async function chargerLigneAEDMAD() {
  const url = `https://api.twelvedata.com/time_series?symbol=${SYMBOL}&interval=15min&outputsize=8&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const tbody = document.querySelector("#cryptoTable tbody");
  tbody.innerHTML = "";

  if (!data.values || data.values.length < 2) {
    const row = tbody.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 9;
    cell.textContent = "Pas assez de données.";
    return;
  }

  const reversedValues = data.values.slice().reverse();

  const row = tbody.insertRow();
  const pairCell = row.insertCell();
  pairCell.textContent = SYMBOL;

  for (let i = 0; i < reversedValues.length; i++) {
    const current = reversedValues[i];
    const previous = reversedValues[i - 1];

    const cell = row.insertCell();

    let variationText = "(N/A)";
    let variationClass = "";

    if (previous) {
      const variation = ((current.close - previous.close) / previous.close) * 100;
      variationText = `(${variation.toFixed(2)}%)`;
      variationClass = variation > 0 ? "positive" : "negative";
    }

    const displayText = `${current.datetime} ${variationText}`;
    cell.textContent = displayText;
    if (variationClass) {
      cell.classList.add(variationClass);
    }
  }
}

chargerLigneAEDMAD();
setInterval(chargerLigneAEDMAD, 60000); // Mise à jour toutes les 60s
