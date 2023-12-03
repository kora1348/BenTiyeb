async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=2`
    );

    const data = await response.json();

    // Récupérez l'heure pour chaque intervalle
    const time1 = new Date(data[0][0]).toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' });
    const time2 = new Date(data[1][0]).toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' });

    // Récupérez le volume pour chaque intervalle
    const volume1 = parseFloat(data[0][5]); // Index 5 correspond au volume dans les données Klines
    const formattedVolume1 = volume1.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.');

    const volumeElement1 = document.getElementById(`volume_${symbol}_1`);
    volumeElement1.textContent = `${time1} (${formattedVolume1} USDT)`;

    // Récupérez le volume pour le deuxième intervalle (2)
    const volume2 = parseFloat(data[1][5]);
    const formattedVolume2 = volume2.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.');

    const volumeElement2 = document.getElementById(`volume_${symbol}_2`);
    volumeElement2.textContent = `${time2} (${formattedVolume2} USDT)`;

    // Calculez le total des volumes
    const totalVolume = volume1 + volume2;

    // Mettez à jour le contenu HTML avec le total
    const formattedTotalVolume = totalVolume.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.');
    const totalElement = document.getElementById(`total_${symbol}`);
    totalElement.textContent = `${formattedTotalVolume} USDT`;

    // Calculez la moyenne des volumes
    const averageVolume = totalVolume / 2; // Dans ce cas, 2 représente le nombre d'intervalles

    // Mettez à jour le contenu HTML avec la moyenne
    const formattedAverageVolume = averageVolume.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.');
    const averageElement = document.getElementById(`average_${symbol}`);
    averageElement.textContent = `${formattedAverageVolume} USDT`;

    // Utilisez directement le volume dans la condition (90 dans cet exemple)
    const percentageThresholdLong = 90;

    // Vérifiez si les volumes de chaque intervalle sont supérieurs à 90% de la moyenne totale
    const longElement = document.getElementById(`long_${symbol}`);
    if (volume1 > averageVolume * (percentageThresholdLong / 100) && volume2 > averageVolume * (percentageThresholdLong / 100)) {
      longElement.textContent = "LONG";
      longElement.classList.add("long");
    } else {
      longElement.textContent = "-";
    }

    // Vérifiez si le volume est inférieur au seuil pour la position SHORT
    const shortElement = document.getElementById(`short_${symbol}`);
    if (totalVolume < volumeThresholdShort) {
      shortElement.textContent = "SHORT";
      shortElement.classList.add("short");
    } else {
      shortElement.textContent = "-";
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


