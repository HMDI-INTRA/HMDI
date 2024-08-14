//****Autor: Josélio Dias Mendonça*******//

import DataModel from "../models/DataModel.js";
import View from "../views/View.js";
import Utils from "../controllers/Utils.js";

class Services {
    constructor() {
        this.dataModel = new DataModel();
        this.view = new View();
        this._urlAddTecEquipe = "../services/api/adicionar/add_tec_equipe.php";
        this._urlAddPreventiva = "../services/api/adicionar/add_preventiva.php";
        this._urlAddaAcessoCatraca = "http://10.20.20.207/tasy/api/create/catraca_acesso.php";
        this._urlAddAdmLaboratorio = "../services/api/adicionar/add_adm_laboratorio.php"
        this._urlAddMapaJasmim = "../services/api/adicionar/add_espaco_jasmim.php"
        this._urlAddTriagemLaboratorio = "../services/api/adicionar/add_triagem_lab.php"
        this._urlEditTriagemLab = "../services/api/editar/edit_triagem_lab.php"
        this._urlEditAcesso = "http://10.20.20.207/tasy/api/edit/r069fis_edit.php"
        this._urlEditIdicadorAgencia = "http://10.1.1.108/intranet/src/services/api/editar/indicador_agencia_conc.php"
        this._add_indicador = "../services/api/adicionar/add_indicador.php"
        this._add_exame_triagem = "../services/api/adicionar/add_exame_triagem.php"
        this._add_nir_eletivas = "../services/api/adicionar/add_nir_eletivas.php"
        this._urlUsuarios = "../services/api/adicionar/add_usuario.php";
        this._urlAddCsv = "../services/api/adicionar/add_csv_aniversariante.php";
        this._urlEditTecEquipe = '../services/api/editar/edit_tec_equipe.php';
        this._urlEditPreventiva = '../services/api/editar/edit_preventiva.php';
        this._urlEditAdmLab = '../services/api/editar/edit_adm_laboratorio.php';
        this._urlEditMapaJasmim = '../services/api/editar/edit_espaco_jasmim_service.php';
        this._urlEditMapaRosa = '../services/api/editar/edit_espaco_rosaService.php';
        this._urlEditUser = '../services/api/editar/edit_user.php';
        this._urlEditRedefinirUser = '../services/api/editar/edit_redefinir_user.php';
        this._urlEditNirEletivas = '../services/api/editar/edit_nir_eletivas.php';
        this._urlInativarNirEletivas = '../services/api/editar/inativar_nir_eletivas.php';
        this._urlAtivarNirEletivas = '../services/api/editar/ativar_nir_eletivas.php';
        this._deleteTecEquipe = "../services/api/delete/delete_tec_equipe.php";
        this._deleteAdmLaboratorio = "../services/api/delete/delete_adm_laboratorio.php";
        this._deleteTriagemLaboratorio = "../services/api/delete/delete_triagem_laboratorio.php";
        this._deletePreventiva = "../services/api/delete/delete_preventiva.php";
        this._deleteAniversariante = "../services/api/delete/delete_aniversariante.php";
        this._deleteUsuarios = "../services/api/delete/delete_usuario.php";
        this._deleteExame = "../services/api/delete/delete_exame_lab.php";
        this._deleteNirEletivas = "../services/api/delete/delete_nir_eletivas.php"
        this.dataModel.fetchData('../services/api/equipe_ti.php', this.dadosequipeTi);
        this.dataModel.fetchData('../services/api/request_tecnico.php', this.dadosPreventiva);
        this.dataModel.fetchData('../services/api/aniversariante.php', this.dadosAniversariante);
        this.dataModel.fetchData('../services/api/arquivo-api.php', this.dadosArquivo);
        this.dataModel.fetchData('../services/api/arquivo-laboratorio-api.php', this.tableLaboratorio);
        this.dataModel.fetchData('../services/api/laboratorio_triagem.php', this.tableExamesTriagemId);
        this.dataModel.fetchData('../services/api/laboratorio_triagem.php', this.tableExamesTriagemCampo);
        this.dataModel.fetchData('../services/api/laboratorio.php', this.tableLaboratorioAdm);
        this.dataModel.fetchData('../services/api/laboratorio.php', this.tableLaboratorioChart);
        this.dataModel.fetchData('../services/api/laboratorio_triagem_table.php', this.tableLaboratorioTrigem);
        this.dataModel.fetchData('../services/api/nir-api.php', this.tableNirEletivas);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/lab_agencia.php', this.tableLaboratorioAgenciaTable);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/lab_agencia_saida.php', this.tableLaboratorioAgenciaSaidaTable);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/lab_solicitacao.php', this.tableLaboratorioSolicitacaoTable);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/lab_agencia_transfusao.php', this.tableTransfusaoLab);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/r034fun.php', this.tabler034fun);

        /* Catracas Henry*/
        this.dataModel.fetchData('../services/api/catracaHenry.php', this.dadosCatracaHenry);

        /* Catracas Topdata*/
        this.dataModel.fetchData('http://10.1.1.111/backup/conexao/listaOfiline.php', this.dadosCatracaTopdata);


        /* Agencia Transfusional */
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/solicitacoes_tranfusionais.php', this.dadosSolicitacaoTranfusionais);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/transfusoes_realizadas.php', this.dadosTransfRealizadas);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/tempo_transf.php', this.dadosTempoMedioTransf);
        /* Emergencia */
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/emer_temp_pa_medico.php', this.dadosPaTempoAtendMedico);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/emer_temp_pos_triagem.php', this.dadosTempoMedioPosTriagem);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/emer_temp_esp_triagem.php', this.dadosTempoMedioEspTriagem);
        /* CVO */
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/cvo_taxa_mort_fetal.php', this.dadosTaxaMortalidadeFetal);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/cvo_taxa_mort_geral.php', this.dadosTaxaMortalidadeGeral);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/cvo_taxa_mort_Neo.php', this.dadosTaxaMortalidadeNeo);
        /* Partos Cesareas */
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/parto_cesarea_ama_hora_vida.php', this.dadosTaxaAmaHoraVida);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/parto_cesarea_contato_pele.php', this.dadosTaxaContatoPele);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/parto_cesarea_prematuridade.php', this.dadosTaxaPrematuridade);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/parto_cesarea_reanimacao.php', this.dadosTaxaReanimacao);
        /* Partos Normal */
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/parto_normal_ama_hora_vida.php', this.dadosTaxaAmaHoraVidaN);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/parto_normal_contato_pele.php', this.dadosTaxaContatoPeleN);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/parto_normal_prematuridade.php', this.dadosTaxaPrematuridadeN);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/parto_normal_reanimacao.php', this.dadosTaxaReanimacaoN);
        /* Recepcao */
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/recepcao_capacidade_agendamento.php', this.dadosCapacidadeAgend);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/recepcao_perc_absenteismo.php', this.dadosPercAbsenteismo);

        /* Ginecologia obstetra */
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/obstetra_gestante_pc.php', this.dadosObesidadePc);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/obstetra_gestante_pn.php', this.dadosObesidadePn);


        this.dataModel.fetchData('http://10.1.1.108/intranet/src/services/api/espacoJasmin.php', this.dadosEspacoJasmin);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_jasmim.php', this.dadosOcupacaoJasmim);
        this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_rosa.php', this.dadosOcupacaoRosa);
        this.dataModel.fetchData('http://10.1.1.108/intranet/src/services/api/espacoRosa.php', this.dadosEspacoRosaV);
        this.dataModel.fetchData('http://10.1.1.108/intranet/src/services/api/graficos.php', this.dadosGraficos);
        this.formEditPreventiva = document.getElementById("preventivaFormEditar");
        this.formcadastroUsuarioEditar = document.getElementById("cadastroUsuarioEditar");
        this.formEditTriagem = document.getElementById("labTriagemEditar");
        this.preventivaFormData = document.getElementById("preventivaForm");
        this.admLaboratorioFormData = document.getElementById("labAdministrativo");
        this.tableExamesTriagem = document.getElementById("tableExamesTriagem");
        this.tableLaboratorioAdmId = document.getElementById("tableLaboratorioAdm");
        this.formMapaJasmin = document.getElementById("formMapaJasmin");
        this.tableMapaInternacaoJasmin = document.getElementById("tableMapaInternacaoJasmin");
        this.tableMapaInternacaoRosa = document.getElementById("tableMapaInternacaoRosa");
        this.labAdministrativoEditar = document.getElementById("labAdministrativoEditar");
        this.tableLaboratorioTrigemTable = document.getElementById("tableLaboratorioTrigemTable");
        this.tabler069fisEdit = document.getElementById("tabler034fun");
        this.formAdmRelatorio = document.getElementById("formAdmRelatorio");
        this.formSaidaHemocompRelatorio = document.getElementById("formSaidaHemocomp");
        this.formEletivaRelatorio = document.getElementById("formEletivasRelatorio");
        this.formRelatorioSolicTransf = document.getElementById("formRelatorioSolicTransf");
        this.formJasmimRelatorio = document.getElementById("formJasmimRelatorio");
        this.formRosaRelatorio = document.getElementById("formRosaRelatorio");
        this.formEntradaHemocompRelatorio = document.getElementById("formEntradaHemocomp");
        this.formSolicitacaoHemocomp = document.getElementById("formSolicitacaoHemocomp");
        this.formAgenciaRelatorio = document.getElementById("formRelatorioSolicTransf");
        this.formTriagemRelatorio = document.getElementById("formTriagemRelatorio");
        this.formTransfusao = document.getElementById("formTransfusao");
        this.formEdit = document.getElementById("formEditTecnico");
        this.formNirEletivasId = document.getElementById("formEditarNir");
        this.formTriagemLab = document.getElementById("labTriagem");
        this.formUsuarioId = document.getElementById("cadastroUsuario");
        this.formAcessoCatraca = document.getElementById("formAcessoCatraca");
        this.formAcessoCatracaHenry = document.getElementById("formHenry");
        this.form = document.getElementById("tecnicosForm");
        this.formCsv = document.getElementById('csvForm');
        this.modal = document.getElementById("tecnicoModal");
        this.table = document.getElementById("tableTec");
        this.tableAniversariante = document.getElementById("tableAniversariante");
        this.tableControleUser = document.getElementById("tableControleUser");
        this.tablePreventiva = document.getElementById("tablePreventiva");
        this.tableNirEletivasId = document.getElementById("tableNirEletivas");
        this.tableNirEletivasAtiv = document.getElementById("tableNirInativas");
        this.formAnalise = document.getElementById("formAnaliseAgencia");
        this.tableNirRelizadasEletivasId = document.getElementById("tableRealizadasNir");
        this.tableArquivo = document.getElementById("tableArquivo")
        this.tableLabo = document.getElementById("tableLaboratorio");
        this.modalPreventiva = document.getElementById("PreventivaModal");
        this.statusMessage = document.getElementById("statusMessage");
        this.isSubmitting = false;
        this.formData = {
            nome: "",
            funcao: "",
            dt_entrada: ""
        };
        this.formUsuario = {
            nome: "",
            nomeUsuario: "",
            senha: "",
            funcao: ""
        };
        this.init();
    }

    init() {
        this.verificarDataEHora();
        setInterval(() => this.verificarDataEHora(), 60 * 1000);
        this.abrirModalTecnico();
        this.addButtonListeners();
        if (window.location.pathname.includes('dashboardLab.php')) {
            this.submitFormExamesTriagem();
        }

        if (window.location.pathname.includes('dashAgenciaTranfusional.php') || window.location.pathname.includes('dashoardEmergencia.php') || window.location.pathname.includes('dashboardCvo.php') || window.location.pathname.includes('dashboardPartosCesarea.php')
            || window.location.pathname.includes('dashboardPartosNormal.php') || window.location.pathname.includes('dashboardRecepcao.php') || window.location.pathname.includes('dashboardObstetra.php')) {
            this.abrirEdicaoNrIndicador();
            this.abrirModalRelatorioIndicador();
            this.abrirEditarIndicador();
            $('#formAnalise').on('submit', (event) => {
                event.preventDefault();
                this.submitFormIndicador();
            });
            document.addEventListener('DOMContentLoaded', function () {
                var elementIds = ['planoAcao', 'analise', 'planoAcaoEditar'];
                Utils.initializeQuill(elementIds);
            });
        }

        if (window.location.pathname.includes('gestaoPessoas.php')) {
            $(document).ready(function () {
                $('#loadingOverlayLab').show();
                let nomeFun = '#nomeFun';
                let nome = '#nomFun';
                let tipSex = '#tipSex';
                let datnas = '#datnas';
                let dtEntrada = '#dtAdm';

                if ($(nomeFun).length) {
                    $(nomeFun).autocomplete({
                        source: function (request, response) {
                            document.getElementById('loadingTopData').style.display = 'block';
                            $.ajax({
                                url: "http://10.20.20.207/tasy/api/funcionario.php",
                                dataType: "json",
                                data: {
                                    nomeFun: request.term
                                },
                                success: function (data) {
                                    if (data.error) {
                                        console.error('Erro ao buscar funcionários:', data.error);
                                        response([]);
                                    } else if (data.length === 0) {
                                        response([{ label: "Nenhum funcionário encontrado", value: "" }]);
                                    } else {
                                        response(data);
                                    }
                                },
                                error: function () {
                                    console.error('Erro ao buscar funcionários. Servidor indisponível.');
                                    response([]);
                                },
                                complete: function () {
        
                                    document.getElementById('loadingTopData').style.display = 'none';
                                }
                            });
                        },
                        minLength: 5,
                        search: function () {
                            $('#loadingOverlay').hide();
                        },
                        select: function (event, ui) {
                            if (ui.item) {
                                $(nomeFun).val(ui.item.NM_USUARIO);
                                $(nome).val(ui.item.DS_USUARIO);
                                $(tipSex).val(ui.item.IE_SEXO);
                                $(datnas).val(ui.item.DT_NASCIMENTO);
                                $(dtEntrada).val(ui.item.DT_ENTRADA);
                            }
                            return false;
                        }
                    }).data('ui-autocomplete')._renderItem = function (ul, item) {
                        return $('<li>').append('<div>' + item.DS_USUARIO + '</div>').appendTo(ul);
                    };
                }
            });

            this.addAcessoCatracaHenry()
        }
        if (window.location.pathname.includes('dashboardNir.php')) {
            this.abrirModalEletivasRelatorio()
        }
        if (window.location.pathname.includes('espacoJasmimRelatorio.php')) {
            Utils.atualizarHorario();
            setInterval(Utils.atualizarHorario, 1000);
            this.abrirModalJasmimRelatorio()
            var intervalID = setInterval(this.dadosEspacoJasmim, 300000);
            clearInterval(intervalID);
            intervalID = setInterval(this.dadosEspacoJasmim, 300000);

            this.view.fetchDataAndAddTableJasmim();
            var intervalView = setInterval(() => this.view.fetchDataAndAddTableJasmim(), 80000);
            clearInterval(intervalView);
            intervalView = setInterval(() => this.view.fetchDataAndAddTableJasmim(), 80000);
        }
        if (window.location.pathname.includes('espacoRosaRelatorio.php')) {
            Utils.atualizarHorario();
            setInterval(Utils.atualizarHorario, 1000);
            this.abrirModalRosaRelatorio()
            var intervalID = setInterval(this.dadosEspacoRosa, 300000);
            clearInterval(intervalID);
            intervalID = setInterval(this.dadosEspacoRosa, 300000);

            this.view.fetchDataAndAddTableJasmim();
            var intervalView = setInterval(() => this.view.fetchDataAndAddTableJasmim(), 80000);
            clearInterval(intervalView);
            intervalView = setInterval(() => this.view.fetchDataAndAddTableJasmim(), 80000);
        }
        if (window.location.pathname.includes('espacoRosa.php')) {
            Utils.atualizarHorario();
            setInterval(Utils.atualizarHorario, 1000);
            var userNameText = $('#userName').text();
            var trimmedUserName = $.trim(userNameText);
            $('#usuario').val(trimmedUserName);

            document.addEventListener('DOMContentLoaded', function () {
                var elementIds = ['obsAdulto', 'obsRn', 'obsAdultoView', 'obsRnView', 'obsAdultoEdit', 'obsRnEdit'];
                Utils.initializeQuill(elementIds);
            });
            this.abrirModalRosaRelatorio()
            var intervalID = setInterval(this.dadosEspacoRosa, 300000);
            clearInterval(intervalID);
            intervalID = setInterval(this.dadosEspacoRosa, 300000);
            this.view.fetchDataAndAddTableJasmim();
            var intervalView = setInterval(() => this.view.fetchDataAndAddTableJasmim(), 10000);
            clearInterval(intervalView);
            intervalView = setInterval(() => this.view.fetchDataAndAddTableJasmim(), 10000);
            this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_rosa.php', this.dadosOcupacaoRosaReserva);
            var intervalReserva = setInterval(() => {
                this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_rosa.php', this.dadosOcupacaoRosaReserva);
            }, 10000);
            clearInterval(intervalReserva);
            intervalReserva = setInterval(() => {
                this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_rosa.php', this.dadosOcupacaoRosaReserva);
            }, 10000);

            var intervalOcupacao = setInterval(() => {
                this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_rosa.php', this.view.renderOcupacaoJasmim);
            }, 120000);
            clearInterval(intervalOcupacao);
            intervalOcupacao = setInterval(() => {
                this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_rosa.php', this.view.renderOcupacaoJasmim);
            }, 120000);


            $('#atendimento').on('change', function () {
                var nr_atendimento = $(this).val();
                $('#loadingOverlayLab').show();
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/mapa_internacao_rosa.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { nr_atendimento: nr_atendimento },
                    success: function (data) {
                        $('#loadingOverlayLab').hide();

                        if (data && data.length > 0) {
                            var firstItem = data[0];
                            if (firstItem.DT_ALTA !== null) {
                                Swal.fire("Paciente de alta", "O paciente já teve alta.", "info");
                                return
                            }
                            $('#paciente').val(firstItem.NOME);
                            $('#leito').val(firstItem.LEITO);
                            $('#idade').val(firstItem.IDADE);
                            $('#dtParto').val(Utils.formatarDataParaFormatoHTML(firstItem.DT_PARTO));
                            $('#dtAdmissao').val(Utils.formatarDataParaFormatoHTML(firstItem.DT_ENTRADA));
                            $('#dieta').val(firstItem.DIETA);
                            $('#fugulin').val(firstItem.FUGULIN);
                            $('#escalas').val(Utils.formatarDataParaFormatoHTML(firstItem.ESCALA));
                            $('#saeRn').val(Utils.formatarDataParaFormatoHTML(firstItem.SAE_RN));
                        }
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayLab').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });
            $('#filtrarMovimentacao').on('click', function () {
                var nr_atendimento = $('#atendimentoMovimentacao').val();
                $('#loadingOverlayLab').show();
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/movimentacao.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { nr_atendimento: nr_atendimento },
                    success: function (data) {
                        $('#loadingOverlayLab').hide();
                        if (data && data.length > 0) {
                            var resultHtml = '';

                            data.forEach(function (item) {
                                resultHtml += `
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <strong>Setor:</strong> ${item.SETOR}
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text"><strong>Nome:</strong> ${item.NOME}</p>
                                            <p class="card-text"><strong>Leito:</strong> ${item.LEITO}</p>
                                            <p class="card-text"><strong>Data de Entrada:</strong> ${item.DT_ENTRADA_UNIDADE}</p>
                                            <p class="card-text"><strong>Data de Saída:</strong> ${item.DT_SAIDA_UNIDADE ? item.DT_SAIDA_UNIDADE : 'N/A'}</p>
                                            <p class="card-text"><strong>Usuário:</strong> ${item.NM_USUARIO_ORIGINAL}</p>
                                            <p class="card-text"><strong>Tipo:</strong> ${item.TIPO}</p>
                                        </div>
                                    </div>`;
                            });

                            $('#resultadoMovimentacao').html(resultHtml);
                        } else {
                            Swal.fire("Alerta", "O paciente não tem movimentação.", "info");
                        }
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayLab').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });
        }
        if (window.location.pathname.includes('espacoJasmin.php')) {
            Utils.atualizarHorario();
            setInterval(Utils.atualizarHorario, 1000);
            var userNameText = $('#userName').text();
            var trimmedUserName = $.trim(userNameText);
            $('#usuario').val(trimmedUserName);
            document.addEventListener('DOMContentLoaded', function () {
                var elementIds = ['obsAdulto', 'obsRn', 'obsAdultoView', 'obsRnView', 'obsAdultoEdit', 'obsRnEdit'];
                Utils.initializeQuill(elementIds);
            });
            this.abrirModalJasmimRelatorio()
            var intervalID = setInterval(this.dadosEspacoJasmim, 300000)
            clearInterval(intervalID);
            intervalID = setInterval(this.dadosEspacoJasmim, 300000);

            this.view.fetchDataAndAddTableJasmim();
            var intervalView = setInterval(() => {
                this.view.fetchDataAndAddTableJasmim()
            }, 30000);
            clearInterval(intervalView);
            intervalView = setInterval(() => {
                this.view.fetchDataAndAddTableJasmim()
            }, 30000);


            this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_jasmim.php', this.dadosOcupacaoJasmimReserva);
            var intervalReserva = setInterval(() => {
                this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_jasmim.php', this.dadosOcupacaoJasmimReserva);
            }, 10000);
            clearInterval(intervalReserva);
            intervalReserva = setInterval(() => {
                this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_jasmim.php', this.dadosOcupacaoJasmimReserva);
            }, 10000);


            var intervalOcupacao = setInterval(() => {
                this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_jasmim.php', this.view.renderOcupacaoJasmim);
            }, 100000);
            clearInterval(intervalOcupacao);
            intervalOcupacao = setInterval(() => {
                this.dataModel.fetchData('http://10.20.20.207/tasy/api/ocupacao_jasmim.php', this.view.renderOcupacaoJasmim);
            }, 100000);


            $('#atendimento').on('change', function () {
                var nr_atendimento = $(this).val();
                $('#loadingOverlayLab').show();
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/mapa_internacao_jasmim.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { nr_atendimento: nr_atendimento },
                    success: function (data) {
                        $('#loadingOverlayLab').hide();

                        if (data && data.length > 0) {
                            var firstItem = data[0];
                            if (firstItem.DT_ALTA !== null) {
                                Swal.fire("Paciente de alta", "O paciente já teve alta.", "info");
                                return
                            }
                            $('#paciente').val(firstItem.NOME);
                            $('#leito').val(firstItem.LEITO);
                            $('#idade').val(firstItem.IDADE);
                            $('#dtParto').val(Utils.formatarDataParaFormatoHTML(firstItem.DT_PARTO));
                            $('#dtAdmissao').val(Utils.formatarDataParaFormatoHTML(firstItem.DT_ENTRADA));
                            $('#dieta').val(firstItem.DIETA);
                            $('#fugulin').val(firstItem.FUGULIN);
                            $('#escalas').val(Utils.formatarDataParaFormatoHTML(firstItem.ESCALA));
                            $('#saeRn').val(Utils.formatarDataParaFormatoHTML(firstItem.SAE_RN));
                        }
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayLab').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });

            $('#filtrarMovimentacao').on('click', function () {
                var nr_atendimento = $('#atendimentoMovimentacao').val();
                $('#loadingOverlayLab').show();
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/movimentacao.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { nr_atendimento: nr_atendimento },
                    success: function (data) {
                        $('#loadingOverlayLab').hide();
                        if (data && data.length > 0) {
                            var resultHtml = '';

                            data.forEach(function (item) {
                                resultHtml += `
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <strong>Setor:</strong> ${item.SETOR}
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text"><strong>Nome:</strong> ${item.NOME}</p>
                                            <p class="card-text"><strong>Leito:</strong> ${item.LEITO}</p>
                                            <p class="card-text"><strong>Data de Entrada:</strong> ${item.DT_ENTRADA_UNIDADE}</p>
                                            <p class="card-text"><strong>Data de Saída:</strong> ${item.DT_SAIDA_UNIDADE ? item.DT_SAIDA_UNIDADE : 'N/A'}</p>
                                            <p class="card-text"><strong>Usuário:</strong> ${item.NM_USUARIO_ORIGINAL}</p>
                                            <p class="card-text"><strong>Tipo:</strong> ${item.TIPO}</p>
                                        </div>
                                    </div>`;
                            });

                            $('#resultadoMovimentacao').html(resultHtml);
                        } else {
                            Swal.fire("Alerta", "O paciente não tem movimentação.", "info");
                        }
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayLab').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });


        }

        if (window.location.pathname.includes('nir.php')) {
            this.submitFormNirEletivas();
            this.abrirModalEletivasRelatorio();
            $.ui.autocomplete.prototype._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(this.element.outerWidth());
                ul.css('z-index', 1050);
            };
            $('#procedimento').autocomplete({
                source: function (request, response) {
                    $.ajax({
                        url: "http://10.1.1.108/intranet/src/services/api/nir-api.php",
                        dataType: "json",
                        data: {
                            procedimento: request.term
                        },
                        success: function (data) {
                            if (data.length === 0) {
                                response([{ label: "Nenhum encontrado", value: "" }]);
                            } else {
                                var uniqueData = [];
                                var lookup = {};
                                var term = $.ui.autocomplete.escapeRegex(request.term);
                                var matcher = new RegExp(term, "i");

                                $.each(data, function (index, item) {
                                    if (!lookup[item.cd_procedimento] && matcher.test(item.cd_procedimento)) {
                                        lookup[item.cd_procedimento] = true;
                                        uniqueData.push(item);
                                    }
                                });

                                var mappedData = $.map(uniqueData, function (item) {
                                    return {
                                        label: item.cd_procedimento,
                                        value: item.cd_procedimento
                                    };
                                });
                                response(mappedData);
                            }
                        },
                        error: function () {
                            response([{ label: "Erro ao buscar", value: "" }]);
                        }
                    });
                },
                minLength: 5,
                select: function (event, ui) {
                    if (ui.item.value !== "") {
                        $("#procedimento").val(ui.item.label);
                    }
                    return false;
                },
                focus: function (event, ui) {
                    event.preventDefault();
                }
            });

            $.ui.autocomplete.prototype._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(this.element.outerWidth());
                ul.css('z-index', 1050);
            };
            $('#medico').autocomplete({
                source: function (request, response) {
                    $.ajax({
                        url: "http://10.1.1.108/intranet/src/services/api/nir-api.php",
                        dataType: "json",
                        data: {
                            medico: request.term
                        },
                        success: function (data) {
                            if (data.length === 0) {
                                response([{ label: "Nenhum encontrado", value: "" }]);
                            } else {
                                var uniqueData = [];
                                var lookup = {};
                                var term = $.ui.autocomplete.escapeRegex(request.term);
                                var matcher = new RegExp(term, "i");

                                $.each(data, function (index, item) {
                                    if (!lookup[item.ds_medico_exec] && matcher.test(item.ds_medico_exec)) {
                                        lookup[item.ds_medico_exec] = true;
                                        uniqueData.push(item);
                                    }
                                });

                                var mappedData = $.map(uniqueData, function (item) {
                                    return {
                                        label: item.ds_medico_exec,
                                        value: item.ds_medico_exec
                                    };
                                });
                                response(mappedData);
                            }
                        },
                        error: function () {
                            response([{ label: "Erro ao buscar", value: "" }]);
                        }
                    });
                },
                minLength: 3,
                select: function (event, ui) {
                    if (ui.item.value !== "") {
                        $("#medico").val(ui.item.label);
                    }
                    return false;
                },
                focus: function (event, ui) {
                    event.preventDefault();
                }
            });

            $('#ds_medico_exec').on('change', function () {
                var cd_procedimento = $(this).val();
                $('#loadingOverlayNir').show();
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/nir_eletivas.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { cd_procedimento: cd_procedimento },
                    success: function (data) {
                        $('#loadingOverlayNir').hide();
                        if (data && data.length > 0) {
                            var firstItem = data[0];
                            $('#ds_procedimento').val(firstItem.DS_PROCEDIMENTO);
                        }
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayNir').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });
            $('#cd_procedimentoEdit').on('change', function () {
                var cd_procedimento = $(this).val();
                $('#loadingOverlayNir').show();
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/nir_eletivas.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { cd_procedimento: cd_procedimento },
                    success: function (data) {
                        $('#loadingOverlayNir').hide();

                        if (data && data.length > 0) {
                            var firstItem = data[0];
                            $('#ds_procedimentoEdit').val(firstItem.DS_PROCEDIMENTO);
                        }
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayNir').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });
            $('#nr_prontuario').on('change', function () {
                var nr_prontuario = $(this).val();
                $('#loadingOverlayNir').show();
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/pessoa_fisica.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { nr_prontuario: nr_prontuario },
                    success: function (data) {
                        $('#loadingOverlayNir').hide();

                        if (data && data.length > 0) {
                            var firstItem = data[0];
                            $('#nm_paciente').val(firstItem.NM_PESSOA_FISICA);
                            $('#dt_nascimento').val(firstItem.DT_NASCIMENTO);
                            $('#ds_municipio').val(firstItem.DS_MUNICIPIO);
                        }
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayNir').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });
            $('#nr_prontuarioEdit').on('change', function () {
                var nr_prontuario = $(this).val();
                $('#loadingOverlayNir').show();
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/pessoa_fisica.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { nr_prontuario: nr_prontuario },
                    success: function (data) {
                        $('#loadingOverlayNir').hide();

                        if (data && data.length > 0) {
                            var firstItem = data[0];
                            $('#nm_pacienteEdit').val(firstItem.NM_PESSOA_FISICA);
                            $('#dt_nascimentoEdit').val(firstItem.DT_NASCIMENTO);
                            $('#ds_municipioEdit').val(firstItem.DS_MUNICIPIO);
                        }
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayNir').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });
            var elementIds = ['ds_observacao', 'ds_observacaoEdit'];
            Utils.initializeQuill(elementIds);
        }
        if (window.location.pathname.includes('laboratorio.php') || window.location.pathname.includes('laboratorio-relatorio.php')) {
            $('#loadingOverlayLab').show();
            const checkboxes = document.querySelectorAll('.form-check-input');
            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        const labelText = this.nextElementSibling.textContent.trim();
                        document.getElementById('texto-selecionado').value = labelText;
                    }
                });
            });

            $('#prescricao').on('change', function () {
                var nrPrescricao = $(this).val();
                $('#loadingOverlayLab').show();
                $('#prescricao').on('input', function () {
                    if ($('#prescricao').val() == '') {
                        $('#atendimento').val('');
                        $('#dtEntrada').val('');
                        $('#dtChegada').val('');
                        $('#local').val('');
                        $('#dtNascimento').val('');
                        $('#paciente').val('');
                        $('#coletor').val('');
                        $('#exame').val('');
                    }
                });
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/lab_adm_triagem.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { nr_prescricao: nrPrescricao },
                    success: function (data) {
                        $('#loadingOverlayLab').hide();
                        console.log(data);
                        var todosExames = [];
                        $.each(data, function (index, item) {
                            var exames = (item.EXAMES !== null) ? item.EXAMES.split(', ') : [];
                            todosExames = todosExames.concat(exames);
                            if (index === 0) {
                                $('#atendimento').val(item.NR_ATENDIMENTO);
                                $('#dtEntrada').val(Utils.formatarDataParaEnvio(item.DT_ATUALIZACAO));
                                $('#local').val(item.CD_UNID_BASICA);
                                $('#dtNascimento').val(Utils.formatarDataParaEnvio(item.DT_NASCIMENTO));
                                $('#paciente').val(item.NM_PESSOA_FISICA);
                                $('#hrEntrada').val(item.HR_COLETA);
                                $('#hrChegada').val(item.HR_BAIXA);
                                $('#coletor').val(item.NM_USUARIO);
                            }
                        });

                        if (todosExames.length > 0) {
                            $('#exame').val(todosExames.join(', '));
                        } else {
                            Swal.fire({
                                icon: 'info',
                                title: 'Erro',
                                text: 'Prescrição não existe exame vinculado.',
                            });
                            $('#atendimento').val('');
                            $('#dtEntrada').val('');
                            $('#dtChegada').val('');
                            $('#local').val('');
                            $('#dtNascimento').val('');
                            $('#paciente').val('');
                            $('#coletor').val('');
                            $('#exame').val('');
                        }
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayLab').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });

            $('#nr_prescricao').on('change', function () {
                var nrPrescricao = $(this).val();
                $('#loadingOverlayLab').show();
                $('#nr_prescricao').off('input').on('input', function () {
                    if ($(this).val() == '') {
                        $('#nr_atendimento, #dt_entrada, #cd_estabelecimento, #nm_paciente, #ds_exame, #ds_clinica, #status, #observacao').val('');
                    }
                });
                $.ajax({
                    url: 'http://10.20.20.207/tasy/api/lab_adm_triagem.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { nr_prescricao: nrPrescricao },
                    success: function (data) {
                        $('#loadingOverlayLab').hide();

                        $.each(data, function (index, item) {
                            if (index === 0) {
                                $('#nr_atendimento').val(item.NR_ATENDIMENTO);
                                $('#dt_entrada').val(Utils.formatarDataParaEnvio(item.DT_ATUALIZACAO));
                                $('#cd_estabelecimento').val(item.CD_ESTABELECIMENTO);
                                $('#nm_paciente').val(item.NM_PESSOA_FISICA);
                                $('#hrEntrada').val(item.HR_COLETA);
                                $('#hrChegada').val(item.HR_BAIXA);
                            }
                        });
                    },
                    error: function (error) {
                        console.error('Erro na requisição AJAX:', error);
                        $('#loadingOverlayLab').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                        });
                    },
                });
            });

            $('#microbiologia-tab').on('click', function () {
                $('#triagem').hide();
                $('#microbiologia').show();
            });
            $('#triagem-tab').on('click', function () {
                $('#triagem').show();
                $('#microbiologia').hide();
            });

            $(document).ready(function () {
                $("[id^='pills-']").on("click", function () {
                    const textMapping = {
                        'pills-hemocomponentes-tab': 'Hemocomponentes',
                        'pills-solicitacao-tab': 'Solicitação de tranfusão',
                        'pills-tranfusao-tab': 'Transfusão',
                        'pills-indicadores-tab': 'Indicadores'
                    };
                    const clickedId = $(this).attr('id');
                    $("#menu-agencia").text(textMapping[clickedId]);
                });
            });

            this.abrirModalAdmLaboratorio();
            this.abrirModalAdmRelatorio();
            this.abrirModalSaidaHemocompRelatorio();
            this.abrirModalEntradaHemocompRelatorio();
            this.abrirModalSolicitacaoHemocomp();
            this.abrirModalTransfusao();
            this.submitFormTriagemLaboratorio();
            this.abrirModalTriagemRelatorio();
        }
        if (window.location.pathname.includes('cadastrarUser.php')) {
            $(document).ready(function () {
                let nomeFun = '#nomeFun';
                let nome = '#nome';
                let nomeUsuario = '#nomeUsuario';

                if ($(nomeFun).length) {
                    $(nomeFun).autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                url: "http://10.20.20.207/tasy/api/funcionario.php",
                                dataType: "json",
                                data: {
                                    nomeFun: request.term
                                },
                                success: function (data) {
                                    if (data.error) {
                                        console.error('Erro ao buscar funcionários:', data.error);
                                        response([]);
                                    } else if (data.length === 0) {
                                        response([{ label: "Nenhum funcionário encontrado", value: "" }]);
                                    } else {
                                        response(data);
                                    }
                                },
                                error: function () {
                                    console.error('Erro ao buscar funcionários. Servidor indisponível.');
                                    response([]);
                                }
                            });
                        },
                        minLength: 3,
                        select: function (event, ui) {
                            if (ui.item) {
                                $(nomeFun).val(ui.item.NM_USUARIO);
                                $(nome).val(ui.item.DS_USUARIO);
                                $(nomeUsuario).val(ui.item.NM_USUARIO);
                            }
                            return false;
                        }
                    }).data('ui-autocomplete')._renderItem = function (ul, item) {
                        return $('<li>').append('<div>' + item.DS_USUARIO + '</div>').appendTo(ul);
                    };
                }
            });
        }

        if (window.location.pathname.includes('arquivo.php')) {
            $(document).ready(function () {
                let nomepac = '#nomepac'
                let nomepacLab = '#nomepacLab'
                if (nomepac) {
                    $(nomepac).autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                url: "http://10.1.1.108/intranet//src/services/api/arquivo-paciente.php",
                                dataType: "json",
                                data: {
                                    nomepac: request.term
                                },
                                success: function (data) {
                                    if (data.length === 0) {
                                        response([{ label: "Nenhum paciente encontrado", value: "" }]);
                                    } else {
                                        response(data);
                                    }
                                },
                                error: function () {
                                    response([{ label: "Erro ao buscar pacientes", value: "" }]);
                                }
                            });
                        },
                        minLength: 8,
                        select: function (event, ui) {
                            if (ui.item.value !== "") {
                                $("#nomepac").val(ui.item.label);
                            }
                            return false;
                        },
                        focus: function (event, ui) {
                            event.preventDefault();
                        }
                    });
                }
                if (nomepacLab) {
                    $(nomepacLab).autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                url: "http://10.1.1.108/intranet//src/services/api/arquivo-paciente.php",
                                dataType: "json",
                                data: {
                                    nomepac: request.term
                                },
                                success: function (data) {
                                    if (data.length === 0) {
                                        response([{ label: "Nenhum paciente encontrado", value: "" }]);
                                    } else {
                                        response(data);
                                    }
                                },
                                error: function () {
                                    response([{ label: "Erro ao buscar pacientes", value: "" }]);
                                }
                            });
                        },
                        minLength: 8,
                        select: function (event, ui) {
                            if (ui.item.value !== "") {
                                $("#nomepacLab").val(ui.item.label);
                            }
                            return false;
                        },
                        focus: function (event, ui) {
                            event.preventDefault();
                        }
                    });
                }
            });
            this.pdfEvoEnfermagem();
            this.pdfEvoMedPdf();
            this.labResultadoPdf();
        }

        if (window.location.pathname.includes('cadastros.php')) {
            this.eventsCsv();
            this.abrirModalPreventiva();
            this.abrirModalUsuario();
        }
        if (window.location.pathname.includes('cadastrarUser.php')) {
            this.dataModel.fetchData('../services/api/controle-usuario.php', this.dadosControleUsuario);
            this.abrirModalUsuario();
        }
        if (window.location.pathname.includes('dashboard.php')) {
            document.addEventListener('DOMContentLoaded', () => {
                let saveChartBtn = document.getElementById('saveChartBtn');
                if (saveChartBtn) {
                    saveChartBtn.addEventListener('click', () => {
                        this.saveChart();
                    });
                }
            });
        }
    }

    //////////////////////////////////////////////////////////////LOADING///////////////////////////////////////////////////////////////////////

    verificarDataEHora() {
        const agora = new Date();
        if (agora.getDate() === 1 && agora.getHours() === 6 && agora.getMinutes() === 0) {
            this.executarCodigo();
        }
    }

    executarCodigo() {
        fetch('..\services\api\adicionar\add_csv_aniversariante.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao chamar o arquivo PHP');
                }
                return response.text();
            })
            .then(data => {
                console.log('Código PHP executado com sucesso:', data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao obter dados:', error);
            throw error;
        }

    }

    eventsCsv() {
        document.getElementById('csvFile').addEventListener('change', (event) => {
            this.handleFileChange(event);
        });

        document.getElementById('saveChangesBtn').addEventListener('click', () => {
            this.submitImportCsv();
        });
    }

    handleFileChange(event) {
        const fileInfo = document.getElementById('fileInfo');
        const fileNameSpan = document.getElementById('fileName');
        const fileSizeSpan = document.getElementById('fileSize');
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            fileNameSpan.textContent = file.name;
            fileSizeSpan.textContent = this.formatFileSize(file.size);
            fileInfo.classList.remove('d-none');
        } else {
            fileInfo.classList.add('d-none');
        }
    }

    formatFileSize(bytes) {
        const kilobyte = 1024;
        const megabyte = kilobyte * 1024;
        if (bytes < kilobyte) {
            return bytes + ' B';
        } else if (bytes < megabyte) {
            return (bytes / kilobyte).toFixed(2) + ' KB';
        } else {
            return (bytes / megabyte).toFixed(2) + ' MB';
        }
    }

    dadosArquivo = (data) => {
        this.view.renderTableArquivo(data);
    }

    tableLaboratorio = (data) => {
        this.view.renderTableLaboratorio(data);
    }

    dadosAniversariante = (data) => {
        this.view.renderTableAniversariante(data);
    }

    dadosPreventiva = (data) => {
        this.view.renderTablePreventiva(data);
    }

    dadosControleUsuario = (data) => {
        this.view.renderTableControleUsuario(data);
    }

    tableLaboratorioAdm = (data) => {
        this.view.renderTableLaboratorioAdm(data);
    }

    tableLaboratorioChart = (data) => {
        this.view.chartAdministrativo(data);
    }

    tableExamesTriagemId = (data) => {
        this.view.rendertableExamesTriagem(data);
    }

    tableLaboratorioAgenciaTable = (data) => {
        this.view.rendertableLaboratorioAgenciaTable(data);
        this.view.rendertableLaboratorioAgenciaIndic(data);
    }

    tableLaboratorioAgenciaSaidaTable = (data) => {
        this.view.rendertableLaboratorioAgenciaSaidaTable(data);
    }

    tableLaboratorioSolicitacaoTable = (data) => {
        this.view.rendertableLaboratorioSolicitacaoTable(data);
    }

    tableNirEletivas = (data) => {
        this.view.rendertableNirEletivas(data);
    }

    tableTransfusaoLab = (data) => {
        this.view.rendertranfusaoLaboratorial(data);
    }

    tabler034fun = (data) => {
        this.view.tabler034fun(data);
    }


    dadosSolicitacaoTranfusionais = (data) => {
        if (window.location.pathname.includes('dashAgenciaTranfusional.php')) {
            this.view.renderSolicitacaoTransfusionalFitro(data);
            Utils.alertaGrafico('1');
        }
    }
    dadosTransfRealizadas = (data) => {
        let btn = document.getElementById('transRealTurno-dash-tab')
        btn.addEventListener('click', () => {
            this.view.renderTransfRealizadasFitro(data);
            Utils.alertaGrafico('2');
        });
    }
    dadosTempoMedioTransf = (data) => {
        let btn = document.getElementById('tempMedioTrans-dash-tab')
        btn.addEventListener('click', () => {
            this.view.renderTempoMedioTransfFitro(data);
            Utils.alertaGrafico('3');
        });
    }


    dadosPaTempoAtendMedico = (data) => {
        if (window.location.pathname.includes('dashoardEmergencia.php')) {
            this.view.renderPaTempoAtendMedico(data);
            Utils.alertaGrafico('4');
        }
    }
    dadosTempoMedioPosTriagem = (data) => {
        let btn = document.getElementById('temp-atend-pos-dash-tab')
        btn.addEventListener('click', () => {
            this.view.renderTempoMedioAtendTriagem(data);
            Utils.alertaGrafico('5');
        });
    }
    dadosTempoMedioEspTriagem = (data) => {
        let btn = document.getElementById('temp-esp-dash-tab')
        btn.addEventListener('click', () => {
            this.view.renderTempoMedioEspera(data);
            Utils.alertaGrafico('6');
        });
    }


    dadosTaxaMortalidadeFetal = (data) => {
        if (window.location.pathname.includes('dashboardCvo.php')) {
            this.view.renderTaxaMortalidadeFetal(data);
            Utils.alertaGrafico('7');
        }
    }
    dadosTaxaMortalidadeGeral = (data) => {
        let btn = document.getElementById('taxa-mort-geral-tab')
        btn.addEventListener('click', () => {
            this.view.renderTaxaMortalidadeGeral(data);
            Utils.alertaGrafico('8');
        });
    }
    dadosTaxaMortalidadeNeo = (data) => {
        let btn = document.getElementById('taxa-mort-neonatal-tab')
        btn.addEventListener('click', () => {
            this.view.renderTaxaMortalidadeNeo(data);
            Utils.alertaGrafico('9');
        });
    }


    dadosTaxaAmaHoraVida = (data) => {
        if (window.location.pathname.includes('dashboardPartosCesarea.php')) {
            this.view.renderTaxaAmaHoraVida(data);
            Utils.alertaGrafico('10');
        }
    }
    dadosTaxaContatoPele = (data) => {
        let btn = document.getElementById('perc-contato-pele-tab')
        btn.addEventListener('click', () => {
            this.view.renderTaxaContatoPele(data);
            Utils.alertaGrafico('11');
        });
    }
    dadosTaxaPrematuridade = (data) => {
        let btn = document.getElementById('perc-prematuridade-tab')
        btn.addEventListener('click', () => {
            this.view.renderTaxaPrematuridade(data);
            Utils.alertaGrafico('12');
        });
    }
    dadosTaxaReanimacao = (data) => {
        let btn = document.getElementById('perc-reanimacao-neo-tab')
        btn.addEventListener('click', () => {
            this.view.renderTaxaReanimacao(data);
            Utils.alertaGrafico('13');
        });
    }


    dadosTaxaAmaHoraVidaN = (data) => {
        if (window.location.pathname.includes('dashboardPartosNormal.php')) {
            this.view.renderTaxaAmaHoraVidaN(data);
            Utils.alertaGrafico('14');
        }
    }
    dadosTaxaContatoPeleN = (data) => {
        let btn = document.getElementById('perc-contato-pele-norm-tab')
        btn.addEventListener('click', () => {
            this.view.renderTaxaContatoPeleN(data);
            Utils.alertaGrafico('15');
        });
    }
    dadosTaxaPrematuridadeN = (data) => {
        let btn = document.getElementById('perc-prematuridade-norm-tab')
        btn.addEventListener('click', () => {
            this.view.renderTaxaPrematuridadeN(data);
            Utils.alertaGrafico('16');
        });
    }
    dadosTaxaReanimacaoN = (data) => {
        let btn = document.getElementById('perc-reanimacao-neo-norm-tab')
        btn.addEventListener('click', () => {
            this.view.renderTaxaReanimacaoN(data);
            Utils.alertaGrafico('17');
        });
    }


    dadosCapacidadeAgend = (data) => {
        if (window.location.pathname.includes('dashboardRecepcao.php')) {
            this.view.renderCapacidadeAgend(data);
            Utils.alertaGrafico('18');
        }
    }
    dadosPercAbsenteismo = (data) => {
        let btn = document.getElementById('perc-absenteismo-tab')
        btn.addEventListener('click', () => {
            this.view.renderPercAbsenteismo(data);
            Utils.alertaGrafico('19');
        });
    }


    dadosObesidadePc = (data) => {
        if (window.location.pathname.includes('dashboardObstetra.php')) {
            this.view.renderObesidadePc(data);
            Utils.alertaGrafico('21');
        }
    }
    dadosObesidadePn = (data) => {
        let btn = document.getElementById('gestante-diabete-pn-tab')
        btn.addEventListener('click', () => {
            this.view.renderObesidadePn(data);
            Utils.alertaGrafico('22');
        });
    }


    dadosEspacoJasmim = () => {
        this.dataModel.fetchData('http://10.1.1.108/intranet/src/services/api/espacoJasmin.php', this.dadosEspacoJasmin);
    }

    dadosEspacoJasmin = (data) => {
        this.view.renderEspacoJasmin(data);
    }

    dadosEspacoRosa = () => {
        this.dataModel.fetchData('http://10.1.1.108/intranet/src/services/api/espacoRosa.php', this.dadosEspacoRosaV);
    }

    dadosEspacoRosaV = (data) => {
        this.view.renderEspacoRosa(data);
    }

    dadosOcupacaoJasmim = (data) => {
        this.view.renderOcupacaoJasmim(data);
    }

    dadosOcupacaoRosa = (data) => {
        this.view.renderOcupacaoRosa(data);
    }
    /* Catracas Henry */
    dadosCatracaHenry = (data) => {
        this.view.renderCatracaHenry(data);
    }

    dadosCatracaTopdata = (data) => {
        this.view.renderCatracaTopdata(data);
    }


    dadosOcupacaoJasmimReserva = (data) => {
        const alertasReservasContainer = document.querySelector('.alertas-reservas');
        const badgeCounter = document.querySelector('.badge-counter');

        alertasReservasContainer.innerHTML = `
            <h6 class="dropdown-header">
                Central de alertas
            </h6>
        `;

        let alertCount = 0;

        data.forEach(item => {
            const isReserva = item.NM_PACIENTE_RESERVA && item.NM_PACIENTE_RESERVA.trim() !== "-";
            const isInterditado = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Interditado";
            const isHigienizacao = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Em higienização";
            const isAgHigienizacao = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Aguardando higienização";
            const isManutencao = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Manutenção";
            const isLivre = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Livre";

            if (isReserva || isInterditado || isHigienizacao || isAgHigienizacao || isManutencao || isLivre) {
                alertCount++;
                let alertMessage;
                if (isReserva) {
                    alertMessage = `Reserva: ${item.NM_PACIENTE_RESERVA}`;
                } else if (isInterditado) {
                    alertMessage = `Leito Interditado`;
                } else if (isHigienizacao) {
                    alertMessage = `Leito em Higienização`;
                } else if (isAgHigienizacao) {
                    alertMessage = `Aguardando higienização`;
                } else if (isManutencao) {
                    alertMessage = `Manutenção`;
                } else if (isLivre) {
                    alertMessage = `Livre`;
                }
                const alertItem = `
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <div class="mr-3">
                            <div class="icon-circle bg-primary">
                                <i class="fas fa-file-alt text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div class="small font-weight-bold">${alertMessage}</div>
                            <span class="font-weight-bold">${item.CD_UNIDADE.trim()}</span>
                        </div>
                    </a>
                `;
                alertasReservasContainer.insertAdjacentHTML('beforeend', alertItem);
            }
        });
        if (alertCount === 0) {
            const noAlertItem = `
                <a class="dropdown-item text-center small text-gray-500" href="#">Sem alertas</a>
            `;
            alertasReservasContainer.insertAdjacentHTML('beforeend', noAlertItem);
        }
        badgeCounter.textContent = alertCount > 0 ? alertCount : '';
    };

    dadosOcupacaoRosaReserva = (data) => {
        const alertasReservasContainer = document.querySelector('.alertas-reservas-rosa');
        const badgeCounter = document.querySelector('.badge-counter');
        alertasReservasContainer.innerHTML = `
            <h6 class="dropdown-header">
                Central de alertas
            </h6>
        `;
        let alertCount = 0;
        data.forEach(item => {
            const isReserva = item.NM_PACIENTE_RESERVA && item.NM_PACIENTE_RESERVA.trim() !== "-";
            const isInterditado = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Interditado";
            const isHigienizacao = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Em higienização";
            const isAgHigienizacao = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Aguardando higienização";
            const isManutencao = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Manutenção";
            const isLivre = item.STATUS_UNIDADE && item.STATUS_UNIDADE.trim() == "Livre";

            if (isReserva || isInterditado || isHigienizacao || isAgHigienizacao || isManutencao || isLivre) {
                alertCount++;
                let alertMessage;
                if (isReserva) {
                    alertMessage = `Reserva: ${item.NM_PACIENTE_RESERVA}`;
                } else if (isInterditado) {
                    alertMessage = `Leito Interditado`;
                } else if (isHigienizacao) {
                    alertMessage = `Leito em Higienização`;
                } else if (isAgHigienizacao) {
                    alertMessage = `Aguardando higienização`;
                } else if (isManutencao) {
                    alertMessage = `Manutenção`;
                } else if (isLivre) {
                    alertMessage = `Livre`;
                }
                const alertItem = `
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <div class="mr-3">
                            <div class="icon-circle bg-primary">
                                <i class="fas fa-file-alt text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div class="small font-weight-bold">${alertMessage}</div>
                            <span class="font-weight-bold">${item.CD_UNIDADE.trim()}</span>
                        </div>
                    </a>
                `;
                alertasReservasContainer.insertAdjacentHTML('beforeend', alertItem);
            }
        });
        if (alertCount === 0) {
            const noAlertItem = `
                <a class="dropdown-item text-center small text-gray-500" href="#">Sem alertas</a>
            `;
            alertasReservasContainer.insertAdjacentHTML('beforeend', noAlertItem);
        }
        badgeCounter.textContent = alertCount > 0 ? alertCount : '';
    };

    dadosGraficos = (data) => {
        this.view.renderApiIndicadores(data);
    }



    tableExamesTriagemCampo = (data) => {
        const datalistExame = document.getElementById('datalistExame');
        const datalistClinica = document.getElementById('datalistClinica');
        const addedExames = new Set();
        const addedClinicas = new Set();
        data.forEach(item => {
            const exameTrimmed = item.exame.trim();
            const clinicaTrimmed = item.clinica.trim();

            if (!addedExames.has(exameTrimmed)) {
                const optionExame = document.createElement('option');
                optionExame.value = exameTrimmed;
                datalistExame.appendChild(optionExame);
                addedExames.add(exameTrimmed);
            }

            if (!addedClinicas.has(clinicaTrimmed)) {
                const optionClinica = document.createElement('option');
                optionClinica.value = clinicaTrimmed;
                datalistClinica.appendChild(optionClinica);
                addedClinicas.add(clinicaTrimmed);
            }
        });

        const inputExame = document.getElementById('ds_exame');
        const inputClinica = document.getElementById('ds_clinica');

        inputExame.addEventListener('input', (event) => {
            const selectedExame = event.target.value;
            console.log('Exame selecionado:', selectedExame);
        });

        inputClinica.addEventListener('input', (event) => {
            const selectedClinica = event.target.value;
            console.log('Clinica selecionada:', selectedClinica);
        });
    };

    tableLaboratorioTrigem = (data) => {
        this.view.renderTableLaboratorioTrigem(data)
    }

    dadosequipeTi = (data) => {
        if (!data) {
            return;
        }
        if (this.isLoadingData) {
            return;
        }
        try {
            this.isLoadingData = true;

            const jsonData = data
            const index = [];
            const nomes = [];
            const funcoes = [];
            const entradas = [];

            jsonData.forEach((item) => {
                const id = item.id;
                const nome = item.nome;
                const funcao = item.funcao;
                const entrada = item.dt_entrada;

                index.push(id);
                nomes.push(nome);
                funcoes.push(funcao);
                entradas.push(entrada);
            });

            this.table.innerHTML = '';
            this.view.renderEquipeTi(index, nomes, funcoes, entradas);
        } catch (error) {
        } finally {
            this.isLoadingData = false;
        }
    }


    //////////////////////////////////////////////////////////////ADICIONAR///////////////////////////////////////////////////////////////////////

    submitFormTecnico() {

        if (this.isSubmitting) {
            return;
        }
        if (!this.form.nome.value || !this.form.funcao.value || !this.form.dt_entrada.value) {
            this.statusMessage.innerHTML = "Por favor, preencha todos os campos.";
            return;
        }

        this.isSubmitting = true;
        this.formData.nome = this.form.nome.value;
        this.formData.funcao = this.form.funcao.value;
        this.formData.dt_entrada = this.form.dt_entrada.value;

        $.ajax({
            type: "POST",
            url: this._urlAddTecEquipe,
            data: this.formData,
            dataType: "json",
            success: (response) => {
                if (response.status) {
                    Utils.showMessage(response.msg)
                    $(this.modal).modal("hide");
                    this.dataModel.fetchData('../services/api/equipe_ti.php', this.dadosequipeTi)
                } else {
                    Utils.showMessage(response.msg)
                }
            },
            error: (xhr, textStatus, errorThrown) => {
                if (xhr.status === 401) {
                    this.statusMessage.innerHTML = "Erro de autenticação.";
                } else {
                    this.statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                }
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }


    async submitFormUsuarios() {
        $("#funcao").val($("#funcaoSelect").val());
        this.isSubmitting = true;
        this.formUsuario.nome = this.formUsuarioId.nome.value;
        this.formUsuario.nomeUsuario = this.formUsuarioId.nomeUsuario.value;
        this.formUsuario.senha = this.formUsuarioId.senha.value;
        this.formUsuario.funcao = this.formUsuarioId.funcao.value;

        $.ajax({
            type: "POST",
            url: this._urlUsuarios,
            data: this.formUsuario,
            dataType: "json",
            success: (response) => {
                if (response.status) {
                    Utils.showMessage(response.msg)
                    this.formUsuarioId.reset();
                    $(this.modal).modal("hide");
                    $('#tableControleUser').DataTable().destroy();
                    this.dataModel.fetchData('../services/api/controle-usuario.php', this.dadosControleUsuario);
                } else {
                    Utils.showMessage(response.msg)
                }
            },
            error: (xhr, textStatus, errorThrown) => {
                if (xhr.status === 401) {
                    this.statusMessage.innerHTML = "Erro de autenticação.";
                } else {
                    this.statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                }
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }

    async submitImportCsv() {
        const formData = new FormData(this.formCsv);
        $.ajax({
            type: "POST",
            url: this._urlAddCsv,
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            beforeSend: () => {
                $("#loadingOverlay").show();
            },
            success: (response) => {
                setTimeout(() => {
                    if (response.status) {
                        $("#modalCsv").modal('hide');
                        Swal.fire("Sucesso!", "Enviado com sucesso!", "success");
                        $('#tableAniversariante').DataTable().destroy();
                        this.dataModel.fetchData('../services/api/aniversariante.php', this.dadosAniversariante);
                    } else {
                        Swal.fire("Erro!", "Erro ao enviar o csv!", "danger");
                    }
                }, 100);
            },
            error: (xhr, textStatus, errorThrown) => {
                if (xhr.status === 401) {
                    this.statusMessage.innerHTML = "Erro de autenticação.";
                } else {
                    this.statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                }
            },
            complete: () => {
                $("#loadingOverlay").hide();
                this.isSubmitting = false;
            }
        });
    }

    submitFormAdmLaboratorio() {
        const formDataAdmLab = {
            prescricao: this.admLaboratorioFormData.querySelector('[name="prescricao"]').value,
            atendimento: this.admLaboratorioFormData.querySelector('[name="atendimento"]').value,
            dtEntrada: this.admLaboratorioFormData.querySelector('[name="dtEntrada"]').value,
            horaEntrada: this.admLaboratorioFormData.querySelector('[name="hrEntrada"]').value,
            dtChegada: this.admLaboratorioFormData.querySelector('[name="hrChegada"]').value,
            local: this.admLaboratorioFormData.querySelector('[name="local"]').value,
            dtNascimento: this.admLaboratorioFormData.querySelector('[name="dtNascimento"]').value,
            paciente: this.admLaboratorioFormData.querySelector('[name="paciente"]').value,
            coletor: this.admLaboratorioFormData.querySelector('[name="coletor"]').value,
            exame: this.admLaboratorioFormData.querySelector('[name="exame"]').value,
            puncao: this.admLaboratorioFormData.querySelector('[name="puncao"]').value,
            descricao: this.admLaboratorioFormData.querySelector('[name="descricao"]').value,
            total: this.admLaboratorioFormData.querySelector('[name="total"]').value
        };
        $.ajax({
            type: "POST",
            url: this._urlAddAdmLaboratorio,
            data: formDataAdmLab,
            dataType: "json",
            success: (response) => {
                if (response.status) {
                    this.statusMessage.innerHTML = response.msg;
                    this.admLaboratorioFormData.reset();
                    Swal.fire({
                        title: "Success!",
                        text: response.msg,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        Swal.fire({
                            title: 'Deseja adicionar outro exame?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sim',
                            cancelButtonText: 'Não',
                        }).then((confirmResult) => {
                            if (confirmResult.isConfirmed) {

                            } else {
                                window.location.reload();
                            }
                        });
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.msg,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            },
            error: (xhr, textStatus, errorThrown) => {
                if (xhr.status === 401) {
                    this.statusMessage.innerHTML = "Erro de autenticação.";
                } else {
                    this.statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                }
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }

    
    submitFormPreventiva() {

        if (this.isSubmitting) {
            return;
        }

        const formFields = [
            "patrimonio", "monitor", "descricao", "andar", "custo",
            "local", "hostAntigo", "hostNovo", "login", "office",
            "perifericos", "sistemaOperacional", "tecnico", "modelo",
            "observacao", "dataPrev", "dataProx"
        ];

        for (const field of formFields) {
            const inputElement = this.preventivaFormData.querySelector(`[name="${field}"]`);

            if (!inputElement) {
                continue;
            }
        }

        this.isSubmitting = true;
        let monitorInput = this.preventivaFormData.querySelector('[name="monitor"]');
        let officeInput = this.preventivaFormData.querySelector('[name="office"]');
        let officeValue = officeInput.value.trim();

        if (officeValue.length < 25) {
            officeInput.value = "Formato de senha incorreta";
        }
        if (officeInput.value == "") {
            officeInput.value = "Não especificado"
        }
        if (monitorInput.length < 4) {
            $("#monito").val("Não especificado")
        }

        $("#perifericos").val($("#perifericosSelect").val());
        $("#andar").val($("#andarSelect").val());
        $("#modelo").val($("#modeloSelect").val());
        $("#sistemaOperacional").val($("#sistemaOperacionalSelect").val());
        $("#tecnico").val($("#tecnicoSelect option:selected").data("id"));


        const formData = {
            patrimonio: this.preventivaFormData.querySelector('[name="patrimonio"]').value,
            monitor: this.preventivaFormData.querySelector('[name="monitor"]').value,
            descricao: this.preventivaFormData.querySelector('[name="descricao"]').value,
            andar: this.preventivaFormData.querySelector('[name="andar"]').value,
            custo: this.preventivaFormData.querySelector('[name="custo"]').value,
            local_: this.preventivaFormData.querySelector('[name="local"]').value,
            hostAntigo: this.preventivaFormData.querySelector('[name="hostAntigo"]').value,
            hostNovo: this.preventivaFormData.querySelector('[name="hostNovo"]').value,
            login: this.preventivaFormData.querySelector('[name="login"]').value,
            office: this.preventivaFormData.querySelector('[name="office"]').value,
            perifericos: this.preventivaFormData.querySelector('[name="perifericos"]').value,
            sistemaOperacional: this.preventivaFormData.querySelector('[name="sistemaOperacional"]').value,
            tecnico: this.preventivaFormData.querySelector('[name="tecnico"]').value,
            modelo: this.preventivaFormData.querySelector('[name="modelo"]').value,
            observacao: this.preventivaFormData.querySelector('[name="observacao"]').value,
            dataPrev: this.preventivaFormData.querySelector('[name="dataPrev"]').value,
            dataProx: this.preventivaFormData.querySelector('[name="dataProx"]').value
        };

        const localInput = this.preventivaFormData.querySelector('[name="patrimonio"]');
        if (!localInput || !localInput.value.trim()) {
            this.statusMessage.innerHTML = "Erro: o campo 'local' não pode ser vazio.";
            this.isSubmitting = false;
            return;
        }

        $.ajax({
            type: "POST",
            url: this._urlAddPreventiva,
            data: formData,
            dataType: "json",
            success: (response) => {
                if (response.status) {
                    this.statusMessage.innerHTML = response.msg;
                    this.preventivaFormData.reset();
                    Utils.showMessage(response.msg)
                    $('#tablePreventiva').DataTable().destroy();
                    this.dataModel.fetchData('../services/api/request_tecnico.php', this.dadosPreventiva);
                } else {
                    Utils.showMessage(response.msg)
                }
            },
            error: (xhr, textStatus, errorThrown) => {
                if (xhr.status === 401) {
                    this.statusMessage.innerHTML = "Erro de autenticação.";
                } else {
                    this.statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                }
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }

    submitFormAcessoCatracaHenry() {
        let form = this.formAcessoCatracaHenry;
        const formData = {
            tipo: form.querySelector('[name="tipo"]').value,
            codigo_acesso: form.querySelector('[name="codigo_acesso"]').value,
            tipo_cartao: form.querySelector('[name="tipo_cartao"]').value,
            cartao: form.querySelector('[name="cartao"]').value,
            validade_inicial: form.querySelector('[name="validade_inicial"]').value,
            validade_final: form.querySelector('[name="validade_final"]').value,
            sequencia_acesso: form.querySelector('[name="sequencia_acesso"]').value
        };

        Utils.addData('../services/api/adicionar/enviar_cartao.php', formData)
            .then(response => {
                switch (response.command) {
                    case 'ECAR':
                        Utils.showAlert('Success', 'Cartão enviado com sucesso!', 'success');
                        break;
                    default:
                        Utils.showAlert('Error', 'Erro desconhecido ao enviar o cartão.', 'error');
                        break;
                }
            })
            .catch(error => {
                Utils.showAlert('Error', `Erro na comunicação com o servidor: ${error.message}`, 'error');
            });
    }

    submitFormMapaJasmin() {
        const formData = {
            nr_atendimento: this.formMapaJasmin.querySelector('[name="atendimento"]').value,
            nm_paciente: this.formMapaJasmin.querySelector('[name="paciente"]').value,
            ds_leito: this.formMapaJasmin.querySelector('[name="leito"]').value,
            dt_parto: this.formMapaJasmin.querySelector('[name="dtParto"]').value,
            dt_admissao: this.formMapaJasmin.querySelector('[name="dtAdmissao"]').value,
            ds_dieta: this.formMapaJasmin.querySelector('[name="dieta"]').value,
            ds_fugulin: this.formMapaJasmin.querySelector('[name="fugulin"]').value,
            dt_escalas: this.formMapaJasmin.querySelector('[name="escalas"]').value,
            dt_sae_rn: this.formMapaJasmin.querySelector('[name="saeRn"]').value,
            ds_idade: this.formMapaJasmin.querySelector('[name="idade"]').value,
            ds_observacao_aduto: this.formMapaJasmin.querySelector('[name="obsAdultoHidden"]').value,
            ds_observacao_rn: this.formMapaJasmin.querySelector('[name="obsRnHidden"]').value,
            nm_usuario: this.formMapaJasmin.querySelector('[name="usuario"]').value,
        };
        $.ajax({
            type: "POST",
            url: this._urlAddMapaJasmim,
            data: formData,
            dataType: "json",
            success: (response) => {
                if (response.status) {
                    this.statusMessage.innerHTML = response.msg;
                    this.formMapaJasmin.reset();
                    Swal.fire({
                        title: "Success!",
                        text: response.msg,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        Swal.fire({
                            title: 'Deseja adicionar outro paciÊnte?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sim',
                            cancelButtonText: 'Não',
                        }).then((confirmResult) => {
                            if (confirmResult.isConfirmed) {
                                window.location.reload();
                            } else {
                                window.location.reload();
                            }
                        });
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.msg,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            },
            error: (xhr, textStatus, errorThrown) => {
                if (xhr.status === 401) {
                    this.statusMessage.innerHTML = "Erro de autenticação.";
                } else {
                    this.statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                }
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }

    submitFormEletivasRelatorio() {
        const dataInicio = this.formEletivaRelatorio.querySelector('[name="dataInicio"]').value;
        const dataFinal = this.formEletivaRelatorio.querySelector('[name="dataFinal"]').value;
        const status = this.formEletivaRelatorio.querySelector('[name="status"]').value;
        const procedimento = this.formEletivaRelatorio.querySelector('[name="procedimento"]').value;
        const medico = this.formEletivaRelatorio.querySelector('[name="medico"]').value;
        const formatoSelecionado = this.formEletivaRelatorio.querySelector('[name="formato"]').value;

        if (!formatoSelecionado) {
            Swal.fire("Selecione um formato de relatório", "", "warning");
            return;
        }

        const dateInicio = new Date(dataInicio);
        const dateFinal = new Date(dataFinal);

        const diferencaEmMilissegundos = dateFinal - dateInicio;
        const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

        let url;
        switch (formatoSelecionado) {
            case 'EXCEL':
                url = `../services/relatorio/xlsx/eletivas.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&status=${status}&procedimento=${procedimento}&medico=${medico}`;
                break;
            case 'PDF':
                url = `../services/relatorio/pdf/eletivas.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&status=${status}&procedimento=${procedimento}&medico=${medico}`;
                break;
            default:
                console.error('Formato inválido selecionado.');
                return;
        }
        const loadingWindow = window.open('http://10.20.20.207/tasy/loading.html', '_blank');

        setTimeout(() => {
            loadingWindow.location.href = url;
        }, 3000);
    }
    submitFormRelatorio() {
        const dataInicio = this.formRelatorioSolicTransf.querySelector('[name="dataInicio"]').value;
        const dataFinal = this.formRelatorioSolicTransf.querySelector('[name="dataFinal"]').value;
        const tela = this.formRelatorioSolicTransf.querySelector('[name="tela"]').value;
        const formatoSelecionado = this.formRelatorioSolicTransf.querySelector('[name="formato"]').value;
        if (!formatoSelecionado) {
            Swal.fire("Selecione um formato de relatório", "", "warning");
            return;
        }
        let url;
        switch (formatoSelecionado) {
            case 'EXCEL':
                url = `http://10.20.20.207/tasy/relatorio/xlsx/relatorio_dash.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&tela=${tela}`;
                break;
            case 'PDF':
                url = `http://10.20.20.207/tasy/relatorio/pdf/relatorio_dash.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&tela=${tela}`;
                break;
            default:
                console.error('Formato inválido selecionado.');
                return;
        }
        const loadingWindow = window.open('http://10.20.20.207/tasy/loading.html', '_blank');
        setTimeout(() => {
            loadingWindow.location.href = url;
        }, 3000);
    }

    submitFormJasmimRelatorio() {
        const dataInicio = this.formJasmimRelatorio.querySelector('[name="dataInicio"]').value;
        const dataFinal = this.formJasmimRelatorio.querySelector('[name="dataFinal"]').value;
        const ds_periodo = this.formJasmimRelatorio.querySelector('[name="ds_periodo"]').value;
        const formatoSelecionado = this.formJasmimRelatorio.querySelector('[name="formato"]').value;

        if (!formatoSelecionado) {
            Swal.fire("Selecione um formato de relatório", "", "warning");
            return;
        }


        let url;
        switch (formatoSelecionado) {
            case 'EXCEL':
                url = `../services/relatorio/xlsx/jasmim.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&ds_periodo=${ds_periodo}`;
                break;
            case 'PDF':
                url = `../services/relatorio/pdf/jasmim.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&ds_periodo=${ds_periodo}`;
                break;
            default:
                console.error('Formato inválido selecionado.');
                return;
        }
        const loadingWindow = window.open('http://10.20.20.207/tasy/loading.html', '_blank');

        setTimeout(() => {
            loadingWindow.location.href = url;
        }, 3000);
    }

    submitFormRosaRelatorio() {

        const dataInicio = this.formRosaRelatorio.querySelector('[name="dataInicio"]').value;
        const dataFinal = this.formRosaRelatorio.querySelector('[name="dataFinal"]').value;
        const ds_periodo = this.formRosaRelatorio.querySelector('[name="ds_periodo"]').value;
        const formatoSelecionado = this.formRosaRelatorio.querySelector('[name="formato"]').value;

        if (!formatoSelecionado) {
            Swal.fire("Selecione um formato de relatório", "", "warning");
            return;
        }

        let url;
        switch (formatoSelecionado) {
            case 'EXCEL':
                url = `../services/relatorio/xlsx/rosa.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&ds_periodo=${ds_periodo}`;
                break;
            case 'PDF':
                url = `../services/relatorio/pdf/rosa.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&ds_periodo=${ds_periodo}`;
                break;
            default:
                console.error('Formato inválido selecionado.');
                return;
        }
        const loadingWindow = window.open('http://10.20.20.207/tasy/loading.html', '_blank');

        setTimeout(() => {
            loadingWindow.location.href = url;
        }, 3000);
    }
    submitFormAdmLaboratorioRelatorio() {
        const dataInicio = this.formAdmRelatorio.querySelector('[name="dataInicio"]').value;
        const dataFinal = this.formAdmRelatorio.querySelector('[name="dataFinal"]').value;
        const ds_puncao = this.formAdmRelatorio.querySelector('[name="ds_puncao"]').value;
        const formatoSelecionado = this.formAdmRelatorio.querySelector('[name="formato"]').value;

        if (!formatoSelecionado) {
            Swal.fire("Selecione um formato de relatório", "", "warning");
            return;
        }

        const dateInicio = new Date(dataInicio);
        const dateFinal = new Date(dataFinal);
        const diferencaEmMilissegundos = dateFinal - dateInicio;

        let url;
        if (formatoSelecionado === 'EXCEL') {
            url = `../services/relatorio/xlsx/laboratorio-adm.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&ds_puncao=${ds_puncao}`;
        } else if (formatoSelecionado === 'PDF') {
            url = `../services/relatorio/pdf/laboratorio-adm.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&ds_puncao=${ds_puncao}`;
        } else {
            console.error('Formato inválido selecionado.');
            return;
        }
        const loadingWindow = window.open('http://10.20.20.207/tasy/loading.html', '_blank');

        setTimeout(() => {
            loadingWindow.location.href = url;
        }, 3000);
    }

    submitFormTriagemLaboratorioRelatorio() {
        const dataInicio = this.formTriagemRelatorio.querySelector('[name="dataInicio"]').value;
        const dataFinal = this.formTriagemRelatorio.querySelector('[name="dataFinal"]').value;
        const clinica = this.formTriagemRelatorio.querySelector('[name="ds_clinica"]').value;
        const formatoSelecionado = this.formTriagemRelatorio.querySelector('[name="formato"]').value;
        if (!formatoSelecionado) {
            Swal.fire("Selecione um formato de relatório", "", "warning");
            return;
        }
        let url;
        switch (formatoSelecionado) {
            case 'EXCEL':
                url = `../services/relatorio/xlsx/laboratorio-triagem.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&ds_clinica=${clinica}`;
                break;
            case 'PDF':
                url = `../services/relatorio/pdf/laboratorio-triagem.php?dataInicio=${dataInicio}&dataFinal=${dataFinal}&ds_clinica=${clinica}`;
                break;
            default:
                console.error('Formato inválido selecionado.');
                return;
        }
        const loadingWindow = window.open('http://10.20.20.207/tasy/loading.html', '_blank');
        setTimeout(() => {
            loadingWindow.location.href = url;
        }, 3000);
    }

    saveChart() {
        const chartName = document.getElementById('chartName').value;
        const tableName = document.getElementById('tableName').value;
        const fields = document.getElementById('fields').value;
        const dateField = document.getElementById('dateField').value;
        const chartOptions = {
            chartType: 'line',
            tableName: tableName,
            fields: fields.split(','),
            dateField: dateField
        };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../services/api/graficos.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: response.message,
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        formgrafico.reset();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: response.message,
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Erro na requisição AJAX. Por favor, tente novamente.',
                    confirmButtonText: 'OK'
                });
            }
        };
        const formData = `chartName=${encodeURIComponent(chartName)}&tableName=${encodeURIComponent(tableName)}&fields=${encodeURIComponent(fields)}&dateField=${encodeURIComponent(dateField)}&chartOptions=${encodeURIComponent(JSON.stringify(chartOptions))}`;
        xhr.send(formData);
    }

    submitFormExamesTriagem() {
        const formExamesTriagem = document.getElementById('examesTriagem');
        formExamesTriagem.addEventListener('submit', (event) => {
            event.preventDefault();
            const formExamesTriagemData = {
                nm_exame: formExamesTriagem.querySelector('[name="nm_exame"]').value,
                nm_clinica: formExamesTriagem.querySelector('[name="nm_clinica"]').value
            };
            $.ajax({
                type: "POST",
                url: this._add_exame_triagem,
                data: formExamesTriagemData,
                dataType: "json",
                success: (response) => {
                    if (response.status) {
                        Swal.fire({
                            title: "Success!",
                            text: response.msg,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(() => {
                            Swal.fire({
                                title: 'Deseja adicionar outro exame?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sim',
                                cancelButtonText: 'Não',
                            }).then((confirmResult) => {
                                if (confirmResult.isConfirmed) {
                                    formExamesTriagem.reset();
                                } else {
                                    window.location.reload();
                                }
                            });
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: response.msg,
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                },
                error: (xhr, textStatus, errorThrown) => {
                    const statusMessage = this.statusMessage || document.createElement('div');
                    if (xhr.status === 401) {
                        statusMessage.innerHTML = "Erro de autenticação.";
                    } else {
                        statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                        document.body.appendChild(statusMessage);
                        console.error("AJAX Error:", xhr, textStatus, errorThrown);
                    }
                },
                complete: () => {
                    this.isSubmitting = false;
                }
            });
        });
    }

    submitFormIndicador() {
        const formIndicador = document.getElementById('formAnalise');
        const formIndicadorData = {
            mesAno: formIndicador.querySelector('[name="mesAno"]').value,
            solicitacaoTransf: formIndicador.querySelector('[name="solicitacaoTransf"]').value,
            analise: formIndicador.querySelector('[name="analiseHidden"]').value,
            planoAcao: formIndicador.querySelector('[name="planoAcaoHidden"]').value,
            solicitacaoTransfId: formIndicador.querySelector('[name="solicitacaoTransfId"]').value,
            mesAnoAcao: formIndicador.querySelector('[name="mesAnoAcao"]').value,
        };
        $.ajax({
            type: "POST",
            url: this._add_indicador,
            data: formIndicadorData,
            dataType: "json",
            success: (response) => {
                if (response.status) {
                    Swal.fire({
                        title: "Success!",
                        text: response.msg,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((confirmResult) => {
                        if (confirmResult.isConfirmed) {
                            formIndicador.querySelector('[name="mesAno"]').value = '';
                            formIndicador.querySelector('[name="analiseHidden"]').value = '';
                            formIndicador.querySelector('[name="planoAcaoHidden"]').value = '';
                            formIndicador.querySelector('[name="mesAnoAcao"]').value = '';
                            Utils.alertaGrafico($('#solicitacaoTransfId').val())
                        } else {
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.msg,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            },
            error: (xhr, textStatus, errorThrown) => {
                const statusMessage = this.statusMessage || document.createElement('div');
                if (xhr.status === 401) {
                    statusMessage.innerHTML = "Erro de autenticação.";
                } else {
                    statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                    document.body.appendChild(statusMessage);
                    console.error("AJAX Error:", xhr, textStatus, errorThrown);
                }
            },
            complete: () => {
                this.isSubmitting = false;
                $('[id^=tableAnalise]').each(function () {
                    if ($.fn.DataTable.isDataTable(this)) {
                        $(this).DataTable().destroy();
                    }
                });

                $('[id^=planoAcaoResult]').each(function () {
                    if ($.fn.DataTable.isDataTable(this)) {
                        $(this).DataTable().destroy();
                    }
                });
                Utils.clearQuillFields(['analise', 'planoAcao']);
                $('#analiseIndicadores').modal('hide');
                this.dataModel.fetchData('http://10.1.1.108/intranet/src/services/api/graficos.php', this.dadosGraficos);
            }

        });
    }

    submitFormNirEletivas() {
        const formAtualizarNir = document.getElementById('formAtualizarNir');
        formAtualizarNir.addEventListener('submit', (event) => {
            event.preventDefault();
            const formAtualizarNirData = {
                ds_observacao: formAtualizarNir.querySelector('[name="ds_observacaoHidden"]').value,
                ds_medico_exec: formAtualizarNir.querySelector('[name="ds_medico_exec"]').value,
                ds_procedimento: formAtualizarNir.querySelector('[name="ds_procedimento"]').value,
                ds_municipio: formAtualizarNir.querySelector('[name="ds_municipio"]').value,
                nr_prontuario: formAtualizarNir.querySelector('[name="nr_prontuario"]').value,
                dt_aih: formAtualizarNir.querySelector('[name="dt_aih"]').value,
                dt_nascimento: formAtualizarNir.querySelector('[name="dt_nascimento"]').value,
                cd_senha_aih: formAtualizarNir.querySelector('[name="cd_senha_aih"]').value,
                cd_protocolo: formAtualizarNir.querySelector('[name="cd_protocolo"]').value,
                nm_paciente: formAtualizarNir.querySelector('[name="nm_paciente"]').value,
                cd_procedimento: formAtualizarNir.querySelector('[name="cd_procedimento"]').value,
            };
            $.ajax({
                type: "POST",
                url: this._add_nir_eletivas,
                data: formAtualizarNirData,
                dataType: "json",
                success: (response) => {
                    if (response.status) {
                        Swal.fire({
                            title: "Success!",
                            text: response.msg,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(() => {
                            Swal.fire({
                                title: 'Deseja adicionar outra AIH?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sim',
                                cancelButtonText: 'Não',
                            }).then((confirmResult) => {
                                if (confirmResult.isConfirmed) {
                                    formAtualizarNir.reset();
                                    $('#modalAtualizar').modal('show');
                                } else {
                                    Swal.fire("Sucesso!", "Editado com sucesso!", "success").then(async (result) => {
                                        $('#tableNirEletivas').DataTable().destroy();
                                        $('#tableRealizadasNir').DataTable().destroy();
                                        $('#tableNirInativas').DataTable().destroy();
                                        this.dataModel.fetchData('../services/api/nir-api.php', this.tableNirEletivas);
                                        $('#modalAtualizar').modal('hide');

                                    })
                                }
                            });
                        });
                    } else {
                        $('#loadingOverlayLab').hide();
                        Swal.fire({
                            title: "Error!",
                            text: response.msg,
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                },
                error: (xhr, textStatus, errorThrown) => {
                    const statusMessage = this.statusMessage || document.createElement('div');

                    if (xhr.status === 401) {
                        statusMessage.innerHTML = "Erro de autenticação.";
                    } else {
                        statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                        document.body.appendChild(statusMessage);
                        console.error("AJAX Error:", xhr, textStatus, errorThrown);
                    }
                },
                complete: () => {
                    this.isSubmitting = false;
                }
            });
        });
    }

    submitFormTriagemLaboratorio() {
        const formDataTriagemLab = document.getElementById('labTriagem');
        formDataTriagemLab.addEventListener('submit', (event) => {
            event.preventDefault();
            const formDataTriagemData = {
                nr_prescricao: this.formTriagemLab.querySelector('[name="nr_prescricao"]').value,
                nr_atendimento: this.formTriagemLab.querySelector('[name="nr_atendimento"]').value,
                dt_entrada: this.formTriagemLab.querySelector('[name="dt_entrada"]').value,
                nm_paciente: this.formTriagemLab.querySelector('[name="nm_paciente"]').value,
                cd_estabelecimento: this.formTriagemLab.querySelector('[name="cd_estabelecimento"]').value,
                ds_exame: this.formTriagemLab.querySelector('[name="ds_exame"]').value,
                ds_clinica: this.formTriagemLab.querySelector('[name="ds_clinica"]').value,
                status: this.formTriagemLab.querySelector('[name="status"]').value,
                confirmacao: this.formTriagemLab.querySelector('[name="confirmacao"]').value,
                textoSelecionado: this.formTriagemLab.querySelector('[name="texto-selecionado"]').value,
                observacao: this.formTriagemLab.querySelector('[name="observacao"]').value,
            };
            if (formDataTriagemData.status === 'ENVIADO DIA:') {
                this.formTriagemLab.querySelector('[name="status"]').classList.add('is-invalid');
                console.error('Status is "ENVIADO DIA". Form not submitted.');
                return;
            }
            $.ajax({
                type: "POST",
                url: this._urlAddTriagemLaboratorio,
                data: formDataTriagemData,
                dataType: "json",
                success: (response) => {
                    if (response.status) {
                        this.statusMessage.innerHTML = response.msg;
                        Swal.fire({
                            title: "Success!",
                            text: response.msg,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(() => {
                            Swal.fire({
                                title: 'Deseja adicionar outro exame?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sim',
                                cancelButtonText: 'Não',
                            }).then((confirmResult) => {
                                if (confirmResult.isConfirmed) {
                                    let statusValue = this.formTriagemLab.elements['status'].value;
                                    this.formTriagemLab.reset();
                                    this.formTriagemLab.querySelector('[name="status"]').classList.remove('is-invalid');
                                    this.formTriagemLab.elements['status'].value = statusValue;
                                } else {
                                    $('#tableLaboratorioTrigemTable').DataTable().destroy();
                                    this.dataModel.fetchData('../services/api/laboratorio_triagem_table.php', this.tableLaboratorioTrigem);
                                    this.formTriagemLab.reset();
                                    $('#modal-labTrigem').modal('hide');
                                }
                            });
                        });

                    } else {
                        $('#loadingOverlayLab').hide();
                        Swal.fire({
                            title: "Error!",
                            text: response.msg,
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                },
                error: (xhr, textStatus, errorThrown) => {
                    if (xhr.status === 401) {
                        this.statusMessage.innerHTML = "Erro de autenticação.";
                    } else {
                        this.statusMessage.innerHTML = "Erro na requisição AJAX: " + errorThrown;
                    }
                },
                complete: () => {
                    this.isSubmitting = false;
                }
            });
        });

    }

    //////////////////////////////////////////////////////////////////////EDITAR//////////////////////////////////////////////////////////////////////////////

    // Editar Tecnicos
    async editarTecnico() {

        const modal = document.getElementById("tecnicoEditModal");
        const form = document.getElementById("formEditTecnico");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            try {
                const response = await fetch(this._urlEditTecEquipe, {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                const data = await response.json();
                if (data.status) {
                    Utils.showMessage(data.msg)
                    $(modal).modal("hide");
                    this.dataModel.fetchData('../services/api/equipe_ti.php', this.dadosequipeTi);
                } else {
                    Utils.showMessage(data.msg)
                }
            } catch (error) {

                console.error('Erro na solicitação:', error);
            }
        });
    }

    editarUsuario() {
        const modal = $("#modal-userEditar");
        const form = $("#cadastroUsuarioEditar");
        form.on("submit", (event) => {
            event.preventDefault();
            var idEditar = form.find("#idEditar").val();
            $.ajax({
                url: this._urlEditRedefinirUser,
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({ idEditar: idEditar }),
                success: (data) => {
                    if (data.status) {
                        modal.modal("hide");
                        Swal.fire(data.msg, "", "success");
                    } else {
                        Swal.fire(data.msg, "", "danger");
                    }
                },
                error: (xhr, status, error) => {
                    console.error('Erro na solicitação:', error);
                }
            });
        });
    }

    async editarPreventiva() {
        const modal = document.getElementById("modal-prev-editar");
        const form = document.getElementById("preventivaFormEditar");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            try {
                const response = await fetch(this._urlEditPreventiva, {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                const data = await response.json();
                if (data.status) {
                    Utils.showMessage(data.msg)
                    $(modal).modal("hide");
                    $('#tablePreventiva').DataTable().destroy();
                    this.dataModel.fetchData('../services/api/request_tecnico.php', this.dadosPreventiva);
                } else {
                    Utils.showMessage(data.msg)
                }
            } catch (error) {
                console.error('Erro na solicitação:', error);
            }
        });
    }

    editarTriagemLab() {
        const modal = document.getElementById("modal-labTrigemEditar");
        const form = document.getElementById("labTriagemEditar");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            Swal.fire({
                title: 'Confirmação',
                text: 'Deseja realmente editar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const formData = new FormData(form);
                    try {
                        const response = await fetch(this._urlEditTriagemLab, {
                            method: 'POST',
                            body: formData,
                        });
                        if (!response.ok) {
                            throw new Error(`Erro na solicitação: ${response.status}`);
                        }
                        const data = await response.json();
                        if (data.status) {
                            $(modal).modal("hide");
                            Swal.fire("Sucesso!", "Editado com sucesso!", "success").then(async (result) => {
                                $('#tableLaboratorioTrigemTable').DataTable().destroy();
                                this.dataModel.fetchData('../services/api/laboratorio_triagem_table.php', this.tableLaboratorioTrigem);
                            })
                        } else {
                            Utils.showMessage(data.msg);
                        }
                    } catch (error) {

                        console.error('Erro na solicitação:', error);
                    }
                }
            });
        });
    }

    editarAcesso() {
        const modal = document.getElementById("modal-catraca-edit");
        const form = document.getElementById("formAcessoCatracaEdit");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            Swal.fire({
                title: 'Confirmação',
                text: 'Deseja realmente editar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const formData = new FormData(form);
                    try {
                        const response = await fetch(this._urlEditAcesso, {
                            method: 'POST',
                            body: formData,
                        });
                        if (!response.ok) {
                            throw new Error(`Erro na solicitação: ${response.status}`);
                        }
                        const data = await response.json();
                        if (data.status) {
                            $(modal).modal("hide");
                            Swal.fire("Sucesso!", "Editado com sucesso!", "success").then(async (result) => {
                                window.location.reload();
                            })
                        } else {
                            $(modal).modal("hide");
                            Swal.fire("Sucesso!", "Editado com sucesso!", "success").then(async (result) => {
                                window.location.reload();
                            })
                        }
                    } catch (error) {
                        $(modal).modal("hide");
                        Swal.fire("Sucesso!", "Editado com sucesso!", "success").then(async (result) => {
                            window.location.reload();
                        })
                    }
                }
            });
        });
    }

    editarIndicador() {
        const form = document.getElementById("formAnaliseAgencia");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            Swal.fire({
                title: 'Confirmação',
                text: 'Deseja realmente editar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const formData = new FormData(form);
                    try {
                        const response = await fetch(this._urlEditIdicadorAgencia, {
                            method: 'POST',
                            body: formData,
                        });
                        if (!response.ok) {
                            this.showErrorMessage('O campo concluído é obrigatório');
                        }
                        const data = await response.json();
                        if (data.status) {
                            Swal.fire("Sucesso!", "Editado com sucesso!", "success").then(async (result) => {
                                const tableAnaliseElements = $('[id^=tableAnalise]');
                                const planoAcaoResultElements = $('[id^=planoAcaoResult]');
                                tableAnaliseElements.each(function () {
                                    if ($.fn.DataTable.isDataTable(this)) {
                                        $(this).DataTable().destroy();
                                    }
                                });
                                planoAcaoResultElements.each(function () {
                                    if ($.fn.DataTable.isDataTable(this)) {
                                        $(this).DataTable().destroy();
                                    }
                                });
                                Utils.clearQuillFields(['analise', 'planoAcao']);
                                $('#editarIndicador').modal('hide');
                                Utils.alertaGrafico($('#solicitacaoTransfId').val())
                                this.dataModel.fetchData('http://10.1.1.108/intranet/src/services/api/graficos.php', this.dadosGraficos);
                            });
                        } else {
                            this.showErrorMessage('Não foi possivel voltar status, consultar o administrador!');
                        }
                    } catch (error) {
                        console.error('Erro na solicitação:', error);
                    }
                }
            });
        });
    }

    async editarEletivasNir() {
        const modal = document.getElementById("modalEditar");
        const form = document.getElementById("formEditarNir");
        event.preventDefault();

        try {
            const confirmed = await this.confirmDialog("Deseja realmente editar?");

            if (!confirmed) return;

            const formData = new FormData(form);
            const response = await fetch(this._urlEditNirEletivas, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }

            const data = await response.json();

            if (data.status) {
                $('#tableNirEletivas').DataTable().destroy();
                $('#tableRealizadasNir').DataTable().destroy();
                $('#tableNirInativas').DataTable().destroy();
                this.dataModel.fetchData('../services/api/nir-api.php', this.tableNirEletivas);
                await this.showSuccessMessage("Editado com sucesso!");
                $(modal).modal("hide");
            } else {
                await this.showErrorMessage(data.msg);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    async confirmDialog(message) {
        const result = await Swal.fire({
            title: 'Confirmação',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        });
        return result.isConfirmed;
    }

    async showSuccessMessage(message) {
        await Swal.fire("Sucesso!", message, "success");
    }

    async showErrorMessage(message) {
        await Swal.fire("Erro!", message, "error");
    }

    inativarEletivasNir(button) {
        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente inativar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const id = $(button).data('id');
                    /* $('button.btn-atualizacao-excluir-nir').data('id'); */
                    if (!id) {
                        throw new Error("ID não fornecido!");
                    }
                    const formData = new FormData();
                    formData.append('id', id);

                    const response = await fetch(this._urlInativarNirEletivas, {
                        method: 'POST',
                        body: formData,
                    });
                    if (!response.ok) {
                        throw new Error(`Erro na solicitação: ${response.status}`);
                    }
                    const data = await response.json();
                    if (data.status) {
                        Swal.fire("Sucesso!", "Inativado com sucesso!", "success").then(async (result) => {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire("Erro!", data.msg, "danger");
                    }
                } catch (error) {
                    console.error('Erro na solicitação:', error);
                    Swal.fire("Erro!", error.message, "error");
                }
            }
        });
    }



    ativarEletivasNir(button) {
        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente Ativar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const id = $(button).data('id');
                    if (!id) {
                        throw new Error("ID não fornecido!");
                    }
                    const formData = new FormData();
                    formData.append('id', id);

                    const response = await fetch(this._urlAtivarNirEletivas, {
                        method: 'POST',
                        body: formData,
                    });
                    if (!response.ok) {
                        throw new Error(`Erro na solicitação: ${response.status}`);
                    }
                    const data = await response.json();
                    if (data.status) {
                        Swal.fire("Sucesso!", "Ativado com sucesso!", "success").then(async (result) => {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire("Erro!", data.msg, "danger");
                    }
                } catch (error) {
                    console.error('Erro na solicitação:', error);
                    Swal.fire("Erro!", error.message, "error");
                }
            }
        });
    }

    labAdmEditar() {
        const modal = document.getElementById("modal-adm-lab-editar");
        const form = document.getElementById("labAdministrativoEditar");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            Swal.fire({
                title: 'Confirmação',
                text: 'Deseja realmente editar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const formData = new FormData(form);
                    try {
                        const response = await fetch(this._urlEditAdmLab, {
                            method: 'POST',
                            body: formData,
                        });
                        if (!response.ok) {
                            throw new Error(`Erro na solicitação: ${response.status}`);
                        }
                        const data = await response.json();
                        if (data.status) {
                            $(modal).modal("hide");
                            Swal.fire("Sucesso!", "Editado com sucesso!", "success").then(async (result) => {
                                window.location.reload();
                            })
                        } else {
                            Utils.showMessage(data.msg);
                        }
                    } catch (error) {
                        console.error('Erro na solicitação:', error);
                    }
                }
            });
        });
    }

    editarMapaJasmim() {
        const modal = document.getElementById("modalMapaJasminEdit");
        const form = document.getElementById("formMapaJasminEdit");
        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente editar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const formData = new FormData(form);
                try {
                    const response = await fetch(this._urlEditMapaJasmim, {
                        method: 'POST',
                        body: formData,
                    });
                    if (!response.ok) {
                        throw new Error(`Erro na solicitação: ${response.status}`);
                    }
                    const data = await response.json();
                    if (data.status) {
                        $(modal).modal("hide");
                        Swal.fire("Sucesso!", "Editado com sucesso!", "success").then(async (result) => {
                            window.location.reload();
                        })
                    } else {
                        Utils.showMessage(data.msg);
                    }
                } catch (error) {
                    console.error('Erro na solicitação:', error);
                }
            }
        });
    }

    editarMapaRosa() {
        const modal = document.getElementById("modalMapaRosaEdit");
        const form = document.getElementById("formMapaRosaEdit");
        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente editar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const formData = new FormData(form);
                try {
                    const response = await fetch(this._urlEditMapaJasmim, {
                        method: 'POST',
                        body: formData,
                    });
                    if (!response.ok) {
                        throw new Error(`Erro na solicitação: ${response.status}`);
                    }
                    const data = await response.json();
                    if (data.status) {
                        $(modal).modal("hide");
                        Swal.fire("Sucesso!", "Editado com sucesso!", "success").then(async (result) => {
                            window.location.reload();
                        })
                    } else {
                        Utils.showMessage(data.msg);
                    }
                } catch (error) {
                    console.error('Erro na solicitação:', error);
                }
            }
        });
    }

    handleEditarTecnico(button) {
        const modal = document.getElementById("tecnicoEditModal");
        $(modal).modal("show");
        const id = button.getAttribute("data-id");
        const nome = button.getAttribute("data-nome");
        const funcao = button.getAttribute("data-funcao");
        const entrada = button.getAttribute("data-entrada");
        $("#idEdit").val(id);
        $("#nomeEdit").val(nome);
        $("#funcaoEdit").val(funcao);
        $("#dt_entradaEdit").val(entrada);
        this.formEdit.addEventListener("submit", (event) => {
            event.preventDefault();
            this.editarTecnico();
        });
    }

    handleEditarUsuario(button) {
        const modal = document.getElementById("modal-userEditar");
        $(modal).modal("show");
        const table = $('#tableControleUser').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        let id = rowData.id
        let nome = rowData.nome;
        let usuario = rowData.usuario;
        let funcao = rowData.funcao;
        $("#idEditar").val(id);
        $("#nomeEditar").val(nome);
        $("#nomeUsuarioEditar").val(usuario);
        $("#funcaoSelectEditar").val(funcao);
        $("#senhaEditar").val();

        this.formcadastroUsuarioEditar.addEventListener("submit", (event) => {
            event.preventDefault();
            this.editarUsuario();

        });
    }

    handleEditarTriagemLab(button) {
        const modal = document.getElementById("modal-labTrigemEditar");
        $(modal).modal("show");
        const table = $('#tableLaboratorioTrigemTable').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const id = rowData.id
        const nr_prescricao = rowData.nr_prescricao;
        const nr_atendimento = rowData.nr_atendimento;
        const dt_entrada = rowData.dt_entrada;
        const nm_paciente = rowData.nm_paciente;
        const cd_estabelecimento = rowData.cd_estabelecimento;
        const ds_exame = rowData.ds_exame;
        const local = rowData.ds_local;
        const status = rowData.status;
        const cd_confirmacao = rowData.cd_confirmacao;
        const ds_observacao = rowData.ds_observacao;

        $("#idEditar").val(id);
        $("#nr_prescricaoEditar").val(nr_prescricao);
        $("#nr_atendimentoEditar").val(nr_atendimento);
        $("#dt_entradaEditar").val(dt_entrada);
        $("#nm_pacienteEditar").val(nm_paciente);
        $("#cd_estabelecimentoEditar").val(cd_estabelecimento);
        $("#ds_exameEditar").val(ds_exame);
        $("#ds_clinicaEditar").val(local);
        $("#statusEditar").val(status);
        $("#confirmacaoEditar").val(cd_confirmacao);
        $("#observacaoEditar").val(ds_observacao);
        this.editarTriagemLab();
    }

    handleEditarAcesso(button) {
        const modal = document.getElementById("modal-catraca-edit");
        $(modal).modal("show");
        const table = $('#tabler034fun').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        console.log(rowData);
        const tipcolEdit = rowData.tipcol;
        const numempEdit = rowData.numemp;
        const numCadEdit = rowData.numcad;
        const nomFunEdit = rowData.nomfun;
        const apeFunEdit = rowData.apefun;
        const dtAdmEdit = rowData.datadm;
        const datnasEdit = rowData.datnas;
        const numCraEdit = rowData.numcra;
        const numFisEdit = rowData.numfis;
        const datfimEdit = rowData.datfim;

        $("#tipcolEdit").val(tipcolEdit);
        $("#numempEdit").val(numempEdit);
        $("#numCadEdit").val(numCadEdit);
        $("#nomFunEdit").val(nomFunEdit);
        $("#apeFunEdit").val(apeFunEdit);
        $("#dtAdmEdit").val(Utils.formatarData(dtAdmEdit));
        $("#datfimEdit").val(Utils.formatarData(datfimEdit));
        $("#datnasEdit").val(Utils.formatarData(datnasEdit));
        $("#numCraEdit").val(numCraEdit);
        $("#numFisEdit").val(numFisEdit);
        this.editarAcesso();
    }


    handleEditarNirEletivas(button) {
        const modal = document.getElementById("modalEditar");
        $(modal).modal("show");
        const table = $('#tableNirEletivas').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const primary = rowData.id;
        const nm_paciente = rowData.nm_paciente;
        const cd_procedimento = rowData.cd_procedimento;
        const cd_protocolo = rowData.cd_protocolo;
        const cd_senha_aih = rowData.cd_senha_aih;
        const dt_aih = rowData.dt_aih;
        const dt_nascimento = rowData.dt_nascimento;
        const nr_prontuario = rowData.nr_prontuario;
        const ds_municipio = rowData.ds_municipio;
        const ds_medico_exec = rowData.ds_medico_exec;
        const dt_medico_exec = rowData.dt_medico_exec;
        const ds_procedimento = rowData.ds_procedimento;
        const ds_observacao = rowData.ds_observacao;

        $("#idEdit").val(primary);
        $("#dt_aihEdit").val(dt_aih);
        $("#nm_pacienteEdit").val(nm_paciente);
        $("#cd_procedimentoEdit").val(cd_procedimento);
        $("#cd_protocoloEdit").val(cd_protocolo);
        $("#cd_senha_aihEdit").val(cd_senha_aih);
        $("#dt_nascimentoEdit").val(dt_nascimento)
        $("#nr_prontuarioEdit").val(nr_prontuario);
        $("#ds_municipioEdit").val(ds_municipio);
        $("#dt_medicoEdit").val(dt_medico_exec);
        $("#ds_procedimentoEdit").val(ds_procedimento);
        $("#ds_medico_execEdit").val(ds_medico_exec);
        $("#ds_observacaoEdit").val(Utils.fillQuillContent('ds_observacaoEdit', ds_observacao));
        this.formNirEletivasId.addEventListener("submit", (event) => {
            event.preventDefault();
            this.editarEletivasNir();
        });
    }

    handleEditarNirEletivasRealizadas(button) {
        const modal = document.getElementById("modalEditar");
        $(modal).modal("show");
        const table = $('#tableRealizadasNir').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const primary = rowData.id;
        const nm_paciente = rowData.nm_paciente;
        const cd_procedimento = rowData.cd_procedimento;
        const cd_protocolo = rowData.cd_protocolo;
        const cd_senha_aih = rowData.cd_senha_aih;
        const dt_aih = rowData.dt_aih;
        const dt_nascimento = rowData.dt_nascimento;
        const nr_prontuario = rowData.nr_prontuario;
        const ds_municipio = rowData.ds_municipio;
        const ds_medico_exec = rowData.ds_medico_exec;
        const dt_medico_exec = rowData.dt_medico_exec;
        const ds_procedimento = rowData.ds_procedimento;
        const ds_observacao = rowData.ds_observacao;

        $("#idEdit").val(primary);
        $("#dt_aihEdit").val(dt_aih);
        $("#nm_pacienteEdit").val(nm_paciente);
        $("#cd_procedimentoEdit").val(cd_procedimento);
        $("#cd_protocoloEdit").val(cd_protocolo);
        $("#cd_senha_aihEdit").val(cd_senha_aih);
        $("#dt_nascimentoEdit").val(dt_nascimento)
        $("#nr_prontuarioEdit").val(nr_prontuario);
        $("#ds_municipioEdit").val(ds_municipio);
        $("#dt_medicoEdit").val(dt_medico_exec);
        $("#ds_procedimentoEdit").val(ds_procedimento);
        $("#ds_medico_execEdit").val(ds_medico_exec);
        $("#ds_observacaoEdit").val(ds_observacao);
        this.formNirEletivasId.addEventListener("submit", (event) => {
            event.preventDefault();
            this.editarEletivasNir();
        });
    }

    handleEditarPreventiva(button) {
        const modal = document.getElementById("modal-prev-editar");
        $(modal).modal("show");
        const table = $('#tablePreventiva').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const id = rowData.id
        const patrimonio = rowData.patrimonio;
        const monitor = rowData.Monitor;
        const observacao = rowData.observacao;
        const andar = rowData.Andar;
        const custo = rowData.custo;
        const dataPrev = rowData.data_prev;
        const dataProx = rowData.data_prox;
        const hostAntigo = rowData.hostName_Antigo;
        const hostNovo = rowData.hostName_Novo;
        const local = rowData.local_;
        const login = rowData.login;
        const descricao = rowData.descricao;
        const versaoOffice = rowData.modelo;
        const office = rowData.office;
        const perifericos = rowData.perifericos;
        const sistemaOperacional = rowData.sistema_Operacional;

        $("#idEditar").val(id);
        $("#patrimonioEditar").val(patrimonio);
        $("#monitorEditar").val(monitor);
        $("#observacaoEditar").val(observacao);
        $("#custoEditar").val(custo);
        $("#dataPrevEditar").val(dataPrev);
        $("#dataProxEditar").val(dataProx);
        $("#hostAntigoEditar").val(hostAntigo);
        $("#hostNovoEditar").val(hostNovo);
        $("#localEditar").val(local);
        $("#loginEditar").val(login);
        $("#descricaoEditar").val(descricao);
        $("#officeEditar").val(office);
        $("#modeloSelectEditar").val(versaoOffice);
        $("#modeloEditar").val(versaoOffice);
        $("#perifericosSelectEditar").val(perifericos);
        $("#perifericosEditar").val(perifericos);
        $("#andarSelectEditar").val(andar);
        $("#andarEditar").val(andar);
        $("#sistemaOperacionalSelectEditar").val(sistemaOperacional);
        $("#sistemaOperacionalEditar").val(sistemaOperacional);

        modal.addEventListener("click", (event) => {
            if (event.target.id === 'sistemaOperacionalSelectEditar') {
                $("#sistemaOperacionalEditar").val($("#sistemaOperacionalSelectEditar").val());
            }
            else if (event.target.id === 'andarSelectEditar') {
                console.log('teste');
                $("#andarEditar").val($("#andarSelectEditar").val());
            }
            else if (event.target.id === 'perifericosSelectEditar') {
                $("#perifericosEditar").val($("#perifericosSelectEditar").val());
            }
            else if (event.target.id === 'modeloSelectEditar') {
                $("#modeloEditar").val($("#modeloSelectEditar").val());
            }
            else if (event.target.id === 'tecnicoSelectEditar') {
                $("#tecnicoEditar").val($("#tecnicoSelectEditar option:selected").data("id"));
            }
        });

        this.formEditPreventiva.addEventListener("submit", (event) => {
            event.preventDefault();
            this.editarPreventiva();
        });
    }

    handleVisualizarMapa(button) {
        const modal = document.getElementById("modalMapaJasminView");
        $(modal).modal("show");
        const table = $('#tableMapaInternacaoJasmin').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const primary = rowData.nr_atendimento;
        const nm_paciente = rowData.nm_paciente;
        const ds_idade = rowData.ds_idade;
        const dt_admissao = rowData.dt_admissao;
        const dt_parto = rowData.dt_parto;
        const ds_dieta = rowData.ds_dieta;
        const ds_fugulin = rowData.ds_fugulin;
        const dt_escalas = rowData.dt_escalas;
        const ds_leito = rowData.ds_leito;
        const nm_usuario = rowData.nm_usuario;
        const dt_sae_rn = rowData.dt_sae_rn;
        const ds_observacao = rowData.ds_observacao_aduto;
        const ds_observacao_rn = rowData.ds_observacao_rn;

        $("#atendimentoView").val(primary);
        $("#leitoView").val(ds_leito);
        $("#pacienteView").val(nm_paciente);
        $("#dtAdmissaoView").val(dt_admissao);
        $("#idadeView").val(ds_idade);
        $("#dtPartoView").val(dt_parto);
        $("#dietaView").val(ds_dieta)
        $("#fugulinView").val(ds_fugulin);
        $("#escalasView").val(dt_escalas);
        $("#saeRnView").val(dt_sae_rn);
        $("#usuarioView").val(nm_usuario);
        $("#obsRnView").val(Utils.fillQuillContent('obsRnView', ds_observacao_rn,));
        $("#obsAdultoView").val(Utils.fillQuillContent('obsAdultoView', ds_observacao));
    }

    handleEditarMapa(button) {
        const modal = document.getElementById("modalMapaJasminEdit");
        $(modal).modal("show");
        const table = $('#tableMapaInternacaoJasmin').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const nr_atendimento = rowData.nr_atendimento;
        const nm_paciente = rowData.nm_paciente;
        const ds_idade = rowData.ds_idade;
        const dt_admissao = rowData.dt_admissao;
        const dt_parto = rowData.dt_parto;
        const ds_dieta = rowData.ds_dieta;
        const ds_fugulin = rowData.ds_fugulin;
        const dt_escalas = rowData.dt_escalas;
        const ds_leito = rowData.ds_leito;
        const dt_sae_rn = rowData.dt_sae_rn;
        const nm_usuario = $('#dropdownMenuButton').text().trim();
        const ds_observacao = rowData.ds_observacao_aduto;
        const ds_observacao_rn = rowData.ds_observacao_rn;
        const dt_atualizacao = new Date().toISOString().slice(0, 19).replace('T', ' ');


        $("#nr_atendimento").val(nr_atendimento);
        $("#ds_leito").val(ds_leito);
        $("#nm_paciente").val(nm_paciente);
        $("#dt_admissao").val(dt_admissao);
        $("#ds_idade").val(ds_idade);
        $("#dt_parto").val(dt_parto);
        $("#ds_dieta").val(ds_dieta)
        $("#ds_fugulin").val(ds_fugulin);
        $("#dt_escalas").val(dt_escalas);
        $("#dt_sae_rn").val(dt_sae_rn);
        $("#nm_usuario").val(nm_usuario);
        $("#dt_atualizacao").val(dt_atualizacao);
        $("#obsRnEdit").val(Utils.fillQuillContent('obsRnEdit', ds_observacao_rn,));
        $("#obsAdultoEdit").val(Utils.fillQuillContent('obsAdultoEdit', ds_observacao));
        let formMapaJasminEdit = document.getElementById('formMapaJasminEdit')
        formMapaJasminEdit.addEventListener("submit", (event) => {
            event.preventDefault();
            this.editarMapaJasmim();
        });
    }

    handleVisualizarMapaRosa(button) {
        const modal = document.getElementById("modalMapaRosaView");
        $(modal).modal("show");
        const table = $('#tableMapaInternacaoRosa').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const primary = rowData.nr_atendimento;
        const nm_paciente = rowData.nm_paciente;
        const ds_idade = rowData.ds_idade;
        const dt_admissao = rowData.dt_admissao;
        const dt_parto = rowData.dt_parto;
        const ds_dieta = rowData.ds_dieta;
        const ds_fugulin = rowData.ds_fugulin;
        const dt_escalas = rowData.dt_escalas;
        const ds_leito = rowData.ds_leito;
        const nm_usuario = rowData.nm_usuario;
        const dt_sae_rn = rowData.dt_sae_rn;
        const ds_observacao = rowData.ds_observacao_aduto;
        const ds_observacao_rn = rowData.ds_observacao_rn;

        $("#atendimentoView").val(primary);
        $("#leitoView").val(ds_leito);
        $("#pacienteView").val(nm_paciente);
        $("#dtAdmissaoView").val(dt_admissao);
        $("#idadeView").val(ds_idade);
        $("#dtPartoView").val(dt_parto);
        $("#dietaView").val(ds_dieta)
        $("#fugulinView").val(ds_fugulin);
        $("#escalasView").val(dt_escalas);
        $("#saeRnView").val(dt_sae_rn);
        $("#usuarioView").val(nm_usuario);
        $("#obsRnView").val(Utils.fillQuillContent('obsRnView', ds_observacao_rn,));
        $("#obsAdultoView").val(Utils.fillQuillContent('obsAdultoView', ds_observacao));
    }

    handleEditarMapa(button) {
        const modal = document.getElementById("modalMapaJasminEdit");
        $(modal).modal("show");
        const table = $('#tableMapaInternacaoJasmin').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const nr_atendimento = rowData.nr_atendimento;
        const nm_paciente = rowData.nm_paciente;
        const ds_idade = rowData.ds_idade;
        const dt_admissao = rowData.dt_admissao;
        const dt_parto = rowData.dt_parto;
        const ds_dieta = rowData.ds_dieta;
        const ds_fugulin = rowData.ds_fugulin;
        const dt_escalas = rowData.dt_escalas;
        const ds_leito = rowData.ds_leito;
        const dt_sae_rn = rowData.dt_sae_rn;
        const nm_usuario = $('#dropdownMenuButton').text().trim();
        const ds_observacao = rowData.ds_observacao_aduto;
        const ds_observacao_rn = rowData.ds_observacao_rn;
        const dt_atualizacao = new Date().toISOString().slice(0, 19).replace('T', ' ');


        $("#nr_atendimento").val(nr_atendimento);
        $("#ds_leito").val(ds_leito);
        $("#nm_paciente").val(nm_paciente);
        $("#dt_admissao").val(dt_admissao);
        $("#ds_idade").val(ds_idade);
        $("#dt_parto").val(dt_parto);
        $("#ds_dieta").val(ds_dieta)
        $("#ds_fugulin").val(ds_fugulin);
        $("#dt_escalas").val(dt_escalas);
        $("#dt_sae_rn").val(dt_sae_rn);
        $("#nm_usuario").val(nm_usuario);
        $("#dt_atualizacao").val(dt_atualizacao);
        $("#obsRnEdit").val(Utils.fillQuillContent('obsRnEdit', ds_observacao_rn,));
        $("#obsAdultoEdit").val(Utils.fillQuillContent('obsAdultoEdit', ds_observacao));
        let formMapaJasminEdit = document.getElementById('formMapaJasminEdit')
        formMapaJasminEdit.addEventListener("submit", (event) => {
            event.preventDefault();
            this.editarMapaJasmim();
        });
    }


    handleVisualizarMapa(button) {
        const modal = document.getElementById("modalMapaJasminView");
        $(modal).modal("show");
        const table = $('#tableMapaInternacaoJasmin').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const primary = rowData.nr_atendimento;
        const nm_paciente = rowData.nm_paciente;
        const ds_idade = rowData.ds_idade;
        const dt_admissao = rowData.dt_admissao;
        const dt_parto = rowData.dt_parto;
        const ds_dieta = rowData.ds_dieta;
        const ds_fugulin = rowData.ds_fugulin;
        const dt_escalas = rowData.dt_escalas;
        const ds_leito = rowData.ds_leito;
        const nm_usuario = rowData.nm_usuario;
        const dt_sae_rn = rowData.dt_sae_rn;
        const ds_observacao = rowData.ds_observacao_aduto;
        const ds_observacao_rn = rowData.ds_observacao_rn;

        $("#atendimentoView").val(primary);
        $("#leitoView").val(ds_leito);
        $("#pacienteView").val(nm_paciente);
        $("#dtAdmissaoView").val(dt_admissao);
        $("#idadeView").val(ds_idade);
        $("#dtPartoView").val(dt_parto);
        $("#dietaView").val(ds_dieta)
        $("#fugulinView").val(ds_fugulin);
        $("#escalasView").val(dt_escalas);
        $("#saeRnView").val(dt_sae_rn);
        $("#usuarioView").val(nm_usuario);
        $("#obsRnView").val(Utils.fillQuillContent('obsRnView', ds_observacao_rn,));
        $("#obsAdultoView").val(Utils.fillQuillContent('obsAdultoView', ds_observacao));
    }

    handleEditarMapaRosa(button) {
        const modal = document.getElementById("modalMapaRosaEdit");
        $(modal).modal("show");
        const table = $('#tableMapaInternacaoRosa').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const nr_atendimento = rowData.nr_atendimento;
        const nm_paciente = rowData.nm_paciente;
        const ds_idade = rowData.ds_idade;
        const dt_admissao = rowData.dt_admissao;
        const dt_parto = rowData.dt_parto;
        const ds_dieta = rowData.ds_dieta;
        const ds_fugulin = rowData.ds_fugulin;
        const dt_escalas = rowData.dt_escalas;
        const ds_leito = rowData.ds_leito;
        const dt_sae_rn = rowData.dt_sae_rn;
        const nm_usuario = $('#dropdownMenuButton').text().trim();
        const ds_observacao = rowData.ds_observacao_aduto;
        const ds_observacao_rn = rowData.ds_observacao_rn;
        const dt_atualizacao = new Date().toISOString().slice(0, 19).replace('T', ' ');


        $("#nr_atendimento").val(nr_atendimento);
        $("#ds_leito").val(ds_leito);
        $("#nm_paciente").val(nm_paciente);
        $("#dt_admissao").val(dt_admissao);
        $("#ds_idade").val(ds_idade);
        $("#dt_parto").val(dt_parto);
        $("#ds_dieta").val(ds_dieta)
        $("#ds_fugulin").val(ds_fugulin);
        $("#dt_escalas").val(dt_escalas);
        $("#dt_sae_rn").val(dt_sae_rn);
        $("#nm_usuario").val(nm_usuario);
        $("#dt_atualizacao").val(dt_atualizacao);
        $("#obsRnEdit").val(Utils.fillQuillContent('obsRnEdit', ds_observacao_rn,));
        $("#obsAdultoEdit").val(Utils.fillQuillContent('obsAdultoEdit', ds_observacao));
        let formMapaRosaEdit = document.getElementById('formMapaRosaEdit')
        formMapaRosaEdit.addEventListener("submit", (event) => {
            event.preventDefault();
            this.editarMapaRosa();
        });
    }

    handleEditarAdmLab(button) {
        const modal = document.getElementById("modal-adm-lab-editar");
        $(modal).modal("show");
        const table = $('#tableLaboratorioAdm').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const idEditar = rowData.id;
        const prescricaoEditar = rowData.nr_prescricao;
        const atendimentoEditar = rowData.nr_atendimento;
        const dtEntradaEditar = rowData.dt_lancamento;
        const hrChegadaEditar = rowData.hora_chegada;
        const hrEntradaditar = rowData.hora_entrada;
        const localEditar = rowData.local;
        const dtNascimentoEditar = rowData.dt_nascimento;
        const pacienteEditar = rowData.nome;
        const coletorEditar = rowData.coletador;
        const exameEditar = rowData.ds_exame;
        const puncaoEditar = rowData.puncao;
        const descricaoEditar = rowData.descricao;
        const totalEditar = rowData.total;

        $("#idEdit").val(rowData.id);
        $("#prescricaoEditar").val(prescricaoEditar);
        $("#atendimentoEditar").val(atendimentoEditar);
        $("#dtEntradaEditar").val(dtEntradaEditar);
        $("#hrChegadaEditar").val(hrChegadaEditar);
        $("#hrEntradaEditar").val(hrEntradaditar);
        $("#localEditar").val(localEditar);
        $("#dtNascimentoEditar").val(dtNascimentoEditar);
        $("#pacienteEditar").val(pacienteEditar);
        $("#coletorEditar").val(coletorEditar);
        $("#exameEditar").val(exameEditar);
        $("#puncaoEditar").val(puncaoEditar);
        $("#descricaoEditar").val(descricaoEditar);
        $("#totalEditar").val(totalEditar)

        const puncaoField = $("#puncaoEditar").val();
        const dsPuncaoEditar = $('#dsPuncaoEditar');

        if (puncaoField === 'sim') {
            dsPuncaoEditar.prop('hidden', false);
        } else {
            dsPuncaoEditar.prop('hidden', true);
        }

        this.labAdministrativoEditar.addEventListener("submit", (event) => {
            event.preventDefault();
            this.labAdmEditar();
        });
    }

    /////////////////////////////////////////////////////////////////////VIEW//////////////////////////////////////////////////////////////////////

    handleViewAdmLab(button) {
        const modal = document.getElementById("modal-adm-lab-visualizar");
        $(modal).modal("show");
        const table = $('#tableLaboratorioAdm').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const id = rowData.id
        const prescricaoVisualizar = rowData.nr_prescricao;
        const atendimentoVisualizar = rowData.nr_atendimento;
        const dtEntradaVisualizar = rowData.dt_lancamento;
        const hrChegadaVisualizar = rowData.hora_chegada;
        const hrEntradaditar = rowData.hora_entrada;
        const localVisualizar = rowData.local;
        const dtNascimentoVisualizar = rowData.dt_nascimento;
        const pacienteVisualizar = rowData.nome;
        const coletorVisualizar = rowData.coletador;
        const exameVisualizar = rowData.ds_exame;
        const puncaoVisualizar = rowData.puncao;
        const descricaoVisualizar = rowData.descricao;

        $("#idVisualizar").val(id);
        $("#prescricaoVisualizar").val(prescricaoVisualizar);
        $("#atendimentoVisualizar").val(atendimentoVisualizar);
        $("#dtEntradaVisualizar").val(dtEntradaVisualizar);
        $("#hrChegadaVisualizar").val(hrChegadaVisualizar);
        $("#hrEntradaVisualizar").val(hrEntradaditar);
        $("#localVisualizar").val(localVisualizar);
        $("#dtNascimentoVisualizar").val(dtNascimentoVisualizar);
        $("#pacienteVisualizar").val(pacienteVisualizar);
        $("#coletorVisualizar").val(coletorVisualizar);
        $("#exameVisualizar").val(exameVisualizar);
        $("#puncaoVisualizar").val(puncaoVisualizar);
        $("#descricaoVisualizar").val(rowData.total + ' ' + descricaoVisualizar);
        this.labAdministrativoEditar.addEventListener("submit", (event) => {
            event.preventDefault();
            this.labAdmEditar();
        });
    }

    handleViewTriagemLab(button) {
        const modal = document.getElementById("modal-labTrigemView");
        $(modal).modal("show");
        const table = $('#tableLaboratorioTrigemTable').DataTable();
        const closestRow = $(button).closest('tr');
        const rowData = table.row(closestRow).data();
        const id = rowData.id
        const nr_prescricaoView = rowData.nr_prescricao;
        const nr_atendimentoView = rowData.nr_atendimento;
        const dt_entradaView = rowData.dt_entrada;
        const nm_pacienteView = rowData.nm_paciente;
        const cd_estabelecimentoView = rowData.cd_estabelecimento;
        const ds_exameView = rowData.ds_exame;
        const ds_clinicaView = rowData.ds_local;
        const statusView = rowData.status;
        const confirmacaoView = rowData.cd_confirmacao;
        const observacaoView = rowData.ds_observacao;

        $("#idView").val(id);
        $("#nr_prescricaoView").val(nr_prescricaoView);
        $("#nr_atendimentoView").val(nr_atendimentoView);
        $("#dt_entradaView").val(dt_entradaView);
        $("#nm_pacienteView").val(nm_pacienteView);
        $("#cd_estabelecimentoView").val(cd_estabelecimentoView);
        $("#ds_exameView").val(ds_exameView);
        $("#ds_clinicaView").val(ds_clinicaView);
        $("#statusView").val(statusView);
        $("#confirmacaoView").val(confirmacaoView);
        $("#observacaoView").val(observacaoView);
    }

    /////////////////////////////////////////////////////////////////////DELETE//////////////////////////////////////////////////////////////////////

    excluirTecnico(id) {

        const self = this;
        Swal.fire({
            title: "Confirmação",
            text: "Você tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const dadosExclusao = {
                    id: id
                };
                $.ajax({
                    type: "POST",
                    url: self._deleteTecEquipe,
                    data: dadosExclusao,
                    dataType: "json",
                    success: function (response) {
                        Swal.fire("Sucesso!", "Excluído com sucesso!", "success")
                    },
                    error: function () {
                        Swal.fire("Erro!", "Erro na requisição AJAX ao excluir o técnico.", "error");
                    }, complete: () => {
                        this.dataModel.fetchData('../services/api/equipe_ti.php', this.dadosequipeTi);

                    }
                });
            }
        });
    }

    excluirAdmLab(id) {
        const self = this;
        Swal.fire({
            title: "Confirmação",
            text: "Você tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const dadosExclusao = {
                    id: id
                };
                $.ajax({
                    type: "POST",
                    url: self._deleteAdmLaboratorio,
                    data: dadosExclusao,
                    dataType: "json",
                    success: function (response) {
                        Swal.fire("Sucesso!", "Excluído com sucesso!", "success")
                    },
                    error: function () {
                        Swal.fire("Erro!", "Erro na requisição AJAX ao excluir.", "error");
                    }, complete: () => {
                        $('#tableLaboratorioAdm').DataTable().destroy();
                        this.dataModel.fetchData('../services/api/laboratorio.php', this.tableLaboratorioAdm);

                    }
                });
            }
        });
    }

    excluirTrigemLab(id) {
        const self = this;
        Swal.fire({
            title: "Confirmação",
            text: "Você tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const dadosExclusao = {
                    id: id
                };
                $.ajax({
                    type: "POST",
                    url: self._deleteTriagemLaboratorio,
                    data: dadosExclusao,
                    dataType: "json",
                    success: function (response) {
                        Swal.fire("Sucesso!", "Excluído com sucesso!", "success")
                    },
                    error: function () {
                        Swal.fire("Erro!", "Erro na requisição AJAX ao excluir.", "error");
                    }, complete: () => {
                        $('#tableLaboratorioTrigemTable').DataTable().destroy();
                        this.dataModel.fetchData('../services/api/laboratorio_triagem_table.php', this.tableLaboratorioTrigem);

                    }
                });
            }
        });
    }

    excluirNirEletivas(id) {
        const self = this;
        Swal.fire({
            title: "Confirmação",
            text: "Você tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const dadosExclusao = {
                    id: id
                };
                $.ajax({
                    type: "POST",
                    url: self._deleteNirEletivas,
                    data: dadosExclusao,
                    dataType: "json",
                    success: function (response) {
                        Swal.fire("Sucesso!", "Excluído com sucesso!", "success")
                    },
                    error: function () {
                        Swal.fire("Erro!", "Erro na requisição AJAX ao excluir.", "error");
                    }, complete: () => {
                        window.location.reload();
                    }
                });
            }
        });
    }

    excluirPreventiva(id) {
        const self = this;
        Swal.fire({
            title: "Confirmação",
            text: "Você tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const dadosExclusao = {
                    id: id
                };
                $.ajax({
                    type: "POST",
                    url: self._deletePreventiva,
                    data: dadosExclusao,
                    dataType: "json",
                    success: function (response) {
                        Swal.fire("Sucesso!", "Excluído com sucesso!", "success")
                    },
                    error: function () {
                        Swal.fire("Erro!", "Erro na requisição AJAX ao excluir o técnico.", "error");
                    }, complete: () => {
                        $('#tablePreventiva').DataTable().destroy();
                        this.dataModel.fetchData('../services/api/request_tecnico.php', this.dadosPreventiva);

                    }
                });
            }
        });

    }

    excluirAniversariante(id) {

        const self = this;
        Swal.fire({
            title: "Confirmação",
            text: "Você tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const dadosExclusao = {
                    id: id
                };
                $.ajax({
                    type: "POST",
                    url: self._deleteAniversariante,
                    data: dadosExclusao,
                    dataType: "json",
                    success: function (response) {
                        Swal.fire("Sucesso!", "Excluído com sucesso!", "success")
                    },
                    error: function () {
                        Swal.fire("Erro!", "Erro na requisição AJAX ao excluir o técnico.", "error");
                    }, complete: () => {
                        $('#tableAniversariante').DataTable().destroy();
                        this.dataModel.fetchData('../services/api/aniversariante.php', this.dadosAniversariante);

                    }
                });
            }
        });

    }

    ExcluirUsuario(id) {

        const self = this;
        Swal.fire({
            title: "Confirmação",
            text: "Você tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const dadosExclusao = {
                    id: id
                };
                $.ajax({
                    type: "POST",
                    url: self._deleteUsuarios,
                    data: dadosExclusao,
                    dataType: "json",
                    success: function (response) {
                        Swal.fire("Sucesso!", "Excluído com sucesso!", "success")
                    },
                    error: function () {
                        Swal.fire("Erro!", "Erro na requisição AJAX ao excluir o técnico.", "error");
                    }, complete: () => {
                        $('#tableControleUser').DataTable().destroy();
                        this.dataModel.fetchData('../services/api/controle-usuario.php', this.dadosControleUsuario);
                    }
                });
            }
        });
    }

    ExcluirExameTriagem(id) {
        const self = this;
        Swal.fire({
            title: "Confirmação",
            text: "Você tem certeza que deseja excluir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const dadosExclusao = {
                    id: id
                };
                $.ajax({
                    type: "POST",
                    url: self._deleteExame,
                    data: dadosExclusao,
                    dataType: "json",
                    success: function (response) {
                        Swal.fire("Sucesso!", "Excluído com sucesso!", "success")
                    },
                    error: function () {
                        Swal.fire("Erro!", "Erro na requisição AJAX ao excluir o técnico.", "error");
                    }, complete: () => {
                        $('#tableExamesTriagem').DataTable().destroy();
                        this.dataModel.fetchData('../services/api/laboratorio_triagem.php', this.tableExamesTriagemId);
                    }
                });
            }
        });
    }


    /////////////////////////////////////////////////////////////////////BUTTONS//////////////////////////////////////////////////////////////////////

    abrirModalTecnico() {
        let button = document.querySelector('[data-bs-target="#modal-equipeTi"]');
        let statusMessage = $("#statusMessage");
        if (button) {
            button.addEventListener("click", () => {
                this.form.addEventListener("submit", (event) => {
                    event.preventDefault();
                    statusMessage.show();
                    this.submitFormTecnico();
                    this.form.reset();
                    setTimeout(() => {
                        $("#statusMessage").fadeOut('slow', function () {
                            statusMessage.hide()
                        });
                    }, 1000);
                });
            });
        }
    }

    abrirModalPreventiva() {
        let button = document.querySelector('[data-bs-target="#modal-prev"]');
        let statusMessage = $("#statusMessage");
        if (button) {
            this.preventivaFormData.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormPreventiva()
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide()
                    });
                }, 1000);
            });
        }
    }

    abrirModalAdmLaboratorio() {
        let button = document.querySelectorAll("#modal-labAdm");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.admLaboratorioFormData.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormAdmLaboratorio()
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide()
                    });
                }, 1000);
            });
        }
    }

    abrirModalAdmRelatorio() {
        let button = document.querySelectorAll("#modalAdmRelatorio");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formAdmRelatorio.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormAdmLaboratorioRelatorio()
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide()
                    });
                }, 1000);
            });
        }
    }

    abrirModalSaidaHemocompRelatorio() {
        let button = document.querySelectorAll("#modalSaidaHemocomp");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formSaidaHemocompRelatorio.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormSaidaHemocomponenteRelatorio();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    abrirModalEletivasRelatorio() {
        let button = document.querySelectorAll("#modal-eletivas");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formEletivaRelatorio.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormEletivasRelatorio();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    abrirModalRelatorioIndicador() {
        let button = document.querySelectorAll("#relatorioSolicitacaoTransf");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formRelatorioSolicTransf.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormRelatorio();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    abrirModalJasmimRelatorio() {
        let button = document.querySelectorAll("#modalJasmim");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formJasmimRelatorio.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormJasmimRelatorio();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    abrirModalRosaRelatorio() {
        let button = document.querySelectorAll("#modalRosa");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formRosaRelatorio.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormRosaRelatorio();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    abrirModalEntradaHemocompRelatorio() {
        let button = document.querySelectorAll("#modalEntradaHemocomp");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formEntradaHemocompRelatorio.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormEntradaHemocomponenteRelatorio();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    abrirModalSolicitacaoHemocomp() {
        let button = document.querySelectorAll("#modalSolicitacaoHemocomp");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formSolicitacaoHemocomp.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormSolicitacaoHemocomp();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    abrirModalTransfusao() {
        let button = document.querySelectorAll("#modalTransfusao");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formTransfusao.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormTransfusao();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    abrirEdicaoNrIndicador() {
        const elementos = [
            { id: '#percSolicTrans-dash-tab', valor: '1' },
            { id: '#transRealTurno-dash-tab', valor: '2' },
            { id: '#tempMedioTrans-dash-tab', valor: '3' },
            { id: '#temp-atend-pa-dash-tab', valor: '4' },
            { id: '#temp-atend-pos-dash-tab', valor: '5' },
            { id: '#temp-esp-dash-tab', valor: '6' },
            { id: '#taxa-mort-fetal-tab', valor: '7' },
            { id: '#taxa-mort-geral-tab', valor: '8' },
            { id: '#taxa-mort-neonatal-tab', valor: '9' },
            { id: '#perc-amamenta-hora-vida-tab', valor: '10' },
            { id: '#perc-contato-pele-tab', valor: '11' },
            { id: '#perc-prematuridade-tab', valor: '12' },
            { id: '#perc-reanimacao-neo-tab', valor: '13' },
            { id: '#perc-amamenta-hora-vida-norm-tab', valor: '14' },
            { id: '#perc-contato-pele-norm-tab', valor: '15' },
            { id: '#perc-prematuridade-norm-tab', valor: '16' },
            { id: '#perc-reanimacao-neo-norm-tab', valor: '17' },
            { id: '#capacidade-agendada-tab', valor: '18' },
            { id: '#perc-absenteismo-tab', valor: '19' }
        ];
        elementos.forEach(elemento => {
            let el = document.querySelector(elemento.id);
            if (el) {
                el.addEventListener('click', () => {
                    $('#solicitacaoTransfIdEdit').val(elemento.valor);
                    $('#solicitacaoTransfId').val(elemento.valor);
                    $('#solicitacaoTransf').val(elemento.valor);
                    $('#tela').val(elemento.valor);
                });
            }
        });
    }

    abrirModalTriagemRelatorio() {
        let button = document.querySelectorAll("#modalTrigemRelatorioTriagem");
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formTriagemRelatorio.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormTriagemLaboratorioRelatorio()
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide()
                    });
                }, 1000);
            });
        }
    }

    abrirModalUsuario() {
        let button = document.querySelector('[data-bs-target="#modal-user"]');
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formUsuarioId.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormUsuarios();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    addAcessoCatracaHenry() {
        let button = document.querySelector('[data-bs-target="#modal-henry"]');
        let statusMessage = $("#statusMessage");
        if (button) {
            this.formAcessoCatracaHenry.addEventListener("submit", (event) => {
                event.preventDefault();
                statusMessage.show();
                this.submitFormAcessoCatracaHenry();
                setTimeout(() => {
                    $("#statusMessage").fadeOut('slow', function () {
                        statusMessage.hide();
                    });
                }, 1000);
            });
        }
    }

    abrirEditarIndicador() {
        console.log('submit');
        this.editarIndicador();
    }

    pdfEvoEnfermagem() {
        let button = document.getElementById('evoEnfermagem');
        if (button) {
            $(button).on('click', () => {
                const result = this.view.getSelectedArquivo();
                this.view.renderEvoEnfPdf(result);
            })
        }
    }

    pdfEvoMedPdf() {
        let button = document.getElementById('evoMedica');
        if (button) {
            $(button).on('click', () => {
                const result = this.view.getSelectedArquivo();
                this.view.renderEvoMedPdf(result);
            })
        }
    }

    labResultadoPdf() {
        let button = document.getElementById('resultado');
        if (button) {
            $(button).on('click', () => {
                const result = this.view.getSelectedArquivo();
                this.view.labResultPdf(result);
            })
        }
    }

    addButtonListeners() {
        if (this.table) {
            this.table.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-excluir-tecnico")) {
                    this.handleExcluirTecnico(event.target);
                } else if (event.target.classList.contains("btn-editar-tecnico")) {
                    this.handleEditarTecnico(event.target);
                }
            });
        }
        if (this.formMapaJasmin) {
            this.formMapaJasmin.addEventListener("submit", (event) => {
                event.preventDefault();
                this.submitFormMapaJasmin();
            });
        }
        if (this.tableLaboratorioAdmId) {
            this.tableLaboratorioAdmId.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-excluir-adm-lab")) {
                    this.handleExcluirAdmLaboratorio(event.target);
                } else if (event.target.classList.contains("btn-editar-adm-lab")) {
                    this.handleEditarAdmLab(event.target);
                } else if (event.target.classList.contains("btn-view-adm-lab")) {
                    this.handleViewAdmLab(event.target);
                }
            });
        }
        if (this.tableLaboratorioTrigemTable) {
            this.tableLaboratorioTrigemTable.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-excluir-exame-table")) {
                    this.handleExcluirTriagemLab(event.target);
                } else if (event.target.classList.contains("btn-editar-exame-table")) {
                    this.handleEditarTriagemLab(event.target);
                } else if (event.target.classList.contains("btn-view-exame-table")) {
                    this.handleViewTriagemLab(event.target);
                }
            });
        }
        if (this.tableNirEletivasId) {
            this.tableNirEletivasId.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-atualizacao-excluir-nir")) {
                    this.handleExcluirNirEletivas(event.target);
                } else if (event.target.classList.contains("btn-atualizacao-editar-nir")) {
                    this.handleEditarNirEletivas(event.target);
                } else if (event.target.classList.contains("btn-atualizacao-inativar-nir")) {
                    this.inativarEletivasNir(event.target);
                }
            });
        }
        if (this.tabler069fisEdit) {
            this.tabler069fisEdit.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-editar-acesso")) {
                    this.handleEditarAcesso(event.target);
                }
            });
        }
        if (this.tableNirEletivasAtiv) {
            this.tableNirEletivasAtiv.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-ativar-nir")) {
                    this.ativarEletivasNir(event.target);
                }
            });
        }
        if (this.tableNirRelizadasEletivasId) {
            this.tableNirRelizadasEletivasId.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-realizadas-nir")) {
                    this.handleEditarNirEletivasRealizadas(event.target);
                }
            });
        }
        if (this.tablePreventiva) {
            this.tablePreventiva.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-excluir-preventiva")) {
                    this.handleExcluirPreventiva(event.target);
                } else if (event.target.classList.contains("btn-editar-preventiva")) {
                    this.handleEditarPreventiva(event.target)
                }
            });

            document.addEventListener("DOMContentLoaded", () => {
                let btnAllDelete = document.getElementById("excluir-all-preventivas")
                btnAllDelete.addEventListener("click", () => {
                    const idsSelecionados = this.view.getSelectedIds();
                    this.handleExcluirAllPreventivas(idsSelecionados);
                });
            });
        }
        if (this.tableAniversariante) {
            this.tableAniversariante.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-excluir-aniversariante")) {
                    this.handleExcluirAniversariante(event.target);
                }
                let btnAllDelete = document.getElementById("excluir-all-aniversariantes")
                btnAllDelete.addEventListener("click", () => {
                    const idsSelecionados = this.view.getSelectedIdsAniversariante();
                    this.handleExcluirAllAniversariante(idsSelecionados);
                });
            });
        }

        if (this.tableMapaInternacaoJasmin) {
            this.tableMapaInternacaoJasmin.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-visualizar-mapa")) {
                    this.handleVisualizarMapa(event.target);
                }
                if (event.target.classList.contains("btn-editar-mapa")) {
                    this.handleEditarMapa(event.target);
                }
            });
        }
        if (this.tableMapaInternacaoRosa) {
            this.tableMapaInternacaoRosa.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-visualizar-mapa-rosa")) {
                    this.handleVisualizarMapaRosa(event.target);
                }
                if (event.target.classList.contains("btn-editar-mapa-rosa")) {
                    this.handleEditarMapaRosa(event.target);
                }
            });
        }
        if (this.tableExamesTriagem) {
            this.tableExamesTriagem.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-excluir-exame")) {
                    this.handleExcluirExame(event.target);
                }
            });
        }
        if (this.tableControleUser) {
            this.tableControleUser.addEventListener('click', (event) => {
                if (event.target.classList.contains("btn-excluir-controle-user")) {
                    this.handleExcluirUsuario(event.target);
                }
                if (event.target.classList.contains("btn-editar-controle-user")) {
                    this.handleEditarUsuario(event.target);
                }

            })
            document.addEventListener("DOMContentLoaded", () => {
                let btnAllDelete = document.getElementById("excluir-all-user")
                btnAllDelete.addEventListener("click", () => {
                    const idsSelecionados = this.view.getSelecttableControleUser();
                });
            });

        }
        if (this.tableArquivo) {
            this.tableArquivo.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-evo-enfermagem")) {
                    $("#modalEnfermagem").modal("show");
                    $('#modalEnfermagem').on('hidden.bs.modal', function () {
                        $('input[type="checkbox"]').prop('checked', false);
                    });
                    this.view.evolucaoEnf(event.target);
                } else if (event.target.classList.contains("btn-evo-medica")) {
                    $("#modalMedica").modal("show");
                    $('#modalMedica').on('hidden.bs.modal', function () {
                        $('input[type="checkbox"]').prop('checked', false);

                    });
                    this.view.evolucaoMed(event.target);
                }
            });
        }
        if (this.tableLabo) {
            this.tableLabo.addEventListener("click", (event) => {
                if (event.target.classList.contains("btn-resultado")) {
                    $("#modalResultado").modal("show");
                    $('#modalResultado').on('hidden.bs.modal', function () {
                        $('input[type="checkbox"]').prop('checked', false);
                    });
                    this.view.tableResultado(event.target);
                }
            });
        }
    }

    handleExcluirTecnico(buttons) {
        let ids = [];

        if (buttons instanceof NodeList || buttons instanceof HTMLCollection) {
            ids = Array.from(buttons).map(button => button.getAttribute("data-id"));
        } else if (buttons instanceof Element) {
            ids.push(buttons.getAttribute("data-id"));
        }

        if (ids.length > 0) {
            this.excluirTecnico(ids);
        } else {
            console.error("Erro: a lista de 'ids' não pode ser vazia e deve ser um array!");
        }
    }

    handleExcluirAdmLaboratorio(buttons) {
        let ids = [];

        if (buttons instanceof NodeList || buttons instanceof HTMLCollection) {
            ids = Array.from(buttons).map(button => button.getAttribute("data-id"));
        } else if (buttons instanceof Element) {
            ids.push(buttons.getAttribute("data-id"));
        }

        if (ids.length > 0) {
            this.excluirAdmLab(ids);
        } else {
            console.error("Erro: a lista de 'ids' não pode ser vazia e deve ser um array!");
        }
    }

    handleExcluirTriagemLab(buttons) {
        let ids = [];

        if (buttons instanceof NodeList || buttons instanceof HTMLCollection) {
            ids = Array.from(buttons).map(button => button.getAttribute("data-id"));
        } else if (buttons instanceof Element) {
            ids.push(buttons.getAttribute("data-id"));
        }

        if (ids.length > 0) {
            this.excluirTrigemLab(ids);
        } else {
            console.error("Erro: a lista de 'ids' não pode ser vazia e deve ser um array!");
        }
    }

    handleExcluirNirEletivas(buttons) {
        let ids = [];

        if (buttons instanceof NodeList || buttons instanceof HTMLCollection) {
            ids = Array.from(buttons).map(button => button.getAttribute("data-id"));
        } else if (buttons instanceof Element) {
            ids.push(buttons.getAttribute("data-id"));
        }

        if (ids.length > 0) {
            this.excluirNirEletivas(ids);
        } else {
            console.error("Erro: a lista de 'ids' não pode ser vazia e deve ser um array!");
        }
    }

    handleExcluirPreventiva(buttons) {
        let ids = [];

        if (buttons instanceof NodeList || buttons instanceof HTMLCollection) {
            ids = Array.from(buttons).map(button => button.getAttribute("data-id"));
        } else if (buttons instanceof Element) {
            ids.push(buttons.getAttribute("data-id"));
        }

        if (ids.length > 0) {
            this.excluirPreventiva(ids);
        } else {
            console.error("Erro: a lista de 'ids' não pode ser vazia e deve ser um array!");
        }
    }


    handleExcluirAniversariante(buttons) {
        let ids = [];

        if (buttons instanceof NodeList || buttons instanceof HTMLCollection) {
            ids = Array.from(buttons).map(button => button.getAttribute("data-id"));
        } else if (buttons instanceof Element) {
            ids.push(buttons.getAttribute("data-id"));
        }

        if (ids.length > 0) {
            this.excluirAniversariante(ids);
        } else {
            console.error("Erro: a lista de 'ids' não pode ser vazia e deve ser um array!");
        }
    }

    handleExcluirUsuario(buttons) {
        let ids = [];

        if (buttons instanceof NodeList || buttons instanceof HTMLCollection) {
            ids = Array.from(buttons).map(button => button.getAttribute("data-id"));
        } else if (buttons instanceof Element) {
            ids.push(buttons.getAttribute("data-id"));
        }

        if (ids.length > 0) {
            this.ExcluirUsuario(ids);
        } else {
            console.error("Erro: a lista de 'ids' não pode ser vazia e deve ser um array!");
        }
    }
    handleExcluirExame(buttons) {
        let ids = [];

        if (buttons instanceof NodeList || buttons instanceof HTMLCollection) {
            ids = Array.from(buttons).map(button => button.getAttribute("data-id"));
        } else if (buttons instanceof Element) {
            ids.push(buttons.getAttribute("data-id"));
        }

        if (ids.length > 0) {
            this.ExcluirExameTriagem(ids);
        } else {
            console.error("Erro: a lista de 'ids' não pode ser vazia e deve ser um array!");
        }
    }

    handleExcluirAllAniversariante(button) {
        this.excluirAniversariante(button);
    }

    handleExcluirAllPreventivas(button) {
        this.excluirPreventiva(button);
    }
    handleExcluirAllUsuarios(button) {
        this.ExcluirUsuario(button);
    }

}
export default Services;