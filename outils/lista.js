document.getElementById('loadButton').addEventListener('click', async () => {
  const spotURL = 'https://api.binance.com/api/v3/exchangeInfo';
  const futuresURL = 'https://fapi.binance.com/fapi/v1/exchangeInfo';

  try {
    const [spotResponse, futuresResponse] = await Promise.all([
      fetch(spotURL),
      fetch(futuresURL)
    ]);

    const spotData = await spotResponse.json();
    const futuresData = await futuresResponse.json();

    const spotPairs = spotData.symbols.map(symbol => `SPOT: ${symbol.symbol}`);
    const futuresPairs = futuresData.symbols.map(symbol => {
      const type = symbol.contractType || 'UNKNOWN';
      return `FUTURES (${type}): ${symbol.symbol}`;
    });

    const allPairs = [...spotPairs, ...futuresPairs].sort();

    const listElement = document.getElementById('cryptoList');
    listElement.innerHTML = ''; // Réinitialiser la liste

    allPairs.forEach(pair => {
      const div = document.createElement('div');
      div.textContent = pair;
      div.className = 'pair-item';
      listElement.appendChild(div);
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error.message);
  }
});
