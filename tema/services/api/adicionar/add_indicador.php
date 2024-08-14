<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../../connection/conexao-mysql.php';

$retorna = [];

try {
    if ($conn) {
        if (!empty($_POST['solicitacaoTransf']) && !empty($_POST['mesAno'])) {
            $mesAno = $_POST['mesAno'];
            $solicitacaoTransf = $_POST['solicitacaoTransf'];
            $analise = $_POST['analise'];
            $planoAcao = $_POST['planoAcao'];

            $query_verificar_existe = 'SELECT COUNT(*) FROM cadastros.analise_dash_indicadores WHERE dt_indicador = :mesAno AND nm_indicador = :solicitacaoTransf';
            $verifica_existe = $conn->prepare($query_verificar_existe);
            $verifica_existe->bindParam(':mesAno', $mesAno);
            $verifica_existe->bindParam(':solicitacaoTransf', $solicitacaoTransf);
            $verifica_existe->execute();

            $count = $verifica_existe->fetchColumn();

            if ($count === 0) {
     
                $query_inserir = 'INSERT INTO cadastros.analise_dash_indicadores (dt_indicador, analise_indicador, nm_indicador, plano_acao_indicador) VALUES (:dt_indicador, :analise_indicador, :nm_indicador, :plano_acao_indicador)';
                $cad_usuarios = $conn->prepare($query_inserir);
                $cad_usuarios->bindParam(':dt_indicador', $mesAno);
                $cad_usuarios->bindParam(':analise_indicador', $analise);
                $cad_usuarios->bindParam(':nm_indicador', $solicitacaoTransf);
                $cad_usuarios->bindParam(':plano_acao_indicador', $planoAcao);

                if ($cad_usuarios->execute()) {
                    $retorna = ['status' => true, 'msg' => 'Cadastrado com sucesso!'];
                } else {
                    throw new Exception('Erro: Não foi possível cadastrar.');
                }
            } else {
                throw new Exception('Erro: Já existe um registro no banco de dados com os mesmos valores de dt_indicador e nm_indicador.');
            }
        } else {
            throw new Exception('Erro: Os campos não podem ser vazios.');
        }
    } else {
        throw new Exception('Erro: Falha na conexão com o banco de dados.');
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => $e->getMessage()];
}

echo json_encode($retorna);
?>
