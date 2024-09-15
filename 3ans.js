async function fetchHourlyCryptoData(symbol, year) {
    try {
        // Définir les timestamps pour la première et la dernière heure de chaque année
        const startTime = new Date(`${year}-01-01T00:00:00Z`).getTime(); // 1er janvier à 00:00 UTC
        const endTime = new Date(`${year}-12-31T23:59:59Z`).getTime(); // 31 décembre à 23:59 UTC

        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&startTime=${startTime}&endTime=${endTime}&limit=1000`
        );
        const data = await response.json();

        if (data.length > 0) {
            let totalVariation = 0;
            let count = 0;

            // Parcours de toutes les données par heure
            for (let i = 1; i < data.length; i++) {
                const openPrice = parseFloat(data[i - 1][4]); // Prix de fermeture de la période précédente
                const closePrice = parseFloat(data[i][4]); // Prix de fermeture de la période actuelle

                // Calcul du taux de variation horaire
                const hourlyVariation = ((closePrice - openPrice) / openPrice) * 100;

                totalVariation += hourlyVariation;
                count++;
            }

            // Retourner la moyenne des variations horaires
            const averageVariation = totalVariation / count;
            return averageVariation.toFixed(2);
        } else {
            return "Pas de données";
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol} en ${year}:`, error);
        return "Erreur";
    }
}

// Fonction pour récupérer et afficher les variations horaires pour plusieurs années
async function displayBTCVariations() {
    const symbol = "BTC";
    const years = [2021, 2022, 2023];
    const cryptoRow = document.getElementById(symbol);
    
    let totalVariation = 0;

    for (let i = 0; i < years.length; i++) {
        const variation = await fetchHourlyCryptoData(symbol, years[i]);
        const variationCell = cryptoRow.insertCell(i + 1);
        
        // Formater l'heure d'ouverture et de fermeture en français
       // Formater l'heure d'ouverture et de fermeture en heure locale
       const startTime = new Date(`${years[i]}-01-01T12:00:00Z`).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris' // Remplace par ton fuseau horaire si nécessaire
    });
    const endTime = new Date(`${years[i]}-01-01T12:59:59Z`).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris' // Fuseau horaire
    });
        
        variationCell.textContent = `${years[i]}: ${startTime} - ${endTime} ${variation}%`;

        // Ajouter la classe "positive" ou "negative" selon la variation
        if (variation > 0) {
            variationCell.classList.add("positive");
        } else if (variation < 0) {
            variationCell.classList.add("negative");
        }

        totalVariation += parseFloat(variation) || 0;
    }

    // Ajouter la cellule pour le total
    const totalCell = cryptoRow.insertCell(years.length + 1);
    totalCell.textContent = `Total: ${totalVariation.toFixed(2)}%`;
    totalCell.style.textAlign = 'center';

    // Coloration selon le total
    if (totalVariation > 0) {
        totalCell.classList.add("positive");
    } else {
        totalCell.classList.add("negative");
    }
}

displayBTCVariations();






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

