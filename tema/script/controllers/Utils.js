//****Autor: Josélio Dias Mendonça*******//

class Utils {

    constructor() {
        this.statusMessageElement = $("#statusMessage");
        this.editors = [];
    }

    static formatarDataHora(dataHora) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dataHora));
    }

    static formatarData(data) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('pt-BR', options).format(new Date(data));
    }

    static formatarDataNir(data) {
        if (!data) {
            return '';
        } else {
            const dataObj = new Date(data);
            dataObj.setDate(dataObj.getDate() + 1);
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Intl.DateTimeFormat('pt-BR', options).format(dataObj);
        }
    }

    static formatarDataParaEnvio(data) {
        if (typeof data !== 'string' || data.trim() === '') {
            return null;
        }
        var partesDataHora = data.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/);
        if (partesDataHora) {
            var dia = partesDataHora[1];
            var mes = partesDataHora[2];
            var ano = partesDataHora[3];
            var hora = partesDataHora[4];
            var minuto = partesDataHora[5];
            var segundo = partesDataHora[6];
            var dataFormatada = ano + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto + ':' + segundo;
            return dataFormatada;
        } else {
            return this.converterParaInputDate(data);
        }
    }
    r
    static converterParaInputDate(data) {
        var partes = data.split('/');
        if (partes.length !== 3) {
            console.error('Formato de data inválido para conversão:', data);
            return null;
        }
    
        var dia = partes[0];
        var mes = partes[1];
        var ano = partes[2];
    
        var dataFormatada = ano + '-' + mes + '-' + dia;
        return dataFormatada;
    }

    static formatoMesAno(data) {
        const partes = data.split('/');
        const mes = partes[1];
        const ano = partes[0];

        return `${mes}/${ano}`;
    }

    static formatarDataParaFormatoHTML(dataString) {
        if (!dataString) {
            return null; 
        }
    
        var partes = dataString.split(" ");
    
        if (partes.length < 2) {
            return null; 
        }
    
        var dataParte = partes[0];
        var horaParte = partes[1];
    
        var dataPartes = dataParte.split("/");
        var horaPartes = horaParte.split(":");
    
        if (dataPartes.length < 3 || horaPartes.length < 2) {
            return null; 
        }
    
        var dia = dataPartes[0];
        var mes = dataPartes[1];
        var ano = dataPartes[2];
        var hora = horaPartes[0];
        var minuto = horaPartes[1];
    
        var formatoHTML = `${ano}-${mes}-${dia}T${hora}:${minuto}`;
    
        return formatoHTML;
    }
    


    static formatSecondsToTime(seconds, format) {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const sec = remainingSeconds % 60;

        if (format === 'dot') {
            return `${hours}.${minutes}.${sec}`;
        } else {
            return `${hours}:${minutes}:${sec}`;
        }
    }

    static setupInterval(callback, delay) {
        callback();
        return setInterval(callback, delay);
    }

    static showMessage(status) {
        const statusMessageElement = $("#statusMessage");
        if (statusMessageElement.length === 0) {
            console.error("Elemento não encontrado. Verifique o seletor.");
            return;
        }
        statusMessageElement.html(status);
        statusMessageElement.show();
        setTimeout(() => {
            this.hideMessage(statusMessageElement);
        }, 5000);
    }

    static generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r},${g},${b},0.5) `;
    }
    static encontrarAnoComMaisDados(datasets, mes) {
        const anos = {};
        if (!Array.isArray(datasets) || mes < 1 || mes > 12) {
            console.error("Invalid datasets or month provided.");
            return null;
        }

        datasets.forEach(dados => {

            if (Array.isArray(dados) && dados.length >= mes) {
                const contagem = dados[mes - 1];
                const ano = 2022 - dados.length + mes;
                if (!anos[ano]) {
                    anos[ano] = 0;
                }
                anos[ano] += contagem;
            }
        });

        let anoComMaisDados;
        let contagemMaxima = 0;

        for (const ano in anos) {
            if (anos.hasOwnProperty(ano)) {
                if (anos[ano] > contagemMaxima) {
                    contagemMaxima = anos[ano];
                    anoComMaisDados = ano;
                }
            }
        }

        return anoComMaisDados;
    }



    static hideMessage(statusMessageElement) {
        statusMessageElement.hide();
    }

    static converterRTFparaHTML(rtfContent, callback) {
        if (typeof rtfContent !== 'string') {
            callback(new Error('O conteúdo RTF não é uma string válida.'));
        } else {
            if (typeof window.RtfToHtml === 'function') {
                const converter = new window.RtfToHtml();
                const htmlContent = converter.convert(rtfContent);
                callback(null, htmlContent);
            } else {
                callback(new Error('A biblioteca RTF-to-HTML não está carregada corretamente.'));
            }
        }
    }

    static convertRTFArrayToHTML(rtfArray) {
        return new Promise((resolve, reject) => {
            const rtfString = Array.isArray(rtfArray) ? rtfArray.join('') : rtfArray;
            $.ajax({
                url: '../services/api/rtf.php',
                method: 'POST',
                dataType: 'json',
                data: { rtf: rtfString },
                success: function (data) {
                    if (data.success) {
                        resolve(data.htmlResult);
                    } else {
                        reject(data.error);
                    }
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }

    /**
     * @param {Array} chartIds 
     */
    static printCombinedChart(chartIds) {

        const combinedCanvas = document.createElement('canvas');
        const combinedContext = combinedCanvas.getContext('2d');


        const paperWidth = 1200;
        const paperHeight = 700;
        const spacing = 20;
        combinedCanvas.width = paperWidth;
        combinedCanvas.height = paperHeight;


        let yOffset = 0;

        const promises = chartIds.map(chartId => {

            const chartCanvas = document.getElementById(chartId);


            const scaleFactor = paperWidth / chartCanvas.width;


            const adjustedHeight = chartCanvas.height * scaleFactor;


            combinedContext.imageSmoothingEnabled = false;


            combinedContext.drawImage(chartCanvas, 0, yOffset, paperWidth, adjustedHeight);


            yOffset += adjustedHeight + spacing;


            return html2canvas(chartCanvas);
        });
        Promise.all(promises).then(canvasArray => {
            const printWindow = window.open('', '_blank');
            canvasArray.forEach(canvas => {
                const imgTag = `<img src="${canvas.toDataURL('image/png')}" style="width:100%; padding-bottom: 10%; padding-top: 5%;"/>`;
                printWindow.document.write(imgTag);
            });
        });
    }

    static initializeQuill(elementIds) {
        elementIds.forEach(function (id) {
            var editorElement = document.getElementById(id);
            if (editorElement) {
                var quill = new Quill(editorElement, {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'font': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image', 'video'],
                        ],
                    },
                });
                quill.on('text-change', function (delta, oldDelta, source) {
                    var rtfContent = quill.root.innerHTML;
                    id = document.getElementById(id).id
                    if (id === 'obsAdulto') {
                        $('#obsAdultoHidden').val(rtfContent);
                    }
                    if (id === 'obsRn') {
                        $('#obsRnHidden').val(rtfContent);
                    }
                    if (id === 'ds_observacao') {
                        $('#ds_observacaoHidden').val(rtfContent);
                    }
                    if (id === 'ds_observacaoEdit') {
                        $('#ds_observacaoEditHidden').val(rtfContent);
                    }
                    if (id === 'obsRnView') {
                        $('#obsRnHiddenView').val(rtfContent);
                    }
                    if (id === 'obsAdultoView') {
                        $('#obsAdultoEditHiddenView').val(rtfContent);
                    }
                    if (id === 'obsRnEdit') {
                        $('#obsRnHiddenEdit').val(rtfContent);
                    }
                    if (id === 'obsAdultoEdit') {
                        $('#obsAdultoHiddenEdit').val(rtfContent);
                    }
                    if (id === 'planoAcao') {
                        $('#planoAcaoHidden').val(rtfContent);
                    }
                    if (id === 'analise') {
                        $('#analiseHidden').val(rtfContent);
                    }
                });
            } else {
                console.error('Elemento com ID ' + id + ' não encontrado.');
            }
        });
    }

    static isHorarioDiurno() {
        const agora = new Date();
        const hora = agora.getHours();
        return hora >= 6 && hora < 19;
    }

    static atualizarHorario() {
        const horarioSpan = document.querySelector('.horario');

        if (horarioSpan) {
            const horarioDiurno = Utils.isHorarioDiurno();
            horarioSpan.textContent = horarioDiurno ? 'Diurno' : 'Noturno';
        }
    }
    
    

    static fillQuillContent(quillId, content) {
        var quill = document.getElementById(quillId);
        if (quill) {
            var quillInstance = quill.__quill || undefined;
            if (quillInstance) {
                quillInstance.root.innerHTML = content;
            } else {
                console.error('Instância Quill não encontrada para o elemento com ID ' + quillId);
            }
        } else {
            console.error('Elemento Quill com ID ' + quillId + ' não encontrado.');
        }
    }
    

    static displayBase64ImageFromText(textWithImage) {
        const base64StartIndex = textWithImage.indexOf('src="data:image/png;base64,');
        if (base64StartIndex !== -1) {
            const base64ImageTag = textWithImage.slice(base64StartIndex);
            const base64ImageEndIndex = base64ImageTag.indexOf('"', 'src="data:image/png;base64,'.length);
            if (base64ImageEndIndex !== -1) {
                const base64Image = base64ImageTag.slice('src="data:image/png;base64,'.length, base64ImageEndIndex);
                const src = 'data:image/png;base64,' + base64Image;
                const newWindow = window.open();
                newWindow.document.write('<html><head><title>Imagem Base64</title></head><body style="margin: 0; display: flex; justify-content: center; align-items: center;"><img src="' + src + '" style="max-width: 100%; max-height: 100%;"/></body></html>');
            } else {
                console.warn('Formato inválido de imagem base64.');
            }
        } else {
            console.warn('Imagem base64 não encontrada no texto fornecido.');
        }
    }

    static replaceImgWithButton(content) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const images = doc.getElementsByTagName('img');
        Array.from(images).forEach((img, index) => {
            const button = document.createElement('button');
            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-image'); 
            const buttonText = document.createTextNode(' Visualizar'); 
            button.appendChild(icon); 
            button.appendChild(buttonText); 
            button.setAttribute('data-img-src', img.src);
            button.classList.add('image-button');
            img.parentNode.replaceChild(button, img);
        });
        return doc.documentElement.outerHTML;
    }

    static removeImages(content) {
        if (content == null) {
            return '';
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const images = doc.getElementsByTagName('img');
    
        Array.from(images).forEach((img) => {
            img.parentNode.removeChild(img);
        });
    
        return doc.documentElement.outerHTML;
    }
    static pularLinhaString(str) {
        return str.split(',').join('<br>');
    }
    
    

}

export default Utils;