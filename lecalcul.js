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
    resultatFinal = prixEntree - reductionUnCinquantePourcent;

    // Affichage du résultat après réduction de 1.50%
    document.getElementById("result3").innerText = "Résultat après -1.50% : " + resultatFinal.toFixed(10);

    // Calcul de la réduction de 0.50% avant le prix d'entrée initial
    var reductionZeroCinquantePourcentAvant = (parseFloat(prixEntree) * 0.50) / 100; 
    var prixAvantReductionZeroCinquantePourcent = parseFloat(prixEntree) + reductionZeroCinquantePourcentAvant;
    
    // Affichage du résultat avant réduction de 0.50%
    document.getElementById("result4").innerText = "Résultat avant -0.50% : " + prixAvantReductionZeroCinquantePourcent.toFixed(10);
    
    // Calcul de la réduction supplémentaire de 1% avant le prix d'entrée initial
    var reductionUnPourcentAvant = (parseFloat(prixEntree) * 1) / 100;
    var prixAvantReductionUnPourcent = parseFloat(prixEntree) + reductionUnPourcentAvant;

    // Affichage du résultat avant réduction de 1%
    document.getElementById("result5").innerText = "Résultat avant -1% : " + prixAvantReductionUnPourcent.toFixed(10);

    // Calcul de la réduction supplémentaire de 1.50% avant le prix d'entrée initial
    var reductionUnCinquantePourcentAvant = (parseFloat(prixEntree) * 1.50) / 100;
    var prixAvantReductionUnCinquantePourcent = parseFloat(prixEntree) + reductionUnCinquantePourcentAvant;

    // Affichage du résultat avant réduction de 1.50%
    document.getElementById("result6").innerText = "Résultat avant -1.50% : " + prixAvantReductionUnCinquantePourcent.toFixed(10);
}
