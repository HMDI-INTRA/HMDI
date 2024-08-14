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
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

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
            <h4 class="mb-2">Laboratório</h4>
          </div>
          <ul class="navbar-nav ml-auto menu-alertas">
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bell fa-fw"></i>
                <span class="badge badge-danger badge-counter"></span>
              </a>
              <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 class="dropdown-header">
                  Central de alertas
                </h6>
                <a class="dropdown-item text-center small text-gray-500" href="#">Sem alertas</a>
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
        <div class="nav-wrapper position-relative end-0">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="administrativo-tab" data-bs-toggle="tab" data-bs-target="#administrativo" type="button" role="tab" aria-controls="administrativo" aria-selected="true">Administrativo</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="triagem-tab" data-bs-toggle="tab" data-bs-target="#triagem" type="button" role="tab" aria-controls="triagem" aria-selected="false">Triagem</button>
            </li>
          </ul>
          <div class="tab-content" id="ul-navContent">
            <div class="tab-pane fade show active" id="administrativo" role="tabpanel" aria-labelledby="administrativo-tab">
              <div class="col-12">
                <div class="card mb-4" style="border-radius: inherit;">
                  <div class="card-header pb-0 p-3">
                    <div class="d-flex justify-content-between">
                      <div class="col-auto">
                        <h4 class="mb-2">Exames Administrativo </span></h4>
                      </div>
                      <div class="col-2">
                        <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-labAdm">Adicionar</button>
                      </div>
                      <div class="col-2">
                        <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modalAdmRelatorio">Relatório</button>
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
            <div class="tab-pane fade" id="triagem" role="tabpanel" aria-labelledby="triagem-tab">
              <div class="col-12">
                <div class="card mb-4" style="border-radius: inherit;">
                  <div class="card-header pb-0 p-3">
                    <div class="d-flex justify-content-between">
                      <div class="col-auto">
                        <h4 class="mb-2">Exames Triagem</span></h4>
                      </div>
                      <div class="col-2">
                        <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-labTrigem">Adicionar</button>
                      </div>
                      <div class="col-2">
                        <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modalTrigemRelatorioTriagem">Relatório</button>
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
        </div>
        <!--  <div id="loadingOverlayLab" style="display: none;">
      <img src="https://www.blogson.com.br/wp-content/uploads/2017/10/loading-gif-transparent-10.gif" alt="Carregando..." class="loading" />
    </div> -->
        <div class="col-md-4">
          <div class="modal fade" id="modalAdmRelatorio" tabindex="-1" role="dialog" aria-labelledby="modalAdmRelatorio" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-md" role="document">
              <div class="modal-content">
                <div class="modal-body p-0">
                  <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1" />Relatório</h5>
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
                            <input class="form-control" list="datalistPuncao" id="ds_puncao" name="ds_puncao" placeholder="Pesquisar...">
                            <datalist id="datalistPuncao">
                              <option value="Sim">Somente c\ punção</option>
                            </datalist>
                          </div>
                          <div class="form-group">
                            <label for="formato" class="form-label">Selecione um formato de relatório:</label>
                            <input class="form-control" list="datalistFormato" id="formato" name="formato" placeholder="Pesquisar...">
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
                  <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1" />Relatório</h5>
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
                              <option selected disabled>Selecione um Formato...</option>
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
                  <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1" />Relatório</h5>
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
                              <option selected disabled>Selecione um Formato...</option>
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
                  <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1" />Relatório</h5>
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
                              <option selected disabled>Selecione um Formato...</option>
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
                  <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1" />Relatório</h5>
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
                              <option selected disabled>Selecione um Formato...</option>
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
                  <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1" />Relatório</h5>
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
                              <option selected disabled>Selecione um Formato...</option>
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
                      <input class="form-control" list="datalistExame" id="ds_exame" name="ds_exame" placeholder="Pesquisar..." required>
                      <datalist id="datalistExame">
                      </datalist>
                    </div>
                    <div class="col-6">
                      <label for="ds_clinica" class="form-label">Clinica ou Laboratório:</label>
                      <input class="form-control" list="datalistClinica" id="ds_clinica" name="ds_clinica" placeholder="Pesquisar..." required>
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
                          <input class="form-check-input" type="radio" name="opcao" id="opcao_1">
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
                    <input class="form-control" list="datalistExame" id="ds_exameEditar" name="ds_exameEditar" placeholder="Pesquisar..." readonly>
                    <datalist id="datalistExame">
                    </datalist>
                  </div>
                  <div class="col-6">
                    <label for="ds_clinicaEditar" class="form-label">Clinica ou Laboratório:</label>
                    <input class="form-control" list="datalistClinica" id="ds_clinicaEditar" name="ds_clinicaEditar" placeholder="Pesquisar..." readonly>
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
                    <input class="form-control" list="datalistExame" id="ds_exameView" name="ds_exameView" placeholder="Pesquisar..." readonly>
                    <datalist id="datalistExame">

                    </datalist>
                  </div>
                  <div class="col-6">
                    <label for="ds_clinicaView" class="form-label">Clinica ou Laboratório:</label>
                    <input class="form-control" list="datalistClinica" id="ds_clinicaView" name="ds_clinicaView" placeholder="Pesquisar..." readonly>
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
                    <input class="form-control" list="datalistOptions" id="confirmacaoView" name="confirmacaoView" placeholder="Pesquisar..." readonly>
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
                    <textarea class="form-control" id="observacaoView" name="observacaoView" rows="3" readonly></textarea>
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
                    <input type="text" id="idEdit" name="idEdit" class="form-control">
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
                    <input type="text" id="hrEntradaEditar" name="hrEntradaEditar" class="form-control">
                  </div>
                  <div class="col-4">
                    <label for="hrChegadaEditar">Hora da baixa:</label>
                    <input type="text" id="hrChegadaEditar" name="hrChegadaEditar" class="form-control">
                  </div>
                  <div class="col-4">
                    <label for="localEditar">Local:</label>
                    <input type="text" id="localEditar" name="localEditar" class="form-control">
                  </div>
                  <div class="col-4">
                    <label for="dtNascimentoEditar">Data de nascimento:</label>
                    <input type="date" id="dtNascimentoEditar" name="dtNascimentoEditar" class="form-control" readonly>
                  </div>
                  <div class="col-4">
                    <label for="coletorEditar">Nome do coletor:</label>
                    <input type="text" id="coletorEditar" name="coletorEditar" class="form-control">
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
                    <input type="text" id="pacienteEditar" name="pacienteEditar" class="form-control">
                  </div>
                  <div class="col-12">
                    <label for="exameEditar">Exame:</label>
                    <input type="text" id="exameEditar" name="exameEditar" class="form-control">
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
                    <input type="date" id="dtEntradaVisualizar" name="dtEntradaVisualizar" class="form-control" readonly>
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
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
    <script src="../assets/js/core/popper.min.js"></script>
    <script src="../assets/js/core/bootstrap.min.js"></script>
    <script src="../assets/js/plugins/perfect-scrollbar.min.js"></script>
    <script src="../assets/js/plugins/smooth-scrollbar.min.js"></script>
    <script src="../assets/js/plugins/chartjs.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="module" src="../script/models/DataModel.js"></script>
    <script type="module" src="../script/views/View.js"></script>
    <script type="module" src="../script/controllers/Utils.js"></script>
    <script type="module" src="../script/controllers/Services.js"></script>
    <script type="module" src="../script/controllers/Controller.js"></script>
    <script type="module" src="../script/app.js"></script>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <script src="../assets/js/argon-dashboard.min.js?v=2.0.4"></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../js/sb-admin-2.min.js"></script>


</body>

</html>