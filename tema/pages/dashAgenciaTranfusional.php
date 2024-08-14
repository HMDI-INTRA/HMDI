<!-- Editado por: Josélio Dias Mendonça -->
<?php
session_start();
ob_start();
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
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


  <!-- Mascara para inputs -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <!-- CSS Files -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  
  <!-- Custom fonts for this template-->
  <link
  href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
  rel="stylesheet">
  
    <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="../css/sb-admin-2.min.css" rel="stylesheet">

    <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="shortcut icon" href="../assets/img/favicon.png" type="image/x-icon">
 

<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">

<!-- DataTables Buttons CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.7.1/css/buttons.dataTables.min.css">


<script type="text/javascript" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>

<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.print.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-legend"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"></script>
<!-- DataTables CSS -->
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-fw fa-chart-area"></i>
                </div>
                <div class="sidebar-brand-text mx-3">HMDI</div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <div class="sidebar-heading">
                Interface
            </div>

            <li class="nav-item dropdown dropdown-wide">
                <?php include_once 'nivelAcessos.php'; ?>
            </li>
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
          <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>
                <div class="col-auto">
                    <h4 class="mb-2">Agência Trânsfusional</h4>
                </div>
                <ul class="navbar-nav ml-auto menu-alertas">
                    <li class="nav-item dropdown no-arrow mx-1">
                        <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-bell fa-fw"></i>
                            <span class="badge badge-danger badge-counter"></span>
                        </a>
                        <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="alertsDropdown">
                            <h6 class="dropdown-header">
                                Central de alertas
                            </h6>
                            <a class="dropdown-item text-center small text-gray-500" href="#">Sem alertas</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown no-arrow mx-1">
                        <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-envelope fa-fw"></i>
                            <span class="badge badge-danger badge-counter"></span>
                        </a>
                        <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="messagesDropdown">
                            <h6 class="dropdown-header">
                                Central de mensagens
                            </h6>
                            <a class="dropdown-item text-center small text-gray-500" href="#">Sem mensagens</a>
                        </div>
                    </li>
                    <div class="topbar-divider d-none d-sm-block"></div>
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="mr-2 d-none d-lg-inline text-gray-600 small"><?php if (isset($_SESSION['nome'])) {
                        $userName = $_SESSION['nome'];
                        echo "$userName";
                    } ?></span><img class="fas fa-circle-user"src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Font_Awesome_5_solid_user-circle.svg/1982px-Font_Awesome_5_solid_user-circle.svg.png" width='25'>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <a class="dropdown-item" target='blank_' href="https://ufg.digisystem.cloud/#/">
                                <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Tasy
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="../index.php" >
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                  </ul>
                </nav>
          </div>
          <div class="container-fluid">
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
                            <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </form>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- modal relatorio -->
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
                        <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" class="btn btn-primary">Gerar</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <footer class="sticky-footer bg-white">
            <div class="container my-auto">
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
            </div>
        </footer>
        </div>
    </div>
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
  <!-- Github buttons -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="../assets/js/argon-dashboard.min.js?v=2.0.4"></script>
<!-- Mascara para inputs -->
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../js/sb-admin-2.min.js"></script>


</body>

</html>