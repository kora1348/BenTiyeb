async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=3`
    );

    const data = await response.json();

    // Calculez le taux de variation pour chaque intervalle
    let totalVariation = 0;
    const variations = [];

    for (let i = 1; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const variation = ((closePrice - openPrice) / openPrice) * 100;
      const time = new Date(data[i][0]).toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric', hour12: false });

    
      // Mettez à jour le contenu HTML avec les taux de variation, l'heure et la couleur
      const element = document.getElementById(`variation_${symbol}_${i}`);
      element.innerHTML = `${variation.toFixed(2)}% <span class="time">- (${time})</span>`;
      
    
      // Ajoutez la classe de couleur en fonction de la positivité ou de la négativité
      if (variation > 0) {
        element.classList.add("positive");
      } else if (variation < 0) {
        element.classList.add("negative");
      }
    
      // Calculez le total des taux de variation
      totalVariation += variation;
    
      // Stockez les variations dans le tableau
      variations.push(variation);
    }
    

    // Mettez à jour le contenu HTML avec le total et appliquez la classe de couleur bleue
    const totalElement = document.getElementById(`total_${symbol}`);
    totalElement.textContent = `${totalVariation.toFixed(2)}%`;
    totalElement.classList.add("total");

    // Calculez la moyenne et mettez à jour le contenu HTML avec la classe de couleur en fonction de la positivité ou de la négativité
    const averageElement = document.getElementById(`average_${symbol}`);
    const average = totalVariation / data.length;
    averageElement.textContent = `${average.toFixed(2)}%`;

    if (average > 0) {
      averageElement.classList.add("positive");
    } else if (average < 0) {
      averageElement.classList.add("negative");
    }


const cryptoNamesElement = document.getElementById('cryptoNames');

// Utilisez directement le pourcentage dans la condition (90 dans cet exemple)
const percentageThresholdLong = 90;

// Vérifiez si toutes les variations sont supérieures à 90% de la moyenne
const longElement = document.getElementById(`long_${symbol}`);
if (variations.every(variation => variation > average * (percentageThresholdLong / 100))) {
  longElement.textContent = "LONG";
  longElement.classList.add("long", "positive"); // Ajout de la classe "positive" pour LONG
  cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="positive">${symbol}: LONG</p>`;
} else {
  longElement.textContent = "-";
}

const percentageThresholdShort = 90;

// Vérifiez si toutes les variations sont en dessous de 90% de la moyenne
const shortElement = document.getElementById(`short_${symbol}`);
if (variations.every(variation => variation < average * (percentageThresholdShort / 100))) {
  shortElement.textContent = "SHORT";
  shortElement.classList.add("short", "negative"); // Ajout de la classe "negative" pour SHORT
  cryptoNamesElement.innerHTML += `<p id="${symbol}_status" class="negative">${symbol}: SHORT</p>`;
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


