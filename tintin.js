 // Mettre à jour l'heure actuelle
        function updateCurrentDatetime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit'
            };
            document.getElementById('currentDatetime').innerHTML = `
                <strong>Date/heure actuelle :</strong> ${now.toLocaleDateString('fr-FR', options)}
                <br>
                <strong>Début de la bougie 1h :</strong> ${getCurrentCandleStartTime()}
            `;
        }
        
        // Obtenir l'heure de début de la bougie 1h actuelle
        function getCurrentCandleStartTime() {
            const now = new Date();
            const startTime = new Date(now);
            startTime.setMinutes(0, 0, 0);
            return startTime.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
        }
        
        // Mettre à jour toutes les secondes
        updateCurrentDatetime();
        setInterval(updateCurrentDatetime, 1000);

        // Fonction pour obtenir les données de la bougie 1h
        async function get1hCandleData(symbol) {
            const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=2`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.length < 2) return null;
                
                // Dernière bougie complète (index 0 est la plus ancienne)
                const prevCandle = data[0];
                const currentCandle = data[1];
                
                const openPrice = parseFloat(currentCandle[1]);
                const closePrice = parseFloat(currentCandle[4]);
                const prevClosePrice = parseFloat(prevCandle[4]);
                
                const currentChange = ((closePrice - openPrice) / openPrice) * 100;
                const hourChange = ((closePrice - prevClosePrice) / prevClosePrice) * 100;
                
                return {
                    currentPrice: closePrice,
                    currentChange: currentChange,
                    hourChange: hourChange,
                    openTime: new Date(currentCandle[0]),
                    closeTime: new Date(currentCandle[6])
                };
            } catch (error) {
                console.error(`Erreur pour ${symbol}:`, error);
                return null;
            }
        }

        // Fonction pour charger toutes les paires crypto
        async function fetchAllCryptoSymbols() {
            const url = 'https://api.binance.com/api/v3/exchangeInfo';
            try {
                const response = await fetch(url);
                const data = await response.json();
                const activeSymbols = data.symbols.filter(s => s.status === 'TRADING');
                
                // Filtre pour les devises de cotation courantes
                const filtered = activeSymbols.filter(s =>
                    ['USDT', 'USDC', 'BUSD', 'TUSD', 'BTC', 'ETH', 'FDUSD', 'DAI', 'EUR', 'TRY', 'BNB', 'USD', 'GBP'].includes(s.quoteAsset)
                );
                
                return filtered.map(s => ({
                    base: s.baseAsset,
                    quote: s.quoteAsset,
                    symbol: s.symbol
                }));
            } catch (error) {
                console.error("Erreur lors de la récupération des symboles crypto:", error);
                return [];
            }
        }

        // Fonction pour afficher les paires avec leur variation
        async function displayPairsWithChange(crypto, pairs, containerId) {
            const container = document.getElementById(containerId);
            container.innerHTML = `<h2>Paires ${crypto}</h2>`;
            
            // Grouper par quoteAsset
            const grouped = {};
            pairs.forEach(pair => {
                if (!grouped[pair.quote]) {
                    grouped[pair.quote] = [];
                }
                grouped[pair.quote].push(pair);
            });
            
            let allChanges = [];
            
            // Pour chaque groupe, récupérer les données de variation
            for (const [quote, pairList] of Object.entries(grouped)) {
                const groupDiv = document.createElement('div');
                groupDiv.className = 'pair-group';
                groupDiv.innerHTML = `<h3>${crypto}/${quote} (${pairList.length})</h3>`;
                
                // Récupérer les données pour toutes les paires de ce groupe
                const pairData = await Promise.all(
                    pairList.map(async pair => {
                        const candleData = await get1hCandleData(pair.symbol);
                        return { ...pair, candleData };
                    })
                );
                
                // Filtrer les paires avec données valides
                const validPairData = pairData.filter(data => data.candleData);
                
                // Afficher chaque paire avec ses données
                validPairData.forEach(data => {
                    const pairDiv = document.createElement('div');
                    pairDiv.className = 'pair-item';
                    
                    const symbolSpan = document.createElement('span');
                    symbolSpan.className = 'symbol';
                    symbolSpan.textContent = data.symbol;
                    
                    const priceInfoDiv = document.createElement('div');
                    priceInfoDiv.className = 'price-info';
                    
                    const currentPriceSpan = document.createElement('div');
                    currentPriceSpan.className = 'current-price';
                    currentPriceSpan.textContent = data.candleData.currentPrice.toFixed(8);
                    
                    const priceChangeSpan = document.createElement('div');
                    const changePercent = data.candleData.currentChange;
                    const changeClass = changePercent > 0 ? 'positive' : 
                                      changePercent < 0 ? 'negative' : 'neutral';
                    
                    priceChangeSpan.className = `price-change ${changeClass}`;
                    priceChangeSpan.innerHTML = `
                        ${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}% (1h)
                    `;
                    
                    priceInfoDiv.appendChild(currentPriceSpan);
                    priceInfoDiv.appendChild(priceChangeSpan);
                    
                    pairDiv.appendChild(symbolSpan);
                    pairDiv.appendChild(priceInfoDiv);
                    groupDiv.appendChild(pairDiv);
                    
                    // Ajouter au tableau global des changements
                    allChanges.push(changePercent);
                });
                
                container.appendChild(groupDiv);
            }
            
            // Afficher la moyenne si on a des données valides
            if (allChanges.length > 0) {
                const total = allChanges.reduce((sum, change) => sum + change, 0);
                const average = total / allChanges.length;
                const averageClass = average > 0 ? 'positive' : 
                                   average < 0 ? 'negative' : 'neutral';
                
                const averageCard = document.createElement('div');
                averageCard.className = 'average-card';
                averageCard.innerHTML = `
                    <div class="average-title">Moyenne des variations ${crypto}:</div>
                    <div class="average-value ${averageClass}">
                        ${average > 0 ? '+' : ''}${average.toFixed(2)}%
                    </div>
                    <div>Calculée sur ${allChanges.length} paires</div>
                `;
                
                container.appendChild(averageCard);
            }
            
            // Ajouter le nombre total
            const totalDiv = document.createElement('div');
            totalDiv.className = 'section-footer';
            totalDiv.textContent = `Total: ${pairs.length} paires`;
            container.appendChild(totalDiv);
        }

        // Fonction principale
        async function loadAllPairs() {
            try {
                document.getElementById('btcPairs').innerHTML = '<h2>Paires BTC</h2><div class="loading">Chargement...</div>';
                document.getElementById('ethPairs').innerHTML = '<h2>Paires ETH</h2><div class="loading">Chargement...</div>';
                document.getElementById('ltcPairs').innerHTML = '<h2>Paires LTC</h2><div class="loading">Chargement...</div>';
                document.getElementById('bnbPairs').innerHTML = '<h2>Paires BNB</h2><div class="loading">Chargement...</div>';
                document.getElementById('neoPairs').innerHTML = '<h2>Paires NEO</h2><div class="loading">Chargement...</div>';
                document.getElementById('qtumPairs').innerHTML = '<h2>Paires QTUM</h2><div class="loading">Chargement...</div>';
                document.getElementById('gasPairs').innerHTML = '<h2>Paires GAS</h2><div class="loading">Chargement...</div>';

                const allPairs = await fetchAllCryptoSymbols();
                
                // Filtrer les paires BTC (où BTC est la base)
                const btcPairs = allPairs.filter(pair => pair.base === 'BTC');
                await displayPairsWithChange('BTC', btcPairs, 'btcPairs');
                
                // Filtrer les paires ETH (où ETH est la base)
                const ethPairs = allPairs.filter(pair => pair.base === 'ETH');
                await displayPairsWithChange('ETH', ethPairs, 'ethPairs');

                 const ltcPairs = allPairs.filter(pair => pair.base === 'LTC');
                await displayPairsWithChange('LTC', ltcPairs, 'ltcPairs');

                 const bnbPairs = allPairs.filter(pair => pair.base === 'BNB');
                await displayPairsWithChange('BNB', bnbPairs, 'bnbPairs');

                   const neoPairs = allPairs.filter(pair => pair.base === 'NEO');
                await displayPairsWithChange('NEO', neoPairs, 'neoPairs');

                    const qtumPairs = allPairs.filter(pair => pair.base === 'QTUM');
                await displayPairsWithChange('QTUM', qtumPairs, 'qtumPairs');

                    const gasPairs = allPairs.filter(pair => pair.base === 'GAS');
                await displayPairsWithChange('GAS', gasPairs, 'gasPairs');

                
            } catch (error) {
                document.getElementById('btcPairs').innerHTML = `<h2>Paires BTC</h2><div class="error">Erreur: ${error.message}</div>`;
                document.getElementById('ethPairs').innerHTML = `<h2>Paires ETH</h2><div class="error">Erreur: ${error.message}</div>`;
                document.getElementById('ltcPairs').innerHTML = `<h2>Paires LTC</h2><div class="error">Erreur: ${error.message}</div>`;
                document.getElementById('bnbPairs').innerHTML = `<h2>Paires BNB</h2><div class="error">Erreur: ${error.message}</div>`;
                document.getElementById('neoPairs').innerHTML = `<h2>Paires NEO</h2><div class="error">Erreur: ${error.message}</div>`;
                document.getElementById('qtumPairs').innerHTML = `<h2>Paires QTUM</h2><div class="error">Erreur: ${error.message}</div>`;
                document.getElementById('gasPairs').innerHTML = `<h2>Paires GAS</h2><div class="error">Erreur: ${error.message}</div>`;
            }
        }

        // Charger les données au démarrage
        window.onload = loadAllPairs;