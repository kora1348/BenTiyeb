function calculerPrixCrypto() {
    var prixEntree = document.getElementById("decimalInput").value;
    
    // Calcul de la réduction de 0.50%
    var reductionZeroCinquantePourcent = (parseFloat(prixEntree) * 0.50) / 100; 
    var prixApresReductionZeroCinquantePourcent = prixEntree - reductionZeroCinquantePourcent;
    
    // Affichage du résultat après réduction de 0.50%
    document.getElementById("result1").innerText = "Résultat après -0.50% : " + prixApresReductionZeroCinquantePourcent.toFixed(10);
    
    // Calcul de la réduction supplémentaire de 1% sur le prix d'entrée initial
    var reductionUnPourcent = (parseFloat(prixEntree) * 1) / 100;
    var resultatFinal = prixEntree - reductionUnPourcent;

    // Affichage du résultat après réduction de 1%
    document.getElementById("result2").innerText = "Résultat après -1% : " + resultatFinal.toFixed(10);

    // Calcul de la réduction supplémentaire de 1.50% sur le prix d'entrée initial
    var reductionUnCinquantePourcent = (parseFloat(prixEntree) * 1.50) / 100;
    var resultatFinal = prixEntree - reductionUnCinquantePourcent;

    // Affichage du résultat après réduction de 1.50%
    document.getElementById("result3").innerText = "Résultat après -1.50% : " + resultatFinal.toFixed(10);

     
}
