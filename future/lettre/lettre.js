async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=2`
    );
    const data = await response.json();

    // Calcul du total des taux de variation sur 4 intervalles de 15 minutes
    let totalVariation = 0;

    // Calcul des variations individuelles
    const variation1 =
      ((parseFloat(data[0][4]) - parseFloat(data[0][1])) /
        parseFloat(data[0][1])) *
      100;
    const variation2 =
      ((parseFloat(data[1][4]) - parseFloat(data[1][1])) /
        parseFloat(data[1][1])) *
      100;

    // Mise à jour du tableau avec les données et la couleur
    const cryptoRow = document.getElementById(symbol);

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const intervalVariation = ((closePrice - openPrice) / openPrice) * 100;
      const cellIndex = i + 1; // Décalage d'une cellule pour éviter la première cellule (Crypto)

      const variationCell = cryptoRow.insertCell(cellIndex);
      const variationValue = intervalVariation.toFixed(2);
      const timestamp = parseInt(data[i][0]);
      const dateValue = new Date(timestamp);
      const hour = dateValue.getHours();
      const minute = dateValue.getMinutes();
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      if (minute % 5 === 0) {
        // Ajouter la classe CSS appropriée en fonction de la valeur de intervalVariation
        if (intervalVariation > 0) {
          variationCell.classList.add("positive");
        } else if (intervalVariation < 0) {
          variationCell.classList.add("negative");
        }

        // Afficher la variation uniquement à des intervalles de 5 minutes
        variationCell.textContent = `${formattedTime}: ${variationValue}%`;
        // Ne pas ajouter de classe de couleur aux cellules individuelles
        totalVariation += intervalVariation; // Ajouter la variation de l'intervalle au total
      }
    }

    // Ajouter la cellule pour afficher le total de variation
    const totalCell = cryptoRow.insertCell(data.length + 1);
    const totalValue = totalVariation.toFixed(2);
    totalCell.textContent = `${totalValue}%`;

    const cryptoNameDiv = document.getElementById("cryptoNames");

    if (variation1 < 0 && variation2 < 0) {
      // Si les deux variations sont négatives, afficher "VERT" en vert
      totalCell.textContent = "VERT " + "(" + totalValue + "%)";
      totalCell.classList.add("positive");
      cryptoNameDiv.classList.remove("negative"); // Retirez la classe "negative"
      cryptoNameDiv.classList.add("positive"); // Ajoutez la classe "positive"
      const existingContent = cryptoNameDiv.innerHTML;
      cryptoNameDiv.innerHTML = existingContent
        ? `${existingContent}<br>${symbol} (VERT)`
        : `${symbol} (VERT)`;
    } else if (variation1 > 0 && variation2 > 0) {
      // Si les deux variations sont positives, afficher "ROUGE" en rouge
      totalCell.textContent = "ROUGE " + "(" + totalValue + "%)";
      totalCell.classList.add("negative");
      cryptoNameDiv.classList.remove("positive"); // Retirez la classe "positive"
      cryptoNameDiv.classList.add("negative"); // Ajoutez la classe "negative"
      const existingContent = cryptoNameDiv.innerHTML;
      cryptoNameDiv.innerHTML = existingContent
        ? `${existingContent}<br>${symbol} (ROUGE)`
        : `${symbol} (ROUGE)`;
    } else {
      totalCell.textContent = "/";
     
    }
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${symbol}:`,
      error
    );
  }
}

// Appel de la fonction pour obtenir les taux de variation des cryptos
fetchCryptoData("1INCH");
fetchCryptoData("AAVE");
fetchCryptoData("ACH");
fetchCryptoData("ADA");
fetchCryptoData("AGIX");
fetchCryptoData("AGLD");
fetchCryptoData("ALGO");
fetchCryptoData("ALICE");
fetchCryptoData("ALPHA");
fetchCryptoData("ALPACA");
fetchCryptoData("AMB");
fetchCryptoData("ANKR");
fetchCryptoData("ANT");
fetchCryptoData("APE");
fetchCryptoData("API3");
fetchCryptoData("APT");
fetchCryptoData("ARB");
fetchCryptoData("ARKM");
fetchCryptoData("ARPA");
fetchCryptoData("AR");
fetchCryptoData("ASTR");
fetchCryptoData("ATA");
fetchCryptoData("ATOM");
fetchCryptoData("AUDIO");
fetchCryptoData("AVAX");
fetchCryptoData("AXS");
fetchCryptoData("BAKE");
fetchCryptoData("BAL");
fetchCryptoData("BAND");
fetchCryptoData("BAT");
fetchCryptoData("BCH");
fetchCryptoData("BEL");
fetchCryptoData("BLZ");
fetchCryptoData("BNB");
fetchCryptoData("BNT");
fetchCryptoData("BNX");
fetchCryptoData("BTC");
fetchCryptoData("C98");
fetchCryptoData("CELO");
fetchCryptoData("CELR");
fetchCryptoData("CFX");
fetchCryptoData("CHR");
fetchCryptoData("CHZ");
fetchCryptoData("CKB");
fetchCryptoData("COMBO");
fetchCryptoData("COMP");
fetchCryptoData("COTI");
fetchCryptoData("CRV");
fetchCryptoData("CTK");
fetchCryptoData("CTSI");
fetchCryptoData("CVX");
fetchCryptoData("CYBER");
fetchCryptoData("DAR");
fetchCryptoData("DASH");
fetchCryptoData("DENT");
fetchCryptoData("DGB");
fetchCryptoData("DOGE");
fetchCryptoData("DOT");
fetchCryptoData("DUSK");
fetchCryptoData("DYDX");
fetchCryptoData("EDU");
fetchCryptoData("EGLD");
fetchCryptoData("ENJ");
fetchCryptoData("ENS");
fetchCryptoData("EOS");
fetchCryptoData("ETC");
fetchCryptoData("ETH");
fetchCryptoData("FET");
fetchCryptoData("FLM");
fetchCryptoData("FLOKI");
fetchCryptoData("FLOW");
fetchCryptoData("FTM");
fetchCryptoData("FXS");
fetchCryptoData("GALA");
fetchCryptoData("GAL");
fetchCryptoData("GMT");
fetchCryptoData("GMX");
fetchCryptoData("GRT");
fetchCryptoData("GTC");
fetchCryptoData("HBAR");
fetchCryptoData("HFT");
fetchCryptoData("HIFI");
fetchCryptoData("HIGH");
fetchCryptoData("HOT");
fetchCryptoData("ICP");
fetchCryptoData("ICX");
fetchCryptoData("IDEX");
fetchCryptoData("ID");
fetchCryptoData("IMX");
fetchCryptoData("INJ");
fetchCryptoData("IOST");
fetchCryptoData("IOTA");
fetchCryptoData("IOTX");
fetchCryptoData("JASMY");
fetchCryptoData("JOE");
fetchCryptoData("KAVA");
fetchCryptoData("KEY");
fetchCryptoData("KLAY");
fetchCryptoData("KNC");
fetchCryptoData("KSM");
fetchCryptoData("LDO");
fetchCryptoData("LEVER");
fetchCryptoData("LINA");
fetchCryptoData("LINK");
fetchCryptoData("LIT");
fetchCryptoData("LPT");
fetchCryptoData("LQTY");
fetchCryptoData("LRC");
fetchCryptoData("LTC");
fetchCryptoData("LUNA");
fetchCryptoData("LUNC");
fetchCryptoData("MAGIC");
fetchCryptoData("MANA");
fetchCryptoData("MASK");
fetchCryptoData("MATIC");
fetchCryptoData("MAV");
fetchCryptoData("MDT");
fetchCryptoData("MINA");
fetchCryptoData("MKR");
fetchCryptoData("MTL");
fetchCryptoData("NEAR");
fetchCryptoData("NEO");
fetchCryptoData("NKN");
fetchCryptoData("NMR");
fetchCryptoData("OCEAN");
fetchCryptoData("OGN");
fetchCryptoData("OMG");
fetchCryptoData("OM");
fetchCryptoData("ONE");
fetchCryptoData("ONT");
fetchCryptoData("PENDLE");
fetchCryptoData("PEPE");
fetchCryptoData("PERP");
fetchCryptoData("PHB");
fetchCryptoData("QNT");
fetchCryptoData("QTUM");
fetchCryptoData("RAD");
fetchCryptoData("REEF");
fetchCryptoData("REN");
fetchCryptoData("RLC");
fetchCryptoData("RNDR");
fetchCryptoData("ROSE");
fetchCryptoData("RSR");
fetchCryptoData("RUNE");
fetchCryptoData("RVN");
fetchCryptoData("SAND");
fetchCryptoData("SEI");
fetchCryptoData("SFP");
fetchCryptoData("SHIB");
fetchCryptoData("SKL");
fetchCryptoData("SNX");
fetchCryptoData("SNT");
fetchCryptoData("SOL");
fetchCryptoData("SPELL");
fetchCryptoData("SSV");
fetchCryptoData("STORJ");
fetchCryptoData("STX");
fetchCryptoData("SUI");
fetchCryptoData("SUSHI");
fetchCryptoData("SXP");
fetchCryptoData("THETA");
fetchCryptoData("TLM");
fetchCryptoData("TOMO");
fetchCryptoData("TRB");
fetchCryptoData("TRU");
fetchCryptoData("TRX");
fetchCryptoData("T");
fetchCryptoData("UMA");
fetchCryptoData("UNFI");
fetchCryptoData("UNI");
fetchCryptoData("USDC");
fetchCryptoData("VET");
fetchCryptoData("WAVES");
fetchCryptoData("WLD");
fetchCryptoData("WOO");
fetchCryptoData("XEC");
fetchCryptoData("XEM");
fetchCryptoData("XLM");
fetchCryptoData("XMR");
fetchCryptoData("XRP");
fetchCryptoData("XTZ");
fetchCryptoData("XVG");
fetchCryptoData("XVS");
fetchCryptoData("YFI");
fetchCryptoData("YGG");
fetchCryptoData("ZEC");
fetchCryptoData("ZEN");
fetchCryptoData("ZIL");
fetchCryptoData("ZRX");
