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
                        </div>
                    `;
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

    /////////////////////Plano ação /////////////////////////////////

    renderPlanoAcao() {
        $(document).ready(function () {
            var textarea = $('.analiseResult');
            var textarea2 = $('.planoAcaoResult');
            let id = $('#solicitacaoTransf').val();
            $.ajax({
                url: `http://10.1.1.108/intranet/src/services/api/indicador.php?id=${id}`,
                dataType: "json",
                data: {
                    result: 'json'
                },
                success: function (data) {
                    if (data.error) {
                        console.error('Erro ao buscar:', data.error);
                        textarea.val("Nenhum resultado encontrado");
                    } else {
                        var formattedText = "";
                        var formattedText2 = "";
                        data.forEach(function (item) {
                            formattedText += "Data do Indicador: " + item.dt_indicador + "\n";
                            formattedText += "Análise do Indicador: " + item.analise_indicador + "\n\n";
                        });
                        data.forEach(function (item2) {
                            formattedText2 += "Data do Indicador: " + item2.dt_indicador + "\n";
                            formattedText2 += "Plano de Ação Indicado: " + item2.plano_acao_indicador + "\n\n";
                        });
                        textarea.val(formattedText);
                        textarea2.val(formattedText2);
                    }
                },
                error: function () {
                    console.error('Erro ao buscar. Servidor indisponível.');
                    textarea.val("Nenhum resultado encontrado");
                }
            });
        });
    }
    renderTextArea() {
        const selectors = [
            '#percSolicTrans-dash-tab',
            '#transRealTurno-dash-tab',
            '#tempMedioTrans-dash-tab'
        ];
        selectors.forEach(selector => {
            const element = document.querySelector(selector);
            element.addEventListener('click', () => {
                this.renderPlanoAcao();
            });
        });
        this.renderPlanoAcao();
    }


    renderSolicitacaoTransfusionalFitro(data) {
        const renderData = (data) => {
            this.renderSolicitacaoTransfusional(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar-grafico-solicitacao');

            btn.on('click', () => {
                let dtInicial = $('.dtInicial-solicitacao').val();
                let dtFinal = $('.dtFinal-solicitacao').val();
                if (dtInicial && dtFinal) {
                    let url = `http://10.20.20.207/tasy/api/solicitacoes_tranfusionais.php?dtInicial=${dtInicial}&dtFinal=${dtFinal}`;
                    this.dataModel.fetchData(url, (newData) => {
                        renderData(newData);
                    });
                } else {
                    console.log("Por favor, preencha as datas corretamente.");
                }
            });
        });
    }

    renderTransfRealizadasFitro(data) {
        const renderData = (data) => {
            this.renderTransfRealizadas(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar-grafico-transfusao-turno');

            btn.on('click', () => {
                let dtInicial = $('.dtInicial-transfusao-turno').val();
                let dtFinal = $('.dtFinal-transfusao-turno').val();
                if (dtInicial && dtFinal) {
                    let url = `http://10.20.20.207/tasy/api/transfusoes_realizadas.php?dtInicial=${dtInicial}&dtFinal=${dtFinal}`;
                    this.dataModel.fetchData(url, (newData) => {
                        renderData(newData);
                    });
                } else {
                    console.log("Por favor, preencha as datas corretamente.");
                }
            });
        });
    }

    renderTempoMedioTransfFitro(data) {
        const renderData = (data) => {
            this.renderTempoMedioTransf(data);
        };
        renderData(data);
        $(document).ready(() => {
            let btn = $('.btn-gerar-grafico-tempo');

            btn.on('click', () => {
                let dtInicial = $('.dtInicial-tempo').val();
                let dtFinal = $('.dtFinal-tempo').val();
                if (dtInicial && dtFinal) {
                    let url = `http://10.20.20.207/tasy/api/tempo_transf.php?dtInicial=${dtInicial}&dtFinal=${dtFinal}`;
                    this.dataModel.fetchData(url, (newData) => {
                        renderData(newData);
                    });
                } else {
                    console.log("Por favor, preencha as datas corretamente.");
                }
            });
        });
    }

    renderSolicitacaoTransfusional(data) {
        this.renderTextArea();
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
                ['Mes-Ano', 'Programada eletiva', 'Não Urgente', 'Urgente', 'Extrema urgência',],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.programada_eletiva),
                    parseFloat(item.nao_urgente),
                    parseFloat(item.urgente),
                    parseFloat(item.extrema),
                ]),
            ];

            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
                title: 'Solicitações transfusionais',
                vAxis: { title: 'Porcentagem' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' },
                    1: { color: '#007dc6' },
                    2: { color: '#f2e839' },
                    3: { color: '#c60000' }
                },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },

            };
            var chart = new google.visualization.ComboChart(document.getElementById('chart-SolicTransf'));
            chart.draw(data, options);
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

    renderTransfRealizadas(data) {
        this.renderTextArea();
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
                ['Mes-Ano', 'Noturno', 'Diurno',],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.noturno),
                    parseFloat(item.diurno),
                ]),
            ];

            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
                title: 'Transfusões realizadas',
                vAxis: { title: 'Porcentagem' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#007dc6' },
                    1: { color: '#7d0087' },
                },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },
            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTransfTurno'));
            chart.draw(data, options);
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

    renderTempoMedioTransf(data) {
        this.renderTextArea();
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
                ['Mes-Ano', 'Programada eletiva', 'Não Urgente', 'Urgente', 'Extrema urgência'],
                ...conteudoArray.map(item => [
                    Utils.formatoMesAno(item.mesAno),
                    parseFloat(item.programada_eletiva),
                    parseFloat(item.nao_urgente),
                    parseFloat(item.urgente),
                    parseFloat(item.extrema)
                ]),
            ];

            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
                title: 'Solicitações transfusionais',
                vAxis: { title: 'Tempo' },
                hAxis: { title: 'Mês-Ano' },
                seriesType: 'bars',
                bar: { groupWidth: "80%" },
                series: {
                    0: { color: '#7d0087' },
                    1: { color: '#007dc6' },
                    2: { color: '#f2e839' },
                    3: { color: '#c60000' }
                },
                chartArea: {
                    width: '75%',
                    height: '80%'
                },

            };
            var chart = new google.visualization.ComboChart(document.getElementById('chartTempMedioTransf'));
            chart.draw(data, options);
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
    renderGraficos(data) {
        const tableAnalise = $('#tableAnalise').DataTable({
            data: data,
            columns: [
                {
                    data: 'dt_indicador', title: 'Data',
                    render: function (data, type, row) {
                        return `
                            <div class="arquivo-cell">
                                <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-jasmin-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                                ${data}
                            </div>`;
                    },
                },
                { data: 'analise_indicador', title: 'Análise' },
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
            pageLength: 500,
            drawCallback: function () {

            },
            rowCallback: function (row, data) {

            },
            initComplete: function () {

            },
        });
        $('#tableAnalise').on('click', '.btn-visualizar', function () {
            const analiseId = $(this).data('analise-id');
            const detalhesTr = $(`tr.detalhes-analise[data-analise-id="${analiseId}"]`);

            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const rowIndex = tableAnalise.row($(this).closest('tr')).index();
                const rowData = tableAnalise.row(rowIndex).data();

                if (rowData) {
                    const novaDetalhesTr = `
                        <tr class="detalhes-analise" data-analise-id="${analiseId}">
                            <td colspan="8">
                                <table class="table">
                                    <tr> 
                                        <th>Anexo</th>
                                        <td> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>`;
                    $(this).closest('tr').after(novaDetalhesTr);
                }
            }
        });
        const planoAcaoResult = $('#planoAcaoResult').DataTable({
            data: data,
            columns: [
                {
                    data: 'dt_indicador', title: 'Data',
                    render: function (data, type, row) {
                        return `
                            <div class="arquivo-cell">
                                <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-jasmin-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                                ${data}
                            </div>`;
                    },
                },
                { data: 'plano_acao_indicador', title: 'Plano de Ação' },
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
            pageLength: 500,
            drawCallback: function () {
                /*  $('[data-toggle="tooltip"]').tooltip(); */
            },
            rowCallback: function (row, data) {

            },
            initComplete: function () {

            },
        });
        $('#planoAcaoResult').on('click', '.btn-visualizar', function () {
            const planoAcaoResultId = $(this).data('planoAcaoResult-id');
            const detalhesTr = $(`tr.detalhes-planoAcaoResult[data-planoAcaoResult-id="${planoAcaoResultId}"]`);

            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const rowIndex = planoAcaoResult.row($(this).closest('tr')).index();
                const rowData = planoAcaoResult.row(rowIndex).data();

                if (rowData) {
                    const novaDetalhesTr = `
                        <tr class="detalhes-planoAcaoResult" data-planoAcaoResult-id="${planoAcaoResultId}">
                            <td colspan="8">
                                <table class="table">
                                    <tr> 
                                        <th>Anexo</th>
                                        <td> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>`;
                    $(this).closest('tr').after(novaDetalhesTr);
                }
            }
        });
    }

    //////////////////////Mapa de risco jasmim e rosa////////////////////////////////////
    renderEspacoJasmin(data) {
        if (!Array.isArray(data)) {
            console.error('Data inválida:', data);
            return;
        }
        if ($.fn.DataTable.isDataTable('#tableMapaInternacaoJasmin')) {
            if ($('#modalMapaJasminEdit').is(':visible')) {
                console.log('modal aberto');
                return;
            } else {
                if ($.fn.DataTable.isDataTable('#tableMapaInternacaoJasmin')) {
                    $('#tableMapaInternacaoJasmin').DataTable().destroy();
                }
                Swal.fire({
                    title: 'Novas informações disponíveis!',
                    text: 'Deseja atualizar a página para ver as mudanças?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        }        
        $('#loadingOverlayLab').show();
        const filteredData = data.filter(row => !row.dt_alta);
        console.log(filteredData);
        const tableMapaInternacaoJasmin = $('#tableMapaInternacaoJasmin').DataTable({
            data: filteredData,
            columns: [
                {
                    data: 'ds_leito', title: 'Leito',
                    render: function (data, type, row) {
                        return `
                            <div class="arquivo-cell">
                                <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-jasmin-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                                ${data}
                            </div>
                        `;
                    },
                },
                {
                    data: null,
                    title: 'CPOE',
                    render: function (data, type, row) {
                        const uniqueId = `offcanvasTop-${row.nr_atendimento}`;
                        const alergiasNotEmpty = row.ds_alergias && row.ds_alergias.trim() !== '';
                        const buttonClass = alergiasNotEmpty ? 'btn btn-warning' : 'btn-default';
                        const iconClass = alergiasNotEmpty ? 'ni ni-sound-wave' : 'ni ni-sound-wave';
                
                        return `
                            <button class="btn btn-block ${buttonClass} mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#${uniqueId}" aria-controls="${uniqueId}">
                                <i class="${iconClass}"></i>
                            </button>
                            <div class="offcanvas offcanvas-top" tabindex="-1" id="${uniqueId}" aria-labelledby="${uniqueId}Label">
                              <div class="offcanvas-header">
                                <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                              </div>
                              <div class="offcanvas-body">
                              <div class="container-fluid">
                                  <h5 id="offcanvasTopLabel">Detalhes Adulto</h5>
                                  <div class="row">
                                  <div class="col-md-3">
                                      <h5 class="h5">Medicamentos</h5>
                                      ${Utils.pularLinhaString(row.ds_medicamentos)}
                                  </div>
                                  <div class="col-md-3">
                                      <h5 class="h5">Exames e Procedimentos</h5>
                                      ${Utils.pularLinhaString(row.ds_procedimentos)}
                                  </div>
                                  <div class="col-md-2">
                                  <h5 class="h5">Alergias</h5>
                                  ${Utils.pularLinhaString(row.ds_alergias)}
                                  </div>
                                  <div class="col-md-2">
                                      <h5 class="h5">Transfusão</h5>
                                      ${Utils.pularLinhaString(row.ds_transfusao)}
                                  </div>
                                  <div class="col-md-2">
                                      <h5 class="h5">Recomendções</h5>
                                      ${Utils.pularLinhaString(row.ds_recomendacoes)}
                                  </div>
                                  </div>
                              </div>
                            </div>

                              <div class="offcanvas-body">
                                <div class="container-fluid">
                                    <h5 id="offcanvasTopLabel">Detalhes RN</h5>
                                    <div class="row">
                                    <div class="col-md-3">
                                        <h5 class="h5">Medicamentos</h5>
                                        ${Utils.pularLinhaString(row.ds_medicamentosRn)}
                                    </div>
                                    <div class="col-md-3">
                                        <h5 class="h5">Exames e Procedimentos</h5>
                                        ${Utils.pularLinhaString(row.ds_procedimentosRn)}
                                    </div>
                                    <div class="col-md-2">
                                    <h5 class="h5">Alergias</h5>
                                    ${Utils.pularLinhaString(row.ds_alergiasRn)}
                                    </div>
                                    <div class="col-md-2">
                                        <h5 class="h5">Transfusão</h5>
                                        ${Utils.pularLinhaString(row.ds_transfusaoRn)}
                                    </div>
                                    <div class="col-md-2">
                                        <h5 class="h5">Recomendções</h5>
                                        ${Utils.pularLinhaString(row.ds_recomendacoesRn)}
                                    </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                        `;
                    },
                },                               
                {
                    data: 'nm_paciente', title: 'Paciente'
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
                        return data ? Utils.formatarDataHora(data) +' '+row.ds_parto : 'Não definido';
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
                        const observacaoAdulto = Utils.removeImages(row.ds_observacao_aduto);
                        const dsMedicamentos = Utils.pularLinhaString(row.ds_medicamentos);
                        const dsAlergias = Utils.pularLinhaString(row.ds_alergias)
                        const dsTransfusao = Utils.pularLinhaString(row.ds_transfusao)
                        const ds_procedimento = Utils.pularLinhaString(row.ds_procedimentos)
                        return `<div class="break-word"> ${observacaoAdulto} <div style='background:#7f3b8a9c;'>${dsMedicamentos}</div> <div style='background:#ffcd05;'>${dsAlergias}</div> <div style='background:red;'>${dsTransfusao}</div> <div style='background:#1070ffdb;'>${ds_procedimento}</div></div>`;
                    }
                }
                ,
                {
                    data: 'ds_observacao_rn', title: 'Observação RN',
                    render: function (data, type, row) {
                        const observacaoRn = Utils.removeImages(row.ds_observacao_rn);
                        const dsMedicamentosRn = Utils.pularLinhaString(row.ds_medicamentosRn);
                        const dsAlergiasRn = Utils.pularLinhaString(row.ds_alergiasRn)
                        const dsTransfusaoRn = Utils.pularLinhaString(row.ds_transfusaoRn)
                        const ds_procedimentoRn = Utils.pularLinhaString(row.ds_procedimentosRn)
                        return `<div class="break-word"> ${observacaoRn} <div style='background:#7f3b8a9c;'>${dsMedicamentosRn}</div> <div style='background:#ffcd05;'>${dsAlergiasRn}</div> <div style='background:red;'>${dsTransfusaoRn}</div> <div style='background:#1070ffdb;'>${ds_procedimentoRn}</div></div>`;
                    }
                },
                {
                    data: 'ds_fugulin',
                    title: 'Fugulin',
                    render: function (data, type, row) {
                        return data == '' ? 'Não definido' : data;
                    }
                },
                {
                    data: 'dt_escalas',
                    title: 'Data Braden/Morse/SAE',
                    render: function (data, type, row) {
                        return data ? Utils.formatarDataHora(data) : 'Não definido';
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
            drawCallback: () => {$(document).ready(function() {
                const bindClickEvent = () => {
                    $('#tableMapaInternacaoJasmin').on('click', 'td', function(event) {
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
                    $('#tableMapaInternacaoJasmin').on('mouseover', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function(event) {
                        $(this).css('cursor', 'pointer'); 
                    });
            
                    $('#tableMapaInternacaoJasmin').on('mouseleave', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function(event) {

                        $(this).css('cursor', 'auto'); 
                    });
                };
            
                bindHoverEvent();
            });
            
            
                $('#tableMapaInternacaoJasmin').on('click', '.btn-visualizar', (event) => {
                    event.stopPropagation(); 
                    if ($(event.target).hasClass('btn')) {
                        return;
                    }
                    const jasmim_Id = $(event.currentTarget).data('id');
                    const rowIndex = tableMapaInternacaoJasmin.row($(event.currentTarget).closest('tr')).index();
                    const row = tableMapaInternacaoJasmin.rows(rowIndex).data()[0];
                    const detalhesTr = $(`tr.detalhes-jasmin[data-jasmin-id="${jasmim_Id}"]`);
            
                    if (detalhesTr.length) {
                        detalhesTr.remove();
                    } else {
                        const observacaoAdulto = Utils.replaceImgWithButton(row.ds_observacao_aduto);
                        const observacaoRN = Utils.replaceImgWithButton(row.ds_observacao_rn);
                        const novaDetalhesTr = `
                            <tr class="detalhes-jasmin" data-jasmin-id="${jasmim_Id}">
                                <th colspan="8">Detalhes</th>
                            </tr>
                            <tr class="detalhes-jasmin" data-jasmin-id="${jasmim_Id}">
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
                                            <th>Enfermeira</th>
                                            <td>${row.nm_usuario || 'Não especificado'}</td>
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

        this.fetchDataAndAddTableJasmim();
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
                    console.error('Erro na atualização:', error);
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
                dt_escalas: Utils.formatarDataParaEnvio(data.ESCALA),
                dt_sae_rn: Utils.formatarDataParaEnvio(data.SAE_RN),
                dt_alta: Utils.formatarDataParaEnvio(data.DT_ALTA),
            };
        }

    }


    renderOcupacaoJasmim(data) {
        const tableOcupacaoJasmim = $('#tableOcupacaoJasmim').DataTable({
            data: data,
            columns: [
                {
                    data: 'CD_UNIDADE', title: 'Leito',
                    render: function (data, type, row) {
                        return `
                        <div class="arquivo-cell">
                            <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-jasmin-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                            ${data}
                        </div>
                        `;
                    },
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
        $('#tableOcupacaoJasmim').on('click', '.btn-visualizar', (event) => {
            const jasmimId = $(event.currentTarget).data('id');
            const rowIndex = tableOcupacaoJasmim.row($(event.currentTarget).closest('tr')).index();
            const row = tableOcupacaoJasmim.rows(rowIndex).data()[0];
            const detalhesTr = $(`tr.detalhes-ocupacao-jasmin[data-ocupacao-jasmin-id="${jasmimId}"]`);

            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const novaDetalhesTr = `
                    <tr class="detalhes-ocupacao-jasmin" data-ocupacao-jasmin-id="${jasmimId}">
                        <td colspan="8">
                            <table class="table">
                                <tr> 
                                    <th>DIAGNOSTICO</th>
                                    <td>${row.DS_DIAGNOSTICO}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
                const currentRow = $(event.currentTarget).closest('tr');
                currentRow.after(novaDetalhesTr);
                this.setupImageButtons('.detalhes-ocupacao-jasmin');
            }
        });

        this.startUpdatingJasmim();

        setTimeout(() => {
            this.stopUpdating();
        }, 60000);

    }

    startUpdatingJasmim() {
        this.intervalId = setInterval(() => {
            const tableOcupacaoJasmim = $('#tableOcupacaoJasmim').DataTable();
            if (tableOcupacaoJasmim) {
                tableOcupacaoJasmim.destroy();
            }
            this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_jasmim.php', this.renderOcupacaoJasmim);
        }, 60000);
    }

    stopUpdating() {
        clearInterval(this.intervalId);
        this.startUpdatingJasmim();
    }

    //Rosa
    renderEspacoRosa(data) {
        console.log(data);
        if (!Array.isArray(data)) {
            console.error('Data inválida:', data);
            return;
        }
        if ($.fn.DataTable.isDataTable('#tableMapaInternacaoRosa')) {
            if ($('#modalMapaRosaEdit').is(':visible')) {
                console.log('modal aberto');
                return;
            } else {
                if ($.fn.DataTable.isDataTable('#tableMapaInternacaoRosa')) {
                    $('#tableMapaInternacaoRosa').DataTable().destroy();
                }
                Swal.fire({
                    title: 'Novas informações disponíveis!',
                    text: 'Deseja atualizar a página para ver as mudanças?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        }        
        $('#loadingOverlayLab').show();
        const filteredData = data.filter(row => !row.dt_alta);
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
                    title: 'CPOE',
                    render: function (data, type, row) {
                        const uniqueId = `offcanvasTop-${row.nr_atendimento}`;
                        const alergiasNotEmpty = row.ds_alergias && row.ds_alergias.trim() !== '';
                        const buttonClass = alergiasNotEmpty ? 'btn btn-warning' : 'btn-default';
                        const iconClass = alergiasNotEmpty ? 'ni ni-sound-wave' : 'ni ni-sound-wave';
                
                        return `
                            <button class="btn btn-block ${buttonClass} mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#${uniqueId}" aria-controls="${uniqueId}">
                                <i class="${iconClass}"></i>
                            </button>
                            <div class="offcanvas offcanvas-top" tabindex="-1" id="${uniqueId}" aria-labelledby="${uniqueId}Label">
                              <div class="offcanvas-header">
                                <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                              </div>
                              <div class="offcanvas-body">
                              <div class="container-fluid">
                                  <h5 id="offcanvasTopLabel">Detalhes Adulto</h5>
                                  <div class="row">
                                  <div class="col-md-3">
                                      <h5 class="h5">Medicamentos</h5>
                                      ${Utils.pularLinhaString(row.ds_medicamentos)}
                                  </div>
                                  <div class="col-md-3">
                                      <h5 class="h5">Exames e Procedimentos</h5>
                                      ${Utils.pularLinhaString(row.ds_procedimentos)}
                                  </div>
                                  <div class="col-md-2">
                                  <h5 class="h5">Alergias</h5>
                                  ${Utils.pularLinhaString(row.ds_alergias)}
                                  </div>
                                  <div class="col-md-2">
                                      <h5 class="h5">Transfusão</h5>
                                      ${Utils.pularLinhaString(row.ds_transfusao)}
                                  </div>
                                  <div class="col-md-2">
                                      <h5 class="h5">Recomendções</h5>
                                      ${Utils.pularLinhaString(row.ds_recomendacoes)}
                                  </div>
                                  </div>
                              </div>
                            </div>

                              <div class="offcanvas-body">
                                <div class="container-fluid">
                                    <h5 id="offcanvasTopLabel">Detalhes RN</h5>
                                    <div class="row">
                                    <div class="col-md-3">
                                        <h5 class="h5">Medicamentos</h5>
                                        ${Utils.pularLinhaString(row.ds_medicamentosRn)}
                                    </div>
                                    <div class="col-md-3">
                                        <h5 class="h5">Exames e Procedimentos</h5>
                                        ${Utils.pularLinhaString(row.ds_procedimentosRn)}
                                    </div>
                                    <div class="col-md-2">
                                    <h5 class="h5">Alergias</h5>
                                    ${Utils.pularLinhaString(row.ds_alergiasRn)}
                                    </div>
                                    <div class="col-md-2">
                                        <h5 class="h5">Transfusão</h5>
                                        ${Utils.pularLinhaString(row.ds_transfusaoRn)}
                                    </div>
                                    <div class="col-md-2">
                                        <h5 class="h5">Recomendções</h5>
                                        ${Utils.pularLinhaString(row.ds_recomendacoesRn)}
                                    </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                        `;
                    },
                },     
                {
                    data: 'nm_paciente', title: 'Paciente'
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
                        return data ? Utils.formatarDataHora(data) +' '+row.ds_parto : 'Não definido';
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
                        const observacaoAdulto = Utils.removeImages(row.ds_observacao_aduto);
                        const dsMedicamentos = Utils.pularLinhaString(row.ds_medicamentos);
                        const dsAlergias = Utils.pularLinhaString(row.ds_alergias)
                        const dsTransfusao = Utils.pularLinhaString(row.ds_transfusao)
                        const ds_procedimento = Utils.pularLinhaString(row.ds_procedimentos)
                        return `<div class="break-word"> ${observacaoAdulto} <div style='background:#7f3b8a9c;'>${dsMedicamentos}</div> <div style='background:#ffcd05;'>${dsAlergias}</div> <div style='background:red;'>${dsTransfusao}</div> <div style='background:#1070ffdb;'>${ds_procedimento}</div></div>`;
                    }
                }
                ,
                {
                    data: 'ds_observacao_rn', title: 'Observação RN',
                    render: function (data, type, row) {
                        const observacaoRn = Utils.removeImages(row.ds_observacao_rn);
                        const dsMedicamentosRn = Utils.pularLinhaString(row.ds_medicamentosRn);
                        const dsAlergiasRn = Utils.pularLinhaString(row.ds_alergiasRn)
                        const dsTransfusaoRn = Utils.pularLinhaString(row.ds_transfusaoRn)
                        const ds_procedimentoRn = Utils.pularLinhaString(row.ds_procedimentosRn)
                        return `<div class="break-word"> ${observacaoRn} <div style='background:#7f3b8a9c;'>${dsMedicamentosRn}</div> <div style='background:#ffcd05;'>${dsAlergiasRn}</div> <div style='background:red;'>${dsTransfusaoRn}</div> <div style='background:#1070ffdb;'>${ds_procedimentoRn}</div></div>`;
                    }
                },
                {
                    data: 'ds_fugulin',
                    title: 'Fugulin',
                    render: function (data, type, row) {
                        return data == '' ? 'Não definido' : data;
                    }
                },
                {
                    data: 'ds_fugulin',
                    title: 'Fugulin',
                    render: function (data, type, row) {
                        return data == '' ? 'Não definido' : data;
                    }
                },
                {
                    data: 'dt_escalas',
                    title: 'Data Braden/Morse/SAE',
                    render: function (data, type, row) {
                        return data ? Utils.formatarDataHora(data) : 'Não definido';
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
            drawCallback: () => {$(document).ready(function() {
                const bindClickEvent = () => {
                    $('#tableMapaInternacaoRosa').on('click', 'td', function(event) {
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
                    $('#tableMapaInternacaoRosa').on('mouseover', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function(event) {
                        $(this).css('cursor', 'pointer'); 
                    });
            
                    $('#tableMapaInternacaoRosa').on('mouseleave', 'td:nth-child(' + (targetColumnIndex + 1) + ')', function(event) {

                        $(this).css('cursor', 'auto'); 
                    });
                };
            
                bindHoverEvent();
            });
            
            
                $('#tableMapaInternacaoRosa').on('click', '.btn-visualizar', (event) => {
                    event.stopPropagation(); 
                    if ($(event.target).hasClass('btn')) {
                        return;
                    }
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
                                            <th>Enfermeira</th>
                                            <td>${row.nm_usuario || 'Não especificado'}</td>
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

        this.fetchDataAndAddTable();
    }

    fetchDataAndAddTable() {
        $.ajax({
            url: 'http://10.20.20.207/tasy/api/mapa_internacao_rosa.php',
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
                url: 'http://10.1.1.108/intranet/src/services/api/adicionar/add_espaco_rosa.php',
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
                url: 'http://10.1.1.108/intranet/src/services/api/editar/edit_espaco_rosa.php',
                type: 'POST',
                dataType: 'json',
                data: formatData(data),
                success: () => {
                    console.log('Atualizado com sucesso');
                }, finally: () => {
                },
                error: function (xhr, status, error) {
                    console.error('Erro na atualização:', error);
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
                dt_escalas: Utils.formatarDataParaEnvio(data.ESCALA),
                dt_sae_rn: Utils.formatarDataParaEnvio(data.SAE_RN),
                dt_alta: Utils.formatarDataParaEnvio(data.DT_ALTA),
            };
        }
    }


    renderOcupacaoRosa(data) {
        const tableOcupacaoRosa = $('#tableOcupacaoRosa').DataTable({
            data: data,
            columns: [
                {
                    data: 'CD_UNIDADE', title: 'Leito',
                    render: function (data, type, row) {
                        return `
                        <div class="arquivo-cell">
                            <button class="badge-sm btn bg-gradient-info btn-visualizar btn-redondo-pequeno" data-jasmin-id="${row.id}"><i class="ni ni-fat-add"></i></button>
                            ${data}
                        </div>
                        `;
                    },
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
        $('#tableOcupacaoRosa').on('click', '.btn-visualizar', (event) => {
            const rosaId = $(event.currentTarget).data('id');
            const rowIndex = tableOcupacaoRosa.row($(event.currentTarget).closest('tr')).index();
            const row = tableOcupacaoRosa.rows(rowIndex).data()[0];
            const detalhesTr = $(`tr.detalhes-ocupacao-rosa[data-ocupacao-rosa-id="${rosaId}"]`);

            if (detalhesTr.length) {
                detalhesTr.remove();
            } else {
                const novaDetalhesTr = `
                    <tr class="detalhes-ocupacao-rosa" data-ocupacao-rosa-id="${rosaId}">
                        <td colspan="8">
                            <table class="table">
                                <tr> 
                                    <th>DIAGNOSTICO</th>
                                    <td>${row.DS_DIAGNOSTICO}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
                const currentRow = $(event.currentTarget).closest('tr');
                currentRow.after(novaDetalhesTr);
                this.setupImageButtons('.detalhes-ocupacao-rosa');
            }
        });

        this.startUpdating();
        setTimeout(() => {
            this.stopUpdating();
        }, 60000);

    }

    startUpdating() {
        this.intervalId = setInterval(() => {
            const tableOcupacaoRosaV = $('#tableOcupacaoRosa').DataTable();
            if (tableOcupacaoRosaV) {
                tableOcupacaoRosaV.destroy();
            }
            this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_rosa.php', this.renderOcupacaoRosa);
        }, 60000);
    }

    stopUpdating() {
        clearInterval(this.intervalId);
        this.startUpdating();
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