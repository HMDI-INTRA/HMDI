<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../connection/conexao-mysql.php';

try {
    $id = isset($_GET['id']) ? $_GET['id'] : '';

    $query = "SELECT *
    FROM cadastros.analise_dash_indicadores
    WHERE nm_indicador LIKE :indicador
    ORDER BY DATE_FORMAT(STR_TO_DATE(CONCAT('01/', dt_indicador), '%d/%m/%Y'), '%Y/%m') DESC;";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(':indicador', $id, PDO::PARAM_STR);

    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $json = json_encode($result, JSON_UNESCAPED_UNICODE); 
    header('Content-Type: application/json; charset=utf-8'); 
    echo $json;
} catch (PDOException $e) {
    die("Erro na consulta ao banco de dados: " . $e->getMessage());
}
?>
