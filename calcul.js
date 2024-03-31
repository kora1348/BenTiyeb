function calculerPrixCrypto() {
    var prixEntree = document.getElementById("decimalInput").value;
    var prixReduit = (parseFloat(prixEntree) * 2) / 100; 
    var resultatCalcul = prixEntree - prixReduit;
    document.getElementById("result").innerText = "Résultat : " + resultatCalcul.toFixed(10);
}