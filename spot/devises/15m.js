const SYMBOLS = [
    "EUR/USD",
    "USD/JPY",
    "GBP/USD",
    "AUD/USD",
    "USD/CAD",
    "USD/CHF",
    "NZD/USD",
    "EUR/GBP",
    "EUR/JPY",
    "GBP/JPY"
];

// Fonction pour obtenir la date/heure il y a N intervalles de 15 minutes
function getTimeMinutesAgo(minutes) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - minutes);
    return date;
}

// Formatage de la date pour l'affichage (HH:MM)
function formatTime(date) {
    return date.toTimeString().substring(0, 5);
}

async function chargerDonneesDevise(base, target) {
    try {
        // Simulation de données pour 9 intervalles de 15 minutes
        const simulatedData = {
            rates: {}
        };
        
        // Générer des données simulées pour les 9 derniers intervalles de 15 minutes
        for (let i = 0; i < 9; i++) {
            const time = getTimeMinutesAgo((8 - i) * 15); // De 0 à 120 minutes (8*15)
            const timeStr = formatTime(time);
            
            // Variation aléatoire pour la simulation
            const baseValue = 1 + (Math.random() * 0.1 - 0.05); // Variation de ±5%
            simulatedData.rates[timeStr] = {
                [target]: baseValue
            };
        }
        
        return simulatedData;
    } catch (error) {
        console.error(`Erreur pour ${base}/${target}:`, error);
        return null;
    }
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

    const sortedTimes = Object.keys(data.rates).sort((a, b) => {
        return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
    }); // Tri chronologique

    const row = tbody.insertRow();
    const pairCell = row.insertCell();
    pairCell.textContent = pair;

    let symbolSequence = "";

    for (let i = 0; i < sortedTimes.length; i++) {
        const currentTime = sortedTimes[i];
        const previousTime = sortedTimes[i - 1];
        const cell = row.insertCell();

        let variationText = "(N/A)";
        let variationClass = "";
        let variationSymbol = "";

        if (previousTime) {
            const current = data.rates[currentTime][target];
            const previous = data.rates[previousTime][target];

            if (current && previous) {
                const variation = ((current - previous) / previous) * 100;
                variationText = `(${variation.toFixed(2)}%)`;
                variationClass = variation > 0 ? "positive" : "negative";
                variationSymbol = variation > 0 ? "+" : "-";

                if (i >= 1 && i < sortedTimes.length) {
                    symbolSequence += variationSymbol;
                }
            }
        }

        const displayText = `${currentTime} ${variationText}`;
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

// Actualiser toutes les 15 minutes (pour correspondre à l'intervalle)
chargerToutesDevises();
setInterval(chargerToutesDevises, 15 * 60 * 1000);