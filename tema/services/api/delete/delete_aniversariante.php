<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a conexão PDO existente
include_once '../../connection/conexao-mysql.php'; // Certifique-se de que o arquivo esteja incluído corretamente

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

if (!empty($dados['id']) && is_array($dados['id'])) { // Verifica se o campo 'ids' não está vazio e é um array
    // Utiliza a função implode para criar uma string separada por vírgulas dos IDs
    $ids = implode(',', $dados['id']);

    $query_excluir = "DELETE FROM cadastros.aniversariantes WHERE id IN ($ids)";
    $excluir_aniversariantes = $conn->prepare($query_excluir);

    if ($excluir_aniversariantes->execute()) {
        $retorna = ['status' => true, 'msg' => "<div class='alert alert-success' role='alert'>Registros excluídos com sucesso!</div>"];
    } else {
        $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: não foi possível excluir os registros!</div>"];
    }
} else {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: a lista de 'ids' não pode ser vazia e deve ser um array!</div>"];
}

echo json_encode($retorna);
?>
