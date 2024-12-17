// Fonction principale intervalle60
const intervalle60 = () => {
    // Récupérer la date actuelle
    const currentDate = new Date();
  
    // Section pour afficher les intervalles
    const intervalsDiv = document.getElementById("intervalle_day");
  
    // Fonction pour formater une date
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} - ${hours}h${minutes}`;
    };
  
    // Fonction pour reculer de plusieurs jours
    const calculateInterval = (currentDate, daysBack) => {
      const result = new Date(currentDate);
      result.setDate(result.getDate() - daysBack);
      result.setHours(0, 0, 0, 0); // Réinitialiser à minuit pour chaque jour
      return result;
    };
  
    // Paramètres
    const numberOfDays = 59; // Intervalle sur 60 jours
  
    // Calculer la date correspondant à l'intervalle
    const intervalDate = calculateInterval(currentDate, numberOfDays);
  
    // Afficher l'heure actuelle et le dernier intervalle
    intervalsDiv.innerHTML = `
          <p>Actuellement : ${formatDate(currentDate)}</p>
          <p>Intervalle (${numberOfDays} jours en arrière) : ${formatDate(
      intervalDate
    )}</p>
      `;
  };
  
  // Appeler la fonction pour afficher les résultats
  intervalle60();
  