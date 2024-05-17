async function fetchCryptoData(symbol, years = [2022, 2023, 2024]) {
    try {
        let totalVariation = 0;
        const cryptoRow = document.getElementById(symbol);

        // Obtenir la date du jour
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1; // Les mois commencent à partir de 0
        const currentYear = currentDate.getFullYear();

        // Inverser l'ordre des années pour afficher d'abord les données de l'année actuelle
        years = years.reverse();

        for (const year of years) {
            const startDate = new Date(`${currentMonth}/${currentDay}/${year} 01:30:00`).getTime();
            const endDate = new Date(`${currentMonth}/${currentDay}/${year} 01:45:00`).getTime();

            const response = await fetch(
                `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=15m&limit=1&startTime=${startDate}&endTime=${endDate}`
            );
            const data = await response.json();

            for (let i = 0; i < data.length; i++) {
                const openPrice = parseFloat(data[i][1]);
                const closePrice = parseFloat(data[i][4]);
                const variation = ((closePrice - openPrice) / openPrice) * 100;
                const cellIndex = i + 1;

                const variationCell = cryptoRow.insertCell(cellIndex);
                const variationValue = variation.toFixed(2);
                const startDate = new Date(data[i][0]);
                const endDate = new Date(data[i][6]);
                const optionsStart = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric" };
                const optionsEnd = { hour: "numeric", minute: "numeric" };
                variationCell.textContent = `${startDate.toLocaleDateString("fr-FR")} - (${startDate.toLocaleTimeString("fr-FR", optionsEnd)}) : (${endDate.toLocaleTimeString("fr-FR", optionsEnd)}) : ${variationValue}%`;

                if (variation > 0) {
                    variationCell.classList.add("positive");
                } else if (variation < 0) {
                    variationCell.classList.add("negative");
                }

                totalVariation += variation;
            }
        }

        const cryptoNamesElement = document.getElementById('cryptoNames');

    } catch (error) {
        console.error(
            `Erreur lors de la récupération des données pour ${symbol}:`,
            error
        );
    }
}

