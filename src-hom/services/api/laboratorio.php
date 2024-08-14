<?php
//Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a conexão PDO existente
include_once '../connection/conexao-mysql.php'; // Certifique-se de que o arquivo esteja incluído corretamente

try {
    $query = "SELECT * FROM cadastros.laboratorio_adm;";
    
    // Prepara a consulta
    $stmt = $conn->prepare($query);
    
    // Executa a consulta
    $stmt->execute();
    
    // Obtém todos os resultados como um array associativo
    $equipe_ti = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Converte o array em formato JSON
    $json = json_encode($equipe_ti, JSON_UNESCAPED_UNICODE); // Use JSON_UNESCAPED_UNICODE
    
    // Define o cabeçalho HTTP para indicar que estamos retornando JSON e UTF-8
    header('Content-Type: application/json; charset=utf-8'); // Defina o charset como UTF-8
    
    // Retorna o JSON como resposta
    echo $json;
} catch (PDOException $e) {
    // Trata qualquer exceção PDO que possa ocorrer
    die("Erro na consulta ao banco de dados: " . $e->getMessage());
}
?>