<!-- Editado por: Josélio Dias Mendonça -->
<?php
include_once '../services/connection/conexao-login.php';

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
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"></script>
<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
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

<body class=" bg-gray-100" id="body">
    <div class="container-fluid navbar navbar-expand-lg navbar-light bg-light">

            <a class="navbar-brand m-0" href="#">
                <img src="../assets/img/favicon.png" class="navbar-brand-img h-100" alt="main_logo">
            </a>
            <div class="col-auto">
                        <div class="legend-item">
                            <div class="color-box" style="background-color: #7f3b8a9c;"></div>
                            <span>Medicamentos</span>
                        </div>
                        <div class="legend-item">
                            <div class="color-box" style="background-color: #ffcd05;"></div>
                            <span>Alergias</span>
                        </div>
                        <div class="legend-item">
                            <div class="color-box" style="background-color: red;"></div>
                            <span>Transfusão</span>
                        </div>
                        <div class="legend-item">
                            <div class="color-box" style="background-color: #1070ffdb;"></div>
                            <span>Exames e procedimentos</span>
                        </div>
                    </div>
    </div>
  <main class="main-content position-relative border-radius-lg ">
    <!-- Navbar -->
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" href="javascript:;">Página</a></li>
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Espaço Rosa</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Espaço Rosa</h6>
        </nav>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="nav-wrapper position-relative end-0">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" >
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="mapa-rosa-tab" data-bs-toggle="tab" data-bs-target="#mapa-rosa" type="button" role="tab" aria-controls="mapa-rosa" aria-selected="true">Mapa de internação</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="ocupacao-rosa-tab" data-bs-toggle="tab" data-bs-target="#ocupacao-rosa" type="button" role="tab" aria-controls="ocupacao-rosa" aria-selected="false">Ocupação hospitalar</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="dnv-rosa-tab" data-bs-toggle="tab" data-bs-target="#dnv-rosa" type="button" role="tab" aria-controls="dnv-rosa" aria-selected="false">DNV</button>
          </li>
        </ul>
        <div class="tab-content" id="ul-navContent">
          <div class="tab-pane fade show active" id="mapa-rosa" role="tabpanel" aria-labelledby="mapa-rosa-tab">
            <div class="col-12">
              <div class="card mb-4" style="border-radius: inherit;">
                <div class="card-header pb-0 p-3">
                  <div class="d-flex justify-content-between">
                    <h4 class="mb-2">Mapa de internação Rosa - <span class="horario"> </span></h4>
                    <div class="col-auto">
                      <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modalRosa">Relatório</button>
                      <div class="dropdown button-table">
                        <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                        </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <li><button class="dropdown-item btn-default" data-bs-toggle="modal" data-bs-target="#modalRosa">Relatório</button></li>
                          </ul>
                      </div>
                    </div>
                </div>
              </div>
                <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0 table-common-wrapper" id="tableMapaInternacaoRosa_wrapper">
                    <div style="overflow-x: auto;">
                        <table id="tableMapaInternacaoRosa" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                        </table>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="ocupacao-rosa" role="tabpanel" aria-labelledby="ocupacao-rosa-tab">
            <div class="col-12">
              <div class="card mb-4" style="border-radius: inherit;">
                <div class="card-header pb-0 p-3">
                  <div class="d-flex justify-content-between">
                    <h4 class="mb-2">Ocupação hospitalar</h4>
                    <div class="col-auto">
                </div>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0 table-common-wrapper" id="tableOcupacaoRosa_wrapper">
                    <div style="overflow-x: auto;">
                        <table id="tableOcupacaoRosa" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                        </table>
                    </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
        </div>
          <div class="tab-pane fade" id="dnv-rosa" role="tabpanel" aria-labelledby="dnv-rosa-tab">
              <div class="alert alert-primary" role="alert">
                <strong style= 'color: #fff;'>Alert! Em desenvolvimento!</strong>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Relatorio -->
    <div class="col-md-4">
        <div class="modal fade" id="modalRosa" tabindex="-1" role="dialog" aria-labelledby="modalJasmim" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
              <div class="modal-header">
                    <h5 class="modal-title" id=""><img width="48" height="48" src="https://portal.ifba.edu.br/dgcom/imagens/pdficon.png/@@images/72cd2884-3738-42e4-9066-256dc303c734.png" alt="microsoft-excel-2019--v1"/>Relatório</h5>
        
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
                  <div class="row justify-content-center">
                      <div class="col-md-10">
                        <form id="formRosaRelatorio">
                          <div class="form-group">
                              <label for="dataInicio">Data de Inícial:</label>
                              <input type="date" class="form-control" id="dataInicio" name="dataInicio">
                          </div>
                          <div class="form-group">
                              <label for="dataFinal">Data Final:</label>
                              <input type="date" class="form-control" id="dataFinal" name="dataFinal">
                          </div>
                          <div class="form-group">
                              <label for="ds_periodo">Selecione um Periodo:</label> 
                              <select class="form-select" id="ds_periodo" name="ds_periodo">
                                <option value="" selected disabled>- - -</option>
                                <option value="AD">Alta</option>
                                <option value="D">Diurno</option>
                                <option value="N">Noturno</option> 
                              </select>
                          </div>
                          <div class="form-group">
                              <label for="formato">Selecione um formato de relatório:</label> 
                              <select class="form-select" id="formato" name="formato">
                                <option value="" disabled>- - -</option>
                                <option value="EXCEL" >EXCEL</option>
                                <option value="PDF"selected>PDF</option> 
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
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
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