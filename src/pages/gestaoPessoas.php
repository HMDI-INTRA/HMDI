<!-- Editado por: Josélio Dias Mendonça -->
<?php
session_start();
ob_start();
$session_lifetime = 31536000;
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
                        <h4 class="mb-2">Acesso a catracas</h4>
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
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                                    <?php if (isset($_SESSION['nome'])) {
                                        $userName = $_SESSION['nome'];
                                        echo "$userName";
                                    } ?></span><img class="fas fa-circle-user" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Font_Awesome_5_solid_user-circle.svg/1982px-Font_Awesome_5_solid_user-circle.svg.png" width='25'>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
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
                <div class="container-fluid">
                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">TopData</button>
                        </li>
                        
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Henry</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <div class="col-auto">
                                <div class="col-2">
                                    <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-topdata">Adicionar</button>
                                </div>
                            </div>
                            <div class="card mb-4" style="border-radius: inherit;">
                                <div class="card-header pb-0 p-3">
                                    <div class="d-flex justify-content-between">
                                        <h4 class="mb-2">Cadastrar cracha</h4>
                                        <div class="col-auto">
                                        </div>
                                    </div>
                                    <div class="card-body px-0 pt-0 pb-2">
                                        <div class="table-responsive p-0 table-common-wrapper" id="tableOcupacaoJasmim_wrapper">
                                            <div style="overflow-x: auto;">
                                                <table id="tableCatracaTopdata" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade modal-xl" id="modal-topdata" tabindex="-1" role="dialog" aria-labelledby="modal-xl" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h3 class="modal-title font-weight-bolder text-primary text-gradient" id="modal-xl">Cadastrar</h3>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form method="GET" id="formTopdata">
                                                    <div class="row align-items-center mb-3">
                                                        <div class="col-4">
                                                            <div class="input-group mb-4">
                                                                <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                                                                <input class="form-control" name="nomeFun" id="nomeFun" placeholder="Nome do funcionário" type="text">
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <label for="nomFun">Nome Completo:</label>
                                                            <input type="text" id="nomFun" name="nomFun" class="form-control" required>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center mb-3">
                                                        <div class="col-4">
                                                            <label for="dtAdm">Data de Admissão:</label>
                                                            <input type="date" id="dtAdm" name="dtAdm" class="form-control" required>
                                                        </div>
                                                        <div class="col-4">
                                                            <label for="datnas">Data de Nascimento:</label>
                                                            <input type="date" id="datnas" name="datnas" class="form-control" required>
                                                        </div>
                                                        <div class="col-4">
                                                            <label for="tipo" class="form-label">Tipo:</label>
                                                            <select class="form-select" id="tipo" name="tipo" required>
                                                                <option value="" selected disabled>Tipo de acesso</option>
                                                                <option value="101">Funcionario</option>
                                                                <option value="102">Prestador de serviço</option>
                                                                <option value="103">Paciênte</option>
                                                                <option value="104">Visitante</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center mb-3">
                                                        <div class="col-4">
                                                            <label for="dt_inicial">Data de Inicio:</label>
                                                            <input type="date" id="dt_inicial" name="dt_inicial" class="form-control" readonly>
                                                        </div>
                                                        <div class="col-4">
                                                            <label for="dt_final">Data Final:</label>
                                                            <input type="date" id="dt_final" name="dt_final" class="form-control" readonly>
                                                        </div>
                                                        <div class="col-4">
                                                            <label for="tipSex" class="form-label">Sexo:</label>
                                                            <select class="form-select" id="tipSex" name="tipSex" required>
                                                                <option selected disabled>Sexo</option>
                                                                <option value="M">Masculino</option>
                                                                <option value="F">Feminino</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center mb-3">
                                                        <div class="col-6">
                                                            <label for="numCracha">Número de Matricula:</label>
                                                            <input type="number" id="numCracha" name="numCracha" class="form-control" maxlength="12" required>
                                                        </div>
                                                        <div class="col-6">
                                                            <label for="cartao">Número do Cracha:</label>
                                                            <input type="number" id="cartao" name="cartao" class="form-control" required >
                                                        </div>
                                                    </div>
                                                    <div class="row align-items-center mb-3">
                                                        <div class="row mb-3">
                                                            <div class="col-6">
                                                                <div id="statusMessage"></div>
                                                                <button type="submit" class="btn bg-gradient-primary">Gravar dados</button>
                                                                <button type="button" class="btn bg-gradient-secondary " data-bs-dismiss="modal">Fechar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="col-auto">
                                <div class="col-2">
                                    <button type="button" class="btn btn-block btn-default mb-3" data-bs-toggle="modal" data-bs-target="#modal-henry">Adicionar</button>
                                </div>
                            </div>
                            <div class="card mb-4" style="border-radius: inherit;">
                                <div class="card-header pb-0 p-3">
                                    <div class="d-flex justify-content-between">
                                        <h4 class="mb-2">Cadastrar cracha</h4>
                                        <div class="col-auto">
                                        </div>
                                    </div>
                                    <div class="card-body px-0 pt-0 pb-2">
                                        <div class="table-responsive p-0 table-common-wrapper" id="tableOcupacaoJasmim_wrapper">
                                            <div style="overflow-x: auto;">
                                                <table id="tableCatracaHenry" class="table align-items-center justify-content-center mb-0 table-common" style="width: 100%;">
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal fade modal-xl" id="modal-henry" tabindex="-1" role="dialog" aria-labelledby="modal-xl" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h3 class="modal-title font-weight-bolder text-primary text-gradient" id="modal-xl">Cadastrar</h3>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form method="GET" id="formHenry">
                                                    <div class="row">
                                                        <div class="mb-4">
                                                            <div class="form-group">
                                                                <select class="form-select" id="tipo" name="tipo">
                                                                    <option value="" selected disabled>Tipo:</option>
                                                                    <option value="I">Incluir</option>
                                                                    <option value="A">Alterar</option>
                                                                    <option value="E">Excluir</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="mb-4">
                                                            <div class="form-group">
                                                                <select class="form-select" id="codigo_acesso" name="codigo_acesso">
                                                                    <option value="" selected disabled>Código de Acesso:</option>
                                                                    <option value="0">Negado</option>
                                                                    <option value="1">Liberado</option>
                                                                    <option value="2">Controla Horario</option>
                                                                    <option value="3">Controla Validade</option>
                                                                    <option value="4">Controle Cartão</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="mb-4">
                                                            <div class="form-group">
                                                                <select class="form-select" id="tipo_cartao" name="tipo_cartao">
                                                                    <option value="" selected disabled>Tipo do Cartão:</option>
                                                                    <option value="1">Empregado</option>
                                                                    <option value="2">Terceiro</option>
                                                                    <option value="3">Parceiro</option>
                                                                    <option value="4">Visitante</option>
                                                                    <option value="5">Provisorio</option>
                                                                    <option value="6">Chachá meste</option>
                                                                    <option value="7">Outros</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="cartao" class="form-label">Cartão:</label>
                                                        <input type="text" class="form-control" id="cartao" name="cartao" required>
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="validade_inicial" class="form-label">Validade Inicial:</label>
                                                        <input type="datetime-local" class="form-control" id="validade_inicial" name="validade_inicial">
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="validade_final" class="form-label">Validade Final:</label>
                                                        <input type="datetime-local" class="form-control" id="validade_final" name="validade_final">
                                                    </div>

                                                    <div class="mb-3" hidden>
                                                        <label for="sequencia_acesso" class="form-label">Sequência de Acesso:</label>
                                                        <input type="text" class="form-control" id="sequencia_acesso" name="sequencia_acesso" value="WDK">
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">Enviar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="loadingTopData" style="display: none;">
                        <img src="https://www.blogson.com.br/wp-content/uploads/2017/10/loading-gif-transparent-10.gif" alt="Carregando..." class="loading" />
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
            <!-- Github buttons -->
            <script async defer src="https://buttons.github.io/buttons.js"></script>
            <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
            <!-- Mascara para inputs -->
            <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
            <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="../js/sb-admin-2.min.js"></script>

</body>

</html>