<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../../connection/conexao-mysql.php';

function enviarResposta($status, $mensagem) {
    echo json_encode(['status' => $status, 'msg' => $mensagem]);
    exit;
}

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$retorna = [];

try {
    if (empty($dados['idEditar']) || empty($dados['patrimonioEditar'])) {
        throw new Exception("Erro: campos 'idEditar' ou 'patrimonioEditar' não podem ser vazios!");
    }

    $id = $dados['idEditar'];
    $query = "SELECT * FROM cadastros.computadores WHERE id = :id";
    $result = $conn->prepare($query);
    $result->bindParam(':id', $id);
    $result->execute();

    if ($result->rowCount() == 1) {
        $officeEditar = empty($dados['officeEditar']) ? 'Não especificado' : $dados['officeEditar'];

        // O técnico existe, então podemos atualizá-lo
        $query_atualizar = "UPDATE cadastros.computadores SET patrimonio = :patrimonio, descricao = :descricao, custo = :custo, local_ = :local_, data_prev = :data_prev, data_prox = :data_prox, observacao = :observacao, tecnico = :tecnico, Andar = :Andar, Monitor = :Monitor, hostName_Antigo = :hostName_Antigo, hostName_Novo = :hostName_Novo, login = :login, modelo = :modelo, sistema_Operacional = :sistema_Operacional, perifericos = :perifericos, office = :office WHERE id = :id";

        $atualiza_tecnico = $conn->prepare($query_atualizar);

        $bindParams = [
            ':id' => $id,
            ':patrimonio' => $dados['patrimonioEditar'],
            ':descricao' => $dados['descricaoEditar'],
            ':custo' => $dados['custoEditar'],
            ':local_' => $dados['localEditar'],
            ':data_prev' => $dados['dataPrevEditar'],
            ':data_prox' => $dados['dataProxEditar'],
            ':observacao' => $dados['observacaoEditar'],
            ':tecnico' => $dados['tecnicoEditar'],
            ':Andar' => $dados['andarEditar'],
            ':Monitor' => $dados['monitorEditar'],
            ':hostName_Antigo' => $dados['hostAntigoEditar'],
            ':hostName_Novo' => $dados['hostNovoEditar'],
            ':login' => $dados['loginEditar'],
            ':modelo' => $dados['modeloEditar'],
            ':sistema_Operacional' => $dados['sistemaOperacionalEditar'],
            ':perifericos' => $dados['perifericosEditar'],
            ':office' => $officeEditar
        ];

        $atualiza_tecnico->execute($bindParams);

        if ($atualiza_tecnico->execute()) {
            enviarResposta(true, "<div class='alert alert-success' role='alert'>Técnico atualizado com sucesso!</div>");
        } else {
            enviarResposta(false, "<div class='alert alert-danger' role='alert'>Erro: não foi possível atualizar o técnico!</div>");
        }
    } else {
        enviarResposta(false, "<div class='alert alert-danger' role='alert'>Técnico não encontrado!</div>");
    }
} catch (Exception $e) {
    enviarResposta(false, "<div class='alert alert-danger' role='alert'>" . $e->getMessage() . '</div>');
}
?>
