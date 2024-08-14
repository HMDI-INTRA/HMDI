<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once('../../connection/conexao-mysql.php');

$nir = 'Nir Eletivas.xls';

$html = '<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório Laboratório Triagem</title>
</head>
<body>
<table style="border-collapse: collapse; width: 100%;">
<thead>
<tr>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Prontuario</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Paciênte</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">dt_nascimento</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">cd_protocolo</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">ds_procedimento</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">cd_procedimento</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">ds_observacao</th>
</tr>
</thead>
<tbody>';

if (!empty($_GET['dataInicio']) || !empty($_GET['dataFinal'])) {
    $dataInicio = date('Y-m-d', strtotime($_GET['dataInicio']));
    $dataFinal = date('Y-m-d', strtotime($_GET['dataFinal']));

    $sql = "SELECT 
    to_char(dt_aih, 'DD/MM/YYYY') as dt_aih, 
    id, 
    nr_prontuario , 
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
    to_char(dt_realizacao , 'DD/MM/YYYY hh24:mm:ss') as dt_atualizacao FROM cadastros.aih_eletivas";

if (!empty($_GET['dataInicio']) && !empty($_GET['dataFinal'])) {
    $sql .= " WHERE dt_realizacao BETWEEN :dataInicio AND :dataFinal";
}

$sql .= " ORDER BY dt_realizacao";
$stmt = $conn->prepare($sql);

if (!empty($_GET['dataInicio']) && !empty($_GET['dataFinal'])) {
    $stmt->bindParam(':dataInicio', $dataInicio);
    $stmt->bindParam(':dataFinal', $dataFinal);
}
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($rows as $row_msg_contatos) {
        }
        $html .= '<tr>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["nr_prontuario"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["nm_paciente"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["dt_nascimento"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["cd_protocolo"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["ds_procedimento"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["cd_procedimento"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["ds_observacao"]) . '</td>';
        $html .= '</tr>';
}

$html .= '</tbody>';
$html .= '</table>
</body>
</html>';

header("Content-type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename={$nir}");
echo $html;
exit;
?>
