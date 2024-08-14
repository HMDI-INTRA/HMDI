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
        FROM \"PACIENTE\".arqatend AS a
        LEFT JOIN \"PACIENTE\".cadserv AS c ON a.codserv = c.codserv
        LEFT JOIN \"PACIENTE\".cadpac AS b ON a.codpac = b.codpac
        WHERE 1 = 1";

        if ( !empty( $codpac ) ) {
            $query_usuarios .= ' AND b.codpac = :codpac';
        }
        if ( !empty( $nomepac ) ) {
            $query_usuarios .= ' AND b.nomepac = :nomepac';
        }

        if ( $datanasc ) {
            $query_usuarios .= ' AND b.datanasc = :datanasc';
        }

        $result_usuarios = $conn->prepare( $query_usuarios );

        if ( !empty( $codpac ) ) {
            $result_usuarios->bindParam( ':codpac', $codpac );
        }
        if ( !empty( $nomepac ) ) {
            $result_usuarios->bindParam( ':nomepac', $nomepac );
        }

        if ( $datanasc ) {
            $result_usuarios->bindParam( ':datanasc', $datanasc );
        }

        
        $result_usuarios->execute();
        $result_array = $result_usuarios->fetchAll( PDO::FETCH_ASSOC );

        header( 'Content-Type: application/json' );
        echo json_encode( $result_array );

    } catch ( PDOException $e ) {

        header( 'Content-Type: application/json' );
        echo json_encode( [ 'error' => $e->getMessage() ] );
    }
} else {
    try {
        $query_todos = "SELECT *
        FROM \"PACIENTE\".arqatend AS a
        LEFT JOIN \"PACIENTE\".cadserv AS c ON a.codserv = c.codserv
        LEFT JOIN \"PACIENTE\".cadpac AS b ON a.codpac = b.codpac
        LIMIT 250";
        $result_todos = $conn->prepare( $query_todos );

        $result_todos->execute();

        $result_array_todos = $result_todos->fetchAll( PDO::FETCH_ASSOC );

        header( 'Content-Type: application/json' );
        echo json_encode( $result_array_todos );

    } catch ( PDOException $e ) {
        header( 'Content-Type: application/json' );
        echo json_encode( [ 'error' => $e->getMessage() ] );
    }
}
?>