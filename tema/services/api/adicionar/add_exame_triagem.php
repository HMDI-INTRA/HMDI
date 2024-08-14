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
        if (!empty($dados['nm_exame']) && !empty($dados['nm_clinica'])) {
            // Verifica se o exame já existe para a clínica específica no banco de dados
            $query_verificar_existe = 'SELECT COUNT(*) FROM cadastros.EXAMES_TRIAGEM WHERE exame = :exame AND clinica = :clinica';
            $verifica_existe = $conn->prepare($query_verificar_existe);
            $verifica_existe->bindParam(':exame', $dados['nm_exame']);
            $verifica_existe->bindParam(':clinica', $dados['nm_clinica']);
            $verifica_existe->execute();

            if ($verifica_existe->fetchColumn() > 0) {
                // Exame já existe para a clínica, retornar mensagem de erro
                throw new Exception('Erro: o exame já existe para a clínica no banco de dados.');
            }

            // Se o exame não existe para a clínica, proceder com a inserção
            $query_inserir = 'INSERT INTO cadastros.EXAMES_TRIAGEM (exame, clinica) VALUES (:exame, :clinica)';
            $cad_usuarios = $conn->prepare($query_inserir);
            $cad_usuarios->bindParam(':exame', $dados['nm_exame']);
            $cad_usuarios->bindParam(':clinica', $dados['nm_clinica']);

            if ($cad_usuarios->execute()) {
                $retorna = ['status' => true, 'msg' => "cadastrado com sucesso!"];
            } else {
                throw new Exception('Erro: não foi possível cadastrar.');
            }
        } else {
            throw new Exception("Erro: os campos 'exame' e 'clinica' não podem ser vazios.");
        }
    } else {
        throw new Exception('Erro: falha na conexão com o banco de dados.');
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => $e->getMessage()];
}

echo json_encode($retorna);
?>
