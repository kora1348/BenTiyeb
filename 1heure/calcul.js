

function calculate() {
    const number = parseFloat(document.getElementById('numberInput').value);
    let output = '';

    // Vérifier si la valeur saisie est valide
    if (isNaN(number)) {
        document.getElementById('output').innerHTML = '<div class="error">Veuillez entrer un nombre valide.</div>';
        return;
    }

    // Calcul de +2.5%
    const resultPlus = number + (number * 2.5 / 100);
    output += `<div class="positive">${resultPlus.toFixed(10)}</div>`;

    // Ajout de la valeur de l'input avec la classe "blue"
    output += `<div class="blue">${number.toFixed(10)}*</div>`;

    // Calcul de -2.5%
    const resultMinus = number - (number * 2.5 / 100);
    output += `<div class="negative">${resultMinus.toFixed(10)}</div>`;

    // Affichage des résultats
    document.getElementById('output').innerHTML = output;
}