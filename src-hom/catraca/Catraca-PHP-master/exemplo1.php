<?php

require_once 'catraca_lib.php';

$ip = '10.20.20.139';
$port = 3000;

// instancia um objeto catraca
$catraca = new Catraca($ip, $port);

// tenta conectar
$erro = $catraca->conectar();

if ($erro) {
    echo "Erro ao conectar: $erro\n";
} else {
    echo "Conexão bem-sucedida com $ip:$port\n";
}
?>
