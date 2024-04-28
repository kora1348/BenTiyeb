async function fetchAndDisplayCryptoData(symbol, limit) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1m&limit=${limit}`);
        const data = await response.json();

        let totalVariation = 0;

        const cryptoRow = document.getElementById(symbol);

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
            const cellIndex = i + 1;

            const variationCell = cryptoRow.insertCell(cellIndex);
            const variationValue = weeklyVariation.toFixed(2);
            const weekStartDate = new Date(data[i][0]);
            const weekEndDate = new Date(data[i][6]);
            const optionsStart = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric" };
            const optionsEnd = { hour: "numeric", minute: "numeric" };
            variationCell.textContent = `${weekStartDate.toLocaleDateString("fr-FR", optionsStart)} (${weekStartDate.toLocaleTimeString("fr-FR", optionsEnd)}) - ${weekEndDate.toLocaleDateString("fr-FR", optionsStart)} (${weekEndDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;

            if (weeklyVariation > 0) {
                variationCell.classList.add("positive");
            } else if (weeklyVariation < 0) {
                variationCell.classList.add("negative");
            }

            totalVariation += weeklyVariation;
        }

        const totalCell = cryptoRow.insertCell(data.length + 1);
        const totalValue = totalVariation.toFixed(2);

        totalCell.style.textAlign = 'center';

        const cryptoNamesElement = document.getElementById('cryptoNames');

        if (totalVariation >= -29.99 && totalVariation <= -20.00) {
            totalCell.classList.add("positive");
            cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
        }

        if (totalVariation < 0) {
            totalCell.classList.add("negative");
        }

        totalCell.textContent = `${totalValue}%`;

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    }
}

function mettreAJourHeure() {
    var elementHeure = document.getElementById('heure');
    var maintenant = new Date();

    var heureActuelle = new Date(maintenant);

    maintenant.setHours(maintenant.getHours() + 3);
    maintenant.setMinutes(maintenant.getMinutes() + 20);

    var heuresMaintenant = maintenant.getHours();
    var minutesMaintenant = maintenant.getMinutes();
    var secondesMaintenant = maintenant.getSeconds();

    var heuresActuelle = heureActuelle.getHours();
    var minutesActuelle = heureActuelle.getMinutes();
    var secondesActuelle = heureActuelle.getSeconds();

    heuresMaintenant = heuresMaintenant < 10 ? '0' + heuresMaintenant : heuresMaintenant;
    minutesMaintenant = minutesMaintenant < 10 ? '0' + minutesMaintenant : minutesMaintenant;
    secondesMaintenant = secondesMaintenant < 10 ? '0' + secondesMaintenant : secondesMaintenant;

    heuresActuelle = heuresActuelle < 10 ? '0' + heuresActuelle : heuresActuelle;
    minutesActuelle = minutesActuelle < 10 ? '0' + minutesActuelle : minutesActuelle;
    secondesActuelle = secondesActuelle < 10 ? '0' + secondesActuelle : secondesActuelle;

    elementHeure.innerHTML = heuresActuelle + ':' + minutesActuelle + ':' + secondesActuelle;
}

async function fetchAndDisplayAllCryptoData() {
    mettreAJourHeure();

    const symbols = ["1INCH", "AAVE", "ACE", "ACH", "ADA", "AEVO", /* and so on... */];

    for (const symbol of symbols) {
        await fetchAndDisplayCryptoData(symbol, 9);
        await fetchAndDisplayCryptoData(symbol, 21);
    }
}

fetchAndDisplayAllCryptoData();
