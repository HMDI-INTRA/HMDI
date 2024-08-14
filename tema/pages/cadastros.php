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
                                          $equipe_ti = json_decode(file_get_contents('http://localhost/src/services/api/equipe_ti.php?t=' . time()), true);
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
                                          $equipe_ti = json_decode(file_get_contents('http://localhost/src/services/api/equipe_ti.php?t=' . time()), true);

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
                  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
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
                              <div class="col-2">
                                <button type="button" class="btn btn-block btn-default mb-3"  data-bs-toggle="modal" data-bs-target="#modal-prev">Adicionar</button>
                                  </div>  
                                <div class="col-2">
                                <button type="button" class="btn btn-block btn-default mb-3" id="excluir-all-preventivas" >Excluir</button>
                                </div>
                              <div class="coluna">
                                <div class="dropdown button-table">
                                  <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                      <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                  </button>
                                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                      <li><a href="http://localhost/src/services/relatorio/xlsx/preventivas.php" class="dropdown-item">Relatório</a></li>
                                      <li><a href="http://localhost/src/services/relatorio/xlsx/preventivas-vencidas.php" class="dropdown-item">Relatório vencidas</a></li>
                                  </ul>
                                </div>
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
                                <div class="col-auto" id="btnAllDelete">
                                  <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modalCsv">
                                      Importar csv
                                  </button>
                                  <button type="button" class="btn btn-block btn-default mb-3" id="excluir-all-aniversariantes" >Excluir</button>
                                </div>
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