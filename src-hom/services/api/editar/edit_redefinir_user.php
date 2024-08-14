<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../../connection/conexao-mysql.php';

$dados = json_decode(file_get_contents('php://input'), true); 

$retorna = [];

try {
    if ($dados && isset($dados['idEditar'])) {
        if ($conn) {

            $senha_padrao = '123456';

            $usuario_id = intval($dados['idEditar']); 

            $hashed_password = password_hash($senha_padrao, PASSWORD_DEFAULT);

            $query_atualizar_senha = 'UPDATE acesso.acesso_cadastro SET senha_usuario = :senha_usuario WHERE id = :id';
            $atualizar_senha_usuario = $conn->prepare($query_atualizar_senha);
            $atualizar_senha_usuario->bindParam(':senha_usuario', $hashed_password);
            $atualizar_senha_usuario->bindParam(':id', $usuario_id);

            if ($atualizar_senha_usuario->execute()) {
                $retorna = ['status' => true, 'msg' => 'Senha atualizada com sucesso. Senha padrão!'];
            } else {
                throw new Exception('Erro: não foi possível atualizar a senha.');
            }
        } else {
            throw new Exception('Erro: falha na conexão com o banco de dados.');
        }
    } else {
        throw new Exception('Erro: dados inválidos recebidos.');
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => 'Erro: ' . $e->getMessage()];
}

echo json_encode($retorna);
?>
