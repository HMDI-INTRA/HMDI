<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once('../../connection/conexao-mysql.php');

require __DIR__ . '/vendor/autoload.php';

use Dompdf\Dompdf;

$dompdf = new Dompdf(['enable_remote' => true]);

if (!empty($_GET['dataInicio']) || !empty($_GET['dataFinal'])) {
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

    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $html = '';

    $html = "
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'>
    <style>
        body {
            font-size: 10px;
            font-family: Arial, sans-serif;
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .card-img-top {
            width: 40%;
            margin: 0 auto; 
            display: block;
            border-radius: 10px 10px 0 0; 
        }
        .card {
            margin-bottom: 20px;
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .card-header {
            background-color: #f2f2f2;
            border-bottom: none;
            border-radius: 10px 10px 0 0;
            padding: 15px;
        }
        .card-body {
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
        .total {
            margin-top: 20px;
            font-weight: bold;
        }
    </style>
    <div class='col-12'>
        <div class='card'>
            <img class='card-img-top' src='http://10.1.1.108/intranet/src/assets/img/logo.png' alt='Logo'>
        </div>
    </div>
    <div class='col-12 mt-4'>
        <div class='card'>
            <div class='card-body'>
                <h5 class='card-title'>Exames - Administrativo</h5>
                <table class='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Nome do Paciente</th>
                            <th scope='col'>Exame</th>
                            <th scope='col'>Local</th>
                            <th scope='col'>Prescrição</th>
                            <th scope='col'>Atendimento</th>
                            <th scope='col'>Coletador</th>
                            <th scope='col'>Hora da Coleta</th>
                            <th scope='col'>Hora da Baixa</th>
                            <th scope='col'>Data Lançamento</th>
                            <th scope='col'>Data Nascimento</th>
                            <th scope='col'>Punção</th>
                        </tr>
                    </thead>
                    <tbody>
";

    foreach ($rows as $row) {
        $html .= "
        <tr>
            <td>{$row['nome']}</td>
            <td>{$row['ds_exame']}</td>
            <td>{$row['local']}</td>
            <td>{$row['nr_prescricao']}</td>
            <td>{$row['nr_atendimento']}</td>
            <td>{$row['coletador']}</td>
            <td>{$row['hora_entrada']}</td>
            <td>{$row['hora_chegada']}</td>
            <td>" . date('d/m/Y', strtotime($row['dt_lancamento'])) . "</td>
            <td>" . date('d/m/Y', strtotime($row['dt_nascimento'])) . "</td>
            <td>" . ($row['puncao'] === 'sim' ? (intval($row['total']) + intval($row['descricao'])) : 'Não especificado') . "</td>
        </tr>";
    }
    $html .= "
                    </tbody>
                </table>
            </div>
        </div>
    </div>
";
    // Configure Dompdf options
    $dompdf->set_option('isHtml5ParserEnabled', true);
    $dompdf->set_option('isPhpEnabled', true);
    $dompdf->set_option('isPhpExecuting', true);

    // Load HTML content into Dompdf
    $dompdf->loadHtml($html);

    // Set paper size and orientation
    $dompdf->setPaper('A4', 'landscape');
    // Render HTML to PDF
    $dompdf->render();

    // Output the PDF
    $output = $dompdf->output();

    // Force download of the file
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="documento.pdf"');
    header('Content-Transfer-Encoding: binary');
    header('Content-Length: ' . strlen($output));
    header('Accept-Ranges: bytes');

    // Output the PDF content
    echo $output;
    exit;
} else {
    // If it's not a POST request
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}
?>
