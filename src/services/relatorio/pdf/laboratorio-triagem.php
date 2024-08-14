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
    $dsLocal = $_GET['ds_clinica']; 

    if (in_array($dsLocal, ['OK', 'AGUARDANDO RESULTADO', 'RECOLETA'])) {
        $sql = "SELECT * FROM cadastros.laboratorio_triagem 
                WHERE DATE(dt_atualizacao) BETWEEN :dataInicio AND :dataFinal 
                AND cd_confirmacao = :dsLocal 
                ORDER BY dt_atualizacao";
    } else {
        $sql = "SELECT * FROM cadastros.laboratorio_triagem 
                WHERE DATE(dt_atualizacao) BETWEEN :dataInicio AND :dataFinal 
                AND ds_local = :dsLocal 
                ORDER BY dt_atualizacao";
    }
    

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':dataInicio', $dataInicio);
    $stmt->bindParam(':dataFinal', $dataFinal);
    $stmt->bindParam(':dsLocal', $dsLocal);

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
                <h5 class='card-title'>Exames - Triagem</h5>
                <table class='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Nome do Paciente</th>
                            <th scope='col'>Estabelecimento</th>
                            <th scope='col'>Nº Prescrição</th>
                            <th scope='col'>Nº Atendimento</th>
                            <th scope='col'>Exame</th>
                            <th scope='col'>Local</th>
                            <th scope='col'>Data de Entrada</th>
                            <th scope='col'>Confirmação</th>
                            <th scope='col'>Motivo</th>
                            <th scope='col'>Observação</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            ";

            foreach ($rows as $row) {
                $confirmationStyle = '';
                switch ($row['cd_confirmacao']) {
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
            
                $html .= "
                    <tr>
                        <td>{$row['nm_paciente']}</td>
                        <td>{$row['cd_estabelecimento']}</td>
                        <td>{$row['nr_prescricao']}</td>
                        <td>{$row['nr_atendimento']}</td>
                        <td>{$row['ds_exame']}</td>
                        <td>{$row['ds_local']}</td>
                        <td>" . date('d/m/Y', strtotime($row['dt_entrada'])) . "</td>
                        <td style='{$confirmationStyle}'>{$row['cd_confirmacao']}</td>
                        <td>{$row['recoleta']}</td>
                        <td>{$row['ds_observacao']}</td>
                        <td>{$row['status']}</td>
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
