<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a conexão PDO existente
include_once '../../connection/conexao-mysql.php';
// Certifique-se de que o arquivo esteja incluído corretamente

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

$retorna = [];

try {
    // Verifica se a conexão com o banco de dados foi estabelecida corretamente
    if ($conn) {
        if (!empty($dados['idEditar'])) {
            // Altere a query para realizar uma atualização usando id como o identificador principal
            $query_atualizar = 'UPDATE cadastros.laboratorio_triagem 
                                SET nm_paciente = :nm_paciente, 
                                    dt_entrada = :dt_entrada, 
                                    cd_estabelecimento = :cd_estabelecimento, 
                                    nr_atendimento = :nr_atendimento, 
                                    ds_exame = :ds_exame, 
                                    ds_local = :ds_local, 
                                    ds_observacao = :ds_observacao, 
                                    cd_confirmacao = :cd_confirmacao, 
                                    status = :status 
                                WHERE id = :idEditar';

            $editar_usuario = $conn->prepare($query_atualizar);
            $editar_usuario->bindParam(':nm_paciente', $dados['nm_pacienteEditar']);
            $editar_usuario->bindParam(':dt_entrada', $dados['dt_entradaEditar']);
            $editar_usuario->bindParam(':cd_estabelecimento', $dados['cd_estabelecimentoEditar']);
            $editar_usuario->bindParam(':idEditar', $dados['idEditar']);
            $editar_usuario->bindParam(':nr_atendimento', $dados['nr_atendimentoEditar']);
            $editar_usuario->bindParam(':ds_exame', $dados['ds_exameEditar']);
            $editar_usuario->bindParam(':ds_local', $dados['ds_clinicaEditar']);
            $editar_usuario->bindParam(':ds_observacao', $dados['observacaoEditar']);
            $editar_usuario->bindParam(':cd_confirmacao', $dados['confirmacaoEditarSelect']);
            $editar_usuario->bindParam(':status', $dados['statusEditar']);

            if ($editar_usuario->execute()) {
                $retorna = ['status' => true, 'msg' => "editado com sucesso!"];
            } else {
                throw new Exception('Erro: não foi possível editar.');
            }
        } else {
            throw new Exception("Erro: o campo 'idEditar' não pode ser vazio.");
        }
    } else {
        throw new Exception('Erro: falha na conexão com o banco de dados.');
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => $e->getMessage()];
}

echo json_encode($retorna);
?>
