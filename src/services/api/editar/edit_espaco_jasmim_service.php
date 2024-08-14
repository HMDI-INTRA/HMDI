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
        if (!empty($dados['nr_atendimento'])) {
            $campos_para_atualizar = [];
            $parametros = [];
            
            $query_usuario = $conn->prepare("SELECT nm_usuario FROM cadastros.mapa_risco_jasmin WHERE nr_atendimento = :nr_atendimento");
            $query_usuario->execute([':nr_atendimento' => $dados['nr_atendimento']]);
            $usuario_atual = $query_usuario->fetch(PDO::FETCH_ASSOC);
            if (!empty($dados['obsAdultoHiddenEdit'])) {
                $campos_para_atualizar[] = 'ds_observacao_aduto = :obsAdultoHiddenEdit';
                $parametros[':obsAdultoHiddenEdit'] = $dados['obsAdultoHiddenEdit'];
            }
            if (!empty($dados['obsRnHiddenEdit'])) {
                $campos_para_atualizar[] = 'ds_observacao_rn = :obsRnHiddenEdit';
                $parametros[':obsRnHiddenEdit'] = $dados['obsRnHiddenEdit'];
            }
            if (!empty($dados['nm_usuario'])) {
                $campos_para_atualizar[] = 'nm_usuario = :nm_usuario';
                $parametros[':nm_usuario'] = $dados['nm_usuario'];
            } else {
                if ($usuario_atual && $usuario_atual['nm_usuario'] === 'Gerado pelo Sistema' || $usuario_atual && $usuario_atual['nm_usuario'] === '' || $usuario_atual['nm_usuario'] === null) {
                    $campos_para_atualizar[] = 'nm_usuario = :nm_usuario';
                    $parametros[':nm_usuario'] = 'Gerado pelo Sistema';
                }
            }
            if (!empty($campos_para_atualizar)) {
                $query_atualizar = "UPDATE cadastros.mapa_risco_jasmin SET ";
                $query_atualizar .= implode(', ', $campos_para_atualizar);
                $query_atualizar .= " WHERE nr_atendimento = :nr_atendimento";

                $query = $conn->prepare($query_atualizar);
                $parametros[':nr_atendimento'] = $dados['nr_atendimento'];

                if ($query->execute($parametros)) {
                    $retorna = ['status' => true, 'msg' => "Campos atualizados com sucesso!"];
                } else {
                    throw new Exception('Erro: não foi possível atualizar os campos.');
                }
            } else {
                throw new Exception("Erro: nenhum campo válido foi fornecido para atualização.");
            }
        } else {
            throw new Exception("Erro: o campo 'nr_atendimento' não pode ser vazio.");
        }
    } else {
        throw new Exception('Erro: falha na conexão com o banco de dados.');
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => $e->getMessage()];
}

echo json_encode($retorna);
?>
