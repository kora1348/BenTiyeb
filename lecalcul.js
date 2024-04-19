function calculerPrixCrypto() {
    var prixEntree = document.getElementById("decimalInput").value;
    
    // Calcul de la réduction de 0.50%
    var reductionZeroCinquantePourcent = (parseFloat(prixEntree) * 0.50) / 100; 
    var prixApresReductionZeroCinquantePourcent = prixEntree - reductionZeroCinquantePourcent;
    
    // Affichage du résultat LONG réduction de 0.50%
    document.getElementById("result1").innerText = "Résultat LONG -0.50% : " + prixApresReductionZeroCinquantePourcent.toFixed(10);
    
    // Calcul de la réduction supplémentaire de 1% sur le prix d'entrée initial
    var reductionUnPourcent = (parseFloat(prixEntree) * 1) / 100;
    var resultatFinal = prixEntree - reductionUnPourcent;

    // Affichage du résultat LONG réduction de 1%
    document.getElementById("result2").innerText = "Résultat LONG -1% : " + resultatFinal.toFixed(10);

    // Calcul de la réduction supplémentaire de 1.50% sur le prix d'entrée initial
    var reductionUnCinquantePourcent = (parseFloat(prixEntree) * 1.50) / 100;
    resultatFinal = prixEntree - reductionUnCinquantePourcent;

    // Affichage du résultat LONG réduction de 1.50%
    document.getElementById("result3").innerText = "Résultat LONG -1.50% : " + resultatFinal.toFixed(10);

    // Calcul de la réduction de 0.50% SHORT le prix d'entrée initial
    var reductionZeroCinquantePourcentAvant = (parseFloat(prixEntree) * 0.50) / 100; 
    var prixAvantReductionZeroCinquantePourcent = parseFloat(prixEntree) + reductionZeroCinquantePourcentAvant;
    
    // Affichage du résultat SHORT réduction de 0.50%
    document.getElementById("result4").innerText = "Résultat SHORT -0.50% : " + prixAvantReductionZeroCinquantePourcent.toFixed(10);
    
    // Calcul de la réduction supplémentaire de 1% SHORT le prix d'entrée initial
    var reductionUnPourcentAvant = (parseFloat(prixEntree) * 1) / 100;
    var prixAvantReductionUnPourcent = parseFloat(prixEntree) + reductionUnPourcentAvant;

    // Affichage du résultat SHORT réduction de 1%
    document.getElementById("result5").innerText = "Résultat SHORT -1% : " + prixAvantReductionUnPourcent.toFixed(10);

    // Calcul de la réduction supplémentaire de 1.50% SHORT le prix d'entrée initial
    var reductionUnCinquantePourcentAvant = (parseFloat(prixEntree) * 1.50) / 100;
    var prixAvantReductionUnCinquantePourcent = parseFloat(prixEntree) + reductionUnCinquantePourcentAvant;

    // Affichage du résultat SHORT réduction de 1.50%
    document.getElementById("result6").innerText = "Résultat SHORT -1.50% : " + prixAvantReductionUnCinquantePourcent.toFixed(10);
}
