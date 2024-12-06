// Fonction principale intervalle15
const intervalle3 = () => {
    // Récupérer la date actuelle
    const currentDate = new Date();

    // Section pour afficher les intervalles
    const intervalsDiv = document.getElementById('intervalle3');

    // Fonction pour formater une date
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}h${minutes}`;
    };

    // Fonction pour trouver le dernier intervalle aligné sur un multiple de 15 minutes
    const alignToInterval = (date, intervalInMinutes) => {
        const minutes = date.getMinutes();
        const roundedMinutes = Math.floor(minutes / intervalInMinutes) * intervalInMinutes;
        const alignedDate = new Date(date);
        alignedDate.setMinutes(roundedMinutes);
        alignedDate.setSeconds(0); // Réinitialiser les secondes à 0
        return alignedDate;
    };

    // Fonction pour reculer de plusieurs intervalles
    const calculateLastInterval = (alignedDate, intervalInMinutes, stepsBack, extraMinutes = 0) => {
        const result = new Date(alignedDate);
        result.setMinutes(result.getMinutes() - stepsBack * intervalInMinutes + extraMinutes);
        return result;
    };

    // Intervalle en minutes (modifiable selon vos besoins)
    const intervalInMinutes = 3;

    // Nombre d'intervalles à reculer (modifiable selon vos besoins)
    const numberOfIntervals = 178;

    // Décalage supplémentaire en minutes
    const extraMinutes = 3;

    // Aligner l'heure actuelle sur un multiple de 15 minutes
    const alignedDate = alignToInterval(currentDate, intervalInMinutes);

    // Calculer le dernier intervalle basé sur l'heure alignée et inclure le décalage supplémentaire
    const lastInterval = calculateLastInterval(alignedDate, intervalInMinutes, numberOfIntervals, extraMinutes);

    // Afficher l'heure actuelle et le dernier intervalle
    intervalsDiv.innerHTML = `
        <p>Actuellement : ${formatDate(currentDate)}</p>
        <p>Intervalle (${numberOfIntervals} intervalles en arrière) : ${formatDate(lastInterval)}</p>
    `;
};

// Appeler la fonction intervalle15 pour afficher les résultats
intervalle3();

// Fonction principale intervalle15
const intervalle5 = () => {
    // Récupérer la date actuelle
    const currentDate = new Date();

    // Section pour afficher les intervalles
    const intervalsDiv = document.getElementById('intervalle5');

    // Fonction pour formater une date
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}h${minutes}`;
    };

    // Fonction pour trouver le dernier intervalle aligné sur un multiple de 15 minutes
    const alignToInterval = (date, intervalInMinutes) => {
        const minutes = date.getMinutes();
        const roundedMinutes = Math.floor(minutes / intervalInMinutes) * intervalInMinutes;
        const alignedDate = new Date(date);
        alignedDate.setMinutes(roundedMinutes);
        alignedDate.setSeconds(0); // Réinitialiser les secondes à 0
        return alignedDate;
    };

    // Fonction pour reculer de plusieurs intervalles
    const calculateLastInterval = (alignedDate, intervalInMinutes, stepsBack, extraMinutes = 0) => {
        const result = new Date(alignedDate);
        result.setMinutes(result.getMinutes() - stepsBack * intervalInMinutes + extraMinutes);
        return result;
    };

    // Intervalle en minutes (modifiable selon vos besoins)
    const intervalInMinutes = 5;

    // Nombre d'intervalles à reculer (modifiable selon vos besoins)
    const numberOfIntervals = 178;

    // Décalage supplémentaire en minutes
    const extraMinutes = 5;

    // Aligner l'heure actuelle sur un multiple de 15 minutes
    const alignedDate = alignToInterval(currentDate, intervalInMinutes);

    // Calculer le dernier intervalle basé sur l'heure alignée et inclure le décalage supplémentaire
    const lastInterval = calculateLastInterval(alignedDate, intervalInMinutes, numberOfIntervals, extraMinutes);

    // Afficher l'heure actuelle et le dernier intervalle
    intervalsDiv.innerHTML = `
        <p>Actuellement : ${formatDate(currentDate)}</p>
        <p>Intervalle (${numberOfIntervals} intervalles en arrière) : ${formatDate(lastInterval)}</p>
    `;
};

// Appeler la fonction intervalle15 pour afficher les résultats
intervalle5();



// Fonction principale intervalle15
const intervalle15 = () => {
    // Récupérer la date actuelle
    const currentDate = new Date();

    // Section pour afficher les intervalles
    const intervalsDiv = document.getElementById('intervalle15');

    // Fonction pour formater une date
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}h${minutes}`;
    };

    // Fonction pour trouver le dernier intervalle aligné sur un multiple de 15 minutes
    const alignToInterval = (date, intervalInMinutes) => {
        const minutes = date.getMinutes();
        const roundedMinutes = Math.floor(minutes / intervalInMinutes) * intervalInMinutes;
        const alignedDate = new Date(date);
        alignedDate.setMinutes(roundedMinutes);
        alignedDate.setSeconds(0); // Réinitialiser les secondes à 0
        return alignedDate;
    };

    // Fonction pour reculer de plusieurs intervalles
    const calculateLastInterval = (alignedDate, intervalInMinutes, stepsBack, extraMinutes = 0) => {
        const result = new Date(alignedDate);
        result.setMinutes(result.getMinutes() - stepsBack * intervalInMinutes + extraMinutes);
        return result;
    };

    // Intervalle en minutes (modifiable selon vos besoins)
    const intervalInMinutes = 15;

    // Nombre d'intervalles à reculer (modifiable selon vos besoins)
    const numberOfIntervals = 178;

    // Décalage supplémentaire en minutes
    const extraMinutes = 15;

    // Aligner l'heure actuelle sur un multiple de 15 minutes
    const alignedDate = alignToInterval(currentDate, intervalInMinutes);

    // Calculer le dernier intervalle basé sur l'heure alignée et inclure le décalage supplémentaire
    const lastInterval = calculateLastInterval(alignedDate, intervalInMinutes, numberOfIntervals, extraMinutes);

    // Afficher l'heure actuelle et le dernier intervalle
    intervalsDiv.innerHTML = `
        <p>Actuellement : ${formatDate(currentDate)}</p>
        <p>Intervalle (${numberOfIntervals} intervalles en arrière) : ${formatDate(lastInterval)}</p>
    `;
};

// Appeler la fonction intervalle15 pour afficher les résultats
intervalle15();

// Fonction principale intervalle15
const intervalle1 = () => {
    // Récupérer la date actuelle
    const currentDate = new Date();

    // Section pour afficher les intervalles
    const intervalsDiv = document.getElementById('intervalle1');

    // Fonction pour formater une date
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}h${minutes}`;
    };

    // Fonction pour trouver le dernier intervalle aligné sur un multiple de 15 minutes
    const alignToInterval = (date, intervalInMinutes) => {
        const minutes = date.getMinutes();
        const roundedMinutes = Math.floor(minutes / intervalInMinutes) * intervalInMinutes;
        const alignedDate = new Date(date);
        alignedDate.setMinutes(roundedMinutes);
        alignedDate.setSeconds(0); // Réinitialiser les secondes à 0
        return alignedDate;
    };

    // Fonction pour reculer de plusieurs intervalles
    const calculateLastInterval = (alignedDate, intervalInMinutes, stepsBack, extraMinutes = 0) => {
        const result = new Date(alignedDate);
        result.setMinutes(result.getMinutes() - stepsBack * intervalInMinutes + extraMinutes);
        return result;
    };

    // Intervalle en minutes (modifiable selon vos besoins)
    const intervalInMinutes = 1440;

    // Nombre d'intervalles à reculer (modifiable selon vos besoins)
    const numberOfIntervals = 178;

    // Décalage supplémentaire en minutes
    const extraMinutes = 1440;

    // Aligner l'heure actuelle sur un multiple de 15 minutes
    const alignedDate = alignToInterval(currentDate, intervalInMinutes);

    // Calculer le dernier intervalle basé sur l'heure alignée et inclure le décalage supplémentaire
    const lastInterval = calculateLastInterval(alignedDate, intervalInMinutes, numberOfIntervals, extraMinutes);

    // Afficher l'heure actuelle et le dernier intervalle
    intervalsDiv.innerHTML = `
        <p>Actuellement : ${formatDate(currentDate)}</p>
        <p>Intervalle (${numberOfIntervals} intervalles en arrière) : ${formatDate(lastInterval)}</p>
    `;
};

// Appeler la fonction intervalle15 pour afficher les résultats
intervalle1();

// Fonction principale intervalle15
const intervalle1h = () => {
    // Récupérer la date actuelle
    const currentDate = new Date();

    // Section pour afficher les intervalles
    const intervalsDiv = document.getElementById('intervalle1h');

    // Fonction pour formater une date
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}h${minutes}`;
    };

    // Fonction pour trouver le dernier intervalle aligné sur un multiple de 15 minutes
    const alignToInterval = (date, intervalInMinutes) => {
        const minutes = date.getMinutes();
        const roundedMinutes = Math.floor(minutes / intervalInMinutes) * intervalInMinutes;
        const alignedDate = new Date(date);
        alignedDate.setMinutes(roundedMinutes);
        alignedDate.setSeconds(0); // Réinitialiser les secondes à 0
        return alignedDate;
    };

    // Fonction pour reculer de plusieurs intervalles
    const calculateLastInterval = (alignedDate, intervalInMinutes, stepsBack, extraMinutes = 0) => {
        const result = new Date(alignedDate);
        result.setMinutes(result.getMinutes() - stepsBack * intervalInMinutes + extraMinutes);
        return result;
    };

    // Intervalle en minutes (modifiable selon vos besoins)
    const intervalInMinutes = 60;

    // Nombre d'intervalles à reculer (modifiable selon vos besoins)
    const numberOfIntervals = 10;

    // Décalage supplémentaire en minutes
    const extraMinutes = -60;

    // Aligner l'heure actuelle sur un multiple de 15 minutes
    const alignedDate = alignToInterval(currentDate, intervalInMinutes);

    // Calculer le dernier intervalle basé sur l'heure alignée et inclure le décalage supplémentaire
    const lastInterval = calculateLastInterval(alignedDate, intervalInMinutes, numberOfIntervals, extraMinutes);

    // Afficher l'heure actuelle et le dernier intervalle
    intervalsDiv.innerHTML = `
        <p>Actuellement : ${formatDate(currentDate)}</p>
        <p>Intervalle (${numberOfIntervals} intervalles en arrière) : ${formatDate(lastInterval)}</p>
    `;
};

intervalle1h();