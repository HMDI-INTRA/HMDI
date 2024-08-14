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
        if (!empty($dados['nr_prescricao'])) {
            // Verifica se a prescrição já existe
            $query_verifica_prescricao = 'SELECT COUNT(*) as count_prescricao FROM cadastros.laboratorio_triagem WHERE nr_prescricao = :nr_prescricao';
            $verifica_prescricao = $conn->prepare($query_verifica_prescricao);
            $verifica_prescricao->bindParam(':nr_prescricao', $dados['nr_prescricao']);
            $verifica_prescricao->execute();
            $count_prescricao = $verifica_prescricao->fetch(PDO::FETCH_ASSOC)['count_prescricao'];

            if ($count_prescricao > 0) {
                // Prescrição já existe, verifica se ds_clinica e ds_exame também existem
                $query_verifica_campos = 'SELECT COUNT(*) as count_campos FROM cadastros.laboratorio_triagem WHERE nr_prescricao = :nr_prescricao AND ds_local = :ds_clinica AND ds_exame = :ds_exame';
                $verifica_campos = $conn->prepare($query_verifica_campos);
                $verifica_campos->bindParam(':nr_prescricao', $dados['nr_prescricao']);
                $verifica_campos->bindParam(':ds_clinica', $dados['ds_clinica']);
                $verifica_campos->bindParam(':ds_exame', $dados['ds_exame']);
                $verifica_campos->execute();
                $count_campos = $verifica_campos->fetch(PDO::FETCH_ASSOC)['count_campos'];

                if ($count_campos > 0) {
                    throw new Exception("Alerta: os campos 'ds_clinica' e 'ds_exame' já existem para esta prescrição. ");
                }
            }

            // Continua o processo de inserção ou atualização
            $query_inserir = 'INSERT INTO cadastros.laboratorio_triagem (nm_paciente, dt_entrada, cd_estabelecimento, nr_prescricao, nr_atendimento, ds_exame, ds_local, ds_observacao, cd_confirmacao, recoleta, status) VALUES (:nm_paciente, :dt_entrada, :cd_estabelecimento, :nr_prescricao, :nr_atendimento, :ds_exame, :ds_clinica, :ds_observacao, :cd_confirmacao, :recoleta, :status)
                ON DUPLICATE KEY UPDATE ds_exame = VALUES(ds_exame), ds_local = VALUES(ds_local)';

            $cad_usuarios = $conn->prepare($query_inserir);
            $cad_usuarios->bindParam(':nm_paciente', $dados['nm_paciente']);
            $cad_usuarios->bindParam(':dt_entrada', $dados['dt_entrada']);
            $cad_usuarios->bindParam(':cd_estabelecimento', $dados['cd_estabelecimento']);
            $cad_usuarios->bindParam(':nr_prescricao', $dados['nr_prescricao']);
            $cad_usuarios->bindParam(':nr_atendimento', $dados['nr_atendimento']);
            $cad_usuarios->bindParam(':ds_exame', $dados['ds_exame']);
            $cad_usuarios->bindParam(':ds_clinica', $dados['ds_clinica']);
            $cad_usuarios->bindParam(':ds_observacao', $dados['observacao']);
            $cad_usuarios->bindParam(':cd_confirmacao', $dados['confirmacao']);
            $cad_usuarios->bindParam(':recoleta', $dados['textoSelecionado']);
            $cad_usuarios->bindParam(':status', $dados['status']);

            if ($cad_usuarios->execute()) {
                $retorna = ['status' => true, 'msg' => "cadastrado com sucesso!"];
            } else {
                throw new Exception('Erro: não foi possível cadastrar.');
            }
        } else {
            throw new Exception("Erro: o campo 'Prescrição' não pode ser vazio.");
        }
    } else {
        throw new Exception('Erro: falha na conexão com o banco de dados.');
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => $e->getMessage()];
}

echo json_encode($retorna);
?>
