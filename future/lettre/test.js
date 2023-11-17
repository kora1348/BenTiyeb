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
      }
    }

    return { countIntervalGreaterThan };

  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error; // Re-throw the error to propagate it to the Promise.all catch block
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
    const total = values.reduce((accumulator, value) => accumulator + value.countIntervalGreaterThan, 0);
    console.log(`Number of times interval1 > interval2: ${total}`);
  })
  .catch((error) => {
    console.error("Error during Promise.all:", error);
  });
