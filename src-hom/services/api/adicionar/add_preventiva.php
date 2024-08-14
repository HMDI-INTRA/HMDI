<?php
// Autor: Josélio Dias Mendonça

ini_set( 'display_errors', 1 );
ini_set( 'display_startup_errors', 1 );
error_reporting( E_ALL );

include_once '../../connection/conexao-mysql.php';


$dados_computador = filter_input_array( INPUT_POST, FILTER_DEFAULT );

$retorna = [];

try {
   
    if ( $conn ) {
      
        if ( !empty( $dados_computador[ 'patrimonio' ] ) ) {

            $query_inserir = "INSERT INTO cadastros.computadores 
                (patrimonio, descricao, custo, local_, data_prev, data_prox, observacao, tecnico, Andar, Monitor, hostName_Antigo, hostName_Novo, login, modelo, sistema_Operacional, perifericos, office) 
                VALUES 
                (:patrimonio, :descricao, :custo, :local_, :data_prev, :data_prox, :observacao, :tecnico, :Andar, :Monitor, :hostName_Antigo, :hostName_Novo, :login, :modelo, :sistema_Operacional, :perifericos, :office)";

            $cad_computador = $conn->prepare( $query_inserir );


            $cad_computador->bindParam( ':patrimonio', $dados_computador[ 'patrimonio' ] );
            $cad_computador->bindParam( ':descricao', $dados_computador[ 'descricao' ] );
            $cad_computador->bindParam( ':custo', $dados_computador[ 'custo' ] );
            $cad_computador->bindParam( ':local_', $dados_computador[ 'local_' ] );
            $cad_computador->bindParam( ':data_prev', $dados_computador[ 'dataPrev' ] );
            $cad_computador->bindParam( ':data_prox', $dados_computador[ 'dataProx' ] );
            $cad_computador->bindParam( ':observacao', $dados_computador[ 'observacao' ] );
            $cad_computador->bindParam( ':tecnico', $dados_computador[ 'tecnico' ] );
            $cad_computador->bindParam( ':Andar', $dados_computador[ 'andar' ] );
            $cad_computador->bindParam( ':Monitor', $dados_computador[ 'monitor' ] );
            $cad_computador->bindParam( ':hostName_Antigo', $dados_computador[ 'hostAntigo' ] );
            $cad_computador->bindParam( ':hostName_Novo', $dados_computador[ 'hostNovo' ] );
            $cad_computador->bindParam( ':login', $dados_computador[ 'login' ] );
            $cad_computador->bindParam( ':modelo', $dados_computador[ 'modelo' ] );
            $cad_computador->bindParam( ':sistema_Operacional', $dados_computador[ 'sistemaOperacional' ] );
            $cad_computador->bindParam( ':perifericos', $dados_computador[ 'perifericos' ] );
            $cad_computador->bindParam( ':office', $dados_computador[ 'office' ] );

            if ( $cad_computador->execute() ) {
                $retorna = [ 'status' => true, 'msg' => "<div class='alert alert-success' role='alert'>Computador cadastrado com sucesso!</div>" ];
            } else {
                throw new Exception( 'Erro: não foi possível cadastrar o computador.' );
            }
        } else {
            throw new Exception( "Erro: o campo 'patrimonio' não pode ser vazio." );
        }
    } else {
        throw new Exception( 'Erro: falha na conexão com o banco de dados.' );
    }
} catch ( Exception $e ) {
    $retorna = [ 'status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>" . $e->getMessage() . '</div>' ];
}

echo json_encode( $retorna );
?>
