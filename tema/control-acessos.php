<?php
if ($row_usuario['funcao'] === "0") {
    header("Location: pages/arquivo.php");
        exit();
    }
    if($row_usuario['funcao'] === "1") {
    header("Location: pages/dashboard.php");
        exit();
    }
    if($row_usuario['funcao'] === "2") {
    header("Location: pages/laboratorio.php");
        exit();
    }
    if($row_usuario['funcao'] === "3") {
    header("Location: pages/dashboardLab.php");
        exit();
    }
    if($row_usuario['funcao'] === "4") {
        header("Location: pages/dashboardNir.php");
            exit();
    }
    if($row_usuario['funcao'] === "5") {
        header("Location: pages/nir.php");
            exit();
    }
    if($row_usuario['funcao'] === "6") {
        header("Location: pages/gestaoPessoas.php");
            exit();
    }
    if($row_usuario['funcao'] === "7") {
        header("Location: pages/espacoJasmin.php");
            exit();
    }
    if($row_usuario['funcao'] === "8") {
        header("Location: pages/espacoRosa.php");
            exit();
    }
?>
