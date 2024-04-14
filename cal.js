function calculerPrixCrypto() {
    var prixEntree = parseFloat(document.getElementById("decimalInput").value);
    var resultat;
    
    // *********** Augmentation *********** // 

    // Calcul de l'augmentation de 4%
    var augmentationQuatrePourcent = (prixEntree * 4) / 100;
    var prixApresAugmentationQuatrePourcent = prixEntree + augmentationQuatrePourcent;
    document.getElementById("result1").innerText = "Résultat après +4% : " + prixApresAugmentationQuatrePourcent.toFixed(10);

    // Calcul de l'augmentation de 8%
    var augmentationHuitPourcent = (prixEntree * 8) / 100;
    var prixApresAugmentationHuitPourcent = prixEntree + augmentationHuitPourcent;
    document.getElementById("result2").innerText = "Résultat après +8% : " + prixApresAugmentationHuitPourcent.toFixed(10);

    // Calcul de l'augmentation de 12%
    var augmentationDouzePourcent = (prixEntree * 12) / 100;
    var prixApresAugmentationDouzePourcent = prixEntree + augmentationDouzePourcent;
    document.getElementById("result3").innerText = "Résultat après +12% : " + prixApresAugmentationDouzePourcent.toFixed(10);

    // Calcul de l'augmentation de 16%
    var augmentationSeizePourcent = (prixEntree * 16) / 100;
    var prixApresAugmentationSeizePourcent = prixEntree + augmentationSeizePourcent;
    document.getElementById("result4").innerText = "Résultat après +16% : " + prixApresAugmentationSeizePourcent.toFixed(10);

    // Calcul de l'augmentation de 20%
    var augmentationVingtPourcent = (prixEntree * 20) / 100;
    var prixApresAugmentationVingtPourcent = prixEntree + augmentationVingtPourcent;
    document.getElementById("result5").innerText = "Résultat après +20% : " + prixApresAugmentationVingtPourcent.toFixed(10);

    // *********** Réduction *********** // 

    // Calcul de la réduction de 4%
    var reductionQuatrePourcent = (prixEntree * 4) / 100;
    var prixApresReductionQuatrePourcent = prixEntree - reductionQuatrePourcent;
    document.getElementById("result6").innerText = "Résultat après -4% : " + prixApresReductionQuatrePourcent.toFixed(10);

    // Calcul de la réduction de 8%
    var reductionHuitPourcent = (prixEntree * 8) / 100;
    var prixApresReductionHuitPourcent = prixEntree - reductionHuitPourcent;
    document.getElementById("result7").innerText = "Résultat après -8% : " + prixApresReductionHuitPourcent.toFixed(10);

    // Calcul de la réduction de 12%
    var reductionDouzePourcent = (prixEntree * 12) / 100;
    var prixApresReductionDouzePourcent = prixEntree - reductionDouzePourcent;
    document.getElementById("result8").innerText = "Résultat après -12% : " + prixApresReductionDouzePourcent.toFixed(10);

    // Calcul de la réduction de 16%
    var reductionSeizePourcent = (prixEntree * 16) / 100;
    var prixApresReductionSeizePourcent = prixEntree - reductionSeizePourcent;
    document.getElementById("result9").innerText = "Résultat après -16% : " + prixApresReductionSeizePourcent.toFixed(10);

    // Calcul de la réduction de 20%
    var reductionVingtPourcent = (prixEntree * 20) / 100;
    var prixApresReductionVingtPourcent = prixEntree - reductionVingtPourcent;
    document.getElementById("result10").innerText = "Résultat après -20% : " + prixApresReductionVingtPourcent.toFixed(10);
}
