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
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">

<!-- DataTables Buttons CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.7.1/css/buttons.dataTables.min.css">

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
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link id="pagestyle" href="../assets/css/argon-dashboard.css?v=2.0.4" rel="stylesheet" />
</head>

<body class="g-sidenav-show   bg-gray-100" id="body">
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  
  <main class="main-content position-relative border-radius-lg ">
    <!-- Navbar -->
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" href="javascript:;">Página</a></li>
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Laboratório</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Laboratório - Relatórios</h6>
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
            <button class="nav-link" id="microbiologia-tab" data-bs-toggle="tab" data-bs-target="#microbiologia" type="button" role="tab" aria-controls="microbiologia" aria-selected="false">Microbiologia</button>
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
                      <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modalAdmRelatorio">Relatório</button></li>
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
                    <h4 class="mb-2">Exames Triagem</h4>
                    <div class="col-auto">
                      <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modalTrigemRelatorioTriagem">Relatório</button>
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
                        <table id="tableLaboratorioTrigemTable" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                        </table>
                    </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="microbiologia" role="tabpanel" aria-labelledby="microbiologia-tab">...</div>
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
                          <label for="ds_clinica" class="form-label">Clinica ou Laboratório:</label>
                          <input class="form-control" list="datalistClinica" id="ds_clinica" name="ds_clinica"  placeholder="Pesquisar...">
                          <datalist id="datalistClinica">
              
                          </datalist>
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
                  <input class="form-control" list="datalistExame" id="ds_exame" name="ds_exame"  placeholder="Pesquisar...">
                  <datalist id="datalistExame">
                    
                  </datalist>
                </div>
                <div class="col-6">
                <label for="ds_clinica" class="form-label">Clinica ou Laboratório:</label>
                  <input class="form-control" list="datalistClinica" id="ds_clinica" name="ds_clinica"  placeholder="Pesquisar...">
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
                  <input class="form-control" list="datalistOptions" id="confirmacao" name="confirmacao"  placeholder="Pesquisar...">
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
                  </datalist>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-12">
                  <label for="observacao">Observação</label>
                  <textarea class="form-control" id="observacao" name="observacao" rows="3"></textarea>
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
                  <input class="form-control" list="datalistExame" id="ds_exameEditar" name="ds_exameEditar"  placeholder="Pesquisar...">
                  <datalist id="datalistExame">
                    
                  </datalist>
                </div>
                <div class="col-6">
                <label for="ds_clinicaEditar" class="form-label">Clinica ou Laboratório:</label>
                  <input class="form-control" list="datalistClinica" id="ds_clinicaEditar" name="ds_clinicaEditar"  placeholder="Pesquisar...">
                  <datalist id="datalistClinica">
      
                  </datalist>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <div class="col-6">
                  <label for="statusEditar">Status:</label>
                  <input type="text" value="ENVIADO DIA:" id="statusEditar" name="statusEditar" class="form-control" required>
                </div>
                <div class="col-6">
                  <label for="confirmacaoEditar" class="form-label">Confirmação:</label>
                  <input class="form-control" list="datalistOptions" id="confirmacaoEditar" name="confirmacaoEditar"  placeholder="Pesquisar...">
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
                  </datalist>
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
                  <input type="time" id="hrEntrada" name="hrEntrada" class="form-control" >
                </div>
                <div class="col-4">
                  <label for="hrChegada">Hora da baixa:</label>
                  <input type="time" id="hrChegada" name="hrChegada" class="form-control" >
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
                  <label for="idEditar"></label>
                  <input type="text" id="idEditar" name="idEditar" class="form-control" required>
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
                  <input type="time" id="hrEntradaEditar" name="hrEntradaEditar" class="form-control" >
                </div>
                <div class="col-4">
                  <label for="hrChegadaEditar">Hora da baixa:</label>
                  <input type="time" id="hrChegadaEditar" name="hrChegadaEditar" class="form-control" >
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
                  <input type="time" id="hrEntradaVisualizar" name="hrEntradaVisualizar" class="form-control" readonly>
                </div>
                <div class="col-4">
                  <label for="hrChegadaVisualizar">Hora da baixa:</label>
                  <input type="time" id="hrChegadaVisualizar" name="hrChegadaVisualizar" class="form-control" readonly>
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
                    <label for="descricaoVisualizar">Descrição</label>
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