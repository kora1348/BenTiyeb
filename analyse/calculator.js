function calculate() {
    const number = parseFloat(document.getElementById('numberInput').value);
    let output = '';

    // Calcul des résultats pour les multiplications positives (affichage inverse)
    for (let i = 10; i >= 1; i--) {
        const result = number + (number * i / 100);
        output += `<div class="negative">${result.toFixed(4)}</div>`;
    }

    // Ajout de la valeur de l'input avec la classe "blue"
    output += `<div class="blue">${number.toFixed(4)}*</div>`;

    // Calcul des résultats pour les multiplications négatives
    for (let i = -1; i >= -10; i--) {
        const result = number + (number * i / 100);
        output += `<div class="positive">${result.toFixed(4)}</div>`;
    }

    // Affichage des résultats
    document.getElementById('output').innerHTML = output;
}

function calculateDay() {
    const number = parseFloat(document.getElementById('numberInputS').value);
    let output = '';

    // Calcul des résultats pour les multiplications positives (affichage inversé)
    for (let i = 10; i >= 1; i--) {
        const result = number + (number * i / 100);
        output += `<div class="negative">${result.toFixed(10)}</div>`;
    }

    // Ajout de la valeur de l'input avec la classe "blue"
    output += `<div class="blue">${number.toFixed(10)}*</div>`;

    // Calcul des résultats pour les multiplications négatives (affichage inversé)
    for (let i = -1; i >= -10; i--) {
        const result = number + (number * i / 100);
        output += `<div class="positive">${result.toFixed(10)}</div>`;
    }

    // Affichage des résultats
    document.getElementById('outputS').innerHTML = output;
}
