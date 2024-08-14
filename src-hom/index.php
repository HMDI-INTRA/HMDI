<?php
//****Autor: Josélio Dias Mendonça*******//
ini_set('display_errors', 1);
error_reporting(E_ALL);
include_once 'services/connection/conexao-login.php';
session_start();
session_unset();
ob_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="apple-touch-icon" sizes="76x76" href="./assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="./assets/img/favicon.png">
  <title>Hospital e Maternidade Dona Iris</title>
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
  <!-- Fonts and icons -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
  <!-- Nucleo Icons -->
  <link href="./assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="./assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <link href="./assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link id="pagestyle" href="./assets/css/argon-dashboard.css?v=2.0.4" rel="stylesheet" />
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
</head>

<body class="">
  <main class="main-content mt-0">
  <div class="container">

<!-- Outer Row -->
<div class="row justify-content-center">

    <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-login-image">
                        <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style="background-image: url('./Logo.png'); background-size: cover;">
                            <span class="mask bg-gradient-primary opacity-1"></span>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">ChartEase - CMS</h1>
                            </div>
                            <?php
                                ini_set('display_errors', 1);
                                error_reporting(E_ALL);
              
                                // Exibir mensagem de erro ou sucesso do modal
                                if (isset($_SESSION['modal_msg'])) {
                                  echo $_SESSION['modal_msg'];
                                  unset($_SESSION['modal_msg']);
                                }
              
                                if (isset($_POST['SendLogin'])) {
                                  $usuario = $_POST['usuario'];
                                  $senha_usuario = $_POST['senha_usuario'];
              
                                  $query_usuario = "SELECT id, nome, usuario, senha_usuario, funcao
                                                    FROM acesso_cadastro
                                                    WHERE usuario = :usuario
                                                    LIMIT 1";
                                  $result_usuario = $conn->prepare($query_usuario);
                                  $result_usuario->bindParam(':usuario', $usuario, PDO::PARAM_STR);
                                  $result_usuario->execute();
              
                                  if ($result_usuario && $result_usuario->rowCount() == 1) {
                                    $row_usuario = $result_usuario->fetch(PDO::FETCH_ASSOC);
              
                                    if (password_verify($senha_usuario, $row_usuario['senha_usuario'])) {
                                      $_SESSION['id'] = $row_usuario['id'];
                                      $_SESSION['nome'] = $row_usuario['nome'];
                                      $_SESSION['funcao'] = $row_usuario['funcao'];
              
                                      if ($senha_usuario == '123456') {
                                   
                                        echo '<script>
                                                $(document).ready(function(){
                                                    $("#alterarSenhaModal").modal("show");
                                                });
                                              </script>';
                                      } else {
                                      
                                        include_once 'control-acessos.php';
                                      }
                                    } else {
                                      $_SESSION['modal_msg'] = '<div class="alert alert-danger" role="alert">Login ou senha inválida!</div>';
                                    }
                                  } else {
                                    $_SESSION['modal_msg'] = '<div class="alert alert-danger" role="alert">Login ou senha inválida!</div>';
                                  }
                                }
                                ?>
                                <form role="form" method="POST">
                                <div id="modal_msg" nome="modal_msg">
                              <?php
                              if (isset($_SESSION['modal_msg'])) {
                                echo $_SESSION['modal_msg'];
                                unset($_SESSION['modal_msg']);
                              }
                              ?>
                            </div>
                                  <div class="mb-3">
                                    <input type="text" class="form-control form-control-lg" placeholder="Usuário" aria-label="Text" name="usuario" id="usuario" value="<?php if (isset($usuario)) { echo $usuario; } ?>">
                                  </div>
                                  <div class="mb-3">
                                    <input type="password" class="form-control form-control-lg" placeholder="Senha" aria-label="Password" name="senha_usuario" id="senha_usuario" value="<?php if (isset($senha_usuario)) { echo $senha_usuario; } ?>">
                                  </div>
                                  <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="rememberMe">
                                    <label class="form-check-label" for="rememberMe">Lembre-me</label>
                                  </div>
                                  <div class="text-center">
                                    <button type="submit" class="btn btn-lg btn-primary" value="Acessar" name="SendLogin">Entrar</button>
                                  </div>
                                </form>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="modal fade" id="alterarSenhaModal" tabindex="-1" role="dialog" aria-labelledby="alterarSenhaModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="alterarSenhaModalLabel">Alterar Senha</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form role="form" method="POST" action="services/api/editar/edit_user.php">
                <input type="hidden" name="usuario_id" value="<?php echo $_SESSION['id']; ?>">
                <div class="mb-3">
                  <label for="novaSenha">Nova Senha</label>
                  <input type="password" class="form-control" placeholder="Nova Senha" name="novaSenha" id="novaSenha" required>
                </div>
                <div class="mb-3">
                  <label for="confirmarSenha">Confirmar Senha</label>
                  <input type="password" class="form-control" placeholder="Confirmar Senha" name="confirmarSenha" id="confirmarSenha" required>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary" name="alterarSenha">Alterar Senha</button>
                </div>
              </form>
            </div>
            <div class="modal-footer">
            </div>
          </div>
        </div>
      </div>
</div>
</div>
  </main>
  <!--   Core JS Files   -->
         <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>
  <script src="./assets/js/core/popper.min.js"></script>
  <script src="./assets/js/core/bootstrap.min.js"></script>
  <script src="./assets/js/plugins/perfect-scrollbar.min.js"></script>
  <script src="./assets/js/plugins/smooth-scrollbar.min.js"></script>
  <script src="./assets/js/plugins/chartjs.min.js"></script>
  <script src="./src/Cadastros/script/index.js"></script>
  <script src="./src/Cadastros/script/Model"></script>
  <script src="./src/Cadastros/script/Controller"></script>
  <script src="./src/Cadastros/script/View"></script>
  <!-- Github buttons -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->

</html>
