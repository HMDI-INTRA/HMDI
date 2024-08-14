<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json");

$dsn = 'odbc:DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=\\\\10.1.1.111\\Controladora-HMDI\\Dba\\SDK.mdb';

try {
    $conn = new PDO($dsn, '', ''); 

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = 'SELECT TOP 50 * FROM ListaOffLine';
    $stmt = $conn->query($sql);

    if ($stmt) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($data)) {
            echo json_encode($data);
        } else {
            echo json_encode(['message' => 'Nenhum dado encontrado na tabela.']);
        }
    } else {
        echo json_encode(['error' => 'Erro na consulta SQL.']);
    }

} catch (PDOException $e) {

    echo json_encode(['error' => 'Erro: Conexao com banco de dados n�o realizada com sucesso. Erro gerado ' . $e->getMessage()]);
}
?>
