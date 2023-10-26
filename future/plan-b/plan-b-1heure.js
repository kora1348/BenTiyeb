// Créer un objet pour gérer l'état des notifications
const notificationState = {};

// Fonction pour mettre à jour les données d'une crypto
async function updateCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1h&limit=2`
    );
    const data = await response.json();

    // Calcul du total des taux de variation sur 4 intervalles de 15 minutes
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
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

      variationCell.textContent = `${formattedTime}: ${variationValue}%`;

      // Ne pas ajouter de classe de couleur aux cellules individuelles
      totalVariation += intervalVariation; // Ajouter la variation de l'intervalle au total
    }

    // Ajouter la cellule pour afficher le total de variation
    const totalCell = cryptoRow.insertCell(data.length + 1);
    const totalValue = totalVariation.toFixed(2);
    totalCell.textContent = `${totalValue}%`;

    if (totalVariation >= 25) {
      // Ajouter la classe CSS appropriée à totalCell
      totalCell.classList.add("positive");
    } else if (totalVariation <= -25) {
      // Ajouter la classe CSS appropriée à totalCell
      totalCell.classList.add("negative");
    }

    if (totalVariation >= 25) {
      // Ajouter le nom de la crypto en dehors du tableau
      const cryptoNameDiv = document.getElementById("cryptoNames");
      const cryptoName = document.createElement("p");
      cryptoName.textContent = `${symbol} : ${totalValue}%`;
      cryptoNameDiv.appendChild(cryptoName);
    
      // Ajouter la classe CSS appropriée
      cryptoName.classList.add("positive");
    } else if (totalVariation <= -25) {
      // Ajouter le nom de la crypto en dehors du tableau
      const cryptoNameDiv = document.getElementById("cryptoNames");
      const cryptoName = document.createElement("p");
      cryptoName.textContent = `${symbol} : ${totalValue}%`;
      cryptoNameDiv.appendChild(cryptoName);
    
      // Ajouter la classe CSS appropriée
      cryptoName.classList.add("negative");
    }

    if (totalVariation >= 25 ) {
      checkAndNotify(symbol, totalVariation);
    } else if (totalVariation <= -25) {
      checkAndNotify(symbol, totalVariation);
    }
    

  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${symbol}:`,
      error
    );
  }
}

function checkAndNotify(symbol, totalVariation) {
  if (totalVariation >= 25) {
    // Vérifier si une notification a déjà été affichée pour cette condition
    if (!notificationState[symbol]) {
      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
      createNotification(symbol, `1 heure: (Future)\nLa variation est supérieure ou égale à 25% (On Short) (${formattedTime})`);
      notificationState[symbol] = Date.now(); // Enregistrez le moment où la notification a été affichée
    }
  } else if (totalVariation <= -25) {
    // Vérifier si une notification a déjà été affichée pour cette condition
    if (!notificationState[symbol]) {
      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
      createNotification(symbol, `1 heure: (Future)\nLa variation est inférieure ou égale à -25% (On Long) (${formattedTime})`);
      notificationState[symbol] = Date.now(); // Enregistrez le moment où la notification a été affichée
    }
  } else {
    // Si la condition n'est plus vraie, réinitialisez l'état de notification
    notificationState[symbol] = null;
  }
}


// Fonction pour créer une notification de navigateur
function createNotification(cryptoName, message) {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        try {
          const notification = new Notification(cryptoName, { body: message });
          // Détruire la notification après 1 minute
          setTimeout(() => {
            notification.close();
          }, 30000);
        } catch (error) {
          console.error("Erreur lors de la création de la notification:", error);
        }
      } else {
        console.error("Permission de notification non accordée");
      }
    }).catch(error => {
      console.error("Erreur lors de la demande de permission de notification:", error);
    });
  }
}

async function refreshData(symbol) {
  while (true) {
    await updateCryptoData(symbol);
    await new Promise(resolve => setTimeout(resolve, 30000));
  }
}

// Démarrez le rafraîchissement et la notification lorsque la permission est accordée
if ("Notification" in window) {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
       refreshData("1INCH");
      refreshData("AAVE");
      refreshData("ACH");
      refreshData("ADA");
      refreshData("AGIX");
      refreshData("AGLD");
      refreshData("ALGO");
      refreshData("ALICE");
      refreshData("ALPHA");
      refreshData("ALPACA");
      refreshData("AMB");
      refreshData("ANKR");
      refreshData("ANT");
      refreshData("APE");
      refreshData("API3");
      refreshData("APT");
      refreshData("ARB");
      refreshData("ARKM");
      refreshData("ARPA");
      refreshData("AR");
      refreshData("ASTR");
      refreshData("ATA");
      refreshData("ATOM");
      refreshData("AUDIO");
      refreshData("AVAX");
      refreshData("AXS");
      refreshData("BAKE");
      refreshData("BAL");
      refreshData("BAND");
      refreshData("BAT");
      refreshData("BCH");
      refreshData("BEL");
      refreshData("BLZ");
      refreshData("BNB");
      refreshData("BNT");
      refreshData("BNX");
      refreshData("BTC");
      refreshData("C98");
      refreshData("CELO");
      refreshData("CELR");
      refreshData("CFX");
      refreshData("CHR");
      refreshData("CHZ");
      refreshData("CKB");
      refreshData("COMBO");
      refreshData("COMP");
      refreshData("COTI");
      refreshData("CRV");
      refreshData("CTK");
      refreshData("CTSI");
      refreshData("CVX");
      refreshData("CYBER");
      refreshData("DAR");
      refreshData("DASH");
      refreshData("DENT");
      refreshData("DGB");
      refreshData("DOGE");
      refreshData("DOT");
      refreshData("DUSK");
      refreshData("DYDX");
      refreshData("EDU");
      refreshData("EGLD");
      refreshData("ENJ");
      refreshData("ENS");
      refreshData("EOS");
      refreshData("ETC");
      refreshData("ETH");
      refreshData("FET");
      refreshData("FLM");
      refreshData("FLOKI");
      refreshData("FLOW");
      refreshData("FTM");
      refreshData("FXS");
      refreshData("GALA");
      refreshData("GAL");
      refreshData("GMT");
      refreshData("GMX");
      refreshData("GRT");
      refreshData("GTC");
      refreshData("HBAR");
      refreshData("HFT");
      refreshData("HIFI");
      refreshData("HIGH");
      refreshData("HOT");
      refreshData("ICP");
      refreshData("ICX");
      refreshData("IDEX");
      refreshData("ID");
      refreshData("IMX");
      refreshData("INJ");
      refreshData("IOST");
      refreshData("IOTA");
      refreshData("IOTX");
      refreshData("JASMY");
      refreshData("JOE");
      refreshData("KAVA");
      refreshData("KEY");
      refreshData("KLAY");
      refreshData("KNC");
      refreshData("KSM");
      refreshData("LDO");
      refreshData("LEVER");
      refreshData("LINA");
      refreshData("LINK");
      refreshData("LIT");
      refreshData("LPT");
      refreshData("LQTY");
      refreshData("LRC");
      refreshData("LTC");
      refreshData("LUNA");
      refreshData("LUNC");
      refreshData("MAGIC");
      refreshData("MANA");
      refreshData("MASK");
      refreshData("MATIC");
      refreshData("MAV");
      refreshData("MDT");
      refreshData("MINA");
      refreshData("MKR");
      refreshData("MTL");
      refreshData("NEAR");
      refreshData("NEO");
      refreshData("NKN");
      refreshData("NMR");
      refreshData("OCEAN");
      refreshData("OGN");
      refreshData("OMG");
      refreshData("OM");
      refreshData("ONE");
      refreshData("ONT");
      refreshData("PENDLE");
      refreshData("PEPE");
      refreshData("PERP");
      refreshData("PHB");
      refreshData("QNT");
      refreshData("QTUM");
      refreshData("RAD");
      refreshData("REEF");
      refreshData("REN");
      refreshData("RLC");
      refreshData("RNDR");
      refreshData("ROSE");
      refreshData("RSR");
      refreshData("RUNE");
      refreshData("RVN");
      refreshData("SAND");
      refreshData("SEI");
      refreshData("SFP");
      refreshData("SHIB");
      refreshData("SKL");
      refreshData("SNX");
      refreshData("SNT");
      refreshData("SOL");
      refreshData("SPELL");
      refreshData("SSV");
      refreshData("STORJ");
      refreshData("STX");
      refreshData("SUI");
      refreshData("SUSHI");
      refreshData("SXP");
      refreshData("THETA");
      refreshData("TLM");
      refreshData("TOMO");
      refreshData("TRB");
      refreshData("TRU");
      refreshData("TRX");
      refreshData("T");
      refreshData("UMA");
      refreshData("UNFI");
      refreshData("UNI");
      refreshData("USDC");
      refreshData("VET");
      refreshData("WAVES");
      refreshData("WLD");
      refreshData("WOO");
      refreshData("XEC");
      refreshData("XEM");
      refreshData("XLM");
      refreshData("XMR");
      refreshData("XRP");
      refreshData("XTZ");
      refreshData("XVG");
      refreshData("XVS");
      refreshData("YFI");
      refreshData("YGG");
      refreshData("ZEC");
      refreshData("ZEN");
      refreshData("ZIL");
      refreshData("ZRX");
    
      // ... (ajoutez d'autres crypto-monnaies à surveiller ici)
    }
  }).catch(error => {
    console.error("Erreur lors de la demande de permission de notification:", error);
  });
}

// Fonction pour rafraîchir la page toutes les 20 secondes
function refreshPage() {
  location.reload();
}

// Appeler la fonction refreshPage() toutes les 20 secondes
setInterval(refreshPage, 30000); // 20 000 millisecondes = 20 secondes
