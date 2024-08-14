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
        if (!empty($dados['prescricao'])) {
            // Remove the check for existing records
            $query_inserir = 'INSERT INTO cadastros.laboratorio_adm (nome, dt_nascimento, dt_lancamento, hora_entrada, hora_chegada, coletador, nr_atendimento, nr_prescricao, local, ds_exame, puncao, descricao, total) VALUES (:nome, :dt_nascimento, :dt_lancamento, :hora_entrada, :hora_chegada, :coletador, :nr_atendimento, :nr_prescricao, :local, :ds_exame, :puncao, :descricao, :total)';
            $cad_usuarios = $conn->prepare($query_inserir);
            $cad_usuarios->bindParam(':nome', $dados['paciente']);
            $cad_usuarios->bindParam(':dt_nascimento', $dados['dtNascimento']);
            $cad_usuarios->bindParam(':dt_lancamento', $dados['dtEntrada']);
            $cad_usuarios->bindParam(':hora_entrada', $dados['horaEntrada']);
            $cad_usuarios->bindParam(':hora_chegada', $dados['dtChegada']);
            $cad_usuarios->bindParam(':coletador', $dados['coletor']);
            $cad_usuarios->bindParam(':nr_atendimento', $dados['atendimento']);
            $cad_usuarios->bindParam(':nr_prescricao', $dados['prescricao']);
            $cad_usuarios->bindParam(':local', $dados['local']);
            $cad_usuarios->bindParam(':ds_exame', $dados['exame']);
            $cad_usuarios->bindParam(':puncao', $dados['puncao']);
            $cad_usuarios->bindParam(':descricao', $dados['descricao']);
            $cad_usuarios->bindParam(':total', $dados['total']);

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
