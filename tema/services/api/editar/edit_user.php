<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a conexão PDO existente
include_once '../../connection/conexao-mysql.php';

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

$retorna = [];

try {
    if ($conn) {
        if (!empty($dados['usuario_id'])) {
            $query_usuario_existente = 'SELECT id, nome, usuario, senha_usuario, funcao FROM acesso.acesso_cadastro WHERE id = :id';
            $result_usuario_existente = $conn->prepare($query_usuario_existente);
            $result_usuario_existente->bindParam(':id', $dados['usuario_id']);
            $result_usuario_existente->execute();

            if ($result_usuario_existente->rowCount() != 0) {
                if (!empty($dados['confirmarSenha'])) {
                    if ($dados['novaSenha'] === $dados['confirmarSenha']) {
                        $hashed_password = password_hash($dados['novaSenha'], PASSWORD_DEFAULT);
                        $query_atualizar_senha = 'UPDATE acesso.acesso_cadastro SET senha_usuario = :senha_usuario WHERE id = :id';
                        $atualizar_senha_usuario = $conn->prepare($query_atualizar_senha);
                        $atualizar_senha_usuario->bindParam(':senha_usuario', $hashed_password);
                        $atualizar_senha_usuario->bindParam(':id', $dados['usuario_id']);

                        if ($atualizar_senha_usuario->execute()) {
                            $retorna = ['status' => true, 'msg' => "<div class='alert alert-success' role='alert'>Senha atualizada com sucesso acesse novamente!</div>"];
                            echo "<script>
                            setTimeout(function() {
                                window.location.href = '../../../index.php';
                            }, 3000);
                          </script>";
                        } else {
                            throw new Exception('Erro: nao foi possível atualizar a senha.');
                        }
                    } else {
                        throw new Exception('Erro: A nova senha e a confirmacao de senha nao coincidem.');
                    }
                } else {
                    throw new Exception('Erro: O campo de confirmação de senha nao pode ser vazio.');
                }
            } else {
                throw new Exception('Erro: Usuário nao encontrado.');
            }
        } else {
            throw new Exception("Erro: o campo 'usuario_id' nao pode ser vazio.");
        }
    } else {
        throw new Exception('Erro: falha na conexão com o banco de dados.');
    }
} catch (Exception $e) {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>" . $e->getMessage() . '</div>'];

    // Add JavaScript code to wait for 5 seconds and then redirect
    echo "<script>
            setTimeout(function() {
                window.location.href = '../../../index.php';
            }, 5000);
          </script>";
}

echo json_encode($retorna);
?>
