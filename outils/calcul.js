  function calculate() {
      const number = parseFloat(document.getElementById("numberInput").value);
      if (isNaN(number)) return;

      let output = "";

      // Variations positives de 1% à 0.20%
      for (let p = 1.0; p >= 0.2; p -= 0.1) {
        const result = number + (number * p) / 100;
        output += `<div class="negative">+${p.toFixed(2)}% ➜ ${result.toFixed(4)}</div>`;
      }

      // Valeur d'origine
      output += `<div class="blue">0.00% ➜ ${number.toFixed(4)}*</div>`;

      // Variations négatives de -0.20% à -1%
      for (let p = 0.2; p <= 1.0; p += 0.1) {
        const result = number - (number * p) / 100;
        output += `<div class="positive">-${p.toFixed(2)}% ➜ ${result.toFixed(4)}</div>`;
      }

      document.getElementById("output").innerHTML = output;
    }