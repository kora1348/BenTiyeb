// Liste des cryptos
const cryptos = [
    "1INCH", "AAVE", "ACE", "ACH", "ADA", "AEVO", "AGLD", "AI", "ALGO", "ALICE", "ALPACA", "ALPHA",
    "ALT", "AMB", "ANKR", "APE", "API3", "APT", "ARB", "ARKM", "ARK", "ARPA", "AR", "ASTR", "ATA",
    "ATOM", "AUCTION", "AVAX", "AXL", "AXS", "BADGER", "BAKE", "BAL", "BANANA", "BAND", "BAT", "BB",
    "BCH", "BEAMX", "BEL", "BICO", "BLUR", "BLZ", "BNB", "BNT", "BNX", "BOME", "BONK", "BOND", "BTC",
    "C98", "CAKE", "CELO", "CELR", "CFX", "CHR", "CHZ", "CKB", "COMBO", "COMP", "COTI", "CRV",
    "CTSI", "CYBER", "DAR", "DASH", "DENT", "DOGE", "DOGS", "DOT", "DUSK", "DYDX", "DYM", "EDU",
    "EGLD", "ENA", "ENJ", "ENS", "EOS", "ETC", "ETHFI", "ETH", "FET", "FIL", "FLM", "FLOKI", "FLOW",
    "FTM", "FXS", "GALA", "GAS", "GLM", "GMT", "GMX", "GRT", "GTC", "G", "HBAR", "HFT", "HIFI",
    "HIGH", "HOOK", "HOT", "ICP", "ICX", "ID", "ILV", "IMX", "INJ", "IOST", "IOTA", "IOTX", "IO",
    "JASMY", "JOE", "JTO", "JUP", "KAVA", "KEY", "KLAY", "KNC", "KSM", "LDO", "LEVER", "LINA", "LINK", 
    "LISTA", "LIT", "LOOM", "LPT", "LQTY", "LRC", "LSK", "LTC", "LUNC", "MAGIC", "MANA", "MANTA", 
    "MASK", "MAV", "MEME", "METIS", "MINA", "MKR", "MOVR", "MTL", "NEAR", "NEO", "NFP", "NKN", 
    "NMR", "NOT", "NTRN", "OGN", "OMG", "OMNI", "OM", "ONE", "ONG", "ONT", "OP", "ORDI", "OXT", 
    "PENDLE", "PEOPLE", "PEPE", "PERP", "PHB", "PIXEL", "POLYX", "PORTAL", "POWR", "PYTH", "QNT", 
    "QTUM", "RARE", "RDNT", "REEF", "RENDER", "REN", "REZ", "RIF", "RLC", "RONIN", "ROSE", "RSR", 
    "RUNE", "RVN", "SAGA", "SAND", "SEI", "SFP", "SHIB", "SKL", "SNX", "SOL", "SPELL", "SSV", 
    "STEEM", "STG", "STMX", "STORJ", "STRK", "STX", "SUI", "SUN", "SUPER", "SUSHI", "SXP", "SYN", 
    "SYS", "TAO", "THETA", "TIA", "TLM", "TNSR", "TON", "TRB", "TRU", "TRX", "TWT", "UMA", "UNFI", 
    "UNI", "USTC", "VANRY", "VET", "VIDT", "VOXEL", "WAXP", "WIF", "WLD", "WOO", "W", "XAI", "XEC", 
    "XEM", "XLM", "XRP", "XTZ", "XVG", "XVS", "YFI", "YGG", "ZEC", "ZIL", "ZK", "ZRO", "ZRX"
  ];

  
  // Fonction pour récupérer les données de toutes les cryptos
  function fetchAllCryptoData() {
    cryptos.forEach(crypto => {
      fetchCryptoDataAtTime(crypto, 3, 1); // Cellule pour il y a 3 ans
      fetchCryptoDataAtTime(crypto, 2, 2); // Cellule pour il y a 2 ans
      fetchCryptoDataAtTime(crypto, 1, 3); // Cellule pour l'année dernière
    });
  }
  
  // Appel de la fonction pour lancer la récupération des données pour toutes les cryptos
  fetchAllCryptoData();
  
  // Fonction asynchrone pour récupérer les données d'une crypto à une année spécifique
  async function fetchCryptoDataAtTime(symbol, yearOffset, cellIndex) {
      // Récupérer la date et l'heure actuelles
      const currentDate = new Date();
  
      // Calculer l'année cible en fonction de l'offset
      const targetYear = currentDate.getFullYear() - yearOffset;
  
      // Ajuster l'année de la date cible
      currentDate.setFullYear(targetYear);
      
      // Convertir la date cible en timestamp (date actuelle mais avec une année différente)
      const startTime = currentDate.getTime(); 
  
      try {
          const response = await fetch(
              `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=15m&startTime=${startTime}&limit=1`
          );
          const data = await response.json();
  
          if (data.length === 0) {
              console.log(`Aucune donnée trouvée pour ${symbol} à ${targetYear}`);
              return;
          }
  
          const openPrice = parseFloat(data[0][1]);
          const closePrice = parseFloat(data[0][4]);
          const variation = ((closePrice - openPrice) / openPrice) * 100;
  
          const dateTime = new Date(data[0][0]);
          const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
  
          const formattedDate = dateTime.toLocaleDateString("fr-FR", options);
  
          // Insérer la variation dans la cellule correspondante du tableau
          const cryptoRow = document.getElementById(symbol);
          const variationCell = cryptoRow.insertCell(cellIndex); // Insérer la cellule dans la colonne correspondante
          variationCell.textContent = `${formattedDate} : ${variation.toFixed(2)}%`;
  
          // Ajouter la classe "positive" ou "negative" en fonction de la variation
          if (variation > 0) {
              variationCell.classList.add("positive");
          } else if (variation < 0) {
              variationCell.classList.add("negative");
          }
  
      } catch (error) {
          console.error(
              `Erreur lors de la récupération des données pour ${symbol} à ${targetYear}:`,
              error
          );
      }
  }
  