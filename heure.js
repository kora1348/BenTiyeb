async function fetchCryptoData(symbol) {
  const cryptoRow = document.getElementById(symbol);
  const cryptoNamesElement = document.getElementById("cryptoNames");
  let todayVariation = 0;
  let yesterdayVariation = 0;
  const now = new Date();
  const currentHour = now.getHours();

  for (let i = 0; i < 2; i++) {
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() - i);
      targetDate.setMinutes(0, 0, 0);
      targetDate.setHours(currentHour);
      const startTime = targetDate.getTime();
      const endTime = startTime + 60 * 60 * 1000;

      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&startTime=${startTime}&endTime=${endTime}`;

      try {
          const response = await fetch(url);
          const data = await response.json();
          const variationCell = cryptoRow.insertCell(1);

          if (data.length === 0) {
              variationCell.textContent = "Pas de données";
              continue;
          }

          const openPrice = parseFloat(data[0][1]);
          const closePrice = parseFloat(data[0][4]);
          const variation = ((closePrice - openPrice) / openPrice) * 100;

          // Stocker les variations (i=0: aujourd'hui, i=1: hier)
          if (i === 0) {
              todayVariation = variation;
          } else {
              yesterdayVariation = variation;
          }

          const variationValue = variation.toFixed(2);
          const startDate = new Date(data[0][0]);
          const endDate = new Date(data[0][6]);

          variationCell.textContent = `${startDate.toLocaleDateString("fr-FR", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "numeric"
          })} (${startDate.toLocaleTimeString("fr-FR", {
              hour: "numeric",
              minute: "numeric"
          })}) - ${endDate.toLocaleDateString("fr-FR", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit"
          })} (${endDate.toLocaleTimeString("fr-FR", {
              hour: "numeric",
              minute: "numeric"
          })}): ${variationValue}%`;

          variationCell.classList.add(variation > 0 ? "positive" : "negative");

      } catch (error) {
          console.error(`Erreur pour ${symbol}:`, error);
      }
  }

  // Afficher le symbole uniquement si la variation actuelle > variation veille
  // Afficher le symbole uniquement si la variation actuelle > variation veille
// ET si les deux variations sont ≥ 1% en valeur absolue
if (
  todayVariation > yesterdayVariation &&
  todayVariation >= 1 &&
  yesterdayVariation >= 1
) {
  cryptoNamesElement.innerHTML += `
      <div class="crypto-alert">
          <span class="symbol">${symbol}</span>
          <span class="variation yesterday">${yesterdayVariation.toFixed(2)}%</span>
          <span class="variation-arrow">↑</span>
          <span class="variation today">${todayVariation.toFixed(2)}%</span>
      </div>
  `;
}


}

fetchCryptoData("BTC");
fetchCryptoData("ETH");
fetchCryptoData("BCH");
fetchCryptoData("XRP");
fetchCryptoData("EOS");
fetchCryptoData("LTC");
fetchCryptoData("TRX");
fetchCryptoData("ETC");
fetchCryptoData("LINK");
fetchCryptoData("XLM");
fetchCryptoData("ADA");
fetchCryptoData("DASH");
fetchCryptoData("ZEC");
fetchCryptoData("XTZ");
fetchCryptoData("BNB");
fetchCryptoData("ATOM");
fetchCryptoData("ONT");
fetchCryptoData("IOTA");
fetchCryptoData("BAT");
fetchCryptoData("VET");
fetchCryptoData("NEO");
fetchCryptoData("QTUM");
fetchCryptoData("IOST");
fetchCryptoData("THETA");
fetchCryptoData("ALGO");
fetchCryptoData("ZIL");
fetchCryptoData("KNC");
fetchCryptoData("ZRX");
fetchCryptoData("COMP");
fetchCryptoData("OMG");
fetchCryptoData("DOGE");
fetchCryptoData("SXP");
fetchCryptoData("KAVA");
fetchCryptoData("BAND");
fetchCryptoData("RLC");
fetchCryptoData("WAVES");
fetchCryptoData("MKR");
fetchCryptoData("SNX");
fetchCryptoData("DOT");
fetchCryptoData("DEFI");
fetchCryptoData("YFI");
fetchCryptoData("BAL");
fetchCryptoData("CRV");
fetchCryptoData("TRB");
fetchCryptoData("RUNE");
fetchCryptoData("SUSHI");
fetchCryptoData("EGLD");
fetchCryptoData("SOL");
fetchCryptoData("ICX");
fetchCryptoData("STORJ");
fetchCryptoData("BLZ");
fetchCryptoData("UNI");
fetchCryptoData("AVAX");
fetchCryptoData("FTM");
fetchCryptoData("ENJ");
fetchCryptoData("FLM");
fetchCryptoData("REN");
fetchCryptoData("KSM");
fetchCryptoData("NEAR");
fetchCryptoData("AAVE");
fetchCryptoData("FIL");
fetchCryptoData("RSR");
fetchCryptoData("LRC");
fetchCryptoData("OCEAN");
fetchCryptoData("CVC");
fetchCryptoData("BEL");
fetchCryptoData("CTK");
fetchCryptoData("AXS");
fetchCryptoData("ALPHA");
fetchCryptoData("ZEN");
fetchCryptoData("SKL");
fetchCryptoData("GRT");
fetchCryptoData("1INCH");
fetchCryptoData("CHZ");
fetchCryptoData("SAND");
fetchCryptoData("ANKR");
fetchCryptoData("LIT");
fetchCryptoData("UNFI");
fetchCryptoData("REEF");
fetchCryptoData("RVN");
fetchCryptoData("SFP");
fetchCryptoData("XEM");
fetchCryptoData("COTI");
fetchCryptoData("CHR");
fetchCryptoData("MANA");
fetchCryptoData("ALICE");
fetchCryptoData("HBAR");
fetchCryptoData("ONE");
fetchCryptoData("LINA");
fetchCryptoData("STMX");
fetchCryptoData("DENT");
fetchCryptoData("CELR");
fetchCryptoData("HOT");
fetchCryptoData("MTL");
fetchCryptoData("OGN");
fetchCryptoData("NKN");
fetchCryptoData("SC");
fetchCryptoData("DGB");
fetchCryptoData("SHIB");
fetchCryptoData("BAKE");
fetchCryptoData("GTC");
fetchCryptoData("BTCDOM");
fetchCryptoData("IOTX");
fetchCryptoData("RAY");
fetchCryptoData("C98");
fetchCryptoData("MASK");
fetchCryptoData("ATA");
fetchCryptoData("DYDX");
fetchCryptoData("XEC");
fetchCryptoData("GALA");
fetchCryptoData("CELO");
fetchCryptoData("AR");
fetchCryptoData("KLAY");
fetchCryptoData("ARPA");
fetchCryptoData("CTSI");
fetchCryptoData("LPT");
fetchCryptoData("ENS");
fetchCryptoData("PEOPLE");
fetchCryptoData("ROSE");
fetchCryptoData("DUSK");
fetchCryptoData("FLOW");
fetchCryptoData("IMX");
fetchCryptoData("API3");
fetchCryptoData("GMT");
fetchCryptoData("APE");
fetchCryptoData("WOO");
fetchCryptoData("FTT");
fetchCryptoData("JASMY");
fetchCryptoData("DAR");
fetchCryptoData("OP");
fetchCryptoData("INJ");
fetchCryptoData("STG");
fetchCryptoData("SPELL");
fetchCryptoData("LUNC");
fetchCryptoData("LUNA2");
fetchCryptoData("LDO");
fetchCryptoData("CVX");
fetchCryptoData("ICP");
fetchCryptoData("APT");
fetchCryptoData("QNT");
fetchCryptoData("FET");
fetchCryptoData("FXS");
fetchCryptoData("HOOK");
fetchCryptoData("MAGIC");
fetchCryptoData("T");
fetchCryptoData("HIGH");
fetchCryptoData("MINA");
fetchCryptoData("ASTR");
fetchCryptoData("AGIX");
fetchCryptoData("PHB");
fetchCryptoData("GMX");
fetchCryptoData("CFX");
fetchCryptoData("STX");
fetchCryptoData("BNX");
fetchCryptoData("ACH");
fetchCryptoData("SSV");
fetchCryptoData("CKB");
fetchCryptoData("PERP");
fetchCryptoData("TRU");
fetchCryptoData("LQTY");
fetchCryptoData("ID");
fetchCryptoData("ARB");
fetchCryptoData("JOE");
fetchCryptoData("TLM");
fetchCryptoData("AMB");
fetchCryptoData("LEVER");
fetchCryptoData("RDNT");
fetchCryptoData("HFT");
fetchCryptoData("XVS");
fetchCryptoData("BLUR");
fetchCryptoData("EDU");
fetchCryptoData("IDEX");
fetchCryptoData("SUI");
fetchCryptoData("PEPE");
fetchCryptoData("FLOKI");
fetchCryptoData("UMA");
fetchCryptoData("RAD");
fetchCryptoData("KEY");
fetchCryptoData("COMBO");
fetchCryptoData("NMR");
fetchCryptoData("MAV");
fetchCryptoData("MDT");
fetchCryptoData("XVG");
fetchCryptoData("WLD");
fetchCryptoData("PENDLE");
fetchCryptoData("ARKM");
fetchCryptoData("AGLD");
fetchCryptoData("YGG");
fetchCryptoData("DODOX");
fetchCryptoData("BNT");
fetchCryptoData("OXT");
fetchCryptoData("SEI");
fetchCryptoData("CYBER");
fetchCryptoData("HIFI");
fetchCryptoData("ARK");
fetchCryptoData("GLMR");
fetchCryptoData("BICO");
fetchCryptoData("STRAX");
fetchCryptoData("LOOM");
fetchCryptoData("BIGTIME");
fetchCryptoData("BOND");
fetchCryptoData("ORBS");
fetchCryptoData("STPT");
fetchCryptoData("WAXP");
fetchCryptoData("BSV");
fetchCryptoData("RIF");
fetchCryptoData("POLYX");
fetchCryptoData("GAS");
fetchCryptoData("POWR");
fetchCryptoData("SLP");
fetchCryptoData("TIA");
fetchCryptoData("SNT");
fetchCryptoData("CAKE");
fetchCryptoData("MEME");
fetchCryptoData("TWT");
fetchCryptoData("TOKEN");
fetchCryptoData("ORDI");
fetchCryptoData("STEEM");
fetchCryptoData("BADGER");
fetchCryptoData("ILV");
fetchCryptoData("NTRN");
fetchCryptoData("KAS");
fetchCryptoData("BEAMX");
fetchCryptoData("BONK");
fetchCryptoData("PYTH");
fetchCryptoData("SUPER");
fetchCryptoData("USTC");
fetchCryptoData("ONG");
fetchCryptoData("ETHW");
fetchCryptoData("JTO");
fetchCryptoData("SATS");
fetchCryptoData("AUCTION");
fetchCryptoData("RATS");
fetchCryptoData("ACE");
fetchCryptoData("MOVR");
fetchCryptoData("NFP");
fetchCryptoData("AI");
fetchCryptoData("XAI");
fetchCryptoData("WIF");
fetchCryptoData("MANTA");
fetchCryptoData("ONDO");
fetchCryptoData("LSK");
fetchCryptoData("ALT");
fetchCryptoData("JUP");
fetchCryptoData("ZETA");
fetchCryptoData("RONIN");
fetchCryptoData("DYM");
fetchCryptoData("OM");
fetchCryptoData("PIXEL");
fetchCryptoData("STRK");
fetchCryptoData("GLM");
fetchCryptoData("PORTAL");
fetchCryptoData("TON");
fetchCryptoData("AXL");
fetchCryptoData("MYRO");
fetchCryptoData("METIS");
fetchCryptoData("AEVO");
fetchCryptoData("VANRY");
fetchCryptoData("BOME");
fetchCryptoData("ETHFI");
fetchCryptoData("ENA");
fetchCryptoData("W");
fetchCryptoData("TNSR");
fetchCryptoData("SAGA");
fetchCryptoData("TAO");
fetchCryptoData("OMNI");
fetchCryptoData("REZ");
fetchCryptoData("BB");
fetchCryptoData("NOT");
fetchCryptoData("TURBO");
fetchCryptoData("IO");
fetchCryptoData("ZK");
fetchCryptoData("MEW");
fetchCryptoData("LISTA");
fetchCryptoData("ZRO");
fetchCryptoData("RENDER");
fetchCryptoData("BANANA");
fetchCryptoData("RARE");
fetchCryptoData("G");
fetchCryptoData("SYN");
fetchCryptoData("SYS");
fetchCryptoData("VOXEL");
fetchCryptoData("BRETT");
fetchCryptoData("ALPACA");
fetchCryptoData("POPCAT");
fetchCryptoData("SUN");
fetchCryptoData("VIDT");
fetchCryptoData("NULS");
fetchCryptoData("DOGS");
fetchCryptoData("MBOX");
fetchCryptoData("CHESS");
fetchCryptoData("FLUX");
fetchCryptoData("BSW");
fetchCryptoData("QUICK");
fetchCryptoData("NEIROETH");
fetchCryptoData("RPL");
fetchCryptoData("AERGO");
fetchCryptoData("POL");
fetchCryptoData("UXLINK");
fetchCryptoData("BABYDOGE");
fetchCryptoData("NEIRO");
fetchCryptoData("KDA");
fetchCryptoData("FIDA");
fetchCryptoData("FIO");
fetchCryptoData("CATI");
fetchCryptoData("GHST");
fetchCryptoData("LOKA");
fetchCryptoData("HMSTR");
fetchCryptoData("REI");
fetchCryptoData("COS");
fetchCryptoData("EIGEN");
fetchCryptoData("DIA");
fetchCryptoData("CAT");
fetchCryptoData("SCR");
fetchCryptoData("GOAT");
fetchCryptoData("MOODENG");
fetchCryptoData("SAFE");
fetchCryptoData("SANTOS");
fetchCryptoData("TROY");
fetchCryptoData("PONKE");
fetchCryptoData("COW");
fetchCryptoData("CETUS");
fetchCryptoData("MOG");
fetchCryptoData("GRASS");
fetchCryptoData("DRIFT");
fetchCryptoData("SWELL");
fetchCryptoData("ACT");
fetchCryptoData("PNUT");
fetchCryptoData("HIPPO");
fetchCryptoData("X");
fetchCryptoData("DEGEN");
fetchCryptoData("BAN");
fetchCryptoData("AKT");
fetchCryptoData("SLERF");
fetchCryptoData("SCRT");
fetchCryptoData("CHEEMS");
fetchCryptoData("WHY");
fetchCryptoData("THE");
fetchCryptoData("MORPHO");
fetchCryptoData("CHILLGUY");
fetchCryptoData("KAIA");
fetchCryptoData("AERO");
fetchCryptoData("ACX");
fetchCryptoData("ORCA");
fetchCryptoData("MOVE");
fetchCryptoData("RAYSOL");
fetchCryptoData("KOMA");
fetchCryptoData("VIRTUAL");
fetchCryptoData("SPX");
fetchCryptoData("ME");
fetchCryptoData("AVA");
fetchCryptoData("DEGO");
fetchCryptoData("VELODROME");
fetchCryptoData("MOCA");
fetchCryptoData("VANA");
fetchCryptoData("PENGU");
fetchCryptoData("LUMIA");
fetchCryptoData("USUAL");
fetchCryptoData("AIXBT");
fetchCryptoData("FARTCOIN");
fetchCryptoData("KMNO");
fetchCryptoData("CGPT");
fetchCryptoData("HIVE");
fetchCryptoData("DEXE");
fetchCryptoData("PHA");
fetchCryptoData("DF");
fetchCryptoData("GRIFFAIN");
fetchCryptoData("AI16Z");
fetchCryptoData("ZEREBRO");
fetchCryptoData("BIO");
fetchCryptoData("COOKIE");
fetchCryptoData("ALCH");
fetchCryptoData("SWARMS");
fetchCryptoData("SONIC");
fetchCryptoData("D");
fetchCryptoData("PROM");
fetchCryptoData("S");
fetchCryptoData("SOLV");
fetchCryptoData("ARC");
fetchCryptoData("AVAAI");
fetchCryptoData("TRUMP");
fetchCryptoData("MELANIA");
fetchCryptoData("VTHO");
fetchCryptoData("ANIME");
fetchCryptoData("VINE");
fetchCryptoData("PIPPIN");
fetchCryptoData("VVV");
fetchCryptoData("BERA");
fetchCryptoData("TST");
fetchCryptoData("LAYER");
fetchCryptoData("HEI");
fetchCryptoData("B3");
fetchCryptoData("IP");
fetchCryptoData("GPS");
fetchCryptoData("SHELL");
fetchCryptoData("KAITO");
fetchCryptoData("RED");
fetchCryptoData("VIC");
fetchCryptoData("EPIC");
fetchCryptoData("BMT");
fetchCryptoData("MUBARAK");
fetchCryptoData("FORM");
fetchCryptoData("BID");
fetchCryptoData("TUT");
fetchCryptoData("BROCCOLI714");
fetchCryptoData("BROCCOLIF3B");
fetchCryptoData("SIREN");
fetchCryptoData("BANANAS31");
fetchCryptoData("BR");
fetchCryptoData("PLUME");
fetchCryptoData("NIL");
fetchCryptoData("PARTI");
fetchCryptoData("JELLYJELLY");
fetchCryptoData("MAVIA");
fetchCryptoData("PAXG");
fetchCryptoData("WAL");
fetchCryptoData("FUN");
fetchCryptoData("MLN");
fetchCryptoData("GUN");
fetchCryptoData("ATH");
fetchCryptoData("BABY");
fetchCryptoData("FORTH");
  
  function mettreAJourHeure() {
    var elementHeure = document.getElementById("heure");
    var maintenant = new Date();
  
    // Créer une copie de l'heure actuelle
    var heureActuelle = new Date(maintenant);
  
    // Ajouter 3 heures et 20 minutes à l'heure actuelle
    maintenant.setHours(maintenant.getHours() + 3);
    maintenant.setMinutes(maintenant.getMinutes() + 20);
  
    var heuresMaintenant = maintenant.getHours();
    var minutesMaintenant = maintenant.getMinutes();
    var secondesMaintenant = maintenant.getSeconds();
  
    var heuresActuelle = heureActuelle.getHours();
    var minutesActuelle = heureActuelle.getMinutes();
    var secondesActuelle = heureActuelle.getSeconds();
  
    // Ajouter un zéro devant les chiffres < 10
    heuresMaintenant =
      heuresMaintenant < 10 ? "0" + heuresMaintenant : heuresMaintenant;
    minutesMaintenant =
      minutesMaintenant < 10 ? "0" + minutesMaintenant : minutesMaintenant;
    secondesMaintenant =
      secondesMaintenant < 10 ? "0" + secondesMaintenant : secondesMaintenant;
  
    heuresActuelle = heuresActuelle < 10 ? "0" + heuresActuelle : heuresActuelle;
    minutesActuelle =
      minutesActuelle < 10 ? "0" + minutesActuelle : minutesActuelle;
    secondesActuelle =
      secondesActuelle < 10 ? "0" + secondesActuelle : secondesActuelle;
  
    // Mettre à jour le contenu de l'élément avec les deux heures
    elementHeure.innerHTML =
      heuresActuelle + ":" + minutesActuelle + ":" + secondesActuelle;
  }
  
  // Appeler la fonction pour mettre à jour l'heure
  mettreAJourHeure();
  