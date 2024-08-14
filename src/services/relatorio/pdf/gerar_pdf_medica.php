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
        $rtf = $entry['corpotexto'];

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
                    left: 40%;
                    bottom: 31.3%;
                }

                .float-sexo{
                    position: relative;
                    left: 65%;
                    bottom: 37.2%;
                }

                .float-sus {
                    position: relative;
                    left: 65%;
                    bottom: 13.4%;
                }

                .float-cancelado {
                    position: relative;
                    left: 65%;
                    bottom: 13.4%;
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
                                    <p class='card-text'><strong>Número de prescrição:</strong> {$entry['codpac']}</p>
                                    <p class='card-text'><b>Nome do paciente:</b> {$entry['nomepac']}</p>
                                    <p class='card-text'><b>Nome da mãe:</b> " . ($entry['nomemae'] ?: 'N/A') . "</p>
                                    <p class='card-text'><b>Procedimento:</b> " . ($entry['desprocgen'] ?: 'N/A') . "</p>
                                    <p class='card-text'><strong>Data de atendimento:</strong> " . (empty($entry['datatend']) ? 'N/A' : date('d/m/Y H:i:s', strtotime($entry['datatend']))) . "</p>
                                    <p class='card-text'><b>Data de nascimento:</b> " . (empty($entry['datanasc']) ? 'N/A' : (new DateTime($entry['datanasc']))->format('d/m/Y')) . "</p>
                                </div>
                                <div class='col-4'>
                                    <p class='card-text float-civil'><strong>Estado civil:</strong> " . ($entry['estadociv'] === 'S' ? 'Solteiro' : ($entry['estadociv'] === 'C' ? 'Casado' : 'Desconhecido')) . "</p>
                                    <p class='card-text float-sexo'><strong>Sexo:</strong> " . ($entry['sexo'] === 'F' ? 'Feminino' : ($entry['sexo'] === 'M' ? 'Masculino' : 'Desconhecido')) . "</p>
                                    </div>
                                    <p class='card-text float-sus'><strong>Cartão SUS:</strong> {$entry['cartaosus']}</p>
                                    <p class='card-text float-cancelado '><strong>Cancelada:</strong> " . ($entry['cancelada'] === 'N' ? 'Não' : ($entry['cancelada'] === 'S' ? $entry['moticancel'] : 'Desconhecido')) . "</p>
                                </div>
                                </div>
                        <div class='row'>
                            <div class='row mb-12'>
                                <h5 class='h5 text-center'>Evolução Médica:  $numseq</h5>
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
