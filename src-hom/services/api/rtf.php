<?php
include_once 'conversorRtf.php';

if (isset($_POST['rtf'])) {
    $rtf = $_POST['rtf'];
    $reader = new RtfReader();
    $reader->Parse($rtf);
    $formatter = new RtfHtml();
    $htmlResult = $formatter->Format($reader->root);

    $response = [
        'success' => true,
        'htmlResult' => $htmlResult
    ];
    
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response, JSON_UNESCAPED_SLASHES);
    exit();
} else {
    $response = [
        'success' => false,
        'error' => 'Parâmetro "rtf" não encontrado no POST.'
    ];

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);
    exit();
}
?>