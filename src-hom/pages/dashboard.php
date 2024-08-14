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
  <!-- Nucleo Icons -->
  <link href="../assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link id="pagestyle" href="../assets/css/argon-dashboard.css?v=2.0.4" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>

<body class="g-sidenav-show   bg-gray-100" id="body">
<div class="container-fluid navbar navbar-expand-lg navbar-light bg-light">

<a class="navbar-brand m-0" href="#">
    <img src="../assets/img/favicon.png" class="navbar-brand-img h-100" alt="main_logo">
</a>
<div class="collapse navbar-collapse" id="navbarScroll">
    <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
        <li class="nav-item dropdown dropdown-wide">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" >
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
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Dashboard</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Dashboard</h6>
        </nav>
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          </div>
          <!-- Adiconar alerta de alterações para futuro proxímo -->
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <form action="" id="tecCard" name="tecCard"></form>
      <div class="row">
        <div class="col-6">
            <div class="card">
                <div class="card-header pb-0 p-3">
                    <div class="d-flex align-items-center">
                        <h6 class="mb-0">Grafico global</h6>

                    </div>
                </div>
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-5 text-center">
                            <div id="table-responsive-vencida" class="mb-3">
                            </div>
                            <div class="chart">
                                <canvas id="chart-vencidas" class=""></canvas>
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="table">
                              <table class="table align-items-center mb-0">
                                <tbody id="table-responsive-tbody">

                                </tbody>
                              </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div class="col-6">
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
                  <canvas id="chart-line" class="chart-canvas" height="150"></canvas>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="row mt-4">
        <div class="col-lg-12 mb-lg-0 mb-4">
          <div class="card ">
            <div class="card-header pb-0 p-3">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2">Equipe - T.I.</h6>
                <div class="col-auto">
                <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-equipeTi">Adicionar</button>
                </div>
                   <!-- Modal ADD -->
                  <div class="modal fade" id="modal-equipeTi" tabindex="-1" role="dialog" aria-labelledby="modal-equipeTi" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-body p-0">
                          <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                              <h3 class="font-weight-bolder text-info text-gradient">Adicionar</h3>
                              <p class="mb-0">Preencha todos os campos*</p>
                            </div>
                            <div class="card-body">
                              <form id="tecnicosForm">
                                <div class="form-group-hidden" hidden>
                                  <label for="id">id:</label>
                                  <input type="text" class="form-control" id="id" name="id">
                                </div>
                                <div class="form-group">
                                    <label for="nome">Nome:</label>
                                    <input type="text" class="form-control" id="nome" name="nome" required>
                                </div>
                                <div class="form-group">
                                    <label for="funcao">Função:</label>
                                    <input type="text" class="form-control" id="funcao" name="funcao" required>
                                </div>
                                <div class="form-group">
                                    <label for="dt_entrada">Data de Entrada:</label>
                                    <input type="date" class="form-control" id="dt_entrada" name="dt_entrada" required>
                                </div>
                                <div id="statusMessage"></div>
                                <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn bg-gradient-primary">Salvar</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 <!-- Modal EDIT -->
                 <div class="modal fade" id="tecnicoEditModal" tabindex="-1" role="dialog" aria-labelledby="tecnicoEditModal" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-body p-0">
                        <div class="card card-plain">
                          <div class="card-header pb-0 text-left">
                            <h3 class="font-weight-bolder text-info text-gradient">Editar</h3>
                            <p class="mb-0">Preencha todos os campos*</p>
                          </div>
                          <div class="card-body">
                            <form id="formEditTecnico">
                                <div class="form-group" hidden>
                                  <label for="idEdit">id:</label>
                                  <input type="text" class="form-control" id="idEdit" name="idEdit">
                                </div>
                                <div class="form-group">
                                  <label for="nomeEdit">Nome:</label>
                                  <input type="text" class="form-control" id="nomeEdit" name="nomeEdit" required>
                                </div>
                                <div class="form-group">
                                  <label for="funcaoEdit">Função:</label>
                                  <input type="text" class="form-control" id="funcaoEdit" name="funcaoEdit" required>
                                </div>
                                <div class="form-group">
                                  <label for="dt_entradaEdit">Data de Entrada:</label>
                                  <input type="date" class="form-control" id="dt_entradaEdit" name="dt_entradaEdit" required>
                                </div>
                                <div id="statusMessage"></div>
                                <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn bg-gradient-primary">Salvar</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>                
              </div>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center ">
                <tbody id="tableTec">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mt-4">
          <h5>Criador de Gráficos</h5>
        <form id='formgrafico'>
          <div class="form-group">
              <label for="chartName">Nome do Gráfico:</label>
              <input type="text" class="form-control" id="chartName">
          </div>
          <div class="form-group">
              <label for="tableName">Nome da Tabela:</label>
              <input type="text" class="form-control" id="tableName">
          </div>
          <div class="form-group">
              <label for="fields">Campos (separados por vírgula):</label>
              <input type="text" class="form-control" id="fields">
          </div>
          <div class="form-group">
              <label for="dateField">Campo de Data:</label>
              <input type="text" class="form-control" id="dateField">
          </div>
        </form>
          <button type="button" id='saveChartBtn' class="btn btn-primary">Salvar Gráfico</button>
        </div>
        <div class="col-6 mt-4">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <h6 class="mb-0">Computadores conectados</h6>
            </div>
            <div class="card-body p-6" id="hostname">
              <h6 class="mb-0">Meu IP</h5>
              <ul class="list-group" id="hostname-list">
              </ul>
              <h6 class="mb-0">Histórico</h5>
              <div class="ip_list">
                <ul class="list-group" id="ip-list">
              </div>

              <ul>
          </div>
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
    </div>
  </main>
  <!--   Core JS Files   -->
  <script src="../assets/js/core/popper.min.js"></script>
  <script src="../assets/js/core/bootstrap.min.js"></script>
  <script src="../assets/js/plugins/perfect-scrollbar.min.js"></script>
  <script src="../assets/js/plugins/smooth-scrollbar.min.js"></script>
  <script src="../assets/js/plugins/chartjs.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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