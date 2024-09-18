// Fonction pour récupérer les données de Binance pour l'intervalle de 5 minutes
async function fetchCryptoData5Min(symbol) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=1`);
        const data = await response.json();

        const takerBuyVolume = parseFloat(data[0][9]);
        const totalVolume = parseFloat(data[0][5]);
        const takerSellVolume = totalVolume - takerBuyVolume;
        const openTime = new Date(data[0][0]);
        const closeTime = new Date(data[0][6]);

        const cryptoRow = document.getElementById(`${symbol}_5m`);

        const optionsDate = { year: "2-digit", month: "2-digit", day: "2-digit" };
        const optionsTime = { hour: "numeric", minute: "numeric" };
        const openDateStr = `${openTime.toLocaleDateString("fr-FR", optionsDate)} ${openTime.toLocaleTimeString("fr-FR", optionsTime)}`;
        const closeDateStr = `${closeTime.toLocaleDateString("fr-FR", optionsDate)} ${closeTime.toLocaleTimeString("fr-FR", optionsTime)}`;

        const dateCell = cryptoRow.insertCell(1);
        dateCell.textContent = `${openDateStr} - ${closeDateStr}`;

        const volumeCell = cryptoRow.insertCell(2);
        volumeCell.textContent = `Acheteurs: ${takerBuyVolume.toFixed(2)}, Vendeurs: ${takerSellVolume.toFixed(2)}`;

        const dominanceCell = cryptoRow.insertCell(3);
        if (takerBuyVolume > takerSellVolume) {
            dominanceCell.textContent = 'Plus d\'acheteurs';
            cryptoRow.classList.add('positive');
        } else {
            dominanceCell.textContent = 'Plus de vendeurs';
            cryptoRow.classList.add('negative');
        }

        const percentageDifference = ((takerBuyVolume - takerSellVolume) / totalVolume) * 100;
        const percentageCell = cryptoRow.insertCell(4);
        percentageCell.textContent = `${percentageDifference.toFixed(2)}%`;

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol} (5m):`, error);
    }
}

// Fonction pour récupérer les données de Binance pour l'intervalle de 15 minutes
async function fetchCryptoData15Min(symbol) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=15m&limit=1`);
        const data = await response.json();

        const takerBuyVolume = parseFloat(data[0][9]);
        const totalVolume = parseFloat(data[0][5]);
        const takerSellVolume = totalVolume - takerBuyVolume;
        const openTime = new Date(data[0][0]);
        const closeTime = new Date(data[0][6]);

        const cryptoRow = document.getElementById(`${symbol}_15m`);

        const optionsDate = { year: "2-digit", month: "2-digit", day: "2-digit" };
        const optionsTime = { hour: "numeric", minute: "numeric" };
        const openDateStr = `${openTime.toLocaleDateString("fr-FR", optionsDate)} ${openTime.toLocaleTimeString("fr-FR", optionsTime)}`;
        const closeDateStr = `${closeTime.toLocaleDateString("fr-FR", optionsDate)} ${closeTime.toLocaleTimeString("fr-FR", optionsTime)}`;

        const dateCell = cryptoRow.insertCell(1);
        dateCell.textContent = `${openDateStr} - ${closeDateStr}`;

        const volumeCell = cryptoRow.insertCell(2);
        volumeCell.textContent = `Acheteurs: ${takerBuyVolume.toFixed(2)}, Vendeurs: ${takerSellVolume.toFixed(2)}`;

        const dominanceCell = cryptoRow.insertCell(3);
        if (takerBuyVolume > takerSellVolume) {
            dominanceCell.textContent = 'Plus d\'acheteurs';
            cryptoRow.classList.add('positive');
        } else {
            dominanceCell.textContent = 'Plus de vendeurs';
            cryptoRow.classList.add('negative');
        }

        const percentageDifference = ((takerBuyVolume - takerSellVolume) / totalVolume) * 100;
        const percentageCell = cryptoRow.insertCell(4);
        percentageCell.textContent = `${percentageDifference.toFixed(2)}%`;

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol} (15m):`, error);
    }
}

// Liste des symboles de cryptomonnaies
const symbols = ["1INCH", "AAVE", "ACE"];

// Récupération des données pour chaque symbole
symbols.forEach(symbol => {
    fetchCryptoData5Min(symbol);  // Pour l'intervalle de 5 minutes
    fetchCryptoData15Min(symbol); // Pour l'intervalle de 15 minutes
});
