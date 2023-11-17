async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=2`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${symbol}`);
    }

    const data = await response.json();

    const cryptoRow = document.getElementById(symbol);
    const [firstInterval, secondInterval] = [
      parseFloat(data[0][4]) - parseFloat(data[0][1]),
      parseFloat(data[1][4]) - parseFloat(data[1][1]),
    ];

    const isMaxInterval = firstInterval > secondInterval;
    let countIntervalGreaterThan = 0;

    // Ajout d'une variable pour stocker les deux meilleures variations d'intervalle
    let topIntervals = {
      first: { symbol: symbol, value: -Infinity, time: '' },
      second: { symbol: symbol, value: -Infinity, time: '' },
    };

    for (let i = 0; i < data.length; i++) {
      const openPrice = parseFloat(data[i][1]);
      const closePrice = parseFloat(data[i][4]);
      const intervalVariation = ((closePrice - openPrice) / openPrice) * 100;
      const cellIndex = i + 1;

      const variationCell = cryptoRow.insertCell(cellIndex);
      const variationValue = intervalVariation.toFixed(2);

      const timestamp = parseInt(data[i][0]);
      const dateValue = new Date(timestamp);
      const formattedTime = `${dateValue.getHours().toString().padStart(2, "0")}:${dateValue.getMinutes().toString().padStart(2, "0")}`;

      variationCell.textContent = `${formattedTime}: ${variationValue}%`;

      if (i === 0 && isMaxInterval && firstInterval !== 0) {
        variationCell.classList.add('positive');
        countIntervalGreaterThan++;

        // Mettre à jour les deux meilleures variations d'intervalle
        if (intervalVariation > topIntervals.first.value) {
          topIntervals.second = { ...topIntervals.first };
          topIntervals.first = { symbol: symbol, value: intervalVariation, time: formattedTime };
        } else if (intervalVariation > topIntervals.second.value) {
          topIntervals.second = { symbol: symbol, value: intervalVariation, time: formattedTime };
        }
      }
    }

    return { countIntervalGreaterThan, topIntervals };

  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error;
  }
}


// Use Promise.all to fetch data for multiple symbols concurrently
Promise.all([
  fetchCryptoData("1INCH"),
  fetchCryptoData("AAVE"),
  fetchCryptoData("ACH"),
  fetchCryptoData("ADA"),
  fetchCryptoData("AGIX"),
  fetchCryptoData("AGLD"),
  fetchCryptoData("ALGO"),
  fetchCryptoData("ALICE"),
  fetchCryptoData("ALPHA"),
  fetchCryptoData("AMB"),
  fetchCryptoData("ANKR"),
  fetchCryptoData("ANT"),
  fetchCryptoData("APE"),
  fetchCryptoData("API3"),
  fetchCryptoData("APT"),
  fetchCryptoData("ARB"),
  fetchCryptoData("ARKM"),
  fetchCryptoData("ARPA"),
  fetchCryptoData("AR"),
  fetchCryptoData("ASTR"),
  fetchCryptoData("ATA"),
  fetchCryptoData("ATOM"),
  fetchCryptoData("AUDIO"),
  fetchCryptoData("AVAX"),
  fetchCryptoData("AXS"),
  fetchCryptoData("BAKE"),
  fetchCryptoData("BAL"),
  fetchCryptoData("BAND"),
  fetchCryptoData("BAT"),
  fetchCryptoData("BCH"),
  fetchCryptoData("BEL"),
  fetchCryptoData("BLZ"),
  fetchCryptoData("BNB"),
  fetchCryptoData("BNT"),
  fetchCryptoData("BNX"),
  fetchCryptoData("BTC"),
  fetchCryptoData("C98"),
  fetchCryptoData("CELO"),
  fetchCryptoData("CELR"),
  fetchCryptoData("CFX"),
  fetchCryptoData("CHR"),
  fetchCryptoData("CHZ"),
  fetchCryptoData("CKB"),
  fetchCryptoData("COMBO"),
  fetchCryptoData("COMP"),
  fetchCryptoData("COTI"),
  fetchCryptoData("CRV"),
  fetchCryptoData("CTK"),
  fetchCryptoData("CTSI"),
  fetchCryptoData("CVX"),
  fetchCryptoData("CYBER"),
  fetchCryptoData("DAR"),
  fetchCryptoData("DASH"),
  fetchCryptoData("DENT"),
  fetchCryptoData("DGB"),
  fetchCryptoData("DOGE"),
  fetchCryptoData("DOT"),
  fetchCryptoData("DUSK"),
  fetchCryptoData("DYDX"),
  fetchCryptoData("EDU"),
  fetchCryptoData("EGLD"),
  fetchCryptoData("ENJ"),
  fetchCryptoData("ENS"),
  fetchCryptoData("EOS"),
  fetchCryptoData("ETC"),
  fetchCryptoData("ETH"),
  fetchCryptoData("FET"),
  fetchCryptoData("FLM"),
  fetchCryptoData("FLOKI"),
  fetchCryptoData("FLOW"),
  fetchCryptoData("FTM"),
  fetchCryptoData("FXS"),
  fetchCryptoData("GALA"),
  fetchCryptoData("GAL"),
  fetchCryptoData("GMT"),
  fetchCryptoData("GMX"),
  fetchCryptoData("GRT"),
  fetchCryptoData("GTC"),
  fetchCryptoData("HBAR"),
  fetchCryptoData("HFT"),
  fetchCryptoData("HIFI"),
  fetchCryptoData("HIGH"),
  fetchCryptoData("HOT"),
  fetchCryptoData("ICP"),
  fetchCryptoData("ICX"),
  fetchCryptoData("IDEX"),
  fetchCryptoData("ID"),
  fetchCryptoData("IMX"),
  fetchCryptoData("INJ"),
  fetchCryptoData("IOST"),
  fetchCryptoData("IOTA"),
  fetchCryptoData("IOTX"),
  fetchCryptoData("JASMY"),
  fetchCryptoData("JOE"),
  fetchCryptoData("KAVA"),
  fetchCryptoData("KEY"),
  fetchCryptoData("KLAY"),
  fetchCryptoData("KNC"),
  fetchCryptoData("KSM"),
  fetchCryptoData("LDO"),
  fetchCryptoData("LEVER"),
  fetchCryptoData("LINA"),
  fetchCryptoData("LINK"),
  fetchCryptoData("LIT"),
  fetchCryptoData("LPT"),
  fetchCryptoData("LQTY"),
  fetchCryptoData("LRC"),
  fetchCryptoData("LTC"),
  fetchCryptoData("LUNA"),
  fetchCryptoData("LUNC"),
  fetchCryptoData("MAGIC"),
  fetchCryptoData("MANA"),
  fetchCryptoData("MASK"),
  fetchCryptoData("MATIC"),
  fetchCryptoData("MAV"),
  fetchCryptoData("MDT"),
  fetchCryptoData("MINA"),
  fetchCryptoData("MKR"),
  fetchCryptoData("MTL"),
  fetchCryptoData("NEAR"),
  fetchCryptoData("NEO"),
  fetchCryptoData("NKN"),
  fetchCryptoData("NMR"),
  fetchCryptoData("OCEAN"),
  fetchCryptoData("OGN"),
  fetchCryptoData("OMG"),
  fetchCryptoData("OM"),
  fetchCryptoData("ONE"),
  fetchCryptoData("ONT"),
  fetchCryptoData("PENDLE"),
  fetchCryptoData("PEPE"),
  fetchCryptoData("PERP"),
  fetchCryptoData("PHB"),
  fetchCryptoData("QNT"),
  fetchCryptoData("QTUM"),
  fetchCryptoData("RAD"),
  fetchCryptoData("REEF"),
  fetchCryptoData("REN"),
  fetchCryptoData("RLC"),
  fetchCryptoData("RNDR"),
  fetchCryptoData("ROSE"),
  fetchCryptoData("RSR"),
  fetchCryptoData("RUNE"),
  fetchCryptoData("RVN"),
  fetchCryptoData("SAND"),
  fetchCryptoData("SEI"),
  fetchCryptoData("SFP"),
  fetchCryptoData("SHIB"),
  fetchCryptoData("SKL"),
  fetchCryptoData("SNX"),
  fetchCryptoData("SOL"),
  fetchCryptoData("SPELL"),
  fetchCryptoData("SSV"),
  fetchCryptoData("STORJ"),
  fetchCryptoData("STX"),
  fetchCryptoData("SUI"),
  fetchCryptoData("SUSHI"),
  fetchCryptoData("SXP"),
  fetchCryptoData("THETA"),
  fetchCryptoData("TLM"),
  fetchCryptoData("TOMO"),
  fetchCryptoData("TRB"),
  fetchCryptoData("TRU"),
  fetchCryptoData("TRX"),
  fetchCryptoData("T"),
  fetchCryptoData("UMA"),
  fetchCryptoData("UNFI"),
  fetchCryptoData("UNI"),
  fetchCryptoData("USDC"),
  fetchCryptoData("VET"),
  fetchCryptoData("WAVES"),
  fetchCryptoData("WLD"),
  fetchCryptoData("WOO"),
  fetchCryptoData("XEC"),
  fetchCryptoData("XEM"),
  fetchCryptoData("XLM"),
  fetchCryptoData("XMR"),
  fetchCryptoData("XRP"),
  fetchCryptoData("XTZ"),
  fetchCryptoData("XVG"),
  fetchCryptoData("XVS"),
  fetchCryptoData("YFI"),
  fetchCryptoData("YGG"),
  fetchCryptoData("ZEC"),
  fetchCryptoData("ZEN"),
  fetchCryptoData("ZIL"),
  fetchCryptoData("ZRX"),
])
.then((values) => {
  let total = 0;
  let topIntervals = { first: { symbol: '', value: -Infinity, time: '' }, second: { symbol: '', value: -Infinity, time: '' } };

  values.forEach((value, index) => {
    total += value.countIntervalGreaterThan;

    // Mettre à jour les deux meilleures variations globales
    if (value.topIntervals.first.value > topIntervals.first.value) {
      topIntervals.second = { ...topIntervals.first };
      topIntervals.first = { symbol: value.topIntervals.first.symbol, value: value.topIntervals.first.value, time: value.topIntervals.first.time };
    } else if (value.topIntervals.first.value > topIntervals.second.value) {
      topIntervals.second = { symbol: value.topIntervals.first.symbol, value: value.topIntervals.first.value, time: value.topIntervals.first.time };
    }

    if (value.topIntervals.second.value > topIntervals.second.value) {
      topIntervals.second = { symbol: value.topIntervals.second.symbol, value: value.topIntervals.second.value, time: value.topIntervals.second.time };
    }
  });

  const totalMessageDiv = document.getElementById('totalMessage');

  // Afficher le total
  totalMessageDiv.textContent = `La direction est haussière : ${total}`;

  // Afficher les deux meilleures variations d'intervalle dans l'élément avec l'ID "rankingMessage"
  totalMessageDiv.innerHTML += `<br><br>Les deux meilleures variations sont : <br>
    1. ${topIntervals.first.symbol} ${topIntervals.first.value.toFixed(2)}% à ${topIntervals.first.time} <br>
    2. ${topIntervals.second.symbol} ${topIntervals.second.value.toFixed(2)}% à ${topIntervals.second.time}`;

  // Changer la couleur en vert si le total est égal ou supérieur à 2
  if (total >= 50) {
    totalMessageDiv.style.color = 'green';
    totalMessageDiv.style.fontWeight = '700';
  }
})
.catch((error) => {
  console.error("Error during Promise.all:", error);
});
