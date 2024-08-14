<?php
header("Access-Control-Allow-Origin: http://10.1.1.108");

$host = '10.151.50.179';
$port = '1521';
$sid = 'UFGPROD';
$username = 'TASY';
$password = 'Aloisk';

$dsn = "oci:dbname=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=$host)(PORT=$port)))(CONNECT_DATA=(SERVICE_NAME=$sid)))";

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_GET['nm_usuario'])) {
        $nm_usuario = $_GET['nm_usuario'];

        $query = "SELECT nm_usuario, ds_usuario, ds_senha, cd_setor_atendimento,
                  obter_nome_setor_jdm(cd_setor_atendimento)
                  FROM usuario
                  WHERE cd_estabelecimento = 8
                  AND  ie_situacao =  'A'
                  AND nm_usuario = :nm_usuario";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":nm_usuario", $nm_usuario, PDO::PARAM_STR);
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convert the array to JSON
        $json = json_encode($data, JSON_UNESCAPED_UNICODE);

        // Set the HTTP header to indicate JSON and UTF-8
        header('Content-Type: application/json; charset=utf-8');

        // Output the JSON
        echo $json;
    } else {
        echo "Parameter 'nm_usuario' was not provided in the URL.";
    }

    // Close the connection
    $conn = null;

} catch (PDOException $e) {
    echo "Erro na conexao com o Oracle: " . $e->getMessage();
}
?>
