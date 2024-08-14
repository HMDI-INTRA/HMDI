<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once('../../connection/conexao-mysql.php');

$laboratorio = 'Laboratorio_Administrativo.xls';

// Inicialização do HTML
$html = '<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
<table style="border-collapse: collapse; width: 100%;">';

// Cabeçalho da tabela
$html .= '<thead>';
$html .= '<tr>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Paciente</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Data de Nascimento</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Data de Lançamento</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Hora da Coleta</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Hora da Baixa</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Coletador</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Nº Atendimento</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Nº Prescrição</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Local</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Exames</th>';
$html .= '<th style="background-color:#0d6efd;color:#ffffff; padding: 10px;">Punção</th>';
$html .= '</tr>';
$html .= '</thead>';

$html .= '<tbody>';

if (empty($_GET['dataInicio']) || empty($_GET['dataFinal'])) {
    // Caso as datas não sejam fornecidas, selecionar todos os registros
    $sql = "SELECT * FROM cadastros.laboratorio_adm";
    $stmt = $conn->prepare($sql);
} else {
    // Caso as datas sejam fornecidas, aplicar filtro
    $dataInicio = date('Y-m-d', strtotime($_GET['dataInicio']));
    $dataFinal = date('Y-m-d', strtotime($_GET['dataFinal']));
    $sql = "SELECT * FROM cadastros.laboratorio_adm WHERE dt_lancamento BETWEEN :dataInicio AND :dataFinal";

    if (!empty($_GET['ds_puncao']) && $_GET['ds_puncao'] == 'Sim') {
        $sql .= " AND puncao = 'sim' AND puncao IS NOT NULL";
    }

    $sql .= " ORDER BY dt_lancamento";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':dataInicio', $dataInicio);
    $stmt->bindParam(':dataFinal', $dataFinal);
}

$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Loop para gerar as linhas da tabela
foreach ($rows as $row_msg_contatos) {
    $html .= '<tr>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["nome"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["dt_nascimento"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["dt_lancamento"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["hora_entrada"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["hora_chegada"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["coletador"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["nr_atendimento"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["nr_prescricao"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["local"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos["ds_exame"]) . '</td>';
    $html .= '<td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars($row_msg_contatos['puncao'] === 'sim' ? $row_msg_contatos['descricao'] : 'Não especificado') . '</td>';
    $html .= '</tr>';
}

$html .= '</tbody>';

// Finalização do HTML e configuração dos cabeçalhos
$html .= '</table>
</body>
</html>';

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: public");
header("Content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: inline; filename=\"{$laboratorio}\"");
header("Content-Description: PHP Generated Data");
header('Content-Length: ' . strlen($html));
echo $html;
exit;
?>
