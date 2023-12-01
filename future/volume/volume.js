async function fetchCryptoData(symbol, rowId) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=8`
    );
    const data = await response.json();

    // Extraction du volume quotidien
    const dailyVolumes = data.map((candle) => parseFloat(candle[5]));

    // Calcul du total des volumes sur 8 jours
    const totalVolume = dailyVolumes.reduce((acc, volume) => acc + volume, 0);

    // Calcul de la moyenne
    const averageVolume = totalVolume / dailyVolumes.length;

    // Affichage du volume quotidien pour chaque jour
    console.log(`Volume quotidien pour ${symbol}:`, dailyVolumes);

    // Affichage des volumes dans le tableau HTML
    const row = document.getElementById(rowId);
    for (let i = 0; i < dailyVolumes.length; i++) {
      const cell = document.createElement("td");
      cell.textContent = dailyVolumes[i].toFixed(2);
      row.appendChild(cell);
    }

    // Ajout de la cellule pour le total
    const totalCell = document.createElement("td");
    totalCell.textContent = totalVolume.toFixed(2);
    row.appendChild(totalCell);

    // Ajout de la cellule pour la moyenne
    const averageCell = document.createElement("td");
    averageCell.textContent = averageVolume.toFixed(2);
    row.appendChild(averageCell);

  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${symbol}:`,
      error
    );
  }
}

// Appel de la fonction pour obtenir les volumes quotidiens des cryptos
fetchCryptoData("1INCH", "1INCH");
fetchCryptoData("AAVE", "AAVE");
fetchCryptoData("ACH", "ACH");
fetchCryptoData("AGIX", "AGIX");
fetchCryptoData("AGLD", "AGLD");
