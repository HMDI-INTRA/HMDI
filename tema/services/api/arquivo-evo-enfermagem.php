<?php
// Autor: Josélio Dias Mendonça

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a conexão PDO existente
include_once '../connection/conexao-postgresql.php'; // Certifique-se de que o arquivo esteja incluído corretamente

try {
    $valor_pesquisa = isset($_GET['search']['value']) ? $_GET['search']['value'] : '';

    $query_registros = "
    SELECT 
        a.numatend, a.corpotexto, a.numseq, a.datagrav, a.cancelada, a.moticancel, 
        b.censo, b.situacao, b.tipoatend, b.desprocgen, b.matriatend, b.datatend, 
        c.cartaosus, c.nomepac, c.sexo, c.datanasc, c.estadociv, c.logradouro, 
        c.tipologr, c.complemen, c.ceppac, c.foneresid, c.nomemae, c.nomepai, 
        c.rgpac, c.cpfpac, b.codpac 
    FROM 
        \"PACIENTE\".evoenf a
    JOIN 
        \"PACIENTE\".arqatend b ON a.numatend = b.numatend
    JOIN 
        \"PACIENTE\".cadpac c ON b.codpac = c.codpac
    ";

    if (!empty($valor_pesquisa)) {
        $is_numeric_search = is_numeric($valor_pesquisa);
        $query_registros .= " WHERE " . ($is_numeric_search ? "CAST(a.numatend AS TEXT)" : "a.numatend") . " LIKE :valor_pesquisa ";
        $valor_pesquisa = $is_numeric_search ? $valor_pesquisa : "%{$valor_pesquisa}%";
    }

    $query_registros .= " ORDER BY numseq ASC LIMIT 50"; 

    // Utilizando prepared statement para prevenir SQL injection
    $result_registros = $conn->prepare($query_registros);

    // Adiciona o parâmetro de pesquisa apenas se houver um valor
    if (!empty($valor_pesquisa)) {
        $result_registros->bindParam(':valor_pesquisa', $valor_pesquisa, PDO::PARAM_STR);
    }

    $result_registros->execute();

    // Obtendo os resultados e convertendo para JSON
    $dados = $result_registros->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['data' => $dados]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Database Error: " . $e->getMessage()]);
}
?>
