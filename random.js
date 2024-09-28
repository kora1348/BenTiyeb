function generateRandomMinutes() {
    const startHour = 8; // 08h00
    const endHour = 22;  // 22h00
    const interval = 5;  // 5 minutes
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const validTimes = [];

    // Boucle pour ajouter les heures et minutes valides
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            if (hour > currentHour || (hour === currentHour && minute >= currentMinute)) {
                validTimes.push({ hour, minute });
            }
        }
    }

    // Mélanger les heures et minutes valides
    validTimes.sort(() => Math.random() - 0.5);

    // Trier ensuite les minutes sélectionnées dans l'ordre croissant
    const randomMinutes = validTimes.slice(0, 3).sort((a, b) => {
        if (a.hour === b.hour) {
            return a.minute - b.minute;
        }
        return a.hour - b.hour;
    });

    // Mettre à jour l'affichage dans les <p>
    for (let i = 0; i < randomMinutes.length; i++) {
        const time = randomMinutes[i];
        const formattedTime = `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
        document.getElementById(`minute${i + 1}`).innerText = formattedTime;
    }
}

function getRandomTimes() {
    const randomTimes = [];

    // Générer 3 heures aléatoires entre 08:00 et 22:00
    for (let i = 0; i < 3; i++) {
        const randomHour = Math.floor(Math.random() * (22 - 8 + 1)) + 8; // de 08 à 22 heures
        const hour = randomHour.toString().padStart(2, '0');
        const minute = '00'; // minutes fixes à 00
        randomTimes.push(`${hour}:${minute}`);
    }

    // Trier les heures dans l'ordre croissant
    randomTimes.sort();
    
    return randomTimes;
}

function displayRandomTimes() {
    const randomTimes = getRandomTimes();

    // Mettre à jour l'affichage dans les <p> avec des ID spécifiques
    for (let i = 0; i < randomTimes.length; i++) {
        document.getElementById(`hour${i + 1}`).textContent = randomTimes[i];
    }
}



// Attendre que le DOM soit complètement chargé avant d'exécuter le script
window.onload = function() {
    generateRandomMinutes();  // Générer les minutes
    displayRandomTimes();     // Générer plusieurs heures aléatoires
};
