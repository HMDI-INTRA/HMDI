<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_FILES["pdfFile"]) && $_FILES["pdfFile"]["error"] === UPLOAD_ERR_OK) {
        $pdfFile = $_FILES["pdfFile"]["tmp_name"];
        $originalFilename = $_FILES["pdfFile"]["name"];
        $protectedFileName = 'protected_pdf_' . uniqid() . '.pdf';

        try {
            require_once('TCPDF/tcpdf.php');
            require_once('fpdi/src/autoload.php');

            $pdf = new setasign\Fpdi\Tcpdf\Fpdi();
            $pdf->SetProtection(array('print'), '');
            $pageCount = $pdf->setSourceFile($pdfFile);
            for ($pageNumber = 1; $pageNumber <= $pageCount; $pageNumber++) {
                $templateId = $pdf->importPage($pageNumber);
                $pdf->AddPage();
                $pdf->useTemplate($templateId);
            }

            header('Content-Type: application/pdf');
            header('Content-Disposition: attachment; filename="' . $originalFilename . '"');

            $pdf->Output($originalFilename, 'D');
            exit(); 

        } catch (Exception $e) {
            echo $e->getMessage();
        }
    } else {
        echo "É necessário enviar um arquivo PDF.";
    }
}
?>
