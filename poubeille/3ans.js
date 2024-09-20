async function fetchCryptoDataAtTime(symbol, year, cellIndex) {
    const targetDate = new Date(year, 8, 15, 16, 0); // 15 septembre de l'année en cours à 15h45
    const startTime = targetDate.getTime(); // Convertir en timestamp

    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=15m&startTime=${startTime}&limit=1`
        );
        const data = await response.json();

        if (data.length === 0) {
            console.log(`Aucune donnée trouvée pour ${symbol} à ${year}`);
            return;
        }

        const openPrice = parseFloat(data[0][1]);
        const closePrice = parseFloat(data[0][4]);
        const variation = ((closePrice - openPrice) / openPrice) * 100;

        const dateTime = new Date(data[0][0]);
        const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };

        const formattedDate = dateTime.toLocaleDateString("fr-FR", options);

        // Insérer la variation dans la cellule correspondante du tableau
        const cryptoRow = document.getElementById(symbol);
        const variationCell = cryptoRow.insertCell(cellIndex); // Insérer la cellule dans la colonne correspondante
        variationCell.textContent = `${formattedDate} : ${variation.toFixed(2)}%`;

        // Ajouter la classe "positive" ou "negative" en fonction de la variation
        if (variation > 0) {
            variationCell.classList.add("positive");
        } else if (variation < 0) {
            variationCell.classList.add("negative");
        }

    } catch (error) {
        console.error(
            `Erreur lors de la récupération des données pour ${symbol} à ${year}:`,
            error
        );
    }
}

// Appel de la fonction pour obtenir les taux de variation du BTC pour 2021, 2022, 2023 à 15h45
fetchCryptoDataAtTime("BTC", 2021, 1); // Cellule pour 2021
fetchCryptoDataAtTime("BTC", 2022, 2); // Cellule pour 2022
fetchCryptoDataAtTime("BTC", 2023, 3); // Cellule pour 2023

  


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

function getRandomTime() {
    const startHour = 8;  // 08:00
    const endHour = 23;   // 23:59
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    let randomHour, randomMinute;

    if (currentHour >= startHour && currentHour <= endHour) {
        randomHour = Math.floor(Math.random() * (endHour - currentHour + 1)) + currentHour;
        if (randomHour === currentHour) {
            const remainingMinutes = Math.floor((60 - currentMinute) / 3);
            randomMinute = Math.floor(Math.random() * remainingMinutes) * 3 + currentMinute;
        } else {
            randomMinute = Math.floor(Math.random() * 20) * 3;  // Minutes: 0, 3, 6, ..., 57
        }
    } else {
        randomHour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
        randomMinute = Math.floor(Math.random() * 20) * 3;  // Minutes: 0, 3, 6, ..., 57
    }

    const formattedHour = String(randomHour).padStart(2, '0');
    const formattedMinute = String(randomMinute).padStart(2, '0');

    return `${formattedHour}h${formattedMinute}`;
}

function generateSortedRandomTimes(count) {
    const times = [];

    // Générer 'count' heures aléatoires
    for (let i = 0; i < count; i++) {
        times.push(getRandomTime());
    }

    // Convertir les heures en minutes pour trier
    times.sort((a, b) => {
        const [hoursA, minutesA] = a.split('h').map(Number);
        const [hoursB, minutesB] = b.split('h').map(Number);

        return (hoursA * 60 + minutesA) - (hoursB * 60 + minutesB);
    });

    return times;
}

// Afficher quatre heures aléatoires triées
const sortedTimes = generateSortedRandomTimes(4);
document.getElementById('hour1').innerText = sortedTimes[0];
document.getElementById('hour2').innerText = sortedTimes[1];

