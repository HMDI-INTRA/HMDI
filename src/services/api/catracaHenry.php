<?php
//Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../connection/conexao-mysql.php';

try {

    $query = "SELECT * FROM cadastros.HENRY;";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($dados, JSON_UNESCAPED_UNICODE); 
    header('Content-Type: application/json; charset=utf-8');
    echo $json;
} catch (PDOException $e) {
    die("Erro na consulta ao banco de dados: " . $e->getMessage());
}
?>