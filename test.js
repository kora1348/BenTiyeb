async function fetchCryptoData(symbol) {
  try {
      const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}XRP&interval=1w&limit=1`
      );
      const data = await response.json();

      // Calcul du total des taux de variation sur 3 semaines
      let totalVariation = 0;

      // Mise à jour du tableau avec les données et la couleur
      const cryptoRow = document.getElementById(symbol);

      for (let i = 0; i < data.length; i++) {
          const openPrice = parseFloat(data[i][1]);
          const closePrice = parseFloat(data[i][4]);
          const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
          const cellIndex = i + 1; // Décalage d'une cellule pour éviter la première cellule (Crypto)

          const variationCell = cryptoRow.insertCell(cellIndex);
          const variationValue = weeklyVariation.toFixed(2);
          const weekStartDate = new Date(data[i][0]);
          const weekEndDate = new Date(data[i][6]);
          const optionsStart = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric" };
          const optionsEnd = { hour: "numeric", minute: "numeric" };
          variationCell.textContent = `${weekStartDate.toLocaleDateString(
              "fr-FR",
              optionsStart
          )} (${weekStartDate.toLocaleTimeString("fr-FR", optionsEnd)}) - ${weekEndDate.toLocaleDateString(
              "fr-FR",
              optionsStart
          )} (${weekEndDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;

          // Ajouter la classe "positive" ou "negative" en fonction de la variation hebdomadaire
          if (weeklyVariation > 0) {
              variationCell.classList.add("positive");
          } else if (weeklyVariation < 0) {
              variationCell.classList.add("negative");
          }

          totalVariation += weeklyVariation; // Ajouter la variation hebdomadaire au total
      }

      // Ajouter la cellule pour afficher le total de variation
      const totalCell = cryptoRow.insertCell(data.length + 1);
      const totalValue = totalVariation.toFixed(2);

      const cryptoNamesElement = document.getElementById('cryptoNames');

      // Ajouter la classe "positive" pour le total dans la plage spécifiée
      if (totalVariation >= -29.99 && totalVariation <= -20.00) {
          totalCell.classList.add("positive");
          cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
      }

      totalCell.textContent = `${totalValue}%`;

  } catch (error) {
      console.error(
          `Erreur lors de la récupération des données pour ${symbol}:`,
          error
      );
  }
}
