// Liste des symboles de cryptomonnaies
const cryptoSymbols = [
    "1INCH", "AAVE", "ACE", "ACH", "ADA", "AEVO", "AGIX", "AGLD", "ALGO", "ALICE",
    "ALPHA", "ALT", "AMB", "ANKR", "ANT", "APE", "API3", "APT", "AR", "ARB", "ARK",
    "ARKM", "ARPA", "ASTR", "ATA", "ATOM", "AUCTION", "AUDIO", "AVAX", "AXL", "AXS",
    "BADGER", "BAKE", "BAL", "BAND", "BAT", "BCH", "BEAMX", "BEL", "BICO", "BLUR",
    "BLZ", "BNB", "BNT", "BNX", "BOME", "BOND", "BONK", "BTC", "C98", "CAKE", "CELO",
    "CELR", "CFX", "CHR", "CHZ", "COMBO", "COMP", "COTI", "CRV", "CTK", "CTSI", "CVX",
    "CYBER", "DAR", "DASH", "DENT", "DGB", "DOGE", "DOT", "DUSK", "DYM", "DYDX", "EDU",
    "EGLD", "ENJ", "ENS", "EOS", "ETC", "ETH", "ETHFI", "FET", "FIL", "FLM", "FLOKI",
    "FLOW", "FRONT", "FTM", "FXS", "GALA", "GAL", "GAS", "GLMR", "GMT", "GMX", "GRT",
    "GTC", "HBAR", "HFT", "HIFI", "HIGH", "HOOK", "HOT", "ICP", "ICX", "IDEX", "ID",
    "ILV", "IMX", "INJ", "IOST", "IOTA", "IOTX", "JASMY", "JOE", "JTO", "JUP", "KAVA",
    "KEY", "KLAY", "KNC", "KSM", "LDO", "LEVER", "LINA", "LINK", "LIT", "LOOM", "LPT",
    "LQTY", "LRC", "LSK", "LTC", "LUNC", "MAGIC", "MANTA", "MANA", "MASK", "MATIC",
    "MAV", "MBL", "MDT", "MEME", "METIS", "MINA", "MKR", "MOVR", "MTL", "NEAR", "NEO",
    "NFP", "NKN", "NMR", "NTRN", "OCEAN", "OGN", "OMG", "ONE", "ONDO", "ONG", "ONT",
    "OP", "ORBS", "ORDI", "OXT", "PENDLE", "PEOPLE", "PEPE", "PERP", "PHB", "PIXEL",
    "POLYX", "PORTAL", "POWR", "PYTH", "QNT", "QTUM", "RAD", "RDNT", "REEF", "REN",
    "RLC", "RNDR", "RONIN", "ROSE", "RSR", "RUNE", "RVN", "SAND", "1000SATS", "SEI",
    "SFP", "SHIB", "SKL", "SLP", "SNT", "SNX", "SOL", "SPELL", "SSV", "STEEM", "STG",
    "STMX", "STORJ", "STPT", "STRAX", "STRK", "STX", "SUI", "SUPER", "SUSHI", "SXP",
    "THETA", "TIA", "TLM", "TRB", "TRU", "TRX", "T", "TWT", "UMA", "UNFI", "UNI", 
    "USDC", "USTC", "USDT", "VET", "WAVES", "WAXP", "WIF", "WLD", "WOO", "XEM", 
    "XLM", "XRP", "XTZ", "XVG", "XVS", "YFI", "YGG", "ZEC", "ZEN", "ZIL", "ZRX"
  ];
  
  // Sélectionner une cryptomonnaie au hasard
  const randomIndex = Math.floor(Math.random() * cryptoSymbols.length);
  const randomCrypto = cryptoSymbols[randomIndex];
  
  // Générer une couleur aléatoire (rouge ou vert)
  const randomColor = Math.random() < 0.5 ? "VERT" : "ROUGE";
  
  // Afficher le résultat
  const cryptoNamesElement = document.getElementById("cryptoNames");
  cryptoNamesElement.textContent = `${randomCrypto} -> ${randomColor}`;
  
  

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

function getRandomTime() {
    const startHour = 8;  // 08:00
    const endHour = 23;   // 23:59
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    let randomHour, randomMinute;

    if (currentHour >= startHour && currentHour <= endHour) {
        randomHour = Math.floor(Math.random() * (endHour - currentHour + 1)) + currentHour;
        if (randomHour === currentHour) {
            const remainingMinutes = Math.floor((60 - currentMinute) / 3);
            randomMinute = Math.floor(Math.random() * remainingMinutes) * 3 + currentMinute;
        } else {
            randomMinute = Math.floor(Math.random() * 20) * 3;  // Minutes: 0, 3, 6, ..., 57
        }
    } else {
        randomHour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
        randomMinute = Math.floor(Math.random() * 20) * 3;  // Minutes: 0, 3, 6, ..., 57
    }

    const formattedHour = String(randomHour).padStart(2, '0');
    const formattedMinute = String(randomMinute).padStart(2, '0');

    return `${formattedHour}h${formattedMinute}`;
}

