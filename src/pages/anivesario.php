<!DOCTYPE html>
<html lang="pt-br">
<head>
    <!-- Meta tags Obrigatórias -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="../assets/css/styles.css" rel="stylesheet" />
    <link href="../assets/css/style.scss" rel="stylesheet" />
    <link rel="shortcut icon" href="../assets/img/favicon.png">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossorigin="anonymous">
    <title>HMDI</title>

    <style>
        body {
            background-color: #f8f9fa;
        }

        .container {
            margin-top: 50px;
        }

        .card {
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .card-header {
            background-color: #7F3B8A;
            color: #fff;
            border-bottom: none;
        }

        .form-control {
            border-radius: 5px;
        }

        .btn-primary {
            border-radius: 5px;
        }
        .confetti {
            width: 100%;
        }

        .confetti-piece {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: #ffcc00;
            border-radius: 50%;
            opacity: 0.8;
            animation: confetti-fall 5s ease-in-out infinite;
        }

        .confetti-piece:nth-child(even) {
            background-color: #ff6666;
        }

        .confetti-piece:nth-child(odd) {
            background-color: #66ccff;
        }

        .confetti-piece:nth-child(3n) {
            background-color: #66ff66;
        }

        .confetti-piece:nth-child(4n) {
            background-color: #ff66ff;
        }

        .balloon {
            position: relative;
            animation: float-updown 3s ease-in-out infinite;
        }
        @keyframes confetti-fall {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
        .balloon {
            position: relative;
            animation: float-updown 3s ease-in-out infinite;
        }

        @keyframes float-updown {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    </style>

</head>
<body>
<div class="container-fluid">
    <div class="card">
        <div class="card-header">
            <h1 class="card-title text-center">
                <span class="balloon">🎉</span> Aniversariante do Dia <span class="balloon">🎊</span>
            </h1>
        </div>
        <div class="card-body">
            <div class="row">
            <?php
                ini_set('display_errors', 1);
                error_reporting(E_ALL);
                require_once '../services/connection/conexao-mysql.php'; 
                $sql = "SELECT * FROM aniversariantes WHERE dia = DAY(NOW())";
                $result = $conn->query($sql);
                date_default_timezone_set('America/Sao_Paulo');
                if ($result->rowCount() > 0) {
                    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                        $img = 'https://cdn-icons-png.flaticon.com/512/334/334047.png';
                        $hoje = date('d');
                        $dia = $row['dia'];
                        $nome = $row['nome'];
                        $funcao = $row['funcao'];
                        if ($hoje == $dia) {
                            echo '<div class="col-sm-4 mb-3">';
                            echo '<div class="card border-left-primary shadow h-100">';
                            echo '<div class="card-body">';
                            echo '<div class="confetti">';
                            for ($i = 0; $i < 50; $i++) {
                                echo '<div class="confetti-piece" style="left:' . rand(0, 100) . '%; animation-delay: ' . (rand(0, 5000) / 1000) . 's;"></div>';
                            }
                            echo '</div>';
                            echo "<h5 class='card-title text-center'>$nome</h5>";
                            echo "<p class='card-text text-center'>Função: $funcao</p>";
                            echo '</div>';
                            echo '</div>';
                            echo '</div>';
                        }
                    }
                } else {
                    $firstRow = $result->fetch(PDO::FETCH_ASSOC);
                    if (!$firstRow) {
                        echo '<div class="col-sm-12">';
                        echo '<div class="card">';
                        echo '<div class="card-body">';
                        echo "<h2 class='card-title text-center'>Nenhum aniversariante hoje.</h2>";
                        echo '</div>';
                        echo '</div>';
                        echo '</div>';
                    }
                }
                ?>
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
</body>
</html>
