<?php

include_once '../../api/conversorRtf.php';

// Load Composer autoloader
require __DIR__ . '/vendor/autoload.php';

use Dompdf\Dompdf;

$dompdf = new Dompdf(['enable_remote' => true]);

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Validate JSON data
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Invalid JSON data.']);
        exit;
    }

    // Check if the 'data' key exists and is not empty
    if (empty($requestData['data'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Data is missing or empty.']);
        exit;
    }

    $html = '';

    foreach ($requestData['data'] as $index => $entry) {
        $rtf = $entry['textresult'];

        $reader = new RtfReader();
        $reader->Parse($rtf);
        $formatter = new RtfHtml();
        $htmlResult = $formatter->Format($reader->root);

        $pageBreakStyle = ($index > 0) ? 'page-break-before: always;' : '';

        $numseq = $entry['numseq'];

        $html .= "
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'>
            <style>
                .custom-text-color {
                    color: #344767;
                }

                .float-civil{
                    position: relative;
                    left: 50%;
                    bottom: 12.3%;
                }

                .float-sexo{
                    position: relative;
                    left: 50%;
                    bottom: 12.8%;
                }

                .float-cancelado {
                    position: relative;
                    left: 50%;
                    bottom: 12.7%;
                }
            </style>
            <div class='container-fluid custom-text-color' style='width: 100%; $pageBreakStyle'>
                <div class='row'>
                    <div class='col-12'>
                        <div class='card'>
                        <img class='card-img-top' src='http://10.1.1.108/intranet/src/assets/img/logo.png' alt='Logo'>
                        <div class='card-body'>
                                <div class='row mb-3'>
                                <div class='col-4'>
                                <p class='card-text'><b>Nome do paciente:</b> {$entry['nomepac']}</p>
                                <p class='card-text'><strong>Liberado:</strong> " . ($entry['liberado'] === 'S' ? 'Sim' : ($entry['liberado'] === 'N' ? 'Não' : 'Desconhecido')) . "</p>
                                <p class='card-text'><strong>Data da digitação:</strong> " . (empty($entry['datadigit']) ? 'N/A' : date('d/m/Y H:i:s', strtotime($entry['datadigit']))) . "</p>
                                <p class='card-text'><strong>Data da liberação:</strong> " . (empty($entry['datalib']) ? 'N/A' : date('d/m/Y H:i:s', strtotime($entry['datalib']))) . "</p>
                                </div>
                                <div class='col-4'>
                                <p class='card-text float-civil'><strong>Número de prescrição:</strong> {$entry['numreqserv']}</p>
                                <p class='card-text float-sexo'><strong>Assinada eletrônicamente:</strong> " . ($entry['assinaelet'] === 'S' ? 'Sim' : ($entry['assinaelet'] === 'N' ? 'Não' : 'Desconhecido')) . "</p>
                                <p class='card-text float-cancelado'><b>Assinada por:</b> {$entry['nomeprest']}</p>
                                </div>
                                </div>
                        <div class='row'>
                            <div class='row mb-12'>
                                <h5 class='h5 text-center'>Resultado laboratorial:  $numitem</h5>
                                <div class='corpotexto'>$htmlResult</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";
    }

    // Configure Dompdf options
    $dompdf->set_option('isHtml5ParserEnabled', true);
    $dompdf->set_option('isPhpEnabled', true);
    $dompdf->set_option('isPhpExecuting', true);

    // Load HTML content into Dompdf
    $dompdf->loadHtml($html);

    // Set paper size and orientation
    $dompdf->setPaper('A4', 'portrait');

    // Render HTML to PDF
    $dompdf->render();

    // Output the PDF
    $output = $dompdf->output();

    // Force download of the file
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="documento.pdf"');
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
