async function fetchCryptoData(symbol) {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=30m&limit=12`
      );
      const data = await response.json();
  
      // Calcul du total des taux de variation sur 4 intervalles de 30 minutes
      let totalVariation = 0;
  
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
  
        variationCell.textContent = `${formattedTime}: ${variationValue}%`;
  
        // Ne pas ajouter de classe de couleur aux cellules individuelles
        totalVariation += intervalVariation; // Ajouter la variation de l'intervalle au total
      }
  
      // Ajouter la cellule pour afficher le total de variation
      const totalCell = cryptoRow.insertCell(data.length + 1);
      const totalValue = totalVariation.toFixed(2);
      totalCell.textContent = `${totalValue}%`;
  
      if (totalVariation >= 40) {
        totalCell.classList.add("positive");
      } else if (totalVariation <= -40) {
        totalCell.classList.add("negative");
      }
  
      if (totalVariation <= -40) {
        // Ajouter le nom de la crypto en dehors du tableau
        const cryptoNameDiv = document.getElementById("cryptoNames");
        const cryptoName = document.createElement("p");
        cryptoName.textContent = `${symbol} : ${totalValue}%`;
        cryptoNameDiv.appendChild(cryptoName);
  
        // Ajouter la classe CSS appropriée
        if (totalVariation >= 40) {
          cryptoName.classList.add("positive");
        } else if (totalVariation <= -40) {
          cryptoName.classList.add("negative");
        }
  
        // Ajouter la classe CSS appropriée
        if (totalVariation >= 40) {
          cryptoName.classList.add("positive");
        } else if (totalVariation <= -40) {
          cryptoName.classList.add("negative");
        }
      }
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des données pour ${symbol}:`,
        error
      );
    }
  }
  
  // Appel de la fonction pour obtenir les taux de variation des cryptos
  fetchCryptoData("ACA");
  fetchCryptoData("ACM");
  fetchCryptoData("ADX");
  fetchCryptoData("AERGO");
  fetchCryptoData("AKRO");
  fetchCryptoData("ALCX");
  fetchCryptoData("ALPACA");
  fetchCryptoData("ALPINE");
  fetchCryptoData("AMB");
  fetchCryptoData("AMP");
  fetchCryptoData("ARDR");
  fetchCryptoData("ASR");
  fetchCryptoData("AST");
  fetchCryptoData("ATM");
  fetchCryptoData("AUCTION");
  fetchCryptoData("AVA");
  fetchCryptoData("BADGER");
  fetchCryptoData("BAR");
  fetchCryptoData("BETA");
  fetchCryptoData("BICO");
  fetchCryptoData("BIFI");
  fetchCryptoData("BOND");
  fetchCryptoData("BSW");
  fetchCryptoData("BTS");
  fetchCryptoData("BTTC");
  fetchCryptoData("BURGER");
  fetchCryptoData("BUSD");
  fetchCryptoData("CAKE");
  fetchCryptoData("CHESS");
  fetchCryptoData("CITY");
  fetchCryptoData("CLV");
  fetchCryptoData("COS");
  fetchCryptoData("CTXC");
  fetchCryptoData("CVC");
  fetchCryptoData("CVP");
  fetchCryptoData("DATA");
  fetchCryptoData("DCR");
  fetchCryptoData("DEGO");
  fetchCryptoData("DEXE");
  fetchCryptoData("DF");
  fetchCryptoData("DIA");
  fetchCryptoData("DOCK");
  fetchCryptoData("DODO");
  fetchCryptoData("DREP");
  fetchCryptoData("ELF");
  fetchCryptoData("EPX");
  fetchCryptoData("ERN");
  fetchCryptoData("EUR");
  fetchCryptoData("FARM");
  fetchCryptoData("FDUSD");
  fetchCryptoData("FIDA");
  fetchCryptoData("FIL");
  fetchCryptoData("FIO");
  fetchCryptoData("FIRO");
  fetchCryptoData("FIS");
  fetchCryptoData("FLUX");
  fetchCryptoData("FORTH");
  fetchCryptoData("FOR");
  fetchCryptoData("FRONT");
  fetchCryptoData("FUN");
  fetchCryptoData("GAS");
  fetchCryptoData("GBP");
  fetchCryptoData("GHST");
  fetchCryptoData("GLMR");
  fetchCryptoData("GLM");
  fetchCryptoData("GNO");
  fetchCryptoData("GNS");
  fetchCryptoData("HARD");
  fetchCryptoData("HFT");
  fetchCryptoData("HIFI");
  fetchCryptoData("ILV");
  fetchCryptoData("IRIS");
  fetchCryptoData("JST");
  fetchCryptoData("JUV");
  fetchCryptoData("KDA");
  fetchCryptoData("KMD");
  fetchCryptoData("KP3R");
  fetchCryptoData("LAZIO");
  fetchCryptoData("LOKA");
  fetchCryptoData("LOOM");
  fetchCryptoData("LSK");
  fetchCryptoData("LTO");
  fetchCryptoData("MBL");
  fetchCryptoData("MBOX");
  fetchCryptoData("MC");
  fetchCryptoData("MDX");
  fetchCryptoData("MLN");
  fetchCryptoData("MOB");
  fetchCryptoData("MOVR");
  fetchCryptoData("MULTI");
  fetchCryptoData("NEXO");
  fetchCryptoData("NULS");
  fetchCryptoData("OAX");
  fetchCryptoData("OG");
  fetchCryptoData("ONG");
  fetchCryptoData("ONT");
  fetchCryptoData("OOKI");
  fetchCryptoData("OP");
  fetchCryptoData("ORN");
  fetchCryptoData("OSMO");
  fetchCryptoData("OXT");
  fetchCryptoData("PAXG");
  fetchCryptoData("PEOPLE");
  fetchCryptoData("PERL");
  fetchCryptoData("PHA");
  fetchCryptoData("PLA");
  fetchCryptoData("PNT");
  fetchCryptoData("POLS");
  fetchCryptoData("POLYX");
  fetchCryptoData("POND");
  fetchCryptoData("PORTO");
  fetchCryptoData("POWR");
  fetchCryptoData("PROM");
  fetchCryptoData("PROS");
  fetchCryptoData("PSG");
  fetchCryptoData("PUNDIX");
  fetchCryptoData("PYR");
  fetchCryptoData("QI");
  fetchCryptoData("QKC");
  fetchCryptoData("QUICK");
  fetchCryptoData("RARE");
  fetchCryptoData("RAY");
  fetchCryptoData("RDNT");
  fetchCryptoData("REI");
  fetchCryptoData("REQ");
  fetchCryptoData("RIF");
  fetchCryptoData("RPL");
  fetchCryptoData("SANTOS");
  fetchCryptoData("SCRT");
  fetchCryptoData("SC");
  fetchCryptoData("SLP");
  fetchCryptoData("SNT");
  fetchCryptoData("STEEM");
  fetchCryptoData("STG");
  fetchCryptoData("STMX");
  fetchCryptoData("STPT");
  fetchCryptoData("STRAX");
  fetchCryptoData("SUN");
  fetchCryptoData("SUPER");
  fetchCryptoData("SYN");
  fetchCryptoData("SYS");
  fetchCryptoData("TFUEL");
  fetchCryptoData("TKO");
  fetchCryptoData("TROY");
  fetchCryptoData("TUSD");
  fetchCryptoData("TVK");
  fetchCryptoData("TWT");
  fetchCryptoData("UFT");
  fetchCryptoData("USDP");
  fetchCryptoData("USTC");
  fetchCryptoData("UTK");
  fetchCryptoData("VGX");
  fetchCryptoData("VIB");
  fetchCryptoData("VIDT");
  fetchCryptoData("VITE");
  fetchCryptoData("VOXEL");
  fetchCryptoData("VTHO");
  fetchCryptoData("WAN");
  fetchCryptoData("WAXP");
  fetchCryptoData("WBETH");
  fetchCryptoData("WBTC");
  fetchCryptoData("WING");
  fetchCryptoData("WIN");
  fetchCryptoData("WNXM");
  fetchCryptoData("WRX");
  fetchCryptoData("WTC");
  fetchCryptoData("XNO");
  