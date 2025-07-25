<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$symbol = str_replace('_', '', $_GET['symbol'] ?? 'IDEXUSDT'); // Format attendu par MEXC
$interval = $_GET['interval'] ?? '15m';
$limit = $_GET['limit'] ?? 10;

// Endpoint FUTURES corrigé
$url = "https://contract.mexc.com/api/v1/contract/kline/$symbol?interval=$interval&limit=$limit";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);

if(curl_errno($ch)) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => curl_error($ch),
        "url_used" => $url // Debug
    ]);
} else {
    $data = json_decode($response, true);
    
    // Adapte le format de réponse MEXC Futures
    if(isset($data['data'])) {
        $formatted = array_map(function($item) {
            return [
                $item['time'] / 1000, // Convertit en ms
                $item['openPrice'],
                $item['highPrice'],
                $item['lowPrice'],
                $item['closePrice'],
                $item['vol']
            ];
        }, $data['data']);
        
        echo json_encode($formatted);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Format de données inattendu",
            "original_data" => $data // Pour debug
        ]);
    }
}
curl_close($ch);
?>