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
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Nir-Eletivas</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Nir-Eletivas</h6>
        </nav>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
    <div class="card mb-4" style="border-radius: inherit;">
    <div class="">
        <div class="nav-wrapper position-relative end-0">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="lancamento-tab" data-bs-toggle="pill" data-bs-target="#lancamento" type="button" role="tab" aria-controls="lancamento" aria-selected="true">Laçamentos</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="realizadas-tab" data-bs-toggle="pill" data-bs-target="#realizadas" type="button" role="tab" aria-controls="realizadas" aria-selected="false">Realizadas</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="inativadas-tab" data-bs-toggle="pill" data-bs-target="#inativadas" type="button" role="tab" aria-controls="inativadas" aria-selected="false">Inativadas</button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="lancamento" role="tabpanel" aria-labelledby="lancamento-tab">
              <div class="card mb-4" style="border-radius: inherit;">
                <div class="d-flex justify-content-between">
                  <h4 class="mb-2">Lançamento</h4>
                  <div class="col-auto">
                    <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" href="#modalAtualizar" role="button">Adicionar</button>
                    <div class="dropdown button-table">
                      <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-eletivas">Relatório</button>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive p-0 table-common-wrapper" id="tableNirEletivas_wrapper">
                  <table id="tableNirEletivas" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                  </table>
              </div>
            </div>
            <div class="tab-pane fade" id="realizadas" role="tabpanel" aria-labelledby="realizadas-tab">
              <div class="col-12">
                <div class="card mb-4" style="border-radius: inherit;">
                  <div class="card-header pb-0 p-3">
                    <div class="d-flex justify-content-between">
                      <h4 class="mb-2">Realizadas</h4>
                    </div>
                  </div>
                  <div class="table-responsive p-0 table-common-wrapper" id="tableRealizadasNir_wrapper">
                    <div style="overflow-x: auto;">
                      <table id="tableRealizadasNir" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="inativadas" role="tabpanel" aria-labelledby="inativadas-tab">
              <div class="col-12">
                <div class="card mb-4" style="border-radius: inherit;">
                  <div class="card-header pb-0 p-3">
                    <div class="d-flex justify-content-between">
                      <h4 class="mb-2">Inativadas</h4>
                    </div>
                  </div>
                  <div class="table-responsive p-0 table-common-wrapper" id="tableNirInativas_wrapper">
                    <table id="tableNirInativas" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
        <div class="modal fade" id="modal-eletivas" tabindex="-1" role="dialog" aria-labelledby="modal-eletivas" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
                <h5 class="modal-title" id=""><img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1"/>Relatório</h5>
                <div class="container">
                  <div class="row justify-content-center">
                      <div class="col-md-12">
                        <form id="formEletivasRelatorio">
                          <div class="form-group">
                              <label for="dataInicio">Data de Início:</label>
                              <input type="date" class="form-control" id="dataInicio" name="dataInicio">
                          </div>
                          <div class="form-group">
                              <label for="dataFinal">Data Final:</label>
                              <input type="date" class="form-control" id="dataFinal" name="dataFinal">
                          </div>
                          <div class="form-group">
                              <label for="status">Selecione um status:</label> 
                              <select class="form-select" id="status" name="status">
                                <option value="" disabled selected>- - -</option>
                                <option value="S">Realizadas</option>
                                <option value="N">Não realizadas</option> 
                                <option value="I">Inativas</option> 
                              </select>
                          </div>
                          <div class="form-group">
                              <label for="formato">Selecione um formato de relatório:</label> 
                              <select class="form-select" id="formato" name="formato">
                                <option value="" disabled selected>- - -</option>
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

    <!-- Modal -->
    <div class="container">
        <form id="formAtualizarNir">
            <div class="modal fade " id="modalAtualizar" aria-hidden="true" aria-labelledby="modalAtualizarLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header ">
                            <h5 class="modal-title" id="modalAtualizarLabel">Adicionar AIH</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                            <div class="col-12">
                                <label for="nm_paciente" class="form-label">Nome do paciênte</label>
                                <input type="text" class="form-control" id="nm_paciente" name="nm_paciente"readonly>
                            </div>
                            <div class="col-4">
                                <label for="cd_procedimento" class="form-label">Procedimento</label>
                                <input type="text" class="form-control" id="cd_procedimento" name="cd_procedimento" required>
                            </div>
                            <div class="col-4">
                                <label for="cd_protocolo" class="form-label">Protocolo</label>
                                <input type="text" class="form-control" id="cd_protocolo" name="cd_protocolo">
                            </div>
                            <div class="col-4">
                                <label for="cd_senha_aih" class="form-label">Senha AIH</label>
                                <input type="text" class="form-control" id="cd_senha_aih" name="cd_senha_aih">
                            </div>
                            </div>

                            <div class="row">
                            <div class="col-4">
                                <label for="dt_aih" class="form-label">Data da AIH</label>
                                <input type="date" class="form-control" id="dt_aih" name="dt_aih">
                            </div>
                            <div class="col-4">
                                <label for="nr_prontuario" class="form-label">Nº Prontuário</label>
                                <input type="text" class="form-control" id="nr_prontuario" name="nr_prontuario">
                            </div>
                            <div class="col-4">
                                <label for="ds_municipio" class="form-label">Município</label>
                                <input type="text" class="form-control" id="ds_municipio" name="ds_municipio" readonly>
                            </div>
                            </div>

                            <div class="row">
                            <div class="col-6">
                                <label for="dt_nascimento" class="form-label">Data de nascimento</label>
                                <input type="date" class="form-control" id="dt_nascimento" name="dt_nascimento" readonly>
                            </div>
                            <div class="col-6">
                                <label for="dt_medico" class="form-label">Data atendimento médico</label>
                                <input type="date" class="form-control" id="dt_medico" name="dt_medico" >
                            </div>
                            <div class="col-12">
                                <label for="ds_procedimento" class="form-label">Descrição do procedimento</label>
                                <input type="text" class="form-control" id="ds_procedimento" name="ds_procedimento" readonly>
                            </div>
                            <div class="col-12">
                                <label for="ds_medico_exec" class="form-label">Médico executor</label>
                                <input type="text" class="form-control" id="ds_medico_exec" name="ds_medico_exec">
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <span for="ds_observacao">Observacões Adulto:</span>
                                    <div id="ds_observacao" name="ds_observacao" style="height: 200px;"></div>
                                    <input type="text" id="ds_observacaoHidden" name="ds_observacaoHidden" hidden>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Salvar</button>
                                <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div id="loadingOverlayNir" style="display: none;">
      <img src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="Carregando..." class="loading" />
    </div>

    <div class="container">
      <form id="formEditarNir">
        <div class="modal fade" id="modalEditar" aria-hidden="true" aria-labelledby="modalEditarLabel" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
              <div class="modal-header ">
                <h5 class="modal-title" id="modalEditarLabel">Editar AIH</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                <div class="col-12" hidden>
                    <label for="ds_inativadoEdit" class="form-label"></label>
                    <input type="text" class="form-control" id="ds_inativadoEdit" name="ds_inativadoEdit">
                  </div>
                  <div class="col-12" hidden>
                    <label for="idEdit" class="form-label"></label>
                    <input type="text" class="form-control" id="idEdit" name="idEdit">
                  </div>
                  <div class="col-12">
                    <label for="nm_pacienteEdit" class="form-label">Nome do paciente</label>
                    <input type="text" class="form-control" id="nm_pacienteEdit" name="nm_pacienteEdit" >
                  </div>
                  <div class="col-4">
                    <label for="cd_procedimentoEdit" class="form-label">Procedimento</label>
                    <input type="text" class="form-control" id="cd_procedimentoEdit" name="cd_procedimentoEdit">
                  </div>
                  <div class="col-4">
                    <label for="cd_protocoloEdit" class="form-label">Protocolo</label>
                    <input type="text" class="form-control" id="cd_protocoloEdit" name="cd_protocoloEdit">
                  </div>
                  <div class="col-4">
                    <label for="cd_senha_aihEdit" class="form-label">Senha AIH</label >
                    <input type="text" class="form-control" id="cd_senha_aihEdit" name="cd_senha_aihEdit">
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <label for="dt_aihEdit" class="form-label">Data da AIH</label>
                    <input type="text" class="form-control" id="dt_aihEdit" name="dt_aihEdit" readonly>
                  </div>
                  <div class="col-4">
                    <label for="nr_prontuarioEdit" class="form-label">Nº Prontuário</label>
                    <input type="text" class="form-control" id="nr_prontuarioEdit" name="nr_prontuarioEdit">
                  </div>
                  <div class="col-4">
                    <label for="ds_municipioEdit" class="form-label">Município</label>
                    <input type="text" class="form-control" id="ds_municipioEdit" name="ds_municipioEdit">
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <label for="dt_nascimentoEdit" class="form-label">Data de nascimento</label>
                    <input type="text" class="form-control" id="dt_nascimentoEdit" name="dt_nascimentoEdit" readonly>
                  </div>
                  <div class="col-6">
                    <label for="dt_medicoEdit" class="form-label">Data atendimento médico</label>
                    <input type="date" class="form-control" id="dt_medicoEdit" name="dt_medicoEdit" >
                  </div>
                  <div class="col-12">
                    <label for="ds_procedimentoEdit" class="form-label">Descrição do procedimento</label>
                    <input type="text" class="form-control" id="ds_procedimentoEdit" name="ds_procedimentoEdit">
                  </div>
                  <div class="col-12">
                    <label for="ds_medico_execEdit" class="form-label">Médico executor</label>
                    <input type="text" class="form-control" id="ds_medico_execEdit" name="ds_medico_execEdit">
                  </div>
                  <div class="col-12">
                        <div class="form-group">
                            <span for="ds_observacaoEdit">Observacões Adulto:</span>
                            <div id="ds_observacaoEdit" name="ds_observacaoEdit" style="height: 200px;"></div>
                            <input type="text" id="ds_observacaoEditHidden" name="ds_observacaoEditHidden" hidden>
                        </div>
                    </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Salvar</button>
                <button type="button" class="btn bg-gradient-secondary me-2" data-bs-dismiss="modal">Fechar</button> 
            </div>

            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- Final do Modal -->
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
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