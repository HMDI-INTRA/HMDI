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
  <link
  href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
  rel="stylesheet">
  
    <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="../css/sb-admin-2.min.css" rel="stylesheet">

    <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="shortcut icon" href="../assets/img/favicon.png" type="image/x-icon">
 
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">

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
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
</head>

<body id="page-top">
    <div id="wrapper">
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-fw fa-chart-area"></i>
                </div>
                <div class="sidebar-brand-text mx-3">HMDI</div>
            </a>

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
                        <h4 class="mb-2">Internação Rosa</h4>
                    </div>
                    <ul class="navbar-nav ml-auto menu-alertas">
                        <li class="nav-item dropdown no-arrow mx-1">
                            <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-bell fa-fw"></i>
                                <span class="badge badge-danger badge-counter"></span>
                            </a>
                            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in alertas-reservas-rosa"
                                aria-labelledby="alertsDropdown">
                               
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
            <div class="nav-wrapper position-relative end-0">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" >
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="mapa-rosa-tab" data-bs-toggle="tab" data-bs-target="#mapa-rosa" type="button" role="tab" aria-controls="mapa-rosa" aria-selected="true">Mapa de internação</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="ocupacao-rosa-tab" data-bs-toggle="tab" data-bs-target="#ocupacao-rosa" type="button" role="tab" aria-controls="ocupacao-rosa" aria-selected="false">Ocupação hospitalar</button>
          </li>
        </ul>
        <div class="tab-content" id="ul-navContent">
          <div class="tab-pane fade show active" id="mapa-rosa" role="tabpanel" aria-labelledby="mapa-rosa-tab">
            <div class="col-12">
              <div class="card mb-4" style="border-radius: inherit;">
                <div class="card-header pb-0 p-3">

                 <div class="col-auto">
                            <div class="card-header pb-0 p-3">
                            <div class="d-flex justify-content-between">
                                <div class="col-auto">
                                    <h4 class="mb-2">Mapa de internação Rosa- <span class="horario"> </span></h4>
                                </div>
                                <div class="col-2">
                                <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-mapa-rosa">Adicionar</button>
                                  </div>  
                                <div class="col-2">
                                <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modalRosa">Relatório</button>
                                </div>
                                <div class="col-2">
                                <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modalMovimentacao">Paciênte setor</button>
                                </div>
                            </div>
                            <div class="col-auto">
                                    <div class="legend-item">
                                        <div class="color-box" style="background-color: #7f3b8a9c;"></div>
                                        <span>Medicamentos</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="color-box" style="background-color: red;"></div>
                                        <span>Alergias</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="color-box" style="background-color: #6d0101;"></div>
                                        <span>Transfusão</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="color-box" style="background-color: #1070ffdb;"></div>
                                        <span>Exames e procedimentos</span>
                                    </div>
                                </div>
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
    </div>

     <!-- Modal Mapa-->
     <div class="modal fade modal-xl" id="modal-mapa-rosa" tabindex="-1" role="dialog" aria-labelledby="mapaInternacaoRosa" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title font-weight-bolder text-primary text-gradient" id="mapaInternacaoRosa">Cadastrar</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="formMapaRosa">
              <div class="row align-items-center mb-2">
                <div class="col-3" hidden>
                  <label for="usuario">Usuario:</label>
                  <input type="text" id="usuario" name="usuario" class="form-control" required>
                </div>
                <div class="col-3">
                  <label for="atendimento">Nº Atendimento:</label>
                  <input type="number" id="atendimento" name="atendimento" class="form-control" required>
                </div>
                <div class="col-9">
                  <div class="alert alert-primary" role="alert" >
                      <strong>Legenda Fugulin:</strong> Cuidado Mínimo(CM), Intermediário(ITM), Alta Dependência(AD), Semi - Intensivo(SI) e intensivo
                  </div>  
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <label for="paciente">Paciênte:</label>
                  <input type="text" id="paciente" name="paciente" class="form-control" >
                </div>
              </div>
              <div class="row align-items-center mb-2">
                  <div class="col-3">
                    <label for="leito">Leito:</label>
                    <input type="text" id="leito" name="leito" class="form-control" >
                  </div>
                <div class="col-3">
                  <label for="idade">Idade:</label>
                  <input type="text" id="idade" name="idade" class="form-control" >
                </div>
                <div class="col-3">
                  <label for="dtParto">Data do parto:</label>
                  <input type="datetime-local" id="dtParto" name="dtParto" class="form-control" >
                </div>
                <div class="col-3">
                  <label for="dtAdmissao">Data de admissão:</label>
                  <input type="datetime-local" id="dtAdmissao" name="dtAdmissao" class="form-control" >
                </div>
              </div>
              <div class="row align-items-center mb-2">
                  <div class="col-3">
                    <label for="dieta">Dieta:</label>
                    <input type="text" id="dieta" name="dieta" class="form-control" >
                  </div>
                <div class="col-3">
                  <label for="fugulin">Fugulin:</label>
                  <input type="text" id="fugulin" name="fugulin" class="form-control" >
                </div>
                <div class="col-3">
                  <label for="escalas">Data Breaden e Morse/SAE:</label>
                  <input type="datetime-local" id="escalas" name="escalas" class="form-control" >
                </div>
                <div class="col-3">
                  <label for="saeRn">data SAE/RN:</label>
                  <input type="datetime-local" id="saeRn" name="saeRn" class="form-control" >
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <div class="form-group">
                    <span for="obsAdulto">Observacões Adulto:</span>
                    <div id="obsAdulto" name="obsAdulto" style="height: 200px;"></div>
                    <input type="text" id="obsAdultoHidden" name="obsAdultoHidden" hidden>
                  </div>
                </div>
                
                <div class="col-12 obsRnHidden">
                  <div class="form-group">
                    <span for="obsRn">ObservacõesRN:</span>
                    <div id="obsRn" name="obsRn" style="height: 200px;"></div>
                    <input type="text" id="obsRnHidden" name="obsRnHidden" hidden>
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-5 d-flex justify-content-end">
                <div class="col-12 ">
                  <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                  <button type="submit" class="btn bg-gradient-primary">Salvar</button>
                </div>
              </div>
              <div id="statusMessage"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div id="loadingOverlayLab" style="display: none;">
      <img src="https://www.blogson.com.br/wp-content/uploads/2017/10/loading-gif-transparent-10.gif" alt="Carregando..." class="loading" />
    </div>
    <!-- Modal Editar -->
    <div>
    <div class="modal fade modal-xl" id="modalMapaRosaEdit" tabindex="-1" role="dialog" aria-labelledby="mapaInternacaoEdit" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title font-weight-bolder text-primary text-gradient" id="mapaInternacaoEdit">Editar </h3>
                <div class="col-9" style="margin-left: 10em;">
                    <div class="alert alert-primary" role="alert" >
                        <strong>Legenda Fugulin:</strong> Cuidado Mínimo(CM), Intermediário(ITM), Alta Dependência(AD), Semi - Intensivo(SI) e intensivo
                    </div>  
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
          </div>
          <div class="modal-body">
            <form id="formMapaRosaEdit">
              <div class="row align-items-center mb-2">
                <div class="col-3" hidden>
                  <label for="nm_usuario">Usuario:</label>
                  <input type="text" id="nm_usuario" name="nm_usuario" class="form-control" >
                </div>
                <div class="col-3">
                  <label for="nr_atendimento">Nº Atendimento:</label>
                  <input type="number" id="nr_atendimento" name="nr_atendimento" class="form-control" >
                </div>
                <div class="col-9">
                  <label for="nm_paciente">Paciênte:</label>
                  <input type="text" id="nm_paciente" name="nm_paciente" class="form-control" >
                </div>
              </div>
              <div class="row align-items-center mb-2">
                  <div class="col-3">
                    <label for="ds_leito">Leito:</label>
                    <input type="text" id="ds_leito" name="ds_leito" class="form-control" >
                  </div>
                <div class="col-3">
                  <label for="ds_idade">Idade:</label>
                  <input type="text" id="ds_idade" name="ds_idade" class="form-control" readonly>
                </div>
                <div class="col-3">
                  <label for="dt_parto">Data do parto:</label>
                  <input type="datetime-local" id="dt_parto" name="dt_parto" class="form-control" readonly>
                </div>
                <div class="col-3">
                  <label for="dt_admissao">Data de admissão:</label>
                  <input type="datetime-local" id="dt_admissao" name="dt_admissao" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                  <div class="col-3">
                    <label for="ds_dieta">Dieta:</label>
                    <input type="text" id="ds_dieta" name="ds_dieta" class="form-control" >
                  </div>
                <div class="col-3">
                  <label for="ds_fugulin">Fugulin:</label>
                  <input type="text" id="ds_fugulin" name="ds_fugulin" class="form-control" >
                </div>
                <div class="col-3">
                  <label for="dt_escalas">Data Breaden e Morse/SAE:</label>
                  <input type="datetime-local" id="dt_escalas" name="dt_escalas" class="form-control" readonly>
                </div>
                <div class="col-3">
                  <label for="dt_sae_rn">data SAE/RN:</label>
                  <input type="datetime-local" id="dt_sae_rn" name="dt_sae_rn" class="form-control" readonly>
                </div>
                <div class="col-3" hidden>
                    <label for="dt_atualizacao">Data de Atualização:</label>
                    <input type="text" id="dt_atualizacao" name="dt_atualizacao" class="form-control" readonly>
                  </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <div class="form-group">
                    <span for="obsAdultoEdit">Observacões Adulto:</span>
                    <div id="obsAdultoEdit" name="obsAdultoEdit" style="height: 200px;"></div>
                    <input type="text" id="obsAdultoHiddenEdit" name="obsAdultoHiddenEdit" hidden>
                  </div>
                </div>
                
                <div class="col-12 obsRnHiddenEdit">
                  <div class="form-group">
                    <span for="obsRnEdit">ObservacõesRN:</span>
                    <div id="obsRnEdit" name="obsRnEdit" style="height: 200px;"></div>
                    <input type="text" id="obsRnHiddenEdit" name="obsRnHiddenEdit" hidden>
                  </div>
                </div>
                <div class="row align-items-center mt-5 d-flex justify-content-end">
                <div class="col-12 ">
                  <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                  <button type="submit" class="btn bg-gradient-primary">Salvar</button>
                </div>
              </div>
              <div id="statusMessage"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal edit -->
    <div class="modal fade modal-xl" id="modalMapaRosaView" tabindex="-1" role="dialog" aria-labelledby="mapaInternacaoView" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title font-weight-bolder text-primary text-gradient" id="mapaInternacaoView">Visualizar</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="formMapaRosaView">
              <div class="row align-items-center mb-2">
                <div class="col-3" hidden>
                  <label for="usuarioView">Usuario:</label>
                  <input type="text" id="usuarioView" name="usuarioView" class="form-control" required>
                </div>
                <div class="col-3">
                  <label for="atendimentoView">Nº Atendimento:</label>
                  <input type="number" id="atendimentoView" name="atendimentoView" class="form-control" required>
                </div>
                <div class="alert alert-primary" role="alert" >
                      <strong>Legenda Fugulin:</strong> Cuidado Mínimo(CM), Intermediário(ITM), Alta Dependência(AD), Semi - Intensivo(SI) e intensivo
                  </div> 
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <label for="pacienteView">Paciênte:</label>
                  <input type="text" id="pacienteView" name="pacienteView" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                  <div class="col-3">
                    <label for="leitoView">Leito:</label>
                    <input type="text" id="leitoView" name="leitoView" class="form-control" readonly>
                  </div>
                <div class="col-3">
                  <label for="idadeView">Idade:</label>
                  <input type="text" id="idadeView" name="idadeView" class="form-control" readonly>
                </div>
                <div class="col-3">
                  <label for="dtPartoView">Data do parto:</label>
                  <input type="datetime-local" id="dtPartoView" name="dtPartoView" class="form-control" readonly>
                </div>
                <div class="col-3">
                  <label for="dtAdmissaoView">Data de admissão:</label>
                  <input type="datetime-local" id="dtAdmissaoView" name="dtAdmissaoView" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                  <div class="col-3">
                    <label for="dietaView">Dieta:</label>
                    <input type="text" id="dietaView" name="dietaView" class="form-control" readonly>
                  </div>
                <div class="col-3">
                  <label for="fugulinView">Fugulin:</label>
                  <input type="text" id="fugulinView" name="fugulinView" class="form-control" readonly>
                </div>
                <div class="col-3">
                  <label for="escalasView">Data Breaden e morse/SAE:</label>
                  <input type="datetime-local" id="escalasView" name="escalasView" class="form-control" readonly>
                </div>
                <div class="col-3">
                  <label for="saeRnView">data SAE/RN:</label>
                  <input type="datetime-local" id="saeRnView" name="saeRnView" class="form-control" readonly>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <div class="form-group">
                    <span for="obsAdultoView">Observacões Adulto:</span>
                    <div id="obsAdultoView" name="obsAdultoView" style="height: 200px;"></div>
                    <input type="text" id="obsAdultoHiddenView" name="obsAdultoHiddenView" hidden>
                  </div>
                </div>
                
                <div class="col-12 obsRnHiddenView">
                  <div class="form-group">
                    <span for="obsRnView">ObservacõesRN:</span>
                    <div id="obsRnView" name="obsRnView" style="height: 200px;"></div>
                    <input type="text" id="obsRnHiddenView" name="obsRnHiddenView" hidden>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Relatorio -->

    <div class="col-md-4">
      <div class="modal fade" id="modalMovimentacao" tabindex="-1" role="dialog" aria-labelledby="modalJasmim" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="modalJasmim">Movimentação de paciênte</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <div class="row justify-content-center">
                          <div class="col-md-10">
                              <form id="formJasmimRelatorio">
                                  <div class="row">
                                      <div class=" col-6">
                                          <input type="text" class="form-control" id="atendimentoMovimentacao" placeholder="Digite o número de atendimento" maxlength="6">
                                      </div>
                                      <div class=" col-3">
                                          <button type="button" id="filtrarMovimentacao" class="btn btn-primary">Buscar</button>
                                      </div>
                                  </div>

                                  <div id="resultadoMovimentacao"></div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

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
                      <div class="col-12">
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
                                <option value="AD">Histórico</option>
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
                        </form>
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
    </div>  <!--   Core JS Files   -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
  
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
<!-- Mascara para inputs -->
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../js/sb-admin-2.min.js"></script>
</body>

</html>