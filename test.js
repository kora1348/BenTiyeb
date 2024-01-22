// Fonction pour se connecter au flux de données en temps réel
function connectToWebSocket() {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    // Gestion des messages reçus
    socket.onmessage = (event) => {
        const fundingRatesData = JSON.parse(event.data);

        // Affichage des données dans la console
        console.log('Données en temps réel:', fundingRatesData);

        // Mise à jour du tableau HTML ou effectuer toute autre action en temps réel
        updateTable(fundingRatesData);
    };

    // Gestion des erreurs
    socket.onerror = (error) => {
        console.error('Erreur de connexion WebSocket:', error);
    };

    // Gestion de la fermeture de la connexion
    socket.onclose = (event) => {
        console.log('Connexion WebSocket fermée:', event);
    };
}

// Fonction pour mettre à jour le tableau HTML avec les nouvelles données en temps réel
function updateTable(data) {
    const dataTable = document.querySelector('#data-table tbody');

    // Créez une nouvelle ligne dans le tableau
    const newRow = dataTable.insertRow();

    // Boucle à travers les données et créez des cellules pour chaque propriété
    for (const key in data) {
        const cellKey = newRow.insertCell(0);
        cellKey.textContent = key;

        const cellValue = newRow.insertCell(1);
        cellValue.textContent = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
    }
}

// Appel de la fonction pour se connecter au flux de données en temps réel
connectToWebSocket();
