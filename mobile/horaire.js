function generateHoraire(startHour, startMinute, intervalMinutes, count) {
    let horaireDiv = document.getElementById('horaire');
    let currentHour = startHour;
    let currentMinute = startMinute;

    for (let i = 0; i < count; i++) {
        let formattedHour = currentHour.toString().padStart(2, '0');
        let formattedMinute = currentMinute.toString().padStart(2, '0');
        horaireDiv.innerHTML += `${formattedHour}:${formattedMinute}<br>`;

        currentMinute += intervalMinutes;
        if (currentMinute >= 60) {
            currentHour += Math.floor(currentMinute / 60);
            currentMinute = currentMinute % 60;
        }
        
        if (currentHour >= 24) {
            currentHour = currentHour % 24;
        }
    }
}

// Parameters: start at 16:00, interval of 90 minutes, display 10 intervals
generateHoraire(16, 0, 90, 16);