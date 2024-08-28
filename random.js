function getRandomHour(existingTimes, startHour, endHour) {
    let randomHour, formattedTime;
    let possibleHours = [];

    // Crée une liste des heures disponibles
    for (let hour = startHour; hour < endHour; hour++) {
        let formattedHour = `${String(hour).padStart(2, '0')}h00`;
        if (!existingTimes.includes(formattedHour)) {
            possibleHours.push(formattedHour);
        }
    }

    // Si aucune heure n'est disponible, retourne null
    if (possibleHours.length === 0) {
        return null;
    }

    // Choisir une heure aléatoire parmi les heures disponibles
    formattedTime = possibleHours[Math.floor(Math.random() * possibleHours.length)];

    return formattedTime;
}

function generateSortedRandomHours(count) {
    const times = [];
    const currentHour = new Date().getHours(); // Heure actuelle
    const startHour = Math.max(9, currentHour + 1);  // Commence à l'heure suivante ou à 09:00, selon ce qui est le plus tard
    const endHour = 24;  // 24:00

    for (let i = 0; i < count; i++) {
        const newTime = getRandomHour(times, startHour, endHour);
        if (newTime !== null) {
            times.push(newTime);
        } else {
            break;
        }
    }

    // Les heures sont déjà triées grâce à la méthode de génération
    times.sort((a, b) => {
        const hoursA = parseInt(a.split('h')[0], 10);
        const hoursB = parseInt(b.split('h')[0], 10);
        return hoursA - hoursB;
    });

    return times;
}

// Afficher cinq heures aléatoires triées
const sortedTimes = generateSortedRandomHours(3);
document.getElementById('hour1').innerText = sortedTimes[0] || 'N/A';
document.getElementById('hour2').innerText = sortedTimes[1] || 'N/A';
document.getElementById('hour3').innerText = sortedTimes[2] || 'N/A';


function calculate() {
    const number = parseFloat(document.getElementById('numberInput').value);
    let output = '';

    // Calcul des résultats pour les multiplications positives (affichage inverse)
    for (let i = 10; i >= 1; i--) {
        const result = number + (number * i / 100);
        output += `<div class="positive">${number} * ${i} = ${result.toFixed(2)}</div>`;
    }

    // Calcul des résultats pour les multiplications négatives
    for (let i = -1; i >= -10; i--) {
        const result = number + (number * i / 100);
        output += `<div class="negative">${number} * ${i} = ${result.toFixed(2)}</div>`;
    }

    // Affichage des résultats
    document.getElementById('output').innerHTML = output;
}