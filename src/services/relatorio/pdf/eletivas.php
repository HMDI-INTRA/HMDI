<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once('../../connection/conexao-mysql.php');
require __DIR__ . '/vendor/autoload.php';
use Dompdf\Dompdf;
use PDO;
$dompdf = new Dompdf(['enable_remote' => true]);

if (!empty($_GET['dataInicio']) && !empty($_GET['dataFinal'])) {
    $dataInicio = date('Y-m-d', strtotime($_GET['dataInicio']));
    $dataFinal = date('Y-m-d', strtotime($_GET['dataFinal']));
    $status = isset($_GET['status']) ? $_GET['status'] : '';
    $medico = isset($_GET['medico']) ? $_GET['medico'] : null;
    $procedimento = isset($_GET['procedimento']) ? $_GET['procedimento'] : null;

    $sql = "SELECT 
        to_char(dt_aih, 'DD/MM/YYYY') as dt_aih, 
        id, nr_prontuario, nm_paciente, 
        to_char(dt_nascimento, 'DD/MM/YYYY') as dt_nascimento, 
        cd_protocolo, cd_senha_aih, ds_municipio, 
        cd_procedimento, ds_procedimento, ds_observacao, 
        ds_medico_exec, ds_inativado, 
        to_char(dt_inativacao, 'DD/MM/YYYY') as dt_inativacao, 
        ds_realizado, to_char(dt_medico_exec, 'DD/MM/YYYY') as dt_atualizacao 
        FROM cadastros.aih_eletivas 
        WHERE dt_medico_exec BETWEEN :dataInicio AND :dataFinal ";

    if (!empty($medico)) {
        $sql .= " AND (ds_medico_exec = :medico)";
    }

    if (!empty($procedimento)) {
        $sql .= " AND (cd_procedimento = :procedimento)";
    }
    if ($status === 'S') {
        $sql .= " AND ds_realizado = 'S'";
    } elseif ($status === 'I') {
        $sql .= " AND ds_inativado = 'I'";
    } elseif ($status === 'N') {
        $sql .= " AND ds_realizado = 'N' AND ds_inativado IS NULL";
    }

    $sql .= " ORDER BY dt_medico_exec";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':dataInicio', $dataInicio, PDO::PARAM_STR);
    $stmt->bindParam(':dataFinal', $dataFinal, PDO::PARAM_STR);
    if (!empty($medico)) {
        $stmt->bindParam(':medico', $medico, PDO::PARAM_STR);
    }
    if (!empty($procedimento)) {
        $stmt->bindParam(':procedimento', $procedimento, PDO::PARAM_STR);
    }
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

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
                <h5 class='card-title'>Relatorio Eletivas</h5>
                <table class='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Data Aih</th>
                            <th scope='col'>Prontuario</th>
                            <th scope='col'>Paciênte</th>
                            <th scope='col'>dt_nascimento</th>
                            <th scope='col'>cd_protocolo</th>
                            <th scope='col'>ds_procedimento</th>
                            <th scope='col'>cd_procedimento</th>
                            <th scope='col'>ds_observacao</th>
                            <th scope='col'>Data realiçao</th>
                            <th scope='col'>Médico</th>
                        </tr>
                    </thead>
                    <tbody>";
        $linha = 0;
    foreach ($rows as $row) {
        $linha++;
        $html .= "
        <tr>  
            <td>{$row['dt_aih']}</td>
            <td>{$row['nr_prontuario']}</td>
            <td>{$row['nm_paciente']}</td>
            <td>{$row['dt_nascimento']}</td>
            <td>{$row['cd_protocolo']}</td>
            <td>{$row['ds_procedimento']}</td>
            <td>{$row['cd_procedimento']}</td>
            <td>{$row['ds_observacao']}</td>
            <td>{$row['dt_atualizacao']}</td>
            <td>{$row['ds_medico_exec']}</td>
        </tr>";
    }
    $html .= "
                    </tbody>
                </table>
                <p>Total de procedimentos: $linha</p>
            </div>
        </div>
    </div>";

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
