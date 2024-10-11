async function fetchCryptoDataAtTime(symbol, year, cellIndex) {
    const targetDate = new Date(year, 9, 10, 22, 0); // 15 septembre de l'année en cours à 15h45
    const startTime = targetDate.getTime(); // Convertir en timestamp

    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=15m&startTime=${startTime}&limit=1`
        );
        const data = await response.json();

        if (data.length === 0) {
            console.log(`Aucune donnée trouvée pour ${symbol} à ${year}`);
            return;
        }

        const openPrice = parseFloat(data[0][1]);
        const closePrice = parseFloat(data[0][4]);
        const variation = ((closePrice - openPrice) / openPrice) * 100;

        const dateTime = new Date(data[0][0]);
        const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };

        const formattedDate = dateTime.toLocaleDateString("fr-FR", options);

        // Insérer la variation dans la cellule correspondante du tableau
        const cryptoRow = document.getElementById(symbol);
        const variationCell = cryptoRow.insertCell(cellIndex); // Insérer la cellule dans la colonne correspondante
        variationCell.textContent = `${formattedDate} : ${variation.toFixed(2)}%`;

        // Ajouter la classe "positive" ou "negative" en fonction de la variation
        if (variation > 0) {
            variationCell.classList.add("positive");
        } else if (variation < 0) {
            variationCell.classList.add("negative");
        }

    } catch (error) {
        console.error(
            `Erreur lors de la récupération des données pour ${symbol} à ${year}:`,
            error
        );
    }
}

// Appel de la fonction pour obtenir les taux de variation du BTC pour 2021, 2022, 2023 à 15h45
fetchCryptoDataAtTime("BTC", 2021, 1); // Cellule pour 2021
fetchCryptoDataAtTime("BTC", 2022, 2); // Cellule pour 2022
fetchCryptoDataAtTime("BTC", 2023, 3); // Cellule pour 2023

  


