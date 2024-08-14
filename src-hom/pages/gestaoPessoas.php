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
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Gestão de Pessoas</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Gestão de Pessoas</h6>
        </nav>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="nav-wrapper position-relative end-0">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" >
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="catraca-tab" data-bs-toggle="tab" data-bs-target="#catraca" type="button" role="tab" aria-controls="catraca" aria-selected="true">Acessos</button>
          </li>
        </ul>
        <div class="tab-content" id="ul-navContent">
          <div class="tab-pane fade show active" id="catraca" role="tabpanel" aria-labelledby="catraca-tab">
              <div class="card mb-4" style="border-radius: inherit;">
                  <div class="card-header pb-0 p-3">
                    <div class="d-flex justify-content-between">
                      <h4 class="mb-2">Central de acessos</h4>
                      <div class="col-auto">
                        <button type="button" class="btn btn-block btn-default mb-3" id="acesso-id" data-bs-toggle="modal" data-bs-target="#modal-catraca">Adicionar</button>
                        <div class="dropdown button-table">
                        <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                        </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <li><button class="dropdown-item btn-default" data-bs-toggle="modal" data-bs-target="#modalDatamart">Enviar Datamart</button></li>
                          </ul>
                      </div>
                      </div>
                  </div>
                </div>
                <div class="card-body px-0 pt-0 pb-2">
                  <div class="table-responsive p-0 table-common-wrapper" id="tableLaboratorioTrigemTable_wrapper">
                    <div style="overflow-x: auto;">
                      <table id="tabler034fun" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
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
        <div id="funcionarioList"></div> 
        <div class="modal fade" id="modal-catraca" tabindex="-1" role="dialog" aria-labelledby="modal-catraca"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
                <div class="card card-plain">
                  <div class="card-header pb-0 text-left">
                    <h3 class="font-weight-bolder text-primary text-gradient">Adicionar novo acesso*</h3>
                  </div>
                  <div class="card-body">
                    <form id="formAcessoCatraca">
                      <!-- Tabela r0034fun -->
                      <div class="row align-items-center mb-3">
                        <div class="col-4">
                          <div class="input-group mb-4">
                            <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                            <input class="form-control" name="nomeFun" id="nomeFun" placeholder="Nome do funcionário" type="text">
                          </div>
                        </div>
                        <div class="col-2"hidden>
                          <label for="tipcol">Tipo col:</label>
                          <input value="1" type="text" id="tipcol" name="tipcol" class="form-control" required readonly>
                        </div>
                        <div class="col-2">
                          <label for="numemp">Número Empresa:</label>
                          <input value="1" type="text" id="numemp" name="numemp" class="form-control" required readonly>
                        </div>
                        <div class="col-2">
                          <label for="numCad">Cod.Cadastro:</label>
                          <input type="text" id="numCad" name="numCad" class="form-control" required readonly>
                        </div>
                        <div class="col-4">
                          <label for="nr_prontuario">Prontuário:</label>
                          <input type="text" id="nr_prontuario" name="nr_prontuario" class="form-control">
                        </div>
                        <div class="col-12">
                          <label for="nomFun">Nome Completo:</label>
                          <input type="text" id="nomFun" name="nomFun" class="form-control" required>
                        </div>

                      </div>

                      <!-- Campo em hidden -->
                      <div class="row align-items-center mb-3">
                        <div class="col-2"hidden>
                          <label for="tipadm"></label>
                          <input value="0" type="text" id="tipadm" name="tipadm" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="estpos"></label>
                          <input value="0" type="text" id="estpos" name="estpos" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="postra"></label>
                          <input value=" " type="text" id="postra" name="postra" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codetb"></label>
                          <input value="0" type="text" id="codetb" name="codetb" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="estcar"></label>
                          <input value="0" type="text" id="estcar" name="estcar" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codesc"></label>
                          <input value="1" type="text" id="codesc" name="codesc" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="turint"></label>
                          <input value="0" type="text" id="turint" name="turint" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="taborg"></label>
                          <input value="0" type="text" id="taborg" name="taborg" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="tipcon"></label>
                          <input value="1" type="text" id="tipcon" name="tipcon" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="estciv"></label>
                          <input value="0" type="text" id="estciv" name="estciv" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="grains"></label>
                          <input value="0" type="text" id="grains" name="grains" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="anoche"></label>
                          <input value="0" type="text" id="anoche" name="anoche" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="visest"></label>
                          <input value="0" type="text" id="visest" name="visest" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="dvlest"></label>
                          <input value="31-12-1900" type="text" id="dvlest" name="dvlest" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="dvlctp"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="dvlctp" name="dvlctp" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="numctp"></label>
                          <input value="0" type="text" id="numctp" name="numctp" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="dexctp"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="dexctp" name="dexctp" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="numcpf"></label>
                          <input value="0" type="text" id="numcpf" name="numcpf" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="numpis"></label>
                          <input value="0" type="text" id="numpis" name="numpis" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="dcdpis"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="dcdpis" name="dcdpis" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datopc"></label>
                          <input value="31-12-1900" type="text" id="datopc" name="datopc" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="confgt"></label>
                          <input value="0" type="text" id="confgt" name="confgt" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="perjur"></label>
                          <input value="0" type="text" id="perjur" name="perjur" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="depirf"></label>
                          <input value="0" type="text" id="depirf" name="depirf" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="depsaf"></label>
                          <input value="0" type="text" id="depsaf" name="depsaf" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codban"></label>
                          <input value="0" type="text" id="codban" name="codban" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codage"></label>
                          <input value="0" type="text" id="codage" name="codage" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="conban"></label>
                          <input value="0" type="text" id="conban" name="conban" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="tipapo"></label>
                          <input value="0" type="text" id="tipapo" name="tipapo" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datapo"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datapo" name="datapo" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="valsup"></label>
                          <input value="0" type="text" id="valsup" name="valsup" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="escvtr"></label>
                          <input value="0" type="text" id="escvtr" name="escvtr" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="ponemb"></label>
                          <input value="0" type="text" id="ponemb" name="ponemb" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datinc"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datinc" name="datinc" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="horinc"></label>
                          <input value="0" type="text" id="horinc" name="horinc" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="salsim"></label>
                          <input value="0" type="text" id="salsim" name="salsim" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datsim"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datsim" name="datsim" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="outemp"></label>
                          <input value="0" type="text" id="outemp" name="outemp" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="outtip"></label>
                          <input value="0" type="text" id="outtip" name="outtip" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="outcad"></label>
                          <input value="0" type="text" id="outcad" name="outcad" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="ultcal"></label>
                          <input value="0" type="text" id="ultcal" name="ultcal" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="conrho"></label>
                          <input value="0" type="text" id="conrho" name="conrho" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="perdes"></label>
                          <input value="0" type="text" id="perdes" name="perdes" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="valsal"></label>
                          <input value="0" type="text" id="valsal" name="valsal" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="cplsal"></label>
                          <input value="0" type="text" id="cplsal" name="cplsal" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datsal"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datsal" name="datsal" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codmot"></label>
                          <input value="0" type="text" id="codmot" name="codmot" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="tipsal"></label>
                          <input value="0" type="text" id="tipsal" name="tipsal" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codest"></label>
                          <input value="0" type="text" id="codest" name="codest" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datafa"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datafa" name="datafa" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="horafa"></label>
                          <input value="0" type="text" id="horafa" name="horafa" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="caudem"></label>
                          <input value="0" type="text" id="caudem" name="caudem" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datpos"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datpos" name="datpos" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datcar"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datcar" name="datcar" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="motcar"></label>
                          <input value="0" type="text" id="motcar" name="motcar" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datesc"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datesc" name="datesc" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datloc"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datloc" name="datloc" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datccu"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datccu" name="datccu" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datfil"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datfil" name="datfil" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="cadfil"></label>
                          <input value="0" type="text" id="cadfil" name="cadfil" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="empfil"></label>
                          <input value="0" type="text" id="empfil" name="empfil" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datetb"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datetb" name="datetb" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datadi"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datadi" name="datadi" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="perins"></label>
                          <input value="0" type="text" id="perins" name="perins" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="perper"></label>
                          <input value="0" type="text" id="perper" name="perper" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="apoesp"></label>
                          <input value="0" type="text" id="apoesp" name="apoesp" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="periss"></label>
                          <input value="0" type="text" id="periss" name="periss" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="horbas"></label>
                          <input value="0" type="text" id="horbas" name="horbas" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="horsab"></label>
                          <input value="0" type="text" id="horsab" name="horsab" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="horsem"></label>
                          <input value="0" type="text" id="horsem" name="horsem" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="hordsr"></label>
                          <input value="0" type="text" id="hordsr" name="hordsr" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="depsld"></label>
                          <input value="0" type="text" id="depsld" name="depsld" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="jamsld"></label>
                          <input value="0" type="text" id="jamsld" name="jamsld" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datsld"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datsld" name="datsld" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="faiins"></label>
                          <input value="0" type="text" id="faiins" name="faiins" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="numins"></label>
                          <input value="0" type="text" id="numins" name="numins" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="dctins"></label>
                          <input value="0" type="text" id="dctins" name="dctins" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="dincra"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="dincra" name="dincra" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="hincra"></label>
                          <input value="0" type="text" id="hincra" name="hincra" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="elimar"></label>
                          <input value="0" type="text" id="elimar" name="elimar" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="fattpo"></label>
                          <input value="0" type="text" id="fattpo" name="fattpo" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="empres"></label>
                          <input value="0" type="text" id="empres" name="empres" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="tipres"></label>
                          <input value="0" type="text" id="tipres" name="tipres" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="cadres"></label>
                          <input value="0" type="text" id="cadres" name="cadres" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="tipter"></label>
                          <input value="0" type="text" id="tipter" name="tipter" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="inscur"></label>
                          <input value="0" type="text" id="inscur" name="inscur" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="assppr"></label>
                          <input value="0" type="text" id="assppr" name="assppr" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datppr"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datppr" name="datppr" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="perrea"></label>
                          <input value="0" type="text" id="perrea" name="perrea" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="gpstri"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="gpstri" name="gpstri" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="raccor"></label>
                          <input value="0" type="text" id="raccor" name="raccor" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codfor"></label>
                          <input value="0" type="text" id="codfor" name="codfor" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="perirt"></label>
                          <input value="0" type="text" id="perirt" name="perirt" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="coddef"></label>
                          <input value="0" type="text" id="coddef" name="coddef" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="catsef"></label>
                          <input value="0" type="text" id="catsef" name="catsef" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="dedins"></label>
                          <input value="0" type="text" id="dedins" name="dedins" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codglo"></label>
                          <input value="0" type="text" id="codglo" name="codglo" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="tipsrv"></label>
                          <input value="0" type="text" id="tipsrv" name="tipsrv" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="bushor"></label>
                          <input value="0" type="text" id="bushor" name="bushor" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="docest"></label>
                          <input value="0" type="text" id="docest" name="docest" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codidn"></label>
                          <input value="0" type="text" id="codidn" name="codidn" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="sisces"></label>
                          <input value="0" type="text" id="sisces" name="sisces" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="opcces"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="opcces" name="opcces" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="tpctba"></label>
                          <input value="0" type="text" id="tpctba" name="tpctba" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codlim"></label>
                          <input value="0" type="text" id="codlim" name="codlim" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codvin"></label>
                          <input value="0" type="text" id="codvin" name="codvin" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datvin"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datvin" name="datvin" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datsin"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datsin" name="datsin" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codpes"></label>
                          <input value="0" type="text" id="codpes" name="codpes" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datevt"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datevt" name="datevt" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="dataltt"></label>
                          <input value="23-01-2023" type="text" id="dataltt" name="dataltt" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="temhct"></label>
                          <input value="0" type="text" id="temhct" name="temhct" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="stahct"></label>
                          <input value="0" type="text" id="stahct" name="stahct" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="dathct"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="dathct" name="dathct" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datche"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datche" name="datche" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datsef"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datsef" name="datsef" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="seqreg"></label>
                          <input value="0" type="text" id="seqreg" name="seqreg" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="codpro"></label>
                          <input value="0" type="text" id="codpro" name="codpro" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="cateso"></label>
                          <input value="999" type="text" id="cateso" name="cateso" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datces"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datces" name="datces" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="staalf"></label>
                          <input value="0" type="text" id="staalf" name="staalf" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="datrei"></label>
                          <input value="31-12-1900 00:00:00.000" type="text" id="datrei" name="datrei" class="form-control" required readonly>
                        </div>
                      </div>
                      <!-- Fim campo em  hidden -->

                      <div class="row align-items-center mb-3">
                        <div class="col-3" >
                          <label for="apeFun">Apelido:</label>
                          <input type="text" id="apeFun" name="apeFun" class="form-control"  required>
                        </div>
                        <div class="col-3">
                          <label for="dtAdm">Data de Admissão:</label>
                          <input type="date" id="dtAdm" name="dtAdm" class="form-control" required >
                        </div>
                        <div class="col-3">
                            <label for="tipSex" class="form-label">Sexo:</label>
                            <select class="form-select" id="tipSex" name="tipSex" required>
                              <option selected disabled>Selecione o sexo...</option>
                              <option value="M">Masculino</option>
                              <option value="F">Feminino</option>
                            </select>
                        </div>
                        <div class="col-3">
                          <label for="datnas">Data de Nascimento:</label>
                          <input type="date" id="datnas" name="datnas" class="form-control" required >
                        </div>
                        <div class="col-3" hidden>
                            <label for="sitAfa" class="form-label">Situação:</label>
                            <select class="form-select" id="sitAfa" name="sitAfa" required>
                              <option selected disabled>Selecione a situação...</option>
                              <option value="1" selected>Trabalhando</option>
                              <option value="7">Demitido</option>
                              <option value="1">Visitante</option>
                            </select>
                        </div>
                        <div class="col-3"hidden>
                            <label for="codTap" class="form-label">Tipo Contrato:</label>
                            <select class="form-select" id="codTap" name="codTap" required>
                              <option selected disabled>Selecione o tipo...</option>
                              <option value="1" selected>Empregado</option>
                              <option value="1">Visitante</option>
                            </select>
                          </div>
                      </div>

                      <div class="row align-items-center mb-3">
                        <div class="col-3" hidden>
                            <label for="codnac" class="form-label">Nacionalidade:</label>
                            <select class="form-select" id="codnac" name="codnac" required>
                              <option selected disabled>Selecione a nacionalidade...</option>
                              <option value="10" selected>Brasileiro</option>
                              <option value="80">Outros</option>
                            </select>
                        </div>
                        <div class="col-3" hidden>
                          <label for="codfil" class="form-label">Filial:</label>
                            <select class="form-select" id="codfil" name="codfil" required>
                              <option selected disabled>Selecione a filial...</option>
                              <option value="1" selected>Hospital e Maternidade Dona Iris</option>
                            </select>
                        </div>
                      </div>

                      <div class="row align-items-center mb-3">
                        <div class="card-header pb-0 text-left">
                          <h6 class="font-weight-bolder text-primary text-gradient">Cadastrar cracha ou digital*</h6>
                        </div>
                        <div class="col-3" hidden>
                            <label for="numLoc" class="form-label">Local:</label>
                            <select class="form-select" id="numLoc" name="numLoc" required>
                              <option selected disabled>Selecione o local...</option>
                              <option value="1" selected>Dona Iris</option>
                            </select>
                        </div>
                        <div class="col-3" hidden>
                          <label for="codEsc">Escala:</label>
                          <input value='1' type="text" id="codEsc" name="codEsc" class="form-control" required readonly>
                        </div>
                        <div class="col-3" hidden>
                          <label for="codTma">Turma:</label>
                          <input value="1"  type="text" id="codTma" name="codTma" class="form-control" required readonly >
                        </div>
                        <div class="col-3">
                          <label for="datalt">Data inicial:</label>
                          <input type="date" id="datalt" name="datalt" class="form-control" required >
                        </div>
                        <div class="col-3">
                          <label for="datFim">Data Final:</label>
                          <input type="text" id="datFim" name="datFim" class="form-control" value="00-00-0000 00:00:00.000" readonly >
                        </div>
                        <div class="col-3">
                          <label for="numCra">Número do crachá:</label>
                          <input type="text" placeholder="100000000000" id="numCra" name="numCra" class="form-control" title="Número da frente do crachá" required >
                        </div>
                        <div class="col-3">
                          <label for="numFis">Número fisico do crachá:</label>
                          <input type="text" placeholder="499999" id="numFis" name="numFis" class="form-control" title="Número de trás do crachá" required maxlength="14">
                        </div>
                        <div class="col-3" hidden>
                          <label for="codCar">Cargo Opcional*:</label>
                          <input value=" " type="text" id="codCar" name="codCar" class="form-control" >
                        </div>
                      </div>
                    <!--Fim Tabela r0034fun -->

                    <!--Tabela r069fis -->
                      <div class="row align-items-center mb-3">

                        <div class="col-3" hidden>
                          <label for="tecCra" class="form-label">Tecnologia de acesso:</label>
                            <select class="form-select" id="tecCra" name="tecCra" required>
                              <option selected disabled>Selecione o tipo de acesso...</option>
                              <option value="1">Barras</option>
                              <option value="2" selected>Proximidade</option>
                              <option value="3">Smart Card</option>
                            </select>
                        </div>
                      </div>
                    <!--Fim Tabela r069fis -->
                    
                    <!--Tabela r0034dac -->
                      <div class="row align-items-center mb-3 nivel-acesso" hidden>
                        <div class="card-header pb-0 text-left">
                          <h6 class="font-weight-bolder text-primary text-gradient">Nivel de acesso*</h6>
                        </div>
                        <div class="col-2">
                          <label for="conAdp" class="form-label">Controla nível de anti-dupla:</label>
                            <select class="form-select" id="conAdp" name="conAdp" required>
                              <option value="S">Sim</option>
                              <option selected  value="N">Não</option>
                            </select>
                        </div>                                                           
                        <div class="col-2">
                          <label for="cinIai" class="form-label">Controla intervalo do almoço:</label>
                            <select class="form-select" id="cinIai" name="cinIai" required>
                              <option value="S">Sim</option>
                              <option selected  value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="tempAlm">Tempo mínimo do almoço:</label>
                          <input value="000" type="number" placeholder="000" id="tempAlm" name="tempAlm" class="form-control" title="Número de trás do crachá" required >
                        </div>
                        <div class="col-2">
                          <label for="conRee" class="form-label">Controla tempo minimo de reentrada:</label>
                            <select class="form-select" id="conRee" name="conRee" required>
                              <option value="S">Sim</option>
                              <option selected  value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="conPac" class="form-label">Controla permanência de acesso:</label>
                            <select class="form-select" id="conPac" name="conPac" required>
                              <option value="S">Sim</option>
                              <option selected  value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="bloFal" class="form-label">Bloqueio por falta:</label>
                            <select class="form-select" id="bloFal" name="bloFal" required>
                              <option value="S">Sim</option>
                              <option selected  value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="conFai" class="form-label">Controla faixa de horario:</label>
                            <select class="form-select" id="conFai" name="conFai" required>
                              <option selected value="0">Não verifica faxina</option>
                              <option value="1">Verifica todas as faixas de acesso</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="conCre" class="form-label">Controla créditos de acesso:</label>
                            <select class="form-select" id="conCre" name="conCre" required>
                              <option selected value="0">Não controla créditos de acesso</option>
                              <option value="1">Controla todos os créditos de acesso</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="verPrm" class="form-label">Verifica permissão:</label>
                            <select class="form-select" id="verPrm" name="verPrm" required>
                              <option selected value="S">Sim</option>
                              <option value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="autAgv" class="form-label">Autoriza agendamento de visita:</label>
                            <select class="form-select" id="autAgv" name="autAgv" required>
                              <option value="S">Sim</option>
                              <option selected  value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="autAsa" class="form-label">Autoriza saida de colaborador:</label>
                            <select class="form-select" id="autAsa" name="autAsa" required>
                              <option value="S">Sim</option>
                              <option selected  value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="autExt" class="form-label">Autoriza hora extra:</label>
                            <select class="form-select" id="autExt" name="autExt" required>
                              <option value="S">Sim</option>
                              <option selected  value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="recVis" class="form-label">Pode receber visita:</label>
                            <select class="form-select" id="recVis" name="recVis" required>
                              <option value="S">Sim</option>
                              <option selected  value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="usaBio" class="form-label">Utiliza controle biométrico:</label>
                            <select class="form-select" id="usaBio" name="usaBio" required>
                              <option value="1">Não utiliza biometria</option>
                              <option value="2">Utiliza biometria - com validação crachá</option>
                              <option selected  value="3">Utiliza biometria - sem validação crachá</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="graCon">Grau de conferência biométrica:</label>
                          <input value="010" type="number" id="graCon" name="graCon" class="form-control" title="Número de trás do crachá" required >
                        </div>

                        <!-- Premissão -->
                        <div class="col-2">
                          <label for="prmVis" class="form-label text-danger">Pemissão do visitante:</label>
                            <select class="form-select" id="prmVis" name="prmVis" required>
                              <option selected value="0">Sem acesso</option>
                              <option value="1">Bloqueia todos</option>
                              <option value="2">Pemissão total</option>
                              <option value="15">Porta Uti</option>
                              <option value="14">Visitante emergência</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="codPrm" class="form-label text-danger">Permissão dias normais:</label>
                            <select class="form-select" id="codPrm" name="codPrm" required>
                              <option selected value="0">Sem acesso</option>
                              <option value="1">Bloqueia todos</option>
                              <option value="2" selected>Pemissão total</option>
                              <option value="15">Porta Uti</option>
                              <option value="14">Visitante emergência</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="prmFer" class="form-label text-danger">Permissão feriado:</label>
                            <select class="form-select" id="prmFer" name="prmFer" required>
                              <option selected value="0">Sem acesso</option>
                              <option value="1">Bloqueia todos</option>
                              <option value="2" selected>Pemissão total</option>
                              <option value="15">Porta Uti</option>
                              <option value="14">Visitante emergência</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="prmSab" class="form-label text-danger">Permissão Sabado:</label>
                            <select class="form-select" id="prmSab" name="prmSab" required>
                              <option selected value="0">Sem acesso</option>
                              <option value="1">Bloqueia todos</option>
                              <option value="2" selected>Pemissão total</option>
                              <option value="15">Porta Uti</option>
                              <option value="14">Visitante emergência</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="prmDom" class="form-label text-danger">Permissão Domingo:</label>
                            <select class="form-select" id="prmDom" name="prmDom" required>
                              <option selected value="0">Sem acesso</option>
                              <option value="1">Bloqueia todos</option>
                              <option value="2" selected>Pemissão total</option>
                              <option value="15">Porta Uti</option>
                              <option value="14">Visitante emergência</option>
                            </select>
                        </div>
                        <!--Fim Permissão -->

                        <div class="col-2">
                          <label for="autDbl" class="form-label">Autorizador de desbloqueio:</label>
                            <select class="form-select" id="autDbl" name="autDbl" required>
                              <option value="S">Sim</option>
                              <option selected value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="aprSol" class="form-label">Autorizador de solicitação de veículos WEB:</label>
                            <select class="form-select" id="aprSol" name="aprSol" required>
                              <option value="S">Sim</option>
                              <option selected value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="verAfa" class="form-label">Verifica afastamento:</label>
                            <select class="form-select" id="verAfa" name="verAfa" required>
                              <option value="S">Sim</option>
                              <option selected value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="conInt" class="form-label">Controla interjornada:</label>
                            <select class="form-select" id="conInt" name="conInt" required>
                              <option value="S">Sim</option>
                              <option selected value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="tolInt">Tolerância para controle de interjornada:</label>
                          <input value="000" type="number" id="tolInt" name="tolInt" class="form-control" title="Número de trás do crachá" required >
                        </div>
                        <div class="col-2">
                          <label for="conRea" class="form-label">Participa de revista aleatória:</label>
                            <select class="form-select" id="conRea" name="conRea" required>
                              <option value="S">Sim</option>
                              <option selected value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="utiChv" class="form-label">Utiliza controle de Chaves:</label>
                            <select class="form-select" id="utiChv" name="utiChv" required>
                              <option value="S">Sim</option>
                              <option selected value="N">Não</option>
                            </select>
                        </div>
                        <div class="col-2">
                          <label for="repOnl" class="form-label">REP online:</label>
                            <select class="form-select" id="repOnl" name="repOnl" required>
                              <option value="S">Sim</option>
                              <option selected value="N">Não</option>
                            </select>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class= "col-6">
                          <div id="statusMessage"></div>
                          <button type="submit" class="btn bg-gradient-primary">Gravar Smart</button>
                          <button type="button" class="btn bg-gradient-secondary " data-bs-dismiss="modal">Fechar</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Editar -->
      <div class="col-md-4">
        <div class="modal fade" id="modal-catraca-edit" tabindex="-1" role="dialog" aria-labelledby="modal-catraca-edit"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
                <div class="card card-plain">
                  <div class="card-header pb-0 text-left">
                    <h3 class="font-weight-bolder text-primary text-gradient">Editar acesso*</h3>
                  </div>
                  <div class="card-body">
                    <form id="formAcessoCatracaEdit">
                    <div class="alert alert-success" role="alert">
                      Para inativar o acesso, definir data final!.
                    </div>
                      <!-- Tabela r0034fun -->
                      <div class="row align-items-center mb-3">
                        <div class="col-2"hidden>
                          <label for="tipcolEdit">Tipo col:</label>
                          <input value="0" type="text" id="tipcolEdit" name="tipcolEdit" class="form-control" required readonly>
                        </div>
                        <div class="col-2"hidden>
                          <label for="teccraEdit">Tipo col:</label>
                          <input value="2" type="text" id="teccraEdit" name="teccraEdit" class="form-control" required readonly>
                        </div>
                        <div class="col-2">
                          <label for="numempEdit">Número Empresa:</label>
                          <input value="1" type="text" id="numempEdit" name="numempEdit" class="form-control"  readonly>
                        </div>
                        <div class="col-2">
                          <label for="numCadEdit">Cod.Cadastro:</label>
                          <input type="text" id="numCadEdit" name="numCadEdit" class="form-control"  readonly>
                        </div>
                        <div class="col-6">
                          <label for="nomFunEdit">Nome Completo:</label>
                          <input type="text" id="nomFunEdit" name="nomFunEdit" class="form-control" readonly>
                        </div>
                      </div>
                      <div class="row align-items-center mb-3">
                        <div class="col-3">
                          <label for="apeFunEdit">Apelido:</label>
                          <input type="text" id="apeFunEdit" name="apeFunEdit" class="form-control" readonly>
                        </div>
                        <div class="col-3">
                          <label for="datnasEdit">Data de Nascimento:</label>
                          <input type="text" id="datnasEdit" name="datnasEdit" class="form-control" readonly >
                        </div>
                        <div class="col-3">
                          <label for="dtAdmEdit">Data inicial:</label>
                          <input type="text" id="dtAdmEdit" name="dtAdmEdit" class="form-control"  >
                        </div>
                        <div class="col-3">
                          <label for="datfimEdit">Data final:</label>
                          <input type="text" id="datfimEdit" name="datfimEdit" class="form-control"  >
                        </div>
                      </div>
                    <!--Tabela r069fis -->
                      <div class="row align-items-center mb-3">
                        <div class="col-3">
                          <label for="numCraEdit">Número do crachá:</label>
                          <input type="text" placeholder="100000000000" id="numCraEdit" name="numCraEdit" class="form-control" title="Número da frente do crachá" readonly>
                        </div>
                        <div class="col-3">
                          <label for="numFisEdit">Número fisico do crachá:</label>
                          <input type="text" placeholder="499999" id="numFisEdit" name="numFisEdit" class="form-control" title="Número de trás do crachá" required >
                        </div>
                      </div>
                      <!--Fim Tabela r069fis -->
                      <div class="row mb-3">
                        <div class= "col-6">
                          <div id="statusMessage"></div>
                          <button type="submit" class="btn bg-gradient-primary">Gravar Smart</button>
                          <button type="button" class="btn bg-gradient-secondary " data-bs-dismiss="modal">Fechar</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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