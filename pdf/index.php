<!DOCTYPE html>
<html>
<head>
    <!-- adicionar bootstrap 5 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0-beta1/css/bootstrap.min.css">
    <meta charset="utf-8">

    <title>Bloquear PDF</title>
    <style>
                  body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 20px;
}

form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
}

input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 4px;
    background-color: #f0f0f0;
}

#pdfLabel {
    display: block;
    margin-top: 10px;
    color: #777;
}
    </style>
</head>
<body>
    <form action="proteger_pdf.php" method="post" enctype="multipart/form-data">
        <label for="pdfFile">Selecione o arquivo PDF para proteger contra impressão:</label>
        <label class="custom-file-upload">
            <input type="file" name="pdfFile" id="pdfFile" accept=".pdf" required>
            Escolher arquivo <span>&#187;</span>
        </label>
        <div id="pdfLabel"></div>
        <br>
        <input type="submit" value="Proteger PDF">
    </form>

    <script>
    const fileInput = document.getElementById('pdfFile');
    const pdfLabel = document.getElementById('pdfLabel');
    let fileChangeEvent = null;

    function updatePdfLabel() {
        pdfLabel.textContent = fileInput.files[0].name;
    }

    fileChangeEvent = function() {
        updatePdfLabel();
        fileInput.removeEventListener('change', fileChangeEvent);
    };

    fileInput.addEventListener('change', fileChangeEvent);

    // Adicionando o evento de limpar a div após o envio do formulário
    const form = document.querySelector('form');
    form.addEventListener('submit', function() {
        pdfLabel.textContent = '';
        fileInput.addEventListener('change', fileChangeEvent);
    });
    </script>

    <!-- adicionar bootstrap 5 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0-beta1/js/bootstrap.min.js"></script>    
    
</body>
</html>
