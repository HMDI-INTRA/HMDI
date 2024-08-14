<!-- Editado por: Josélio Dias Mendonça -->
<?php
session_start();
ob_start();
$session_lifetime = 43200; 
session_set_cookie_params($session_lifetime);
session_regenerate_id(true);
include_once '../services/connection/conexao-login.php';
if (!isset($_SESSION['id']) || !isset($_SESSION['nome'])) {
    $_SESSION['msg'] = "<p style='color: #ff0000'>Erro: Necessário realizar o login para acessar a página!</p>";
    header("Location: ../index.php");
    exit();
}
if ((!isset($_SESSION['id'])) and (!isset($_SESSION['nome']))) {
    $_SESSION['msg'] = "<p style='color: #ff0000'>Erro: Necessário realizar o login para acessar a página!</p>";
    header("Location: ../index.php");
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="shortcut icon" href="../assets/img/favicon.png" type="image/x-icon">
  <title>
    Hospital e Maternidade Dona Iris
  </title>
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-legend"></script>
  
  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">

<!-- DataTables Buttons CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.7.1/css/buttons.dataTables.min.css">


<!-- DataTables JS -->
<script type="text/javascript" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>


<!-- Inclua a biblioteca jQuery UI -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<!-- Se estiver usando um tema do jQuery UI, inclua-o também -->
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>

<!-- DataTables Buttons JS -->
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.print.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js"></script>
  <!-- Nucleo Icons -->
  <link href="../assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link id="pagestyle" href="../assets/css/argon-dashboard.css?v=2.0.4" rel="stylesheet" />
</head>

<body class="g-sidenav-show   bg-gray-100" id="body">
<div class="container-fluid navbar navbar-expand-lg navbar-light bg-light">

<a class="navbar-brand m-0" href="#">
    <img src="../assets/img/favicon.png" class="navbar-brand-img h-100" alt="main_logo">
</a>
<div class="collapse navbar-collapse" id="navbarScroll">
    <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
        <li class="nav-item dropdown dropdown-wide">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <?php if (isset($_SESSION['nome'])) {
                    $userName = $_SESSION['nome'];
                    echo "$userName";
                } ?>
            </button>
            <ul class="dropdown-menu" id="dropdownMenu" aria-labelledby="navbarScrollingDropdown">
                <?php include_once 'nivelAcessos.php'; ?>
            </ul>
        </li>
    </ul>
</div>

</div>
  <main class="main-content position-relative border-radius-lg ">
    <!-- Navbar -->
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" href="javascript:;">Página</a></li>
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Laboratório</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Laboratório</h6>
        </nav>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="nav-wrapper position-relative end-0">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" >
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="administrativo-tab" data-bs-toggle="tab" data-bs-target="#administrativo" type="button" role="tab" aria-controls="administrativo" aria-selected="true">Administrativo</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="triagem-tab" data-bs-toggle="tab" data-bs-target="#triagem" type="button" role="tab" aria-controls="triagem" aria-selected="false">Triagem</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="agencia-tab" data-bs-toggle="tab" data-bs-target="#agencia" type="button" role="tab" aria-controls="agencia" aria-selected="false">Agência Transfusional</button>
          </li>
        </ul>
        <div class="tab-content" id="ul-navContent">
          <div class="tab-pane fade show active" id="administrativo" role="tabpanel" aria-labelledby="administrativo-tab">
            <div class="col-12">
              <div class="card mb-4" style="border-radius: inherit;">
                <div class="card-header pb-0 p-3">
                  <div class="d-flex justify-content-between">
                    <h4 class="mb-2">Exames Administrativo</h4>
                    <div class="col-auto">
                      <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-labAdm">Adicionar</button>
                      <div class="dropdown button-table">
                        <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                        </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <li><button class="dropdown-item btn-default" data-bs-toggle="modal" data-bs-target="#modalAdmRelatorio">Relatório</button></li>
                          </ul>
                      </div>
                    </div>
                </div>
              </div>
                <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0 table-common-wrapper" id="tableLaboratorioAdm_wrapper">
                    <div style="overflow-x: auto;">
                        <table id="tableLaboratorioAdm" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">

                        </table>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="triagem" role="tabpanel" aria-labelledby="triagem-tab">
            <div class="col-12">
              <div class="card mb-4" style="border-radius: inherit;">
                <div class="card-header pb-0 p-3">
                  <div class="d-flex justify-content-between">
                    <h4 class="mb-2">Exames Triagem</h4>
                    <div class="col-auto">
                      <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-labTrigem">Adicionar</button>
                      <div class="dropdown button-table">
                        <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i> 
                        </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <li><button class="dropdown-item btn-default" data-bs-toggle="modal" data-bs-target="#modalTrigemRelatorioTriagem">Relatório</button></li>
                          </ul>
                        </div>
                    </div>
                </div>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0 table-common-wrapper" id="tableLaboratorioTrigemTable_wrapper">
                    <div style="overflow-x: auto;">
                        <table id="tableLaboratorioTrigemTable" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                        </table>
                    </div>
                    </div>
              </div>
            </div>
          </div>
          </div>
          <div class="tab-pane fade" id="agencia" role="tabpanel" aria-labelledby="agencia-tab">
            <div class="col-12">
              <div class="card mb-4" style="border-radius: inherit;">
                <div class="card-header pb-0 p-3">
                  <div class="d-flex justify-content-between">
                    <h4 class="mb-2" id="menu-agencia">Hemocomponentes</h4>
                    <div class="col-auto">
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuAgencia" data-bs-toggle="dropdown" aria-expanded="false">
                          Hemoterapia
                        </button>
                        <ul class="dropdown-menu nav-pills" aria-labelledby="dropdownMenuAgencia" id="pills-tab-agencia" role="tablist">
                          <li class="nav-item dropdown-item" role="presentation">
                            <button class="nav-link active" id="pills-hemocomponentes-tab" data-bs-toggle="pill" data-bs-target="#pills-hemocomponentes" type="button" role="tab" aria-controls="pills-hemocomponentes" aria-selected="true">Hemocomponentes</button>
                          </li>
                          <li class="nav-item dropdown-item" role="presentation">
                            <button class="nav-link" id="pills-solicitacao-tab" data-bs-toggle="pill" data-bs-target="#pills-solicitacao" type="button" role="tab" aria-controls="pills-solicitacao" aria-selected="false">Solicitações de Transfusão</button>
                          </li>
                          <li class="nav-item dropdown-item" role="presentation">
                            <button class="nav-link" id="pills-tranfusao-tab" data-bs-toggle="pill" data-bs-target="#pills-tranfusao" type="button" role="tab" aria-controls="pills-tranfusao" aria-selected="false">Transfusão</button>
                          </li>
                          <li class="nav-item dropdown-item" role="presentation">
                            <button class="nav-link" id="pills-indicadores-tab" data-bs-toggle="pill" data-bs-target="#pills-indicadores" type="button" role="tab" aria-controls="pills-indicadores" aria-selected="false">Indicadores</button>
                          </li>
                        </ul>
                      </div>
                    </div>
                </div>
              </div>
              <div class="tab-content" id="pills-tabContent-saida">

                <div class="tab-pane fade show active" id="pills-hemocomponentes" role="tabpanel" aria-labelledby="pills-hemocomponentes-tab">
                  <div class="col-10">
                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-entrada-tab" data-bs-toggle="pill" data-bs-target="#pills-entrada" type="button" role="tab" aria-controls="pills-entrada" aria-selected="true">Entrada de hemocomponentes</button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-saida-tab" data-bs-toggle="pill" data-bs-target="#pills-saida" type="button" role="tab" aria-controls="pills-saida" aria-selected="false">Saída de hemocomponentes</button>
                      </li>
                    </ul>
                  </div>

                  <div class="tab-content" id="pills-tabContent-saida">
                    <div class="tab-pane fade show active" id="pills-entrada" role="tabpanel" aria-labelledby="pills-entrada-tab">
                      <div class="col-auto">
                        <button type="button" class="btn btn-block btn-secondary mb-3 mr-2 p-2" style="margin-left: 1%;" data-bs-toggle="modal" data-bs-target="#modalEntradaHemocomp">Relatório</button>
                      </div>
                      <div class="row">
                          <div class="col-6">
                              <div class="card-body px-0 pt-0 pb-2">
                                  <div class="table-responsive p-0 table-common-wrapper" id="tableLaboratorioAgenciaTable_wrapper">
                                      <div style="overflow-x: auto;">
                                          <table id="tableLaboratorioAgenciaTable" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                                              
                                          </table>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-6">
                            <div class="chart">
                                <canvas id="chart-agencia-entrada" class="chart-canvas" height="55"></canvas>
                                <canvas id="chart-agencia-entrada_derivados" class="chart-canvas" height="55"></canvas>
                                <canvas id="chart-agencia-entrada_alicotados" class="chart-canvas" height="55"></canvas>
                            </div>
                            <div class="input-container mt-3">
                              <div class="row">
                                <div class="col-6">
                                    <label for="inputMonth" class="form-label">Mês:</label>
                                    <input type="number" class="form-control input-month" min="1" max="12" />
                                </div>
                                <div class="col-6">
                                    <label for="inputYear" class="form-label">Ano:</label>
                                    <input type="number" class="form-control input-year" />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-6">
                                  <button class="btn btn-primary btn-update-chart mt-2">Criar grafico</button>
                                </div>
                                <div class="col-6">
                                  <button id="printButtonAuter" class="btn btn-primary mt-2">Imprimir Gráfico</button>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>

                    <div class="tab-pane fade" id="pills-saida" role="tabpanel" aria-labelledby="pills-saida-tab">
                      <div class="col-auto">
                        <button type="button" class="btn btn-block btn-secondary mb-3 mr-2 p-2" style="margin-left: 1%;" data-bs-toggle="modal" data-bs-target="#modalSaidaHemocomp">Relatório</button>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <div class="card-body px-0 pt-0 pb-2">
                              <div class="table-responsive p-0 table-common-wrapper" id="tableLaboratorioAgenciaSaidaTable_wrapper">
                                  <div style="overflow-x: auto;">
                                      <table id="tableLaboratorioAgenciaSaidaTable" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                                          
                                      </table>
                                  </div>
                              </div>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="chart">
                              <canvas id="chart-agencia-saida" class="chart-canvas" height="80"></canvas>
                              <canvas id="chart-derivados-saida" class="chart-canvas" height="80"></canvas>
                          </div>

                          <div class="input-container mt-3">
                            <div class="row g-2">
                                <div class="col-6">
                                    <label for="inputMonthSaida" class="form-label">Mês:</label>
                                    <input type="number" class="form-control input-month-saida" min="1" max="12" />
                                </div>
                                <div class="col-6">
                                    <label for="inputYearSaida" class="form-label">Ano:</label>
                                    <input type="number" class="form-control input-year-saida" />
                                </div>
                            </div>
                            <div class="row">
                              <div class="col-6">
                                <button class="btn btn-primary btn-update-chart-saida mt-2">Criar grafico</button>
                              </div>
                              <div class="col-6">
                                <button id="printButtonSaida" class="btn btn-primary mt-2">Imprimir Gráfico</button>
                              </div>
                            </div>
                          </div>
                        </div>                                                                                         
                      </div>
                    </div>
                  </div>
                    
                </div>

                <div class="tab-pane fade" id="pills-solicitacao" role="tabpanel" aria-labelledby="pills-solicitacao-tab">
                  <div class="col-auto">
                    <button type="button" class="btn btn-block btn-secondary mb-3 mr-2 p-2" style="margin-left: 1%;" data-bs-toggle="modal" data-bs-target="#modalSolicitacaoHemocomp">Relatório</button>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="card-body px-0 pt-0 pb-2">
                          <div class="table-responsive p-0 table-common-wrapper" id="tableLaboratorioSolicitacaoTable_wrapper">
                              <div style="overflow-x: auto;">
                                  <table id="tableLaboratorioSolicitacaoTable" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                                      
                                  </table>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="chart">
                          <canvas id="chart-solicitacao" class="chart-canvas" height="155"></canvas>
                      </div>

                      <div class="input-container mt-3">
                        <div class="row g-2">
                            <div class="col-6">
                                <label for="inputMonthSolicitacao" class="form-label">Mês:</label>
                                <input type="number" class="form-control input-month-solicitacao" min="1" max="12" />
                            </div>
                            <div class="col-6">
                                <label for="inputYearSolicitacao" class="form-label">Ano:</label>
                                <input type="number" class="form-control input-year-solicitacao" />
                            </div>
                        </div>
                        <div class="row">
                              <div class="col-6">
                              <button class="btn btn-primary btn-update-chart-solicitacao mt-2">Criar grafico</button>
                              </div>
                              <div class="col-6">
                                <button id="printButtonSolicitacao" class="btn btn-primary mt-2">Imprimir Gráfico</button>
                              </div>
                            </div>
                        
                      </div>
                    </div>                                                                                         
                  </div>
                </div>

                <div class="tab-pane fade" id="pills-indicadores" role="tabpanel" aria-labelledby="pills-indicadores-tab">
                  <div class="row">
                    <div class="col-12">
                      <div class="chart">
                        <canvas id="indicadoresConcentradoHemacias" class="chart-canvas" height="55"></canvas>
                        <canvas id="indicadoresPlasmaFrescoCongelado" class="chart-canvas" height="55"></canvas>
                        <canvas id="indicadoresConcentradoPlaquetas" class="chart-canvas" height="55"></canvas>
                        <canvas id="indicadoresCrioprecipitado" class="chart-canvas" height="55"></canvas>
                        <canvas id="indicadoresBolsasRecebidas"class="chart-canvas" height="55"></canvas>
                      </div>
                      <div class="input-container mt-3">
                        <div class="row g-2">
                          <div class="col-6">
                              <label for="inputAno" class="form-label">Ano:</label>
                              <input type="number" class="form-control input-indicador-ano" />
                          </div>
                          <div class="col-6">
                              <button id="printButton" class="btn btn-primary">Imprimir Gráfico</button>
                          </div>
                        </div>
                        <button class="btn btn-primary btn-update-chart-indicador mt-2">Criar graficos</button>
                      </div>
                    </div>                                                                                         
                  </div>
                </div>
                <div class="tab-pane fade" id="pills-tranfusao" role="tabpanel" aria-labelledby="pills-tranfusao-tab">
                <div class="col-auto">
                    <button type="button" class="btn btn-block btn-secondary mb-3 mr-2 p-2" style="margin-left: 1%;" data-bs-toggle="modal" data-bs-target="#modalTransfusao">Relatório</button>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0 table-common-wrapper" id="tableLaboratoriotransfusao_wrapper">
                            <div style="overflow-x: auto;">
                                <table id="tableLaboratoriotransfusao" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                                 
                                </table>
                            </div>
                        </div>
                      </div>
                    </div>                                                                                         
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Todos inicio-->
    <div id="loadingOverlayLab" style="display: none;">
      <img src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="Carregando..." class="loading" />
    </div>
    <!-- Modal relatorios -->
    <div class="col-md-4">
      <div class="modal fade" id="modalAdmRelatorio" tabindex="-1" role="dialog" aria-labelledby="modalAdmRelatorio" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1"/>Relatório</h5>
              <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                      <form id="formAdmRelatorio">
                        <div class="form-group">
                            <label for="dataInicio">Data de Início:</label>
                            <input type="date" class="form-control" id="dataInicio" name="dataInicio" required>
                        </div>
                        <div class="form-group">
                            <label for="dataFinal">Data Final:</label>
                            <input type="date" class="form-control" id="dataFinal" name="dataFinal" required>
                        </div>
                        <div class="form-group">
                          <label for="ds_puncao" class="form-label">Punção:</label>
                          <input class="form-control" list="datalistPuncao" id="ds_puncao" name="ds_puncao"  placeholder="Pesquisar...">
                          <datalist id="datalistPuncao">
                            <option value="Sim">Somente c\ punção</option>
                          </datalist>
                        </div>
                        <div class="form-group">
                          <label for="formato" class="form-label">Selecione um formato de relatório:</label>
                          <input class="form-control" list="datalistFormato" id="formato" name="formato"  placeholder="Pesquisar...">
                          <datalist id="datalistFormato">
                            <option value="EXCEL">eXtra Luxe Special</option>
                            <option value="PDF">Portable Document Format</option> 
                          </datalist>
                        </div>
                        <button type="submit" class="btn btn-primary">Gerar</button>
                        <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="modal fade" id="modalSaidaHemocomp" tabindex="-1" role="dialog" aria-labelledby="modalSaidaHemocomp" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1"/>Relatório</h5>
              <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                      <form id="formSaidaHemocomp">
                        <div class="form-group">
                            <label for="dataInicioSaida">Data de Início:</label>
                            <input type="date" class="form-control" id="dataInicioSaida" name="dataInicioSaida" required>
                        </div>
                        <div class="form-group">
                            <label for="dataFinalSaida">Data Final:</label>
                            <input type="date" class="form-control" id="dataFinalSaida" name="dataFinalSaida" required>
                        </div>
                        <div class="form-group">
                          <label for="formatoSaida" class="form-label">Selecione um formato de relatório:</label>
                          <select class="form-select" id="formatoSaida" name="formatoSaida">
                            <option selected disabled>Selecione um  Formato...</option>
                            <option value="EXCEL">EXCEL</option>
                            <option value="PDF">PDF</option>
                          </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Gerar</button>
                        <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="modal fade" id="modalEntradaHemocomp" tabindex="-1" role="dialog" aria-labelledby="modalEntradaHemocomp" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1"/>Relatório</h5>
              <div class="alert alert-secondary" role="alert">
                Para gerar todos os dados, deixar todos os campos adicionais sem selecionar
              </div>
              <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                      <form id="formEntradaHemocomp">
                        <div class="form-group">
                            <label for="dataInicioEntrada">Data de Início:</label>
                            <input type="date" class="form-control" id="dataInicioEntrada" name="dataInicioEntrada" required>
                        </div>
                        <div class="form-group">
                            <label for="dataFinalEntrada">Data Final:</label>
                            <input type="date" class="form-control" id="dataFinalEntrada" name="dataFinalEntrada" required>
                        </div>
                        <div class="form-group">
                          <label for="irradiadoEntrada" class="form-label">Irradiados:</label>
                          <select class="form-select" id="irradiadoEntrada" name="irradiadoEntrada">
                            <option selected disabled>Trazer Somentos os Irradiados...</option>
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="filtradosEntrada" class="form-label">Filtrados:</label>
                          <select class="form-select" id="filtradosEntrada" name="filtradosEntrada">
                            <option selected disabled>Trazer Somentos os Filtrados...</option>
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="alicotadoEntrada" class="form-label">Alicuotados:</label>
                          <select class="form-select" id="alicotadoEntrada" name="alicotadoEntrada">
                            <option selected disabled>Trazer Somentos os Alicuotados...</option>
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="formatoEntrada" class="form-label">Selecione um formato de relatório:</label>
                          <select class="form-select" id="formatoEntrada" name="formatoEntrada">
                            <option selected disabled>Selecione um  Formato...</option>
                            <option value="EXCEL">EXCEL</option>
                            <option value="PDF">PDF</option>
                          </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Gerar</button>
                        <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    <div class="col-md-4">
      <div class="modal fade" id="modalSolicitacaoHemocomp" tabindex="-1" role="dialog" aria-labelledby="modalSolicitacaoHemocomp" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1"/>Relatório</h5>
              <div class="alert alert-secondary" role="alert">
                Para gerar todos os dados, Selecione um na opção Não
              </div>
              <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                      <form id="formSolicitacaoHemocomp">
                        <div class="form-group">
                            <label for="dataInicioSolicitacao">Data de Início:</label>
                            <input type="date" class="form-control" id="dataInicioSolicitacao" name="dataInicioSolicitacao" required>
                        </div>
                        <div class="form-group">
                            <label for="dataFinalSolicitacao">Data Final:</label>
                            <input type="date" class="form-control" id="dataFinalSolicitacao" name="dataFinalSolicitacao" required>
                        </div>
                        <div class="form-group">
                          <label for="canceladoSolicitacao" class="form-label">Cancelados:</label>
                          <select class="form-select" id="canceladoSolicitacao" name="canceladoSolicitacao">
                              <option selected disabled>Trazer Somentos os Cancelados...</option>
                              <option value="C">Sim</option>
                              <option value="N">Não</option> 
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="tranfundidoSolicitacao" class="form-label">Transfundidos:</label>
                          <select class="form-select" id="tranfundidoSolicitacao" name="tranfundidoSolicitacao">
                            <option selected disabled>Trazer Somentos os Transfundidos...</option>
                            <option value="T">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="liberadoSolicitacao" class="form-label">Solicitações Liberadas:</label>
                          <select class="form-select" id="liberadoSolicitacao" name="liberadoSolicitacao">
                            <option selected disabled>Trazer Somentos as Solicitações Liberadas...</option>
                            <option value="L">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="solicitadoSolicitacao" class="form-label">Solicitadas:</label>
                          <select class="form-select" id="solicitadoSolicitacao" name="solicitadoSolicitacao">
                            <option selected disabled>Trazer Somentos as Solicitadas...</option>
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="reservadoSolicitacao" class="form-label">Reservados:</label>
                          <select class="form-select" id="reservadoSolicitacao" name="reservadoSolicitacao">
                            <option selected disabled>Trazer Somentos os Reservados...</option>
                            <option value="R">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="formatoSolicitacao" class="form-label">Selecione um formato de relatório:</label>
                          <select class="form-select" id="formatoSolicitacao" name="formatoSolicitacao">
                            <option selected disabled>Selecione um  Formato...</option>
                            <option value="EXCEL">EXCEL</option>
                            <option value="PDF">PDF</option>
                          </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Gerar</button>
                        <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="modal fade" id="modalTransfusao" tabindex="-1" role="dialog" aria-labelledby="modalTransfusao" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1"/>Relatório</h5>
              <div class="alert alert-secondary" role="alert">
                Para gerar todos os dados, Selecione um na opção Não
              </div>
              <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                      <form id="formTransfusao">
                        <div class="form-group">
                            <label for="dataInicioTransfusao">Data de Início:</label>
                            <input type="date" class="form-control" id="dataInicioTransfusao" name="dataInicioTransfusao" required>
                        </div>
                        <div class="form-group">
                            <label for="dataFinalTransfusao">Data Final:</label>
                            <input type="date" class="form-control" id="dataFinalTransfusao" name="dataFinalTransfusao" required>
                        </div>
                        <div class="form-group">
                          <label for="irradiadoTransfusao" class="form-label">Irradiados:</label>
                          <select class="form-select" id="irradiadoTransfusao" name="irradiadoTransfusao">
                            <option selected disabled>Trazer Somentos os Irradiados...</option>
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="filtradosTransfusao" class="form-label">Filtrados:</label>
                          <select class="form-select" id="filtradosTransfusao" name="filtradosTransfusao">
                            <option selected disabled>Trazer Somentos os Filtrados...</option>
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="alicotadoTransfusao" class="form-label">Alicuotados:</label>
                          <select class="form-select" id="alicotadoTransfusao" name="alicotadoTransfusao">
                            <option selected disabled>Trazer Somentos os Alicuotados...</option>
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="formatoTransfusao" class="form-label">Selecione um formato de relatório:</label>
                          <select class="form-select" id="formatoTransfusao" name="formatoTransfusao">
                            <option selected disabled>Selecione um  Formato...</option>
                            <option value="EXCEL">EXCEL</option>
                            <option value="PDF">PDF</option>
                          </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Gerar</button>
                        <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="modal fade" id="modalTrigemRelatorioTriagem" tabindex="-1" role="dialog" aria-labelledby="modalTrigemRelatorioTriagem" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1"/>Relatório</h5>
              <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                      <form id="formTriagemRelatorio">
                        <div class="form-group">
                            <label for="dataInicio">Data de Início:</label>
                            <input type="date" class="form-control" id="dataInicio" name="dataInicio" required>
                        </div>
                        <div class="form-group">
                            <label for="dataFinal">Data Final:</label>
                            <input type="date" class="form-control" id="dataFinal" name="dataFinal" required>
                        </div>
                        <div class="form-group">
                          <label for="ds_clinica" class="form-label">Laboratório ou Status:</label>
                          <select class="form-select" id="ds_clinica" name="ds_clinica">
                            <option selected disabled>Selecione um Laboratório ou Status...</option>
                            <option value="BIOVIDA">BIOVIDA</option>
                            <option value="LACEN">LACEN</option>
                            <option value="CIEVS">CIEVS</option>
                            <option value="INGOH">INGOH</option>
                            <option value="LAB. SAUDE">LAB. SAUDE</option>
                            <option value="RECOLETA">RECOLETA</option>
                            <option value="AGUARDANDO RESULTADO">AGUARDANDO RESULTADO</option>
                            <option value="OK">OK</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="formato" class="form-label">Selecione um formato de relatório:</label>
                          <select class="form-select" id="formato" name="formato">
                            <option selected disabled>Selecione um  Formato...</option>
                            <option value="EXCEL">EXCEL</option>
                            <option value="PDF">PDF</option>
                          </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Gerar</button>
                        <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fim modal relatorios -->

     <!-- Modal Criar Triagem-->
     <div class="modal fade modal-lg" id="modal-labTrigem" tabindex="-1" role="dialog" aria-labelledby="exameTriagem" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exameTriagem">Cadastro de exame</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="labTriagem">
              <div class="row align-items-center mb-2">
                <div class="col-4">
                  <label for="nr_prescricao">Nº Prescrição:</label>
                  <input type="text" id="nr_prescricao" name="nr_prescricao" class="form-control" required>
                </div>
                <div class="col-4">
                  <label for="nr_atendimento">Nº Atendimento:</label>
                  <input type="text" id="nr_atendimento" name="nr_atendimento" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="dt_entrada">Data de entrada:</label>
                  <input type="date" id="dt_entrada" name="dt_entrada" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="nm_paciente">Nome do paciênte:</label>
                  <input type="text" id="nm_paciente" name="nm_paciente" class="form-control" readonly>
                </div>
                <div class="col-6">
                  <label for="cd_estabelecimento">Estabelecimento:</label>
                  <input type="text" id="cd_estabelecimento" name="cd_estabelecimento" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="ds_exame" class="form-label">Exame:</label>
                  <input class="form-control" list="datalistExame" id="ds_exame" name="ds_exame"  placeholder="Pesquisar..." required>
                  <datalist id="datalistExame">
                  </datalist>
                </div>
                <div class="col-6">
                <label for="ds_clinica" class="form-label">Clinica ou Laboratório:</label>
                  <input class="form-control" list="datalistClinica" id="ds_clinica" name="ds_clinica"  placeholder="Pesquisar..." required>
                  <datalist id="datalistClinica">
                  </datalist>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="status">Status:</label>
                  <input type="text" value="ENVIADO DIA:" id="status" name="status" class="form-control" required>
                </div>
                <div class="col-6">
                    <label for="confirmacao" class="form-label">Confirmação:</label>
                    <select class="form-control" id="confirmacao" name="confirmacao">
                        <option selected disabled>Selecione um Status</option>
                        <option value="OK">OK</option>
                        <option value="ERRO AO ANEXAR TASY">ERRO AO ANEXAR TASY</option>
                        <option value="CANCELADO NO TASY">CANCELADO NO TASY</option>
                        <option value="NÃO LOCALIZADO">NÃO LOCALIZADO</option>
                        <option value="ERRO AO ABRIR ATENDIMENTO">ERRO AO ABRIR ATENDIMENTO</option>
                        <option value="ERRO AO ABRIR PRESCRIÇÃO">ERRO AO ABRIR PRESCRIÇÃO</option>
                        <option value="NÃO ESTÁ PRONTO">NÃO ESTÁ PRONTO</option>
                        <option value="ERRO AO ANEXAR NO TASY">ERRO AO ANEXAR NO TASY</option>
                        <option value="RECOLETA">RECOLETA</option>
                        <option value="AGUARDANDO RESULTADO">AGUARDANDO RESULTADO</option>
                    </select>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <div class="radio-options" hidden>
                      <div class="form-check">
                          <input  class="form-check-input" type="radio" name="opcao" id="opcao_1">
                          <label class="form-check-label" for="opcao_1">
                              Erro da identificação do paciente
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="opcao" id="opcao_2">
                          <label class="form-check-label" for="opcao_2">
                              Erro da identificação do tipo de amostra
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="opcao" id="opcao_3">
                          <label class="form-check-label" for="opcao_3">
                              Nova amostra: material insuficiente
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="opcao" id="opcao_4">
                          <label class="form-check-label" for="opcao_4">
                              Nova amostra: material coagulado
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="opcao" id="opcao_5">
                          <label class="form-check-label" for="opcao_5">
                              Nova amostra: material acidentada
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="opcao" id="opcao_6">
                          <label class="form-check-label" for="opcao_6">
                              Nova amostra: material hemolisada
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="opcao" id="opcao_7">
                          <label class="form-check-label" for="opcao_7">
                              Confirmação de resultado
                          </label>
                      </div>
                      <div class="form-check">
                          <input value="" class="form-check-input" type="radio" name="opcao" id="opcao_8">
                          <label class="form-check-label" for="opcao_8">
                              Outros:
                          </label>
                      </div>
                      <input type="text" id="texto-selecionado" name="texto-selecionado" hidden>
                    </div>
                  </div>
                  <div class="col-12 obs" hidden>
                    <label for="observacao" hidden>Outros</label>
                    <textarea class="form-control" id="observacao" name="observacao" rows="3"></textarea>
                  </div>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6 ">
                  <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                  <button type="submit" class="btn bg-gradient-primary" id="saveTriagemLabBtn">Salvar</button>
                </div>
              </div>
              <div id="statusMessage"></div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Editar Triagem-->
    <div class="modal fade modal-lg" id="modal-labTrigemEditar" tabindex="-1" role="dialog" aria-labelledby="exameTriagemEditar" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exameTriagemEditar">Editar exame</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="labTriagemEditar">
              <div class="row align-items-center mb-2">
              <div class="col-4" hidden>
                  <label for="idEditar">id:</label>
                  <input type="text" id="idEditar" name="idEditar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="nr_prescricaoEditar">Nº Prescrição:</label>
                  <input type="text" id="nr_prescricaoEditar" name="nr_prescricaoEditar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="nr_atendimentoEditar">Nº Atendimento:</label>
                  <input type="text" id="nr_atendimentoEditar" name="nr_atendimentoEditar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="dt_entradaEditar">Data de entrada:</label>
                  <input type="date" id="dt_entradaEditar" name="dt_entradaEditar" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="nm_pacienteEditar">Nome do paciênte:</label>
                  <input type="text" id="nm_pacienteEditar" name="nm_pacienteEditar" class="form-control" readonly>
                </div>
                <div class="col-6">
                  <label for="cd_estabelecimentoEditar">Estabelecimento:</label>
                  <input type="text" id="cd_estabelecimentoEditar" name="cd_estabelecimentoEditar" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="ds_exameEditar" class="form-label">Exame:</label>
                  <input class="form-control" list="datalistExame" id="ds_exameEditar" name="ds_exameEditar"  placeholder="Pesquisar..." readonly>
                  <datalist id="datalistExame">
                  </datalist>
                </div>
                <div class="col-6">
                <label for="ds_clinicaEditar" class="form-label">Clinica ou Laboratório:</label>
                  <input class="form-control" list="datalistClinica" id="ds_clinicaEditar" name="ds_clinicaEditar"  placeholder="Pesquisar..." readonly>
                  <datalist id="datalistClinica">
      
                  </datalist>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="statusEditar">Status:</label>
                  <input type="text" value="ENVIADO DIA:" id="statusEditar" name="statusEditar" class="form-control" readonly>
                </div>
                <div class="col-6">
                  <label for="confirmacaoEditar">Mudar status de confirmação:</label>
                  <input hidden type="text" id="confirmacaoEditar" name="confirmacaoEditar">
                  <select id="confirmacaoEditarSelect" name="confirmacaoEditarSelect" class="form-control" required>
                    <option value="OK">OK</option>
                    <option value="ERRO AO ANEXAR TASY">ERRO AO ANEXAR TASY</option>
                    <option value="CANCELADO NO TASY">CANCELADO NO TASY</option>
                    <option value="NÃO LOCALIZADO">NÃO LOCALIZADO</option>
                    <option value="ERRO AO ABRIR ATENDIMENTO">ERRO AO ABRIR ATENDIMENTO</option>
                    <option value="ERRO AO ABRIR PRESCRIÇÂO">ERRO AO ABRIR PRESCRIÇÂO</option>
                    <option value="NÃO ESTÁ PRONTO">NÃO ESTÁ PRONTO</option>
                    <option value="ERRO AO ANEXAR NO TASY">ERRO AO ANEXAR NO TASY</option>
                    <option value="RECOLETA">RECOLETA</option>
                    <option value="AGUARDANDO RESULTADO">AGUARDANDO RESULTADO</option>
                  </select>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <label for="observacaoEditar">Observação</label>
                  <textarea class="form-control" id="observacaoEditar" name="observacaoEditar" rows="3"></textarea>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6 ">
                  <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                  <button type="submit" class="btn bg-gradient-primary" id="saveTriagemLabBtn">Salvar</button>
                </div>
              </div>
              <div id="statusMessage"></div>
            </form>
          </div>
        </div>
      </div>
    </div>

     <!-- Modal View Triagem-->
     <div class="modal fade modal-lg" id="modal-labTrigemView" tabindex="-1" role="dialog" aria-labelledby="exameTriagemView" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exameTriagemView">Visualizar exame</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> 
          </div>
          <div class="modal-body">
            <form id="labTriagemView">
              <div class="row align-items-center mb-2">
                <div class="col-4" hidden>
                  <label for="idView">id:</label>
                  <input type="text" id="idView" name="idView" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="nr_prescricaoView">Nº Prescrição:</label>
                  <input type="text" id="nr_prescricaoView" name="nr_prescricaoView" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="nr_atendimentoView">Nº Atendimento:</label>
                  <input type="text" id="nr_atendimentoView" name="nr_atendimentoView" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="dt_entradaView">Data de entrada:</label>
                  <input type="date" id="dt_entradaView" name="dt_entradaView" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="nm_pacienteView">Nome do paciênte:</label>
                  <input type="text" id="nm_pacienteView" name="nm_pacienteView" class="form-control" readonly>
                </div>
                <div class="col-6">
                  <label for="cd_estabelecimentoView">Estabelecimento:</label>
                  <input type="text" id="cd_estabelecimentoView" name="cd_estabelecimentoView" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="ds_exameView" class="form-label">Exame:</label>
                  <input class="form-control" list="datalistExame" id="ds_exameView" name="ds_exameView"  placeholder="Pesquisar..." readonly>
                  <datalist id="datalistExame">
                    
                  </datalist>
                </div>
                <div class="col-6">
                <label for="ds_clinicaView" class="form-label">Clinica ou Laboratório:</label>
                  <input class="form-control" list="datalistClinica" id="ds_clinicaView" name="ds_clinicaView"  placeholder="Pesquisar..." readonly>
                  <datalist id="datalistClinica">
                  </datalist>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="statusView">Status:</label>
                  <input type="text" value="ENVIADO DIA:" id="statusView" name="statusView" class="form-control" readonly>
                </div>
                <div class="col-6">
                  <label for="confirmacaoView" class="form-label">Confirmação:</label>
                  <input class="form-control" list="datalistOptions" id="confirmacaoView" name="confirmacaoView"  placeholder="Pesquisar..." readonly>
                  <datalist id="datalistOptions">
                    <option value="OK">
                    <option value="ERRO AO ANEXAR TASY">
                    <option value="CANCELADO NO TASY">
                    <option value="NÃO LOCALIZADO">
                    <option value="ERRO AO ABRIR ATENDIMENTO">
                    <option value="ERRO AO ABRIR PRESCRIÇÂO">
                    <option value="NÃO ESTÁ PRONTO">
                    <option value="ERRO AO ANEXAR NO TASY">
                    <option value="RECOLETA">
                    <option value="AGUARDANDO RESULTADO">
                  </datalist>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12 " readonly>
                  <label for="observacaoView">Observação</label>
                  <textarea class="form-control" id="observacaoView" name="observacaoView" rows="3" readonly></textarea >
                </div>
              </div>
              <div class="row align-items-center mb-2">
              
              </div>
              <div id="statusMessage"></div>
            </form>
          </div>
        </div>
      </div>
    </div>

     <!-- Modal   exames -->
     <div class="modal fade" id="modal-add-exames" tabindex="-1" role="dialog" aria-labelledby="modal-add-examesLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal-add-examesLabel">Cadastro Exames e Clínicas</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="examesTriagem" name="examesTriagem">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="form-label" for="nm_clinica"> Nome da Clinica
                        ou Laboratório:</label>
                      <input type="text" class="form-control form-control-alternative" id="nm_clinica" name="nm_clinica" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="form-label" for="nm_exame"> Nome do  Exame:</label>
                      <input type="text" class="form-control form-control-alternative" id="nm_exame" name="nm_exame" required>
                    </div>
                  </div>
                </div>
                <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-block btn-primary">Criar exame</button>
              </form>
            </div>
            <div class="modal-footer">
            </div>
          </div>
        </div>
      </div>
      
    <!-- Modal Criar-->
    <div class="modal fade modal-lg" id="modal-labAdm" tabindex="-1" role="dialog" aria-labelledby="exameAdm" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exameAdm">Cadastro de exame</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="labAdministrativo">
              <div class="row align-items-center mb-2">
                <div class="col-4">
                  <label for="prescricao">Nº Prescrição:</label>
                  <input type="text" id="prescricao" name="prescricao" class="form-control" required>
                </div>
                <div class="col-4">
                  <label for="atendimento">Nº Atendimento:</label>
                  <input type="text" id="atendimento" name="atendimento" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="dtEntrada">Data de entrada:</label>
                  <input type="date" id="dtEntrada" name="dtEntrada" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-4">
                  <label for="hrEntrada">Hora da coleta:</label>
                  <input type="text" id="hrEntrada" name="hrEntrada" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="hrChegada">Hora da baixa:</label>
                  <input type="text" id="hrChegada" name="hrChegada" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="local">Local:</label>
                  <input type="text" id="local" name="local" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="dtNascimento">Data de nascimento:</label>
                  <input type="date" id="dtNascimento" name="dtNascimento" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="coletor">Nome do coletor:</label>
                  <input type="text" id="coletor" name="coletor" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="puncao">Punção:</label>
                  <select id="puncao" name="puncao" class="form-control" required>
                    <option selected value="" readonly>---</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <label for="paciente">Paciente:</label>
                  <input type="text" id="paciente" name="paciente" class="form-control" readonly>
                </div>
                <div class="col-12">
                  <label for="exame">Exame:</label>
                  <input type="text" id="exame" name="exame" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2 d-flex justify-content-end">
                <div id="dsPuncao" class="col-6 " hidden>
                  <div class="form-group">
                    <label for="total">Total</label>
                    <input class="form-control" list="datalistTotal" id="total" name="total" placeholder="Adicionar...">
                    <datalist id="datalistTotal">
                      <option value="1">
                      <option value="2">
                      <option value="3">
                      <option value="4">
                      <option value="5">
                      <option value="6">
                      <option value="7">
                      <option value="8">
                      <option value="9">
                      <option value="10">
                    </datalist>
                  </div>
                  <div class="form-group">
                    <label for="descricao">Descrição</label>
                    <textarea class="form-control" id="descricao" name="descricao" rows="3"></textarea>
                  </div>
                </div>
                <div class="col-6 ">
                  <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                  <button type="submit" class="btn bg-gradient-primary" id="saveAdmLabBtn">Salvar</button>
                </div>
              </div>
              <div id="statusMessage"></div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Editar -->
    <div class="modal fade modal-lg" id="modal-adm-lab-editar" tabindex="-1" role="dialog" aria-labelledby="admLabEditar" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="admLabEditar">Editar exame</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="labAdministrativoEditar">
              <div class="row align-items-center mb-2">
                <div class="col-4" hidden>
                  <label for="idEdit"></label>
                  <input type="text" id="idEdit" name="idEdit" class="form-control" >
                </div>
                <div class="col-4">
                  <label for="prescricaoEditar">Nº Prescrição:</label>
                  <input type="text" id="prescricaoEditar" name="prescricaoEditar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="atendimentoEditar">Nº Atendimento:</label>
                  <input type="text" id="atendimentoEditar" name="atendimentoEditar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="dtEntradaEditar">Data de entrada:</label>
                  <input type="date" id="dtEntradaEditar" name="dtEntradaEditar" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-4">
                  <label for="hrEntradaEditar">Hora da coleta:</label>
                  <input type="text" id="hrEntradaEditar" name="hrEntradaEditar" class="form-control" >
                </div>
                <div class="col-4">
                  <label for="hrChegadaEditar">Hora da baixa:</label>
                  <input type="text" id="hrChegadaEditar" name="hrChegadaEditar" class="form-control" >
                </div>
                <div class="col-4">
                  <label for="localEditar">Local:</label>
                  <input type="text" id="localEditar" name="localEditar" class="form-control" >
                </div>
                <div class="col-4">
                  <label for="dtNascimentoEditar">Data de nascimento:</label>
                  <input type="date" id="dtNascimentoEditar" name="dtNascimentoEditar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="coletorEditar">Nome do coletor:</label>
                  <input type="text" id="coletorEditar" name="coletorEditar" class="form-control" >
                </div>
                <div class="col-4">
                  <label for="puncaoEditar">Punção:</label>
                  <select id="puncaoEditar" name="puncaoEditar" class="form-control" required>
                    <option selected value="" readonly>---</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <label for="pacienteEditar">Paciente:</label>
                  <input type="text" id="pacienteEditar" name="pacienteEditar" class="form-control" >
                </div>
                <div class="col-12">
                  <label for="exameEditar">Exame:</label>
                  <input type="text" id="exameEditar" name="exameEditar" class="form-control" >
                </div>
              </div>
 
                <div class="row align-items-center mb-2 d-flex justify-content-end">
                <div id="dsPuncaoEditar" class="col-6 " hidden>
                  <div class="form-group">
                  <div class="form-group">
                    <label for="totalEditar">Total</label>
                    <input class="form-control" list="datalistTotal" id="totalEditar" name="totalEditar" placeholder="Adicionar...">
                    <datalist id="datalistTotal">
                      <option value="1">
                      <option value="2">
                      <option value="3">
                      <option value="4">
                      <option value="5">
                      <option value="6">
                      <option value="7">
                      <option value="8">
                      <option value="9">
                      <option value="10">
                    </datalist>
                  </div>
                    <label for="descricaoEditar">Descrição</label>
                    <textarea class="form-control" id="descricaoEditar" name="descricaoEditar" rows="3"></textarea>
                  </div>
                </div>
                  <div class="col-6 d-flex justify-content-end">
                    <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                    <button type="submit" class="btn bg-gradient-primary" id="saveAdmLabBtnEditar">Salvar</button>
                  </div>
                </div>
              
              <div id="statusMessage"></div>
            </form>
          </div>
        </div>
      </div>
    </div>

      <!-- Modal Visualizar -->
    <div class="modal fade" id="modal-adm-lab-visualizar" tabindex="-1" role="dialog" aria-labelledby="admLabVisualizar" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="admLabVisualizar">Visualizar exame</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="labAdministrativoVisualizar">
              <div class="row align-items-center mb-2">
                <div class="col-4" hidden>
                  <label for="idVisualizar"></label>
                  <input type="text" id="idVisualizar" name="idVisualizar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="prescricaoVisualizar">Nº Prescrição:</label>
                  <input type="text" id="prescricaoVisualizar" name="prescricaoVisualizar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="atendimentoVisualizar">Nº Atendimento:</label>
                  <input type="text" id="atendimentoVisualizar" name="atendimentoVisualizar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="dtEntradaVisualizar">Data de entrada:</label>
                  <input type="date" id="dtEntradaVisualizar" name="dtEntradaVisualizar" class="form-control"  readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-4">
                  <label for="hrEntradaVisualizar">Hora da coleta:</label>
                  <input type="text" id="hrEntradaVisualizar" name="hrEntradaVisualizar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="hrChegadaVisualizar">Hora da baixa:</label>
                  <input type="text" id="hrChegadaVisualizar" name="hrChegadaVisualizar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="localVisualizar">Local:</label>
                  <input type="text" id="localVisualizar" name="localVisualizar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="dtNascimentoVisualizar">Data de nascimento:</label>
                  <input type="date" id="dtNascimentoVisualizar" name="dtNascimentoVisualizar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="coletorVisualizar">Nome do coletor:</label>
                  <input type="text" id="coletorVisualizar" name="coletorVisualizar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="puncaoVisualizar">Punção:</label>
                  <select id="puncaoVisualizar" name="puncaoVisualizar" class="form-control" disabled>
                    <option selected value="" readonly>---</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <label for="pacienteVisualizar">Paciente:</label>
                  <input type="text" id="pacienteVisualizar" name="pacienteVisualizar" class="form-control" readonly>
                </div>
                <div class="col-6">
                  <label for="exameVisualizar">Exame:</label>
                  <textarea id="exameVisualizar" name="exameVisualizar" class="form-control" readonly rows="3"></textarea>
                </div>
                <div id="dsPuncaoVisualizar" class="col-6 ">
                    <label for="descricaoVisualizar">Descrição Punção</label>
                    <textarea class="form-control" id="descricaoVisualizar" name="descricaoVisualizar" readonly rows="3"></textarea>
                </div>
              </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Final -->


    <div class="container-fluid py-4">
        <footer class="footer pt-3  ">
        <div class="container-fluid">
            <div class="row align-items-center justify-content-lg-between">
            <div class="col-lg-6 mb-lg-0 mb-4">
                <div class="copyright text-center text-sm text-muted text-lg-start">
                © <script>
                    document.write(new Date().getFullYear())
                </script>
                <a href="https://github.com/Hospital-e-Maternidade-Dona-Iris/Intranet" class="font-weight-bold" target="_blank">Hospital e Maternidade Dona Iris</a>
                Intranet |  <span id="time"></span>
                </div>
            </div>
            </div>
        </div>
        </footer>
    </div>
</main>
  <!--   Core JS Files   -->
  <script src="../assets/js/core/popper.min.js"></script>
  <script src="../assets/js/core/bootstrap.min.js"></script>
  <script src="../assets/js/plugins/perfect-scrollbar.min.js"></script>
  <script src="../assets/js/plugins/smooth-scrollbar.min.js"></script>
  <script src="../assets/js/plugins/chartjs.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  
<!-- Mascara para inputs -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- Inclua seus scripts na ordem correta -->
<script type="module" src="../script/models/DataModel.js"></script>
<script type="module" src="../script/views/View.js"></script>
<script type="module" src="../script/controllers/Utils.js"></script>
<script type="module" src="../script/controllers/Services.js"></script>
<script type="module" src="../script/controllers/Controller.js"></script>
<script type="module" src="../script/app.js"></script>

  <!-- Github buttons -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="../assets/js/argon-dashboard.min.js?v=2.0.4"></script>
</body>

</html>