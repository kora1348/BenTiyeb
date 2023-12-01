async function fetchCryptoData(symbol, rowId) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=8`
    );
    const data = await response.json();

    // Extraction du volume quotidien
    const dailyVolumes = data.map((candle) => parseFloat(candle[5]));

    // Calcul du total des volumes sur 8 jours
    const totalVolume = dailyVolumes.reduce((acc, volume) => acc + volume, 0);

    // Calcul de la moyenne
    const averageVolume = totalVolume / dailyVolumes.length;

    // Affichage du volume quotidien pour chaque jour
    console.log(`Volume quotidien pour ${symbol}:`, dailyVolumes);

    // Affichage des volumes dans le tableau HTML
    const row = document.getElementById(rowId);
    for (let i = 0; i < dailyVolumes.length; i++) {
      const cell = document.createElement("td");
      cell.textContent = dailyVolumes[i].toFixed(2);
      row.appendChild(cell);
    }

    // Ajout de la cellule pour le total
    const totalCell = document.createElement("td");
    totalCell.textContent = totalVolume.toFixed(2);
    row.appendChild(totalCell);

    // Ajout de la cellule pour la moyenne
    const averageCell = document.createElement("td");
    averageCell.textContent = averageVolume.toFixed(2);
    row.appendChild(averageCell);

    // Coloration en fonction de la comparaison entre la moyenne et le total
    if (averageVolume > totalVolume) {
      averageCell.style.color = "green"; // Moyenne supérieure au total
    } else if (averageVolume < totalVolume) {
      averageCell.style.color = "red"; // Moyenne inférieure au total
    } else {
      averageCell.style.color = "black"; // Moyenne égale au total
    }

  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${symbol}:`,
      error
    );
  }
}

// Appel de la fonction pour obtenir les volumes quotidiens des cryptos
fetchCryptoData("1INCH", "1INCH");
fetchCryptoData("AAVE", "AAVE");
fetchCryptoData("ACH", "ACH");
fetchCryptoData("AGIX", "AGIX");
fetchCryptoData("AGLD", "AGLD");
fetchCryptoData("ALGO", "ALGO");
fetchCryptoData("ALICE", "ALICE");
fetchCryptoData("ALPHA", "ALPHA");
fetchCryptoData("ALPACA", "ALPACA");
fetchCryptoData("AMB", "AMB");
fetchCryptoData("ANKR", "ANKR");
fetchCryptoData("ANT", "ANT");
fetchCryptoData("APE", "APE");
fetchCryptoData("API3", "API3");
fetchCryptoData("APT", "APT");
fetchCryptoData("ARB", "ARB");
fetchCryptoData("ARKM", "ARKM");
fetchCryptoData("ARPA", "ARPA");
fetchCryptoData("AR", "AR");
fetchCryptoData("ASTR", "ASTR");
fetchCryptoData("ATA", "ATA");
fetchCryptoData("ATOM", "ATOM");
fetchCryptoData("AUDIO", "AUDIO");
fetchCryptoData("AVAX", "AVAX");
fetchCryptoData("AXS", "AXS");
fetchCryptoData("BAKE", "BAKE");
fetchCryptoData("BAL", "BAL");
fetchCryptoData("BAND", "BAND");
fetchCryptoData("BAT", "BAT");
fetchCryptoData("BCH", "BCH");
fetchCryptoData("BEL", "BEL");
fetchCryptoData("BLZ", "BLZ");
fetchCryptoData("BNT", "BNT");
fetchCryptoData("BNX", "BNX");
fetchCryptoData("BTC", "BTC");
fetchCryptoData("C98", "C98");
fetchCryptoData("CELO", "CELO");
fetchCryptoData("CELR", "CELR");
fetchCryptoData("CFX", "CFX");
fetchCryptoData("CHR", "CHR");
fetchCryptoData("CHZ", "CHZ");
fetchCryptoData("CKB", "CKB");
fetchCryptoData("COMBO", "COMBO");
fetchCryptoData("COMP", "COMP");
fetchCryptoData("COTI", "COTI");
fetchCryptoData("CRV", "CRV");
fetchCryptoData("CTK", "CTK");
fetchCryptoData("CTSI", "CTSI");
fetchCryptoData("CVX", "CVX");
fetchCryptoData("CYBER", "CYBER");
fetchCryptoData("DAR", "DAR");
fetchCryptoData("DASH", "DASH");
fetchCryptoData("DENT", "DENT");
fetchCryptoData("DGB", "DGB");
fetchCryptoData("DUSK", "DUSK");
fetchCryptoData("DYDX", "DYDX");
fetchCryptoData("EDU", "EDU");
fetchCryptoData("EGLD", "EGLD");
fetchCryptoData("ENJ", "ENJ");
fetchCryptoData("ENS", "ENS");
fetchCryptoData("EOS", "EOS");
fetchCryptoData("ETC", "ETC");
fetchCryptoData("ETH", "ETH");
fetchCryptoData("FET", "FET");
fetchCryptoData("FLM", "FLM");
fetchCryptoData("FLOKI", "FLOKI");
fetchCryptoData("FLOW", "FLOW");
fetchCryptoData("FTM", "FTM");
fetchCryptoData("FXS", "FXS");
fetchCryptoData("GALA", "GALA");
fetchCryptoData("GAL", "GAL");
fetchCryptoData("GMT", "GMT");
fetchCryptoData("GMX", "GMX");
fetchCryptoData("GRT", "GRT");
fetchCryptoData("GTC", "GTC");
fetchCryptoData("HBAR", "HBAR");
fetchCryptoData("HFT", "HFT");
fetchCryptoData("HIFI", "HIFI");
fetchCryptoData("HIGH", "HIGH");
fetchCryptoData("HOT", "HOT");
fetchCryptoData("ICP", "ICP");
fetchCryptoData("ICX", "ICX");
fetchCryptoData("IDEX", "IDEX");
fetchCryptoData("ID", "ID");
fetchCryptoData("IMX", "IMX");
fetchCryptoData("INJ", "INJ");
fetchCryptoData("IOST", "IOST");
fetchCryptoData("IOTA", "IOTA");
fetchCryptoData("IOTX", "IOTX");
fetchCryptoData("JASMY", "JASMY");
fetchCryptoData("JOE", "JOE");
fetchCryptoData("KAVA", "KAVA");
fetchCryptoData("KEY", "KEY");
fetchCryptoData("KLAY", "KLAY");
fetchCryptoData("KNC", "KNC");
fetchCryptoData("KSM", "KSM");
fetchCryptoData("LEVER", "LEVER");
fetchCryptoData("LINA", "LINA");
fetchCryptoData("LINK", "LINK");
fetchCryptoData("LIT", "LIT");
fetchCryptoData("LPT", "LPT");
fetchCryptoData("LQTY", "LQTY");
fetchCryptoData("LRC", "LRC");
fetchCryptoData("LTC", "LTC");
fetchCryptoData("LUNA", "LUNA");
fetchCryptoData("LUNC", "LUNC");
fetchCryptoData("MAGIC", "MAGIC");
fetchCryptoData("MANA", "MANA");
fetchCryptoData("MASK", "MASK");
fetchCryptoData("MATIC", "MATIC");
fetchCryptoData("MAV", "MAV");
fetchCryptoData("MDT", "MDT");
fetchCryptoData("MINA", "MINA");
fetchCryptoData("MKR", "MKR");
fetchCryptoData("MTL", "MTL");
fetchCryptoData("NEAR", "NEAR");
fetchCryptoData("NEO", "NEO");
fetchCryptoData("NKN", "NKN");
fetchCryptoData("NMR", "NMR");
fetchCryptoData("OCEAN", "OCEAN");
fetchCryptoData("OGN", "OGN");
fetchCryptoData("OMG", "OMG");
fetchCryptoData("OM", "OM");
fetchCryptoData("ONE", "ONE");
fetchCryptoData("ONT", "ONT");
fetchCryptoData("PENDLE", "PENDLE");
fetchCryptoData("PEPE", "PEPE");
fetchCryptoData("PERP", "PERP");
fetchCryptoData("PHB", "PHB");
fetchCryptoData("QNT", "QNT");
fetchCryptoData("QTUM", "QTUM");
fetchCryptoData("RAD", "RAD");
fetchCryptoData("REEF", "REEF");
fetchCryptoData("REN", "REN");
fetchCryptoData("RLC", "RLC");
fetchCryptoData("RNDR", "RNDR");
fetchCryptoData("ROSE", "ROSE");
fetchCryptoData("RSR", "RSR");
fetchCryptoData("RUNE", "RUNE");
fetchCryptoData("RVN", "RVN");
fetchCryptoData("SAND", "SAND");
fetchCryptoData("SEI", "SEI");
fetchCryptoData("SFP", "SFP");
fetchCryptoData("SHIB", "SHIB");
fetchCryptoData("SKL", "SKL");
fetchCryptoData("SNX", "SNX");
fetchCryptoData("SNT", "SNT");
fetchCryptoData("SPELL", "SPELL");
fetchCryptoData("SSV", "SSV");
fetchCryptoData("STORJ", "STORJ");
fetchCryptoData("STX", "STX");
fetchCryptoData("SUI", "SUI");
fetchCryptoData("SUSHI", "SUSHI");
fetchCryptoData("SXP", "SXP");
fetchCryptoData("THETA", "THETA");
fetchCryptoData("TLM", "TLM");
fetchCryptoData("TOMO", "TOMO");
fetchCryptoData("TRB", "TRB");
fetchCryptoData("TRU", "TRU");
fetchCryptoData("T", "T");
fetchCryptoData("UMA", "UMA");
fetchCryptoData("UNFI", "UNFI");
fetchCryptoData("UNI", "UNI");
fetchCryptoData("VET", "VET");
fetchCryptoData("WAVES", "WAVES");
fetchCryptoData("WLD", "WLD");
fetchCryptoData("WOO", "WOO");
fetchCryptoData("XEC", "XEC");
fetchCryptoData("XEM", "XEM");
fetchCryptoData("XLM", "XLM");
fetchCryptoData("XMR", "XMR");
fetchCryptoData("XRP", "XRP");
fetchCryptoData("XTZ", "XTZ");
fetchCryptoData("XVG", "XVG");
fetchCryptoData("XVS", "XVS");
fetchCryptoData("YFI", "YFI");
fetchCryptoData("YGG", "YGG");
fetchCryptoData("ZEC", "ZEC");
fetchCryptoData("ZEN", "ZEN");
fetchCryptoData("ZIL", "ZIL");
fetchCryptoData("ZRX", "ZRX");
