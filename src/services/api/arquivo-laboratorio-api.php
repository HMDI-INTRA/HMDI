<?php
//Autor: Josélio Dias Mendonça

ini_set( 'display_errors', 1 );
ini_set( 'display_startup_errors', 1 );
error_reporting( E_ALL );

include_once '../connection/conexao-postgresql.php';

if ( !empty( $_GET[ 'nomepac' ] ) || !empty( $_GET[ 'codpac' ] ) ) {
    try {
        $nomepac = $_GET[ 'nomepac' ];
        $codpac = $_GET[ 'codpac' ];
        $datanasc = isset( $_GET[ 'datanasc' ] ) ? $_GET[ 'datanasc' ] : null;
        $query_usuarios = "SELECT *
        FROM \"PACIENTE\".cabserv a
        LEFT JOIN \"PACIENTE\".arqatend b ON a.numatend = b.numatend
        LEFT JOIN \"PACIENTE\".cadpac c ON b.codpac = c.codpac
        WHERE 1 = 1";

        if ( !empty( $codpac ) ) {
            $query_usuarios .= ' AND c.codpac = :codpac';
        }
        if ( !empty( $nomepac ) ) {
            $query_usuarios .= ' AND c.nomepac = :nomepac';
        }

        if ( $datanasc ) {
            $query_usuarios .= ' AND c.datanasc = :datanasc';
        }

        $result_usuarios = $conn->prepare( $query_usuarios );

        if ( !empty( $codpac ) ) {
            $result_usuarios->bindParam( ':codpac', $codpac );
        }
        if ( !empty( $nomepac ) ) {
            $result_usuarios->bindParam( ':nomepac', $nomepac );
        }

        // Bind do parâmetro de datanasc, se estiver definido
        if ( $datanasc ) {
            $result_usuarios->bindParam( ':datanasc', $datanasc );
        }

        // Executar a consulta
        $result_usuarios->execute();

        // Obter os resultados como um array associativo
        $result_array = $result_usuarios->fetchAll( PDO::FETCH_ASSOC );

        // Retornar os resultados como JSON
        header( 'Content-Type: application/json' );
        echo json_encode( $result_array );

    } catch ( PDOException $e ) {
        // Em caso de erro, você pode retornar um JSON com uma mensagem de erro
        header( 'Content-Type: application/json' );
        echo json_encode( [ 'error' => $e->getMessage() ] );
    }
} else {
    // Se os parâmetros não forem fornecidos corretamente, trazer todos os dados com limite de 500
    try {
        $query_todos = "SELECT *
        FROM \"PACIENTE\".cabserv a
        LEFT JOIN \"PACIENTE\".arqatend b ON a.numatend = b.numatend
        LEFT JOIN \"PACIENTE\".cadpac c ON b.codpac = c.codpac
        LIMIT 250";

        // Preparar a consulta
        $result_todos = $conn->prepare( $query_todos );

        // Executar a consulta
        $result_todos->execute();

        // Obter os resultados como um array associativo
        $result_array_todos = $result_todos->fetchAll( PDO::FETCH_ASSOC );

        // Retornar os resultados como JSON
        header( 'Content-Type: application/json' );
        echo json_encode( $result_array_todos );

    } catch ( PDOException $e ) {
        // Em caso de erro, você pode retornar um JSON com uma mensagem de erro
        header( 'Content-Type: application/json' );
        echo json_encode( [ 'error' => $e->getMessage() ] );
    }
}
?>
