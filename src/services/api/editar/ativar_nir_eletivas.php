<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a conexão PDO existente
include_once '../../connection/conexao-mysql.php';

$id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT); // Alterado para INPUT_POST

if (!empty($id)) {
    $query_nir = "SELECT ds_inativado FROM cadastros.aih_eletivas WHERE id = :id";
    $result_nir = $conn->prepare($query_nir);
    $result_nir->bindParam(':id', $id);
    $result_nir->execute();

    if ($result_nir->rowCount() == 1) {
        $query_atualizar = "UPDATE cadastros.aih_eletivas 
        SET 
            ds_inativado = 'A'
        WHERE id = :id";
    
    $atualiza_nir = $conn->prepare($query_atualizar);
    $atualiza_nir->bindParam(':id', $id);
    
    $atualiza_nir->execute();
    
    if ($atualiza_nir->rowCount() > 0) {
        $retorna = ['status' => true, 'msg' => "Atualizado com sucesso!"];
    } else {
        $retorna = ['status' => false, 'msg' => "Erro: não foi possível atualizar!"];
    }
    
    } else {
        $retorna = ['status' => false, 'msg' => "Não encontrado!"];
    }
} else {
    $retorna = ['status' => false, 'msg' => "Erro: ID não fornecido!"];
}

echo json_encode($retorna);
?>
