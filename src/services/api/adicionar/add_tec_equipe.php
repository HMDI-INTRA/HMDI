<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a conexão PDO existente
include_once '../../connection/conexao-mysql.php'; // Certifique-se de que o arquivo esteja incluído corretamente

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

$retorna = [];

try {
    // Verifica se a conexão com o banco de dados foi estabelecida corretamente
    if ($conn) {
        if (!empty($dados['nome'])) { // Verifica se o campo 'nome' não está vazio
            // Verifica se o técnico já está cadastrado
            $query_tecnico = "SELECT nome, funcao, dt_entrada FROM cadastros.tecnicos WHERE nome = :nome";
            $result_tecnico = $conn->prepare($query_tecnico);
            $result_tecnico->bindParam(':nome', $dados['nome']); 
            $result_tecnico->execute();

            if ($result_tecnico->rowCount() != 0) {
                $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Técnico já cadastrado!</div>"];
            } else {
                // Insere o técnico no banco de dados
                $query_inserir = "INSERT INTO cadastros.tecnicos (nome, funcao, dt_entrada) VALUES (:nome, :funcao, :dt_entrada)";
                $cad_tecnico = $conn->prepare($query_inserir);
                $cad_tecnico->bindParam(':nome', $dados['nome']);
                $cad_tecnico->bindParam(':funcao', $dados['funcao']);
                $cad_tecnico->bindParam(':dt_entrada', $dados['dt_entrada']);

                if ($cad_tecnico->execute()) {
                    $retorna = ['status' => true, 'msg' => "<div class='alert alert-success' role='alert'>Técnico cadastrado com sucesso!</div>"];
                } else {
                    throw new Exception("Erro: não foi possível cadastrar o técnico.");
                }
            }
        } else {
            throw new Exception("Erro: o campo 'nome' não pode ser vazio.");
        }
    } else {
        throw new Exception("Erro: falha na conexão com o banco de dados.");
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>" . $e->getMessage() . "</div>"];
}

echo json_encode($retorna);
?>
