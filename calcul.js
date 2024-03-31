function calculate() {
    var input = document.getElementById("decimalInput").value;
    var prixTmp = (parseFloat(input) * 2) / 100; 
    var result = input - prixTmp;
    document.getElementById("result").innerText = "Résultat : " + result.toFixed(10);
}