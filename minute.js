// Liste des cryptomonnaies (paires USDT disponibles sur Binance)
    const cryptos = [
        "ADA",
        "ARB",
        "AVAX",
        "BCH",
        "BNB",
        "BOME",
        "BONK",
        "BTC",
        "CRV",
        "DOGE",
        "ENA",
        "ETH",
        "ETHFI",
        "FIL",
        "HBAR",
        "IP",
        "KAITO",
        "LINK",
        "LTC",
        "NEAR",
        "NEO",
        "ORDI",
        "PEPE",
        "PNUT",
        "SHIB",
        "SOL",
        "SUI",
        "TIA",
        "TRUMP",
        "WIF",
        "WLD",
        "XRP",
    ];

    // Configuration de base
    let interval = "1m"; // Par défaut bougie de 1 minute
    const limit = 100;     // Nombre de bougies à récupérer
    let cryptosWithData = []; // Stockage des données
    let selectedDateTime = null; // Date et heure sélectionnées

    // Remplir la liste des heures (00 à 23) et des minutes (00 à 59)
    function fillTimeSelectors() {
        const hourSelect = document.getElementById("selectedHour");
        const minuteSelect = document.getElementById("selectedMinute");
        
        // Remplir les heures
        hourSelect.innerHTML = "";
        for (let i = 0; i < 24; i++) {
            const hour = i.toString().padStart(2, '0');
            hourSelect.innerHTML += `<option value="${hour}">${hour}</option>`;
        }
        
        // Remplir les minutes
        minuteSelect.innerHTML = "";
        for (let i = 0; i < 60; i++) {
            const minute = i.toString().padStart(2, '0');
            minuteSelect.innerHTML += `<option value="${minute}">${minute}</option>`;
        }
    }

    // 1. Fonction principale qui lance tout
    async function main() {
        showLoading();
        
        try {
            // Met à jour la date et heure d'affichage
            updateDateTimeDisplay();
            
            // Récupère les données pour toutes les cryptos
            const results = await Promise.all(
                cryptos.map(symbol => fetchCryptoData(symbol))
            );
            
            // Filtre et calcule les indicateurs
            cryptosWithData = results
                .filter(r => r !== null && r.data.length >= 20)
                .map(calculateIndicators)
                .filter(c => c !== null);
            
            // Met à jour le tableau
            updateTable();
            
        } catch (error) {
            showError("Erreur : " + error.message);
        }
    }

    // 2. Affiche un message de chargement
    function showLoading() {
        const tableBody = document.getElementById("cryptoTableBody");
        if (tableBody) {
            tableBody.innerHTML = '<tr><td colspan="7" class="loading">Chargement des données...</td></tr>';
        }
    }

    // 3. Affiche les erreurs
    function showError(message) {
        const tableBody = document.getElementById("cryptoTableBody");
        if (tableBody) {
            tableBody.innerHTML = `<tr><td colspan="7" class="error">${message}</td></tr>`;
        }
        console.error(message);
    }

    // 4. Récupère les données d'une crypto
    async function fetchCryptoData(symbol) {
        try {
            // Construction de l'URL
            let url = `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`;
            
            // Ajoute la date/heure si sélectionnée
            if (selectedDateTime) {
                const endTime = selectedDateTime.getTime();
                url += `&endTime=${endTime}`;
            }
            
            // Requête à l'API Binance
            const response = await fetch(url);
            if (!response.ok) throw new Error("API non disponible");
            
            const data = await response.json();
            if (!data || data.length === 0) throw new Error("Pas de données");
            
            // Formatage des données
            return {
                symbol,
                data: data.map(c => ({
                    time: c[0],
                    open: parseFloat(c[1]),
                    high: parseFloat(c[2]),
                    low: parseFloat(c[3]),
                    close: parseFloat(c[4]),
                    volume: parseFloat(c[5])
                }))
            };
            
        } catch (error) {
            console.warn(`Problème avec ${symbol}: ${error.message}`);
            return null;
        }
    }

    // 5. Calcule tous les indicateurs
    function calculateIndicators(crypto) {
        const data = crypto.data;
        
        // Moyenne Mobile Volume (20 périodes)
        for (let i = 19; i < data.length; i++) {
            let sum = 0;
            for (let j = i - 19; j <= i; j++) sum += data[j].volume;
            data[i].volumeMA20 = sum / 20;
        }
        
        // RSI (14 périodes)
        for (let i = 14; i < data.length; i++) {
            let gains = 0, losses = 0;
            for (let j = i - 13; j <= i; j++) {
                const change = data[j].close - data[j - 1].close;
                if (change > 0) gains += change;
                else losses -= change;
            }
            const rs = gains / 14 / (losses / 14 || 1);
            data[i].rsi = 100 - 100 / (1 + rs);
        }
        
        // Dernières bougies
        const last = data[data.length - 1];
        const prev1 = data[data.length - 2];
        const prev2 = data[data.length - 3];
        
        // Support/Résistance
        crypto.supportResistance = "-";
        if (last.low > prev1.low && prev1.low < prev2.low) {
            crypto.supportResistance = "🟢 Support";
        } else if (last.high < prev1.high && prev1.high > prev2.high) {
            crypto.supportResistance = "🔴 Résistance";
        }
        
        // Divergence
        crypto.divergence = "-";
        if (prev2.rsi && prev1.rsi && last.rsi) {
            if (prev2.close > prev1.close && prev1.close > last.close && 
                prev2.rsi < prev1.rsi && prev1.rsi < last.rsi) {
                crypto.divergence = "📈 Hausse";
            }
            if (prev2.close < prev1.close && prev1.close < last.close && 
                prev2.rsi > prev1.rsi && prev1.rsi > last.rsi) {
                crypto.divergence = "📉 Baisse";
            }
        }
        
        // Signal
        crypto.signal = "HOLD";
        if (last.volume > last.volumeMA20) {
            if (last.rsi > 50 && last.close > prev1.high) {
                crypto.signal = "LONG";
            } else if (last.rsi < 50 && last.close < prev1.low) {
                crypto.signal = "SHORT";
            }
        }
        
        return crypto;
    }

    // 6. Met à jour le tableau HTML
    function updateTable(filter = "ALL") {
        const tableBody = document.getElementById("cryptoTableBody");
        if (!tableBody) return;
        
        tableBody.innerHTML = "";
        
        // Met à jour le titre selon la période
        const title = document.getElementById("mainTitle");
        if (title) {
            let periodText = "";
            if (interval === "1m") periodText = "Bougie 1m";
            else if (interval === "3m") periodText = "Bougie 3m";
            else if (interval === "15m") periodText = "Bougie 15m";
            
            title.textContent = selectedDateTime
                ? `Analyse Crypto - ${periodText} - ${selectedDateTime.toLocaleString('fr-FR')}`
                : `Analyse Crypto - ${periodText} - Maintenant`;
        }
        
        // Remplit le tableau
        cryptosWithData.forEach(crypto => {
            if (filter !== "ALL" && crypto.signal !== filter) return;
            
            const last = crypto.data[crypto.data.length - 1];
            const change = ((last.close - last.open) / last.open) * 100;
            
            const row = document.createElement("tr");
            if (crypto.signal === "LONG") row.classList.add("row-long");
            if (crypto.signal === "SHORT") row.classList.add("row-short");
            
            row.innerHTML = `
                <td>${crypto.symbol}</td>
                <td class="${change >= 0 ? "positive" : "negative"}">${change.toFixed(2)}%</td>
                <td>${last.volume.toFixed(0)} (${last.volumeMA20?.toFixed(0) || "-"})</td>
                <td>${last.rsi?.toFixed(0) || "-"}</td>
                <td class="signal ${crypto.signal.toLowerCase()}">${crypto.signal}</td>
                <td>${crypto.supportResistance}</td>
                <td>${crypto.divergence}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // 7. Charge les données pour la date/heure sélectionnée
    function loadData() {
        const timeframeSelect = document.getElementById("timeframe");
        const dateInput = document.getElementById("selectedDate");
        const hourSelect = document.getElementById("selectedHour");
        const minuteSelect = document.getElementById("selectedMinute");
        
        // Met à jour l'intervalle sélectionné
        interval = timeframeSelect.value;
        
        if (dateInput.value) {
            // Crée un objet Date avec la date, l'heure et la minute sélectionnées
            const selectedDate = new Date(dateInput.value);
            const selectedHour = parseInt(hourSelect.value);
            const selectedMinute = parseInt(minuteSelect.value);
            
            selectedDateTime = new Date(selectedDate);
            selectedDateTime.setHours(selectedHour, selectedMinute, 0, 0);
            
            main();
        } else {
            // Si aucune date n'est sélectionnée, charge les données actuelles
            resetToCurrent();
        }
    }

    // 8. Reset à la date/heure actuelle
    function resetToCurrent() {
        selectedDateTime = null;
        const dateInput = document.getElementById("selectedDate");
        const hourSelect = document.getElementById("selectedHour");
        const minuteSelect = document.getElementById("selectedMinute");
        
        if (dateInput) dateInput.value = "";
        
        const now = new Date();
        if (hourSelect) hourSelect.value = now.getHours().toString().padStart(2, '0');
        if (minuteSelect) minuteSelect.value = now.getMinutes().toString().padStart(2, '0');
        
        main();
    }

    // 9. Met à jour l'affichage de la date et heure
    function updateDateTimeDisplay() {
        const now = new Date();
        const dateTimeElement = document.getElementById("currentDateTime");
        
        if (dateTimeElement) {
            let periodText = "";
            if (interval === "1m") periodText = "Bougie 1m";
            else if (interval === "3m") periodText = "Bougie 3m";
            else if (interval === "15m") periodText = "Bougie 15m";
            
            dateTimeElement.textContent = selectedDateTime
                ? `${periodText} - Données pour : ${selectedDateTime.toLocaleString('fr-FR')}`
                : `${periodText} - Données actuelles : ${now.toLocaleString('fr-FR')}`;
        }
    }

    // Lance l'application quand la page est prête
    document.addEventListener("DOMContentLoaded", () => {
        // Remplit les listes des heures et minutes
        fillTimeSelectors();
        
        // Initialisation
        resetToCurrent();
        
        // Actualise les données toutes les 5 minutes
        setInterval(main, 300000);
    });