<?php
// proxy-mexc.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Paramètres attendus : symbol, interval, limit
$symbol = isset($_GET['symbol']) ? $_GET['symbol'] : '';
$interval = isset($_GET['interval']) ? $_GET['interval'] : '';
$limit = isset($_GET['limit']) ? $_GET['limit'] : '';

if (empty($symbol) || empty($interval) || empty($limit)) {
    http_response_code(400);
    echo json_encode(["error" => "Paramètres manquants"]);
    exit;
}

// Construction de l'URL cible vers MEXC
$apiUrl = "https://api.mexc.com/api/v3/klines?symbol=$symbol&interval=$interval&limit=$limit";

// Appel distant
$response = file_get_contents($apiUrl);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la requête vers MEXC"]);
    exit;
}

// Renvoie les données brutes
echo $response;
