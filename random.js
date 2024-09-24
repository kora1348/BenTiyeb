function generateRandomMinutes() {
    const startHour = 8; // 08h00
    const endHour = 22;  // 23h00
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
    const randomMinutes = validTimes.slice(0, 5).sort((a, b) => {
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

// Générer les minutes aléatoires au chargement
generateRandomMinutes();


function generateRandomHour() {
    const startHour = 8; // 08h00
    const endHour = 22;  // 22h00
    const now = new Date();
    const currentHour = now.getHours();

    const validHours = [];

    // Boucle pour ajouter les heures valides
    for (let hour = startHour; hour <= endHour; hour++) {
        if (hour >= currentHour) {
            validHours.push(hour);
        }
    }

    // Mélanger les heures valides
    validHours.sort(() => Math.random() - 0.5);

    // Sélectionner deux heures aléatoires
    const randomHour1 = validHours[0];
    const randomHour2 = validHours[1];

    // Formater et afficher les heures sélectionnées
    const formattedHour1 = `${randomHour1.toString().padStart(2, '0')}:00`;
    const formattedHour2 = `${randomHour2.toString().padStart(2, '0')}:00`;
    document.getElementById('heure1').innerText = formattedHour1;
    document.getElementById('heure2').innerText = formattedHour2;
}

// Générer les heures aléatoires au chargement
generateRandomHour();
