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
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


  <!-- Mascara para inputs -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <!-- CSS Files -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <!-- Custom fonts for this template-->
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

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
            <h4 class="mb-2">Cadastros - Tecnologia da informação</h4>
          </div>
          <ul class="navbar-nav ml-auto menu-alertas">
            <li class="nav-item dropdown no-arrow mx-1 total-vencidas">
              <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bell fa-fw"></i>
                <span class="badge badge-danger badge-counter total-vencidas"></span>
              </a>
              <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in alertas-plano-acao" aria-labelledby="alertsDropdown">

              </div>
            </li>
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-envelope fa-fw"></i>
                <span class="badge badge-danger badge-counter"></span>
              </a>
              <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                <h6 class="dropdown-header">
                  Central de mensagens
                </h6>
                <a class="dropdown-item text-center small text-gray-500" href="#">Sem mensagens</a>
              </div>
            </li>
            <div class="topbar-divider d-none d-sm-block"></div>
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small"><?php if (isset($_SESSION['nome'])) {
                                                                            $userName = $_SESSION['nome'];
                                                                            echo "$userName";
                                                                          } ?></span><img class="fas fa-circle-user" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Font_Awesome_5_solid_user-circle.svg/1982px-Font_Awesome_5_solid_user-circle.svg.png" width='25'>
              </a>
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" target='blank_' href="https://ufg.digisystem.cloud/#/">
                  <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                  Tasy
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="../index.php">
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
            <button class="nav-link active" id="administrativo-dash-tab" data-bs-toggle="pill" data-bs-target="#administrativo-dash" type="button" role="tab" aria-controls="administrativo-dash" aria-selected="true">Administrativo</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="triagem-dash-tab" data-bs-toggle="pill" data-bs-target="#triagem-dash" type="button" role="tab" aria-controls="triagem-dash" aria-selected="false">Triagem</button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="administrativo-dash" role="tabpanel" aria-labelledby="administrativo-dash-tab">
            <div class="row mt-4">
              <div class="col-lg-6 mb-lg-0 mb-4">
                <div class="card z-index-2 h-100">
                  <div class="card-header pb-0 pt-3 bg-transparent">
                    <h6 class="text-capitalize">Grafico global</h6>
                    <p class="text-sm mb-0">
                      <i class="fa fa-arrow-up text-success"></i>
                      <span class="font-weight-bold"></span>Total
                    </p>
                  </div>
                  <div class="card-body p-3">
                    <div class="chart">
                      <div class="mb-3">
                        <label for="filter-input" class="form-label">Filtrar por Nome:</label>
                        <input type="text" class="form-control" id="filter-input" placeholder="Digite o nome">
                      </div>
                      <canvas id="chart-administrativo" class="chart-canvas" height="150"></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mb-lg-0 mb-4">
                <div class="card z-index-2 h-100">
                  <div class="card-header pb-0 pt-3 bg-transparent">
                    <h6 class="text-capitalize">Grafico anual</h6>
                    <p class="text-sm mb-0">
                      <i class="fa fa-arrow-up text-success"></i>
                      <span class="font-weight-bold"></span>Total
                    </p>
                  </div>
                  <div class="card-body p-3">
                    <div class="chart">
                      <canvas id="chart-administrativo-anual" class="chart-canvas" height="150"></canvas>
                      <div class="input-group ">
                        <label class="input-group-text mb-0" for="select-ano">Filtrar por Ano:</label>
                        <select class="form-select" id="select-ano" onchange="atualizarGrafico()">
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mb-lg-0 mt-4">
                <div class="card z-index-2 h-100">
                  <div class="card-header pb-0 pt-3 bg-transparent">
                    <h6 class="text-capitalize">Grafico Punção</h6>
                    <p class="text-sm mb-0">
                      <i class="fa fa-arrow-up text-success"></i>
                      <span class="font-weight-bold"></span>Total
                    </p>
                  </div>
                  <div class="card-body p-3">
                    <div class="chart">
                      <canvas id="chart-administrativo-puncao" class="chart-canvas" height="150"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="triagem-dash" role="tabpanel" aria-labelledby="triagem-dash-tab">
            <div class="row mt-4">
              <div class="col-lg-6 mb-lg-0 mb-4">
                <div class="card z-index-2 h-100">
                  <div class="card-header pb-0 pt-3 bg-transparent">
                    <h6 class="text-capitalize">Grafico Clinicas</h6>
                    <p class="text-sm mb-0">
                      <i class="fa fa-arrow-up text-success"></i>
                      <span class="font-weight-bold"></span>Total
                    </p>
                  </div>
                  <div class="card-body p-3">
                    <div class="chart">
                      <canvas id="chart-triagem-clinicas" class="chart-canvas" height="150"></canvas>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 mb-lg-0 mb-4">
                <div class="card z-index-2 h-100">
                  <div class="card-header pb-0 pt-3 bg-transparent">
                    <h6 class="text-capitalize">Grafico Global</h6>
                    <p class="text-sm mb-0">
                      <i class="fa fa-arrow-up text-success"></i>
                      <span class="font-weight-bold"></span>Total
                    </p>
                  </div>
                  <div class="card-body p-3">
                    <div class="chart">
                      <canvas id="chart-triagem" class="chart-canvas" height="150"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-lg-6 mb-lg-0 mb-4">
                <div class="card z-index-2 h-100">
                  <div class="card-header pb-0 pt-3 bg-transparent">
                    <div class="col-auto">
                      <div class="row">
                        <div class="col-6">
                          <h6 class="text-capitalize">Cadastro de Clinicas</h6>
                        </div>
                        <div class="col-6">
                          <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-add-exames" style="float: inline-end;">Adicionar exames</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0 table-common-wrapper" id="tableExamesTriagem_wrapper">
                      <table id="tableExamesTriagem" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal HTML structure -->
        <div class="modal fade" id="printModal" tabindex="-1" aria-labelledby="printModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="printModalLabel"></h5>
              </div>
              <div class="modal-body">
                <div id="printContent"></div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="printButton">Print</button>
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
                        <label class="form-label" for="nm_exame"> Nome do Exame:</label>
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
                    Intranet | <span id="time"></span>
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