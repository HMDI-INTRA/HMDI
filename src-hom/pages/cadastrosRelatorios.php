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
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Cadastros</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Cadastros</h6>
        </nav>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
    <!-- Modal ADD -->
    <div class="col-md-4">
        <div class="modal fade" id="modal-prev" tabindex="-1" role="dialog" aria-labelledby="modal-prev"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
                <div class="card card-plain">
                  <div class="card-header pb-0 text-left">
                    <h3 class="font-weight-bolder text-info text-gradient">Adicionar preventiva</h3>
                    <p class="mb-0">Preencha todos os campos*</p>
                  </div>
                  <div class="card-body">
                    <form id="preventivaForm">
                      <div class="row align-items-center mb-2">
                        <div class="col-4">
                          <label for="patrimonio">Número de patrimônio:</label>
                          <input type="text" id="patrimonio" name="patrimonio" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="monitor">Número de monitor:</label>
                          <input type="text" id="monitor" name="monitor" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="descricao">Modelo do desktop:</label>
                          <input type="text" id="descricao" name="descricao" class="form-control" required>
                        </div>
                      </div>
                      <div class="row align-items-center mb-2">
                        <div class="col-4">
                          <label for="andar">Andar:</label>
                          <input hidden type="text" id="andar" name="andar">
                          <select id="andarSelect" class="form-control" required>
                            <option value="" disabled selected>Selecione um andar</option>
                            <option value="Subsolo">Subsolo</option>
                            <option value="Terreo">Térreo</option>
                            <option value="1-Andar">1º Andar</option>
                            <option value="2-Andar">2º Andar</option>
                          </select>
                        </div>


                        <div class="col-4">
                          <label for="custo">Centro de custo:</label>
                          <input type="text" id="custo" name="custo" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="local">Local:</label>
                          <input type="text" id="local" name="local" class="form-control" required>
                        </div>
                      </div>

                      <div class="row align-items-center mb-2">
                        <div class="col-4">
                          <label for="hostAntigo">Nome de host antigo:</label>
                          <input type="text" id="hostAntigo" name="hostAntigo" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="hostNovo">Número de host novo:</label>
                          <input type="text" id="hostNovo" name="hostNovo" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="modelo">Versão do Office:</label>
                          <input hidden type="text" id="modelo" name="modelo">
                          <select id="modeloSelect" class="form-control" required>
                            <option value="" disabled selected>Selecione uma versão</option>
                            <option value="Office 2013">Office 2013</option>
                            <option value="Office 2016">Office 2016</option>
                            <option value="Office 2019">Office 2019</option>
                            <option value="Office 365">Office 365</option>
                            <option value="Sem office">Sem office</option>
                          </select>
                        </div>
                      </div>
                      <div class="row align-items-center mb-2">
                        <div class="col-6">
                          <label for="office">Senha do office:</label>
                          <input type="text" id="office" name="office" class="form-control" required>
                        </div>
                        <div class="col-6">
                          <label for="perifericos">Periféricos:</label>
                            <input hidden type="text" id="perifericos" name="perifericos">
                            <img src="https://www.oki.com/br/printing/images/PN307_H_tcm64-129052.png" width="25px"></img>
                            <select id="perifericosSelect" class="form-control">
                              <option value="" disabled selected>Selecione uma impressora</option>
                              <option value="Oki ES5112 MFP">ES5112 MFP</option>
                              <option value="Oki ES4172LP MFP">ES4172LP MFP</option>
                              <option value="Oki MPS5502MB">MPS5502MB</option>
                              <option value="Oki MPS5501MB">MPS5501MB</option>
                              <option value="GAINSCHA 2208D">GAINSCHA</option>
                              <option value="ZEBRA">ZEBRA</option>
                              <option value="DIVERSAS">DIVERSAS</option>
                            </select>
                          </div>
                        </div>
                        <div class="row align-items-center mb-2">
                          <div class="col-4">
                            <label for="sistemaOperacional">Sistema Operacional:</label>
                            <input hidden type="text" id="sistemaOperacional" name="sistemaOperacional">
                            <select id="sistemaOperacionalSelect" class="form-control" required>
                              <option value="" disabled selected>Selecione uma versão</option>
                              <option value="Windows 10">Windows 10</option>
                              <option value="Windows 11">Windows 11</option>
                              <option value="Windows Server">Windows Server</option>
                              <option value="Linux Mint">Linux Mint</option>
                              <option value="Linux Ubuntu">Linux Ubuntu</option>
                              <option value="Linux Debian">Linux Debian</option>
                              <option value="Linux Centos">Linux CentOS</option>
        
                            </select>
                          </div>
                          <div class="col-4">
                            <label for="login">Login de acesso:</label>
                            <input type="text" id="login" name="login" class="form-control" required>
                          </div>
                          <div class="col-4">
                            <label for="tecnico">Executada por:</label>
                            <input type="text" id="tecnico" name="tecnico" hidden>
                            <select id="tecnicoSelect" class="form-control" >
                              <option value="" disabled selected>Selecione um colaborador</option>
                              <?php
                                  $equipe_ti = json_decode(file_get_contents('http://10.1.1.108/intranet/src/services/api/equipe_ti.php?t=' . time()), true);
                                  foreach ($equipe_ti as $tecnico) {
                                      echo "<option value='" . $tecnico['id'] . "' data-id='" . $tecnico['nome'] . "'>" . $tecnico['nome'] . "</option>";
                                  }
                                  ?>
                            </select>
                          </div>

                        </div>
                        <div class="row align-items-center mb-3">
                          <div class="col-4">
                            <label for="dataPrev">Data da preventiva:</label>
                            <input type="date" id="dataPrev" name="dataPrev" class="form-control" required>
                          </div>
                          <div class="col-4">
                            <label for="dataProx">Data da Próxima:</label>
                            <input type="date" id="dataProx" name="dataProx" class="form-control" required readonly>
                          </div>
                          <div class="col-4">
                            <label for="observacao">Observação:</label>
                            <textarea type="" id="observacao" name="observacao" class="form-control" required
                              rows="2"></textarea>
                          </div>
                        </div>

                        <div>
                          <div id="statusMessage"></div>
                          <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" class="btn bg-gradient-primary">Salvar</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       <!-- Modal ADD -->
    <div class="col-md-4">
        <div class="modal fade" id="modal-prev-editar" tabindex="-1" role="dialog" aria-labelledby="modal-prev-editar"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
                <div class="card card-plain">
                  <div class="card-header pb-0 text-left">
                    <h3 class="font-weight-bolder text-info text-gradient">Editar preventiva</h3>
                    <p class="mb-0">Preencha todos os campos*</p>
                  </div>
                  <div class="card-body">
                    <form id="preventivaFormEditar">
                      <div class="row align-items-center mb-2">
                        <div hidden class="col-4">
                          <label for="idEditar">Id:</label>
                          <input type="text" id="idEditar" name="idEditar" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="patrimonioEditar">Número de patrimônio:</label>
                          <input type="text" id="patrimonioEditar" name="patrimonioEditar" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="monitorEditar">Número de monitor:</label>
                          <input type="text" id="monitorEditar" name="monitorEditar" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="descricaoEditar">Modelo do desktop:</label>
                          <input type="text" id="descricaoEditar" name="descricaoEditar" class="form-control" required>
                        </div>
                      </div>

                      <div class="row align-items-center mb-2">
                        <div class="col-4">
                          <label for="andarEditar">Andar:</label>
                          <input hidden type="text" id="andarEditar" name="andarEditar">
                          <select id="andarSelectEditar" class="form-control" required>
                            <option value="" disabled selected>Selecione um andar</option>
                            <option value="Subsolo">Subsolo</option>
                            <option value="Terreo">Térreo</option>
                            <option value="1-Andar">1º Andar</option>
                            <option value="2-Andar">2º Andar</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label for="custoEditar">Centro de custo:</label>
                          <input type="text" id="custoEditar" name="custoEditar" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="localEditar">Local:</label>
                          <input type="text" id="localEditar" name="localEditar" class="form-control" required>
                        </div>
                      </div>

                      <div class="row align-items-center mb-2">
                        <div class="col-4">
                          <label for="hostAntigoEditar">Nome de host antigo:</label>
                          <input type="text" id="hostAntigoEditar" name="hostAntigoEditar" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="hostNovoEditar">Número de host novo:</label>
                          <input type="text" id="hostNovoEditar" name="hostNovoEditar" class="form-control" required>
                        </div>
                        <div class="col-4">
                          <label for="modeloEditar">Versão do Office:</label>
                          <input hidden type="text" id="modeloEditar" name="modeloEditar">
                          <select id="modeloSelectEditar" class="form-control" required>
                            <option value="" disabled selected>Selecione uma versão</option>
                            <option value="Office 2013">Office 2013</option>
                            <option value="Office 2016">Office 2016</option>
                            <option value="Office 2019">Office 2019</option>
                            <option value="Office 365">Office 365</option>
                            <option value="Sem office">Sem office</option>
                          </select>
                        </div>
                      </div>
                      <div class="row align-items-center mb-2">
                        <div class="col-6">
                          <label for="officeEditar">Senha do office:</label>
                          <input type="text" id="officeEditar" name="officeEditar" class="form-control" required>
                        </div>
                        <div class="col-6">
                          <label for="perifericosEditar">Periféricos:</label>
                            <input hidden type="text" id="perifericosEditar" name="perifericosEditar">
                            <img src="https://www.oki.com/br/printing/images/PN307_H_tcm64-129052.png" width="25px"></img>
                            <select id="perifericosSelectEditar" class="form-control">
                              <option value="" disabled selected>Selecione uma impressora</option>
                              <option value="Oki ES5112 MFP">ES5112 MFP</option>
                              <option value="Oki ES4172LP MFP">ES4172LP MFP</option>
                              <option value="Oki MPS5502MB">MPS5502MB</option>
                              <option value="Oki MPS5501MB">MPS5501MB</option>
                              <option value="GAINSCHA 2208D">GAINSCHA</option>
                              <option value="ZEBRA">ZEBRA</option>
                              <option value="DIVERSAS">DIVERSAS</option>
                            </select>
                          </div>
                        </div>
                        <div class="row align-items-center mb-2">
                          <div class="col-4">
                            <label for="sistemaOperacionalEditar">Sistema Operacional:</label>
                            <input hidden type="text" id="sistemaOperacionalEditar" name="sistemaOperacionalEditar">
                            <select id="sistemaOperacionalSelectEditar" class="form-control" required>
                              <option value="" disabled selected>Selecione uma versão</option>
                              <option value="Windows 10">Windows 10</option>
                              <option value="Windows 11">Windows 11</option>
                              <option value="Windows Server">Windows Server</option>
                              <option value="Linux Mint">Linux Mint</option>
                              <option value="Linux Ubuntu">Linux Ubuntu</option>
                              <option value="Linux Debian">Linux Debian</option>
                              <option value="Linux Centos">Linux CentOS</option>
                              
                            </select>
                          </div>
                          <div class="col-4">
                            <label for="loginEditar">Login de acesso:</label>
                            <input type="text" id="loginEditar" name="loginEditar" class="form-control" required>
                          </div>
                          <div class="col-4">
                            <label for="tecnicoEditar">Executada por:</label>
                            <input type="text" id="tecnicoEditar" name="tecnicoEditar" hidden>
                            <select id="tecnicoSelectEditar" class="form-control" required>
                              <option value="" disabled selected>Selecione um colaborador</option>

                              <?php
                                  $equipe_ti = json_decode(file_get_contents('http://10.1.1.108/intranet/src/services/api/equipe_ti.php?t=' . time()), true);

                                  foreach ($equipe_ti as $tecnico) {
                                      
                                      echo "<option value='" . $tecnico['id'] . "' data-id='" . $tecnico['nome'] . "'>" . $tecnico['nome'] . "</option>";
                                  }
                                  ?>
                            </select>
                          </div>

                        </div>

                        <div class="row align-items-center mb-3">
                          <div class="col-4">
                            <label for="dataPrevEditar">Data da preventiva:</label>
                            <input type="date" id="dataPrevEditar" name="dataPrevEditar" class="form-control" required>
                          </div>
                          <div class="col-4">
                            <label for="dataProxEditar">Data da Próxima:</label>
                            <input type="date" id="dataProxEditar" name="dataProxEditar" class="form-control" required readonly>
                          </div>
                          <div class="col-4">
                            <label for="observacaoEditar">Observação:</label>
                            <textarea type="" id="observacaoEditar" name="observacaoEditar" class="form-control" required
                              rows="2"></textarea>
                          </div>
                        </div>

                        <div>
                          <div id="statusMessage"></div>
                          <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" class="btn bg-gradient-primary">Salvar</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="">
        <div class="nav-wrapper position-relative end-0">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" >
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="preventiva-tab" data-bs-toggle="pill" data-bs-target="#preventiva" type="button" role="tab" aria-controls="preventiva" aria-selected="true">Preventivas</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="aniversariante-tab" data-bs-toggle="pill" data-bs-target="#aniversariante" type="button" role="tab" aria-controls="aniversariante" aria-selected="false">Aniversariantes</button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" id="preventiva" role="tabpanel" aria-labelledby="preventiva-tab">
                  <div class="card mb-4" style="border-radius: inherit;">
                    <div class="d-flex justify-content-between">
                      <h4 class="mb-2">Preventivas</h4>
                      <div class="col-auto">
                          <a class="btn btn-block btn-default mb-3"  href="http://10.1.1.108/intranet/src/services/relatorio/xlsx/preventivas.php" class="dropdown-item">Relatório</a>
                          <a  class="btn btn-block btn-default mb-3"  href="http://10.1.1.108/intranet/src/services/relatorio/xlsx/preventivas-vencidas.php" class="dropdown-item">Relatório vencidas</a> 
                      </div>
                  </div>
                <div class="table-responsive p-0 table-common-wrapper" id="tablePreventiva_wrapper">
                <div style="overflow-x: auto;">
                  <table class="table align-items-center mb-0 table-common" id="tablePreventiva">
                  </table>
                </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="aniversariante" role="tabpanel" aria-labelledby="aniversariante-tab">
              <div class="col-12">
                <div class="card mb-4" style="border-radius: inherit;">
                  <div class="card-header pb-0 p-3">
                      <div class="d-flex justify-content-between">
                        <h4 class="mb-2">Aniversariantes</h4>
                       
                      </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0 table-common-wrapper" id="tableAniversariante_wrapper">
                            <table id="tableAniversariante" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                                
                            </table>
                        </div>
                    </div>
                    <div id="loadingOverlay" style="display: none;">
                      <img src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="Carregando..." class="loading" />
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="modalCsv" tabindex="-1" role="dialog" aria-labelledby="csv" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="csv">Importar CSV</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                          <form id="csvForm" enctype="multipart/form-data">
                              <div class="mb-3">
                                  <label for="csvFile" class="form-label">Escolher arquivo CSV</label>
                                  <input type="file" class="form-control" id="csvFile" accept=".csv" name="csvFile">
                              </div>
                              <div id="statusMessage"></div>
                          </form>
                            <div id="fileInfo" class="d-none">
                              <p><strong>Arquivo:</strong> <span id="fileName"></span></p>
                              <p><strong>Tamanho:</strong> <span id="fileSize"></span></p>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" class="btn bg-gradient-primary" id="saveChangesBtn">Importar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            </div>
            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
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