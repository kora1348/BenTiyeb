document.getElementById('loadButton').addEventListener('click', () => {
  const url = 'https://fapi.binance.com/fapi/v1/exchangeInfo';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const perpetualPairs = data.symbols
        .filter(symbol =>
          symbol.contractType === 'PERPETUAL' &&
          symbol.symbol.endsWith('USDC')
        )
        .map(symbol => symbol.symbol)
        .sort(); // Tri alphabétique

      const listElement = document.getElementById('cryptoList');
      listElement.innerHTML = ''; // Réinitialiser la liste

      // Ajouter les paires dans une liste verticale
      perpetualPairs.forEach(pair => {
        const div = document.createElement('div');
        div.textContent = pair;
        div.className = 'pair-item'; // Appliquer les styles CSS
        listElement.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error.message);
    });
});
