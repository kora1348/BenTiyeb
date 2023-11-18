async function fetchCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=5m&limit=5`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${symbol}`);
    }

    const data = await response.json();

    const cryptoRow = document.getElementById(symbol);
    const [firstInterval, secondInterval, thirdInterval, fourthInterval, fifthInterval] = [
      parseFloat(data[0][4]) - parseFloat(data[0][1]),
      parseFloat(data[1][4]) - parseFloat(data[1][1]),
      parseFloat(data[2][4]) - parseFloat(data[2][1]),
      parseFloat(data[3][4]) - parseFloat(data[3][1]),
      parseFloat(data[4][4]) - parseFloat(data[4][1]),
    ];

    let countPositiveIntervals = 0;
    let countNegativeIntervals = 0;
    let totalIntervals = 0; // New variable for total intervals

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

      // Update total intervals
      totalIntervals += intervalVariation;

      if (intervalVariation > 0) {
        variationCell.classList.add('positive');
        countPositiveIntervals++;

        // Mettre à jour les deux meilleures variations d'intervalle
        if (intervalVariation > topIntervals.first.value) {
          topIntervals.second = { ...topIntervals.first };
          topIntervals.first = { symbol: symbol, value: intervalVariation, time: formattedTime };
        } else if (intervalVariation > topIntervals.second.value) {
          topIntervals.second = { symbol: symbol, value: intervalVariation, time: formattedTime };
        }
      } else if (intervalVariation < 0) {
        variationCell.classList.add('negative');
        countNegativeIntervals++;
      }
    }

    // Update "Positif," "Négatif," and "Total interval" fields
    const positiveCell = cryptoRow.insertCell(-1);
    const negativeCell = cryptoRow.insertCell(-1);
    const totalIntervalCell = cryptoRow.insertCell(-1);

    positiveCell.textContent = countPositiveIntervals;
    negativeCell.textContent = countNegativeIntervals;
    totalIntervalCell.textContent = totalIntervals.toFixed(2); // Display total intervals with 2 decimal places

    return { countPositiveIntervals, countNegativeIntervals, totalIntervals, topIntervals };

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
  totalMessageDiv.innerHTML += `<br><br>La meilleur variations d'intervalle est : <br>
    1. ${topIntervals.second.symbol} ${topIntervals.second.value.toFixed(2)}% à ${topIntervals.second.time}`;

    // 1. ${topIntervals.first.symbol} ${topIntervals.first.value.toFixed(2)}% à ${topIntervals.first.time} <br> 

  // Changer la couleur en vert si le total est égal ou supérieur à 2
  if (total <= 10) {
    totalMessageDiv.style.color = 'green';
    totalMessageDiv.style.fontWeight = '700';
  }
})
.catch((error) => {
  console.error("Error during Promise.all:", error);
});
