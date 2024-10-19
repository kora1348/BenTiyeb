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
