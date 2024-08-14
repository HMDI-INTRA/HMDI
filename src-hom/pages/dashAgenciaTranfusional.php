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
<!--   <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" /> -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">

<!-- DataTables Buttons CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.7.1/css/buttons.dataTables.min.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"></script>
<!-- DataTables CSS -->
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- DataTables JS -->
<script type="text/javascript" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>



<!-- Inclua a biblioteca jQuery UI -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<!-- Se estiver usando um tema do jQuery UI, inclua-o também -->
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<!-- DataTables Buttons JS -->
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.print.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js"></script>
  <!-- Nucleo Icons -->
  <link href="../assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

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
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style="margin: 24px;">
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
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Dashboard</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Dashboard</h6>
        </nav>
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          </div>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="percSolicTrans-dash-tab" data-bs-toggle="pill" data-bs-target="#percSolicTrans-dash" type="button" role="tab" aria-controls="percSolicTrans-dash" aria-selected="true" title="Solicitações transfusionais por tipo">Solicitações transfusionais</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="transRealTurno-dash-tab" data-bs-toggle="pill" data-bs-target="#transRealTurno-dash" type="button" role="tab" aria-controls="transRealTurno-dash" aria-selected="false" title="Transfusões realizadas por turno">Transfusões realizadas</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tempMedioTrans-dash-tab" data-bs-toggle="pill" data-bs-target="#tempMedioTrans-dash" type="button" role="tab" aria-controls="tempMedioTrans-dash" aria-selected="false" title="Tempo médio de transfusão">Tempo médio transfusão</button>
        </li>
      </ul>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="percSolicTrans-dash" role="tabpanel" aria-labelledby="percSolicTrans-dash-tab">
            <div class="col-lg-12 mb-lg-0 mb-4">
              <div class="card z-index-2 h-100">
                <div class="card-body p-3">
                  <div class="row">
                      <div class="col-2">
                          <label for="dt-inicial" class="form-label">Data inicial:</label>
                          <input type="date" id="dtInicial" name="dtInicial" class="form-control dtInicial-solicitacao"/>
                      </div>  
                      <div class="col-2">
                          <label for="dt-final" class="form-label">Data final:</label>
                          <input type="date" id="dtFinal" name="dtFinal" class="form-control dtFinal-solicitacao"/>
                      </div>
                      <div class="col-2 mt-4 p-1">
                          <button class="btn btn-primary btn-gerar-grafico-solicitacao">Gerar gráfico</button>
                      </div>  
                      <div class="col-4">
                      </div>
                      <div class="col-2 mt-4 p-1">
                          <button class="btn btn-primary btn-gerar-relatório"  data-bs-toggle="modal" data-bs-target="#relatorioSolicitacaoTransf">Relatório</button>
                      </div>
                  </div>  
                  <div class="chart">
                    <div id="chart-SolicTransf"  style="width: 100%; height: 417px;"></div>

                  </div>
                <div class="row">
                    <div class="col-6">
                        <label for="tableAnalise">ANÁLISE</label>
                        <div class="table-responsive p-0 table-common-wrapper" id="tableAnalise_wrapper">
                            <div style="overflow-x: auto;">
                                <table id="tableAnalise" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="col-6">
                        <label for="planoAcaoResult">Plano de acão</label>
                        <div class="table-responsive p-0 table-common-wrapper" id="planoAcaoResult_wrapper">
                            <div style="overflow-x: auto;">
                                <table id="planoAcaoResult" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="transRealTurno-dash" role="tabpanel" aria-labelledby="transRealTurno-dash-tab">
            <div class="col-lg-12 mb-lg-0 mb-4">
              <div class="card z-index-2 h-100">
                  <div class="card-body p-3">
                    <div class="row">
                        <div class="col-2">
                            <label for="dt-inicial" class="form-label">Data inicial:</label>
                            <input type="date" id="dtInicial" name="dtInicial" class="form-control dtInicial-transfusao-turno"/>
                        </div>  
                        <div class="col-2">
                            <label for="dt-final" class="form-label">Data final:</label>
                            <input type="date" id="dtFinal" name="dtFinal" class="form-control dtFinal-transfusao-turno"/>
                        </div>
                        <div class="col-2 mt-4 p-1">
                            <button class="btn btn-primary btn-gerar-grafico-transfusao-turno">Gerar gráfico</button>
                        </div>  
                        <div class="col-4">
                        </div>
                        <div class="col-2 mt-4 p-1">
                            <button class="btn btn-primary btn-gerar-relatório"  data-bs-toggle="modal" data-bs-target="#relatorioSolicitacaoTransf">Relatório</button>
                        </div>
                    </div>  
                    <div class="chart">
                      <div id="chartTransfTurno"  style="width: 100%; height: 417px;"></div>

                    </div>
                    <div class="row">
                      <div class="col-6">
                        <label for="analiseResult">Análise</label>
                        <textarea class="form-control analiseResult" id="analiseResult" name="analiseResult" rows="7" readonly></textarea>
                      </div>
                      <div class="col-6">
                        <label for="planoAcaoResult">Plano de ação</label>
                        <textarea class="form-control planoAcaoResult" id="planoAcaoResult" name="planoAcaoResult" rows="7" readonly></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
          <div class="tab-pane fade" id="tempMedioTrans-dash" role="tabpanel" aria-labelledby="tempMedioTrans-dash-tab">
            <div div class="col-lg-12 mb-lg-0 mb-4">
              <div class="card z-index-2 h-100">
                  <div class="card-body p-3">
                    <div class="row">
                        <div class="col-2">
                            <label for="dt-inicial" class="form-label">Data inicial:</label>
                            <input type="date" id="dtInicial" name="dtInicial" class="form-control dtInicial-tempo"/>
                        </div>  
                        <div class="col-2">
                            <label for="dt-final" class="form-label">Data final:</label>
                            <input type="date" id="dtFinal" name="dtFinal" class="form-control dtFinal-tempo"/>
                        </div>
                        <div class="col-2 mt-4 p-1">
                            <button class="btn btn-primary btn-gerar-grafico-tempo">Gerar gráfico</button>
                        </div>  
                        <div class="col-4">
                        </div>
                        <div class="col-2 mt-4 p-1">
                            <button class="btn btn-primary btn-gerar-relatório"  data-bs-toggle="modal" data-bs-target="#relatorioSolicitacaoTransf">Relatório</button>
                        </div>
                    </div>  
                    <div class="chart">
                      <div id="chartTempMedioTransf"  style="width: 100%; height: 417px;"></div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <label for="analiseResult">Análise</label>
                        <textarea class="form-control analiseResult" id="analiseResult" name="analiseResult" rows="7" readonly></textarea>
                      </div>
                      <div class="col-6">
                        <label for="planoAcaoResult">Plano de ação</label>
                        <textarea class="form-control planoAcaoResult" id="planoAcaoResult" name="planoAcaoResult" rows="7" readonly></textarea>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal cadastro de regras -->
      <div class="col-md-4">
        <div class="modal fade" id="analiseIndicadores" tabindex="-1" role="dialog" aria-labelledby="analiseIndicadores" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
                <h5 class="modal-title" id="">
                <div class="container">
                  <div class="row justify-content-center">
                      <div class="col-md-12">
                        <form id="formAnalise">
                          <div class="col-4">
                              <label for="mesAno">Mês e ano selecionado:</label>
                              <input type="text" class="form-control" id="mesAno" name="mesAno" readonly>
                              <input type="text" class="form-control" id="solicitacaoTransf" name="solicitacaoTransf" hidden>
                          </div>
                          <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <span for="analise">Análise:</span>
                                        <div id="analise" class="form-control analise"  name="analise" style="height: 200px;"></div>
                                        <input type="text" id="analiseHidden" name="analiseHidden" hidden>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <span for="planoAcao">Plano de ação:</span>
                                        <div id="planoAcao" name="planoAcao" style="height: 200px;"></div>
                                        <input type="text" id="planoAcaoHidden" class="form-control planoAcao" name="planoAcaoHidden" hidden>
                                    </div>
                                </div>
                            </div>
                          <button type="submit" class="btn btn-primary">Salvar</button>
                        </form>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal relatorio -->
      <div class="col-md-4">
      <div class="modal fade" id="relatorioSolicitacaoTransf" tabindex="-1" role="dialog" aria-labelledby="relatorioSolicitacaoTransf" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1"/>Relatório</h5>
              <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                      <form id="formRelatorioSolicTransf">
                        <div class="form-group">
                            <label for="dtInicial">Data de Início:</label>
                            <input type="date" class="form-control" id="dtInicial" name="dtInicial" required>
                        </div>
                        <div class="form-group">
                            <label for="dtFinal">Data Final:</label>
                            <input type="date" class="form-control" id="dtFinal" name="dtFinal" required>
                        </div>
                        <div class="form-group">
                        <label for="formatoSolicitacao" class="form-label">Selecione um formato de relatório:</label>
                          <select id="formatoSolicitacao" name="formatoSolicitacao" class="form-control" required>
                            <option selected value="" disabled>---</option>
                            <option value="EXCEL" disabled>EXCEL</option>
                            <option value="PDF">PDF</option>
                          </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Gerar</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
<!-- Inclua seus scripts na ordem correta -->
  
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