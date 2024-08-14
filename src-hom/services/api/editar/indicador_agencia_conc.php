<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../../connection/conexao-mysql.php';

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

$retorna = [];

try {
    if ($conn) {
        if (!empty($dados['mesAno']) && !empty($dados['concluido']) && !empty($dados['solicitacaoTransfIdEdit'])) {
            $query_atualizar = 'UPDATE cadastros.analise_dash_indicadores 
                                SET ds_concluido = :ds_concluido
                                WHERE dt_indicador = :mesAno
                                AND nm_indicador = :solicitacaoTransfIdEdit';

            $editar_indicador = $conn->prepare($query_atualizar);
            $editar_indicador->bindParam(':ds_concluido', $dados['concluido']);
            $editar_indicador->bindParam(':mesAno', $dados['mesAno']); 
            $editar_indicador->bindParam(':solicitacaoTransfIdEdit', $dados['solicitacaoTransfIdEdit']); 

            if ($editar_indicador->execute()) {
                $retorna = ['status' => true, 'msg' => "Editado com sucesso!"];
            } else {
               throw new Exception('Erro: não foi possível editar.');
            }
        } else {
            throw new Exception("Erro: Todos os campos tem que ser preenchido!.");
        }
    } else {
        throw new Exception('Erro: falha na conexão com o banco de dados.');
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => $e->getMessage()];
}

echo json_encode($retorna);
?>
