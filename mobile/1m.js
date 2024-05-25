const symbols = ['1INCHUSDT', 'AAVEUSDT', 'ACEUSDT', 'ACHUSDT', 'ADAUSDT', 'AEVOUSDT', 'AGIXUSDT', 'AGLDUSDT', 
'ALGOUSDT', 'ALICEUSDT', 'ALPHAUSDT', 'ALTUSDT', 'AMBUSDT', 'ANKRUSDT', 'ANTUSDT', 'APEUSDT', 'API3USDT', 'APTUSDT', 'ARUSDT', 'ARBUSDT', 'ARKUSDT', 'ARKMUSDT', 
'ARPAUSDT', 'ASTRUSDT', 'ATAUSDT', 'ATOMUSDT', 'AUCTIONUSDT', 'AUDIOUSDT', 'AVAXUSDT', 'AXLUSDT', 'AXSUSDT', 'BADGERUSDT', 'BAKEUSDT', 'BALUSDT', 'BANDUSDT', 'BATUSDT',
'BCHUSDT', 'BEAMXUSDT', 'BELUSDT', 'BICOUSDT', 'BLURUSDT', 'BLZUSDT', 'BNBUSDT', 'BNTUSDT', 'BNXUSDT', 'BOMEUSDT', 
'BONDUSDT', 'BONKUSDT', 'BTCUSDT', 'C98USDT', 'CAKEUSDT', 'CELOUSDT', 'CELRUSDT', 'CFXUSDT', 'CHRUSDT', 'CHZUSDT', 
'COMBOUSDT', 'COMPUSDT', 'COTIUSDT', 'CRVUSDT', 'CTKUSDT', 'CTSIUSDT', 'CVXUSDT', 'CYBERUSDT', 'DARUSDT', 
'DASHUSDT', 'DENTUSDT', 'DGBUSDT', 'DOGEUSDT', 'DOTUSDT', 'DUSKUSDT', 'DYMUSDT', 'DYDXUSDT', 'EDUUSDT', 'EGLDUSDT', 
'ENJUSDT', 'ENSUSDT', 'EOSUSDT', 'ETCUSDT', 'ETHFIUSDT', 'ETHUSDT', 'FETUSDT', 'FILUSDT', 'FLMUSDT', 'FLOKIUSDT', 'FLOWUSDT', 
'FRONTUSDT', 'FTMUSDT', 'FXSUSDT', 'GALAUSDT', 'GALUSDT', 'GASUSDT', 'GLMRUSDT', 'GMTUSDT', 'GMXUSDT', 'GRTUSDT', 'GTCUSDT', 'HBARUSDT', 'HFTUSDT', 'HIFIUSDT', 'HIGHUSDT', 'HOOKUSDT', 
'HOTUSDT', 'ICPUSDT', 'ICXUSDT', 'IDUSDT', 'IDEXUSDT', 'ILVUSDT', 'IMXUSDT', 'INJUSDT', 'IOSTUSDT', 'IOTAUSDT', 'IOTXUSDT', 'JASMYUSDT', 'JOEUSDT', 'JTOUSDT', 'JUPUSDT', 'KAVAUSDT', 'KEYUSDT', 'KLAYUSDT', 'KNCUSDT', 'KSMUSDT', 
'LDOUSDT', 'LEVERUSDT', 'LINAUSDT', 'LINKUSDT', 'LITUSDT', 'LOOMUSDT', 'LPTUSDT', 'LQTYUSDT', 'LRCUSDT', 'LSKUSDT', 'LTCUSDT', 'LUNCUSDT', 'MAGICUSDT', 'MANTAUSDT', 
'MANAUSDT', 'MASKUSDT', 'MATICUSDT', 'MAVUSDT', 'MBLUSDT', 'MDTUSDT', 'MEMEUSDT', 'METISUSDT', 'MINAUSDT', 'MKRUSDT', 'MOVRUSDT', 'MTLUSDT', 'NEARUSDT', 'NEOUSDT', 'NFPUSDT', 'NKNUSDT', 'NMRUSDT', 'NTRNUSDT', 'OCEANUSDT', 'OGNUSDT', 'OMGUSDT', 'ONEUSDT', 'ONDOUSDT', 'ONGUSDT', 'ONTUSDT', 'OPUSDT', 'ORBSUSDT', 'ORDIUSDT', 'OXTUSDT', 
'PENDLEUSDT', 'PEOPLEUSDT', 'PEPEUSDT', 'PERPUSDT', 'PHBUSDT', 'PIXELUSDT', 'POLYXUSDT', 'PORTALUSDT', 'POWRUSDT', 'PYTHUSDT', 'QNTUSDT', 'QTUMUSDT', 'RADUSDT', 'RDNTUSDT', 'REEFUSDT', 'RENUSDT', 'RLCUSDT', 'RNDRUSDT', 'RONINUSDT', 'ROSEUSDT', 'RSRUSDT', 'RUNEUSDT', 
'RVNUSDT', 'SANDUSDT', '1000SATSUSDT', 'SEIUSDT', 'SFPUSDT', 'SHIBUSDT', 'SKLUSDT', 'SLPUSDT', 'SNTUSDT', 'SNXUSDT', 'SOLUSDT', 'SPELLUSDT', 'SSVUSDT', 'STEEMUSDT', 'STGUSDT', 'STMXUSDT', 'STORJUSDT', 'STPTUSDT', 'STRAXUSDT', 'STRKUSDT', 'STXUSDT', 'SUIUSDT', 'SUPERUSDT', 'SUSHIUSDT', 'SXPUSDT', 'THETAUSDT',
'TIAUSDT', 'TLMUSDT', 'TRBUSDT', 'TRUUSDT', 'TRXUSDT', 'TUSDT', 'TWTUSDT', 'UMAUSDT', 'UNFIUSDT', 'UNIUSDT', 'USDCUSDT', 'USTCUSDT', 'USDT', 'VETUSDT', 'WAVESUSDT', 'WAXPUSDT', 'WIFUSDT', 'WLDUSDT', 'WOOUSDT', 
'XEMUSDT', 'XLMUSDT', 'XRPUSDT', 'XTZUSDT', 'XVGUSDT', 'XVSUSDT', 'YFIUSDT', 'YGGUSDT', 'ZECUSDT', 'ZENUSDT', 'ZILUSDT', 'ZRXUSDT'];
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

const checkCross = async () => {
    const tableBody = document.getElementById('crypto-table');
    tableBody.innerHTML = ''; // Réinitialiser le tableau

    for (const symbol of symbols) {
        const data = await fetchKlines(symbol);
        if (!data) continue;

        const ma7 = calculateMA(data.slice(0, ma7Period), ma7Period);
        const ma25 = calculateMA(data.slice(0, ma25Period), ma25Period);

        const row = document.createElement('tr');
        const cellSymbol = document.createElement('td');
        const cellStatus = document.createElement('td');

        cellSymbol.textContent = symbol;

        if (ma25 > ma7) {
            cellStatus.textContent = 'Au-dessus';
            row.classList.add('above');
        } else {
            cellStatus.textContent = 'En dessous';
            row.classList.add('below');
        }

        row.appendChild(cellSymbol);
        row.appendChild(cellStatus);
        tableBody.appendChild(row);
    }
};

// Appeler la fonction checkCross pour vérifier les croisements de moyennes mobiles
checkCross();


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
