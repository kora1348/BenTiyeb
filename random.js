function generateAvailableMinutes() {
    let minutes = [];
    for (let i = 5; i <= 55; i += 5) {
        minutes.push(i);
    }
    return minutes;
}

// Function to generate 20 unique random times with minutes in multiples of 5,
// excluding hours between 22:00 and 07:00
function getRandomTimes() {
    let availableMinutes = generateAvailableMinutes(); // Generate minutes in multiples of 5
    let times = new Set(); // Use a Set to avoid duplicates

    // Loop until we get 20 unique times
    while (times.size < 20) {
        let randomHour = Math.floor(Math.random() * 24); // Hours between 0 and 23
        
        // Filter out hours between 22:00 and 07:00
        if (randomHour >= 7 && randomHour < 22) {
            let randomMinute = availableMinutes[Math.floor(Math.random() * availableMinutes.length)];
            let time = `${String(randomHour).padStart(2, '0')}h${String(randomMinute).padStart(2, '0')}`;
            times.add(time); // Add to Set to avoid duplicates
        }
    }

    // Convert Set to array and sort in ascending order
    return Array.from(times).sort();
}

// Function to display the random times in the DOM
function displayRandomTimes() {
    let randomTimes = getRandomTimes();
    
    document.getElementById('minute1').innerText = randomTimes[0];
    document.getElementById('minute2').innerText = randomTimes[1];
    document.getElementById('minute3').innerText = randomTimes[2];
    document.getElementById('minute4').innerText = randomTimes[3];
    document.getElementById('minute5').innerText = randomTimes[4];
    document.getElementById('minute6').innerText = randomTimes[5];
    document.getElementById('minute7').innerText = randomTimes[6];
    document.getElementById('minute8').innerText = randomTimes[7];
    document.getElementById('minute9').innerText = randomTimes[8];
    document.getElementById('minute10').innerText = randomTimes[9];
    document.getElementById('minute11').innerText = randomTimes[10];
    document.getElementById('minute12').innerText = randomTimes[11];
    document.getElementById('minute13').innerText = randomTimes[12];
    document.getElementById('minute14').innerText = randomTimes[13];
    document.getElementById('minute15').innerText = randomTimes[14];
    document.getElementById('minute16').innerText = randomTimes[15];
    document.getElementById('minute17').innerText = randomTimes[16];
    document.getElementById('minute18').innerText = randomTimes[17];
    document.getElementById('minute19').innerText = randomTimes[18];
    document.getElementById('minute20').innerText = randomTimes[19];
}

// Affichage des heures et minutes dans le DOM
function displayRandomTimes() {
    let randomTimes = getRandomTimes();
    
    document.getElementById('minute1').innerText = randomTimes[0];
    document.getElementById('minute2').innerText = randomTimes[1];
    document.getElementById('minute3').innerText = randomTimes[2];
    document.getElementById('minute4').innerText = randomTimes[3];
    document.getElementById('minute5').innerText = randomTimes[4];
    document.getElementById('minute6').innerText = randomTimes[5];
    document.getElementById('minute7').innerText = randomTimes[6];
    document.getElementById('minute8').innerText = randomTimes[7];
    document.getElementById('minute9').innerText = randomTimes[8];
    document.getElementById('minute10').innerText = randomTimes[9];
    document.getElementById('minute11').innerText = randomTimes[10];
    document.getElementById('minute12').innerText = randomTimes[11];
    document.getElementById('minute13').innerText = randomTimes[12];
    document.getElementById('minute14').innerText = randomTimes[13];
    document.getElementById('minute15').innerText = randomTimes[14];
    document.getElementById('minute16').innerText = randomTimes[15];
    document.getElementById('minute17').innerText = randomTimes[16];
    document.getElementById('minute18').innerText = randomTimes[17];
    document.getElementById('minute19').innerText = randomTimes[18];
    document.getElementById('minute20').innerText = randomTimes[19];
}

function displayRandomHours() {
    let randomHours = getRandomHours();
    
    document.getElementById('heure1').innerText = `${String(randomHours[0]).padStart(2, '0')}h00`;
    document.getElementById('heure2').innerText = `${String(randomHours[1]).padStart(2, '0')}h00`;
    document.getElementById('heure3').innerText = `${String(randomHours[2]).padStart(2, '0')}h00`;
}

// Appel des fonctions pour afficher les heures et minutes
displayRandomTimes();
displayRandomHours();
