// Configuration
const symbol = "BTCUSDT";
const interval = "3m"; // Timeframe 3 minutes
const limit = 100; // Nombre de candles à récupérer

// Éléments DOM
const ctx = document.getElementById('priceChart').getContext('2d');
const statusEl = document.getElementById('status');

// Variables
let priceChart;
let stepPatterns = []; // Stocke les escaliers détectés

// 1. Récupérer les données depuis Binance
async function fetchBinanceData() {
    statusEl.textContent = "Récupération des données...";
    
    try {
        const response = await axios.get(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
        );
        
        const data = response.data.map(candle => ({
            time: new Date(candle[0]),
            open: parseFloat(candle[1]),
            high: parseFloat(candle[2]),
            low: parseFloat(candle[3]),
            close: parseFloat(candle[4]),
        }));
        
        return data;
    } catch (error) {
        statusEl.textContent = "Erreur API Binance: " + error.message;
        return [];
    }
}

// 2. Détecter les variations en escalier
function detectStepPatterns(data) {
    const steps = [];
    const threshold = 0.2; // Seuil de variation pour considérer un "escalier"

    for (let i = 2; i < data.length; i++) {
        const prevCandle = data[i - 1];
        const currentCandle = data[i];
        
        // Variation en % entre deux bougies
        const priceChange = ((currentCandle.close - prevCandle.close) / prevCandle.close) * 100;
        
        // Détection d'un mouvement en escalier (3 bougies ou plus)
        if (Math.abs(priceChange) > threshold) {
            const direction = priceChange > 0 ? "UP" : "DOWN";
            
            // Vérifier si le mouvement se confirme
            const nextCandle = data[i + 1];
            if (nextCandle && ((direction === "UP" && nextCandle.close > currentCandle.close) || 
                              (direction === "DOWN" && nextCandle.close < currentCandle.close))) {
                steps.push({
                    startIndex: i - 1,
                    direction,
                    strength: Math.abs(priceChange),
                });
            }
        }
    }
    
    return steps;
}

// 3. Afficher le graphique avec Chart.js
function renderChart(data, steps) {
    const labels = data.map(candle => candle.time.toLocaleTimeString());
    const closes = data.map(candle => candle.close);
    
    if (priceChart) priceChart.destroy(); // Effacer le précédent graphique
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Prix BTC/USDT (3min)',
                    data: closes,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
                legend: {
                    position: 'top',
                },
                annotation: {
                    annotations: steps.map((step, index) => ({
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x',
                        value: step.startIndex,
                        borderColor: step.direction === "UP" ? 'green' : 'red',
                        borderWidth: 2,
                        label: {
                            content: step.direction === "UP" ? "🔼 Escalier" : "🔽 Escalier",
                            enabled: true,
                            position: 'top',
                        },
                    })),
                },
            },
            scales: {
                x: { display: true, title: { display: true, text: 'Heure' } },
                y: { display: true, title: { display: true, text: 'Prix (USDT)' } },
            },
        },
    });
}

// 4. Exécution principale
(async () => {
    const data = await fetchBinanceData();
    if (data.length === 0) return;
    
    stepPatterns = detectStepPatterns(data);
    renderChart(data, stepPatterns);
    
    statusEl.textContent = `Données chargées (${data.length} bougies). ${stepPatterns.length} escaliers détectés.`;
})();