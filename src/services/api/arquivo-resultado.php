<?php
// Autor: Josélio Dias Mendonça
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../connection/conexao-postgresql.php';

try {
    $valor_pesquisa = isset($_GET['search']['value']) ? $_GET['search']['value'] : '';
    $query_registros = "SELECT DISTINCT a.numreqserv, a.*, b.*, c.*, d.*
    FROM \"PACIENTE\".result a
    LEFT JOIN \"PACIENTE\".cabserv b ON a.numreqserv = b.numreqserv
    LEFT JOIN \"PACIENTE\".cadope c ON c.codope = a.operdigit
    LEFT JOIN \"PACIENTE\".cadprest d ON c.codprest = d.codprest ";

    if (!empty($valor_pesquisa)) {
        $is_numeric_search = is_numeric($valor_pesquisa);
        $query_registros .= " WHERE " . ($is_numeric_search ? "CAST(a.numreqserv AS TEXT)" : "a.numreqserv") . " LIKE :valor_pesquisa ";
        $valor_pesquisa = $is_numeric_search ? $valor_pesquisa : "%{$valor_pesquisa}%";
    }
    $query_registros .= "ORDER BY a.numreqserv LIMIT 70";
    $result_registros = $conn->prepare($query_registros);
    if (!empty($valor_pesquisa)) {
        $result_registros->bindParam(':valor_pesquisa', $valor_pesquisa, PDO::PARAM_STR);
    }
    $result_registros->execute();
    $dados = $result_registros->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['data' => $dados]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database Error: " . $e->getMessage()]);
}
?>
