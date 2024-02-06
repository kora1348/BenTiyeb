// Fonction pour récupérer la liste de toutes les cryptomonnaies avec leur ID
async function getAllCryptos() {
  try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Une erreur s\'est produite :', error);
  }
}

// Fonction pour récupérer les informations détaillées sur une cryptomonnaie spécifique
async function getCryptoDetails(cryptoId) {
  try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Une erreur s\'est produite :', error);
  }
}

// Fonction pour afficher les nouvelles cryptomonnaies avec leur date de parution
async function displayNewCryptosWithReleaseDate() {
  const allCryptos = await getAllCryptos();
  const newCryptos = [];

  for (const crypto of allCryptos) {
      const cryptoDetails = await getCryptoDetails(crypto.id);
      if (cryptoDetails && cryptoDetails.genesis_date) {
          newCryptos.push({ name: crypto.name, symbol: crypto.symbol, releaseDate: cryptoDetails.genesis_date });
      }
  }

  if (newCryptos.length > 0) {
      console.log('Nouvelles cryptomonnaies apparues avec leur date de parution :');
      newCryptos.forEach(crypto => {
          console.log(`${crypto.name} (${crypto.symbol}) - Date de parution : ${crypto.releaseDate}`);
      });
  } else {
      console.log('Aucune nouvelle cryptomonnaie n\'a été trouvée.');
  }
}

// Appel de la fonction pour afficher les nouvelles cryptomonnaies avec leur date de parution
displayNewCryptosWithReleaseDate();
