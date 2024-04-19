function calculerPrixCrypto() {
    var prixEntree = document.getElementById("decimalInput").value;
    
    // Calcul de la réduction de 0.50%
    var reductionZeroCinquantePourcent = (parseFloat(prixEntree) * 0.50) / 100; 
    var prixApresReductionZeroCinquantePourcent = prixEntree - reductionZeroCinquantePourcent;
    
    // Affichage du résultat après réduction de 0.50%
    document.getElementById("result1").innerText = "Résultat après -0.50% : " + prixApresReductionZeroCinquantePourcent.toFixed(10);
    
    // Calcul de la réduction supplémentaire de 6% sur le prix d'entrée initial
    var reductionSixPourcent = (parseFloat(prixEntree) * 6) / 100;
    var resultatFinal = prixEntree - reductionSixPourcent;

    // Affichage du résultat après réduction de 6%
    document.getElementById("result2").innerText = "Résultat après -6% : " + resultatFinal.toFixed(10);

    // Calcul de la réduction supplémentaire de 10% sur le prix d'entrée initial
    var reductionDixPourcent = (parseFloat(prixEntree) * 10) / 100;
    var resultatFinal = prixEntree - reductionDixPourcent;

    // Affichage du résultat après réduction de 10%
    document.getElementById("result3").innerText = "Résultat après -10% : " + resultatFinal.toFixed(10);

     // Calcul de la réduction supplémentaire de 14% sur le prix d'entrée initial
     var reductionQuatorzePourcent = (parseFloat(prixEntree) * 14) / 100;
     var resultatFinal = prixEntree - reductionQuatorzePourcent;
 
     // Affichage du résultat après réduction de 14%
     document.getElementById("result4").innerText = "Résultat après -14% : " + resultatFinal.toFixed(10);

     // Calcul de la réduction supplémentaire de 18% sur le prix d'entrée initial
    var reductionDixHuitPourcent = (parseFloat(prixEntree) * 18) / 100;
    var resultatDixHuitPourcent = prixEntree - reductionDixHuitPourcent;
    
    // Affichage du résultat après réduction de 18%
    document.getElementById("result5").innerText = "Résultat après -18% : " + resultatDixHuitPourcent.toFixed(10);
    
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
