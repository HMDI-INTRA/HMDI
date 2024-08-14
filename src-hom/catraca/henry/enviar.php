<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Enviar Dados Fictícios</title>
</head>
<body>
    <form action="enviar_cartao.php" method="GET">
        <label for="tipo">Tipo:</label>
        <input type="text" id="tipo" name="tipo" required><br>

        <label for="cartao">Cartão:</label>
        <input type="text" id="cartao" name="cartao" required><br>

        <label for="validade_inicial">Validade Inicial (dd/mm/aaaa hh:mm:ss):</label>
        <input type="text" id="validade_inicial" name="validade_inicial" required><br>

        <label for="validade_final">Validade Final (dd/mm/aaaa hh:mm:ss):</label>
        <input type="text" id="validade_final" name="validade_final" required><br>

        <label for="codigo_acesso">Código de Acesso:</label>
        <input type="text" id="codigo_acesso" name="codigo_acesso" required><br>

        <label for="tipo_cartao">Tipo do Cartão:</label>
        <input type="text" id="tipo_cartao" name="tipo_cartao" required><br>

        <label for="sequencia_acesso">Sequência de Acesso:</label>
        <input type="text" value ="WDK" id="sequencia_acesso" name="sequencia_acesso" required><br>

        <button type="submit">Enviar</button>
    </form>
</body>
</html>
