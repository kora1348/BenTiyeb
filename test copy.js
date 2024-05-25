const symbols = ['1INCH', 'AAVE', 'ACE', 'ACH', 'ADA', 'AEVO', 'AGIX', 'AGLD', 'ALGO', 'ALICE', 'ALPHA', 'ALT', 'AMB', 'ANKR', 'ANT', 'APE', 'API3', 'APT', 'AR', 'ARB', 'ARK', 'ARKM', 'ARPA', 'ASTR', 'ATA', 'ATOM', 'AUCTION', 'AUDIO', 'AVAX', 'AXL', 'AXS', 'BADGER', 'BAKE', 'BAL', 'BAND', 'BAT', 'BCH', 'BEAMX', 'BEL', 'BICO', 'BLUR', 'BLZ', 'BNB', 'BNT', 'BNX', 'BOME', 'BOND', 'BONK', 'BTC', 'BTCUSDT', 'C98', 'CAKE', 'CELO', 'CELR', 'CFX', 'CHR', 'CHZ', 'COMBO', 'COMP', 'COTI', 'CRV', 'CTK', 'CTSI', 'CVX', 'CYBER', 'DAR', 'DASH', 'DENT', 'DGB', 'DOGE', 'DOT', 'DUSK', 'DYM', 'DYDX', 'EDU', 'EGLD', 'ENJ', 'ENS', 'EOS', 'ETC', 'ETH', 'ETHFI', 'ETHUSDT', 'FET', 'FIL', 'FLM', 'FLOKI', 'FLOW', 'FRONT', 'FTM', 'FXS', 'GALA', 'GAL', 'GAS', 'GLMR', 'GMT', 'GMX', 'GRT', 'GTC', 'HBAR', 'HFT', 'HIFI', 'HIGH', 'HOOK', 'HOT', 'ICP', 'ICX', 'ID', 'IDEX', 'ILV', 'IMX', 'INJ', 'IOST', 'IOTA', 'IOTX', 'JASMY', 'JOE', 'JTO', 'JUP', 'KAVA', 'KEY', 'KLAY', 'KNC', 'KSM', 'LDO', 'LEVER', 'LINA', 'LINK', 'LIT', 'LOOM', 'LPT', 'LQTY', 'LRC', 'LSK', 'LTC', 'LUNC', 'MAGIC', 'MANTA', 'MANA', 'MASK', 'MATIC', 'MAV', 'MBL', 'MDT', 'MEME', 'METIS', 'MINA', 'MKR', 'MOVR', 'MTL', 'NEAR', 'NEO', 'NFP', 'NKN', 'NMR', 'NTRN', 'OCEAN', 'OGN', 'OMG', 'ONE', 'ONDO', 'ONG', 'ONT', 'OP', 'ORBS', 'ORDI', 'OXT', 'PENDLE', 'PEOPLE', 'PEPE', 'PERP', 'PHB', 'PIXEL', 'POLYX', 'PORTAL', 'POWR', 'PYTH', 'QNT', 'QTUM', 'RAD', 'RDNT', 'REEF', 'REN', 'RLC', 'RNDR', 'RONIN', 'ROSE', 'RSR', 'RUNE', 'RVN', 'SAND', '1000SATS', 'SEI', 'SFP', 'SHIB', 'SKL', 'SLP', 'SNT', 'SNX', 'SOL', 'SOLUSDT', 'SPELL', 'SSV', 'STEEM', 'STG', 'STMX', 'STORJ', 'STPT', 'STRAX', 'STRK', 'STX', 'SUI', 'SUPER', 'SUSHI', 'SXP', 'THETA', 'TIA', 'TLM', 'TRB', 'TRU', 'TRX', 'T', 'TWT', 'UMA', 'UNFI', 'UNI', 'USDC', 'USTC', 'USDT', 'VET', 'WAVES', 'WAXP', 'WIF', 'WLD', 'WOO', 'XEM', 'XLM', 'XRP', 'XTZ', 'XVG', 'XVS', 'YFI', 'YGG', 'ZEC', 'ZEN', 'ZIL', 'ZRX'];
const interval = '5m';
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
