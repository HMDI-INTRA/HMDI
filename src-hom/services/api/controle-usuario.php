<?php
//Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../connection/conexao-mysql.php'; 
try {

    $query = "SELECT * FROM acesso.acesso_cadastro;";

    $stmt = $conn->prepare($query);

    $stmt->execute();

    $equipe_ti = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $json = json_encode($equipe_ti, JSON_UNESCAPED_UNICODE); 

    header('Content-Type: application/json; charset=utf-8'); 
    echo $json;
} catch (PDOException $e) {
    die("Erro na consulta ao banco de dados: " . $e->getMessage());
}
?>