<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'catraca_lib.php';

function enviar_dados_ficticios() {
    $tipo = $_GET['tipo'];
    $cartao = $_GET['cartao'];
    $validade_inicial = $_GET['validade_inicial'];
    $validade_final = $_GET['validade_final'];
    $codigo_acesso = $_GET['codigo_acesso'];
    $tipo_cartao = $_GET['tipo_cartao'];
    $senha_acesso = '';
    $senha_panico = '';
    $reles = '';
    $sequencia_acesso = $_GET['sequencia_acesso'];
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
            echo "Cartão enviado com sucesso! Resposta da catraca:<br>";
            echo "<strong>Comando:</strong> " . htmlspecialchars($resposta['command']) . "<br>";
            echo "<strong>Código de Erro/Versão:</strong> " . htmlspecialchars($resposta['err_or_version']) . "<br>";
            echo "<strong>Dados Brutos:</strong> " . htmlspecialchars($resposta['data']) . "<br>";
            echo "<strong>Tamanho:</strong> " . htmlspecialchars($resposta['size']) . "<br>";
            echo "<strong>Índice:</strong> " . htmlspecialchars($resposta['index']) . "<br>";
            echo "<strong>Resposta Original:</strong> " . htmlspecialchars($resposta['original_response']) . "<br>";
            echo "<pre>";
            print_r($resposta['original_response_bytes']);
            echo "</pre>";
        } else {
            echo "Erro ao escutar resposta: $resposta";
        }
    }
}

enviar_dados_ficticios();
?>
