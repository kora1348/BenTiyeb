// Variables globales pour compter les variations positives et négatives
let globalPositiveCount = 0;
let globalNegativeCount = 0;

async function fetchCryptoData(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=1`
        );
        const data = await response.json();

        // Variables pour compter les variations positives et négatives pour cette crypto
        let totalVariation = 0;
        let positiveCount = 0;
        let negativeCount = 0;

        // Mise à jour du tableau avec les données et la couleur
        const cryptoRow = document.getElementById(symbol);

        for (let i = 0; i < data.length; i++) {
            const openPrice = parseFloat(data[i][1]);
            const closePrice = parseFloat(data[i][4]);
            const weeklyVariation = ((closePrice - openPrice) / openPrice) * 100;
            const cellIndex = i + 1; // Décalage d'une cellule pour éviter la première cellule (Crypto)

            const variationCell = cryptoRow.insertCell(cellIndex);
            const variationValue = weeklyVariation.toFixed(2);
            const weekStartDate = new Date(data[i][0]);
            const weekEndDate = new Date(data[i][6]);
            const optionsStart = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric" };
            const optionsEnd = { hour: "numeric", minute: "numeric" };
            variationCell.textContent = `${weekStartDate.toLocaleDateString(
                "fr-FR",
                optionsStart
            )} (${weekStartDate.toLocaleTimeString("fr-FR", optionsEnd)}) - ${weekEndDate.toLocaleDateString(
                "fr-FR",
                optionsStart
            )} (${weekEndDate.toLocaleTimeString("fr-FR", optionsEnd)}): ${variationValue}%`;

            // Ajouter la classe "positive" ou "negative" en fonction de la variation hebdomadaire
            if (weeklyVariation > 0) {
                variationCell.classList.add("positive");
                positiveCount++; // Incrémente le nombre de variations positives pour cette crypto
            } else if (weeklyVariation < 0) {
                variationCell.classList.add("negative");
                negativeCount++; // Incrémente le nombre de variations négatives pour cette crypto
            }

            totalVariation += weeklyVariation; // Ajouter la variation hebdomadaire au total
        }

        // Mise à jour des totaux globaux
        globalPositiveCount += positiveCount;
        globalNegativeCount += negativeCount;

        // Ajouter la cellule pour afficher le total de variation
        const totalCell = cryptoRow.insertCell(data.length + 1);
        const totalValue = totalVariation.toFixed(2);
        totalCell.style.textAlign = 'center';

        const cryptoNamesElement = document.getElementById('cryptoNames');

        // Ajouter la classe "positive" pour le total dans la plage spécifiée
        if ((totalVariation >= 5.00 && totalVariation <= 5.99)) {
            totalCell.classList.add("positive");
            cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG, ${totalValue}%</p>`;
        }

        if ((totalVariation >= -5.99 && totalVariation <= -5.00)) {
            totalCell.classList.add("negative");
            cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: SHORT, ${totalValue}%</p>`;
        }

        if (totalVariation < 0) {
            totalCell.classList.add("negative");
        }

        if (totalVariation > 0) {
            totalCell.classList.add("positive");
        }

        totalCell.textContent = `${totalValue}%`;

        // Mettre à jour le contenu du div #positiveNegative avec les totaux globaux
        const positiveNegativeDiv = document.getElementById("positiveNegative");
        positiveNegativeDiv.innerHTML = `Total des variations positives : ${globalPositiveCount}, Total des variations négatives : ${globalNegativeCount}`;

    } catch (error) {
        console.error(
            `Erreur lors de la récupération des données pour ${symbol}:`,
            error
        );
    }
}

// Liste des cryptos à analyser
const cryptos = ["1INCH", "AAVE", "ACE", "ACH", "ADA", "AEVO", "AGIX", "AGLD", "ALGO", "ALICE", "ALPHA", "ALT", "AMB", "ANKR", "ANT", "APE", "API3", "APT", "AR", "ARB", "ARK", "ARKM", "ARPA", "ASTR", "ATA", "ATOM", "AUCTION", "AUDIO", "AVAX", "AXL", "AXS", "BADGER", "BAKE", "BAL", "BAND", "BAT", "BCH", "BEAMX", "BEL", "BICO", "BLUR", "BLZ", "BNB", "BNT", "BNX", "BOME", "BOND", "BONK", "BTC", "C98", "CAKE", "CELO", "CELR", "CFX", "CHR", "CHZ", "COMBO", "COMP", "COTI", "CRV", "CTK", "CTSI", "CVX", "CYBER", "DAR", "DASH", "DENT", "DGB", "DOGE", "DOT", "DUSK", "DYM", "DYDX", "EDU", "EGLD", "ENJ", "ENS", "EOS", "ETC", "ETH", "ETHFI", "FET", "FIL", "FLM", "FLOKI", "FLOW", "FRONT", "FTM", "FXS", "GALA", "GAL", "GAS", "GLMR", "GMT", "GMX", "GRT", "GTC", "HBAR", "HFT", "HIFI", "HIGH", "HOOK", "HOT", "ICP", "ICX", "IDEX", "ID", "ILV", "IMX", "INJ", "IOST", "IOTA", "IOTX", "JASMY", "JOE", "JTO", "JUP", "KAVA", "KEY", "KLAY", "KNC", "KSM", "LDO", "LEVER", "LINA", "LINK", "LIT", "LOOM", "LPT", "LQTY", "LRC", "LSK", "LTC", "LUNC", "MAGIC", "MANTA", "MANA", "MASK", "MATIC", "MAV", "MBL", "MDT", "MEME", "METIS", "MINA", "MKR", "MOVR", "MTL", "NEAR", "NEO", "NFP", "NKN", "NMR", "NTRN", "OCEAN", "OGN", "OMG", "ONE", "ONDO", "ONG", "ONT", "OP", "ORBS", "ORDI", "OXT", "PENDLE", "PEOPLE", "PEPE", "PERP", "PHB", "PIXEL", "POLYX", "PORTAL", "POWR", "PYTH", "QNT", "QTUM", "RAD", "RDNT", "REEF", "REN", "RLC", "RNDR", "RONIN", "ROSE", "RSR", "RUNE", "RVN", "SAND", "1000SATS", "SEI", "SFP", "SHIB", "SKL", "SLP", "SNT", "SNX", "SOL", "SPELL", "SSV", "STEEM", "STG", "STMX", "STORJ", "STPT", "STRAX", "STRK", "STX", "SUI", "SUPER", "SUSHI", "SXP", "THETA", "TIA", "TLM", "TRB", "TRU", "TRX", "T", "TWT", "UMA", "UNFI", "UNI", "USDC", "USTC", "USDT", "VET", "WAVES", "WAXP", "WIF", "WLD", "WOO", "XEM", "XLM", "XRP", "XTZ", "XVG", "XVS", "YFI", "YGG", "ZEC", "ZEN", "ZIL", "ZRX"];

// Appel de la fonction pour obtenir les taux de variation des cryptos
cryptos.forEach(fetchCryptoData);

  

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

function generateSortedRandomTimes(count) {
    const times = [];

    // Générer 'count' heures aléatoires
    for (let i = 0; i < count; i++) {
        times.push(getRandomTime());
    }

    // Convertir les heures en minutes pour trier
    times.sort((a, b) => {
        const [hoursA, minutesA] = a.split('h').map(Number);
        const [hoursB, minutesB] = b.split('h').map(Number);

        return (hoursA * 60 + minutesA) - (hoursB * 60 + minutesB);
    });

    return times;
}

// Afficher quatre heures aléatoires triées
const sortedTimes = generateSortedRandomTimes(4);
document.getElementById('hour1').innerText = sortedTimes[0];
document.getElementById('hour2').innerText = sortedTimes[1];

