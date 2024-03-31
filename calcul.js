function calculerPrixCrypto() {
    var prixEntree = document.getElementById("decimalInput").value;
    var prixTmp = (parseFloat(prixEntree) * 2) / 100; 
    var result = prixEntree - prixTmp;
    document.getElementById("result").innerText = "Résultat : " + result.toFixed(10);
}