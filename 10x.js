function calculerPrixCrypto() {
    var prixEntree = document.getElementById("decimalInput").value;
    
    // Calcul de la réduction de 2%
    var reductionDeuxPourcent = (parseFloat(prixEntree) * 2) / 100; 
    var prixApresReductionDeuxPourcent = prixEntree - reductionDeuxPourcent;
    
    // Affichage du résultat après réduction de 2%
    document.getElementById("result1").innerText = "Résultat après -2% : " + prixApresReductionDeuxPourcent.toFixed(10);
    
     // Calcul de la réduction supplémentaire de 8% sur le prix d'entrée initial
     var reductionHuitPourcent = (parseFloat(prixEntree) * 8) / 100;
     var resultatHuitPourcent = prixEntree - reductionHuitPourcent;
     
     // Affichage du résultat après réduction de 8%
     document.getElementById("result2").innerText = "Résultat après -8% : " + resultatHuitPourcent.toFixed(10);

     // Calcul de la réduction supplémentaire de 16% sur le prix d'entrée initial
    var reductionSeizePourcent = (parseFloat(prixEntree) * 16) / 100;
    var resultatSeizePourcent = prixEntree - reductionSeizePourcent;
    
    // Affichage du résultat après réduction de 16%
    document.getElementById("result3").innerText = "Résultat après -16% : " + resultatSeizePourcent.toFixed(10);

     // Calcul de la réduction supplémentaire de 24% sur le prix d'entrée initial
     var reductionVingtQuatrePourcent = (parseFloat(prixEntree) * 24) / 100;
     var resultatVingtQuatrePourcent = prixEntree - reductionVingtQuatrePourcent;
     
     // Affichage du résultat après réduction de 24%
     document.getElementById("result4").innerText = "Résultat après -24% : " + resultatVingtQuatrePourcent.toFixed(10);

}
