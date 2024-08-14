<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once 'catraca_lib.php';
include_once '../../connection/conexao-mysql.php'; 

function enviar_dados() {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if (!$data) {
        echo "Invalid JSON data received";
        return;
    }

    $tipo = $data['tipo'] ?? '';
    $cartao = $data['cartao'] ?? '';
    $validade_inicial = $data['validade_inicial'] ?? '';
    $validade_final = $data['validade_final'] ?? '';
    $codigo_acesso = $data['codigo_acesso'] ?? '';
    $tipo_cartao = $data['tipo_cartao'] ?? '';
    $sequencia_acesso = $data['sequencia_acesso'] ?? '';
    $senha_acesso = '';
    $senha_panico = '';
    $reles = '';
    $posicao_cartao = '';
    $quantidade_horarios = '';
    $referencias_horarios = '';
    $quantidade_escalas = '';
    $referencias_escalas = '';
    $senha_segura = '';
    $mensagem = "ECAR+00+1+" . $tipo . "[" .
                $cartao . "[" .
                $cartao . "[" .
                $validade_inicial . "[" .
                $validade_final . "[" .
                $codigo_acesso . "[" .
                $tipo_cartao . "[0[" .
                $senha_acesso . "[" .
                $senha_panico . "[" .
                $reles . "[" .
                $sequencia_acesso . "[" .
                $posicao_cartao . "[" . 
                $quantidade_horarios . "[" . 
                $referencias_horarios . "[" . 
                $quantidade_escalas . "[" . 
                $referencias_escalas . "[" . 
                $senha_segura . "[[";
    $catraca = new Catraca('10.20.20.139', 3000);
    $resultado = $catraca->enviar(rand(0, 9), $mensagem);
    if ($resultado) {
        echo "Erro ao enviar: $resultado";
    } else {
        $resposta = $catraca->escutar();
        if (is_array($resposta)) {
            echo json_encode($resposta);
            global $conn;
            try {
                $stmt = $conn->prepare("INSERT INTO HENRY (ie_tipo, cd_cartao, dt_inicio, dt_fim, cd_codigo_acesso, cd_tipo_cartao, ds_seq_acesso) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$tipo, $cartao, $validade_inicial, $validade_final, $codigo_acesso, $tipo_cartao, $sequencia_acesso]);
            } catch (PDOException $e) {
                echo "Erro ao inserir no banco de dados: " . $e->getMessage();
            } 
        } else {  
            echo "Erro ao escutar resposta: $resposta";
        } 
    }
}
enviar_dados();
