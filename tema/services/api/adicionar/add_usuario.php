<?php
// Autor: Josélio Dias Mendonça

ini_set( 'display_errors', 1 );
ini_set( 'display_startup_errors', 1 );
error_reporting( E_ALL );

// Use a conexão PDO existente
include_once '../../connection/conexao-mysql.php';
// Certifique-se de que o arquivo esteja incluído corretamente

$dados = filter_input_array( INPUT_POST, FILTER_DEFAULT );

$retorna = [];

try {
    // Verifica se a conexão com o banco de dados foi estabelecida corretamente
    if ( $conn ) {
        if ( !empty( $dados[ 'nome' ] ) ) {
            // Verifica se o campo 'nome' não está vazio
            // Verifica se o técnico já está cadastrado
            $query_usuarios = 'SELECT nome, usuario, senha_usuario, funcao FROM acesso.acesso_cadastro WHERE nome = :nome';
            $result_usuarios = $conn->prepare( $query_usuarios );
            $result_usuarios->bindParam( ':nome', $dados[ 'nome' ] );

            $result_usuarios->execute();

            if ( $result_usuarios->rowCount() != 0 ) {
                $retorna = [ 'status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Já cadastrado!</div>" ];
            } else {
                // Gera um hash seguro para a senha
                $hashed_password = password_hash($dados['senha'], PASSWORD_DEFAULT);

                // Insere o técnico no banco de dados
                $query_inserir = 'INSERT INTO acesso.acesso_cadastro (nome, usuario, senha_usuario, funcao) VALUES (:nome, :usuario, :senha_usuario, :funcao)';
                $cad_usuarios = $conn->prepare( $query_inserir );
                $cad_usuarios->bindParam( ':nome', $dados[ 'nome' ] );
                $cad_usuarios->bindParam( ':usuario', $dados[ 'nomeUsuario' ] ); // Corrigi aqui, estava faltando o nome do campo
                $cad_usuarios->bindParam( ':senha_usuario', $hashed_password ); // Usando o hash da senha
                $cad_usuarios->bindParam( ':funcao', $dados[ 'funcao' ] );

                if ( $cad_usuarios->execute() ) {
                    $retorna = [ 'status' => true, 'msg' => "<div class='alert alert-success' role='alert'> cadastrado com sucesso!</div>" ];
                } else {
                    throw new Exception( 'Erro: não foi possível cadastrar.' );
                }
            }
        } else {
            throw new Exception( "Erro: o campo 'nome' não pode ser vazio." );
        }
    } else {
        throw new Exception( 'Erro: falha na conexão com o banco de dados.' );
    }
} catch ( Exception $e ) {
    $retorna = [ 'status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>" . $e->getMessage() . '</div>' ];
}

echo json_encode( $retorna );
?>
