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

    static formatoAnoMes(data) {
        const partes = data.split('/');
        const mes = partes[0];
        const ano = partes[1];

        return `${ano}/${mes}`;
    }

    static showAlert(type, title, text) {
        Swal.fire({
            icon: type,
            title: title,
            text: text,
            confirmButtonText: 'OK'
        });
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

    static alertaSweet(status, alertType) {
        const statusMessageElement = $("#statusMessage");
        if (statusMessageElement.length === 0) {
            console.error("Elemento não encontrado. Verifique o seletor.");
            return;
        }

        let alertClass;
        switch (alertType) {
            case 'success':
                alertClass = 'alert-success';
                break;
            case 'danger':
                alertClass = 'alert-danger';
                break;
            case 'warning':
                alertClass = 'alert-warning';
                break;
            case 'info':
                alertClass = 'alert-info';
                break;
            default:
                alertClass = 'alert-secondary';
        }

        statusMessageElement.removeClass('alert-success alert-danger alert-warning alert-info alert-secondary');
        statusMessageElement.addClass(alertClass);
        statusMessageElement.html(status);
        statusMessageElement.show();

        setTimeout(() => {
            this.hideMessage(statusMessageElement);
        }, 5000);
    }

    static hideMessage(element) {
        element.hide();
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

    static printWindow = null;

    /**
     * @param {String} divId
     * @param {String} title
     */
    static printDivContent(divId, title) {
        const divElement = document.getElementById(divId);

        html2canvas(divElement).then(canvas => {
            const imgTag = `<img src="${canvas.toDataURL('image/png')}" style="width:100%;"/>`;

            document.getElementById('printModalLabel').innerText = title;
            document.getElementById('printContent').innerHTML = `
                <div>
                    <img src="http://10.1.1.108/intranet/wp-content/uploads/2022/01/Logo-HMDI-vr-2022.png" width="350" style="margin-bottom: 3em; margin-top: 1em;">
                </div>
                <h3>${title}</h3>
                ${imgTag}
            `;

            const myModal = new bootstrap.Modal(document.getElementById('printModal'));
            myModal.show();
            $('#loadingOverlayLab').hide();

            const printButton = document.getElementById('printButton');
            printButton.removeEventListener('click', Utils.handlePrintClick);
            printButton.addEventListener('click', () => {
                Utils.handlePrintClick(title, imgTag);
                myModal.hide();
            });
        });
    }

    /**
     * @param {String} title
     * @param {String} imgTag
     */
    static handlePrintClick(title, imgTag) {
        if (Utils.printWindow && !Utils.printWindow.closed) {
            Utils.printWindow.close();
        }

        Utils.printWindow = window.open('', '_blank');
        Utils.printWindow.document.write(`
            <html>
            <head>
                <title>${title}</title>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                    }
                    @page {
                        margin: 0;
                    }
                </style>
            </head>
            <body onload="window.print(); window.close();">
                <div>
                    <img src="http://10.1.1.108/intranet/wp-content/uploads/2022/01/Logo-HMDI-vr-2022.png" width="350" style="margin-bottom: 3em; margin-top: 1em;">
                    <h3>${title}</h3>
                </div>
                ${imgTag}
            </body>
            </html>
        `);
        Utils.printWindow.document.close();
    }

    static alertaGrafico(id) {
        Utils.fetchData('http://10.1.1.108/intranet/src/services/api/graficos.php', (dados) => this.displayAlerts(dados, id));
    }

    static displayAlerts(dados, id) {
        const data = dados.filter(item => item.nr_tela === id);
        let alertContent = '<h6 class="dropdown-header">Central de alertas</h6>';
        const currentDate = new Date();
        let totalVencidas = 0;
        data.forEach((item, index) => {
            const dtFim = new Date(item.dt_fim);
            const dsConcluido = item.ds_concluido
            if (dtFim < currentDate && !dsConcluido) {
                totalVencidas++;
                const dtFimFormatted = this.formatDateToPTBR(dtFim);
                const dtFimHTML = dtFim.toISOString().split('T')[0];
                let planoAcao = item.plano_acao_indicador.replace(/<\/?[^>]+(>|$)/g, "");
                let dtIndicador = item.dt_indicador;
                if (planoAcao.length > 15) {
                    planoAcao = planoAcao.substring(0, 15) + '...';
                }
                alertContent += `<button class="dropdown-item text-center small text-gray-500 alert-button" 
                                    data-plano="${item.plano_acao_indicador}" 
                                    data-mesPlano="${dtFimHTML}"
                                    data-mesAno="${dtIndicador}" 
                                    data-mes="${dtFimFormatted}">${dtFimFormatted} Plano de ação: ${planoAcao}</button>`;
            }
        });
        if (alertContent === '<h6 class="dropdown-header">Central de alertas</h6>') {
            alertContent += `<a class="dropdown-item text-center small text-gray-500" href="#">Sem alertas</a>`;
        }
        $('.alertas-plano-acao').html(alertContent);
        $('.total-vencidas .badge-counter').text(totalVencidas);
        $('.alert-button').on('click', function () {
            const planoAcao = $(this).data('plano');
            const mesAnoPlano = $(this).data('mesplano');
            const mesAnoIndicador = $(this).data('mesano');
            $('#formAnaliseAgencia #mesAnoAcao').val(mesAnoPlano);
            $('#formAnaliseAgencia #mesAno').val(mesAnoIndicador);
            Utils.setQuillContent('planoAcaoEditar', planoAcao);
            $('#editarIndicador').modal('show');
        });
    }





    static formatDateToPTBR(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


    static initializeQuill(elementIds) {
        elementIds.forEach(function (id) {
            var editorElement = document.getElementById(id);
            if (editorElement) {
                if (editorElement.__quill) return;
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

    static setQuillContent(id, content) {
        var editorElement = document.getElementById(id);
        if (editorElement && editorElement.__quill) {
            var quill = editorElement.__quill;
            quill.root.innerHTML = content;
        } else {
            console.error('Elemento com ID ' + id + ' não encontrado ou não está inicializado com Quill.');
        }
    }


    static clearQuillFields(elementIds) {
        elementIds.forEach(function (id) {
            var editorElement = document.getElementById(id);
            if (editorElement) {
                var quill = Quill.find(editorElement);
                if (quill) {
                    quill.setContents([]);
                    var hiddenFieldId;
                    switch (id) {
                        case 'obsAdulto':
                            hiddenFieldId = 'obsAdultoHidden';
                            break;
                        case 'obsRn':
                            hiddenFieldId = 'obsRnHidden';
                            break;
                        case 'ds_observacao':
                            hiddenFieldId = 'ds_observacaoHidden';
                            break;
                        case 'ds_observacaoEdit':
                            hiddenFieldId = 'ds_observacaoEditHidden';
                            break;
                        case 'obsRnView':
                            hiddenFieldId = 'obsRnHiddenView';
                            break;
                        case 'obsAdultoView':
                            hiddenFieldId = 'obsAdultoEditHiddenView';
                            break;
                        case 'obsRnEdit':
                            hiddenFieldId = 'obsRnHiddenEdit';
                            break;
                        case 'obsAdultoEdit':
                            hiddenFieldId = 'obsAdultoHiddenEdit';
                            break;
                        case 'planoAcao':
                            hiddenFieldId = 'planoAcaoHidden';
                            break;
                        case 'analise':
                            hiddenFieldId = 'analiseHidden';
                            break;
                        default:
                            hiddenFieldId = null;
                            break;
                    }
                    if (hiddenFieldId) {
                        document.getElementById(hiddenFieldId).value = '';
                    }
                } else {
                    console.error('Quill editor not found for element ID ' + id);
                }
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
        let count = 0;
        let result = '';

        for (let i = 0; i < str.length; i++) {
            result += str[i];
            if (str[i] !== ' ') {
                count++;
            }
            if (count >= 26 && str[i] === ' ') {
                result += '<br>';
                count = 0;
            }
        }

        return result;
    }


    static filtrarData(api, dtInicial, dtFinal, renderCallback) {
        console.log(api, dtInicial, dtFinal);
        if (api, dtInicial && dtFinal) {
            let url = `http://10.20.20.207/tasy/api/${api}.php?dtInicial=${dtInicial}&dtFinal=${dtFinal}`;
            this.fetchData(url, (newData) => {
                renderCallback(newData);
            });
        } else {
            console.log("Por favor, preencha as datas corretamente.");
        }
    }
    static async fetchData(url, displayCallback) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            const data = await response.json();
            displayCallback(data);
        } catch (error) {

        }
    }

    static async fetchDataApi(url, method = 'GET', data = null) {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error; 
        }
    }

    static async addData(url, data) {
        return await this.fetchDataApi(url, 'POST', data);
    }

    static async editData(url, data) {
        return await this.fetchDataApi(url, 'PUT', data);
    }

    static async deleteData(url) {
        return await this.fetchDataApi(url, 'DELETE');
    }

}

export default Utils;