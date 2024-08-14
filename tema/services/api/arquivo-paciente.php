<?php
//Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../connection/conexao-postgresql.php'; 

if (isset($_GET['nomepac'])) {
    $search_name = $_GET['nomepac'];
} else {
    $search_name = '';
}

try {
   
    $query_pacientes = "SELECT nomepac FROM \"PACIENTE\".cadpac WHERE nomepac ILIKE :nomepac";
    $result_pacientes = $conn->prepare($query_pacientes);

   
    $search_name = $search_name . '%';


    $result_pacientes->bindParam(':nomepac', $search_name, PDO::PARAM_STR);
    $result_pacientes->execute();

 
    $matching_pacientes = $result_pacientes->fetchAll(PDO::FETCH_ASSOC);

    
    $response = array();
    foreach ($matching_pacientes as $paciente) {
        $response[] = $paciente['nomepac'];
    }
    echo json_encode($response);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
