<?php
//Autor: Josélio Dias Mendonça
// Defina os cabeçalhos CORS para permitir todas as origens (não recomendado para produção)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// URL da API que você deseja acessar
$apiUrl = "https://api.hgbrasil.com/weather?woeid=455831&key=2b5b5b1d";

// Faça a solicitação à API
$response = file_get_contents($apiUrl);

if ($response === false) {
    // Erro ao buscar os dados da API
    http_response_code(500);
    echo json_encode(["error" => "Erro ao buscar dados meteorológicos"]);
} else {
    // Envie os dados da API de volta como JSON
    echo $response;
}
?>
