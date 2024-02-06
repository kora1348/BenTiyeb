// Utilisation de l'API fetch pour effectuer une requête HTTP
fetch('https://api.coingecko.com/api/v3/coins/list')
  .then(response => response.json()) // Convertir la réponse en JSON
  .then(data => {
    // Parcourir les données pour afficher chaque crypto et sa date de listing
    data.forEach(crypto => {
      console.log(`Nom : ${crypto.name}, Symbole : ${crypto.symbol}, Date de listing : ${crypto.ath_date}`);
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });
