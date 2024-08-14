<?php
//Autor: Josélio Dias Mendonça
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once '../connection/conexao-mysql.php';

try {
    $query = "SELECT 
    to_char(dt_aih, 'DD/MM/YYYY') as dt_aih, 
    id, nr_prontuario , 
    nm_paciente , 
    to_char(dt_nascimento , 'DD/MM/YYYY') as dt_nascimento, 
    cd_protocolo ,
    cd_senha_aih , 
    ds_municipio , 
    cd_procedimento , 
    ds_procedimento ,
    ds_observacao ,
    ds_medico_exec ,
    ds_inativado  ,
    to_char(dt_inativacao , 'DD/MM/YYYY') as dt_inativacao ,
    ds_realizado,
    to_char(dt_medico_exec , 'YYYY-MM-DD') as dt_medico_exec,
    dt_medico_exec as dt_medico_exe,
    to_char(dt_realizacao , 'DD/MM/YYYY') as dt_atualizacao FROM cadastros.aih_eletivas;";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $eletivas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($eletivas, JSON_UNESCAPED_UNICODE); 
    header('Content-Type: application/json; charset=utf-8');
    echo $json;
} catch (PDOException $e) {
    die("Erro na consulta ao banco de dados: " . $e->getMessage());
}
?>