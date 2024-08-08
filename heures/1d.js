// Objet pour stocker les variations
let cryptoVariations = {};

async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=1`
        );
        const data = await response.json();

        let totalVariation = 0;
        const cryptoRow = document.getElementById(symbol);
        let allPositive = true;

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;

            if (weeklyVariation <= 0) {
                allPositive = false;
            }

            totalVariation += weeklyVariation;
        }

        cryptoVariations[symbol] = totalVariation; // Stocke la variation pour chaque crypto

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    }
}

async function findBestCrypto() {
    const symbols = [
        "1INCH", "AAVE", "ACE", "ACH", "ADA", "AEVO", "AGIX", "AGLD", "ALGO", 
        "ALICE", "ALPHA", "ALT", "AMB", "ANKR", "ANT", "APE", "API3", "APT", 
        "AR", "ARB", "ARK", "ARKM", "ARPA", "ASTR", "ATA", "ATOM", "AUCTION", 
        "AUDIO", "AVAX", "AXL", "AXS", "BADGER", "BAKE", "BAL", "BAND", "BAT", 
        "BCH", "BEAMX", "BEL", "BICO", "BLUR", "BLZ", "BNB", "BNT", "BNX", 
        "BOME", "BOND", "BONK", "BTC", "C98", "CAKE", "CELO", "CELR", "CFX", 
        "CHR", "CHZ", "COMBO", "COMP", "COTI", "CRV", "CTK", "CTSI", "CVX", 
        "CYBER", "DAR", "DASH", "DENT", "DGB", "DOGE", "DOT", "DUSK", "DYM", 
        "DYDX", "EDU", "EGLD", "ENJ", "ENS", "EOS", "ETC", "ETH", "ETHFI", 
        "FET", "FIL", "FLM", "FLOKI", "FLOW", "FRONT", "FTM", "FXS", "GALA", 
        "GAL", "GAS", "GLMR", "GMT", "GMX", "GRT", "GTC", "HBAR", "HFT", 
        "HIFI", "HIGH", "HOOK", "HOT", "ICP", "ICX", "IDEX", "ID", "ILV", 
        "IMX", "INJ", "IOST", "IOTA", "IOTX", "JASMY", "JOE", "JTO", "JUP", 
        "KAVA", "KEY", "KLAY", "KNC", "KSM", "LDO", "LEVER", "LINA", "LINK", 
        "LIT", "LOOM", "LPT", "LQTY", "LRC", "LSK", "LTC", "LUNC", "MAGIC", 
        "MANTA", "MANA", "MASK", "MATIC", "MAV", "MBL", "MDT", "MEME", 
        "METIS", "MINA", "MKR", "MOVR", "MTL", "NEAR", "NEO", "NFP", "NKN", 
        "NMR", "NTRN", "OCEAN", "OGN", "OMG", "ONE", "ONDO", "ONG", "ONT", 
        "OP", "ORBS", "ORDI", "OXT", "PENDLE", "PEOPLE", "PEPE", "PERP", 
        "PHB", "PIXEL", "POLYX", "PORTAL", "POWR", "PYTH", "QNT", "QTUM", 
        "RAD", "RDNT", "REEF", "REN", "RLC", "RNDR", "RONIN", "ROSE", "RSR", 
        "RUNE", "RVN", "SAND", "1000SATS", "SEI", "SFP", "SHIB", "SKL", 
        "SLP", "SNT", "SNX", "SOL", "SPELL", "SSV", "STEEM", "STG", "STMX", 
        "STORJ", "STPT", "STRAX", "STRK", "STX", "SUI", "SUPER", "SUSHI", 
        "SXP", "THETA", "TIA", "TLM", "TRB", "TRU", "TRX", "T", "TWT", 
        "UMA", "UNFI", "UNI", "USDC", "USTC", "USDT", "VET", 
        "WAXP", "WIF", "WLD", "WOO", "XEM", "XLM", "XRP", "XTZ", "XVG", 
        "XVS", "YFI", "YGG", "ZEC", "ZEN", "ZIL", "ZRX"
    ]; // Liste des symboles des cryptomonnaies

    // Attendre que toutes les cryptomonnaies soient traitées
    await Promise.all(symbols.map(symbol => fetchCryptoData(symbol)));

    // Trouver la cryptomonnaie avec la meilleure variation
    let bestSymbol = null;
    let bestVariation = -Infinity;

    for (const [symbol, variation] of Object.entries(cryptoVariations)) {
        if (variation > bestVariation) {
            bestVariation = variation;
            bestSymbol = symbol;
        }
    }

    if (bestSymbol !== null) {
        const cryptoNamesElement = document.getElementById('cryptoNames');
        cryptoNamesElement.textContent = `La cryptomonnaie avec la meilleure variation est ${bestSymbol} avec une variation de ${bestVariation.toFixed(2)}%`;
    }
}

// Appel de la fonction pour trouver la meilleure cryptomonnaie
findBestCrypto();

fetchCryptoData("1INCH");
fetchCryptoData("AAVE");
fetchCryptoData("ACE");
fetchCryptoData("ACH");
fetchCryptoData("ADA");
fetchCryptoData("AEVO");
fetchCryptoData("AGIX");
fetchCryptoData("AGLD");
fetchCryptoData("ALGO");
fetchCryptoData("ALICE");
fetchCryptoData("ALPHA");
fetchCryptoData("ALT");
fetchCryptoData("AMB");
fetchCryptoData("ANKR");
fetchCryptoData("ANT");
fetchCryptoData("APE");
fetchCryptoData("API3");
fetchCryptoData("APT");
fetchCryptoData("AR");
fetchCryptoData("ARB");
fetchCryptoData("ARK");
fetchCryptoData("ARKM");
fetchCryptoData("ARPA");
fetchCryptoData("ASTR");
fetchCryptoData("ATA");
fetchCryptoData("ATOM");
fetchCryptoData("AUCTION");
fetchCryptoData("AUDIO");
fetchCryptoData("AVAX");
fetchCryptoData("AXL");
fetchCryptoData("AXS");
fetchCryptoData("BADGER");
fetchCryptoData("BAKE");
fetchCryptoData("BAL");
fetchCryptoData("BAND");
fetchCryptoData("BAT");
fetchCryptoData("BCH");
fetchCryptoData("BEAMX");
fetchCryptoData("BEL");
fetchCryptoData("BICO");
fetchCryptoData("BLUR");
fetchCryptoData("BLZ");
fetchCryptoData("BNB");
fetchCryptoData("BNT");
fetchCryptoData("BNX");
fetchCryptoData("BOME");
fetchCryptoData("BOND");
fetchCryptoData("BONK");
fetchCryptoData("BTC");
fetchCryptoData("C98");
fetchCryptoData("CAKE");
fetchCryptoData("CELO");
fetchCryptoData("CELR");
fetchCryptoData("CFX");
fetchCryptoData("CHR");
fetchCryptoData("CHZ");
fetchCryptoData("COMBO");
fetchCryptoData("COMP");
fetchCryptoData("COTI");
fetchCryptoData("CRV");
fetchCryptoData("CTK");
fetchCryptoData("CTSI");
fetchCryptoData("CVX");
fetchCryptoData("CYBER");
fetchCryptoData("DAR");
fetchCryptoData("DASH");
fetchCryptoData("DENT");
fetchCryptoData("DGB");
fetchCryptoData("DOGE");
fetchCryptoData("DOT");
fetchCryptoData("DUSK");
fetchCryptoData("DYM");
fetchCryptoData("DYDX");
fetchCryptoData("EDU");
fetchCryptoData("EGLD");
fetchCryptoData("ENJ");
fetchCryptoData("ENS");
fetchCryptoData("EOS");
fetchCryptoData("ETC");
fetchCryptoData("ETH");
fetchCryptoData("ETHFI");
fetchCryptoData("FET");
fetchCryptoData("FIL");
fetchCryptoData("FLM");
fetchCryptoData("FLOKI");
fetchCryptoData("FLOW");
fetchCryptoData("FRONT");
fetchCryptoData("FTM");
fetchCryptoData("FXS");
fetchCryptoData("GALA");
fetchCryptoData("GAL");
fetchCryptoData("GAS");
fetchCryptoData("GLMR");
fetchCryptoData("GMT");
fetchCryptoData("GMX");
fetchCryptoData("GRT");
fetchCryptoData("GTC");
fetchCryptoData("HBAR");
fetchCryptoData("HFT");
fetchCryptoData("HIFI");
fetchCryptoData("HIGH");
fetchCryptoData("HOOK");
fetchCryptoData("HOT");
fetchCryptoData("ICP");
fetchCryptoData("ICX");
fetchCryptoData("IDEX");
fetchCryptoData("ID");
fetchCryptoData("ILV");
fetchCryptoData("IMX");
fetchCryptoData("INJ");
fetchCryptoData("IOST");
fetchCryptoData("IOTA");
fetchCryptoData("IOTX");
fetchCryptoData("JASMY");
fetchCryptoData("JOE");
fetchCryptoData("JTO");
fetchCryptoData("JUP");
fetchCryptoData("KAVA");
fetchCryptoData("KEY");
fetchCryptoData("KLAY");
fetchCryptoData("KNC");
fetchCryptoData("KSM");
fetchCryptoData("LDO");
fetchCryptoData("LEVER");
fetchCryptoData("LINA");
fetchCryptoData("LINK");
fetchCryptoData("LIT");
fetchCryptoData("LOOM");
fetchCryptoData("LPT");
fetchCryptoData("LQTY");
fetchCryptoData("LRC");
fetchCryptoData("LSK");
fetchCryptoData("LTC");
fetchCryptoData("LUNC");
fetchCryptoData("MAGIC");
fetchCryptoData("MANTA");
fetchCryptoData("MANA");
fetchCryptoData("MASK");
fetchCryptoData("MATIC");
fetchCryptoData("MAV");
fetchCryptoData("MBL");
fetchCryptoData("MDT");
fetchCryptoData("MEME");
fetchCryptoData("METIS");
fetchCryptoData("MINA");
fetchCryptoData("MKR");
fetchCryptoData("MOVR");
fetchCryptoData("MTL");
fetchCryptoData("NEAR");
fetchCryptoData("NEO");
fetchCryptoData("NFP");
fetchCryptoData("NKN");
fetchCryptoData("NMR");
fetchCryptoData("NTRN");
fetchCryptoData("OCEAN");
fetchCryptoData("OGN");
fetchCryptoData("OMG");
fetchCryptoData("ONE");
fetchCryptoData("ONDO")
fetchCryptoData("ONG");
fetchCryptoData("ONT");
fetchCryptoData("OP");
fetchCryptoData("ORBS");
fetchCryptoData("ORDI");
fetchCryptoData("OXT");
fetchCryptoData("PENDLE");
fetchCryptoData("PEOPLE");
fetchCryptoData("PEPE");
fetchCryptoData("PERP");
fetchCryptoData("PHB");
fetchCryptoData("PIXEL");
fetchCryptoData("POLYX");
fetchCryptoData("PORTAL");
fetchCryptoData("POWR");
fetchCryptoData("PYTH");
fetchCryptoData("QNT");
fetchCryptoData("QTUM");
fetchCryptoData("RAD");
fetchCryptoData("RDNT");
fetchCryptoData("REEF");
fetchCryptoData("REN");
fetchCryptoData("RLC");
fetchCryptoData("RNDR");
fetchCryptoData("RONIN");
fetchCryptoData("ROSE");
fetchCryptoData("RSR");
fetchCryptoData("RUNE");
fetchCryptoData("RVN");
fetchCryptoData("SAND");
fetchCryptoData("1000SATS");
fetchCryptoData("SEI");
fetchCryptoData("SFP");
fetchCryptoData("SHIB");
fetchCryptoData("SKL");
fetchCryptoData("SLP");
fetchCryptoData("SNT");
fetchCryptoData("SNX");
fetchCryptoData("SOL");
fetchCryptoData("SPELL");
fetchCryptoData("SSV");
fetchCryptoData("STEEM");
fetchCryptoData("STG");
fetchCryptoData("STMX");
fetchCryptoData("STORJ");
fetchCryptoData("STPT");
fetchCryptoData("STRAX");
fetchCryptoData("STRK");
fetchCryptoData("STX");
fetchCryptoData("SUI");
fetchCryptoData("SUPER");
fetchCryptoData("SUSHI");
fetchCryptoData("SXP");
fetchCryptoData("THETA");
fetchCryptoData("TIA");
fetchCryptoData("TLM");
fetchCryptoData("TRB");
fetchCryptoData("TRU");
fetchCryptoData("TRX");
fetchCryptoData("T");
fetchCryptoData("TWT");
fetchCryptoData("UMA");
fetchCryptoData("UNFI");
fetchCryptoData("UNI");
fetchCryptoData("USDC");
fetchCryptoData("USTC");
fetchCryptoData("USDT");
fetchCryptoData("VET");
fetchCryptoData("WAVES");
fetchCryptoData("WAXP");
fetchCryptoData("WIF");
fetchCryptoData("WLD");
fetchCryptoData("WOO");
fetchCryptoData("XEM");
fetchCryptoData("XLM");
fetchCryptoData("XRP");
fetchCryptoData("XTZ");
fetchCryptoData("XVG");
fetchCryptoData("XVS");
fetchCryptoData("YFI");
fetchCryptoData("YGG");
fetchCryptoData("ZEC");
fetchCryptoData("ZEN");
fetchCryptoData("ZIL");
fetchCryptoData("ZRX");


  

function mettreAJourHeure() {
	var elementHeure = document.getElementById('heure');
	var maintenant = new Date();

	// Créer une copie de l'heure actuelle
	var heureActuelle = new Date(maintenant);

	// Ajouter 3 heures et 20 minutes à l'heure actuelle
	maintenant.setHours(maintenant.getHours() + 3);
	maintenant.setMinutes(maintenant.getMinutes() + 20);

	var heuresMaintenant = maintenant.getHours();
	var minutesMaintenant = maintenant.getMinutes();
	var secondesMaintenant = maintenant.getSeconds();

	var heuresActuelle = heureActuelle.getHours();
	var minutesActuelle = heureActuelle.getMinutes();
	var secondesActuelle = heureActuelle.getSeconds();

	// Ajouter un zéro devant les chiffres < 10
	heuresMaintenant = heuresMaintenant < 10 ? '0' + heuresMaintenant : heuresMaintenant;
	minutesMaintenant = minutesMaintenant < 10 ? '0' + minutesMaintenant : minutesMaintenant;
	secondesMaintenant = secondesMaintenant < 10 ? '0' + secondesMaintenant : secondesMaintenant;

	heuresActuelle = heuresActuelle < 10 ? '0' + heuresActuelle : heuresActuelle;
	minutesActuelle = minutesActuelle < 10 ? '0' + minutesActuelle : minutesActuelle;
	secondesActuelle = secondesActuelle < 10 ? '0' + secondesActuelle : secondesActuelle;

	// Mettre à jour le contenu de l'élément avec les deux heures
	elementHeure.innerHTML = heuresActuelle + ':' + minutesActuelle + ':' + secondesActuelle;
}

// Appeler la fonction pour mettre à jour l'heure
mettreAJourHeure();

