<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once('../../connection/conexao-mysql.php');

require __DIR__ . '/vendor/autoload.php';

use Dompdf\Dompdf;

$dompdf = new Dompdf(['enable_remote' => true]);

if (!empty($_GET['dtInicial']) || !empty($_GET['dtFinal'])) {
    $dtInicial = date('m/Y', strtotime($_GET['dtInicial']));
    $dtFinal = date('m/Y', strtotime($_GET['dtFinal']));
    $nm_indicador = $_GET['nm_indicador'];

    $sql = "SELECT * 
    FROM cadastros.analise_dash_indicadores 
    WHERE STR_TO_DATE(dt_indicador, '%m/%Y') BETWEEN STR_TO_DATE(:dtInicial, '%m/%Y') AND STR_TO_DATE(:dtFinal, '%m/%Y')";
    $sql .= " AND nm_indicador = :nm_indicador AND nm_indicador IS NOT NULL";

    $sql .= " ORDER BY dt_indicador";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':dtInicial', $dtInicial);
    $stmt->bindParam(':dtFinal', $dtFinal);
    $stmt->bindParam(':nm_indicador', $nm_indicador);    

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
                <h5 class='card-title'>Relatório de Indicadores</h5>
                <table class='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Data</th>
                            <th scope='col'>Indicador</th>
                            <th scope='col'>Analise</th>
                            <th scope='col'>Plano de Ação</th>
                        </tr>
                    </thead>
                    <tbody>
";

    foreach ($rows as $row) {
        $html .= "
        <tr>
            <td>{$row['dt_indicador']}</td>
            <td>{$row['nm_indicador']}</td>
            <td>{$row['analise_indicador']}</td>
            <td>{$row['plano_acao_indicador']}</td>
        </tr>";
    }
    $html .= "
                    </tbody>
                </table>
            </div>
        </div>
    </div>
";

    $dompdf->set_option('isHtml5ParserEnabled', true);
    $dompdf->set_option('isPhpEnabled', true);
    $dompdf->set_option('isPhpExecuting', true);


    $dompdf->loadHtml($html);


    $dompdf->setPaper('A4', 'landscape');

    $dompdf->render();

    $output = $dompdf->output();


    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="documento.pdf"');
    header('Content-Transfer-Encoding: binary');
    header('Content-Length: ' . strlen($output));
    header('Accept-Ranges: bytes');

    echo $output;
    exit;
} else {
    http_response_code(405); 
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}
?>
