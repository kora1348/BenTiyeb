document.addEventListener("DOMContentLoaded", function () {
  const baseDate = new Date(2025, 2, 6); // 6 mars 2025 (mois en JS commence à 0, donc mars = 2)
  const dateContainer = document.getElementById("dateList");
  const today = new Date(); // Date d'aujourd'hui
  let count = 0; // Compteur de dates affichées
  const numDatesToShow = 10; // Nombre exact de dates futures à afficher
  let i = 1; // Incrément pour ajouter 3 jours à chaque fois

  while (count < numDatesToShow) {
      const newDate = new Date(baseDate);
      newDate.setDate(baseDate.getDate() + i * 3); // Ajoute 3 jours à chaque itération
      i++; // Incrément pour la prochaine date

      // Vérifier si la date est passée
      if (newDate < today) continue; 

      const listItem = document.createElement("li");
      listItem.textContent = newDate.toLocaleDateString("fr-FR"); // Format FR (JJ/MM/AAAA)

      // Si la date est égale à aujourd'hui, afficher en vert
      if (
          newDate.getFullYear() === today.getFullYear() &&
          newDate.getMonth() === today.getMonth() &&
          newDate.getDate() === today.getDate()
      ) {
          listItem.style.color = "green";
      }

      dateContainer.appendChild(listItem);
      count++; // Incrémente le compteur de dates affichées
  }
});
