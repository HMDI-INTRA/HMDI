<?php
session_start();
ob_start();

include_once '../../connection/conexao-mysql.php';

// Define the converter function
function converter(&$dados_arquivo)
{
    $dados_arquivo = mb_convert_encoding($dados_arquivo, 'UTF-8', 'UTF-8');
}

// Initialize response array
$response = ['status' => false, 'message' => ''];

try {
    // Delete data from the table before importing
    $query_delete = "DELETE FROM aniversariantes";
    $delete = $conn->prepare($query_delete);
    $delete->execute();

    // Receive the file from the form
    $arquivo = $_FILES['csvFile'];

    // Variables for validation
    $primeira_linha = true;
    $linhas_importadas = 0;
    $linhas_nao_importadas = 0;
    $usuarios_nao_importado = "";

    // Check if it's a CSV file
    if ($arquivo['type'] == "text/csv") {

        // Read data from the file
        $dados_arquivo = fopen($arquivo['tmp_name'], "r");

        // Iterate through the file data
        while ($linha = fgetcsv($dados_arquivo, 1000, ";")) {

            if ($primeira_linha) {
                $primeira_linha = false;
                continue;
            }

            // Use the defined converter function
            array_walk_recursive($linha, 'converter');

            // Create the QUERY to save the user in the database
            $query_usuario = "INSERT INTO aniversariantes (nome, funcao, dia) VALUES (:nome, :funcao, :idade)";
            $cad_usuario = $conn->prepare($query_usuario);

            $cad_usuario->bindParam(":nome", $linha[0], PDO::PARAM_STR);
            $cad_usuario->bindParam(":funcao", $linha[1], PDO::PARAM_STR);
            $cad_usuario->bindParam(":idade", $linha[2], PDO::PARAM_STR);

            $cad_usuario->execute();

            if ($cad_usuario->rowCount()) {
                $linhas_importadas++;
            } else {
                $linhas_nao_importadas++;
                $usuarios_nao_importado = $usuarios_nao_importado . ", " . ($linha[0] ?? "NULL");
            }
        }

        if (!empty($usuarios_nao_importado)) {
            $usuarios_nao_importado = "Usuários não importados: $usuarios_nao_importado.";
        }

        $response = [
            'status' => true,
            'message' => "$linhas_importadas linha(s) importa(s), $linhas_nao_importadas linha(s) não importada(s). $usuarios_nao_importado"
        ];

    } else {
        $response['message'] = 'Necessário enviar arquivo csv!';
    }

} catch (Exception $e) {
    $response['message'] = 'Erro: ' . $e->getMessage();
}

// Output JSON response
echo json_encode($response);
?>
