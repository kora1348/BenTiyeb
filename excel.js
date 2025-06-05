  document.addEventListener('DOMContentLoaded', function() {
            const fileInput = document.getElementById('fileInput');
            const selectFilesBtn = document.getElementById('selectFilesBtn');
            const mergeBtn = document.getElementById('mergeBtn');
            const fileList = document.getElementById('fileList');
            const statusDiv = document.getElementById('status');
            
            let selectedFiles = [];
            
            // Ouvrir le sélecteur de fichiers quand on clique sur le bouton
            selectFilesBtn.addEventListener('click', function() {
                fileInput.click();
            });
            
            // Gérer la sélection de fichiers
            fileInput.addEventListener('change', function(e) {
                selectedFiles = Array.from(e.target.files);
                
                if (selectedFiles.length > 0) {
                    fileList.innerHTML = '';
                    selectedFiles.forEach(file => {
                        const fileItem = document.createElement('div');
                        fileItem.className = 'file-item';
                        fileItem.textContent = file.name;
                        fileList.appendChild(fileItem);
                    });
                    
                    mergeBtn.disabled = false;
                } else {
                    fileList.innerHTML = '<p>Aucun fichier sélectionné</p>';
                    mergeBtn.disabled = true;
                }
            });
            
            // Fusionner les fichiers
            mergeBtn.addEventListener('click', function() {
                if (selectedFiles.length === 0) {
                    showStatus('Aucun fichier à fusionner', 'error');
                    return;
                }
                
                showStatus('Traitement en cours... Veuillez patienter.', 'info');
                
                const mergedWorkbook = XLSX.utils.book_new();
                let processedFiles = 0;
                
                selectedFiles.forEach((file, index) => {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        try {
                            const data = new Uint8Array(e.target.result);
                            const workbook = XLSX.read(data, { type: 'array' });
                            
                            // Prendre le premier onglet de chaque fichier
                            const firstSheetName = workbook.SheetNames[0];
                            const worksheet = workbook.Sheets[firstSheetName];
                            
                            // Ajouter au workbook fusionné
                            // On utilise le nom du fichier (sans extension) comme nom d'onglet
                            let sheetName = file.name.replace(/\.[^/.]+$/, "");
                            // Limiter à 31 caractères (limite Excel)
                            sheetName = sheetName.substring(0, 31);
                            // S'assurer que le nom est unique
                            let uniqueSheetName = sheetName;
                            let counter = 1;
                            while (mergedWorkbook.SheetNames.includes(uniqueSheetName)) {
                                uniqueSheetName = `${sheetName}_${counter}`;
                                counter++;
                            }
                            
                            XLSX.utils.book_append_sheet(mergedWorkbook, worksheet, uniqueSheetName);
                            
                            processedFiles++;
                            
                            if (processedFiles === selectedFiles.length) {
                                // Tous les fichiers ont été traités, générer le fichier fusionné
                                const mergedFile = XLSX.write(mergedWorkbook, { bookType: 'xlsx', type: 'array' });
                                saveAs(new Blob([mergedFile], { type: 'application/octet-stream' }), 'Fichiers_Fusionnes.xlsx');
                                showStatus(`Fusion réussie ! ${processedFiles} fichiers ont été combinés.`, 'success');
                            }
                        } catch (error) {
                            console.error('Erreur lors du traitement du fichier:', file.name, error);
                            showStatus(`Erreur avec le fichier ${file.name}: ${error.message}`, 'error');
                        }
                    };
                    
                    reader.onerror = function() {
                        console.error('Erreur de lecture du fichier:', file.name);
                        showStatus(`Erreur de lecture du fichier ${file.name}`, 'error');
                    };
                    
                    reader.readAsArrayBuffer(file);
                });
            });
            
            function showStatus(message, type) {
                statusDiv.textContent = message;
                statusDiv.className = type;
            }
            
            function saveAs(blob, filename) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });