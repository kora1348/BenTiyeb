const SYMBOLS = [""];

function getDateNDaysAgo(n) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().split("T")[0];
}

async function chargerDonneesDevise(base, target) {
  const end = getDateNDaysAgo(0);   // aujourd'hui
  const start = getDateNDaysAgo(8); // 9 derniers jours

  const url = `???`;
  const res = await fetch(url);
  return await res.json();
}

async function afficherLigneDevise(pair, data, tbody) {
  const [base, target] = pair.split("/");
  if (!data || !data.rates || Object.keys(data.rates).length < 2) {
    const row = tbody.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 11;
    cell.textContent = `Pas assez de données pour ${pair}`;
    return;
  }

  const sortedDates = Object.keys(data.rates).sort(); // Tri ascendant
  const row = tbody.insertRow();
  const pairCell = row.insertCell();
  pairCell.textContent = pair;

  let symbolSequence = "";

  for (let i = sortedDates.length - 9; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i];
    const previousDate = sortedDates[i - 1];
    const cell = row.insertCell();

    let variationText = "(N/A)";
    let variationClass = "";
    let variationSymbol = "";

    if (previousDate) {
      const current = data.rates[currentDate][target];
      const previous = data.rates[previousDate][target];

      if (current && previous) {
        const variation = ((current - previous) / previous) * 100;
        variationText = `(${variation.toFixed(2)}%)`;
        variationClass = variation > 0 ? "positive" : "negative";
        variationSymbol = variation > 0 ? "+" : "-";

        if (i >= sortedDates.length - 8 && i < sortedDates.length - 1) {
          symbolSequence += variationSymbol;
        }
      }
    }

    const displayText = `${currentDate} ${variationText}`;
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
    const [base, target] = symbol.split("/");
    const data = await chargerDonneesDevise(base, target);
    await afficherLigneDevise(symbol, data, tbody);
  }
}

chargerToutesDevises();
setInterval(chargerToutesDevises, 5 * 60 * 1000); // toutes les 5 minutes
