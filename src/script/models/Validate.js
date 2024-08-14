//****Autor: Josélio Dias Mendonça*******//
import Utils from '../controllers/Utils.js';
class Validate {
    constructor(formId) {
        this.preventivaFormEditarData = document.getElementById("preventivaFormEditar");
        this.preventivaFormData = document.getElementById("preventivaForm");
        this.labAdministrativoEditar = document.getElementById("labAdministrativoEditar");
        this.labAdministrativoAdd = document.getElementById("labAdministrativo");
        this.labTriagemAdd = document.getElementById("labTriagem");
        this.labTriagemEditar = document.getElementById("labTriagemEditar");
        this.formAtualizarNir = document.getElementById("formAtualizarNir");
        this.formEditarNir = document.getElementById("formEditarNir");
        this.formEntradaHemocomp = document.getElementById("formEntradaHemocomp");
        this.formSolicitacaoHemocomp = document.getElementById("formSolicitacaoHemocomp");
        if (window.location.pathname.includes('cadastros.php')) {
            this.addInputEventListeners();
            $("#modeloSelect").on("click", () => {
                if ($("#modeloSelect option:selected").val() == "Sem office") {
                    $("#office").attr("disabled", true)
                } else {
                    $("#office").attr("disabled", false)
                }
            });
        }
        if (window.location.pathname.includes('laboratorio.php')) {
            this.validateFormLab();
            this.validateFormLabAdd();
            this.validateFormTriagemLab();
            this.validateFormTriagemLabEditar();
            this.validateformEntradaHemocomp();
            this.validarFormSolicitacaoHemocomp();
        }
        if (window.location.pathname.includes('nir.php')) {
            this.validateformAtualizarNir();
            this.validateformAtualizarRealizadasNir();
        }
    }

    addInputEventListeners() {
        $(document).ready(() => {
            const modelo = $("#modelo");
            const modeloEditar = $("#modeloSelectEditar");
            if (modelo) {
                modelo.on("change", () => {
                    const isSemOffice = modelo.val() === 'Sem office';
                    $('#office').prop({ disabled: isSemOffice });
                });
            }
            if (modeloEditar) {
                modeloEditar.on("change", () => {
                    const isSemOffice = modeloEditar.val() === 'Sem office';
                    $('#officeEditar').prop({ disabled: isSemOffice });
                });
            }
        });

        this.preventivaFormData.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        const formFields = ["patrimonio", "monitor", "descricao", "custo", "local", "hostAntigo", "hostNovo", "login", "office", "observacao", "dataPrev", "dataProx", "tecnico", "perifericos", "andar", "modelo", "sistemaOperacional", "tecnicoSelect"];

        formFields.forEach(fieldName => {
            const inputField = this.preventivaFormData.elements[fieldName];

            inputField.addEventListener("input", () => this.handleInputField(fieldName, inputField));
        });

        const formFieldsEditar = ["patrimonioEditar", "monitorEditar", "descricaoEditar", "custoEditar", "localEditar", "hostAntigoEditar", "hostNovoEditar", "loginEditar", "officeEditar", "observacaoEditar", "dataPrevEditar", "dataProxEditar", "tecnicoEditar", "perifericosEditar", "andarEditar", "modeloEditar", "sistemaOperacionalEditar", "tecnicoSelectEditar"];

        formFieldsEditar.forEach(fieldName => {
            const inputField = this.preventivaFormEditarData.elements[fieldName];

            inputField.addEventListener("input", () => this.handleInputField(fieldName, inputField));
        });
    }

    handleInputField(fieldName, inputField) {
        inputField.value = inputField.value.toUpperCase();

        switch (fieldName) {
            case "patrimonio":
            case "monitor":
            case "patrimonioEditar":
            case "monitorEditar":
                $(inputField).mask("999999");
                break;
            case "hostNovo":
            case "hostNovoEditar":
                /*  $(inputField).mask("HMDI-000000"); */
                break;
            case "office":
            case "officeEditar":
                this.formatOfficeField(inputField);
                break;
            case "dataPrev":
            case "dataPrevEditar":
                this.handleDataPrevField();
                break;
            case "tecnicoSelect":
            case "tecnicoSelectEditar":
                Utils.alertaSweet('O campo Tecnico não pode ser vazio', 'warning');
                break;
        }
    }

    formatOfficeField(inputField) {
        const inputValue = inputField.value;
        const cleanedValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");
        const formattedValue = cleanedValue.replace(/(.{5})/g, "$1-");
        const finalValue = formattedValue.slice(0, 29);
        inputField.value = finalValue;
    }

    handleDataPrevField() {
        const dataPrevInput = document.getElementById("dataPrev");
        const dataPrevValue = dataPrevInput.value;
        const dataPrevEditarInput = document.getElementById("dataPrevEditar");
        const dataPrevEditarValue = dataPrevEditarInput.value

        if (dataPrevValue) {
            const dataPrev = new Date(dataPrevValue);
            dataPrev.setFullYear(dataPrev.getFullYear() + 1);
            const dataProxValue = dataPrev.toISOString().split('T')[0];
            document.getElementById("dataProx").value = dataProxValue;
            document.getElementById("dataProx").readOnly = true;
        } else {
            document.getElementById("dataProx").value = "";
            document.getElementById("dataProx").readOnly = false;
        }
        if (dataPrevEditarValue) {
            const dataPrev = new Date(dataPrevEditarValue);
            dataPrev.setFullYear(dataPrev.getFullYear() + 1);
            const dataProxValue = dataPrev.toISOString().split('T')[0];
            document.getElementById("dataProxEditar").value = dataProxValue;
            document.getElementById("dataProxEditar").readOnly = true;
        } else {
            document.getElementById("dataProxEditar").value = "";
            document.getElementById("dataProxEditar").readOnly = false;
        }
    }


    validateFormLab() {
        const formFields = ["prescricaoEditar", "atendimentoEditar", "dtEntradaEditar", "hrChegadaEditar", "hrEntradaEditar", "dtNascimentoEditar", "pacienteEditar", "puncaoEditar"];

        formFields.forEach(fieldName => {
            const inputField = this.labAdministrativoEditar.elements[fieldName];
            inputField.addEventListener("input", () => this.handleInputFieldLab(fieldName, inputField));
        });
    }

    handleInputFieldLab(fieldName, inputField) {
        switch (fieldName) {
            case 'dtEntradaEditar':
                $(inputField).mask("##/##/####");
                break;

            case 'dtNascimentoEditar':
                $(inputField).mask("##/##/####");
                break;

            case 'puncaoEditar':
                if (inputField.value === 'sim') {
                    $('#dsPuncaoEditar').prop('hidden', false);
                } else {
                    $('#dsPuncaoEditar').prop('hidden', true);
                }
                break;
        }
    }

    validateFormLabAdd() {
        const formFields = ["puncao"];

        formFields.forEach(fieldName => {
            const inputField = this.labAdministrativoAdd.elements[fieldName];
            inputField.addEventListener("input", () => this.handleInputFieldLabAdd(fieldName, inputField));
        });
    }
    handleInputFieldLabAdd(fieldName, inputField) {
        switch (fieldName) {
            case 'puncao':
                if (inputField.value == 'sim') {
                    $('#dsPuncao').prop('hidden', false);

                } else {
                    $('#dsPuncao').prop('hidden', true);

                }
                break;
        }
    }

    validateFormTriagemLab() {
        const formFields = ["status", "confirmacao", "opcao_8"];

        formFields.forEach(fieldName => {
            const inputField = this.labTriagemAdd.elements[fieldName];
            inputField.addEventListener("input", () => this.handleInputFieldLabTriagemAdd(fieldName, inputField));
        });
    }

    handleInputFieldLabTriagemAdd(fieldName, inputField) {
        switch (fieldName) {
            case 'status':
                $(inputField).mask("ENVIADO DIA: 00/00/0000");
                break;
            case 'confirmacao':
                if ($(inputField).val() == "RECOLETA") {
                    $('.radio-options').prop('hidden', false);
                } else {
                    $('.radio-options').prop('hidden', true);
                }
                if ($(inputField).val() != "RECOLETA") {
                    $('.obs').prop('hidden', false);
                } else {
                    $('.obs').prop('hidden', true);
                }
                break;
            case 'opcao_8':
                if (inputField.checked) {
                    $('.obs').prop('hidden', false);
                } else {
                    $('.obs').prop('hidden', true);
                }
                break;

        }
    }

    validateformAtualizarNir() {
        const formFields = ["cd_senha_aih"];

        formFields.forEach(fieldName => {
            const inputField = this.formAtualizarNir.elements[fieldName];
            inputField.addEventListener("input", () => this.handleInputFieldAtualizarNir(fieldName, inputField));
        });
    }

    handleInputFieldAtualizarNir(fieldName, inputField) {
        inputField.value = inputField.value.toUpperCase();
        switch (fieldName) {
            case 'cd_senha_aih':
                $(inputField).mask("000.000.000-00");
        }
    }

    validateformAtualizarRealizadasNir() {
        const formFields = ["dt_aihEdit", "cd_senha_aihEdit"];
        formFields.forEach(fieldName => {
            const inputField = this.formEditarNir.elements[fieldName];
            inputField.addEventListener("input", () => this.handleInputFieldAtualizarRealizadasNir(fieldName, inputField));
        });
    }

    handleInputFieldAtualizarRealizadasNir(fieldName, inputField) {
        inputField.value = inputField.value.toUpperCase();
        switch (fieldName) {
            case 'cd_senha_aihEdit':
                $(inputField).mask("000.000.000-00");
                break;
            case "dt_aihEdit":
                $(inputField).mask("00/00/0000");
                break;
        }
    }

    validateformEntradaHemocomp() {
        const formFields = ["irradiadoEntrada", "filtradosEntrada", "alicotadoEntrada"];

        formFields.forEach(fieldName => {
            const inputField = this.formEntradaHemocomp.elements[fieldName];
            inputField.addEventListener("input", () => this.handleInputFieldEntradaHemocomp(fieldName, inputField));
        });
    }

    validateformEntradaHemocomp() {
        const formFields = ["irradiadoEntrada", "filtradosEntrada", "alicotadoEntrada"];

        formFields.forEach(fieldName => {
            const inputField = this.formEntradaHemocomp.elements[fieldName];
            inputField.addEventListener("input", () => this.handleInputFieldEntradaHemocomp(fieldName, inputField));
        });
    }

    handleInputFieldEntradaHemocomp(fieldName, inputField) {
        inputField.value = inputField.value.toUpperCase();
        switch (fieldName) {
            case 'irradiadoEntrada':
                if (inputField.value == "S") {
                    this.formEntradaHemocomp.elements["filtradosEntrada"].disabled = true;
                    this.formEntradaHemocomp.elements["alicotadoEntrada"].disabled = true;
                } else {
                    this.formEntradaHemocomp.elements["filtradosEntrada"].disabled = false;
                    this.formEntradaHemocomp.elements["alicotadoEntrada"].disabled = false;
                }
                break;
            case 'filtradosEntrada':
                if (inputField.value == "S") {
                    this.formEntradaHemocomp.elements["irradiadoEntrada"].disabled = true;
                    this.formEntradaHemocomp.elements["alicotadoEntrada"].disabled = true;
                } else {
                    this.formEntradaHemocomp.elements["irradiadoEntrada"].disabled = false;
                    this.formEntradaHemocomp.elements["alicotadoEntrada"].disabled = false;
                }
                break;
            case 'alicotadoEntrada':
                if (inputField.value == "S") {
                    this.formEntradaHemocomp.elements["irradiadoEntrada"].disabled = true;
                    this.formEntradaHemocomp.elements["filtradosEntrada"].disabled = true;
                } else {
                    this.formEntradaHemocomp.elements["irradiadoEntrada"].disabled = false;
                    this.formEntradaHemocomp.elements["filtradosEntrada"].disabled = false;
                }
                break;
        }
    }

    validarFormSolicitacaoHemocomp() {
        const formFields = ["reservadoSolicitacao", "solicitadoSolicitacao", "liberadoSolicitacao", "tranfundidoSolicitacao", "canceladoSolicitacao"];

        formFields.forEach(fieldName => {
            const inputField = this.formSolicitacaoHemocomp.elements[fieldName];
            inputField.addEventListener("input", () => this.handleInputFieldSolicitacaoHemocomp(fieldName, inputField, formFields));
        });
    }

    handleInputFieldSolicitacaoHemocomp(fieldName, inputField, formFields) {
        inputField.value = inputField.value.toUpperCase();
        if (inputField.value != "N") {
            formFields.forEach(field => {
                if (field !== fieldName) {
                    this.formSolicitacaoHemocomp.elements[field].disabled = true;
                }
            });
        } else {
            formFields.forEach(field => {
                this.formSolicitacaoHemocomp.elements[field].disabled = false;
            });
        }
    }

    validateFormTriagemLabEditar() {
        const formFields = ["statusEditar"];
        formFields.forEach(fieldName => {
            const inputField = this.labTriagemEditar.elements[fieldName];
            inputField.addEventListener("input", () => this.handleInputFieldLabTriagemEditar(fieldName, inputField));
        });
    }
    handleInputFieldLabTriagemEditar(fieldName, inputField) {
        switch (fieldName) {
            case 'statusEditar':
                $(inputField).mask("ENVIADO DIA: 00/00/0000");
                break;
        }
    }
}

export default Validate;