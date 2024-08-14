<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	include_once('../../connection/conexao-mysql.php');
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title></title>
</head>
<body>

<?php

$arquivo = 'Preventivas.xls';
$html = '';
$html .= '<table border="1">';
$html .= '<tr>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">PATRIMONIO</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">DESCRICAO</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">CUSTO</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">LOCAL</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">DATA DA PREVENTIVA</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">DATA DA PROX PREVENTIVA</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">OBSERVACAO</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">TECNICO</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">ANDAR</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">MONITOR</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">HOSTNAME ANTERIOR</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">HOSTNAME NOVO</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">LOGIN</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">SISTEMA OPERACIONAL</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">PERIFERICOS</td>';
$html .= '<td style="background-color:#0d6efd;color:#ffffff;">OFFICE</td>';
$html .= '</tr>';

$sql = "SELECT * FROM cadastros.computadores";
$stmt = $conn->prepare($sql);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($rows as $row_msg_contatos) {
	$html .= '<tr>';
	$html .= '<td>'.$row_msg_contatos["patrimonio"].'</td>';
	$html .= '<td>'.$row_msg_contatos["descricao"].'</td>';
	$html .= '<td>'.$row_msg_contatos["custo"].'</td>';
	$html .= '<td>'.$row_msg_contatos["local_"].'</td>';
	$html .= '<td>'.$row_msg_contatos["data_prev"].'</td>';
	$html .= '<td>'.$row_msg_contatos["data_prox"].'</td>';
	$html .= '<td>'.$row_msg_contatos["observacao"].'</td>';
	$html .= '<td>'.$row_msg_contatos["tecnico"].'</td>';
	$html .= '<td>'.$row_msg_contatos["Andar"].'</td>';
	$html .= '<td>'.$row_msg_contatos["Monitor"].'</td>';
	$html .= '<td>'.$row_msg_contatos["hostName_Antigo"].'</td>';
	$html .= '<td>'.$row_msg_contatos["hostName_Novo"].'</td>';
	$html .= '<td>'.$row_msg_contatos["login"].'</td>';
	$html .= '<td>'.$row_msg_contatos["sistema_Operacional"].'</td>';
	$html .= '<td>'.$row_msg_contatos["perifericos"].'</td>';
	$html .= '<td>'.$row_msg_contatos["office"].'</td>';
	$html .= '</tr>';
	;
}

header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
header ("Cache-Control: no-cache, must-revalidate");
header ("Pragma: no-cache");
header ("Content-type: application/x-msexcel");
header ("Content-Disposition: attachment; filename=\"{$arquivo}\"" );
header ("Content-Description: PHP Generated Data" );
echo $html;
exit; ?>

	
</body>
</html>