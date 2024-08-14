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
            
            $query_usuario = $conn->prepare("SELECT nm_usuario FROM cadastros.mapa_internacao_rosa WHERE nr_atendimento = :nr_atendimento");
            $query_usuario->execute([':nr_atendimento' => $dados['nr_atendimento']]);
            $usuario_atual = $query_usuario->fetch(PDO::FETCH_ASSOC);
            
            if (!empty($dados['nm_paciente'])) {
                $campos_para_atualizar[] = 'nm_paciente = :nm_paciente';
                $parametros[':nm_paciente'] = $dados['nm_paciente'];
            }
            if (!empty($dados['ds_leito'])) {
                $campos_para_atualizar[] = 'ds_leito = :ds_leito';
                $parametros[':ds_leito'] = $dados['ds_leito'];
            }
            if (!empty($dados['ds_idade'])) {
                $campos_para_atualizar[] = 'ds_idade = :ds_idade';
                $parametros[':ds_idade'] = $dados['ds_idade'];
            }
            if (!empty($dados['dt_parto'])) {
                $campos_para_atualizar[] = 'dt_parto = :dt_parto';
                $parametros[':dt_parto'] = $dados['dt_parto'];
            }
            if (!empty($dados['dt_admissao'])) {
                $campos_para_atualizar[] = 'dt_admissao = :dt_admissao';
                $parametros[':dt_admissao'] = $dados['dt_admissao'];
            }
            if (!empty($dados['obsAdultoHiddenEdit'])) {
                $campos_para_atualizar[] = 'ds_observacao_aduto = :obsAdultoHiddenEdit';
                $parametros[':obsAdultoHiddenEdit'] = $dados['obsAdultoHiddenEdit'];
            }
            if (!empty($dados['obsRnHiddenEdit'])) {
                $campos_para_atualizar[] = 'ds_observacao_rn = :obsRnHiddenEdit';
                $parametros[':obsRnHiddenEdit'] = $dados['obsRnHiddenEdit'];
            }
            if (!empty($dados['ds_dieta'])) {
                $campos_para_atualizar[] = 'ds_dieta = :ds_dieta';
                $parametros[':ds_dieta'] = $dados['ds_dieta'];
            }
            if (!empty($dados['ds_fugulin'])) {
                $campos_para_atualizar[] = 'ds_fugulin = :ds_fugulin';
                $parametros[':ds_fugulin'] = $dados['ds_fugulin'];
            }
            if (!empty($dados['dt_escalas'])) {
                $campos_para_atualizar[] = 'dt_escalas = :dt_escalas';
                $parametros[':dt_escalas'] = $dados['dt_escalas'];
            }
            if (!empty($dados['dt_sae_rn'])) {
                $campos_para_atualizar[] = 'dt_sae_rn = :dt_sae_rn';
                $parametros[':dt_sae_rn'] = $dados['dt_sae_rn'];
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
            if (!empty($dados['dt_alta'])) {
                $campos_para_atualizar[] = 'dt_alta = :dt_alta';
                $parametros[':dt_alta'] = $dados['dt_alta'];
            }
            if (!empty($dados['dt_atualizacao'])) {
                $campos_para_atualizar[] = 'dt_atualizacao = :dt_atualizacao';
                $parametros[':dt_atualizacao'] = $dados['dt_atualizacao'];
            }

            if (!empty($dados['cd_setor_atendimento']) || empty($dados['cd_setor_atendimento'])) {
                $campos_para_atualizar[] = 'cd_setor_atendimento = :cd_setor_atendimento';
                $parametros[':cd_setor_atendimento'] = $dados['cd_setor_atendimento'];
            }
            
            if (!empty($campos_para_atualizar)) {
                $query_atualizar = "UPDATE cadastros.mapa_internacao_rosa SET ";
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
