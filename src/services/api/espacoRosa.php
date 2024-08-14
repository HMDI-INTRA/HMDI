<?php
// Autor: Josélio Dias Mendonça
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../connection/conexao-mysql.php';

$nr_atendimento = isset($_GET['nr_atendimento']) ? $_GET['nr_atendimento'] : null;

try {
    $query = "SELECT * FROM cadastros.mapa_risco_jasmin";

    if (!empty($nr_atendimento)) {
        $query .= " WHERE nr_atendimento = :nr_atendimento AND dt_alta IS NULL AND cd_setor_atendimento = '227'";
    } else {
        $query .= " WHERE dt_alta IS NULL AND cd_setor_atendimento = '227'";
    }

    $query .= " ORDER BY dt_admissao DESC";

    $query .= " LIMIT 300";

    $stmt = $conn->prepare($query);

    if (!empty($nr_atendimento)) {
        $stmt->bindParam(':nr_atendimento', $nr_atendimento, PDO::PARAM_STR);
    }

    $stmt->execute();

    $equipe_ti = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $json = json_encode($equipe_ti, JSON_UNESCAPED_UNICODE);

    header('Content-Type: application/json; charset=utf-8');

    echo $json;
} catch (PDOException $e) {
    die("Erro na consulta ao banco de dados: " . $e->getMessage());
}
?>
