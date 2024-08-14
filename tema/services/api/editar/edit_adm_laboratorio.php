<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a conexão PDO existente
include_once '../../connection/conexao-mysql.php'; // Certifique-se de que o arquivo esteja incluído corretamente

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

if (!empty($dados['idEdit']) && !empty($dados['pacienteEditar'])) { // Verifica se o campo 'idEditar' e 'nomeEdit' não estão vazios
    $id = $dados['idEdit']; 
    $query_laboratorio = "SELECT nome, dt_nascimento, dt_lancamento, hora_entrada, hora_chegada, coletador, nr_atendimento, nr_prescricao, local, ds_exame, puncao, descricao, total FROM cadastros.laboratorio_adm WHERE id = :id";
    $result_laboratorio = $conn->prepare($query_laboratorio);
    $result_laboratorio->bindParam(':id', $id);
    $result_laboratorio->execute();

    if ($result_laboratorio->rowCount() == 1) {
        $query_atualizar = "UPDATE cadastros.laboratorio_adm SET nome = :pacienteEditar, dt_nascimento = :dtNascimentoEditar, dt_lancamento = :dtEntradaEditar, hora_entrada = :hrEntradaEditar, hora_chegada = :hrChegadaEditar, coletador = :coletorEditar, nr_atendimento = :atendimentoEditar, nr_prescricao = :prescricaoEditar, local = :localEditar, ds_exame = :exameEditar, puncao = :puncaoEditar, descricao =  :descricaoEditar, total = :totalEditar WHERE id = :id";
        $atualiza_laboratorio = $conn->prepare($query_atualizar);
        $atualiza_laboratorio->bindParam(':id', $id);
        $atualiza_laboratorio->bindParam(':pacienteEditar', $dados['pacienteEditar']);
        $atualiza_laboratorio->bindParam(':dtNascimentoEditar', $dados['dtNascimentoEditar']);
        $atualiza_laboratorio->bindParam(':dtEntradaEditar', $dados['dtEntradaEditar']);
        $atualiza_laboratorio->bindParam(':hrChegadaEditar', $dados['hrChegadaEditar']);
        $atualiza_laboratorio->bindParam(':hrEntradaEditar', $dados['hrEntradaEditar']);
        $atualiza_laboratorio->bindParam(':coletorEditar', $dados['coletorEditar']);
        $atualiza_laboratorio->bindParam(':atendimentoEditar', $dados['atendimentoEditar']);
        $atualiza_laboratorio->bindParam(':prescricaoEditar', $dados['prescricaoEditar']);
        $atualiza_laboratorio->bindParam(':localEditar', $dados['localEditar']);
        $atualiza_laboratorio->bindParam(':exameEditar', $dados['exameEditar']);
        $atualiza_laboratorio->bindParam(':puncaoEditar', $dados['puncaoEditar']);
        $atualiza_laboratorio->bindParam(':descricaoEditar', $dados['descricaoEditar']);
        $atualiza_laboratorio->bindParam(':totalEditar', $dados['totalEditar']);


        if ($atualiza_laboratorio->execute()) {
            $retorna = ['status' => true, 'msg' => "Técnico atualizado com sucesso!"];
        } else {
            $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: não foi possível atualizar o técnico!</div>"];
        }
    } else {
        $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Técnico não encontrado!</div>"];
    }
} else {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: campos 'idEditar' ou 'nomeEditar' não podem ser vazios!</div>"];
}

echo json_encode($retorna);
?>
