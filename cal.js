function calculerPrixCrypto() {
    var prixEntree = document.getElementById("decimalInput").value;
    
    // Calcul de la réduction de 4%
    var reductionQuatrePourcent = (parseFloat(prixEntree) * 4) / 100; 
    var prixApresReductionQuatrePourcent = prixEntree - reductionQuatrePourcent;
    
    // Affichage du résultat après réduction de 4%
    document.getElementById("result1").innerText = "Résultat après -4% : " + prixApresReductionQuatrePourcent.toFixed(10);
    
    // Calcul de la réduction supplémentaire de 8% sur le prix d'entrée initial
    var reductionHuitPourcent = (parseFloat(prixEntree) * 8) / 100;
    var resultatFinal = prixEntree - reductionHuitPourcent;

    // Affichage du résultat après réduction de 8%
    document.getElementById("result2").innerText = "Résultat après -8% : " + resultatFinal.toFixed(10);

    // Calcul de la réduction supplémentaire de 12% sur le prix d'entrée initial
    var reductionDouzePourcent = (parseFloat(prixEntree) * 12) / 100;
    var resultatFinal = prixEntree - reductionDouzePourcent;

    // Affichage du résultat après réduction de 12%
    document.getElementById("result3").innerText = "Résultat après -12% : " + resultatFinal.toFixed(10);

     // Calcul de la réduction supplémentaire de 16% sur le prix d'entrée initial
     var reductionSeizePourcent = (parseFloat(prixEntree) * 16) / 100;
     var resultatFinal = prixEntree - reductionSeizePourcent;
 
     // Affichage du résultat après réduction de 16%
     document.getElementById("result4").innerText = "Résultat après -16% : " + resultatFinal.toFixed(10);

     // Calcul de la réduction supplémentaire de 20% sur le prix d'entrée initial
    var reductionVingtPourcent = (parseFloat(prixEntree) * 20) / 100;
    var resultatVingtPourcent = prixEntree - reductionVingtPourcent;
    
    // Affichage du résultat après réduction de 20%
    document.getElementById("result5").innerText = "Résultat après -20% : " + resultatVingtPourcent.toFixed(10);
    
    // Calcul de la réduction supplémentaire de 22% sur le prix d'entrée initial
    var reductionVingtDeuxPourcent = (parseFloat(prixEntree) * 22) / 100;
    var resultatVingtDeuxPourcent = prixEntree - reductionVingtDeuxPourcent;
    
    // Affichage du résultat après réduction de 22%
    document.getElementById("result6").innerText = "Résultat après -22% : " + resultatVingtDeuxPourcent.toFixed(10);

    // Calcul de la réduction supplémentaire de 26% sur le prix d'entrée initial
    var reductionVingtSixPourcent = (parseFloat(prixEntree) * 26) / 100;
    var resultatVingtSixPourcent = prixEntree - reductionVingtSixPourcent;
    
    // Affichage du résultat après réduction de 26%
    document.getElementById("result7").innerText = "Résultat après -26% : " + resultatVingtSixPourcent.toFixed(10);
}
