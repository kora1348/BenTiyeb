function calculerPrixCrypto() {
    var prixEntree = document.getElementById("decimalInput").value;
    
    // Calcul de la réduction de 4%
    var reductionQuatrePourcent = (parseFloat(prixEntree) * 4) / 100; 
    var prixApresReductionQuatrePourcent = prixEntree - reductionQuatrePourcent;
    
    // Affichage du résultat après réduction de 4%
    document.getElementById("result1").innerText = "Résultat après -4% : " + prixApresReductionQuatrePourcent.toFixed(10) + "  => 03";
    
    // Calcul de la réduction supplémentaire de 8% sur le prix d'entrée initial
    var reductionHuitPourcent = (parseFloat(prixEntree) * 8) / 100;
    var resultatFinal = prixEntree - reductionHuitPourcent;

    // Affichage du résultat après réduction de 8%
    document.getElementById("result2").innerText = "Résultat après -8% : " + resultatFinal.toFixed(10) + "  => 06";

    // Calcul de la réduction supplémentaire de 12% sur le prix d'entrée initial
    var reductionDouzePourcent = (parseFloat(prixEntree) * 12) / 100;
    var resultatFinal = prixEntree - reductionDouzePourcent;

    // Affichage du résultat après réduction de 12%
    document.getElementById("result3").innerText = "Résultat après -12% : " + resultatFinal.toFixed(10) + "  => 09";

     // Calcul de la réduction supplémentaire de 16% sur le prix d'entrée initial
     var reductionSeizePourcent = (parseFloat(prixEntree) * 16) / 100;
     var resultatFinal = prixEntree - reductionSeizePourcent;
 
     // Affichage du résultat après réduction de 16%
     document.getElementById("result4").innerText = "Résultat après -16% : " + resultatFinal.toFixed(10) + "  => 18";

     // Calcul de la réduction supplémentaire de 20% sur le prix d'entrée initial
    var reductionVingtPourcent = (parseFloat(prixEntree) * 20) / 100;
    var resultatVingtPourcent = prixEntree - reductionVingtPourcent;
    
    // Affichage du résultat après réduction de 20%
    document.getElementById("result5").innerText = "Résultat après -20% : " + resultatVingtPourcent.toFixed(10)  + "  => 36";
    
    // Calcul de la réduction supplémentaire de 24% sur le prix d'entrée initial
    var reductionVingtQuatrePourcent = (parseFloat(prixEntree) * 24) / 100;
    var resultatVingtQuatrePourcent = prixEntree - reductionVingtQuatrePourcent;
    
    // Affichage du résultat après réduction de 24%
    document.getElementById("result6").innerText = "Résultat après -24% : " + resultatVingtQuatrePourcent.toFixed(10);

    // Calcul de la réduction supplémentaire de 28% sur le prix d'entrée initial
    var reductionVingtHuitPourcent = (parseFloat(prixEntree) * 28) / 100;
    var resultatVingtHuitPourcent = prixEntree - reductionVingtHuitPourcent;
    
    // Affichage du résultat après réduction de 28%
    document.getElementById("result7").innerText = "Résultat après -28% : " + resultatVingtHuitPourcent.toFixed(10);
}
