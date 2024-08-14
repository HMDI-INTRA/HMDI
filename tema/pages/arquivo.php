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
  <link id="pagestyle" href="../assets/css/argon-dashboard.css?v=2.0.4" rel="stylesheet" />
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
  <title>
    Hospital e Maternidade Dona Iris
  </title>
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
 

<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">

<!-- DataTables Buttons CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.7.1/css/buttons.dataTables.min.css">


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>

<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.print.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.colVis.min.js"></script>


  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>

  <link id="pagestyle" href="../assets/css/argon-dashboard.css?v=2.0.4" rel="stylesheet" />

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

            <!-- Heading -->
            <div class="sidebar-heading">
                Interface
            </div>

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item dropdown dropdown-wide">
                <?php include_once 'nivelAcessos.php'; ?>
            </li>
            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">
              <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>
                <div class="col-auto">
                    <h4 class="mb-2">Arquivo</h4>
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
          <div class="container-fluid py-4">
      <div class="nav-wrapper position-relative end-0">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" >
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="prontuario-tab" data-bs-toggle="tab" data-bs-target="#prontuario" type="button" role="tab" aria-controls="prontuario" aria-selected="true">Prontuario</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="labora-tab" data-bs-toggle="tab" data-bs-target="#labora" type="button" role="tab" aria-controls="labora" aria-selected="false">Laboratorio</button>
          </li>
        </ul>
        <div class="tab-content" id="ul-navContent">
          <div class="tab-pane fade show active" id="prontuario" role="tabpanel" aria-labelledby="prontuario-tab">
            <div class="col-12">
              <div class="card mb-4" style="border-radius: inherit;">
                <div class="card-header pb-0 p-3">
                <div class="d-flex justify-content-between">
                  <h4 class="mb-2">Prontuário</h4>
                  <form action="" id="pesquisaArquivo">
                    <div class="row">
                    <div class="col-md-5">
                      <div class="form-group">
                        <div class="input-group mb-4">
                          <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                          <input class="form-control" name="nomepac" id="nomepac" placeholder="Nome do paciente" type="text">
                        </div>
                        <div id="pacienteList"></div> 
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="form-group">
                        <div class="input-group mb-4">
                          <input class="form-control" name="codpac" id="codpac" placeholder="Número de prontuário" type="text">
                          <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                        </div>
                      </div>
                    </div>
                    <div class="col-2">
                      <button type="button" id="pesquisarBtn" class="btn btn-primary p-2">Pesquisar</button>
                    </div>
                  </div>
                  </form>
                </div>
                  <div class="card-body px-0 pt-0 pb-0">
                    <div class="table-responsive p-0 table-common-wrapper" id="tableArquivo_wrapper">
                      <table class="table align-items-center mb-0 table-common" id="tableArquivo" style="width: 100%;">
                      </table>
                    </div>
                    <!-- Modal Enfermagem -->
                    <div class="modal fade" id="modalEnfermagem" tabindex="-1" role="dialog" aria-labelledby="enfermagem" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="enfermagem">Evolução de Enfermagem</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <div class="table-responsive p-0 table-common-wrapper" id="tableEnfermagem_wrapper">
                                <table class="table align-items-center mb-0 table-common" id="tableEnfermagem">
                              </table>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                              <button type="button" class="btn bg-gradient-primary" id="evoEnfermagem" data-bs-toggle="modal" data-bs-target="#evoEnfermagemPdf">Visualizar</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      <!-- Modal Medica-->
                      <div class="modal fade" id="modalMedica" tabindex="-1" role="dialog" aria-labelledby="Medica" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="Medica">Evolução de Médica</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <div class="table-responsive p-0 table-common-wrapper" id="tableMedica_wrapper">
                                <table class="table align-items-center mb-0 table-common" id="tableMedica">
                              </table>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                              <button type="button" class="btn bg-gradient-primary" id="evoMedica" data-bs-toggle="modal" data-bs-target="#evoMedicaPdf">Visualizar</button>
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
          <div class="tab-pane fade" id="labora" role="tabpanel" aria-labelledby="labora-tab">
                <div class="col-12">
                <div class="card mb-4" style="border-radius: inherit;">
                <div class="card-header pb-0 p-3">
                <div class="d-flex justify-content-between">
                  <h4 class="mb-2">Laboratório</h4>
                  <form action="" id="pesquisaArquivo">
                    <div class="row">
                    <div class="col-md-5">
                      <div class="form-group">
                        <div class="input-group mb-4">
                          <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                          <input class="form-control" name="nomepacLab" id="nomepacLab" placeholder="Nome do paciente" type="text">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="form-group">
                        <div class="input-group mb-4">
                          <input class="form-control" name="codpacLab" id="codpacLab" placeholder="Número de prontuário" type="text">
                          <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                        </div>
                      </div>
                    </div>
                    <div class="col-2">
                      <button type="button" id="pesquisarLabBtn" class="btn btn-primary p-2">Pesquisar</button>
                    </div>
                  </div>
                  </form>
                </div>
                  <div class="card-body px-0 pt-0 pb-0">
                    <div class="table-responsive p-0 table-common-wrapper" id="tableLaboratorio_wrapper">
                      <table class="table align-items-center mb-0 table-common" id="tableLaboratorio" style="width: 100%;">
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="modalResultado" tabindex="-1" role="dialog" aria-labelledby="resultModal" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="resultModal">Resultado</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="table-responsive p-0 table-common-wrapper" id="tableResultado_wrapper">
                      <table class="table align-items-center mb-0 table-common" id="tableResultado">
                    </table>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn bg-gradient-primary" id="resultado" data-bs-toggle="modal" data-bs-target="#resultadoPdf">Visualizar</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div id="loadingOverlayLa" style="display: none;">
                <img src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="Carregando..." class="loading" />
              </div>
            <div class="modal fade" id="resultadoPdf" tabindex="-1" role="dialog" aria-labelledby="resultadoPdfLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="resultadoPdfLabel">Resultado</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      <button type="button" class="btn bg-gradient-secondary md-1" data-bs-dismiss="modal">fechar</button>
                      <button type="button" class="btn bg-gradient-primary" id="imprimirResultado" style="margin-left: 10px;">Imprimir</button>
                    </button>
                  </div>
                  <div class="modal-body" id="body-modal">
                    <div id="labResultadoPdf" >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="microbiologia" role="tabpanel" aria-labelledby="microbiologia-tab">...</div>
        </div>
      </div>
    </div>

    <div class="tab-content">
    <div>
         
  <!-- Modal pdf -->
    <div class="modal fade" id="evoEnfermagemPdf" tabindex="-1" role="dialog" aria-labelledby="evoEnfermagemPdfLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="evoEnfermagemPdfLabel">Evolução de Enfermagem</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <button type="button" class="btn bg-gradient-secondary md-1" data-bs-dismiss="modal">fechar</button>
              <button type="button" class="btn bg-gradient-primary" id="imprimirEnf" style="margin-left: 10px;">Imprimir</button>
            </button>
          </div>
          <div class="modal-body" id="body-modal">
            <div id="evoEnfModalPdf" >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="loadingOverlay" style="display: none;">
      <img src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="Carregando..." class="loading" />
    </div>
    <!-- Modal pdf -->
    <div class="modal fade" id="evoMedicaPdf" tabindex="-1" role="dialog" aria-labelledby="evoMedicaPdfLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="evoMedicaPdfLabel">Evolução de Médica</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <button type="button" class="btn bg-gradient-secondary md-1" data-bs-dismiss="modal">fechar</button>
              <button type="button" class="btn bg-gradient-primary" id="imprimirMed" style="margin-left: 10px;">Imprimir</button>
            </button>
          </div>
          <div class="modal-body" id="body-modal">
            <div id="evoMedModalPdf" >
            </div>
          </div>
        </div>
      </div>
    </div>

</div>
   </div>
   <div >
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
  <!-- Github buttons -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="../assets/js/argon-dashboard.min.js?v=2.0.4"></script>

    <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../js/sb-admin-2.min.js"></script>


</body>

</html>