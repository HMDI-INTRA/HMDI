<?php
// Autor: Josélio Dias Mendonça
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once '../../connection/conexao-mysql.php'; 

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

    if (!empty($dados['idEdit'])) {
        $id = $dados['idEdit'];
        $query_nir = "SELECT nr_prontuario, nm_paciente, cd_protocolo, cd_senha_aih, ds_municipio, cd_procedimento, ds_procedimento, ds_observacao, ds_medico_exec, ds_inativado, dt_inativacao, ds_realizado, dt_realizacao, dt_medico_exec FROM cadastros.aih_eletivas WHERE id = :id";
        $result_nir = $conn->prepare($query_nir);
        $result_nir->bindParam(':id', $id);
        $result_nir->execute();

        if ($result_nir->rowCount() == 1) {
        
            $query_atualizar = "UPDATE cadastros.aih_eletivas SET  nr_prontuario = :nr_prontuario, nm_paciente = :nm_paciente,  cd_protocolo = :cd_protocolo, cd_senha_aih = :cd_senha_aih, ds_municipio = :ds_municipio, cd_procedimento = :cd_procedimento, ds_procedimento = :ds_procedimento, ds_observacao = :ds_observacao, ds_medico_exec = :ds_medico_exec, ds_inativado = :ds_inativado, dt_inativacao = :dt_inativacao, ds_realizado = :ds_realizado, dt_realizacao = :dt_realizacao, dt_medico_exec = :dt_medico_exec WHERE id = :id";
            $atualiza_nir = $conn->prepare($query_atualizar);
            $atualiza_nir->bindParam(':id', $id);
            $atualiza_nir->bindParam(':nr_prontuario', $dados['nr_prontuarioEdit']);
            $atualiza_nir->bindParam(':nm_paciente', $dados['nm_pacienteEdit']);
            $atualiza_nir->bindParam(':cd_protocolo', $dados['cd_protocoloEdit']);
            $atualiza_nir->bindParam(':cd_senha_aih', $dados['cd_senha_aihEdit']);
            $atualiza_nir->bindParam(':ds_municipio', $dados['ds_municipioEdit']);
            $atualiza_nir->bindParam(':cd_procedimento', $dados['cd_procedimentoEdit']);
            $atualiza_nir->bindParam(':ds_procedimento', $dados['ds_procedimentoEdit']);
            $atualiza_nir->bindParam(':ds_observacao', $dados['ds_observacaoEditHidden']);
            $atualiza_nir->bindParam(':ds_medico_exec', $dados['ds_medico_execEdit']);
            $atualiza_nir->bindParam(':dt_medico_exec', $dados['dt_medicoEdit']);
            $atualiza_nir->bindParam(':ds_inativado', $dados['ds_inativadoEdit']);
            $atualiza_nir->bindParam(':dt_inativacao', $dados['dt_inativacaoEdit']);
            $atualiza_nir->bindParam(':ds_realizado', $dados['ds_realizadoEdit']);
            $atualiza_nir->bindParam(':dt_realizacao', $dados['dt_realizacaoEdit']);

            if ($atualiza_nir->execute()) {
                $retorna = ['status' => true, 'msg' => "Atualizado com sucesso!"];
            } else {
                $retorna = ['status' => false, 'msg' => "Erro: não foi possível atualizar!"];
            }
        } else {
            $retorna = ['status' => false, 'msg' => "Registro não encontrado!"];
        }
    } else {
        $retorna = ['status' => false, 'msg' => "Erro: campos não podem ser vazios!"];
    }
} else {
    $retorna = ['status' => false, 'msg' => "Método de requisição inválido!"];
}
echo json_encode($retorna);
?>
