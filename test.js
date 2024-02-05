const socket = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');

// Écoutez les mises à jour du flux
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);

  // Le tableau `data` contient les mini-tickers pour toutes les paires
  data.forEach((miniTicker) => {
    const symbol = miniTicker.s;
    const closePrice = miniTicker.c;

    // Vous pouvez filtrer les nouvelles cryptos en fonction de vos critères
    // Par exemple, vérifiez si la paire n'existait pas dans votre liste précédente
    // ou utilisez d'autres critères pour déterminer si c'est une nouvelle crypto

    // Affichez les informations de la nouvelle crypto
    console.log(`Nouvelle crypto : ${symbol}, Dernier prix de clôture : ${closePrice}`);
  });
});

// Gérez les erreurs de connexion
socket.addEventListener('error', (error) => {
  console.error('Erreur de connexion WebSocket :', error.message);
});

// Gérez la fermeture de la connexion
socket.addEventListener('close', (event) => {
  if (event.wasClean) {
    console.log(`Connexion WebSocket fermée proprement, code : ${event.code}, raison : ${event.reason}`);
  } else {
    console.error('Connexion WebSocket interrompue de manière inattendue');
  }
});

// Gérez les événements d'ouverture de la connexion
socket.addEventListener('open', () => {
  console.log('Connexion WebSocket ouverte avec succès');
});
