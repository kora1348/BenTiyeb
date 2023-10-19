// Créer un objet pour gérer l'état des notifications
const notificationState = {};

// Fonction pour mettre à jour les données d'une crypto
async function updateCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=2`
    );
    const data = await response.json();

    // Calcul du total des taux de variation sur 4 intervalles de 15 minutes
    let totalVariation = 0;

    // Mise à jour du tableau avec les données et la couleur
    const cryptoRow = document.getElementById(symbol);

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const intervalVariation = ((closePrice - openPrice) / openPrice) * 100;
      const cellIndex = i + 1; // Décalage d'une cellule pour éviter la première cellule (Crypto)

      const variationCell = cryptoRow.insertCell(cellIndex);
      const variationValue = intervalVariation.toFixed(2);
      const timestamp = parseInt(data[i][0]);
      const dateValue = new Date(timestamp);
      const hour = dateValue.getHours();
      const minute = dateValue.getMinutes();
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

      variationCell.textContent = `${formattedTime}: ${variationValue}%`;

      // Ne pas ajouter de classe de couleur aux cellules individuelles
      totalVariation += intervalVariation; // Ajouter la variation de l'intervalle au total
    }

    // Ajouter la cellule pour afficher le total de variation
    const totalCell = cryptoRow.insertCell(data.length + 1);
    const totalValue = totalVariation.toFixed(2);
    totalCell.textContent = `${totalValue}%`;

    if (totalVariation >= 0.10 && totalVariation <= 0.30) {
      checkAndNotify(symbol, totalVariation);
    }

  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${symbol}:`,
      error
    );
  }
}

// Fonction pour vérifier la variation et envoyer une notification si nécessaire
function checkAndNotify(symbol, totalVariation) {
  if (totalVariation >= 0.10 && totalVariation <= 0.30) {
    // Vérifier si une notification a déjà été affichée pour cette condition
    if (!notificationState[symbol]) {
      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
      createNotification(symbol, `Le taux de variance est entre 0.10 et 0.30 (${formattedTime})`);
      notificationState[symbol] = Date.now(); // Enregistrez le moment où la notification a été affichée
    }
  } else {
    // Si la condition n'est plus vraie, réinitialisez l'état de notification
    notificationState[symbol] = null;
  }
}

// Fonction pour créer une notification de navigateur
function createNotification(cryptoName, message) {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        try {
          const notification = new Notification(cryptoName, { body: message });
          // Détruire la notification après 1 minute
          setTimeout(() => {
            notification.close();
          }, 60000);
        } catch (error) {
          console.error("Erreur lors de la création de la notification:", error);
        }
      } else {
        console.error("Permission de notification non accordée");
      }
    }).catch(error => {
      console.error("Erreur lors de la demande de permission de notification:", error);
    });
  }
}

async function refreshData(symbol) {
  while (true) {
    await updateCryptoData(symbol);
    await new Promise(resolve => setTimeout(resolve, 60000));
  }
}

// Démarrez le rafraîchissement et la notification lorsque la permission est accordée
if ("Notification" in window) {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      refreshData("1INCH");
      refreshData("AAVE");
      refreshData("ACH");
      refreshData("ADA");
      refreshData("AGIX");
      refreshData("AGLD");
      refreshData("ALGO");
    
      // ... (ajoutez d'autres crypto-monnaies à surveiller ici)
    }
  }).catch(error => {
    console.error("Erreur lors de la demande de permission de notification:", error);
  });
}

// Fonction pour rafraîchir la page toutes les 20 secondes
function refreshPage() {
  location.reload();
}

// Appeler la fonction refreshPage() toutes les 20 secondes
setInterval(refreshPage, 20000); // 20 000 millisecondes = 20 secondes
