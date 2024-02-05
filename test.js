async function fetchNewCryptoListings() {
  try {
      const response = await fetch(
          'https://www.binance.com/en-NZ/support/announcement/new-cryptocurrency-listing?c=48&navId=48'
      );
      const html = await response.text();

      // Use DOMParser to parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Extract relevant information from the page
      const listingItems = doc.querySelectorAll('.css-1ov9pcn');
      const cryptoListDiv = document.getElementById('cryptoList');

      listingItems.forEach(item => {
          const cryptoName = item.querySelector('.css-1rg1po1').textContent.trim();
          const listItem = document.createElement('li');
          listItem.textContent = cryptoName;
          cryptoListDiv.appendChild(listItem);
      });

  } catch (error) {
      console.error('Erreur lors de la récupération des nouvelles crypto-monnaies:', error);
  }
}

// Fetch and display new crypto listings
fetchNewCryptoListings();