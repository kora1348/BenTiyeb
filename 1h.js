async function fetchCryptoData(symbol, interval, limit = 2) {
    const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`
    );
    const data = await response.json();
    return data;
}

function calculateChange(current, previous) {
    return ((current - previous) / previous) * 100;
}

async function updateCryptoRow(symbol) {
    const intervals = ['1d', '3d', '1w', '1M'];
    const row = document.getElementById(symbol);

    let totalChange = 0;

    for (const interval of intervals) {
        const data = await fetchCryptoData(symbol, interval);
        const currentClose = parseFloat(data[1][4]);
        const previousClose = parseFloat(data[0][4]);
        const change = calculateChange(currentClose, previousClose);
        const cell = row.insertCell();
        cell.innerText = change.toFixed(2) + '%';
        if (change > 0) {
            cell.classList.add('positive');
        } else if (change < 0) {
            cell.classList.add('negative');
        }
        totalChange += change;
    }

    const totalCell = row.insertCell();
    totalCell.innerText = totalChange.toFixed(2) + '%';
    if (totalChange > 0) {
        totalCell.classList.add('positive');
    } else if (totalChange < 0) {
        totalCell.classList.add('negative');
    }
}

async function updateAllCryptoRows() {
    const symbols = ['1INCH', 'AAVE', 'ACE', 'ACH', 'ADA', 'AEVO', 'AGIX', 'AGLD', 'ALGO', 'ALICE', 'ALPHA', 'ALT', 'AMB', 'ANKR', 'ANT', 'APE', 'API3', 'APT', 'AR', 'ARB', 'ARK', 'ARKM', 'ARPA', 'ASTR', 'ATA', 'ATOM', 'AUCTION', 'AUDIO', 'AVAX', 'AXL', 'AXS', 'BAKE', 'BAL', 'BAND', 'BAT', 'BEAMX', 'BEL', 'BICO', 'BLUR', 'BLZ', 'BNB', 'BNT', 'BNX', 'BOME', 'BOND', 'BONK', 'BTC', 'C98', 'CAKE', 'CELO', 'CELR', 'CFX', 'CHR', 'CHZ', 'COMBO', 'COMP', 'COTI', 'CRV', 'CTK', 'CTSI', 'CVX', 'CYBER', 'DAR', 'DASH', 'DENT', 'DGB', 'DOGE', 'DOT', 'DUSK', 'DYM', 'DYDX', 'EDU', 'EGLD', 'ENJ', 'ENS', 'EOS', 'ETC', 'ETH', 'ETHFI', 'FET', 'FIL', 'FLM', 'FLOKI', 'FLOW', 'FRONT', 'FTM', 'FXS', 'GALA', 'GAL', 'GAS', 'GLMR', 'GMT', 'GMX', 'GRT', 'GTC', 'HBAR', 'HFT', 'HIFI', 'HIGH', 'HOOK', 'HOT', 'ICP', 'ICX', 'IDEX', 'ID', 'ILV', 'IMX', 'INJ', 'IOST', 'IOTA', 'IOTX', 'JASMY', 'JOE', 'JTO', 'JUP', 'KAVA', 'KEY', 'KLAY', 'KNC', 'KSM', 'LDO', 'LEVER', 'LINA', 'LINK', 'LIT', 'LOOM', 'LPT', 'LQTY', 'LRC', 'LSK', 'LTC', 'LUNC', 'MAGIC', 'MANA', 'MANTA', 'MASK', 'MATIC', 'MAV', 'MBL', 'MDT', 'MEME', 'METIS', 'MINA', 'MKR', 'MOVR', 'MTL', 'NEAR', 'NEO', 'NFP', 'NKN', 'NMR', 'NTRN', 'OCEAN', 'OGN', 'OMG', 'ONE', 'ONG', 'ONT', 'OP', 'ORDI', 'OXT', 'PENDLE', 'PEOPLE', 'PEPE', 'PERP', 'PHB', 'PIXEL', 'POLYX', 'PORTAL', 'POWR', 'PYTH', 'QNT', 'QTUM', 'RAD', 'RDNT', 'REEF', 'REN', 'RLC', 'RNDR', 'RONIN', 'ROSE', 'RSR', 'RUNE', 'RVN', 'SAND', '1000SATS', 'SEI', 'SFP', 'SHIB', 'SKL', 'SLP', 'SNT', 'SNX', 'SOL', 'SPELL', 'SSV', 'STEEM', 'STG', 'STMX', 'STORJ', 'STPT', 'STRAX', 'STRK', 'STX', 'SUI', 'SUPER', 'SUSHI', 'SXP', 'THETA', 'TIA', 'TLM', 'TRB', 'TRU', 'TRX', 'T', 'TWT', 'UMA', 'UNFI', 'UNI', 'USDC', 'USTC', 'VET', 'WAVES', 'WAXP', 'WIF', 'WLD', 'WOO', 'XEM', 'XLM', 'XRP', 'XTZ', 'XVS', 'YFI', 'YGG', 'ZEC', 'ZEN', 'ZIL', 'ZRX'];

    for (const symbol of symbols) {
        await updateCryptoRow(symbol);
    }
}

document.addEventListener('DOMContentLoaded', updateAllCryptoRows);
