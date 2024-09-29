function generateAvailableMinutes() {
    let minutes = [];
    for (let i = 5; i <= 55; i += 5) {
      minutes.push(i);
    }
    return minutes;
  }

  // Fonction pour générer 3 heures aléatoires uniques avec des minutes multiples de 5
  function getRandomTimes() {
    let availableMinutes = generateAvailableMinutes(); // Génération dynamique des minutes multiples de 5
    let times = new Set(); // Utilisation d'un Set pour éviter les doublons

    // Boucle jusqu'à obtenir 3 heures uniques avec des minutes
    while (times.size < 3) {
      let randomHour = Math.floor(Math.random() * 24); // Heures entre 0 et 23
      let randomMinute = availableMinutes[Math.floor(Math.random() * availableMinutes.length)];
      
      // Formate l'heure en "hh:mm" (par exemple, 05h30 ou 15h20)
      let time = `${String(randomHour).padStart(2, '0')}h${String(randomMinute).padStart(2, '0')}`;
      times.add(time); // Ajoute au Set pour éviter les doublons
    }

    // Convertit le Set en tableau et trie par ordre croissant
    return Array.from(times).sort();
  }

  // Affichage des minutes dans le DOM
  function displayRandomTimes() {
    let randomTimes = getRandomTimes();
    
    document.getElementById('minute1').innerText = randomTimes[0];
    document.getElementById('minute2').innerText = randomTimes[1];
    document.getElementById('minute3').innerText = randomTimes[2];
  }

  // Appel de la fonction pour afficher les heures et minutes
  displayRandomTimes();