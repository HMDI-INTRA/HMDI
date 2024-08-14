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
        if (!empty($dados['cd_senha_aih']) && !empty($dados['cd_protocolo'])) {
            $query_nir = "SELECT dt_aih, nr_prontuario, nm_paciente, dt_nascimento, cd_protocolo, cd_senha_aih, ds_municipio, cd_procedimento, ds_procedimento, ds_observacao, ds_medico_exec, ds_inativado, dt_inativacao, ds_realizado, dt_realizacao FROM cadastros.aih_eletivas WHERE cd_senha_aih = :cd_senha_aih OR cd_protocolo = :cd_protocolo";
            $result_nir = $conn->prepare($query_nir);
            $result_nir->bindParam(':cd_senha_aih', $dados['cd_senha_aih']); 
            $result_nir->bindParam(':cd_protocolo', $dados['cd_protocolo']); 
            $result_nir->execute();

            if ($result_nir->rowCount() != 0) {
                $retorna = ['status' => false, 'msg' => "Já existe um registro com o mesmo cd_senha_aih ou cd_protocolo!"];
            } else {
                $query_inserir = "INSERT INTO cadastros.aih_eletivas (dt_aih, nr_prontuario, nm_paciente, dt_nascimento, cd_protocolo, cd_senha_aih, ds_municipio, cd_procedimento, ds_procedimento, ds_observacao, ds_medico_exec, ds_inativado, dt_inativacao, ds_realizado, dt_realizacao) VALUES (:dt_aih, :nr_prontuario, :nm_paciente, :dt_nascimento, :cd_protocolo, :cd_senha_aih, :ds_municipio, :cd_procedimento, :ds_procedimento, :ds_observacao, :ds_medico_exec, :ds_inativado, :dt_inativacao, :ds_realizado, :dt_realizacao)";
                $cad_nir = $conn->prepare($query_inserir);
                $cad_nir->bindParam(':dt_aih', $dados['dt_aih']);
                $cad_nir->bindParam(':nr_prontuario', $dados['nr_prontuario']);
                $cad_nir->bindParam(':nm_paciente', $dados['nm_paciente']);
                $cad_nir->bindParam(':dt_nascimento', $dados['dt_nascimento']);
                $cad_nir->bindParam(':cd_protocolo', $dados['cd_protocolo']);
                $cad_nir->bindParam(':cd_senha_aih', $dados['cd_senha_aih']);
                $cad_nir->bindParam(':ds_municipio', $dados['ds_municipio']);
                $cad_nir->bindParam(':cd_procedimento', $dados['cd_procedimento']);
                $cad_nir->bindParam(':ds_procedimento', $dados['ds_procedimento']);
                $cad_nir->bindParam(':ds_observacao', $dados['ds_observacao']);
                $cad_nir->bindParam(':ds_medico_exec', $dados['ds_medico_exec']);
                $cad_nir->bindParam(':ds_inativado', $dados['ds_inativado']);
                $cad_nir->bindParam(':dt_inativacao', $dados['dt_inativacao']);
                $cad_nir->bindParam(':ds_realizado', $dados['ds_realizado']);
                $cad_nir->bindParam(':dt_realizacao', $dados['dt_realizacao']);

                if ($cad_nir->execute()) {
                    $retorna = ['status' => true, 'msg' => "Cadastrado com sucesso"];
                } else {
                    throw new Exception("Erro: não foi possível cadastrar.");
                }
            }
        } else {
            $query_inserir = "INSERT INTO cadastros.aih_eletivas (dt_aih, nr_prontuario, nm_paciente, dt_nascimento, cd_protocolo, cd_senha_aih, ds_municipio, cd_procedimento, ds_procedimento, ds_observacao, ds_medico_exec, ds_inativado, dt_inativacao, ds_realizado, dt_realizacao) VALUES (:dt_aih, :nr_prontuario, :nm_paciente, :dt_nascimento, :cd_protocolo, :cd_senha_aih, :ds_municipio, :cd_procedimento, :ds_procedimento, :ds_observacao, :ds_medico_exec, :ds_inativado, :dt_inativacao, :ds_realizado, :dt_realizacao)";
            $cad_nir = $conn->prepare($query_inserir);
            $cad_nir->bindParam(':dt_aih', $dados['dt_aih']);
            $cad_nir->bindParam(':nr_prontuario', $dados['nr_prontuario']);
            $cad_nir->bindParam(':nm_paciente', $dados['nm_paciente']);
            $cad_nir->bindParam(':dt_nascimento', $dados['dt_nascimento']);
            $cad_nir->bindParam(':cd_protocolo', $dados['cd_protocolo']);
            $cad_nir->bindParam(':cd_senha_aih', $dados['cd_senha_aih']);
            $cad_nir->bindParam(':ds_municipio', $dados['ds_municipio']);
            $cad_nir->bindParam(':cd_procedimento', $dados['cd_procedimento']);
            $cad_nir->bindParam(':ds_procedimento', $dados['ds_procedimento']);
            $cad_nir->bindParam(':ds_observacao', $dados['ds_observacao']);
            $cad_nir->bindParam(':ds_medico_exec', $dados['ds_medico_exec']);
            $cad_nir->bindParam(':ds_inativado', $dados['ds_inativado']);
            $cad_nir->bindParam(':dt_inativacao', $dados['dt_inativacao']);
            $cad_nir->bindParam(':ds_realizado', $dados['ds_realizado']);
            $cad_nir->bindParam(':dt_realizacao', $dados['dt_realizacao']);

            if ($cad_nir->execute()) {
                $retorna = ['status' => true, 'msg' => "Cadastrado com sucesso"];
            } else {
                throw new Exception("Erro: não foi possível cadastrar.");
            }
        }
    } else {
        throw new Exception("Erro: falha na conexão com o banco de dados.");
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => $e->getMessage() ];
}

echo json_encode($retorna);
?>
