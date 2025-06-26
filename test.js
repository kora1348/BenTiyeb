  const symbols = ["AAVE","ACH","ACT","ACX","ARB","ARKM","AR","ATOM","AUCTION","A","AVAX", "BABY","BANANAS31","BANANA","BCH","BEAMX","BERA","BIGTIME","BIO","BLUR","BMT","BNB","BOME","BONK","BROCCOLI714","BTC",
    "CHESS","CHZ","CKB","COOKIE","COW","CRV","CVC", "DF","DOGE","DOGS","DOT","DYDX", "EGLD","EIGEN","ENA","ENJ","ENS","EPIC","ETHFI","ETH","EURI","EUR",
    "FDUSD","FET","FIL","FLOKI","FLUX","FORM", "GALA","GMT","GMX","GPS","GUN","HAEDAL","HBAR","HEI","HIVE","HMSTR","HOME","HUMA","HYPER",
    "ICP","IDEX","INIT","INJ","IOTA", "JTO","JUP","JUV", "KAIA","KAITO","KERNEL","KMNO", "NEAR","NEIRO","NEO","NEWT","NIL","NOT","NXPC",
    "OMNI","OM","ONDO","ONT","OP","ORCA","ORDI","OSMO", "PARTI","PAXG","PENDLE","PENGU","PEOPLE", "RSR","RUNE",
    "SAGA","SAND","SEI","SHELL","SHIB","SIGN","SLF","SOL","SOPH","SPK","STEEM","STO","STRK", "TURBO","T","TUT","UNI","USUAL","UTK",
    "VANA","VANRY","VELODROME","VET","VIRTUAL", "WCT", "XTZ", "YGG", "ZEN","ZK","ZRO",
  ];

    async function fetchCryptoData(symbol) {
      try {
        // Récupération de TOUTES les bougies disponibles (intervalle mensuel)
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1M`);
        const data = await response.json();

        if (!data || data.length === 0) throw new Error("Pas de données");

        const allLows = data.map(kline => parseFloat(kline[3])); // 3 = low (mèche la plus basse)
        const lowestPrice = Math.min(...allLows);

        const latestCandle = data[data.length - 1];
        const currentPrice = parseFloat(latestCandle[4]); // 4 = close (prix actuel ≈ dernier close)

        const percentDiff = ((currentPrice - lowestPrice) / lowestPrice) * 100;

        const row = document.getElementById(symbol);
        const currentCell = row.insertCell(1);
        const lowestCell = row.insertCell(2);
        const diffCell = row.insertCell(3);

        currentCell.textContent = currentPrice.toFixed(6);
        lowestCell.textContent = lowestPrice.toFixed(6);
        diffCell.textContent = percentDiff.toFixed(2) + "%";

        if (percentDiff >= 0) {
          diffCell.classList.add("positive");
        } else {
          diffCell.classList.add("negative");
        }
      } catch (error) {
        console.error(`Erreur pour ${symbol}:`, error);
        const row = document.getElementById(symbol);
        const errorCell = row.insertCell(1);
        errorCell.colSpan = 3;
        errorCell.textContent = "Données indisponibles";
        errorCell.style.color = "gray";
      }
    }

    symbols.forEach(fetchCryptoData);




function mettreAJourHeure() {
  var elementHeure = document.getElementById("heure");
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
  heuresMaintenant =
    heuresMaintenant < 10 ? "0" + heuresMaintenant : heuresMaintenant;
  minutesMaintenant =
    minutesMaintenant < 10 ? "0" + minutesMaintenant : minutesMaintenant;
  secondesMaintenant =
    secondesMaintenant < 10 ? "0" + secondesMaintenant : secondesMaintenant;

  heuresActuelle = heuresActuelle < 10 ? "0" + heuresActuelle : heuresActuelle;
  minutesActuelle =
    minutesActuelle < 10 ? "0" + minutesActuelle : minutesActuelle;
  secondesActuelle =
    secondesActuelle < 10 ? "0" + secondesActuelle : secondesActuelle;

  // Mettre à jour le contenu de l'élément avec les deux heures
  elementHeure.innerHTML =
    heuresActuelle + ":" + minutesActuelle + ":" + secondesActuelle;
}

// Appeler la fonction pour mettre à jour l'heure
mettreAJourHeure();
