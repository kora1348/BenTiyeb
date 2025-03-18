document.addEventListener("DOMContentLoaded", function () {
    const baseDate = new Date(2025, 2, 6); // 6 mars 2025
    const dateContainer = document.getElementById("dateList");
    const today = new Date(); // Date d'aujourd'hui
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour comparer uniquement les dates
    let count = 0;
    const numDatesToShow = 10;
    let i = 1;
  
    while (count < numDatesToShow) {
      const newDate = new Date(baseDate);
      newDate.setDate(baseDate.getDate() + i * 3); // Ajouter 3 jours à chaque itération
      newDate.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour éviter les erreurs de comparaison
      i++; // Incrément pour la prochaine date
  
      // Vérifier si la date est passée (mais inclure la date du jour)
      if (newDate < today) continue;
  
      const listItem = document.createElement("li");
      listItem.textContent = newDate.toLocaleDateString("fr-FR"); // Format FR (JJ/MM/AAAA)
  
      // Si la date est égale à aujourd'hui, afficher en vert
      if (newDate.getTime() === today.getTime()) {
        listItem.style.color = "green";
      }
  
      dateContainer.appendChild(listItem);
      count++; // Incrémenter le compteur de dates affichées
    }
  });
  