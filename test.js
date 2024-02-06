// Fonction pour récupérer les cryptomonnaies depuis l'API CoinGecko
async function getCryptos() {
  try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Une erreur s\'est produite :', error);
  }
}

// Fonction pour afficher les données dans la console
async function displayCryptos() {
  const cryptos = await getCryptos();
  if (cryptos) {
      console.log('Liste des cryptomonnaies :');
      cryptos.forEach(crypto => {
          console.log(`${crypto.name} (${crypto.symbol}): $${crypto.current_price}`);
      });
  }
}

// Appel de la fonction pour afficher les cryptomonnaies
displayCryptos();
