<?php
include_once '../services/connection/conexao-interface.php';

// Código para adicionar, editar e excluir itens de menu

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['add'])) {
        $label = $conn->real_escape_string($_POST['label']);
        $url = $conn->real_escape_string($_POST['url']);
        $icon = $conn->real_escape_string($_POST['icon']);
        $target = $conn->real_escape_string($_POST['target']);
        $conn->query("INSERT INTO menu_items (label, url, icon, target) VALUES ('$label', '$url', '$icon', '$target')");
    } elseif (isset($_POST['edit'])) {
        $id = (int)$_POST['id'];
        $label = $conn->real_escape_string($_POST['label']);
        $url = $conn->real_escape_string($_POST['url']);
        $icon = $conn->real_escape_string($_POST['icon']);
        $target = $conn->real_escape_string($_POST['target']);
        $conn->query("UPDATE menu_items SET label='$label', url='$url', icon='$icon', target='$target' WHERE id=$id");
    } elseif (isset($_POST['delete'])) {
        $id = (int)$_POST['id'];
        $conn->query("DELETE FROM menu_items WHERE id=$id");
    } 
}

// Código para exibir os itens de menu existentes e os formulários para adicionar/editar itens
/** @var mysqli $conn */
$result = $conn->query("SELECT * FROM menu_items");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Gerenciamento de Menus</title>
</head>
<body>
    <h1>Gerenciamento de Menus</h1>
    
    <!-- Formulário para adicionar novo item de menu -->
    <form method="post" action="">
        <h2>Adicionar Item de Menu</h2>
        <label for="label">Label:</label>
        <input type="text" id="label" name="label" required>
        <label for="url">URL:</label>
        <input type="text" id="url" name="url" required>
        <label for="icon">Ícone:</label>
        <input type="text" id="icon" name="icon" required>
        <label for="target">Target:</label>
        <input type="text" id="target" name="target">
        <button type="submit" name="add">Adicionar</button>
    </form>

    <!-- Lista de itens de menu existentes -->
    <h2>Itens de Menu Existentes</h2>
    <table>
        <tr>
            <th>Label</th>
            <th>URL</th>
            <th>Ícone</th>
            <th>Target</th>
            <th>Ações</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $row['label']; ?></td>
                <td><?php echo $row['url']; ?></td>
                <td><?php echo $row['icon']; ?></td>
                <td><?php echo $row['target']; ?></td>
                <td>
                    <form method="post" action="">
                        <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                        <button type="submit" name="edit">Editar</button>
                        <button type="submit" name="delete">Excluir</button>
                    </form>
                </td>
            </tr>
        <?php } ?>
    </table>
</body>
</html>
