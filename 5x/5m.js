async function getKlines(symbol, interval, limit) {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données des klines:', error);
      return [];
    }
  }
  
  async function checkCryptoStatus(symbol) {
    const klines = await getKlines(symbol, '1d', 1); // Vérifie les klines sur 1 heure, limite à 1
    if (klines.length === 0) {
      console.log(`La cryptomonnaie ${symbol} semble avoir été délistée.`);
    } else {
      console.log(`La cryptomonnaie ${symbol} est toujours listée.`);
    }
  }
  
  // Exemple d'utilisation
  const symbol = 'KEYUSDT'; // Remplace par le symbole de la cryptomonnaie souhaitée
  
  checkCryptoStatus(symbol);
  