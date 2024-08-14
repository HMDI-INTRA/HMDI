<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a conexão PDO existente
include_once '../../connection/conexao-mysql.php'; // Certifique-se de que o arquivo esteja incluído corretamente

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

if (!empty($dados['idEdit']) && !empty($dados['nomeEdit'])) { // Verifica se o campo 'idEdit' e 'nomeEdit' não estão vazios
    $id = $dados['idEdit']; 
    $query_tecnico = "SELECT nome, funcao, dt_entrada FROM cadastros.tecnicos WHERE id = :id";
    $result_tecnico = $conn->prepare($query_tecnico);
    $result_tecnico->bindParam(':id', $id);
    $result_tecnico->execute();

    if ($result_tecnico->rowCount() == 1) {
        // O técnico existe, então podemos atualizá-lo
        $query_atualizar = "UPDATE cadastros.tecnicos SET nome = :nomeEdit, funcao = :funcaoEdit, dt_entrada = :dt_entradaEdit WHERE id = :id";
        $atualiza_tecnico = $conn->prepare($query_atualizar);
        $atualiza_tecnico->bindParam(':id', $id);
        $atualiza_tecnico->bindParam(':nomeEdit', $dados['nomeEdit']);
        $atualiza_tecnico->bindParam(':funcaoEdit', $dados['funcaoEdit']);
        $atualiza_tecnico->bindParam(':dt_entradaEdit', $dados['dt_entradaEdit']);

        if ($atualiza_tecnico->execute()) {
            $retorna = ['status' => true, 'msg' => "<div class='alert alert-success' role='alert'>Técnico atualizado com sucesso!</div>"];
        } else {
            $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: não foi possível atualizar o técnico!</div>"];
        }
    } else {
        $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Técnico não encontrado!</div>"];
    }
} else {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: campos 'idEdit' ou 'nomeEdit' não podem ser vazios!</div>"];
}

echo json_encode($retorna);
?>
