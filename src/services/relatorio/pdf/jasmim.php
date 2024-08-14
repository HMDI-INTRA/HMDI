<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once('../../connection/conexao-mysql.php'); 
require_once __DIR__ . '/vendor/autoload.php'; 

use Dompdf\Dompdf;

function removeImages($content) {
    if ($content !== null) {
        $pattern = '/<img[^>]*>/';
        $content = preg_replace($pattern, '', $content);
    }
    return $content;
}

$dompdf = new Dompdf(['enable_remote' => true]);

if (!empty($_GET['dataInicio']) && !empty($_GET['dataFinal']) && !empty($_GET['ds_periodo'])) {
    $dataInicio = date('Y-m-d', strtotime($_GET['dataInicio'] . ' -1 day'));
    $dataFinal = date('Y-m-d', strtotime($_GET['dataFinal'] . ' +2 days')); 
    $ds_periodo = $_GET['ds_periodo'];

    $titulo = "Mapa de Internação Jasmim - ";
    if ($ds_periodo == 'D' || $ds_periodo == 'N') {
        $periodo = ($ds_periodo == 'N') ? 'Noturno' : 'Diurno';
        $titulo .= " $periodo";
    } elseif ($ds_periodo == 'AD') {
        $titulo .= "Alta";
    }elseif ($ds_periodo == 'AN') {
        $titulo .= "Alta";
    }

    $html = "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'>
             <style>
                body {font-size: 8px; font-family: 'Montserrat', sans-serif; color: #000;}
                .logo {text-align: center; margin-bottom: 20px;}
                .card-img-top {width: 30%; margin: 0 auto; display: block; border-radius: 10px 10px 0 0; float: right;}
                .card {margin-bottom: 20px; border: none; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);}
                .card-header {background-color: #f2f2f2; border-bottom: none; border-radius: 10px 10px 0 0; padding: 15px;}
                .card-body {padding: 20px;}
                table {width: 100%; border-collapse: collapse; margin: 0; padding: 0;}
                th, td {border: 1px solid #ddd; padding: 2px; text-align: center; font-size: 9px; font-family: 'Montserrat', sans-serif; color: #000;}
                p {
                margin-top: 0 !important;
                margin-bottom: 0rem !important;
                }
                th {background-color: #f2f2f2;}
                .total {margin-top: 20px;}
                .legend-item {
                    display: inline-block;
                    
                    align-items: center;
                    margin-bottom: 5px;
                }
                .color-box {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
             </style>
             <div class='col-12'>
                <div class='card'>
                    <img class='card-img-top' src='http://10.1.1.108/intranet/wp-content/uploads/2022/01/Logo-HMDI-vr-2022.png' alt='Logo'>
                </div>
             </div>
             <div class='col-12 mt-4'>
                <div class='card'>
                    <div class='card-body'>
                        <h5 class='card-title'>$titulo</h5>
                        <div class='col-auto'>
                            <div class='legend-item'>
                                <div class='color-box' style='background-color: #7f3b8a9c;'></div>
                                <span>Medicamentos</span>
                            </div>
                            <div class='legend-item'>
                                <div class='color-box' style='background-color: red;'></div>
                                <span>Alergias</span>
                            </div>
                            <div class='legend-item'>
                                <div class='color-box' style='background-color: #6d0101;'></div>
                                <span>Transfusão</span>
                            </div>
                            <div class='legend-item'>
                                <div class='color-box' style='background-color: #1070ffdb;'></div>
                                <span>Exames e procedimentos</span>
                            </div>
                        </div>
                    </div>
                        <table class='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Leito</th>
                                    <th scope='col'>Nr Atendimento</th>
                                    <th scope='col'>Nome do Paciente</th>
                                    <th scope='col'>Idade</th>
                                    <th scope='col'>Dt Parto</th>
                                    <th scope='col'>Dt Admissao</th>
                                    <th scope='col'>Obs Adulto</th>
                                    <th scope='col'>Obs RN</th>
                                    <th scope='col'>Dieta</th>
                                    <th scope='col'>Fugulin</th>
                                    <th scope='col'>Dt Breaden/Morse/SAE</th>
                                    <th scope='col'>Dt SAE RN</th>
                                    <th scope='col'>Alta</th>
                                </tr>
                            </thead>
                            <tbody>";
                            $sql = "SELECT * FROM cadastros.mapa_risco_jasmin 
                            WHERE dt_atualizacao BETWEEN DATE_ADD(:dataInicio, INTERVAL -0 DAY) 
                                                    AND DATE_ADD(:dataFinal, INTERVAL 2 DAY)
                                                    AND cd_setor_atendimento = 264";
    if ($ds_periodo == 'D' || $ds_periodo == 'N') {
        $sql .= " AND ds_periodo = :ds_periodo AND dt_alta is null";
    } elseif ($ds_periodo == 'AD') {
        $sql .= " AND (ds_periodo = 'D' or ds_periodo = 'N')  AND dt_alta is not null";
    }
    $sql .= " ORDER BY ds_leito";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bindParam(':dataInicio', $dataInicio);
        $stmt->bindParam(':dataFinal', $dataFinal);
        if ($ds_periodo == 'D' || $ds_periodo == 'N') {
            $stmt->bindParam(':ds_periodo', $ds_periodo);
        }
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($rows as $row) {
            $obsAdulto = removeImages($row['ds_observacao_aduto']);
            $obsRn = removeImages($row['ds_observacao_rn']);
            $medicamento = $row['ds_medicamentos'];
            $alergias = $row['ds_alergias'];
            $tranfusao = $row['ds_transfusao'];
            $procedimetos = $row['ds_procedimentos'];
            $medicamentoRn = $row['ds_medicamentosRn'];
            $alergiasRn = $row['ds_alergiasRn'];
            $tranfusaoRn = $row['ds_transfusaoRn'];
            $procedimetosRn = $row['ds_procedimentosRn'];
            $braden_morse = $row['braden_morse'];
            $feto = $row['feto'];
            if($ds_periodo == 'AD'){
                $html .= "<tr> 
                            <td>{$row['ds_leito']}</td>
                            <td>{$row['nr_atendimento']}</td>
                            <td>{$row['nm_paciente']}</td>
                            <td>{$row['ds_idade']}</td>
                            <td>{$row['dt_parto']}</td>
                            <td>{$row['dt_admissao']}</td>
                            <td>{$obsAdulto}<div style='color: red; -webkit-background-clip: text; background-clip: text;'>{$alergias}</div> <div style='color: #6d0101; -webkit-background-clip: text; background-clip: text;'>{$tranfusao}</div></td>
                            <td>{$obsRn} <div>{$feto}</div> <div style='color: red; -webkit-background-clip: text; background-clip: text;'>{$alergiasRn}</div> <div style='color: #6d0101; -webkit-background-clip: text; background-clip: text;'>{$tranfusaoRn}</div></td>
                            <td>{$row['ds_dieta']}</td>
                            <td>{$row['ds_fugulin']}</td>
                            <td>{$braden_morse}</td>
                            <td>{$row['dt_sae_rn']}</td>
                            <td>{$row['dt_alta']}</td>
                            <td>{$row['ds_periodo']}</td>
                        </tr>";
            }else{
            $html .= "<tr>
                        <td>{$row['ds_leito']}</td>
                        <td>{$row['nr_atendimento']}</td>
                        <td>{$row['nm_paciente']}</td>
                        <td>{$row['ds_idade']}</td>
                        <td>{$row['dt_parto']}</td>
                        <td>{$row['dt_admissao']}</td>
                        <td>{$obsAdulto}<div style='color: red; -webkit-background-clip: text; background-clip: text;'>{$alergias}</div> <div style='color: #6d0101; -webkit-background-clip: text; background-clip: text;'>{$tranfusao}</div></td>
                        <td>{$obsRn} <div>{$feto}</div> <div style='color: red; -webkit-background-clip: text; background-clip: text;'>{$alergiasRn}</div> <div style='color: #6d0101; -webkit-background-clip: text; background-clip: text;'>{$tranfusaoRn}</div></td>
                        <td>{$row['ds_dieta']}</td>
                        <td>{$row['ds_fugulin']}</td>
                        <td>{$braden_morse}</td>
                        <td>{$row['dt_sae_rn']}</td>
                        <td>{$row['dt_alta']}</td>
                      </tr>";
            }
        }
    } else {
        echo "Failed to prepare SQL statement.";
    }

    $html .= "</tbody></table></div></div></div>";

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
