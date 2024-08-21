
  

function mettreAJourHeure() {
	var elementHeure = document.getElementById('heure');
	var maintenant = new Date();

	// Créer une copie de l'heure actuelle
	var heureActuelle = new Date(maintenant);

	// Ajouter 3 heures et 20 minutes à l'heure actuelle
	maintenant.setHours(maintenant.getHours() + 3);
	maintenant.setMinutes(maintenant.getMinutes() + 20);

	var heuresMaintenant = maintenant.getHours();
	var minutesMaintenant = maintenant.getMinutes();
	var secondesMaintenant = maintenant.getSeconds();

	var heuresActuelle = heureActuelle.getHours();
	var minutesActuelle = heureActuelle.getMinutes();
	var secondesActuelle = heureActuelle.getSeconds();

	// Ajouter un zéro devant les chiffres < 10
	heuresMaintenant = heuresMaintenant < 10 ? '0' + heuresMaintenant : heuresMaintenant;
	minutesMaintenant = minutesMaintenant < 10 ? '0' + minutesMaintenant : minutesMaintenant;
	secondesMaintenant = secondesMaintenant < 10 ? '0' + secondesMaintenant : secondesMaintenant;

	heuresActuelle = heuresActuelle < 10 ? '0' + heuresActuelle : heuresActuelle;
	minutesActuelle = minutesActuelle < 10 ? '0' + minutesActuelle : minutesActuelle;
	secondesActuelle = secondesActuelle < 10 ? '0' + secondesActuelle : secondesActuelle;

	// Mettre à jour le contenu de l'élément avec les deux heures
	elementHeure.innerHTML = heuresActuelle + ':' + minutesActuelle + ':' + secondesActuelle;
}

// Appeler la fonction pour mettre à jour l'heure
mettreAJourHeure();


function getRandomTime(existingTimes) {
    const startHour = 9;  // 09:00
    const endHour = 24;   // 00:00
    let randomHour, randomMinute, formattedTime;

    do {
        randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
        randomMinute = Math.floor(Math.random() * 12) * 5;  // Minutes: 0, 5, 10, ..., 55
        const formattedHour = String(randomHour).padStart(2, '0');
        const formattedMinute = String(randomMinute).padStart(2, '0');
        formattedTime = `${formattedHour}h${formattedMinute}`;
    } while (existingTimes.includes(formattedTime));

    return formattedTime;
}

function generateSortedRandomTimes(count) {
    const times = [];

    // Générer 'count' heures aléatoires sans doublons
    for (let i = 0; i < count; i++) {
        times.push(getRandomTime(times));
    }

    // Convertir les heures en minutes pour trier
    times.sort((a, b) => {
        const [hoursA, minutesA] = a.split('h').map(Number);
        const [hoursB, minutesB] = b.split('h').map(Number);

        return (hoursA * 60 + minutesA) - (hoursB * 60 + minutesB);
    });

    return times;
}

// Afficher cinq heures aléatoires triées
const sortedTimes = generateSortedRandomTimes(5);
document.getElementById('hour1').innerText = sortedTimes[0];
document.getElementById('hour2').innerText = sortedTimes[1];
document.getElementById('hour3').innerText = sortedTimes[2];
document.getElementById('hour4').innerText = sortedTimes[3];
document.getElementById('hour5').innerText = sortedTimes[4];
