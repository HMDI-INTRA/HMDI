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

<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">

<!-- DataTables Buttons CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.7.1/css/buttons.dataTables.min.css">

<!-- jQuery -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
 
 <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
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
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Tabelas</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Tabelas</h6>
        </nav>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card mb-4">
          <div class="card-header pb-0 p-3">
            <div class="d-flex justify-content-between">
              <h4 class="mb-2">Controle de usuários</h4>
              <div class="col-auto">
                <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-user">Adicionar</button>
              </div>
            </div>
          </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0 table-common-wrapper" id="tableControleUser_wrapper">
                <table class="table align-items-center mb-0 table-common" id="tableControleUser">
                </table>
              </div>
            </div>
            <div id="funcionarioList"></div> 
          <!-- Modal -->
              <div class="modal fade" id="modal-user" tabindex="-1" role="dialog" aria-labelledby="user" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="user">Cadastrar novo usuário</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form id="cadastroUsuario">
                          <div class="mb-3">
                            <div class="row align-items-center mb-2">
                              <div class="form-group">
                                <div class="input-group mb-4">
                                  <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                                  <input class="form-control" name="nomeFun" id="nomeFun" placeholder="Nome do funcionário" type="text">
                                </div>
              
                              </div>
                              <div class="col-12">
                                <label for="nome">Nome completo:</label>
                                <input type="text" id="nome" name="nome" class="form-control" required>
                              </div>
                              <div class="col-12">
                                <label for="nomeUsuario">Nome de usuário:</label>
                                <input type="text" id="nomeUsuario" name="nomeUsuario" class="form-control" required>
                              </div>
                              <div class="col-12" hidden>
                                <label for="senha">Senha:</label>
                                <input type="password" id="senha" name="senha" class="form-control" value="123456" readonly>
                              </div>
                              <div class="col-12">
                                <label for="funcao">Função:</label>
                                <input hidden type="text" id="funcao" name="funcao">
                                <select id="funcaoSelect" class="form-control" required>
                                  <option value="" disabled selected>Selecione uma função</option>
                                  <option value="1">Administrador</option>
                                  <option value="0">Arquivo</option>
                                  <option value="2">Laboratorio</option>
                                  <option value="3">Laboratorio Gestor</option>
                                  <option value="4">Nir Eletiva Gestor</option>
                                  <option value="5">Nir Eletivas</option>
                                  <option value="6">Gestão de pessoas</option>
                                  <option value="7">Espaço Jasmim</option>
                                  <option value="8">Espaço Rosa</option>
                                  <option value="9">Internação Gestor</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div id="statusMessage"></div>
                          <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                          <button type="submit" class="btn bg-gradient-primary" id="saveChangesBtn">Cadatrar</button>
                      </form>
                    <div class="modal-footer">
                   
                    </div>
                  </div>
                </div>
              </div>
      
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Editar -->
    <div class="modal fade" id="modal-userEditar" tabindex="-1" role="dialog" aria-labelledby="userEditar" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="userEditar">Editar usuário</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="cadastroUsuarioEditar">
                  <div class="mb-3">
                    <div class="row align-items-center mb-2">
                      <div class="col-12" hidden>
                        <label for="idEditar">id:</label>
                        <input type="text" id="idEditar" name="idEditar" class="form-control" required>
                      </div>
                      <div class="col-12">
                        <label for="nomeEditar">Nome completo:</label>
                        <input type="text" id="nomeEditar" name="nomeEditar" class="form-control" required>
                      </div>
                      <div class="col-12">
                        <label for="nomeUsuarioEditar">Nome de usuário:</label>
                        <input type="text" id="nomeUsuarioEditar" name="nomeUsuarioEditar" class="form-control" required>
                      </div>
                      <div class="col-12" hidden>
                        <label for="senhaEditar">Senha:</label>
                        <input type="password" id="senhaEditar" name="senhaEditar" class="form-control" value="123456" readonly>
                      </div>
                      <div class="col-12">
                        <label for="funcaoEditar">Função:</label>
                        <input hidden type="text" id="funcaoEditar" name="funcaoEditar">
                        <select id="funcaoSelectEditar" class="form-control" required>
                          <option value="" disabled selected>Selecione uma função</option>
                          <option value="1">Administrador</option>
                          <option value="0">Arquivo</option>
                          <option value="2">Laboratorio</option>
                          <option value="3">Laboratorio Gestor</option>
                          <option value="4">Nir Eletiva Gestor</option>
                          <option value="5">Nir Eletivas</option>
                          <option value="6">Gestão de pessoas</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div id="statusMessage"></div>
                  <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                  <button type="submit" class="btn bg-gradient-primary" id="saveChangesBtn">Redefinir</button>
              </form>
            <div class="modal-footer">
            
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