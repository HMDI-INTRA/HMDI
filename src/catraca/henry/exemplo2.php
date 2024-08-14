<?php

require_once 'catraca_lib.php';

$ip = empty($argv[1])? '10.20.20.139' : $argv[1];
$port = empty($argv[2])? 3000 : intval($argv[2]);

echo "iniciando catraca em $ip:$port\n\n";
$catraca = new Catraca($ip, $port);

echo "enviando a mensagem de abertura da catraca...\n";
$resposta = $catraca->liberar_entrada();
if( is_string($resposta) ){
	echo "ERRO: $resposta";
	die;
}
elseif(empty($resposta) ){
	echo "mensagem de abertura enviada\n";
}

// recebendo a resposta da catraca após a abertura
$resposta = $catraca->escutar();
if( is_string($resposta) ){
	echo "ERRO: $resposta";
	die;
}
elseif( is_array($resposta) ){
	if( $resposta['err_or_version'] != '00' ){
		echo "recebido o código de erro [".$resposta['err_or_version']."]\n";
	}
	else{
		$params = explode(']', $resposta['data']);
		if( $params[0] == '4' ){ // << a catraca deve retornar 4 para sucesso
			echo "catraca aberta em [".$params[2]."]\n";
		}
		else{
			echo "a catraca não autorizou a abertura. código retornado [".$params[0]."]\n";
		}
	}
}
