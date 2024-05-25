const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
const interval = '1m';
const ma7Period = 7;
const ma25Period = 25;

const fetchKlines = async (symbol) => {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${ma25Period}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    }
};

const calculateMA = (data, period) => {
    let sum = 0;
    for (let i = 0; i < period; i++) {
        sum += parseFloat(data[i][4]); // Prix de clôture
    }
    return sum / period;
};

// Créer un objet pour stocker les valeurs précédentes pour chaque symbole
const previousValues = {};

const checkCross = async () => {
    for (const symbol of symbols) {
        const data = await fetchKlines(symbol);
        if (!data) return;

        const ma7 = calculateMA(data.slice(0, ma7Period), ma7Period);
        const ma25 = calculateMA(data.slice(0, ma25Period), ma25Period);

        // Initialiser les valeurs précédentes si elles n'existent pas
        if (!previousValues[symbol]) {
            previousValues[symbol] = { previousMA7: ma7, previousMA25: ma25 };
            continue; // Continuer au prochain symbole sans vérifier les croisements pour cette itération
        }

        const { previousMA7, previousMA25 } = previousValues[symbol];

        // Condition pour MA7 croissant MA25
        if (ma7 > ma25 && previousMA7 <= previousMA25) {
            document.getElementById('alert').innerText = `MA7 has crossed above MA25 for ${symbol}!`;
            document.getElementById('alert').classList.add('positive');
        }

        // Condition pour MA25 croissant MA7
        if (ma25 > ma7 && previousMA25 <= previousMA7) {
            document.getElementById('alert').innerText = `MA25 has crossed above MA7 for ${symbol}!`;
            document.getElementById('alert').classList.add('negative');
        }

        // Mettre à jour les valeurs précédentes
        previousValues[symbol] = { previousMA7: ma7, previousMA25: ma25 };
    }
};

setInterval(checkCross, 60000); // Vérifier chaque minute
