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
            $query_inserir = "INSERT INTO cadastros.mapa_risco_jasmin 
                (nr_atendimento, nm_paciente, ds_leito, ds_idade, dt_parto, dt_admissao, ds_observacao_aduto, ds_observacao_rn, ds_dieta, ds_fugulin, dt_escalas, dt_sae_rn, nm_usuario, dt_alta, ds_medicamentos,ds_transfusao,ds_procedimentos, ds_alergias,ds_parto,ds_recomendacoes, ds_medicamentosRn,ds_transfusaoRn,ds_procedimentosRn, ds_alergiasRn,ds_recomendacoesRn, cd_setor_atendimento)
                VALUES 
                (:nr_atendimento, :nm_paciente, :ds_leito, :ds_idade, :dt_parto, :dt_admissao, :ds_observacao_aduto, :ds_observacao_rn, :ds_dieta, :ds_fugulin, :dt_escalas, :dt_sae_rn, :nm_usuario, :dt_alta, :ds_medicamentos,:ds_transfusao,:ds_procedimentos, :ds_alergias,:ds_parto,:ds_recomendacoes,:ds_medicamentosRn,:ds_transfusaoRn,:ds_procedimentosRn, :ds_alergiasRn,:ds_recomendacoesRn, :cd_setor_atendimento)";
            $query = $conn->prepare($query_inserir);
            $query->bindParam(':nr_atendimento', $dados['nr_atendimento']);
            $query->bindParam(':nm_paciente', $dados['nm_paciente']);
            $query->bindParam(':ds_leito', $dados['ds_leito']);
            $query->bindParam(':ds_idade', $dados['ds_idade']);
            if (!empty($dados['dt_parto'])) {
                $query->bindParam(':dt_parto', $dados['dt_parto']);
            } else {
                $query->bindValue(':dt_parto', null, PDO::PARAM_NULL); 
            }
            if (!empty($dados['dt_admissao'])) {
                $query->bindParam(':dt_admissao', $dados['dt_admissao']);
            } else {
                $query->bindValue(':dt_admissao', null, PDO::PARAM_NULL); 
            }
            $query->bindParam(':ds_observacao_aduto', $dados['ds_observacao_aduto']);
            $query->bindParam(':ds_observacao_rn', $dados['ds_observacao_rn']);
            $query->bindParam(':ds_dieta', $dados['ds_dieta']);
            $query->bindParam(':ds_fugulin', $dados['ds_fugulin']);
            if (!empty($dados['dt_escalas'])) {
                $query->bindParam(':dt_escalas', $dados['dt_escalas']);
            } else {
                $query->bindValue(':dt_escalas', null, PDO::PARAM_NULL); 
            }
            if (!empty($dados['dt_sae_rn'])) {
                $query->bindParam(':dt_sae_rn', $dados['dt_sae_rn']);
            } else {
                $query->bindValue(':dt_sae_rn', null, PDO::PARAM_NULL); 
            }
            if (!empty($dados['dt_alta'])) {
                $query->bindParam(':dt_alta', $dados['dt_alta']);
            } else {
                $query->bindValue(':dt_alta', null, PDO::PARAM_NULL); 
            }
            $query->bindParam(':ds_medicamentos', $dados['ds_medicamentos']);
            $query->bindParam(':ds_procedimentos', $dados['ds_procedimentos']);
            $query->bindParam(':ds_transfusao', $dados['ds_transfusao']);
            $query->bindParam(':ds_alergias', $dados['ds_alergias']);
            $query->bindParam(':ds_parto', $dados['ds_parto']);
            $query->bindParam(':ds_recomendacoes', $dados['ds_recomendacoes']);
            $query->bindParam(':ds_medicamentosRn', $dados['ds_medicamentosRn']);
            $query->bindParam(':ds_procedimentosRn', $dados['ds_procedimentosRn']);
            $query->bindParam(':ds_transfusaoRn', $dados['ds_transfusaoRn']);
            $query->bindParam(':ds_alergiasRn', $dados['ds_alergiasRn']);;
            $query->bindParam(':ds_recomendacoesRn', $dados['ds_recomendacoesRn']);
            $query->bindParam(':cd_setor_atendimento', $dados['cd_setor_atendimento']);
            $query->bindParam(':nm_usuario', $dados['nm_usuario']);
            if ($query->execute()) {
                $retorna = ['status' => true, 'msg' => "Cadastrado com sucesso!"];
            } else {
                throw new Exception('Erro: não foi possível cadastrar.');
            }
        } else {
            throw new Exception("Erro: o campo 'nr_atendimento' não pode ser vazio.");
        }
    } else {
        throw new Exception('Erro: falha na conexão com o banco de dados.');
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' =>  $e->getMessage() ];
}
echo json_encode($retorna);
?>
