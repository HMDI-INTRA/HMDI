//****Autor: Josélio Dias Mendonça*******//
import DataModel from '../models/DataModel.js';
import Utils from '../controllers/Utils.js';

class View {
    constructor() {
        this.dataModel = new DataModel();
        this.rtfToHtml
        this.weatherDiv = document.getElementById('weather');
        this.dataModel.fetchData('http://10.1.1.108:5500/', this.displayHostname);
        this.dataModel.fetchData('http://10.1.1.108:5500/registro', this.displayIP);
        this.chartCanvas = document.getElementById('chart-line');
        this.chartInstance = null; //
        this.getSelectedIds = [];
        this.getSelectedIdsAniversariante = [];
        this.getSelecttableControleUser = [];
        this.getSelectedArquivo = [];
        this.myChart = null;
        this.SEU_MES = 0;
        this.SEU_ANO = 0;
        this.myChartAgenciaSaida = null;
        this.myChartDerivadosSaida = null;
        this.dadosArmazenados = null;
        this.addScript('https://rawgit.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js');
        this.init()
        this.tableOcupacaoJasmim = null;
        this.intervalId = null;
    }

    init() {

        $("#pesquisarBtn").on("click", () => {
            const nomepac = $("#nomepac").val();
            const codpac = $("#codpac").val();
            fetch(`../services/api/arquivo-api.php?nomepac=${nomepac}&codpac=${codpac}`)
                .then(response => response.json())
                .then(data => {
                    $('#tableArquivo').DataTable().destroy();
                    this.renderTableArquivo(data);
                })
                .catch(error => console.error('Erro ao fazer a solicitação à API:', error));
        });

        $("#pesquisarLabBtn").on("click", () => {
            const nomepac = $("#nomepacLab").val();
            const codpac = $("#codpacLab").val();
            fetch(`../services/api/arquivo-laboratorio-api.php?nomepac=${nomepac}&codpac=${codpac}`)
                .then(response => response.json())
                .then(data => {
                    $('#tableLaboratorio').DataTable().destroy();
                    this.renderTableLaboratorio(data);
                })
                .catch(error => console.error('Erro ao fazer a solicitação à API:', error));
        });
    }

    displayHostname = (data) => {
        if (!data) {
            return;
        }
        const hostnameList = document.getElementById('hostname-list');
        if (data.hostname_or_ip && hostnameList.childElementCount === 0) {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'border-0', 'd-flex', 'justify-content-between', 'ps-0', 'mb-2', 'border-radius-lg');
            listItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                        <i class="ni ni-mobile-button text-white opacity-10"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm">Ip</h6>
                        <span class="text-xs">${data.hostname_or_ip}</span>
                    </div>
                </div>
            `;
            hostnameList.appendChild(listItem);
        }
    }

    displayIP = (data) => {

        if (!data) {
            return;
        }

        const ipList = document.getElementById('ip-list');

        data.forEach(item => {
            if (item.ip) {

                const key = `${item.ip}-${item.data_hora}`;
                if (!this.dataModel.uniqueIPs.has(key)) {
                    this.dataModel.uniqueIPs.add(key);
                    this.dataModel.updateIPTime(item.ip, item.data_hora);
                    while (ipList.childElementCount >= this.dataModel.historicoLimite) {
                        ipList.removeChild(ipList.lastChild);
                    }

                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item', 'border-0', 'd-flex', 'justify-content-between', 'ps-0', 'mb-2', 'border-radius-lg');
                    const dataHoraFormatada = Utils.formatarDataHora(this.dataModel.ipLastUpdated[item.ip]);

                    listItem.innerHTML = `
                        <div class="d-flex align-items-center">
                            <div class="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                <i class="ni ni-mobile-button text-white opacity-10"></i>
                            </div>
                            <div class="d-flex flex-column">
                                <h6 class="mb-1 text-dark text-sm">Ultimo acesso</h6>
                                <span class="text-xs">${item.ip} - ${dataHoraFormatada}</span>
                            </div>
                        </div>
                    `;
                    if (ipList.firstChild) {
                        ipList.insertBefore(listItem, ipList.firstChild);
                    } else {
                        ipList.appendChild(listItem);
                    }
                }
            }
        });
    }

    async renderEquipeTi(id, nomes, funcoes, entradas, orderBy = 'funcao') {
        try {
            const tableTec = document.getElementById('tableTec');

            const equipe = id.map((indice, index) => ({
                indice,
                nome: nomes[index],
                funcao: funcoes[index],
                entrada: entradas[index]
            }));

            equipe.sort((a, b) => {
                if (orderBy === 'funcao') {
                    return a.funcao.localeCompare(b.funcao);
                } else {
                    return a.nome.localeCompare(b.nome);
                }
            });

            tableTec.innerHTML = '';

            equipe.forEach(({ indice, nome, funcao, entrada }) => {
                let entrada_formatada = Utils.formatarData(entrada);

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="w-36">
                        <div class="d-flex px-2 py-1 align-items-center">
                            <div>
                                <img class="ni ni-single-02" src="../assets/img/perfil.jpg" alt="Imagem" width="40px">
                            </div>
                            <div class="ms-4 nome-truncado">
                                <p class="text-xs font-weight-bold mb-0">Nome:</p>
                                <h6 class="text-sm mb-0">${nome}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="text-center">
                            <p class="text-xs font-weight-bold mb-0">Função:</p>
                            <h6 class="text-sm mb-0">${funcao}</h6>
                        </div>
                    </td>
                    <td>
                        <div class="text-center">
                            <p class="text-xs font-weight-bold mb-0">Data de inicio</p>
                            <h6 class="text-sm mb-0">${entrada_formatada}</h6>
                        </div>
                    </td>
                    <td class="align-middle text-sm">
                        <div class="col text-center" style="margin-top: 20px;">
                            <div class="btn-group" role="group" id="cellEditar">
                                <button class="btn btn-success btn-sm btn-editar-tecnico" data-id="${indice}" data-nome="${nome}" data-funcao="${funcao}" data-entrada="${entrada}">Editar</button>
                                <button class="btn btn-danger btn-sm btn-excluir-tecnico" data-id="${indice}">Excluir</button>
                            </div>
                        </div>
                    </td>
                `;
                tableTec.appendChild(tr);
            });
        } catch (error) {
            console.error(error);
        }
    }

    renderTableLaboratorioAdm(data) {
        const tableLaboratorioAdm = $('#tableLaboratorioAdm').DataTable({
            data: data,
            columns: [
                {
                    data: 'nome',
                    title: 'Paciente',
                    render: function (data, type, row) {
                        return `
                            <div class="preventiva-cell">
                            <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                             ${data}
                            </div>
                        `;
                    },
                },
                { data: 'coletador', title: 'Nome do coletador' },
                { data: 'nr_atendimento', title: 'Nº Atendimeto' },
                { data: 'nr_prescricao', title: 'Nº Prescrição' },
                {
                    data: 'dt_lancamento',
                    title: 'Data de lançamento',
                    render: function (data, type, row) {
                        return Utils.formatarData(row.dt_lancamento)
                    },
                },
                {
                    data: 'ds_exame',
                    title: 'Exames',
                    render: function (data, type, row) {
                        return data.length > 20 ? data.substring(0, 20) + '...' : data;
                    },
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        if (window.location.pathname.includes('laboratorio-relatorio.php')) {
                            $('#tableLaboratorioAdm_paginate').remove();
                            $('#tableLaboratorioTrigemTable_paginate').remove();
                            $('.button-table').remove();

                        }
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-view-adm-lab" data-id="${row.id}" >Visualizar</button></li>
                                    <li><button class="dropdown-item btn-editar-adm-lab" data-id="${row.id}" >Editar</button></li>
                                    <li><button class="dropdown-item btn-excluir-adm-lab" data-id="${row.id}" >Excluir</button></li>
                                </ul>
                            </div>
                        `;
                    },
                },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json'
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [1], order: 'desc' },
            ],
            pageLength: 20,
            initComplete: function (settings, json) {
                $('#loadingOverlayLab').hide();
            }
        });
        $('#tableLaboratorioAdm').on('click', '.btn-visualizar', function () {

            const laboratorioAdm = $(this).data('id');
            const rowIndex = tableLaboratorioAdm.row($(this).closest('tr')).index();
            const row = tableLaboratorioAdm.rows(rowIndex).data()[0];

            const detalhesTr = $(`tr.detalhes[data-id="${laboratorioAdm}"]`);

            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const novaDetalhesTr = `<tr class="detalhes" data-id="${laboratorioAdm}">
                            <th colspan="8">Detalhes</th>
                        </tr>
                        <tr class="detalhes" data-id="${laboratorioAdm}">
                            <td colspan="8">
                                <table class="table">
                                    <tr>
                                        <th>Punção</th>
                                        <td>
                                            ${row.puncao === 'sim' ? row.total + ' ' + row.descricao || 'Não especificado' : 'Não especificado'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Hora da coleta</th>
                                        <td>${row.hora_entrada || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Hora da baixa</th>
                                        <td>${row.hora_chegada || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Local</th>
                                        <td>${row.local || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                    <th>Data de nascimento</th>
                                        <td>${Utils.formatarData(row.dt_nascimento) || 'Não especificado'}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>`;

                const currentRow = $(this).closest('tr');
                currentRow.after(novaDetalhesTr);
            }
        });
    }

    renderPreventivas(jsonData, patrimoniosVencidos, totalsByTecnico) {
        const totalPatrimoniosGlobal = jsonData.length;
        const idCampo = document.getElementById('table-responsive-tbody');
        const row = document.createElement('div');
        row.classList.add('row');

        const totalsByFirstName = {};

        Object.keys(totalsByTecnico).forEach((tecnico) => {
            const match = tecnico.match(/^[^\s]+/);
            const firstName = match ? match[0].toUpperCase() : tecnico.toUpperCase();
            if (!totalsByFirstName[firstName]) {
                totalsByFirstName[firstName] = 0;
            }
            totalsByFirstName[firstName] += totalsByTecnico[tecnico];
        });

        Object.keys(totalsByFirstName).forEach((firstName) => {
            const divTecnico = this.createCard(
                totalsByFirstName[firstName],
                ((totalsByFirstName[firstName] / totalPatrimoniosGlobal) * 100).toFixed(2),
                'ni ni-laptop',
                'bg-gradient-primary',
                `${firstName}`
            );

            row.appendChild(divTecnico);
        });

        while (idCampo.firstChild) {
            idCampo.removeChild(idCampo.firstChild);
        }

        idCampo.appendChild(row);
        this.renderPreventivasVencidas(jsonData, patrimoniosVencidos, totalsByTecnico)
    }

    renderPreventivasVencidas(jsonData, patrimoniosVencidos, totalsByTecnico) {
        const totalPatrimoniosGlobal = jsonData.length;
        const totalPatrimoniosVencidos = patrimoniosVencidos.length;
        const totalPatrimoniosNaoVencidos = totalPatrimoniosGlobal - totalPatrimoniosVencidos;

        const porcentagemVencidos = ((totalPatrimoniosVencidos / totalPatrimoniosGlobal) * 100).toFixed(2);
        const porcentagemNaoVencidos = ((totalPatrimoniosNaoVencidos / totalPatrimoniosGlobal) * 100).toFixed(2);

        const tableResponsiveVencida = document.getElementById('table-responsive-vencida');

        if (!tableResponsiveVencida) {
            console.error("Div com ID 'table-responsive-vencida' não encontrada.");
            return;
        }

        const divVencidos = this.createCardVendidos(
            totalPatrimoniosVencidos,
            porcentagemVencidos,
            'ni-alert-circle',
            'bg-gradient-danger',
            'Preventivas Vencidas'
        );

        const divNaoVencidos = this.createCardVendidos(
            totalPatrimoniosNaoVencidos,
            porcentagemNaoVencidos,
            'ni-check-bold',
            'bg-gradient-success',
            'Preventivas Não Vencidas'
        );
        tableResponsiveVencida.appendChild(divVencidos);
        tableResponsiveVencida.appendChild(divNaoVencidos);

        this.chartVencidas(
            tableResponsiveVencida,
            totalPatrimoniosVencidos,
            totalPatrimoniosNaoVencidos
        );
    }

    chartVencidas(container, totalPatrimoniosVencidos, totalPatrimoniosNaoVencidos) {
        container.innerHTML = '';

        const chartCanvas = document.createElement('canvas');
        chartCanvas.id = 'chart-vencidas';
        chartCanvas.classList.add('chart-canvas');
        chartCanvas.height = 400;
        chartCanvas.width = 600;

        container.appendChild(chartCanvas);

        const chartContext = chartCanvas.getContext('2d');
        const data = {
            labels: ['Vencidas', 'Não Vencidas'],
            datasets: [
                {
                    data: [totalPatrimoniosVencidos, totalPatrimoniosNaoVencidos],
                    backgroundColor: ['rgba(220, 53, 69, 0.5)', 'rgba(40, 167, 69, 0.5)'],
                    borderColor: ['rgba(220, 53, 69, 1)', 'rgba(40, 167, 69, 1)'],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
        };

        const myChart = new Chart(chartContext, {
            type: 'pie',
            data: data,
            options: options,
        });
    }

    createCardVendidos(total, percentage, icon, gradientClass, title) {
        let card = document.createElement('div');
        card.innerHTML = `
        <h4 class="font-weight-bold mb-1">
         Total de ${title}
            <span>(${total})</span>
            <span class="d-block text-body text-sm">${percentage}%</span>
        </h4>
        `
        return card;
    }

    createCard(value, percentage, iconClass, bgColorClass, title) {
        const card = document.createElement('tr');
        card.innerHTML = `
            <tr>
                <td>
                    <div class="d-flex px-2 py-0">
                        <span class="icon icon-shape ${bgColorClass} shadow-${bgColorClass.replace('bg-gradient-', '')} text-center rounded-circle">${value}</span>
                        <i class="${iconClass} text-lg opacity-10" aria-hidden="true"></i>
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${title}</h6>
                        </div>
                    </div>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="text-xs">${percentage}%</span>
                </td>
            </tr>
        `;

        return card;
    }

    addCards(cards) {

        this.tableDiv.innerHTML = '';

        cards.forEach(card => {
            this.tableDiv.appendChild(card);
        });
    }

    chartAdministrativo(data) {
        const examCounts = {};
        data.forEach(entry => {
            const name = entry.coletador.toUpperCase();
            examCounts[name] = (examCounts[name] || 0) + 1;
        });

        const countsArray = Object.keys(examCounts).map(name => ({ name, count: examCounts[name] }));

        countsArray.sort((a, b) => b.count - a.count);

        let filteredNames = countsArray.map(item => item.name);
        let filteredCounts = countsArray.map(item => item.count);

        const filterInput = document.getElementById('filter-input');
        let myChart;
        filterInput.addEventListener('input', () => {
            const filterValue = filterInput.value.toUpperCase();
            filteredNames = countsArray
                .filter(item => item.name.includes(filterValue))
                .map(item => item.name);
            filteredCounts = countsArray
                .filter(item => item.name.includes(filterValue))
                .map(item => item.count);

            updateChart();
        });

        function updateChart() {
            if (myChart) {
                myChart.destroy();
            }

            const ctx = document.getElementById('chart-administrativo').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: filteredNames,
                    datasets: [{
                        label: 'Coletas por colaborador',
                        data: filteredCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        updateChart();
        this.chartAdministrativoAnual(data);
    }




    chartAdministrativoAnual(data) {
        const yearSelect = document.getElementById('select-ano');
        const uniqueYears = Array.from(new Set(data.map(entry => new Date(entry.dt_lancamento).getFullYear())));

        uniqueYears.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.text = year;
            yearSelect.add(option);
        });

        function atualizarGrafico() {
            const selectedYear = yearSelect.value;
            const filteredData = data.filter(entry => new Date(entry.dt_lancamento).getFullYear().toString() === selectedYear);
            updateChart(filteredData);
        }

        function updateChart(filteredData) {
            const examCounts = {};
            filteredData.forEach(entry => {
                const date = new Date(entry.dt_lancamento);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                const key = `${month}-${year}`;
                examCounts[key] = (examCounts[key] || 0) + 1;
            });

            const labels = Object.keys(examCounts);
            const counts = Object.values(examCounts);

            const ctx = document.getElementById('chart-administrativo-anual').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total por mês',
                        data: counts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const label = labels[context.dataIndex];
                                    const [month, year] = label.split('-');
                                    return `Total de ${context.parsed.y} em ${getMonthName(month)} de ${year}`;
                                }
                            }
                        }
                    }
                }
            });
        }
        function getMonthName(monthNumber) {
            const months = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            return months[monthNumber - 1];
        }
        updateChart(data);
        this.chartAdministrativoPuncao(data)
    }

    chartConfirmacao(data) {
        const confirmacaoCounts = {};

        data.forEach(entry => {
            let confirmacaoValue = entry.cd_confirmacao ? entry.cd_confirmacao.toUpperCase() : null;

            const allowedValues = ['OK', 'ERRO AO ANEXAR TASY', 'CANCELADO NO TASY', 'NÃO LOCALIZADO', 'ERRO AO ABRIR ATENDIMENTO', 'ERRO AO ABRIR PRESCRIÇÂO', 'NÃO ESTÁ PRONTO', 'ERRO AO ANEXAR NO TASY', 'RECOLETA', 'AGUARDANDO RESULTADO'];
            if (allowedValues.includes(confirmacaoValue)) {
                confirmacaoCounts[confirmacaoValue] = (confirmacaoCounts[confirmacaoValue] || 0) + 1;
            }
        });

        const countsArray = Object.keys(confirmacaoCounts).map(value => ({ value, count: confirmacaoCounts[value] }));

        countsArray.sort((a, b) => b.count - a.count);

        const values = countsArray.map(item => item.value);
        const counts = countsArray.map(item => item.count);

        let backgroundColors = values.map(value => {
            switch (value) {
                case 'OK':
                    return 'rgba(0, 255, 0, 0.2)';
                case 'RECOLETA':
                    return 'rgba(255, 255, 0, 0.2)';
                case 'AGUARDANDO RESULTADO':
                    return 'rgba(0, 0, 255, 0.2)';
                default:
                    return 'rgba(255, 0, 0, 0.2)';
            }
        });

        let borderColors = values.map(value => {
            switch (value) {
                case 'OK':
                    return 'rgba(0, 255, 0, 1)';
                case 'RECOLETA':
                    return 'rgba(255, 255, 0, 1)';
                case 'AGUARDANDO RESULTADO':
                    return 'rgba(0, 0, 255, 1)';
                default:
                    return 'rgba(255, 0, 0, 1)';
            }
        });

        let myChart;

        function createChart() {
            const ctx = document.getElementById('chart-triagem').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: values,
                    datasets: [{
                        label: 'Total de Confirmações',
                        data: counts,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        createChart();
        this.chartClinicas(data);
    }


    chartClinicas(data) {
        const ds_localCounts = {};

        data.forEach(entry => {
            let ds_localValue = entry.ds_local ? entry.ds_local.toUpperCase() : null;

            if (ds_localValue) {
                ds_localCounts[ds_localValue] = (ds_localCounts[ds_localValue] || 0) + 1;
            }
        });

        const countsArray = Object.keys(ds_localCounts).map(value => ({ value, count: ds_localCounts[value] }));

        countsArray.sort((a, b) => b.count - a.count);

        const values = countsArray.map(item => item.value);
        const counts = countsArray.map(item => item.count);

        let backgroundColors = values.map(() => {
            return `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 0.6)`;
        });

        let borderColors = backgroundColors.map(color => color.replace("0.6", "1"));

        let myChart;

        function createChart() {
            const ctx = document.getElementById('chart-triagem-clinicas').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: values,
                    datasets: [{
                        label: 'Total por Clínica',
                        data: counts,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        createChart();
    }

    chartAdministrativoPuncao(data) {
        const puncCounts = {};
        const monthYearMap = {};

        data.forEach(entry => {
            const totalPuncoes = parseInt(entry.total) || 0;
            const date = new Date(entry.dt_lancamento);
            const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

            puncCounts[monthYear] = (puncCounts[monthYear] || 0) + totalPuncoes;

            monthYearMap[monthYear] = (monthYearMap[monthYear] || 0) + totalPuncoes;
        });

        const countsArray = Object.keys(puncCounts).map(monthYear => ({ monthYear, count: puncCounts[monthYear] }));

        countsArray.sort((a, b) => new Date(a.monthYear) - new Date(b.monthYear));

        const labels = countsArray.map(item => item.monthYear);
        const counts = countsArray.map(item => item.count);

        let backgroundColors = labels.map(() => 'rgba(75, 192, 192, 0.2)');
        let borderColors = labels.map(() => 'rgba(75, 192, 192, 1)');

        let myChart;

        function createChart() {
            const ctx = document.getElementById('chart-administrativo-puncao').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total de punções',
                        data: counts,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        createChart();
    }


    /////////////////////////////////////////// Cadastros de Usuarios /////////////////////////////////////////////

    renderTableControleUsuario(data) {
        let selectedIds = [];
        const tableControleUser = $('#tableControleUser').DataTable({
            data: data,
            columns: [
                {
                    data: 'funcao', title: 'Função',
                    render: function (data, type, row) {
                        switch (row.funcao) {
                            case '0':
                                return `<span class="badge badge-sm bg-gradient-warning">Arquivo</span>`;
                            case '1':
                                return `<span class="badge badge-sm bg-gradient-success">Administrador</span>`;
                            case '2':
                                return `<span class="badge badge-sm bg-gradient-primary">Laboratorio</span>`;
                            case '3':
                                return `<span class="badge badge-sm bg-gradient-primary">Laboratorio Gestor</span>`;
                            case '4':
                                return `<span class="badge badge-sm bg-gradient-danger">Nir Gestor</span>`;
                            case '5':
                                return `<span class="badge badge-sm bg-gradient-danger">Nir</span>`;
                            case '6':
                                return `<span class="badge badge-sm bg-gradient-warning">Gestão de pessoas</span>`;
                            default:
                                return `<span class="badge badge-sm bg-gradient-danger">Novo item</span>`;
                        }
                    },
                },
                { data: 'nome', title: 'Nome' },
                { data: 'usuario', title: 'Nome de usuário' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-editar-controle-user" data-id="${row.id}" >Redefinir senha</button></li>
                                    <li><button class="dropdown-item btn-excluir-controle-user" data-id="${row.id}" >Excluir</button></li>
                                </ul>
                            </div>
                        `;
                    },
                },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json'
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [1], order: 'desc' },
            ],
            pageLength: 20,
        });

        $('#tableControleUser').on('click', '#selectAllChetableControleUser', function () {
            const isChecked = $(this).prop('checked');
            $('input[type="checkbox"]', tableControleUser.rows().nodes()).prop('checked', isChecked);
            selectedIds = [];
            data.forEach(function (item) {
                item.select = isChecked;
                if (isChecked) {
                    selectedIds.push(item.id);
                    console.log(selectedIds);
                    $("#excluir-all-controle-user").attr('disabled', false);
                } else {
                    $("#excluir-all-controle-user").attr('disabled', true);
                }
            });

            tableControleUser.draw();
        });

        $('#tableControleUser').on('click', '#selectAllChetableControleUser', function () {
            const isChecked = $(this).prop('checked');
            $('.checkbox-controle-user', tableControleUser.rows().nodes()).prop('checked', isChecked);

            selectedIds = [];
            data.forEach(function (item) {
                item.select = isChecked;
                if (isChecked) {
                    selectedIds.push(item.id);
                    console.log(selectedIds);
                    $("#excluir-all-controle-user").attr('disabled', false);
                } else {
                    $("#excluir-all-controle-user").attr('disabled', true);
                }
            });

            tableControleUser.draw();
        });

        $('#tableControleUser tbody').on('change', '.checkbox-controle-user', function () {
            const rowIndex = tableControleUser.row($(this).parents('tr')).index();
            const rowData = tableControleUser.row(rowIndex).data();
            rowData.select = $(this).prop('checked');

            if (rowData.select) {
                selectedIds.push(rowData.id);
                console.log(selectedIds);
                $("#excluir-all-controle-user").attr('disabled', false);
            } else {
                const index = selectedIds.indexOf(rowData.id);
                if (index !== -1) {
                    selectedIds.splice(index, 1);
                    $("#excluir-all-controle-user").attr('disabled', true);
                }
            }
        });

        this.getSelecttableControleUser = function () {
            return selectedIds;
        };

        return this.getSelecttableControleUser;
    }

    renderTableAniversariante(data) {
        let selectedIds = [];
        if (selectedIds == '') {
            $("#excluir-all-aniversariantes").attr('disabled', true);
        }
        const tableAniversariante = $('#tableAniversariante').DataTable({
            data: data,
            columns: [
                {
                    data: 'select',
                    title: '<input type="checkbox" id="selectAllCheckboxAniversariante">',
                    render: function (data) {
                        return '<input type="checkbox" class="checkbox-aniversariante" ' + (data ? 'checked' : '') + '>';
                    },
                },
                { data: 'dia', title: 'Dia do aniversário' },
                { data: 'nome', title: 'Nome' },
                { data: 'funcao', title: 'Função' },
                {
                    data: null,
                    render: function (data, type, row) {
                        if (window.location.pathname.includes('cadastrosRelatorios.php')) {
                            $('#tableAniversariante_paginate').remove();
                            $('.button-table').remove();
                        }
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-excluir-aniversariante" data-id="${row.id}" >Excluir</button></li>
                                </ul>
                            </div>
                        `;
                    },
                },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [1], order: 'desc' },
            ],
            pageLength: 150,
        });

        $('#tableAniversariante').on('click', '#selectAllCheckboxAniversariante', function () {
            const isChecked = $(this).prop('checked');
            $('input[type="checkbox"]', tableAniversariante.rows().nodes()).prop('checked', isChecked);

            selectedIds = [];

            data.forEach(function (item) {
                item.select = isChecked;
                if (isChecked) {
                    selectedIds.push(item.id);

                    $("#excluir-all-aniversariantes").attr('disabled', false);
                } else {
                    $("#excluir-all-aniversariantes").attr('disabled', true);
                }
            });
            tableAniversariante.draw();
        });

        $('#tableAniversariante').on('click', '#selectAllCheckboxAniversariante', function () {
            const isChecked = $(this).prop('checked');
            $('.checkbox-aniversariante', tableAniversariante.rows().nodes()).prop('checked', isChecked);

            selectedIds = [];

            data.forEach(function (item) {
                item.select = isChecked;
                if (isChecked) {
                    selectedIds.push(item.id);

                    $("#excluir-all-aniversariantes").attr('disabled', false);
                } else {
                    $("#excluir-all-aniversariantes").attr('disabled', true);
                }
            });

            tableAniversariante.draw();
        });

        $('#tableAniversariante tbody').on('change', '.checkbox-aniversariante', function () {
            const rowIndex = tableAniversariante.row($(this).parents('tr')).index();
            const rowData = tableAniversariante.row(rowIndex).data();
            rowData.select = $(this).prop('checked');

            if (rowData.select) {
                selectedIds.push(rowData.id);
                console.log(selectedIds);
                $("#excluir-all-aniversariantes").attr('disabled', false);
            } else {
                const index = selectedIds.indexOf(rowData.id);
                if (index !== -1) {
                    selectedIds.splice(index, 1);
                    $("#excluir-all-aniversariantes").attr('disabled', true);
                }
            }
        });

        this.getSelectedIdsAniversariante = function () {
            return selectedIds;
        };

        return this.getSelectedIdsAniversariante;
    }

    renderTablePreventiva(data) {
        let selectedIds = [];
        $("#excluir-all-preventivas").attr('disabled', true);
        const tablePreventiva = $('#tablePreventiva').DataTable({
            data: data,
            columns: [
                {
                    data: 'select',
                    title: '<input type="checkbox" id="selectAllCheckboxPreventivas">',
                    render: function (data) {
                        return '<input type="checkbox" ' + (data ? 'checked' : '') + '>';
                    },
                },
                {
                    data: 'patrimonio',
                    title: 'Patrimônio',
                    render: function (data, type, row) {
                        return `
                            <div class="preventiva-cell">
                            <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-preventiva-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                             ${data}
                            </div>
                        `;
                    },
                },
                {
                    data: 'sistema_Operacional',
                    title: 'Sistema Operacional',
                    render: function (data, type, row) {
                        try {
                            if (row.sistema_Operacional) {
                                const sistemaOperacional = row.sistema_Operacional.toLowerCase();

                                if (sistemaOperacional.includes('windows')) {

                                    return `<span class="badge badge-sm bg-gradient-success"><i class="fab fa-windows"></i> ${row.sistema_Operacional}</span>`;
                                } else if (sistemaOperacional.includes('linux')) {

                                    return `<span class="badge badge-sm bg-gradient-success"><i class="fab fa-linux"></i> ${row.sistema_Operacional}</span>`;
                                } else {
                                    return '<span class="badge badge-sm bg-danger"><i class="fas fa-question"></i> Não especificado</span>';
                                }
                            } else {
                                return '<span class="badge badge-sm bg-danger"><i class="fas fa-question"></i> Não especificado</span>';
                            }
                        } catch (error) {
                            console.error('Erro ao renderizar a coluna Sistema Operacional:', error);
                            return '';
                        }
                    }
                },
                { data: 'tecnico', title: 'Técnico' },
                { data: 'local_', title: 'Local' },
                {
                    data: 'data_prox',
                    title: 'Status',
                    render: function (data, type, row) {
                        if (data) {
                            if (row.data_prox) {
                                const dataProx = new Date(row.data_prox);
                                const dataAtual = new Date();

                                if (dataProx < dataAtual) {
                                    return '<span class="badge badge-sm bg-danger">Vencido</span>';
                                } else {
                                    return '<span class="badge badge-sm bg-gradient-success">Ativo</span>';
                                }
                            } else {
                                return '<span class="badge badge-sm bg-gradient-secondary">Sem data</span>';
                            }
                        } else {
                            return data;
                        }
                    },
                },
                {
                    data: 'data_prev',
                    title: 'Data da Preventiva',
                    render: function (data) {
                        return Utils.formatarData(data);
                    },
                },
                { data: 'descricao', title: 'Modelo' },
                {
                    data: null,
                    render: function (data, type, row) {
                        if (window.location.pathname.includes('cadastrosRelatorios.php')) {
                            $('#tablePreventiva_paginate').remove()
                            $('.button-table').remove();
                        }
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false"e" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-editar-preventiva"  data-id="${row.id}" >Editar</button></li>
                                    <li><button class="dropdown-item btn-excluir-preventiva" data-id="${row.id}" >Excluir</button></li>
                                </ul>
                            </div>
                        `;
                    },
                },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 300,
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        $('#tablePreventiva').on('click', '.btn-visualizar', function () {

            const preventivaId = $(this).data('preventiva-id');

            const rowIndex = tablePreventiva.row($(this).closest('tr')).index();
            const row = tablePreventiva.rows(rowIndex).data()[0];
            const dataProx = Utils.formatarData(row.data_prox);

            const detalhesTr = $(`tr.detalhes-preventiva[data-preventiva-id="${preventivaId}"]`);

            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const novaDetalhesTr = `<tr class="detalhes-preventiva" data-preventiva-id="${preventivaId}">
                            <th colspan="8">Detalhes</th>
                        </tr>
                        <tr class="detalhes-preventiva" data-preventiva-id="${preventivaId}">
                            <td colspan="8">
                                <table class="table">
                                    <tr>
                                        <th>Data da proxima prevêntiva</th>
                                        <td>${dataProx || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Nome do host antigo</th>
                                        <td>${row.hostName_Antigo || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Nome do host novo</th>
                                        <td>${row.hostName_Novo || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Senha do office</th>
                                        <td>${row.office || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Versão do office</th>
                                        <td>${row.modelo || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Login</th>
                                        <td>${row.login || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Periférico</th>
                                        <td>${row.perifericos || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Observação</th>
                                        <td>${row.observacao || 'Não especificado'}</td>
                                    </tr>
                                    <!-- Adicione mais linhas conforme necessário -->
                                </table>
                            </td>
                        </tr>`;

                const currentRow = $(this).closest('tr');
                currentRow.after(novaDetalhesTr);
            }
        });

        $('#tablePreventiva').on('click', '#selectAllCheckboxPreventivas', function () {
            const isChecked = $(this).prop('checked');
            $('input[type="checkbox"]', tablePreventiva.rows().nodes()).prop('checked', isChecked);

            selectedIds = [];

            data.forEach(function (item) {
                item.select = isChecked;
                if (isChecked) {
                    selectedIds.push(item.id);
                    $("#excluir-all-preventivas").attr('disabled', false);
                } else {
                    $("#excluir-all-preventivas").attr('disabled', true);
                }
            });

            tablePreventiva.draw();
        });

        $('#tablePreventiva tbody').on('change', 'input[type="checkbox"]', function () {
            const rowIndex = tablePreventiva.row($(this).parents('tr')).index();
            const rowData = tablePreventiva.row(rowIndex).data();
            rowData.select = $(this).prop('checked');

            if (rowData.select) {
                selectedIds.push(rowData.id);
                $("#excluir-all-preventivas").attr('disabled', false);
            } else {
                const index = selectedIds.indexOf(rowData.id);
                if (index !== -1) {
                    selectedIds.splice(index, 1);
                    $("#excluir-all-preventivas").attr('disabled', true);
                }
            }
        });

        this.getSelectedIds = function () {
            return selectedIds;
        };

        return this.getSelectedIds;

    }

    renderTableLaboratorio(data) {
        $(document).on('input', () => {
            const nomepacVal = $("#nomepacLab").val();
            const codpacVal = $("#codpacLab").val();
            const shouldDisable = (value) => value !== '';
            $("#nomepacLab, #codpacLab").attr('disabled', false);
            if (shouldDisable(nomepacVal)) {
                $("#codpacLab").attr('disabled', true);
            } else if (shouldDisable(codpacVal)) {
                $("#nomepacLab").attr('disabled', true);
            }
        });
        const tableLaboratorio = $('#tableLaboratorio').DataTable({
            data: data,
            columns: [
                {
                    data: 'numatend', title: 'Atendimento',
                    render: function (data, type, row) {
                        return `
                        <div class="arquivo-cell">
                        <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-arquivo-id="${row.numatend}"><i class="ni ni-fat-add"></i></button>
                         ${data}
                        </div>`;
                    },
                },
                { data: 'nomepac', title: 'Nome do paciênce' },
                { data: 'tipoatend', title: 'Tipo de atendimento' },
                { data: 'desprocgen', title: 'Procedimento' },
                {
                    data: 'datatend', title: 'Data de atendimento',
                    render: function (data, type, row) {
                        let dataEntrada = Utils.formatarDataHora(row.datatend);
                        return `
                    ${dataEntrada}    
                   `;
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-resultado"  data-id="${row.numatend}" >Resultado</button></li>
                                </ul>
                            </div>`;
                    },
                },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 20,
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        $('#tableLaboratorio').on('click', '.btn-visualizar', function () {
            const arquivoId = $(this).data('arquivo-id');
            const rowIndex = tableLaboratorio.row($(this).closest('tr')).index();
            const row = tableLaboratorio.rows(rowIndex).data()[0];
            const detalhesTr = $(`tr.detalhes-arquivo[data-arquivo-id="${arquivoId}"]`);
            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const novaDetalhesTr = `<tr class="detalhes-arquivo" data-arquivo-id="${arquivoId}">
                            <th colspan="8">Detalhes</th>
                        </tr>
                        <tr class="detalhes-arquivo" data-arquivo-id="${arquivoId}">
                            <td colspan="8">
                                <table class="table">
                                ${row.codpac ? `<tr><th>Prontuario:</th><td>${row.codpac}</td></tr>` : ''}
                                ${row.assinado ? `<tr><th>Assinado:</th><td>${row.assinado}</td></tr>` : ''}
                                ${row.dataatu ? `<tr><th>Data Atulizada:</th><td>${Utils.formatarDataHora(row.dataatu)}</td></tr>` : ''}
                                ${row.datadigit ? `<tr><th>Data Digitação:</th><td>${Utils.formatarDataHora(row.datadigit)}</td></tr>` : ''}
                                ${row.dataimpre ? `<tr><th>Data Impressão:</th><td>${Utils.formatarDataHora(row.dataimpre)}</td></tr>` : ''}
                                ${row.datalib ? `<tr><th>Data Liberação:</th><td>${Utils.formatarDataHora(row.datalib)}</td></tr>` : ''}
                                ${row.operdigit ? `<tr><th>Operação digito:</th><td>${row.operdigit}</td></tr>` : ''}
                                ${row.operlib ? `<tr><th>Operação liberado:</th><td>${row.operlib}</td></tr>` : ''}
                                ${row.resultpdf ? `<tr><th>Result pdf:</th><td>${row.resultpdf}</td></tr>` : ''}
                                </table>
                            </td>
                        </tr>`;
                const currentRow = $(this).closest('tr');
                currentRow.after(novaDetalhesTr);
            }
        });
    }

    rendertableExamesTriagem(data) {
        const tableExamesTriagemId = $('#tableExamesTriagem').DataTable({
            data: data,
            columns: [
                { data: 'clinica', title: 'Nome da clínica' },
                { data: 'exame', title: 'Nome do exame' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-excluir-exame"  data-id="${row.id}" >Excluir</button></li>
                                </ul>
                            </div>
                        `;
                    },
                },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            }
        });
    }

    renderTableLaboratorioTrigem(data) {
        const tableLaboratorioTrigemTable = $('#tableLaboratorioTrigemTable').DataTable({
            data: data,
            columns: [
                {
                    data: 'nm_paciente',
                    title: 'Paciênte',
                    render: function (data, type, row) {
                        return `
                            <div class="preventiva-cell">
                            <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                             ${data}
                            </div>
                        `;
                    },
                },
                { data: 'cd_estabelecimento', title: 'Estabelecimento' },
                { data: 'nr_prescricao', title: 'Nº Prescrição' },
                { data: 'nr_atendimento', title: 'Nº Atendimento' },
                {
                    data: 'dt_atualizacao',
                    title: 'Data de Lançamento',
                    render: function (data, type, row) {
                        if (row.dt_atualizacao === null) {
                            return '';
                        } else {
                            let entrada = Utils.formatarDataHora(row.dt_atualizacao);
                            return `${entrada}`;
                        }
                    }
                },
                {
                    data: 'dt_entrada', title: 'Data de entrada',
                    render: function (data, type, row) {
                        let entrada = Utils.formatarData(row.dt_entrada);
                        return entrada;
                    }
                },
                { data: 'ds_local', title: 'Local' },
                {
                    data: 'cd_confirmacao', title: 'Confirmação',
                    render: function (data, type, row) {
                        switch (row.cd_confirmacao) {
                            case 'OK':
                                return `<span class="badge badge-sm bg-gradient-success" style="padding-left: 30%;padding-right: 30%;">OK</span>`;
                            case 'ERRO AO ANEXAR TASY':
                                return `<span class="badge badge-sm bg-gradient-danger">ERRO AO ANEXAR TASY</span>`;
                            case 'CANCELADO NO TASY':
                                return `<span class="badge badge-sm bg-gradient-warning">CANCELADO NO TASY</span>`;
                            case 'NÃO LOCALIZADO':
                                return `<span class="badge badge-sm bg-gradient-warning">NÃO LOCALIZADO</span>`;
                            case 'ERRO AO ABRIR ATENDIMENTO':
                                return `<span class="badge badge-sm bg-gradient-danger">ERRO AO ABRIR ATENDIMENTO</span>`;
                            case 'ERRO AO ABRIR PRESCRIÇÂO':
                                return `<span class="badge badge-sm bg-gradient-danger">ERRO AO ABRIR PRESCRIÇÂO</span>`;
                            case 'ERRO AO ANEXAR NO TASY':
                                return `<span class="badge badge-sm bg-gradient-danger">ERRO AO ANEXAR NO TASY</span>`;
                            case 'RECOLETA':
                                return `<span class="badge badge-sm bg-gradient-warning">RECOLETA</span>`;
                            case 'NÃO ESTÁ PRONTO':
                                return `<span class="badge badge-sm bg-gradient-warning">NÃO ESTÁ PRONTO</span>`;
                            case 'AGUARDANDO RESULTADO':
                                return `<span class="badge badge-sm bg-gradient-primary">AGUARDANDO RESULTADO</span>`;
                            default:
                                return `<span class="badge badge-sm bg-gradient-danger">AGUARDANDO RESULTADO</span>`;
                        }
                    },
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-view-exame-table"  data-id="${row.id}" >Visualizar</button></li>
                                    <li><button class="dropdown-item btn-editar-exame-table"  data-id="${row.id}" >Editar</button></li>
                                    <li><button class="dropdown-item btn-excluir-exame-table"  data-id="${row.id}" >Excluir</button></li>
                                </ul>
                            </div>
                        `;
                    },
                },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [1], order: 'desc' },
            ],
            pageLength: 20,
        });
        $('#tableLaboratorioTrigemTable').on('click', '.btn-visualizar', function () {
            const laboratorioAdm = $(this).data('id');
            const rowIndex = tableLaboratorioTrigemTable.row($(this).closest('tr')).index();
            const row = tableLaboratorioTrigemTable.rows(rowIndex).data()[0];
            const detalhesTr = $(`tr.detalhes[data-id="${laboratorioAdm}"]`);
            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const novaDetalhesTr = `<tr class="detalhes" data-id="${laboratorioAdm}">
                            <th colspan="8">Detalhes</th>
                        </tr>
                        <tr class="detalhes" data-id="${laboratorioAdm}">
                            <td colspan="8">
                                <table class="table">
                                    <tr> 
                                        <th>Observação</th>
                                        <td>${row.ds_observacao || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                    <th>Recoleta</th>
                                        <td>${row.recoleta || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Exame</th>
                                        <td>${row.ds_exame || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>${row.status || 'Não especificado'}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>`;
                const currentRow = $(this).closest('tr');
                currentRow.after(novaDetalhesTr);
            }
        });
        this.chartConfirmacao(data)
    }
    gerarBolsasAlicotadas(bolsaOriginal, quantidade) {
        const bolsasAlicotadas = [];
        for (let i = 1; i <= quantidade; i++) {
            bolsasAlicotadas.push(`${bolsaOriginal}${String(i).padStart(2, '0')}`);
        }
        return bolsasAlicotadas;
    }

    renderizarBotaoAlicotado(bolsaOriginal, temFilhos) {
        return `
            <div class="arquivo-cell">
                ${temFilhos ? `
                    <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" 
                            data-ie-aliquotado="${bolsaOriginal}">
                        <i class="ni ni-fat-add"></i>
                    </button>` : ''}
                <div class="bolsas-alicotadas"></div>
            </div>
        `;
    }

    adicionarBolsasAlicotadas(bolsaOriginal, bolsasAlicotadas, divBolsasAlicotadas) {
        bolsasAlicotadas.forEach(bolsaAlicotada => {
            divBolsasAlicotadas.append(`<div>${bolsaAlicotada}</div>`);
        });
    }

    rendertableLaboratorioAgenciaTable(data) {
        const self = this;
        const loadingScreen = $('#loadingOverlayLab');
        const tableLaboratorioAgenciaTableId = $('#tableLaboratorioAgenciaTable').DataTable({
            data: data,
            columns: [
                {
                    data: 'DT_LIBERACAO',
                    title: 'Data',
                    render: function (data, type, row) {
                        if (type === 'display' || type === 'filter') {

                            return moment(data, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                        }
                        return data;
                    }
                },
                { data: 'NR_SANGUE', title: 'Número do sangue' },
                {
                    data: 'IE_TIPO_SANGUE',
                    title: 'ABO-Rh',
                    render: function (data, type, row) {
                        return `${data}${row.IE_FATOR_RH}`
                    }
                },
                { data: 'IE_IRRADIADO', title: 'Irradiado' },
                { data: 'IE_FILTRADO', title: 'Filtrado' },
                {
                    data: 'IE_ALIQUOTADO',
                    title: 'IE_ALIQUOTADO',
                    render: function (data, type, row) {
                        if (data === 'S') {
                            const bolsaOriginal = row.NR_SANGUE;
                            const bolsasAlicotadas = self.gerarBolsasAlicotadas(bolsaOriginal, 5);

                            return self.renderizarBotaoAlicotado(bolsaOriginal, bolsasAlicotadas);
                        }
                        return data;
                    }
                },
                { data: 'DS_DERIVADO', title: 'Derivado' },
                { data: 'NM_USUARIO', title: 'Realizado por' }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                {
                    targets: [0],
                    type: 'date',
                    render: function (data, type, row) {
                        return data.DT_LIBERACAO;
                    },
                    orderable: true,
                    order: 'desc'
                },
            ],
            pageLength: 10,
            preDrawCallback: function () {
                loadingScreen.show();
            },
            drawCallback: function () {
                loadingScreen.hide();
            },
        });
        $('#tableLaboratorioAgenciaTable tbody').on('click', '.btn-visualizar', function () {
            const ieAliquotado = $(this).data('ie-aliquotado');
            const tr = $(this).closest('tr');

            if (tableLaboratorioAgenciaTableId.row(tr).child.isShown()) {
                tableLaboratorioAgenciaTableId.row(tr).child.hide();
                tr.removeClass('shown');
            } else {
                const temFilhos = data.some(item => item.NR_SANGUE.length > 13 && item.NR_SANGUE.startsWith(ieAliquotado));

                if (temFilhos) {
                    const detalhesHtml = `<tr class="detalhes-arquivo" data-ie-aliquotado="${ieAliquotado}">
                        <td colspan="6">
                            <div class="bolsas-alicotadas"></div>
                        </td>
                    </tr>`;

                    tableLaboratorioAgenciaTableId.row(tr).child(detalhesHtml).show();
                    tr.addClass('shown');

                    if (tr.next().find('.btn-visualizar').length === 0) {
                        const divBolsasAlicotadas = tr.next().find('.bolsas-alicotadas');
                        const bolsaOriginal = ieAliquotado;
                        const bolsasFiltradas = data.filter(item => item.NR_SANGUE.startsWith(bolsaOriginal) && item.NR_SANGUE.length > 13);

                        bolsasFiltradas.sort((a, b) => a.NR_SANGUE.localeCompare(b.NR_SANGUE));

                        self.adicionarBolsasAlicotadas(bolsaOriginal, bolsasFiltradas.map(item => item.NR_SANGUE), divBolsasAlicotadas);
                    }
                }
            }
        });

        $('.btn-update-chart').on('click', function () {
            self.updateChart(data);
        });

        this.chartAgenciaEntrada(data);
        this.chartIndicadoresConcentradoHemacias(data);

        document.getElementById('printButtonAuter').addEventListener('click', () => {
            const chartIds = ['chart-agencia-entrada', 'chart-agencia-entrada_derivados', 'chart-agencia-entrada_alicotados'];
            Utils.printCombinedChart(chartIds);
        });
    }

    chartAgenciaEntrada(data) {
        const ctx = document.getElementById('chart-agencia-entrada').getContext('2d');
        const ctxDerivados = document.getElementById('chart-agencia-entrada_derivados').getContext('2d');
        const ctxAlicotados = document.getElementById('chart-agencia-entrada_alicotados').getContext('2d');

        if (this.myChart) {
            this.myChart.destroy();
        }
        if (this.myChartDerivados) {
            this.myChartDerivados.destroy();
        }
        if (this.myChartAlicotados) {
            this.myChartAlicotados.destroy();
        }

        const chartData = this.generateChartData(data);
        const chartDataDerivados = this.generateChartDataDerivados(data);
        const chartDataAlicotados = this.generateChartDataAlicotados(data);

        this.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Total ABO-Rh Realizado no mês',
                    data: chartData.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        this.myChartDerivados = new Chart(ctxDerivados, {
            type: 'bar',
            data: {
                labels: chartDataDerivados.labels,
                datasets: [{
                    label: 'Total Derivados Realizado no mês',
                    data: chartDataDerivados.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        this.myChartAlicotados = new Chart(ctxAlicotados, {
            type: 'bar',
            data: {
                labels: chartDataAlicotados.labels,
                datasets: [{
                    label: 'Total Alicotados Realizado no mês',
                    data: chartDataAlicotados.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


    generateChartData(data) {
        const chartLabels = [];
        const chartValues = [];

        const filteredData = data.filter(item => {
            const itemDate = moment(item.DT_LIBERACAO, 'DD/MM/YYYY HH:mm:ss');
            return itemDate.month() + 1 === this.SEU_MES && itemDate.year() === this.SEU_ANO;
        });

        const countByABORh = {};
        filteredData.forEach(item => {
            const key = `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`;
            countByABORh[key] = (countByABORh[key] || 0) + 1;
        });

        for (const key in countByABORh) {
            chartLabels.push(key);
            chartValues.push(countByABORh[key]);
        }

        return {
            labels: chartLabels,
            values: chartValues
        };
    }

    chartAgenciaEntradaDerivados(data) {
        const ctx = document.getElementById('chart-agencia-entrada').getContext('2d');
        const ctxDerivados = document.getElementById('chart-agencia-entrada_derivados').getContext('2d');

        if (this.myChart) {
            this.myChart.destroy();
        }

        const chartData = this.generateChartData(data);
        const chartDataDerivados = this.generateChartDataDerivados(data);

        this.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Total ABO-Rh Realizado no mês',
                    data: chartData.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        this.myChartDerivados = new Chart(ctxDerivados, {
            type: 'bar',
            data: {
                labels: chartDataDerivados.labels,
                datasets: [{
                    label: 'Total de Derivados no mês',
                    data: chartDataDerivados.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    generateChartDataDerivados(data) {
        const chartLabels = [];
        const chartValues = [];

        const filteredData = data.filter(item => {
            const itemDate = moment(item.DT_LIBERACAO, 'DD/MM/YYYY HH:mm:ss');
            return itemDate.month() + 1 === this.SEU_MES && itemDate.year() === this.SEU_ANO;
        });

        const countByDerivado = {};
        filteredData.forEach(item => {
            const key = item.DS_DERIVADO;
            countByDerivado[key] = (countByDerivado[key] || 0) + 1;
        });

        for (const key in countByDerivado) {
            chartLabels.push(key);
            chartValues.push(countByDerivado[key]);
        }

        return {
            labels: chartLabels,
            values: chartValues
        };
    }

    chartAgenciaEntradaAlicotados(data) {
        const ctx = document.getElementById('chart-agencia-entrada_alicotados').getContext('2d');

        if (this.myChart) {
            this.myChart.destroy();
        }

        const chartData = this.generateChartDataAlicotados(data);

        this.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Total Alicotados Realizado no mês',
                    data: chartData.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    generateChartDataAlicotados(data) {
        const chartLabels = [];
        const chartValues = [];

        const filteredData = data.filter(item => {
            const itemDate = moment(item.DT_LIBERACAO, 'DD/MM/YYYY HH:mm:ss');
            return itemDate.month() + 1 === this.SEU_MES && itemDate.year() === this.SEU_ANO && item.NR_SANGUE.length > 13 && item.IE_ALIQUOTADO.includes('S');
        });

        const countByAlicotados = {};
        filteredData.forEach(item => {
            const key = item.IE_ALIQUOTADO;
            const label = key.includes('S') ? 'Alicotadas' : key;
            countByAlicotados[label] = (countByAlicotados[label] || 0) + 1;
        });

        for (const key in countByAlicotados) {
            chartLabels.push(key);
            chartValues.push(countByAlicotados[key]);
        }

        return {
            labels: chartLabels,
            values: chartValues
        };
    }

    updateChart(data) {
        const inputMonth = parseInt($('.input-month').val());
        const inputYear = parseInt($('.input-year').val());

        if (isNaN(inputMonth) || isNaN(inputYear)) {
            alert('Por favor, informe um mês e ano válidos.');
            return;
        }

        this.SEU_MES = inputMonth;
        this.SEU_ANO = inputYear;
        this.chartAgenciaEntrada(data);
        this.chartAgenciaEntradaDerivados(data);
    }

    rendertranfusaoLaboratorial(data) {
        const tabletranfusaoLaboratorialId = $("#tableLaboratoriotransfusao").DataTable({
            data: data,
            columns: [
                { data: 'NR_ATENDIMENTO', title: 'Atendimento' },
                { data: 'NM_PACIENTE', title: 'Receptor' },
                { data: 'IE_TIPO_SANGUE', title: 'ABO' },
                {
                    data: 'IE_FATOR_RH', title: 'Fator',
                    render: function (data, type, row) {
                        if (data === '+') {
                            return 'Positivo'
                        } else {
                            return 'Negativo'
                        }
                    }
                },
                { data: 'TRANFUSAO', title: 'Data Tranfusão' },
                { data: 'NR_SANGUE', title: 'Nº Sangue' },
                { data: 'DS_DERIVADO', title: 'Derivado' },
                { data: 'IE_ALIQUOTADO', title: 'Alicotado' },
                { data: 'IE_FILTRADO', title: 'Filtrado' },
                { data: 'IE_IRRADIADO', title: 'Irradiado' },
                { data: 'NM_USUARIO_SAIDA', title: 'Biomedico' },
                { data: 'EXAMES', title: 'Exames' },
                { data: 'EXAME_BOLSA', title: 'Exames Bolsa' }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                {
                    targets: [0],
                    type: 'date',
                    render: function (data, type, row) {
                        return data;
                    },
                    orderable: true,
                    order: 'desc'
                },
            ],
            pageLength: 10
        });

        this.dadosArmazenados = dados;
    }

    rendertableLaboratorioAgenciaSaidaTable(data) {
        const self = this;
        const loadingScreen = $('#loadingOverlayLab');
        const tableLaboratorioAgenciaSaidaTableId = $('#tableLaboratorioAgenciaSaidaTable').DataTable({
            data: data,
            columns: [
                {
                    data: 'DT_FECHAMENTO',
                    title: 'Data',
                    render: function (data, type, row) {
                        if (type === 'display' || type === 'filter') {

                            return moment(data, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                        }
                        return data;
                    }
                },
                { data: 'NR_SANGUE', title: 'Número do sangue' },
                {
                    data: 'IE_TIPO_SANGUE',
                    title: 'ABO-Rh',
                    render: function (data, type, row) {
                        return `${data}${row.IE_FATOR_RH}`
                    }
                },
                { data: 'DS_DERIVADO', title: 'Derivado' },
                { data: 'NM_USUARIO', title: 'Realizado por' }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                {
                    targets: [0],
                    type: 'date',
                    render: function (data, type, row) {
                        return data;
                    },
                    orderable: true,
                    order: 'desc'
                },
            ],
            pageLength: 10,
            preDrawCallback: function () {
                loadingScreen.show();
            },
            drawCallback: function () {
                loadingScreen.hide();
            },
        });

        $('.btn-update-chart-saida').on('click', function () {
            self.updateChartSaida(data);
        });

        this.chartAgenciaSaida(data)
    }

    updateChartSaida(data) {
        const inputMonthSaida = parseInt($('.input-month-saida').val());
        const inputYearSaida = parseInt($('.input-year-saida').val());

        if (isNaN(inputMonthSaida) || isNaN(inputYearSaida)) {
            alert('Por favor, informe um mês e ano válidos.');
            return;
        }

        this.SEU_MES = inputMonthSaida;
        this.SEU_ANO = inputYearSaida;
        this.chartAgenciaSaida(data);
        document.getElementById('printButtonSaida').addEventListener('click', () => {
            const chartIds = ['chart-agencia-saida', 'chart-derivados-saida'];
            Utils.printCombinedChart(chartIds);
        });
    }

    chartAgenciaSaida(data) {
        const ctxAgenciaSaida = document.getElementById('chart-agencia-saida').getContext('2d');
        const ctxDerivadosSaida = document.getElementById('chart-derivados-saida').getContext('2d');

        if (this.myChartAgenciaSaida) {
            this.myChartAgenciaSaida.destroy();
        }
        if (this.myChartDerivadosSaida) {
            this.myChartDerivadosSaida.destroy();
        }

        const chartDataAgenciaSaida = this.generateChartDataAgenciaSaida(data);
        const chartDataDerivadosSaida = this.generateChartDataDerivadosSaida(data);

        const randomColor = () => {
            return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
        };

        const agenciaSaidaColors = Array.from({ length: chartDataAgenciaSaida.labels.length }, () => randomColor());
        const derivadosSaidaColors = Array.from({ length: chartDataDerivadosSaida.labels.length }, () => randomColor());

        this.myChartAgenciaSaida = new Chart(ctxAgenciaSaida, {
            type: 'bar',
            data: {
                labels: chartDataAgenciaSaida.labels,
                datasets: [{
                    label: 'Total ABO-Rh Realizado no mês',
                    data: chartDataAgenciaSaida.values,
                    backgroundColor: agenciaSaidaColors,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    },
                    customLegend: {
                        labels: chartDataAgenciaSaida.labels.map((label, index) => ({
                            text: `${label}: ${chartDataAgenciaSaida.values[index]}`,
                            fillStyle: agenciaSaidaColors[index]
                        }))
                    }
                }
            }
        });

        this.myChartDerivadosSaida = new Chart(ctxDerivadosSaida, {
            type: 'bar',
            data: {
                labels: chartDataDerivadosSaida.labels,
                datasets: [{
                    label: 'Total Derivados Realizado no mês',
                    data: chartDataDerivadosSaida.values,
                    backgroundColor: derivadosSaidaColors,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    },
                    customLegend: {
                        labels: chartDataDerivadosSaida.labels.map((label, index) => ({
                            text: `${label}: ${chartDataDerivadosSaida.values[index]}`,
                            fillStyle: derivadosSaidaColors[index]
                        }))
                    }
                }
            }
        });
    }



    generateChartDataAgenciaSaida(data) {
        const chartLabels = [];
        const chartValues = [];

        const filteredData = data.filter(item => {
            const itemDate = moment(item.DT_FECHAMENTO, 'DD/MM/YYYY HH:mm:ss');
            return itemDate.month() + 1 === this.SEU_MES && itemDate.year() === this.SEU_ANO;
        });

        const countByABORh = {};
        filteredData.forEach(item => {
            const key = `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`;
            countByABORh[key] = (countByABORh[key] || 0) + 1;
        });

        for (const key in countByABORh) {
            chartLabels.push(key);
            chartValues.push(countByABORh[key]);
        }

        return {
            labels: chartLabels,
            values: chartValues
        };
    }

    generateChartDataDerivadosSaida(data) {
        const chartLabels = [];
        const chartValues = [];

        const filteredData = data.filter(item => {
            const itemDate = moment(item.DT_FECHAMENTO, 'DD/MM/YYYY HH:mm:ss');
            return itemDate.month() + 1 === this.SEU_MES && itemDate.year() === this.SEU_ANO;
        });

        const countByDerivado = {};
        filteredData.forEach(item => {
            const key = item.DS_DERIVADO;
            countByDerivado[key] = (countByDerivado[key] || 0) + 1;
        });

        for (const key in countByDerivado) {
            chartLabels.push(key);
            chartValues.push(countByDerivado[key]);
        }

        return {
            labels: chartLabels,
            values: chartValues
        };
    }

    rendertableLaboratorioSolicitacaoTable(data) {
        const tableLaboratorioSolicitacaoTableId = $('#tableLaboratorioSolicitacaoTable').DataTable({
            data: data,
            columns: [
                {
                    data: 'DT_ATUALIZACAO_NREC',
                    title: 'Data da Prescrição',
                    render: function (data, type, row) {
                        if (type === 'display' || type === 'filter') {

                            return moment(data, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
                        }
                        return data;
                    }
                },
                { data: 'DT_LIBERACAO_SOLICITACAO', title: 'Data da Liberação' },
                { data: 'NR_SEQUENCIA', title: 'Nº Reserva' },
                { data: 'STATUS', title: 'Status' },
                { data: 'HORA', title: 'Tempo para Libração' }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                {
                    targets: [0],
                    type: 'date',
                    render: function (data, type, row) {
                        return data;
                    },
                    orderable: true,
                    order: 'desc'
                },
            ],
            pageLength: 10
        });
        const self = this
        $('.btn-update-chart-solicitacao').on('click', function () {
            self.updateChartSolicitacao(data);
        });

        this.chartAgenciaSolitacao(data)
    }

    updateChartSolicitacao(data) {
        const inputMonthSaida = parseInt($('.input-month-solicitacao').val());
        const inputYearSaida = parseInt($('.input-year-solicitacao').val());

        if (isNaN(inputMonthSaida) || isNaN(inputYearSaida)) {
            alert('Por favor, informe um mês e ano válidos.');
            return;
        }

        this.SEU_MES = inputMonthSaida;
        this.SEU_ANO = inputYearSaida;
        this.chartAgenciaSolitacao(data);
    }

    chartAgenciaSolitacao(data) {
        const ctxSolicitacao = document.getElementById('chart-solicitacao').getContext('2d');

        if (this.myChartSolicitacao) {
            this.myChartSolicitacao.destroy();
        }

        const chartDataSolicitacao = this.generateChartDataSolicitacao(data);

        this.myChartSolicitacao = new Chart(ctxSolicitacao, {
            type: 'bar',
            data: {
                labels: chartDataSolicitacao.labels,
                datasets: [{
                    label: 'Status',
                    data: chartDataSolicitacao.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    generateChartDataSolicitacao(data) {
        const chartLabels = [];
        const chartValues = [];

        const filteredData = data.filter(item => {
            const itemDate = moment(item.DT_ATUALIZACAO_NREC, 'DD/MM/YYYY HH:mm:ss');
            return itemDate.month() + 1 === this.SEU_MES && itemDate.year() === this.SEU_ANO;
        });

        const countByStatus = {};
        filteredData.forEach(item => {
            const key = `${item.STATUS}`;
            countByStatus[key] = (countByStatus[key] || 0) + 1;
        });

        for (const key in countByStatus) {
            chartLabels.push(key);
            chartValues.push(countByStatus[key]);
        }

        return {
            labels: chartLabels,
            values: chartValues
        };
    }
    rendertableLaboratorioAgenciaIndic(data) {
        const self = this;
        $('.btn-update-chart-indicador').on('click', function () {
            self.updateChartIndic(data);
        });
        document.getElementById('printButton').addEventListener('click', () => {
            const chartIds = ['indicadoresConcentradoHemacias', 'indicadoresPlasmaFrescoCongelado', 'indicadoresConcentradoPlaquetas', 'indicadoresCrioprecipitado', 'indicadoresBolsasRecebidas'];
            Utils.printCombinedChart(chartIds);
        });
    }

    updateChartIndic(data) {
        const inputYear = parseInt($('.input-indicador-ano').val());
        if (isNaN(inputYear)) {
            alert('Por favor, informe um ano válido.');
            return;
        }
        this.SEU_ANO = inputYear;
        this.chartIndicadoresConcentradoHemacias(data);
        this.chartIndicadoresPlasmaFrescoCongelado(data);
        this.chartIndicadoresConcentradoPlaquetas(data);
        this.chartIndicadoresCrioprecipitado(data);
    }

    chartIndicadoresConcentradoHemacias(data) {
        const ctxConcentradoHemacias = document.getElementById('indicadoresConcentradoHemacias').getContext('2d');

        if (this.myChartConcentradoHemacias) {
            this.myChartConcentradoHemacias.destroy();
        }
        const bloodTypeColors = {
            'A+': 'rgba(255, 0, 0, 0.5)',
            'A-': 'rgba(255, 0, 0, 1)',
            'B+': 'rgba(0, 255, 0, 0.5)',
            'B-': 'rgba(0, 255, 0, 1)',
            'AB+': 'rgba(0, 0, 255, 0.5)',
            'AB-': 'rgba(0, 0, 255, 1)',
            'O+': 'rgba(255, 255, 0, 0.5)',
            'O-': 'rgba(255, 255, 0, 1)',
        };

        const chartDataConcentradoHemacias = this.generateChartDataConcentradoHemacias(data, bloodTypeColors);

        this.myChartConcentradoHemacias = new Chart(ctxConcentradoHemacias, {
            type: 'bar',
            data: {
                labels: chartDataConcentradoHemacias.monthlyLabels,
                datasets: chartDataConcentradoHemacias.dataSets
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Concentrado de Hemácias',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        position: 'top'
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10,
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                barPercentage: 0.8,
                categoryPercentage: 0.8
            }
        });
    }

    generateChartDataConcentradoHemacias(data, bloodTypeColors) {
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const bloodTypeTotalsByMonth = Array.from({ length: 12 }, () => ({}));
        const irradiadoTotalsByMonth = Array.from({ length: 12 }, () => ({}));

        const filteredData = data.filter(item => {
            return item.DS_DERIVADO === 'Concentrado de Hemacias' &&
                parseInt(item.DT_LIBERACAO.split('/')[2]) === this.SEU_ANO;
        });

        filteredData.forEach(item => {
            const monthIndex = parseInt(item.DT_LIBERACAO.split('/')[1]) - 1;
            const bloodType = `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`;
            const isIrradiado = item.IE_IRRADIADO === 'S';

            if (!bloodTypeTotalsByMonth[monthIndex][bloodType]) {
                bloodTypeTotalsByMonth[monthIndex][bloodType] = 1;
            } else {
                bloodTypeTotalsByMonth[monthIndex][bloodType]++;
            }

            if (isIrradiado) {
                const irradiadoLabel = `PED ${bloodType}`;
                if (!irradiadoTotalsByMonth[monthIndex][irradiadoLabel]) {
                    irradiadoTotalsByMonth[monthIndex][irradiadoLabel] = 1;
                } else {
                    irradiadoTotalsByMonth[monthIndex][irradiadoLabel]++;
                }
            }
        });

        const bloodTypeLabels = Array.from(new Set(filteredData.map(item => `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`)));

        const dataSets = [];

        bloodTypeLabels.forEach(label => {
            const irradiadoLabel = `PED ${label}`;
            const totalIrradiado = irradiadoTotalsByMonth.reduce((acc, totals) => acc + (totals[irradiadoLabel] || 0), 0);
            const totalNaoIrradiado = bloodTypeTotalsByMonth.reduce((acc, monthTotals) => acc + (monthTotals[label] || 0), 0);
            const difference = totalNaoIrradiado - totalIrradiado;

            dataSets.push({
                label: `${label} (${difference})`,
                data: bloodTypeTotalsByMonth.map((monthTotals, monthIndex) => (monthTotals[label] || 0) - (irradiadoTotalsByMonth[monthIndex][irradiadoLabel] || 0)),
                backgroundColor: bloodTypeColors[label] || 'rgba(128, 128, 128, 0.5)',
                borderColor: bloodTypeColors[label] || 'rgba(128, 128, 128, 1)',
                borderWidth: 1
            });
        });
        Object.keys(irradiadoTotalsByMonth[0]).forEach(irradiadoLabel => {
            const totalIrradiado = irradiadoTotalsByMonth.reduce((acc, totals) => acc + (totals[irradiadoLabel] || 0), 0);

            if (totalIrradiado > 0) {
                dataSets.push({
                    label: `${irradiadoLabel} (${totalIrradiado})`,
                    data: irradiadoTotalsByMonth.map(totals => totals[irradiadoLabel] || 0),
                    backgroundColor: 'rgba(72, 0, 72, 0.7)',
                    borderColor: 'rgba(60, 0, 60, 1)',
                    borderWidth: 1
                });
            }
        });

        return {
            monthlyLabels: monthNames,
            dataSets
        };
    }


    chartIndicadoresPlasmaFrescoCongelado(data) {
        const ctxPlasmaFrescoCongelado = document.getElementById('indicadoresPlasmaFrescoCongelado').getContext('2d');

        if (this.myChartPlasmaFrescoCongelado) {
            this.myChartPlasmaFrescoCongelado.destroy();
        }

        const bloodTypeColors = {
            'A+': 'rgba(255, 0, 0, 0.5)',
            'A-': 'rgba(255, 0, 0, 1)',
            'B+': 'rgba(0, 255, 0, 0.5)',
            'B-': 'rgba(0, 255, 0, 1)',
            'AB+': 'rgba(0, 0, 255, 0.5)',
            'AB-': 'rgba(0, 0, 255, 1)',
            'O+': 'rgba(255, 255, 0, 0.5)',
            'O-': 'rgba(255, 255, 0, 1)',
        };

        const chartDataPlasmaFrescoCongelado = this.generateChartDataPlasmaFrescoCongelado(data, bloodTypeColors);

        this.myChartPlasmaFrescoCongelado = new Chart(ctxPlasmaFrescoCongelado, {
            type: 'bar',
            data: {
                labels: chartDataPlasmaFrescoCongelado.monthlyLabels,
                datasets: chartDataPlasmaFrescoCongelado.dataSets
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Plasma Fresco Congelado',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        position: 'top'
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10,
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                barPercentage: 0.8,
                categoryPercentage: 0.8
            }
        });
    }


    generateChartDataPlasmaFrescoCongelado(data, bloodTypeColors) {
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const bloodTypeTotalsByMonth = Array.from({ length: 12 }, () => ({}));

        const filteredData = data.filter(item => {
            return item.DS_DERIVADO === 'Plasma Fresco Congelado' &&
                parseInt(item.DT_LIBERACAO.split('/')[2]) === this.SEU_ANO;
        });

        filteredData.forEach(item => {
            const monthIndex = parseInt(item.DT_LIBERACAO.split('/')[1]) - 1;
            const bloodType = `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`;

            if (!bloodTypeTotalsByMonth[monthIndex][bloodType]) {
                bloodTypeTotalsByMonth[monthIndex][bloodType] = 1;
            } else {
                bloodTypeTotalsByMonth[monthIndex][bloodType]++;
            }
        });

        const bloodTypeLabels = Array.from(new Set(filteredData.map(item => `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`)));

        const dataSets = bloodTypeLabels.map(label => {
            const total = bloodTypeTotalsByMonth.reduce((acc, monthTotals) => acc + (monthTotals[label] || 0), 0);
            return {
                label: `${label} (${total})`,
                data: bloodTypeTotalsByMonth.map(monthTotals => monthTotals[label] || 0),
                backgroundColor: bloodTypeColors[label] || 'rgba(128, 128, 128, 0.5)',
                borderColor: bloodTypeColors[label] || 'rgba(128, 128, 128, 1)',
                borderWidth: 1
            };
        });

        return {
            monthlyLabels: monthNames,
            dataSets
        };
    }

    chartIndicadoresConcentradoPlaquetas(data) {
        const ctxConcentradoPlaquetas = document.getElementById('indicadoresConcentradoPlaquetas').getContext('2d');

        if (this.myChartConcentradoPlaquetas) {
            this.myChartConcentradoPlaquetas.destroy();
        }

        const bloodTypeColors = {
            'A+': 'rgba(255, 0, 0, 0.5)',
            'A-': 'rgba(255, 0, 0, 1)',
            'B+': 'rgba(0, 255, 0, 0.5)',
            'B-': 'rgba(0, 255, 0, 1)',
            'AB+': 'rgba(0, 0, 255, 0.5)',
            'AB-': 'rgba(0, 0, 255, 1)',
            'O+': 'rgba(255, 255, 0, 0.5)',
            'O-': 'rgba(255, 255, 0, 1)',
        };

        const chartDataConcentradoPlaquetas = this.generateChartDataConcentradoPlaquetas(data, bloodTypeColors);

        this.myChartConcentradoPlaquetas = new Chart(ctxConcentradoPlaquetas, {
            type: 'bar',
            data: {
                labels: chartDataConcentradoPlaquetas.monthlyLabels,
                datasets: chartDataConcentradoPlaquetas.dataSets
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Concentrado de Plaquetas',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        position: 'top'
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10,
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                barPercentage: 0.8,
                categoryPercentage: 0.8
            }
        });
    }


    generateChartDataConcentradoPlaquetas(data, bloodTypeColors) {
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const bloodTypeTotalsByMonth = Array.from({ length: 12 }, () => ({}));

        const filteredData = data.filter(item => {
            return item.DS_DERIVADO === 'Concentrado de Plaquetas' &&
                parseInt(item.DT_LIBERACAO.split('/')[2]) === this.SEU_ANO;
        });

        filteredData.forEach(item => {
            const monthIndex = parseInt(item.DT_LIBERACAO.split('/')[1]) - 1;
            const bloodType = `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`;

            if (!bloodTypeTotalsByMonth[monthIndex][bloodType]) {
                bloodTypeTotalsByMonth[monthIndex][bloodType] = 1;
            } else {
                bloodTypeTotalsByMonth[monthIndex][bloodType]++;
            }
        });

        const bloodTypeLabels = Array.from(new Set(filteredData.map(item => `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`)));

        const dataSets = bloodTypeLabels.map(label => {
            const total = bloodTypeTotalsByMonth.reduce((acc, monthTotals) => acc + (monthTotals[label] || 0), 0);
            return {
                label: `${label} (${total})`,
                data: bloodTypeTotalsByMonth.map(monthTotals => monthTotals[label] || 0),
                backgroundColor: bloodTypeColors[label] || 'rgba(128, 128, 128, 0.5)',
                borderColor: bloodTypeColors[label] || 'rgba(128, 128, 128, 1)',
                borderWidth: 1
            };
        });

        return {
            monthlyLabels: monthNames,
            dataSets
        };
    }

    chartIndicadoresCrioprecipitado(data) {
        const ctxCrioprecipitado = document.getElementById('indicadoresCrioprecipitado').getContext('2d');

        if (this.myChartCrioprecipitado) {
            this.myChartCrioprecipitado.destroy();
        }

        const bloodTypeColors = {
            'A+': 'rgba(255, 0, 0, 0.5)',
            'A-': 'rgba(255, 0, 0, 1)',
            'B+': 'rgba(0, 255, 0, 0.5)',
            'B-': 'rgba(0, 255, 0, 1)',
            'AB+': 'rgba(0, 0, 255, 0.5)',
            'AB-': 'rgba(0, 0, 255, 1)',
            'O+': 'rgba(255, 255, 0, 0.5)',
            'O-': 'rgba(255, 255, 0, 1)',
        };

        const chartDataCrioprecipitado = this.generateChartDataCrioprecipitado(data, bloodTypeColors);

        this.myChartCrioprecipitado = new Chart(ctxCrioprecipitado, {
            type: 'bar',
            data: {
                labels: chartDataCrioprecipitado.monthlyLabels,
                datasets: chartDataCrioprecipitado.dataSets
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Crioprecipitado',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        position: 'top'
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10,
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                barPercentage: 0.8,
                categoryPercentage: 0.8
            }
        });
    }

    renderCatracaHenry(data) {
        const tableCatracaHenry = $('#tableCatracaHenry').DataTable({
            data: data,
            columns: [
                { data: 'CD_CODIGO_ACESSO', title: 'Codigo de acesso',
                    render: function (data) {
                        switch (data) {
                            case 0:
                                return 'Negado';
                            case 1:
                                return 'Liberado';
                            case 2:
                                return 'Controla Horario';
                            case 3:
                                return 'Controla Validade';
                            case 4:
                                return 'Controla Cartão';
                            default:
                                return 'Indefinido';
                        }
                    }
                 },
                {
                    data: 'CD_TIPO_CARTAO', title: 'Tipo de cartão',
                    render: function (data) {
                        switch (data) {
                            case 1:
                                return 'Empregado';
                            case 2:
                                return 'Terceiro';
                            case 3:
                                return 'Parceiro';
                            case 4:
                                return 'Visitante';
                            case 5:
                                return 'Provisorio';
                            default:
                                return 'Indefinido';
                        }
                    }
                },
                { data: 'CD_CARTAO', title: 'Cartão' },
                { data: 'DT_INICIO', title: 'Data de inicio' },
                { data: 'DT_FIM', title: 'Data de fim' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-atualizacao-editar-nir"  data-id="${row.id}" >Editar</button></li>
                                    <li><button class="dropdown-item btn-atualizacao-inativar-nir"  data-id="${row.id}" >Inativar</button></li>
                                    <li><button class="dropdown-item btn-atualizacao-excluir-nir"  data-id="${row.id}" >Excluir</button></li>
                                </ul>
                            </div>
                        `;
                    },
                }

            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 20,
            drawCallback: function () {

            },
            initComplete: function () {

            },
        });
    }

    renderCatracaTopdata(data){
        const tableCatracaTopdata = $('#tableCatracaTopdata').DataTable({
            data: data,
            columns: [
                {data: 'Faixa', title: 'Tipo de cartão',
                    render: function (data) {
                        switch (data) {
                            case '101':
                                return 'Empregado';
                            case '102':
                                return 'Servidor Terceiro';
                            case '103':
                                return 'Visitante';
                            case '104':
                                return 'Paciente';
                            default:
                                return 'Indefinido';
                        }
                    }
                },
                { data: 'Cartao', title: 'Numero fisico' },
                { data: 'Nome', title: 'Data de inicio' },
                { data: 'Numcracha', title: 'matricula' },
                { data: 'Dt_inicial', title: 'Data de fim' },
                { data: 'Dt_final', title: 'Data de fim' },
                {data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-atualizacao-editar-nir"  data-id="${row.id}" >Editar</button></li>
                                    <li><button class="dropdown-item btn-atualizacao-inativar-nir"  data-id="${row.id}" >Inativar</button></li>
                                    <li><button class="dropdown-item btn-atualizacao-excluir-nir"  data-id="${row.id}" >Excluir</button></li>
                                </ul>
                            </div>
                        `;
                    },
                }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 20,
            drawCallback: function () {
            },
            initComplete: function () {
            },
        });
    }

    generateChartDataCrioprecipitado(data, bloodTypeColors) {
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const bloodTypeTotalsByMonth = Array.from({ length: 12 }, () => ({}));
        const filteredData = data.filter(item => {
            return item.DS_DERIVADO === 'Crioprecipitado' &&
                parseInt(item.DT_LIBERACAO.split('/')[2]) === this.SEU_ANO;
        });

        filteredData.forEach(item => {
            const monthIndex = parseInt(item.DT_LIBERACAO.split('/')[1]) - 1;
            const bloodType = `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`;

            if (!bloodTypeTotalsByMonth[monthIndex][bloodType]) {
                bloodTypeTotalsByMonth[monthIndex][bloodType] = 1;
            } else {
                bloodTypeTotalsByMonth[monthIndex][bloodType]++;
            }
        });

        const bloodTypeLabels = Array.from(new Set(filteredData.map(item => `${item.IE_TIPO_SANGUE}${item.IE_FATOR_RH}`)));

        const dataSets = bloodTypeLabels.map(label => {
            const total = bloodTypeTotalsByMonth.reduce((acc, monthTotals) => acc + (monthTotals[label] || 0), 0);
            return {
                label: `${label} (${total})`,
                data: bloodTypeTotalsByMonth.map(monthTotals => monthTotals[label] || 0),
                backgroundColor: bloodTypeColors[label] || 'rgba(128, 128, 128, 0.5)',
                borderColor: bloodTypeColors[label] || 'rgba(128, 128, 128, 1)',
                borderWidth: 1
            };
        });
        return {
            monthlyLabels: monthNames,
            dataSets
        };
    }


    rendertableNirEletivas(data) {
        const filteredData = data.filter(row => row.ds_realizado !== 'S' && row.ds_inativado !== 'I');
        const tableNirEletivas = $('#tableNirEletivas').DataTable({
            data: filteredData,
            columns: [
                {
                    data: 'nm_paciente', title: 'Nome do paciente',
                    render: function (data, type, row) {
                        return `
                        <div class="arquivo-cell">
                            <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-nir-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                            ${data}
                        </div>
                        `;
                    },
                },
                { data: 'dt_nascimento', title: 'Data de nascimento' },
                { data: 'ds_municipio', title: 'Municipio' },
                { data: 'ds_procedimento', title: 'Procedimento' },
                { data: 'cd_protocolo', title: 'Código do protocolo' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-atualizacao-editar-nir"  data-id="${row.id}" >Editar</button></li>
                                    <li><button class="dropdown-item btn-atualizacao-inativar-nir"  data-id="${row.id}" >Inativar</button></li>
                                    <li><button class="dropdown-item btn-atualizacao-excluir-nir"  data-id="${row.id}" >Excluir</button></li>
                                </ul>
                            </div>
                        `;
                    },
                }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 20,
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('#tableNirEletivas').on('click', '.btn-visualizar', (event) => {
                    const nirId = $(event.currentTarget).data('id');
                    const rowIndex = tableNirEletivas.row($(event.currentTarget).closest('tr')).index();
                    const row = tableNirEletivas.rows(rowIndex).data()[0];
                    const detalhesTr = $(`tr.detalhes-nir[data-nir-id="${nirId}"]`);
                    if (detalhesTr.length) {
                        detalhesTr.remove();
                    } else {
                        const observacao = Utils.replaceImgWithButton(row.ds_observacao);
                        const novaDetalhesTr = `<tr class="detalhes-nir" data-nir-id="${nirId}">
                            <th colspan="8">Detalhes</th>
                        </tr>
                        <tr class="detalhes-nir" data-nir-id="${nirId}">
                            <td colspan="8">
                                <table class="table">
                                    <tr>
                                        <th>Procedimento</th>
                                        <td>${row.cd_procedimento || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Senha AIH</th>
                                        <td>${row.cd_senha_aih || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Data da AIH</th>
                                        <td>${row.dt_aih || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Número do Prontuário</th>
                                        <td>${row.nr_prontuario || 'Não especificado'}</td>
                                    </tr>
                                    <tr>
                                        <th>Observação e anexos</th>
                                        <td>${observacao || 'Não especificado'}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>`;
                        const currentRow = $(event.currentTarget).closest('tr');
                        currentRow.after(novaDetalhesTr);
                        this.setupImageButtons('.detalhes-nir');
                    }
                });
            },
            initComplete: function () {

            },
        });


        this.rendertableRealizadasNir(data);
    }


    rendertableRealizadasNir(data) {
        const filteredData = data.filter(row => row.ds_realizado === 'S' && row.ds_inativado !== 'I');
        const tableRealizadasNir = $('#tableRealizadasNir').DataTable({
            data: filteredData,
            columns: [
                {
                    data: 'dt_medico_exec', title: 'Data da realização',
                    render: function (data, type, row) {
                        return Utils.formatarDataNir(row.dt_medico_exec);
                    }
                },
                {
                    data: 'nm_paciente', title: 'Nome do paciente',
                    render: function (data, type, row) {
                        return `
                        <div class="arquivo-cell">
                            <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-nir-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                            ${data}
                        </div>
                        `;
                    },
                },
                { data: 'ds_municipio', title: 'Municipio' },
                { data: 'cd_protocolo', title: 'Protocolo' },
                { data: 'cd_procedimento', title: 'Código do procedimento' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-realizadas-nir"  data-id="${row.id}" >Editar</button></li>
                                </ul>
                            </div>
                        `;
                    },
                }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 20,
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
            },
            initComplete: function () {

            },
        });
        $('#tableRealizadasNir').on('click', '.btn-visualizar', function () {
            const nirId = $(this).data('nir-id');
            const rowIndex = tableRealizadasNir.row($(this).closest('tr')).index();
            const row = tableRealizadasNir.rows(rowIndex).data()[0];
            const detalhesTr = $(`tr.detalhes-nir[data-nir-id="${nirId}"]`);
            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const novaDetalhesTr = `<tr class="detalhes-nir" data-nir-id="${nirId}">
                                            <th colspan="8">Detalhes</th>
                                                </tr>
                                                <tr class="detalhes-nir" data-nir-id="${nirId}">
                                                <td colspan="8">
                                                <table class="table">
                                                    <tr> 
                                                        <th>Procedimento</th>
                                                        <td>${row.ds_procedimento || 'Não especificado'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Senha AIH</th>
                                                        <td>${row.cd_senha_aih || 'Não especificado'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Data da AIH</th>
                                                        <td>${row.dt_aih || 'Não especificado'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Número do Prontuário</th>
                                                        <td>${row.nr_prontuario || 'Não especificado'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Médico executor</th>
                                                        <td>${row.ds_medico_exec || 'Não especificado'}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>`;
                const currentRow = $(this).closest('tr');
                currentRow.after(novaDetalhesTr);
            }
        });
        this.rendertableNirInativas(data);
        this.filtrarChartRealizadas(data);
        this.renderChartRealizadas(data);

    }

    filtrarChartRealizadas(data) {
        const btnCriarGraficos = document.querySelector('.btn-update-chart-nir-realizada');
        btnCriarGraficos.addEventListener('click', () => {
            const dataInicioInput = document.querySelector('.input-realizada-nir-anoMesInicio').value;
            const dataFimInput = document.querySelector('.input-realizada-nir-anoMesFim').value;
            const dataInicio = this.convertStringToDate(dataInicioInput);
            const dataFim = this.convertStringToDate(dataFimInput);
            const dataFiltrado = data.filter(item => {
                const dt_medico_exe = new Date(item.dt_medico_exe);
                return dt_medico_exe >= dataInicio && dt_medico_exe <= dataFim && item.ds_realizado === 'S';
            });

            this.renderChartRealizadas(dataFiltrado);
        });
    }

    convertStringToDate(dateString) {
        const parts = dateString.split('/');
        const month = parseInt(parts[0], 10) - 1;
        const year = parseInt(parts[1], 10);
        return new Date(year, month);
    }

    renderChartRealizadas(dataFiltrado) {
        const ctx = document.getElementById('chartRealizadas');
        if (!ctx) {
            console.error("Elemento 'chartRealizadas' não encontrado.");
            return;
        }

        const procedimentosPorMes = Array.from({ length: 12 }, () => 0);
        dataFiltrado.forEach(item => {
            const date = new Date(item.dt_medico_exe);
            const mes = date.getMonth();
            procedimentosPorMes[mes]++;
        });

        const procedimentosPorAno = Array.from({ length: new Date().getFullYear() - 2000 }, () => 0);
        dataFiltrado.forEach(item => {
            const date = new Date(item.dt_medico_exe);
            const ano = date.getFullYear();
            if (!procedimentosPorAno[ano]) {
                procedimentosPorAno[ano] = 0;
            }
            procedimentosPorAno[ano]++;
        });

        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        this.graficoDinamico('chartRealizadas', 'bar', 'Realizadas', [{
            label: procedimentosPorAno,
            data: procedimentosPorMes
        }], "modalChartNir", "dataSelect");
    }
    graficoDinamico(idChart, type, label, datasets, idModal, dataSelecionada) {
        const ctx = document.getElementById(idChart);

        if (!ctx) {
            console.error(`Elemento '${idChart}' não encontrado.`);
            return null;
        }

        const chart = new Chart(ctx, {
            type: type,
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: datasets.map((dataset) => ({
                    label: dataset.label,
                    data: dataset.data,
                    backgroundColor: Utils.generateRandomColor(),
                    borderColor: Utils.generateRandomColor(),
                    borderWidth: 1
                }))
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        ctx.onclick = function (event) {
            const modal = document.getElementById(idModal);
            const bounds = ctx.getBoundingClientRect();
            const offsetX = event.clientX - bounds.left;
            const offsetY = event.clientY - bounds.top;

            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                meta.data.forEach((element, index) => {
                    if (element.inRange(offsetX, offsetY)) {
                        const monthClicked = index + 1;
                        const yearClicked = datasetIndex.label;
                        const selectedDate = `${monthClicked}/${yearClicked + 1}`;
                        document.getElementById(dataSelecionada).value = selectedDate;
                        if (typeof $(modal).modal === 'function') {
                            $(modal).modal('show');
                        } else {
                            modal.style.display = "block";
                        }
                    }
                });
            });
        };

        return chart;
    }




    rendertableNirInativas(data) {
        const filteredData = data.filter(row => row.ds_inativado == 'I');
        const tableNirInativas = $('#tableNirInativas').DataTable({
            data: filteredData,
            columns: [
                {
                    data: 'nm_paciente', title: 'Nome do paciente',
                    render: function (data, type, row) {
                        return `
                        <div class="arquivo-cell">
                            <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-nir-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                            ${data}
                        </div>
                        `;
                    },
                },
                { data: 'dt_nascimento', title: 'Data de nascimento' },
                { data: 'ds_municipio', title: 'Municipio' },
                { data: 'cd_protocolo', title: 'Protocolo' },
                { data: 'cd_procedimento', title: 'Código do procedimento' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-ativar-nir"  data-id="${row.id}" >Ativar</button></li>
                                </ul>
                            </div>
                        `;
                    },
                }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 20,
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
            },
            initComplete: function () {
            },
        });

        $('#tableNirInativas').on('click', '.btn-visualizar', function () {
            const nirId = $(this).data('nir-id');
            const rowIndex = tableNirInativas.row($(this).closest('tr')).index();
            const row = tableNirInativas.rows(rowIndex).data()[0];
            const detalhesTr = $(`tr.detalhes-nir[data-nir-id="${nirId}"]`);
            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const novaDetalhesTr = `<tr class="detalhes-nir" data-nir-id="${nirId}">
                            <th colspan="8">Detalhes</th>
                        </tr>
                        <tr class="detalhes-nir" data-nir-id="${nirId}">
                        <td colspan="8">
                        <table class="table">
                            <tr> 
                                <th>Procedimento</th>
                                <td>${row.ds_procedimento || 'Não especificado'}</td>
                            </tr>
                            <tr>
                                <th>Senha AIH</th>
                                <td>${row.cd_senha_aih || 'Não especificado'}</td>
                            </tr>
                            <tr>
                                <th>Data da AIH</th>
                                <td>${row.dt_aih || 'Não especificado'}</td>
                            </tr>
                            <tr>
                                <th>Número do Prontuário</th>
                                <td>${row.nr_prontuario || 'Não especificado'}</td>
                            </tr>
                            <tr>
                                <th>Médico executor</th>
                                <td>${row.ds_medico_exec || 'Não especificado'}</td>
                            </tr>
                        </table>
                    </td>
                        </tr>`;
                const currentRow = $(this).closest('tr');
                currentRow.after(novaDetalhesTr);
            }
        });
    }

    tabler034fun(data) {
        const filteredData = data
        const tabler034fun = $('#tabler034fun').DataTable({
            data: filteredData,
            columns: [
                { data: 'numcad', title: 'Cadastro' },
                { data: 'nomfun', title: 'Funcionário' },
                {
                    data: 'datnas', title: 'Data Nascimento',
                    render: function (data, type, row) {
                        let datnas = Utils.formatarData(row.datnas);
                        return `${datnas}`;
                    }
                },
                {
                    data: 'datadm', title: 'Data Admissão',
                    render: function (data, type, row) {
                        let datadm = Utils.formatarData(row.datadm);
                        return `${datadm}`;
                    }
                },
                { data: 'numcra', title: 'Crachá' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-editar-acesso"  data-id="${row.id}" >Editar</button></li>
                                </ul>
                            </div>
                        `;
                    },
                }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 20,
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
            },
            initComplete: function () {
            },
        });
    }

    renderTableArquivo(data) {
        $(document).on('input', () => {
            const nomepacVal = $("#nomepac").val();
            const codpacVal = $("#codpac").val();
            const shouldDisable = (value) => value !== '';
            $("#nomepac, #codpac").attr('disabled', false);
            if (shouldDisable(nomepacVal)) {
                $("#codpac").attr('disabled', true);
            } else if (shouldDisable(codpacVal)) {
                $("#nomepac").attr('disabled', true);
            }
        });
        const tableArquivo = $('#tableArquivo').DataTable({
            data: data,
            columns: [
                {
                    data: 'numatend', title: 'Atendimento',
                    render: function (data, type, row) {
                        return `
                        <div class="arquivo-cell">
                        <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-arquivo-id="${row.numatend}"><i class="ni ni-fat-add"></i></button>
                         ${data}
                        </div>
                    `;
                    },
                },
                {
                    data: 'censo', title: 'Censo',
                    render: function (data, type, row) {
                        if (row.censo == "S") {
                            return `Sim`;
                        } else {
                            return `Não`;
                        }
                    }
                },
                { data: 'nomepac', title: 'Nome do paciênce' },
                { data: 'tipoatend', title: 'Tipo de atendimento' },
                { data: 'nomeserv', title: 'Serviço' },
                { data: 'desprocgen', title: 'Procedimento' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-evo-enfermagem"  data-id="${row.numatend}" >Evolução de enfermagem</button></li>
                                    <li><button class="dropdown-item btn-evo-medica" data-id="${row.numatend}" >Evolução médica</button></li>
                                </ul>
                            </div>
                        `;
                    },
                },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 20,
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        $('#tableArquivo').on('click', '.btn-visualizar', function () {

            const arquivoId = $(this).data('arquivo-id');

            const rowIndex = tableArquivo.row($(this).closest('tr')).index();
            const row = tableArquivo.rows(rowIndex).data()[0];
            const detalhesTr = $(`tr.detalhes-arquivo[data-arquivo-id="${arquivoId}"]`);

            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const novaDetalhesTr = `<tr class="detalhes-arquivo" data-arquivo-id="${arquivoId}">
                            <th colspan="8">Detalhes</th>
                        </tr>
                        <tr class="detalhes-arquivo" data-arquivo-id="${arquivoId}">
                            <td colspan="8">
                                <table class="table">
                                ${row.codpac ? `<tr><th>Prontuario:</th><td>${row.codpac}</td></tr>` : ''}
                                ${row.nomemae ? `<tr><th>Nome da Mãe:</th><td>${row.nomemae}</td></tr>` : ''}
                                ${row.nomepai ? `<tr><th>Nome do Pai:</th><td>${row.nomepai}</td></tr>` : ''}
                                ${row.cpfpac ? `<tr><th>CPF:</th><td>${row.cpfpac}</td></tr>` : ''}
                                ${row.rgpac ? `<tr><th>RG:</th><td>${row.rgpac}</td></tr>` : ''}
                                ${row.datanasc ? `<tr><th>Data de Nascimento:</th><td>${Utils.formatarData(row.datanasc)}</td></tr>` : ''}
                                ${row.sexo ? `<tr><th>Sexo:</th><td>${row.sexo === 'F' ? 'Feminino' : (row.sexo === 'M' ? 'Masculino' : '')}</td></tr>` : ''}
                                ${row.cartaosus ? `<tr><th>Cartão SUS:</th><td>${row.cartaosus}</td></tr>` : ''}
                                ${row.ceppac ? `<tr><th>CEP:</th><td>${row.ceppac}</td></tr>` : ''}
                                ${row.complemen ? `<tr><th>Complemento:</th><td>${row.complemen}</td></tr>` : ''}
                                ${row.tipologr && row.logradouro ? `<tr><th>Logradouro:</th><td>${row.tipologr + ' ' + row.logradouro}</td></tr>` : ''}
                                ${row.foneresid ? `<tr><th>Telefone:</th><td>${row.foneresid}</td></tr>` : ''}
                                </table>
                            </td>
                        </tr>`;
                const currentRow = $(this).closest('tr');
                currentRow.after(novaDetalhesTr);
            }
        });
    }

    tableResultado(buttons) {
        let selectedItems = [];
        const initializeDataTable = () => {
            const value = buttons.getAttribute("data-id");
            $("#resultado").attr('disabled', true);
            const tableResultado = $('#tableResultado').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "../services/api/arquivo-resultado.php",
                    "data": { "search": { "value": value } }
                },
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json"
                },
                "pageLength": 25,
                columns: [
                    {
                        data: 'select',
                        title: '<input type="checkbox" id="selectAllCheckboxResultado">',
                        render: function (data) {
                            return '<input type="checkbox" ' + (data ? 'checked' : '') + '>';
                        },
                    },
                    { data: 'numitem', title: 'N.sequência' },
                    {
                        data: 'dataimpre', title: 'Data gravada',
                        render: function (data, type, row) {
                            let datagrav = Utils.formatarDataHora(row.dataimpre);
                            return `${datagrav}`;
                        }
                    },
                    {
                        data: 'liberado', title: 'Liberado',
                        render: function (data, type, row) {
                            if (row.cancelada === "N") {
                                return `Não`;
                            } else {
                                return `Sim`;
                            }
                        }
                    }
                ],
            });

            $('#modalResultado').on('hidden.bs.modal', function () {
                tableResultado.destroy();
            });
            tableResultado.settings()[0].oFeatures.bServerSide = false;
            tableResultado.ajax = null;
            tableResultado.draw();
            return tableResultado;
        };
        const tableResultado = initializeDataTable();
        $('#tableResultado').on('click', '#selectAllCheckboxResultado', function () {
            const isChecked = $(this).prop('checked');
            $('input[type="checkbox"]', tableResultado.rows().nodes()).prop('checked', isChecked);

            selectedItems = isChecked ? tableResultado.rows().data().toArray() : [];
            if (isChecked) {
                $("#resultado").attr("disabled", false);
            } else {
                $("#resultado").attr("disabled", true);
            }
            tableResultado.draw();
        });
        $('#tableResultado tbody').on('change', 'input[type="checkbox"]', function () {
            const rowData = tableResultado.row($(this).closest('tr')).data();
            rowData.select = $(this).prop('checked');
            if (rowData.select) {
                selectedItems.push(rowData);
                $("#resultado").attr("disabled", false);
            } else {
                selectedItems = selectedItems.filter(item => item.numitem !== rowData.numitem);
                $("#resultado").attr("disabled", true);
            }
            $("#resultado").prop('disabled', selectedItems.length === 0);
        });
        this.getSelectedArquivo = function () {
            return selectedItems;
        };
        return this.getSelectedArquivo;
    }



    evolucaoEnf(buttons) {
        let selectedItems = [];
        const initializeDataTable = () => {
            const value = buttons.getAttribute("data-id");
            $("#evoEnfermagem").attr('disabled', true);
            const table = $('#tableEnfermagem').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "../services/api/arquivo-evo-enfermagem.php",
                    "data": { "search": { "value": value } }
                },
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json"
                },
                "pageLength": 25,
                columns: [
                    {
                        data: 'select',
                        title: '<input type="checkbox" id="selectAllCheckboxEnfermagem">',
                        render: function (data) {
                            return '<input type="checkbox" ' + (data ? 'checked' : '') + '>';
                        },
                    },
                    { data: 'numseq', title: 'N.sequência' },
                    {
                        data: 'datagrav', title: 'Data gravada',
                        render: function (data, type, row) {
                            let datagrav = Utils.formatarData(row.datagrav);
                            return `${datagrav}`;
                        }
                    },
                    {
                        data: 'cancelada', title: 'Cancelada',
                        render: function (data, type, row) {
                            if (row.cancelada === "N") {
                                return `Não`;
                            } else {
                                return `Sim`;
                            }
                        }
                    }
                ],
            });

            $('#modalEnfermagem').on('hidden.bs.modal', function () {
                table.destroy();
            });

            table.settings()[0].oFeatures.bServerSide = false;
            table.ajax = null;
            table.draw();

            return table;
        };

        const tableEnfermagem = initializeDataTable();

        $('#tableEnfermagem').on('click', '#selectAllCheckboxEnfermagem', function () {
            const isChecked = $(this).prop('checked');
            $('input[type="checkbox"]', tableEnfermagem.rows().nodes()).prop('checked', isChecked);

            selectedItems = isChecked ? tableEnfermagem.rows().data().toArray() : [];
            console.log(selectedItems);

            if (isChecked) {
                $("#evoEnfermagem").attr('disabled', false);
            } else {
                $("#evoEnfermagem").attr('disabled', true);
            }

            tableEnfermagem.draw();
        });

        $('#tableEnfermagem tbody').on('change', 'input[type="checkbox"]', function () {
            const rowData = tableEnfermagem.row($(this).closest('tr')).data();
            rowData.select = $(this).prop('checked');

            if (rowData.select) {
                selectedItems.push(rowData);
            } else {
                selectedItems = selectedItems.filter(item => item.numatend !== rowData.numatend);
            }
            $("#evoEnfermagem").prop('disabled', selectedItems.length === 0);
            console.log(selectedItems);
        });

        this.getSelectedArquivo = function () {
            return selectedItems;
        };
        return this.getSelectedArquivo;
    }

    evolucaoMed(buttons) {
        let selectedItems = [];

        const initializeDataTable = () => {
            const value = buttons.getAttribute("data-id");
            $("#evoMedica").attr('disabled', true);
            const table = $('#tableMedica').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "../services/api/arquivo-evo-medica.php",
                    "data": { "search": { "value": value } }
                },
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json"
                },
                "pageLength": 25,
                columns: [
                    {
                        data: 'select',
                        title: '<input type="checkbox" id="selectAllCheckboxMedica">',
                        render: function (data) {
                            return '<input type="checkbox" ' + (data ? 'checked' : '') + '>';
                        },
                    },
                    { data: 'numseq', title: 'N.sequência' },
                    {
                        data: 'datagrav', title: 'Data gravada',
                        render: function (data, type, row) {
                            let datagrav = Utils.formatarData(row.datagrav);
                            return `${datagrav}`;
                        }
                    },
                    {
                        data: 'cancelada', title: 'Cancelada',
                        render: function (data, type, row) {
                            if (row.cancelada === "N") {
                                return `Não`;
                            } else {
                                return `Sim`;
                            }
                        }
                    }
                ],
            });

            $('#modalMedica').on('hidden.bs.modal', function () {
                table.destroy();
            });
            table.settings()[0].oFeatures.bServerSide = false;
            table.ajax = null;
            table.draw();
            return table;
        };

        const tableMedica = initializeDataTable();

        $('#tableMedica').on('click', '#selectAllCheckboxMedica', function () {
            const isChecked = $(this).prop('checked');
            $('input[type="checkbox"]', tableMedica.rows().nodes()).prop('checked', isChecked);

            selectedItems = isChecked ? tableMedica.rows().data().toArray() : [];
            console.log(selectedItems);

            if (isChecked) {
                $("#evoMedica").attr('disabled', false);
            } else {
                $("#evoMedica").attr('disabled', true);
            }

            tableMedica.draw();
        });

        $('#tableMedica tbody').on('change', 'input[type="checkbox"]', function () {
            const rowData = tableMedica.row($(this).closest('tr')).data();
            rowData.select = $(this).prop('checked');

            if (rowData.select) {
                selectedItems.push(rowData);
            } else {
                selectedItems = selectedItems.filter(item => item.numatend !== rowData.numatend);
            }
            $("#evoMedica").prop('disabled', selectedItems.length === 0);
            console.log(selectedItems);
        });

        this.getSelectedArquivo = function () {
            return selectedItems;
        };
        return this.getSelectedArquivo;
    }

    renderEvoEnfPdf(data) {
        if (data) {
            const content = document.getElementById("evoEnfModalPdf");
            $('#evoEnfermagemPdf').on('hidden.bs.modal', function () {
                $('#evoEnfModalPdf').empty();
            });
            const promises = data.map(patientData => {
                const patientInfo = document.createElement("div");
                patientInfo.innerHTML = `
                <div class="container-fluid" id="printer">
                    <div class="row">
                        <div class="col-12">
                            <div class="card" style="width: 100%;">
                                <img class="card-img-top" src="../assets/img/logo.png" alt="Logo">
                                <div class="card-body">
                                    <div class="row mb-3">
                                        <div class="col-5">
                                            <p class="card-text"><b>Nome do paciênte:</b> ${patientData.nomepac}</p>
                                        </div>
                                        <div class="col-4">
                                            <p class="card-text"><b>Nome da mãe:</b> ${patientData.nomemae || 'N/A'}</p>
                                        </div>
                                        <div class="col-3">
                                        <p class="card-text"><strong>Estado civil:</strong> ${patientData.estadociv === 'S' ? 'Solteiro' : patientData.estadociv === 'C' ? 'Casado' : 'Desconhecido'}</p>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3">
                                            <p class="card-text"><b>Número de prescrição:</b> ${patientData.codpac}</p>
                                        </div>
                                        <div class="col-3">
                                            <p class="card-text"><strong>Cartão sus:</strong> ${patientData.cartaosus}</p>
                                        </div>
                                        <div class="col-3">
                                            <p class="card-text"><b>Data de nascimento:</b> ${Utils.formatarData(patientData.datanasc) || 'N/A'}</p>
                                        </div>
                                        <div class="col-3">
                                        <p class="card-text"><strong>Sexo:</strong> ${patientData.sexo === 'F' ? 'Feminino' : patientData.sexo === 'M' ? 'Masculino' : 'Desconhecido'}</p>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3">
                                            <p class="card-text"><strong>Data de atendimento:</strong> ${Utils.formatarDataHora(patientData.datatend)}</p>
                                        </div>
                                        <div class="col-3">
                                            <p class="card-text"><strong>Cancelada:</strong> ${patientData.cancelada === 'N' ? 'Não' : patientData.cancelada === 'S' ? patientData.moticancel : 'Desconhecido'}</p>
                                        </div>
                                        <div class="col-6">
                                            <p class="card-text"><b>Precedimento:</b> ${patientData.desprocgen || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <span class="border border-dark border-bottom"></span>
                                    </div>
                                    <div class="row">
                                        <div class="row mb-12">
                                            <h5 class="h5 text-center">Evolução de Enfermagem</h5>
                                            <div class="corpotexto"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                content.appendChild(patientInfo);
                return Utils.convertRTFArrayToHTML(patientData.corpotexto).then(htmlResult => {
                    patientInfo.querySelector('.corpotexto').innerHTML = htmlResult;
                }).catch(error => {
                    console.error(error);
                });
            });
            Promise.all(promises).then(() => {
            }).catch(error => {
                console.error("Erro durante a resolução das promessas", error);
            });
        }

        let buttonEnf = document.getElementById('imprimirEnf');
        if (buttonEnf) {
            $(buttonEnf).off('click');
            $(buttonEnf).on('click', () => {
                $("#loadingOverlay").show();
                const payload = { data: data };
                fetch('../services/relatorio/pdf/gerar_pdf.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }).then(response => {
                    $("#loadingOverlay").hide();
                    $('input[type="checkbox"]').prop('checked', false);
                    if (!response.ok) {
                        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
                    }
                    return response.blob();
                }).then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    window.open(url, '_blank');
                }).catch(error => {
                    console.error('Erro durante a requisição AJAX:', error);
                });
            });
        }
    }

    renderEvoMedPdf(data) {

        if (data) {
            const content = document.getElementById("evoMedModalPdf");
            $('#evoMedicaPdf').on('hidden.bs.modal', function () {
                $('#evoMedModalPdf').empty();
                $('input[type="checkbox"]').prop('checked', false);
            });
            const promises = data.map(patientData => {
                const patientInfo = document.createElement("div");
                patientInfo.innerHTML = `
                <div class="container-fluid" id="printer">
                    <div class="row">
                        <div class="col-12">
                            <div class="card" style="width: 100%;">
                                <img class="card-img-top" src="../assets/img/logo.png" alt="Logo">
                                <div class="card-body">
                                    <div class="row mb-3">
                                        <div class="col-5">
                                            <p class="card-text"><b>Nome do paciênte:</b> ${patientData.nomepac}</p>
                                        </div>
                                        <div class="col-4">
                                            <p class="card-text"><b>Nome da mãe:</b> ${patientData.nomemae || 'N/A'}</p>
                                        </div>
                                        <div class="col-3">
                                        <p class="card-text"><strong>Estado civil:</strong> ${patientData.estadociv === 'S' ? 'Solteiro' : patientData.estadociv === 'C' ? 'Casado' : 'Desconhecido'}</p>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3">
                                            <p class="card-text"><b>Número de prescrição:</b> ${patientData.codpac}</p>
                                        </div>
                                        <div class="col-3">
                                            <p class="card-text"><strong>Cartão sus:</strong> ${patientData.cartaosus}</p>
                                        </div>
                                        <div class="col-3">
                                            <p class="card-text"><b>Data de nascimento:</b> ${Utils.formatarData(patientData.datanasc) || 'N/A'}</p>
                                        </div>
                                        <div class="col-3">
                                        <p class="card-text"><strong>Sexo:</strong> ${patientData.sexo === 'F' ? 'Feminino' : patientData.sexo === 'M' ? 'Masculino' : 'Desconhecido'}</p>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-3">
                                            <p class="card-text"><strong>Data de atendimento:</strong> ${Utils.formatarDataHora(patientData.datatend)}</p>
                                        </div>
                                        <div class="col-3">
                                            <p class="card-text"><strong>Cancelada:</strong> ${patientData.cancelada === 'N' ? 'Não' : patientData.cancelada === 'S' ? patientData.moticancel : 'Desconhecido'}</p>
                                        </div>
                                        <div class="col-6">
                                            <p class="card-text"><b>Precedimento:</b> ${patientData.desprocgen || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <span class="border border-dark border-bottom"></span>
                                    </div>
                                    <div class="row">
                                        <div class="row mb-12">
                                            <h5 class="h5 text-center">Evolução de Médica</h5>
                                            <div class="corpotexto"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                content.appendChild(patientInfo);
                return Utils.convertRTFArrayToHTML(patientData.corpotexto)
                    .then(htmlResult => {
                        patientInfo.querySelector('.corpotexto').innerHTML = htmlResult;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
            Promise.all(promises)
                .then(() => {
                })
                .catch(error => {
                    console.error("Erro durante a resolução das promessas", error);
                });
        }
        let buttonEnf = document.getElementById('imprimirMed');
        if (buttonEnf) {
            $(buttonEnf).off('click');
            $(buttonEnf).on('click', () => {
                $("#loadingOverlay").show();
                const payload = { data: data };
                fetch('../services/relatorio/pdf/gerar_pdf_medica.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                    .then(response => {
                        $("#loadingOverlay").hide();
                        $('input[type="checkbox"]').prop('checked', false);
                        if (!response.ok) {
                            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        window.open(url, '_blank');
                    })
                    .catch(error => {
                        console.error('Erro durante a requisição AJAX:', error);
                    });
            });
        }
    }

    labResultPdf(data) {
        if (data) {
            const content = document.getElementById("labResultadoPdf");
            $('#resultadoPdf').on('hidden.bs.modal', function () {
                $('#labResultadoPdf').empty();
                $('input[type="checkbox"]').prop('checked', false);
            });
            console.log(data);
            const promises = data.map(patientData => {
                const patientInfo = document.createElement("div");
                patientInfo.innerHTML = `
                <div class="container-fluid" id="printer">
                    <div class="row">
                        <div class="col-12">
                            <div class="card" style="width: 100%;">
                            <img class="card-img-top" src="../assets/img/logo.png" alt="Logo">
                            <div class="card-body">
                                <div class="row mb-3">
                                    <div class="col-8">
                                        <p class="card-text"><b>Nome do paciênte:</b> ${patientData.nomepac}</p>
                                    </div>
                                    <div class="col-3">
                                    <p class="card-text"><strong>Sexo:</strong> ${patientData.sexo === 'F' ? 'Feminino' : patientData.sexo === 'M' ? 'Masculino' : 'Desconhecido'}</p>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-3">
                                        <p class="card-text"><b>Número de prescrição:</b> ${patientData.numreqserv}</p>
                                    </div>
                                    <div class="col-3">
                                        <p class="card-text"><strong>Assinada eletrônicamente:</strong> ${patientData.assinaelet === 'S' ? 'Sim' : patientData.assinaelet === 'N' ? 'Não' : 'Desconhecido'}</p>
                                    </div>
                                    <div class="col-3">
                                        <p class="card-text"><b>Assinada por:</b> ${patientData.nomeprest}</p>
                                    </div>
                                    <div class="col-3">
                                    <p class="card-text"><strong>Liberado:</strong> ${patientData.liberado === 'S' ? 'Sim' : patientData.liberado === 'N' ? 'Não' : 'Desconhecido'}</p>
                                    </div>
                                <div class="row mb-3">
                                    <div class="col-3">
                                    <p class="card-text"><strong>Data da liberação:</strong> ${Utils.formatarDataHora(patientData.datalib)}</p>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <span class="border border-dark border-bottom"></span>
                                </div>
                                <div class="row">
                                    <div class="row mb-12">
                                        <h5 class="h5 text-center">Resultado laboratorial</h5>
                                        <div class="corpotexto"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                content.appendChild(patientInfo);
                return Utils.convertRTFArrayToHTML(patientData.textresult)
                    .then(htmlResult => {
                        patientInfo.querySelector('.corpotexto').innerHTML = htmlResult;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
            Promise.all(promises)
                .then(() => {
                })
                .catch(error => {
                    console.error("Erro durante a resolução das promessas", error);
                });
        }
        let buttonEnf = document.getElementById('imprimirResultado');
        if (buttonEnf) {
            $(buttonEnf).off('click');
            $(buttonEnf).on('click', () => {
                $("#loadingOverlayLab").show();
                const payload = { data: data };
                fetch('../services/relatorio/pdf/gerar_pdf_relatorio.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                    .then(response => {
                        $("#loadingOverlayLab").hide();
                        $('input[type="checkbox"]').prop('checked', false);
                        if (!response.ok) {
                            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        window.open(url, '_blank');
                    })
                    .catch(error => {
                        console.error('Erro durante a requisição AJAX:', error);
                    });
            });
        }
    }

    addScript(url) {
        var script = document.createElement('script');
        script.type = 'application/javascript';
        script.src = url;
        document.head.appendChild(script);
    }

    renderWeather(data) {
        this.weatherDiv.innerHTML = '';

        const imgFileName = `${data.results.img_id}.png`;
        const imgURL = `https://assets.hgbrasil.com/weather/images/${imgFileName}`;

        const weatherImg = document.createElement('img');
        weatherImg.className = "img_weather";
        weatherImg.src = imgURL;
        this.weatherDiv.appendChild(weatherImg);

        const temperatureParagraph = document.createElement('p');
        temperatureParagraph.classList.add('temperature');
        temperatureParagraph.textContent = `${data.results.temp}°C`;
        this.weatherDiv.appendChild(temperatureParagraph);

        const conditionParagraph = document.createElement('p');
        conditionParagraph.classList.add('condition');
        conditionParagraph.textContent = `${data.results.description}`;
        this.weatherDiv.appendChild(conditionParagraph);

        const dateParagraph = document.createElement('p');
        dateParagraph.classList.add('date-time');
        dateParagraph.textContent = `Utima atualização: ${data.results.date}, Hora: ${data.results.time}`;
        this.weatherDiv.appendChild(dateParagraph);

        const tomorrowForecast = data.results.forecast[1];
        const tomorrowForecastParagraph = document.createElement('p');
        tomorrowForecastParagraph.classList.add('forecast');
        tomorrowForecastParagraph.textContent = `Previsão para amanhã (${tomorrowForecast.date}): Máxima: ${tomorrowForecast.max}°C, Mínima: ${tomorrowForecast.min}°C, Condição: ${tomorrowForecast.description}`;
        this.weatherDiv.appendChild(tomorrowForecastParagraph);
    }

    renderChart(chartData) {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        const ctx = this.chartCanvas.getContext('2d');
        this.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
        });

    }

    renderApiIndicadores(data) {
        for (let i = 1; i <= 100; i++) {
            this.renderGraficos(data, i, `tableAnalise${i === 1 ? '' : i}`, `planoAcaoResult${i === 1 ? '' : i}`);
        }
    }

    renderGraficos(data, indicadorId, tableId, resultTableId) {
        const filteredData = data.filter(row => row.nm_indicador == indicadorId);
        const tableAnalise = $(`#${tableId}`).DataTable({
            data: filteredData,
            columns: [
                {
                    data: 'dt_indicador', title: 'Data', width: '20px',
                    render: function (data, type, row) {
                        const dataFormatada = Utils.formatoAnoMes(data);
                        return `
                            <div class="arquivo-cell">
                                <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-id="${row.nr_atendimento}"><i class="ni ni-fat-add"></i></button>
                                ${dataFormatada}
                            </div>`;
                    },
                    ordering: true
                },
                {
                    data: 'analise_indicador', title: 'Análise', width: '300px',
                    render: function (data, type, row) {
                        let removeImages = Utils.removeImages(data);
                        removeImages.length > 100 ? removeImages = removeImages.substring(0, 100) + '...' : removeImages;
                        return `${removeImages}`;
                    },
                },
                {
                    data: 'dt_fim', title: 'Status', width: '20px',
                    render: function (data, type, row) {
                        var today = new Date();
                        today.setHours(0, 0, 0, 0);
                        var dtFim = new Date(data);
                        var concluido = row.ds_concluido

                        if (concluido == 1) {
                            return '<i class="fas fa-check-circle status-icon" title="Concluído"></i>';
                        } else if (dtFim >= today) {
                            return '<i class="fas fa-exclamation-circle status-icon" title="Em andamento"></i>';
                        } else if (dtFim < today) {
                            return '<i class="fas fa-times-circle status-icon" title="Vencido"></i>';
                        }
                    }
                }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            pageLength: 500,
            order: [[0, 'desc']],
            initComplete: function () {
            }, drawCallback: () => {
                $(document).ready(function () {
                    const bindClickEvent = () => {
                        $(`#${resultTableId}`).on('click', 'td', function (event) {
                            const target = $(event.target);
                            const columnIndex = target.index();
                            const targetColumnIndex = $(`#${resultTableId} th:contains("Plano de Ação")`).index();
                            if (columnIndex === targetColumnIndex) {
                                const tr = target.closest('tr');
                                if (!target.hasClass('btn')) {
                                    const rowData = $(`#${resultTableId}`).DataTable().row(tr).data();
                                    $('#editarIndicador .modal-body #mesAno').val(rowData.dt_indicador);
                                    $('#editarIndicador .modal-body #mesAnoAcao').val(rowData.dt_fim);
                                    Utils.fillQuillContent('planoAcaoEditar', rowData.plano_acao_indicador)
                                    $('#editarIndicador .modal-body #concluido').val(rowData.ds_concluido);
                                    $('#editarIndicador').modal('show');
                                }
                            }
                        });
                    }
                    bindClickEvent();
                    const bindHoverEvent = () => {
                        const targetColumnIndex = $(`#${resultTableId} th:contains("Plano de Ação")`).index();
                        $(`#${resultTableId}`).on('mouseover', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function (event) {
                            $(this).css('cursor', 'pointer');
                        });
                        $(`#${resultTableId}`).on('mouseleave', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function (event) {
                            $(this).css('cursor', 'auto');
                        });
                    };
                    bindHoverEvent();
                });
            }
        });

        $(`#${tableId}`).on('click', '.btn-visualizar', (event) => {
            const analiseId = $(event.currentTarget).data('analise-id');
            const detalhesTr = $(`tr.detalhes-analise[data-analise-id="${analiseId}"]`);
            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const rowIndex = tableAnalise.row($(event.currentTarget).closest('tr')).index();
                const rowData = tableAnalise.row(rowIndex).data();

                if (rowData) {
                    const novaDetalhesTr = `
                        <tr class="detalhes-analise" data-analise-id="${analiseId}">
                            <td colspan="8">
                                <table class="table">
                                    <tr> 
                                        <th>Anexo</th>
                                        <td>${Utils.replaceImgWithButton(rowData.analise_indicador)}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>`;
                    $(event.currentTarget).closest('tr').after(novaDetalhesTr);
                }
                this.setupImageButtons('.detalhes-analise');
            }
        });
        const planoAcaoResult = $(`#${resultTableId}`).DataTable({
            data: filteredData,
            columns: [
                {
                    data: 'dt_indicador', title: 'Data', width: '20px',
                    render: function (data, type, row) {
                        const dataFormatada = Utils.formatoAnoMes(data);
                        return `
                            <div class="arquivo-cell">
                                <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-id="${row.nr_atendimento}"><i class="ni ni-fat-add"></i></button>
                                ${dataFormatada}
                            </div>`;
                    },
                },
                {
                    data: 'plano_acao_indicador', title: 'Plano de Ação', width: '300px',
                    render: function (data, type, row) {
                        let removeImages = Utils.removeImages(data);
                        removeImages.length > 100 ? removeImages = removeImages.substring(0, 100) + '...' : removeImages;
                        return `${removeImages}`;
                    },
                },
                {
                    data: 'dt_fim', title: 'Status', width: '20px',
                    render: function (data, type, row) {
                        var today = new Date();
                        today.setHours(0, 0, 0, 0);
                        var dtFim = new Date(data);
                        var concluido = row.ds_concluido

                        if (concluido == 1) {
                            return '<i class="fas fa-check-circle status-icon" title="Concluído"></i>';
                        } else if (dtFim >= today) {
                            return '<i class="fas fa-exclamation-circle status-icon" title="Em andamento"></i>';
                        } else if (dtFim < today) {
                            return '<i class="fas fa-times-circle status-icon" title="Vencido"></i>';
                        }
                    }
                }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            pageLength: 500,
            order: [[0, 'desc']],
            drawCallback: function () {
            },
            rowCallback: function (row, data) {
            },
            initComplete: function () {
            },
        });
        $(`#${resultTableId}`).on('click', '.btn-visualizar', (event) => {
            const planoId = $(event.currentTarget).data('plano-id');
            const detalhesTr = $(`tr.detalhes-plano[data-plano-id="${planoId}"]`);
            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const rowIndex = planoAcaoResult.row($(event.currentTarget).closest('tr')).index();
                const rowData = planoAcaoResult.row(rowIndex).data();
                if (rowData) {
                    const novaDetalhesTr = `
                        <tr class="detalhes-plano" data-plano-id="${planoId}">
                            <td colspan="8">
                                <table class="table">
                                    <tr> 
                                        <th>Anexo</th>
                                        <td>${Utils.replaceImgWithButton(rowData.plano_acao_indicador)}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>`;
                    $(event.currentTarget).closest('tr').after(novaDetalhesTr);
                }
                this.setupImageButtons('.detalhes-plano');
            }
        });
    }


    /////////////////////dashboard Agencia transfusional /////////////////////////////////
    renderSolicitacaoTransfusionalFitro(data) {
        const renderData = (data) => {
            this.renderSolicitacaoTransfusional(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial1').val();
                let dtFinal = $('.dtFinal1').val();
                Utils.filtrarData('solicitacoes_tranfusionais', dtInicial, dtFinal, renderData);
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('percSolicTrasnf', 'Agência Trânsfusional');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderTransfRealizadasFitro(data) {
        const renderData = (data) => {
            this.renderTransfRealizadas(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial2').val();
                let dtFinal = $('.dtFinal2').val();
                Utils.filtrarData('transfusoes_realizadas', dtInicial, dtFinal, renderData);
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('transRealTurno', 'Agência Trânsfusional');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderTempoMedioTransfFitro(data) {
        const renderData = (data) => {
            this.renderTempoMedioTransf(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial3').val();
                let dtFinal = $('.dtFinal3').val();
                Utils.filtrarData('tempo_transf', dtInicial, dtFinal, renderData);
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('tempMedioTransf', 'Agência Trânsfusional');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderSolicitacaoTransfusional(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PROGRAMADA_ELETIVA, NAO_URGENTE, URGENTE, EXTREMA } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    programada_eletiva: PROGRAMADA_ELETIVA || 0,
                    nao_urgente: NAO_URGENTE || 0,
                    urgente: URGENTE || 0,
                    extrema: EXTREMA || 0
                };
            } else {
                conteudo[MES_ANO].programada_eletiva = PROGRAMADA_ELETIVA || conteudo[MES_ANO].programada_eletiva;
                conteudo[MES_ANO].nao_urgente = NAO_URGENTE || conteudo[MES_ANO].nao_urgente;
                conteudo[MES_ANO].urgente = URGENTE || conteudo[MES_ANO].urgente;
                conteudo[MES_ANO].extrema = EXTREMA || conteudo[MES_ANO].extrema;
            }
        });

        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));

        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Programada eletiva', { role: 'annotation' }, 'Não Urgente', { role: 'annotation' }, 'Urgente', { role: 'annotation' }, 'Extrema urgência', { role: 'annotation' }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.programada_eletiva), parseFloat(item.programada_eletiva) + '%',
                    parseFloat(item.nao_urgente), parseFloat(item.nao_urgente) + '%',
                    parseFloat(item.urgente), parseFloat(item.urgente) + '%',
                    parseFloat(item.extrema), parseFloat(item.extrema) + '%'
                ]),

            ];
            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
                title: 'Solicitações transfusionais',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#af43b7' },
                    1: { color: '#007dc6' },
                    2: { color: '#f2e839' },
                    3: { color: '#c60000' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 11,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },

            };
            var chart = new google.visualization.ComboChart(document.getElementById('chart-SolicTransf'));
            chart.draw(data, options);
            google.visualization.events.addListener(chart, 'select', selectHandler);
            $('#loadingOverlayLab').hide();
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTransfRealizadas(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, NOTURNO, DIURNO } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    noturno: NOTURNO || 0,
                    diurno: DIURNO || 0,
                };
            } else {
                conteudo[MES_ANO].noturno = NOTURNO || conteudo[MES_ANO].noturno;
                conteudo[MES_ANO].diurno = DIURNO || conteudo[MES_ANO].diurno;
            }
        });

        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));

        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Noturno', { role: 'annotation' }, 'Diurno', { role: 'annotation' }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.noturno), parseFloat(item.noturno) + '%',
                    parseFloat(item.diurno), parseFloat(item.diurno) + '%',
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Transfusões solicitadas',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#007dc6' },
                    1: { color: '#af43b7' },
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTransfTurno'));
            chart.draw(data, options);
            google.visualization.events.addListener(chart, 'select', selectHandler);
            $('#loadingOverlayLab').hide();
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTempoMedioTransf(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PROGRAMADA_ELETIVA, NAO_URGENTE, URGENTE, EXTREMA } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    programada_eletiva: PROGRAMADA_ELETIVA || 0,
                    nao_urgente: NAO_URGENTE || 0,
                    urgente: URGENTE || 0,
                    extrema: EXTREMA || 0
                };
            } else {
                conteudo[MES_ANO].programada_eletiva = PROGRAMADA_ELETIVA || conteudo[MES_ANO].programada_eletiva;
                conteudo[MES_ANO].nao_urgente = NAO_URGENTE || conteudo[MES_ANO].nao_urgente;
                conteudo[MES_ANO].urgente = URGENTE || conteudo[MES_ANO].urgente;
                conteudo[MES_ANO].extrema = EXTREMA || conteudo[MES_ANO].extrema;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function formatAnnotation(value) {
            if (value >= 1) {
                return `${value.toFixed(2)}h`;
            } else {
                return `${value.toFixed(2)}m`;
            }
        }


        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Programada eletiva', { role: 'annotation' }, 'Não Urgente', { role: 'annotation' }, 'Urgente', { role: 'annotation' }, 'Extrema urgência', { role: 'annotation' }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.programada_eletiva), formatAnnotation(parseFloat(item.programada_eletiva)),
                    parseFloat(item.nao_urgente), formatAnnotation(parseFloat(item.nao_urgente)),
                    parseFloat(item.urgente), formatAnnotation(parseFloat(item.urgente)),
                    parseFloat(item.extrema), formatAnnotation(parseFloat(item.extrema))
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Tempo médio de transfusão',
                vAxis: { title: 'Tempo' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#af43b7' },
                    1: { color: '#007dc6' },
                    2: { color: '#f2e839' },
                    3: { color: '#c60000' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 11,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTempMedioTransf'));
            chart.draw(data, options);
            google.visualization.events.addListener(chart, 'select', selectHandler);
            $('#loadingOverlayLab').hide();
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    //////////////////////Dashboard Emergencia////////////////////////////////////

    renderPaTempoAtendMedico(data) {
        const renderData = (data) => {
            this.renderPaTempoAtendM(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial4').val();
                let dtFinal = $('.dtFinal4').val();
                Utils.filtrarData('emer_temp_pa_medico', dtInicial, dtFinal, renderData);
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('tempAtendPa', 'Emergência');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderTempoMedioAtendTriagem(data) {
        const renderData = (data) => {
            this.renderTempoMedioPosTriagem(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial5').val();
                let dtFinal = $('.dtFinal5').val();
                Utils.filtrarData('emer_temp_pos_triagem', dtInicial, dtFinal, renderData);
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('tempAtendPos', 'Emergência');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderTempoMedioEspera(data) {
        const renderData = (data) => {
            this.renderTempoMedioEspTriagem(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial6').val();
                let dtFinal = $('.dtFinal6').val();
                Utils.filtrarData('emer_temp_esp_triagem', dtInicial, dtFinal, renderData);
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('tempEsp', 'Emergência');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderPaTempoAtendM(data) {
        const conteudo = {};
        data.forEach(item => {
            const { ENTRADA_PACIENTE, VERMELHO, LARANJA, AMARELO, VERDE, AZUL } = item;
            if (!conteudo[ENTRADA_PACIENTE]) {
                conteudo[ENTRADA_PACIENTE] = {
                    mesAno: ENTRADA_PACIENTE,
                    vermelho: VERMELHO || 0,
                    laranja: LARANJA || 0,
                    amarelo: AMARELO || 0,
                    verde: VERDE || 0,
                    azul: AZUL || 0
                };
            } else {
                conteudo[ENTRADA_PACIENTE].vermelho = VERMELHO || conteudo[ENTRADA_PACIENTE].vermelho;
                conteudo[ENTRADA_PACIENTE].laranja = LARANJA || conteudo[ENTRADA_PACIENTE].laranja;
                conteudo[ENTRADA_PACIENTE].amarelo = AMARELO || conteudo[ENTRADA_PACIENTE].amarelo;
                conteudo[ENTRADA_PACIENTE].verde = VERDE || conteudo[ENTRADA_PACIENTE].verde;
                conteudo[ENTRADA_PACIENTE].azul = AZUL || conteudo[ENTRADA_PACIENTE].azul;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function formatAnnotation(value) {
            if (value >= 1) {
                return `${value.toFixed(2)}h`;
            } else {
                return `${value.toFixed(2)}m`;
            }
        }
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Vermelho', { role: 'annotation' }, 'Laranja', { role: 'annotation' }, 'Amarelo', { role: 'annotation' }, 'verde', { role: 'annotation' }, 'azul', { role: 'annotation' }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.vermelho), formatAnnotation(parseFloat(item.vermelho)),
                    parseFloat(item.laranja), formatAnnotation(parseFloat(item.laranja)),
                    parseFloat(item.amarelo), formatAnnotation(parseFloat(item.amarelo)),
                    parseFloat(item.verde), formatAnnotation(parseFloat(item.verde)),
                    parseFloat(item.azul), formatAnnotation(parseFloat(item.azul))
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Tempo médio de atendimento pronto atendimento',
                vAxis: { title: 'Tempo' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#c60000' },
                    1: { color: '#e57616' },
                    2: { color: '#f2e839' },
                    3: { color: '#07793a' },
                    4: { color: '#007dc6' },
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 11,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTempAtendPa'));
            chart.draw(data, options);
            google.visualization.events.addListener(chart, 'select', selectHandler);
            $('#loadingOverlayLab').hide();
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTempoMedioPosTriagem(data) {
        const conteudo = {};
        data.forEach(item => {
            const { ENTRADA_PACIENTE, VERMELHO, LARANJA, AMARELO, VERDE, AZUL } = item;
            if (!conteudo[ENTRADA_PACIENTE]) {
                conteudo[ENTRADA_PACIENTE] = {
                    mesAno: ENTRADA_PACIENTE,
                    vermelho: VERMELHO || 0,
                    laranja: LARANJA || 0,
                    amarelo: AMARELO || 0,
                    verde: VERDE || 0,
                    azul: AZUL || 0
                };
            } else {
                conteudo[ENTRADA_PACIENTE].vermelho = VERMELHO || conteudo[ENTRADA_PACIENTE].vermelho;
                conteudo[ENTRADA_PACIENTE].laranja = LARANJA || conteudo[ENTRADA_PACIENTE].laranja;
                conteudo[ENTRADA_PACIENTE].amarelo = AMARELO || conteudo[ENTRADA_PACIENTE].amarelo;
                conteudo[ENTRADA_PACIENTE].verde = VERDE || conteudo[ENTRADA_PACIENTE].verde;
                conteudo[ENTRADA_PACIENTE].azul = AZUL || conteudo[ENTRADA_PACIENTE].azul;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function formatAnnotation(value) {
            if (value >= 1) {
                return `${value.toFixed(2)}h`;
            } else {
                return `${value.toFixed(2)}m`;
            }
        }
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Vermelho', { role: 'annotation' }, 'Laranja', { role: 'annotation' }, 'Amarelo', { role: 'annotation' }, 'verde', { role: 'annotation' }, 'azul', { role: 'annotation' }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.vermelho), formatAnnotation(parseFloat(item.vermelho)),
                    parseFloat(item.laranja), formatAnnotation(parseFloat(item.laranja)),
                    parseFloat(item.amarelo), formatAnnotation(parseFloat(item.amarelo)),
                    parseFloat(item.verde), formatAnnotation(parseFloat(item.verde)),
                    parseFloat(item.azul), formatAnnotation(parseFloat(item.azul))
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Tempo médio de atendimento pós triagem',
                vAxis: { title: 'Tempo' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#c60000' },
                    1: { color: '#e57616' },
                    2: { color: '#f2e839' },
                    3: { color: '#07793a' },
                    4: { color: '#007dc6' },
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 11,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTempAtenPosT'));
            chart.draw(data, options);
            google.visualization.events.addListener(chart, 'select', selectHandler);
            $('#loadingOverlayLab').hide();
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTempoMedioEspTriagem(data) {
        const conteudo = {};
        data.forEach(item => {
            const { ENTRADA_PACIENTE, VERMELHO, LARANJA, AMARELO, VERDE, AZUL } = item;
            if (!conteudo[ENTRADA_PACIENTE]) {
                conteudo[ENTRADA_PACIENTE] = {
                    mesAno: ENTRADA_PACIENTE,
                    vermelho: VERMELHO || 0,
                    laranja: LARANJA || 0,
                    amarelo: AMARELO || 0,
                    verde: VERDE || 0,
                    azul: AZUL || 0
                };
            } else {
                conteudo[ENTRADA_PACIENTE].vermelho = VERMELHO || conteudo[ENTRADA_PACIENTE].vermelho;
                conteudo[ENTRADA_PACIENTE].laranja = LARANJA || conteudo[ENTRADA_PACIENTE].laranja;
                conteudo[ENTRADA_PACIENTE].amarelo = AMARELO || conteudo[ENTRADA_PACIENTE].amarelo;
                conteudo[ENTRADA_PACIENTE].verde = VERDE || conteudo[ENTRADA_PACIENTE].verde;
                conteudo[ENTRADA_PACIENTE].azul = AZUL || conteudo[ENTRADA_PACIENTE].azul;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function formatAnnotation(value) {
            if (value >= 1) {
                return `${value.toFixed(2)}h`;
            } else {
                return `${value.toFixed(2)}m`;
            }
        }
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Vermelho', { role: 'annotation' }, 'Laranja', { role: 'annotation' }, 'Amarelo', { role: 'annotation' }, 'verde', { role: 'annotation' }, 'azul', { role: 'annotation' }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.vermelho), formatAnnotation(parseFloat(item.vermelho)),
                    parseFloat(item.laranja), formatAnnotation(parseFloat(item.laranja)),
                    parseFloat(item.amarelo), formatAnnotation(parseFloat(item.amarelo)),
                    parseFloat(item.verde), formatAnnotation(parseFloat(item.verde)),
                    parseFloat(item.azul), formatAnnotation(parseFloat(item.azul))
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Tempo médio de espera até atendimento triagem',
                vAxis: { title: 'Tempo' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#c60000' },
                    1: { color: '#e57616' },
                    2: { color: '#f2e839' },
                    3: { color: '#07793a' },
                    4: { color: '#007dc6' },
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 11,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTempEsperaPa'));
            chart.draw(data, options);
            google.visualization.events.addListener(chart, 'select', selectHandler);
            $('#loadingOverlayLab').hide();
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    ////////////////////////////// Dashboard CVO //////////////////////////////
    renderTaxaMortalidadeFetal(data) {
        const renderData = (data) => {
            this.renderTaxaMortalidadeFetalView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial7').val();
                let dtFinal = $('.dtFinal7').val();
                Utils.filtrarData('cvo_taxa_mort_fetal', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('taxaMortFetal', 'Comissão de Verificação de Óbito');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderTaxaMortalidadeGeral(data) {
        const renderData = (data) => {
            this.renderTaxaMortalidadeGeralView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial8').val();
                let dtFinal = $('.dtFinal8').val();
                Utils.filtrarData('cvo_taxa_mort_geral', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('taxaMortGeral', 'Comissão de Verificação de Óbito');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }

    renderTaxaMortalidadeNeo(data) {
        const renderData = (data) => {
            this.renderTaxaMortalidadeNeoView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial9').val();
                let dtFinal = $('.dtFinal9').val();
                Utils.filtrarData('cvo_taxa_mort_neo', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('taxaMortNeo', 'Comissão de Verificação de Óbito');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }

    renderTaxaMortalidadeFetalView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, TAXA_MORTALIDADE_FETAL, FETO_MORTO, TOTAL_ATENDIMENTOS } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    obitos: parseInt(FETO_MORTO, 10) || 0,
                    taxa: TAXA_MORTALIDADE_FETAL || 0,
                    atendimentos: parseInt(TOTAL_ATENDIMENTOS, 10) || 0
                };
            } else {
                conteudo[MES_ANO].obitos = parseInt(FETO_MORTO, 10) || conteudo[MES_ANO].obitos;
                conteudo[MES_ANO].taxa = TAXA_MORTALIDADE_FETAL || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].atendimentos = parseInt(TOTAL_ATENDIMENTOS, 10) || conteudo[MES_ANO].atendimentos;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Taxa de Óbito', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Mortalidade:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Óbitos:</strong> ${item.obitos} <br><strong>Total de Atendimentos:</strong> ${item.atendimentos}</div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Taxa de Óbito Fetal',
                vAxis: { title: 'Porcentagem' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTaxaMortalidadeFetal'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }


    renderTaxaMortalidadeGeralView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, TAXA_MORTALIDADE, TOTAL_OBITOS, TOTAL_ATENDIMENTOS } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    obitos: parseInt(TOTAL_OBITOS, 10) || 0,
                    taxa: TAXA_MORTALIDADE || 0,
                    atendimentos: parseInt(TOTAL_ATENDIMENTOS, 10) || 0
                };
            } else {
                conteudo[MES_ANO].obitos = parseInt(TOTAL_OBITOS, 10) || conteudo[MES_ANO].obitos;
                conteudo[MES_ANO].taxa = TAXA_MORTALIDADE || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].atendimentos = parseInt(TOTAL_ATENDIMENTOS, 10) || conteudo[MES_ANO].atendimentos;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Taxa de Mortalidade', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa), parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Mortalidade:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Óbitos:</strong> ${item.obitos} <br><strong>Total de Atendimentos:</strong> ${item.atendimentos}</div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Taxa de Mortalidade Geral',
                vAxis: { title: 'Porcentagem' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTaxaMortalidadeGeral'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }


    renderTaxaMortalidadeNeoView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, TAXA_MORTALIDADE_NEONATAL, TOTAL_OBITOS, TOTAL_ATENDIMENTOS } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    obitos: parseInt(TOTAL_OBITOS, 10) || 0,
                    taxa: TAXA_MORTALIDADE_NEONATAL || 0,
                    atendimentos: parseInt(TOTAL_ATENDIMENTOS, 10) || 0
                };
            } else {
                conteudo[MES_ANO].obitos = parseInt(TOTAL_OBITOS, 10) || conteudo[MES_ANO].obitos;
                conteudo[MES_ANO].taxa = TAXA_MORTALIDADE_NEONATAL || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].atendimentos = parseInt(TOTAL_ATENDIMENTOS, 10) || conteudo[MES_ANO].atendimentos;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Taxa de Mortalidade', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Mortalidade:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Óbitos:</strong> ${item.obitos} <br><strong>Total de Atendimentos:</strong> ${item.atendimentos}</div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Taxa de Mortalidade Neonatal',
                vAxis: { title: 'Porcentagem' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTaxaMortalidadeNeoNatal'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }



    ///////////////////////////////////////////// Partos Cesarea ////////////////////////////////////////////

    renderTaxaAmaHoraVida(data) {
        const renderData = (data) => {
            this.renderTaxaAmaHoraVidaView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial10').val();
                let dtFinal = $('.dtFinal10').val();
                Utils.filtrarData('parto_cesarea_ama_hora_vida', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('amamentaHoraVida', 'Partos Cesáreas');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }
    renderTaxaContatoPele(data) {
        const renderData = (data) => {
            this.renderTaxaContatoPeleView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial11').val();
                let dtFinal = $('.dtFinal11').val();
                Utils.filtrarData('parto_cesarea_contato_pele', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('percContatoPele', 'Partos Cesáreas');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }
    renderTaxaPrematuridade(data) {
        const renderData = (data) => {
            this.renderTaxaPrematuridadeView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial12').val();
                let dtFinal = $('.dtFinal12').val();
                Utils.filtrarData('parto_cesarea_prematuridade', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('percPrematuridade', 'Partos Cesáreas');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }

    renderTaxaReanimacao(data) {
        const renderData = (data) => {
            this.renderTaxaReanimacaoView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial13').val();
                let dtFinal = $('.dtFinal13').val();
                Utils.filtrarData('parto_cesarea_reanimacao', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('percReanimacao', 'Partos Cesáreas');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }

    renderTaxaAmaHoraVidaView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_AMAMENT_PC, PC, AMAMENT_PC } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    partos: parseInt(PC, 10) || 0,
                    taxa: PERC_AMAMENT_PC || 0,
                    pele: parseInt(AMAMENT_PC, 10) || 0
                };
            } else {
                conteudo[MES_ANO].partos = parseInt(PC, 10) || conteudo[MES_ANO].partos;
                conteudo[MES_ANO].taxa = PERC_AMAMENT_PC || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].pele = parseInt(AMAMENT_PC, 10) || conteudo[MES_ANO].pele;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Amamentação', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Amamentação:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Partos:</strong> ${item.partos} <br><strong>Total de Amamentação:</strong> ${item.pele}</div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual de Amamentação 1° Hora de Vida',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartPercAmamentaHoraVida'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTaxaContatoPeleView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_PELE_PELE_PC, PARTOS, PELE_PELE_PC } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    partos: parseInt(PARTOS, 10) || 0,
                    taxa: PERC_PELE_PELE_PC || 0,
                    pele: parseInt(PELE_PELE_PC, 10) || 0
                };
            } else {
                conteudo[MES_ANO].partos = parseInt(PARTOS, 10) || conteudo[MES_ANO].partos;
                conteudo[MES_ANO].taxa = PERC_PELE_PELE_PC || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].pele = parseInt(PELE_PELE_PC, 10) || conteudo[MES_ANO].pele;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Contato Pele a Pele', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Contato Pele a Pele:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Partos:</strong> ${item.partos} <br><strong>Total de Contato Pele a Pele:</strong> ${item.pele}</div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual Contato Pele a Pele',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartPercContatoPele'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTaxaPrematuridadeView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_PREMATURIDADE_PN, PARTOS, PREMATURIDADE_PC } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    partos: parseInt(PARTOS, 10) || 0,
                    taxa: PERC_PREMATURIDADE_PN || 0,
                    prematuridade: parseInt(PREMATURIDADE_PC, 10) || 0
                };
            } else {
                conteudo[MES_ANO].partos = parseInt(PARTOS, 10) || conteudo[MES_ANO].partos;
                conteudo[MES_ANO].taxa = PERC_PREMATURIDADE_PN || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].prematuridade = parseInt(PREMATURIDADE_PC, 10) || conteudo[MES_ANO].prematuridade;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Prematuridade', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Prematuridade:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Partos:</strong> ${item.partos} <br><strong>Total de Prematuridade:</strong> ${item.prematuridade}</div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual Prematuridade',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTaxaPrematuridade'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTaxaReanimacaoView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_REANIMACAO_PC, PARTOS, REANIMACAO_PC } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    partos: parseInt(PARTOS, 10) || 0,
                    taxa: PERC_REANIMACAO_PC || 0,
                    reanimacao: parseInt(REANIMACAO_PC, 10) || 0
                };
            } else {
                conteudo[MES_ANO].partos = parseInt(PARTOS, 10) || conteudo[MES_ANO].partos;
                conteudo[MES_ANO].taxa = PERC_REANIMACAO_PC || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].reanimacao = PERC_REANIMACAO_PC || conteudo[MES_ANO].reanimacao;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Reanimação', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Reanimação:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Partos:</strong> ${item.partos}<br><strong>Total de Reanimação:</strong> ${item.reanimacao} </div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual Reanimação Neonatal',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTaxaReanimacao'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }
    ////////////////////////// Parto Normal ///////////////////////////////////////////////

    renderTaxaAmaHoraVidaN(data) {
        const renderData = (data) => {
            this.renderTaxaAmaHoraVidaNView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial14').val();
                let dtFinal = $('.dtFinal14').val();
                Utils.filtrarData('parto_normal_ama_hora_vida', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('percAmamentaHoraN', 'Partos Normal');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }

    renderTaxaContatoPeleN(data) {
        const renderData = (data) => {
            this.renderTaxaContatoPeleNView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial15').val();
                let dtFinal = $('.dtFinal15').val();
                Utils.filtrarData('parto_normal_contato_pele', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('percContatoPeleN', 'Partos Normal');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }
    renderTaxaPrematuridadeN(data) {
        const renderData = (data) => {
            this.renderTaxaPrematuridadeNView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial16').val();
                let dtFinal = $('.dtFinal16').val();
                Utils.filtrarData('parto_normal_prematuridade', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('percPrematuridadeN', 'Partos Normal');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }

    renderTaxaReanimacaoN(data) {
        const renderData = (data) => {
            this.renderTaxaReanimacaoNView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial17').val();
                let dtFinal = $('.dtFinal17').val();
                Utils.filtrarData('parto_normal_reanimacao', dtInicial, dtFinal, renderData);
                $('#loadingOverlayLab').show();
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide();
                $('.btn-imprimir').hide();
                $('.btn-gerar-relatório').hide();
                Utils.printDivContent('percReanimacaoN', 'Partos Normal');
                $('.btn-gerar').show();
                $('.btn-imprimir').show();
                $('.btn-gerar-relatório').show();
            });
        });
    }

    renderTaxaAmaHoraVidaNView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_AMAMENT_PN, PN, AMAMENT_PN } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    partos: parseInt(PN, 10) || 0,
                    taxa: PERC_AMAMENT_PN || 0,
                    pele: parseInt(AMAMENT_PN, 10) || 0
                };
            } else {
                conteudo[MES_ANO].partos = parseInt(PN, 10) || conteudo[MES_ANO].partos;
                conteudo[MES_ANO].taxa = PERC_AMAMENT_PN || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].pele = parseInt(AMAMENT_PN, 10) || conteudo[MES_ANO].pele;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Amamentação', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Amamentação:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Partos:</strong> ${item.partos} <br><strong>Total de Amamentação:</strong> ${item.pele}</div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual de Amamentação 1° Hora de Vida',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartPercAmamentaHoraVidaN'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTaxaContatoPeleNView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_PELE_PELE, PN, PELE_PELE_PN } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    partos: parseInt(PN, 10) || 0,
                    taxa: PERC_PELE_PELE || 0,
                    pele: parseInt(PELE_PELE_PN, 10) || 0
                };
            } else {
                conteudo[MES_ANO].partos = parseInt(PN, 10) || conteudo[MES_ANO].partos;
                conteudo[MES_ANO].taxa = PERC_PELE_PELE || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].pele = parseInt(PELE_PELE_PN, 10) || conteudo[MES_ANO].pele;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Contato Pele a Pele', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Contato Pele a Pele:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Partos:</strong> ${item.partos} <br><strong>Total de Contato Pele a Pele:</strong> ${item.pele}</div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual Contato Pele a Pele',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartPercContatoPeleN'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTaxaPrematuridadeNView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_PREMATURIDADE_PN, PN, PREMATURIDADE_PN } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    partos: parseInt(PN, 10) || 0,
                    taxa: PERC_PREMATURIDADE_PN || 0,
                    prematuridade: parseInt(PREMATURIDADE_PN, 10) || 0
                };
            } else {
                conteudo[MES_ANO].partos = parseInt(PN, 10) || conteudo[MES_ANO].partos;
                conteudo[MES_ANO].taxa = PERC_PREMATURIDADE_PN || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].prematuridade = parseInt(PREMATURIDADE_PN, 10) || conteudo[MES_ANO].prematuridade;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Prematuridade', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Prematuridade:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Partos:</strong> ${item.partos} <br><strong>Total de Prematuridade:</strong> ${item.prematuridade}</div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual Prematuridade',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTaxaPrematuridade'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    renderTaxaReanimacaoNView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_REANIMACAO_PN, PN, REANIMACAO_PN } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    partos: parseInt(PN, 10) || 0,
                    taxa: PERC_REANIMACAO_PN || 0,
                    reanimacao: parseInt(REANIMACAO_PN, 10) || 0
                };
            } else {
                conteudo[MES_ANO].partos = parseInt(PN, 10) || conteudo[MES_ANO].partos;
                conteudo[MES_ANO].taxa = PERC_REANIMACAO_PN || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].reanimacao = REANIMACAO_PN || conteudo[MES_ANO].reanimacao;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Reanimação', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.taxa),
                    parseFloat(item.taxa) + '%',
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de Reanimação:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Partos:</strong> ${item.partos}<br><strong>Total de Reanimação:</strong> ${item.reanimacao} </div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual Reanimação Neonatal',
                vAxis: {
                    title: 'Porcentagem',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTaxaReanimacao'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }

    //////////////////////////////////////// Dashboard Recepcao//////////////////////////////////////////////////

    renderCapacidadeAgend(data) {
        const renderData = (data) => {
            this.renderCapacidadeAgendView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial18').val();
                let dtFinal = $('.dtFinal18').val();
                $('#loadingOverlayLab').show();
                Utils.filtrarData('recepcao_capacidade_agendamento', dtInicial, dtFinal, renderData);
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('capacidadeAgendada', 'Recepção');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderPercAbsenteismo(data) {
        const renderData = (data) => {
            this.renderPercAbsenteismoView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial19').val();
                let dtFinal = $('.dtFinal19').val();
                $('#loadingOverlayLab').show();
                Utils.filtrarData('recepcao_perc_absenteismo', dtInicial, dtFinal, renderData);
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('percAbsenteismo', 'Recepção');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderCapacidadeAgendView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_CAPACIDADE_AGENDADA, CAPACIDADE, AGENDADAS } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    capacidade: parseInt(CAPACIDADE, 10) || 0,
                    taxa: PERC_CAPACIDADE_AGENDADA || 0,
                    agendadas: parseInt(AGENDADAS, 10) || 0
                };
            } else {
                conteudo[MES_ANO].capacidade = parseInt(CAPACIDADE, 10) || conteudo[MES_ANO].capacidade;
                conteudo[MES_ANO].taxa = PERC_CAPACIDADE_AGENDADA || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].agendadas = AGENDADAS || conteudo[MES_ANO].agendadas;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Agendadas', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }, 'Capacidade', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.agendadas), parseFloat(item.agendadas),
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de agendamento:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Capacidade:</strong> ${item.capacidade}<br><strong>Total Agendadas:</strong> ${item.agendadas} </div>`
                    ,
                    parseFloat(item.capacidade), parseFloat(item.capacidade),
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de agendamento:</strong> ${parseFloat(item.taxa)}%<br><strong>Total de Capacidade:</strong> ${item.capacidade}<br><strong>Total Agendadas:</strong> ${item.agendadas} </div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual Capacidade x Agendamento',
                vAxis: {
                    title: 'Quantidade'
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#07793a' },
                    1: { color: '#007dc6' }
                },
                isStacked: true,
                annotations: {
                    alwaysOutside: false,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartCapacidadeAgendada'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }
    renderPercAbsenteismoView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, PERC_ABSENTEISMO, AGENDADAS, FALTAS } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    agendadas: parseInt(AGENDADAS, 10) || 0,
                    taxa: PERC_ABSENTEISMO || 0,
                    faltas: parseInt(FALTAS, 10) || 0
                };
            } else {
                conteudo[MES_ANO].agendadas = parseInt(AGENDADAS, 10) || conteudo[MES_ANO].agendadas;
                conteudo[MES_ANO].taxa = PERC_ABSENTEISMO || conteudo[MES_ANO].taxa;
                conteudo[MES_ANO].faltas = FALTAS || conteudo[MES_ANO].faltas;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Faltas', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }, 'Agendadas', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.faltas), parseFloat(item.faltas),
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de absenteismo:</strong> ${parseFloat(item.taxa)}%<br><strong>Total Agendadas:</strong> ${item.agendadas}<br><strong>Total de Faltas:</strong> ${item.faltas} </div>`,
                    parseFloat(item.agendadas), parseFloat(item.agendadas),
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Taxa de absenteismo:</strong> ${parseFloat(item.taxa)}%<br><strong>Total Agendadas:</strong> ${item.agendadas}<br><strong>Total de Faltas:</strong> ${item.faltas} </div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Percentual de Absenteismo',
                vAxis: {
                    title: 'Quantidade',
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#e57616' },
                    1: { color: '#c60000' },
                },
                isStacked: true,
                annotations: {
                    alwaysOutside: false,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTaxaAbsenteismo'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }


    ////////////////////////// dashboard obstetra ////////////////////////////////

    renderObesidadePc(data) {
        const renderData = (data) => {
            this.renderObesidadePcView(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar');
            let btnImprimir = $('.btn-imprimir');
            btn.on('click', () => {
                let dtInicial = $('.dtInicial21').val();
                let dtFinal = $('.dtFinal21').val();
                $('#loadingOverlayLab').show();
                Utils.filtrarData('obstetra_gestante_pc', dtInicial, dtFinal, renderData);
            });
            btnImprimir.on('click', () => {
                $('#loadingOverlayLab').show();
                $('.btn-gerar').hide()
                $('.btn-imprimir').hide()
                $('.btn-gerar-relatório').hide()
                Utils.printDivContent('gestantePc', 'Ginecologia Obstetra');
                $('.btn-gerar').show()
                $('.btn-imprimir').show()
                $('.btn-gerar-relatório').show()
            });
        });
    }

    renderObesidadePcView(data) {
        const conteudo = {};
        data.forEach(item => {
            const { MES_ANO, TOTAL_ATENDIMENTOS, DIABETES, IG } = item;
            if (!conteudo[MES_ANO]) {
                conteudo[MES_ANO] = {
                    mesAno: MES_ANO,
                    diabetes: parseInt(DIABETES, 10) || 0,
                    total: TOTAL_ATENDIMENTOS || 0,
                    ig: parseInt(IG, 10) || 0
                };
            } else {
                conteudo[MES_ANO].diabetes = parseInt(DIABETES, 10) || conteudo[MES_ANO].diabetes;
                conteudo[MES_ANO].total = TOTAL_ATENDIMENTOS || conteudo[MES_ANO].total;
                conteudo[MES_ANO].ig = IG || conteudo[MES_ANO].ig;
            }
        });
        const conteudoArray = Object.values(conteudo);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawVisualization(conteudoArray));
        function drawVisualization(conteudoArray) {
            var chartData = [
                ['Mes-Ano', 'Reanimação', { role: 'annotation' }, { role: 'tooltip', p: { html: true } }],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.total),
                    parseFloat(item.total),
                    `<div style="padding:5px;"><strong>Mês-Ano:</strong> ${Utils.formatoMesAno(item.mesAno)}<br><strong>Total Atendimentos:</strong> ${parseFloat(item.total)}%<br><strong>Total diabetes:</strong> ${item.diabetes}<br><strong>Ig:</strong> ${item.ig} </div>`
                ]),
            ];
            var data = google.visualization.arrayToDataTable(chartData);
            var options = {
                title: 'Total de Atendimentos',
                vAxis: {
                    title: 'Total',
                    viewWindow: {
                        min: 0,
                        max: 100
                    },
                },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' }
                },
                annotations: {
                    alwaysOutside: true,
                    textStyle: {
                        fontSize: 14,
                        auraColor: 'none',
                        color: '#000'
                    },
                    stem: {
                        color: 'none'
                    }
                },
                tooltip: { isHtml: true },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTaxaReanimacao'));
            chart.draw(data, options);
            $('#loadingOverlayLab').hide();
            google.visualization.events.addListener(chart, 'select', selectHandler);
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var mesAno = chartData[selectedItem.row + 1][0];
                    var labelName = chartData[0][selectedItem.column + 1];
                    let modal = document.getElementById("analiseIndicadores");
                    $(modal).modal("show");
                    $('#mesAno').val(mesAno);
                    $('#solicitacaoTransf').val();
                }
            }
        }
    }


    //////////////////////Mapa de risco jasmim e rosa////////////////////////////////////
    renderEspacoJasmin(data) {
        if (!Array.isArray(data)) {
            console.error('Data inválida:', data);
            return;
        }
        if ($.fn.DataTable.isDataTable('#tableMapaInternacaoJasmin')) {
            if ($('.modal').is(':visible')) {
                console.log('modal aberto');
                return;
            } else {
                $('#tableMapaInternacaoJasmin').DataTable().destroy();
                this.dataModel.fetchData('http://10.1.1.108/intranet/src/services/api/espacoJasmin.php', this.renderEspacoJasmin);
                const jasmim_Id = $(event.currentTarget).data('id');
                const rowIndex = tableMapaInternacaoJasmin.row($(event.currentTarget).closest('tr')).index();
                const row = tableMapaInternacaoJasmin.rows(rowIndex).data()[0];
                const detalhesTr = $(`tr.detalhes-jasmin[data-id="${jasmim_Id}"]`);
                detalhesTr.remove();
            }
        }
        $('#loadingOverlayLab').show();
        const tableMapaInternacaoJasmin = $('#tableMapaInternacaoJasmin').DataTable({
            data: data,
            columns: [
                {
                    data: 'ds_leito', title: 'Leito',
                    render: function (data, type, row) {
                        return `
                            <div class="arquivo-cell">
                                <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-id="${row.nr_atendimento}"><i class="ni ni-fat-add"></i></button>
                                ${data}
                            </div>
                        `;
                    },
                },
                {
                    data: null,
                    title: 'Alergias',
                    render: function (data, type, row) {
                        const alergiasNotEmpty = row.ds_alergias && row.ds_alergias.trim() !== '';
                        if (alergiasNotEmpty) {
                            const alergias = row.ds_alergias.trim();
                            return `
                           <div class="badge bg-danger" style="padding: 5px;" data-bs-toggle="tooltip" title="${alergias}" data-bs-content="${alergias}">
                               <i class="fa fa-info-circle"></i>Alergias
                            </div>
                            `;
                        } else {
                            return '';
                        }
                    },
                },
                {
                    data: 'nm_paciente', title: 'Paciente',
                    "render": function (data, type, row, meta) {
                        if (data.length > 18) {
                            return data.substr(0, 18) + '...';
                        } else {
                            return data;
                        }
                    }
                },
                { data: 'ds_idade', title: 'Idade' },
                {
                    data: 'dt_admissao',
                    title: 'Data admissão',
                    render: function (data, type, row) {
                        return data ? Utils.formatarDataHora(data) : 'Não definido';
                    }
                },
                {
                    data: 'dt_parto',
                    title: 'Data parto',
                    render: function (data, type, row) {
                        return data ? Utils.formatarDataHora(data) + ' ' + `<span class="badge badge-info">${row.ds_parto}</span>` : 'Não definido';
                    }
                },
                {
                    data: 'ds_dieta', title: 'Dieta',
                    render: function (data, type, row) {
                        return data == ' ' ? 'Não definido' : data;
                    }
                },
                {
                    data: 'ds_observacao_aduto',
                    title: 'Observação Adulto',
                    render: function (data, type, row) {
                        const observacaoAdulto = Utils.removeImages(row.ds_observacao_aduto).trim();
                        let result = `<div class="break-word"> ${observacaoAdulto}`;
                        const ds_transfusao = Utils.pularLinhaString(row.ds_transfusao).trim();
                        if (ds_transfusao) {
                            result += `<div style='color: #6d0101; -webkit-background-clip: text; background-clip: text; title="Transfusão">Transfusão: ${ds_transfusao}</div>`;
                        }
                        return result;
                    }
                }
                ,
                {
                    data: 'ds_observacao_rn', title: 'Observação RN',
                    render: function (data, type, row) {
                        const observacaoRn = Utils.removeImages(row.ds_observacao_rn).trim();
                        const ds_transfusaoRn = Utils.pularLinhaString(row.ds_transfusaoRn).trim();
                        const ds_feto = row.feto
                        console.log(ds_feto);

                        let result = `<div class="break-word"> ${observacaoRn}`;


                        if (ds_transfusaoRn) {
                            result += `<div style='color: #6d0101; -webkit-background-clip: text; background-clip: text; title="Transfusão RN">${ds_transfusaoRn}</div>`;
                        }
                        if (ds_feto) {
                            result += `<div>${ds_feto}</div>`;
                        }
                        result += `</div>`;

                        return result;
                    }

                },
                {
                    data: 'ds_fugulin',
                    title: 'Fugulin',
                    "render": function (data, type, row, meta) {
                        var abbreviations = {
                            "Cuidados de Alta Dependência": "AD",
                            "Cuidados Mínimos": "CM",
                            "Cuidados Intermediários": "ITM",
                            "Cuidados Semi-Intensivos": "SI",
                            "": "---"
                        };
                        if (abbreviations.hasOwnProperty(data)) {
                            return abbreviations[data];
                        }
                        else {
                            if (data.length > 18) {
                                return data.substr(0, 18) + '...';
                            } else {
                                return data;
                            }
                        }
                    }
                },
                {
                    data: 'braden_morse',
                    title: 'Data Braden/Morse/SAE',
                    render: function (data, type, row) {
                        return data ? Utils.pularLinhaString(data) : 'Não definido';
                    }
                },
                {
                    data: 'dt_sae_rn',
                    title: 'Data SAE/RN',
                    render: function (data, type, row) {
                        return data ? Utils.formatarDataHora(data) : 'Não definido';
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-visualizar-mapa" data-id="${row.nr_atendimento}">Visualizar</button></li>
                                    <li><button class="dropdown-item btn-editar-mapa" data-id="${row.nr_atendimento}">Editar</button></li>
                                </ul>
                            </div>
                        `;
                    },
                }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 60,
            drawCallback: () => {
                $(document).ready(function () {
                    const bindClickEvent = () => {
                        $('#tableMapaInternacaoJasmin').on('click', 'td', function (event) {
                            const target = $(event.target);
                            const columnIndex = target.index();
                            const targetColumnIndex = $('#tableMapaInternacaoJasmin th:contains("Paciente")').index();
                            if (columnIndex === targetColumnIndex) {
                                const tr = target.closest('tr');
                                if (!target.hasClass('btn')) {
                                    tr.find('.btn-editar-mapa').trigger('click');
                                }
                            }
                        });
                    }
                    bindClickEvent();

                    const bindHoverEvent = () => {
                        const targetColumnIndex = $('#tableMapaInternacaoJasmin th:contains("Paciente")').index();
                        $('#tableMapaInternacaoJasmin').on('mouseover', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function (event) {
                            $(this).css('cursor', 'pointer');
                        });

                        $('#tableMapaInternacaoJasmin').on('mouseleave', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function (event) {

                            $(this).css('cursor', 'auto');
                        });
                    };

                    bindHoverEvent();
                });


                $('#tableMapaInternacaoJasmin').on('click', '.btn-visualizar', (event) => {
                    event.stopPropagation();
                    const jasmim_Id = $(event.currentTarget).data('id');
                    const rowIndex = tableMapaInternacaoJasmin.row($(event.currentTarget).closest('tr')).index();
                    const row = tableMapaInternacaoJasmin.rows(rowIndex).data()[0];
                    const detalhesTr = $(`tr.detalhes-jasmin[data-id="${jasmim_Id}"]`);
                    if (detalhesTr.length) {
                        detalhesTr.remove();
                    } else {
                        const observacaoAdulto = Utils.replaceImgWithButton(row.ds_observacao_aduto);
                        const observacaoRN = Utils.replaceImgWithButton(row.ds_observacao_rn);
                        const novaDetalhesTr = `
                            <tr class="detalhes-jasmin" data-id="${jasmim_Id}">
                                <th colspan="8">Detalhes</th>
                            </tr>
                            <tr class="detalhes-jasmin" data-id="${jasmim_Id}">
                                <td colspan="8">
                                    <table class="table">
                                        <tr>
                                            <th>Paciênte</th>
                                            <td>${row.nm_paciente || 'Não especificado'}</td>
                                        </tr>
                                        <tr>
                                            <th>Anexo adulto</th>
                                            <td>${observacaoAdulto || 'Não especificado'}</td>
                                        </tr>
                                        <tr>
                                            <th>Anexo RN</th>
                                            <td>${observacaoRN || 'Não especificado'}</td>
                                        </tr>
                                        <tr>
                                            <th>Atendimento</th>
                                            <td>${row.nr_atendimento || 'Não especificado'}</td>
                                        </tr>
                                        <tr>
                                            <th>Setor de atendimento</th>
                                            <td>${row.cd_setor_atendimento || 'Não especificado'}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>`;
                        const currentRow = $(event.currentTarget).closest('tr');
                        currentRow.after(novaDetalhesTr);

                        this.setupImageButtons('.detalhes-jasmin');
                    }
                });
            },
            rowCallback: function (row, data) {
                if (data.dt_alta !== null) {
                    $(row).hide();
                }
            },
            initComplete: function () {
                $('#loadingOverlayLab').hide();
            },
        });
    }
    fetchDataAndAddTableJasmim() {
        $.ajax({
            url: 'http://10.20.20.207/tasy/api/mapa_internacao_jasmim.php',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function (response) {
                if (response && response.length > 0) {
                    response.forEach(function (data) {
                        checkIfExistsAndUpdateOrAdd(data);
                    });
                }
            },
            error: function (error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
        function checkIfExistsAndUpdateOrAdd(data) {
            addData(data);
        }
        function addData(data) {
            $.ajax({
                url: 'http://10.1.1.108/intranet/src/services/api/adicionar/add_espaco_jasmim.php',
                type: 'POST',
                dataType: 'json',
                data: formatData(data),
                success: function (response) {
                    atualizarData(data);
                    console.log('Adicionado com sucesso');
                },
                error: function (xhr, status, error) {
                    console.error('Erro na adição:', error);
                }
            });
        }
        const atualizarData = (data) => {
            $.ajax({
                url: 'http://10.1.1.108/intranet/src/services/api/editar/edit_espaco_jasmim.php',
                type: 'POST',
                dataType: 'json',
                data: formatData(data),
                success: () => {
                    console.log('Atualizado com sucesso');
                }, finally: () => {
                },
                error: function (xhr, status, error) {
                    console.error('Erro na atualização:', error.length);
                }
            });
        }
        function formatData(data) {
            return {
                nr_atendimento: data.NR_ATENDIMENTO,
                nm_paciente: data.NOME,
                ds_leito: data.LEITO,
                ds_idade: data.IDADE,
                dt_parto: Utils.formatarDataParaEnvio(data.DT_PARTO),
                dt_admissao: Utils.formatarDataParaEnvio(data.DT_ENTRADA),
                ds_dieta: data.DIETA,
                ds_fugulin: data.FUGULIN,
                ds_medicamentos: data.MEDICAMENTOS,
                ds_procedimentos: data.PROCEDIMENTOS,
                ds_transfusao: data.TRANSFUSAO,
                ds_alergias: data.ALERGIAS,
                ds_parto: data.PARTO,
                ds_recomendacoes: data.RECOMENDACOES,
                ds_medicamentosRn: data.MEDICAMENTOSRN,
                ds_procedimentosRn: data.PROCEDIMENTOSRN,
                ds_transfusaoRn: data.TRANSFUSAORN,
                ds_alergiasRn: data.ALERGIASRN,
                ds_recomendacoesRn: data.RECOMENDACOESRN,
                cd_setor_atendimento: data.CD_SETOR_ATENDIMENTO,
                feto: data.FETO,
                braden_morse: data.BRADEN,
                dt_escalas: Utils.formatarDataParaEnvio(data.ESCALA),
                dt_sae_rn: Utils.formatarDataParaEnvio(data.SAE_RN),
                dt_alta: Utils.formatarDataParaEnvio(data.DT_ALTA),
            };
        }
    }

    renderOcupacaoJasmim(data) {
        if ($.fn.DataTable.isDataTable('#tableOcupacaoJasmim')) {
            $('#tableOcupacaoJasmim').DataTable().destroy();
        }
        const tableOcupacaoJasmim = $('#tableOcupacaoJasmim').DataTable({
            data: data,
            columns: [
                {
                    data: 'CD_UNIDADE', title: 'Leito'
                },
                { data: 'STATUS_UNIDADE', title: 'Status' },
                { data: 'NM_PESSOA_FISICA', title: 'Paciênte' },
                { data: 'NR_ATENDIMENTO_SUP', title: 'Atendimento' },
                { data: 'NM_PACIENTE_RESERVA', title: 'Paciênte reservado' },
                { data: 'DT_ENTRADA_HOSP', title: 'Entrada unidade' },
                { data: 'NR_IDADE', title: 'Idade Paciênte' },
                { data: 'DS_TIPO_ACOMODACAO', title: 'Tipo acomodação' },
                { data: 'DT_ALTA', title: 'Data alta' },
                { data: 'DS_DIAGNOSTICO', title: 'Diagnostico' },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 60,
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
            },
            initComplete: function () {
                $('#loadingOverlayLab').hide();
            },
        });
    }

    renderEspacoRosa(data) {
        if (!Array.isArray(data)) {
            console.error('Data inválida:', data);
            return;
        }
        if ($.fn.DataTable.isDataTable('#tableMapaInternacaoRosa')) {
            if ($('.modal').is(':visible')) {
                console.log('modal aberto');
                return;
            } else {
                $('#tableMapaInternacaoRosa').DataTable().destroy();
                this.dataModel.fetchData('http://10.1.1.108/intranet/src/services/api/espacoJasmin.php', this.renderEspacoRosa);
            }

        }
        $('#loadingOverlayLab').show();
        const filteredData = data.filter(row => !row.dt_alta && row.cd_setor_atendimento);
        const tableMapaInternacaoRosa = $('#tableMapaInternacaoRosa').DataTable({
            data: filteredData,
            columns: [
                {
                    data: 'ds_leito', title: 'Leito',
                    render: function (data, type, row) {
                        return `
                            <div class="arquivo-cell">
                                <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-rosa-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                                ${data}
                            </div>
                        `;
                    },
                },
                {
                    data: null,
                    title: 'Alergias',
                    render: function (data, type, row) {
                        const alergiasNotEmpty = row.ds_alergias && row.ds_alergias.trim() !== '';
                        if (alergiasNotEmpty) {
                            const alergias = row.ds_alergias.trim();
                            return `
                            <div class="badge bg-danger" style="padding: 5px;" data-bs-toggle="tooltip" title="${alergias}" data-bs-content="${alergias}">
                                <i class="fa fa-info-circle"></i>Alergias
                             </div>
                             `;
                        } else {
                            return '';
                        }
                    },
                },
                {
                    data: 'nm_paciente', title: 'Paciente',
                    "render": function (data, type, row, meta) {
                        if (data.length > 18) {
                            return data.substr(0, 18) + '...';
                        } else {
                            return data;
                        }
                    }
                },
                { data: 'ds_idade', title: 'Idade' },
                {
                    data: 'dt_admissao',
                    title: 'Data admissão',
                    render: function (data, type, row) {
                        return data ? Utils.formatarDataHora(data) : 'Não definido';
                    }
                },
                {
                    data: 'dt_parto',
                    title: 'Data parto',
                    render: function (data, type, row) {
                        return data ? Utils.formatarDataHora(data) + ' ' + `<span class="badge badge-info">${row.ds_parto}</span>` : 'Não definido';
                    }
                },
                {
                    data: 'ds_dieta', title: 'Dieta',
                    render: function (data, type, row) {
                        return data == '' ? 'Não definido' : data;
                    }
                },
                {
                    data: 'ds_observacao_aduto',
                    title: 'Observação Adulto',
                    render: function (data, type, row) {
                        const observacaoAdulto = Utils.removeImages(row.ds_observacao_aduto).trim();
                        let result = `<div class="break-word"> ${observacaoAdulto}`;
                        const ds_transfusao = Utils.pularLinhaString(row.ds_transfusao).trim();
                        if (ds_transfusao) {
                            result += `<div style='color: #6d0101; -webkit-background-clip: text; background-clip: text; title="Transfusão">${ds_transfusao}</div>`;
                        }
                        return result;
                    }
                },
                {
                    data: 'ds_observacao_rn', title: 'Observação RN',
                    render: function (data, type, row) {
                        const observacaoRn = Utils.removeImages(row.ds_observacao_rn).trim();
                        const ds_transfusaoRn = Utils.pularLinhaString(row.ds_transfusaoRn).trim();
                        const ds_feto = row.feto
                        console.log(ds_feto);

                        let result = `<div class="break-word"> ${observacaoRn}`;


                        if (ds_transfusaoRn) {
                            result += `<div style='color: #6d0101; -webkit-background-clip: text; background-clip: text; title="Transfusão RN">${ds_transfusaoRn}</div>`;
                        }
                        if (ds_feto) {
                            result += `<div>${ds_feto}</div>`;
                        }
                        result += `</div>`;

                        return result;
                    }

                },
                {
                    data: 'ds_fugulin',
                    title: 'Fugulin',
                    "render": function (data, type, row, meta) {
                        var abbreviations = {
                            "Cuidados de Alta Dependência": "AD",
                            "Cuidados Mínimos": "CM",
                            "Cuidados Intermediários": "ITM",
                            "Cuidados Semi-Intensivos": "SI",
                            "": "---"
                        };
                        if (abbreviations.hasOwnProperty(data)) {
                            return abbreviations[data];
                        }
                        else {
                            if (data.length > 18) {
                                return data.substr(0, 18) + '...';
                            } else {
                                return data;
                            }
                        }
                    }
                },

                {
                    data: 'braden_morse',
                    title: 'Data Braden/Morse/SAE',
                    render: function (data, type, row) {
                        return data ? Utils.pularLinhaString(data) : 'Não definido';
                    }
                },
                {
                    data: 'dt_sae_rn',
                    title: 'Data SAE/RN',
                    render: function (data, type, row) {
                        return data ? Utils.formatarDataHora(data) : 'Não definido';
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                            <div class="dropdown button-table">
                                <button class="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item btn-visualizar-mapa-rosa" data-id="${row.nr_atendimento}">Visualizar</button></li>
                                    <li><button class="dropdown-item btn-editar-mapa-rosa" data-id="${row.nr_atendimento}">Editar</button></li>
                                </ul>
                            </div>
                        `;
                    },
                }
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 60,
            drawCallback: () => {
                $(document).ready(function () {
                    const bindClickEvent = () => {
                        $('#tableMapaInternacaoRosa').on('click', 'td', function (event) {
                            const target = $(event.target);
                            const columnIndex = target.index();
                            const targetColumnIndex = $('#tableMapaInternacaoRosa th:contains("Paciente")').index();
                            if (columnIndex === targetColumnIndex) {
                                const tr = target.closest('tr');
                                if (!target.hasClass('btn')) {
                                    tr.find('.btn-editar-mapa-rosa').trigger('click');
                                }
                            }
                        });
                    }
                    bindClickEvent();
                    const bindHoverEvent = () => {
                        const targetColumnIndex = $('#tableMapaInternacaoRosa th:contains("Paciente")').index();
                        $('#tableMapaInternacaoRosa').on('mouseover', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function (event) {
                            $(this).css('cursor', 'pointer');
                        });

                        $('#tableMapaInternacaoRosa').on('mouseleave', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function (event) {

                            $(this).css('cursor', 'auto');
                        });
                    };

                    bindHoverEvent();
                });
                $('#tableMapaInternacaoRosa').on('click', '.btn-visualizar', (event) => {
                    event.stopPropagation();
                    const jasmim_Id = $(event.currentTarget).data('id');
                    const rowIndex = tableMapaInternacaoRosa.row($(event.currentTarget).closest('tr')).index();
                    const row = tableMapaInternacaoRosa.rows(rowIndex).data()[0];
                    const detalhesTr = $(`tr.detalhes-rosa[data-rosa-id="${jasmim_Id}"]`);

                    if (detalhesTr.length) {
                        detalhesTr.remove();
                    } else {
                        const observacaoAdulto = Utils.replaceImgWithButton(row.ds_observacao_aduto);
                        const observacaoRN = Utils.replaceImgWithButton(row.ds_observacao_rn);
                        const novaDetalhesTr = `
                            <tr class="detalhes-rosa" data-rosa-id="${jasmim_Id}">
                                <th colspan="8">Detalhes</th>
                            </tr>
                            <tr class="detalhes-rosa" data-rosa-id="${jasmim_Id}">
                                <td colspan="8">
                                    <table class="table">
                                        <tr>
                                            <th>Anexo adulto</th>
                                            <td>${observacaoAdulto || 'Não especificado'}</td>
                                        </tr>
                                        <tr>
                                            <th>Anexo RN</th>
                                            <td>${observacaoRN || 'Não especificado'}</td>
                                        </tr>
                                        <tr>
                                            <th>Atendimento</th>
                                            <td>${row.nr_atendimento || 'Não especificado'}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>`;
                        const currentRow = $(event.currentTarget).closest('tr');
                        currentRow.after(novaDetalhesTr);

                        this.setupImageButtons('.detalhes-rosa');
                    }
                });
            },
            rowCallback: function (row, data) {
                if (data.dt_alta !== null) {
                    $(row).hide();
                }
            },
            initComplete: function () {
                $('#loadingOverlayLab').hide();
            },
        });
    }

    renderOcupacaoRosa(data) {
        const tableId = '#tableOcupacaoRosa';
        if ($.fn.dataTable.isDataTable(tableId)) {
            $(tableId).DataTable().destroy();
        }
        const tableOcupacaoRosa = $('#tableOcupacaoRosa').DataTable({
            data: data,
            columns: [
                { data: 'CD_UNIDADE', title: 'Leito' },
                { data: 'STATUS_UNIDADE', title: 'Status' },
                { data: 'NM_PESSOA_FISICA', title: 'Paciênte' },
                { data: 'NR_ATENDIMENTO_SUP', title: 'Atendimento' },
                { data: 'NM_PACIENTE_RESERVA', title: 'Paciênte reservado' },
                { data: 'DT_ENTRADA_HOSP', title: 'Entrada unidade' },
                { data: 'NR_IDADE', title: 'Idade Paciênte' },
                { data: 'DS_TIPO_ACOMODACAO', title: 'Tipo acomodação' },
                { data: 'DT_ALTA', title: 'Data alta' },
                { data: 'DS_DIAGNOSTICO', title: 'Diagnostico' },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Portuguese-Brasil.json',
            },
            columnDefs: [
                { targets: '_all', className: 'align-middle' },
                { targets: [0], orderable: true, order: 'desc' },
            ],
            order: [[0, 'asc']],
            buttons: ['copy', 'csv', 'print'],
            pageLength: 60,
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
            },
            initComplete: function () {
                $('#loadingOverlayLab').hide();
            },
        });
    }

    setupImageButtons(className) {
        $(className).on('click', '.image-button', function () {
            const imgSrc = $(this).data('img-src');
            if (imgSrc) {
                const options = {
                    src: imgSrc,
                    type: 'image',
                    buttons: [
                        'download',
                        'close'
                    ]
                };
                $.fancybox.open(options);
            }
        });
    }
}

export default View;