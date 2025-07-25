<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$symbol = $_GET['symbol'] ?? 'IDEX_USDT';
$interval = $_GET['interval'] ?? '15m';
$limit = $_GET['limit'] ?? 10;

$url = "https://api.mexc.com/api/v3/klines?symbol=$symbol&interval=$interval&limit=$limit";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);

if(curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["error" => curl_error($ch)]);
} else {
    // Ajoutez cette ligne pour décoder puis ré-encoder le JSON
    $data = json_decode($response, true);
    if(json_last_error() === JSON_ERROR_NONE) {
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "Invalid JSON from MEXC API"]);
    }
}
curl_close($ch);
?>