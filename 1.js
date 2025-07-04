 const API_KEY = "c9abb437327a4242ac6af22e70f95f7d"; // ta clé
    const SYMBOL = "AED/MAD";

    async function chargerTableau() {
      const url = `https://api.twelvedata.com/time_series?symbol=${SYMBOL}&interval=1min&outputsize=8&apikey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      const tbody = document.querySelector("#cryptoTable tbody");
      tbody.innerHTML = "";

      if (!data.values || data.values.length < 2) {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 3;
        cell.textContent = "Pas assez de données.";
        return;
      }

      // Boucles sur les 8 dernières bougies
      for (let i = data.values.length - 1; i >= 0; i--) {
        const current = data.values[i];
        const previous = data.values[i - 1];
        const row = tbody.insertRow();

        // Colonne 1 : Timestamp
        const dateCell = row.insertCell();
        dateCell.textContent = current.datetime;

        // Colonne 2 : Prix de clôture
        const priceCell = row.insertCell();
        priceCell.textContent = parseFloat(current.close).toFixed(4);

        // Colonne 3 : Variation vs précédente
        const variationCell = row.insertCell();
        if (previous) {
          const variation = ((current.close - previous.close) / previous.close) * 100;
          variationCell.textContent = variation.toFixed(2) + " %";
          variationCell.className = variation > 0 ? "positive" : "negative";
        } else {
          variationCell.textContent = "-";
        }
      }
    }

    chargerTableau();
    // Met à jour toutes les 60 secondes
    setInterval(chargerTableau, 60000);