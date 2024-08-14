<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once('../../connection/conexao-mysql.php');

$laboratorio = 'Laboratorio_Triagem.xls';

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
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Nome do Paciente</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Estabelecimento</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Nº Prescrição</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Nº Atendimento</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Exame</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Local</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Data de Entrada</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Confirmação</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Observação</th>
<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Status</th>
</tr>
</thead>
<tbody>';

if (!empty($_GET['dataInicio']) && !empty($_GET['dataFinal']) && !empty($_GET['ds_clinica'])) {
    $dataInicio = date('Y-m-d', strtotime($_GET['dataInicio']));
    $dataFinal = date('Y-m-d', strtotime($_GET['dataFinal']));
    $dsLocal = $_GET['ds_clinica'];

    $sql = "SELECT * FROM cadastros.laboratorio_triagem 
            WHERE DATE(dt_atualizacao) BETWEEN :dataInicio AND :dataFinal ";

    if (in_array($dsLocal, ['OK', 'AGUARDANDO RESULTADO', 'RECOLETA'])) {
        $sql .= "AND cd_confirmacao = :dsLocal ";
    } else {
        $sql .= "AND ds_local = :dsLocal ";
    }

    $sql .= "ORDER BY dt_atualizacao";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':dataInicio', $dataInicio);
    $stmt->bindParam(':dataFinal', $dataFinal);
    $stmt->bindParam(':dsLocal', $dsLocal);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($rows as $row_msg_contatos) {
        $confirmationStyle = '';
        switch ($row_msg_contatos["cd_confirmacao"]) {
            case 'OK':
                $confirmationStyle = 'background-color: #28a745;';
                break;
            case 'ERRO AO ANEXAR TASY':
            case 'ERRO AO ABRIR ATENDIMENTO':
            case 'ERRO AO ABRIR PRESCRIÇÂO':
            case 'ERRO AO ANEXAR NO TASY':
            case 'INDISPONÍVEL':
                $confirmationStyle = 'background-color: #dc3545;';
                break;
            case 'CANCELADO NO TASY':
            case 'NÃO LOCALIZADO':
            case 'RECOLETA':
            case 'NÃO ESTÁ PRONTO':
                $confirmationStyle = 'background-color: #ffc107;';
                break;
        }
        $html .= '<tr>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["nm_paciente"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["cd_estabelecimento"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["nr_prescricao"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["nr_atendimento"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["ds_exame"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["ds_local"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["dt_entrada"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px; ' . $confirmationStyle . '">' . htmlspecialchars($row_msg_contatos["cd_confirmacao"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["ds_observacao"]) . '</td>';
        $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["status"]) . '</td>';
        $html .= '</tr>';
    }
}

$html .= '</tbody>';
$html .= '</table>
</body>
</html>';

header("Content-type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename={$laboratorio}");
echo $html;
exit;
?>
