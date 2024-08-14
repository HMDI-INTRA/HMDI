import Utils from "../controllers/Utils.js";

{
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
                Utils.showMessage(response.msg);
                $(this.modal).modal("hide");
                this.dataModel.fetchData('../services/api/equipe_ti.php', this.dadosequipeTi);
            } else {
                Utils.showMessage(response.msg);
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


submitFormSaidaHemocomponenteRelatorio() {
    const dataInicioSaida = this.formSaidaHemocompRelatorio.querySelector('[name="dataInicioSaida"]').value;
    const dataFinalSaida = this.formSaidaHemocompRelatorio.querySelector('[name="dataFinalSaida"]').value;
    const formatoSelecionado = this.formSaidaHemocompRelatorio.querySelector('[name="formatoSaida"]').value;

    if (!formatoSelecionado) {
        Swal.fire("Selecione um formato de relatório", "", "warning");
        return;
    }

    let url;
    switch (formatoSelecionado) {
        case 'EXCEL':
            url = `http://10.20.20.207/tasy/relatorio/xlsx/gerar_saida_hemocomp.php?dataInicioSaida=${dataInicioSaida}&dataFinalSaida=${dataFinalSaida}`;
            break;
        case 'PDF':
            url = `http://10.20.20.207/tasy/relatorio/pdf/gerar_saida_hemocomp.php?dataInicioSaida=${dataInicioSaida}&dataFinalSaida=${dataFinalSaida}`;
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

submitFormEntradaHemocomponenteRelatorio() {
    const dataInicioEntrada = this.formEntradaHemocompRelatorio.querySelector('[name="dataInicioEntrada"]').value;
    const dataFinalEntrada = this.formEntradaHemocompRelatorio.querySelector('[name="dataFinalEntrada"]').value;
    const irradiadoEntrada = this.formEntradaHemocompRelatorio.querySelector('[name="irradiadoEntrada"]').value;
    const filtradoEntrada = this.formEntradaHemocompRelatorio.querySelector('[name="filtradosEntrada"]').value;
    const alicotadoEntrada = this.formEntradaHemocompRelatorio.querySelector('[name="alicotadoEntrada"]').value;
    const formatoSelecionado = this.formEntradaHemocompRelatorio.querySelector('[name="formatoEntrada"]').value;
    if (!formatoSelecionado) {
        Swal.fire("Selecione um formato de relatório", "", "warning");
        return;
    }

    let url;
    switch (formatoSelecionado) {
        case 'EXCEL':
            url = `http://10.20.20.207/tasy/relatorio/xlsx/gerar_entrada_hemocomp.php?dataInicioEntrada=${dataInicioEntrada}&dataFinalEntrada=${dataFinalEntrada}&irradiadoEntrada=${irradiadoEntrada}&filtradoEntrada=${filtradoEntrada}&alicotadoEntrada=${alicotadoEntrada}`;
            break;
        case 'PDF':
            url = `http://10.20.20.207/tasy/relatorio/pdf/gerar_entrada_hemocomp.php?dataInicioEntrada=${dataInicioEntrada}&dataFinalEntrada=${dataFinalEntrada}&irradiadoEntrada=${irradiadoEntrada}&filtradoEntrada=${filtradoEntrada}&alicotadoEntrada=${alicotadoEntrada}`;
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

submitFormSolicitacaoHemocomp() {
    const dataInicioSolicitacao = this.formSolicitacaoHemocomp.querySelector('[name="dataInicioSolicitacao"]').value;
    const dataFinalSolicitacao = this.formSolicitacaoHemocomp.querySelector('[name="dataFinalSolicitacao"]').value;
    const canceladoSolicitacao = this.formSolicitacaoHemocomp.querySelector('[name="canceladoSolicitacao"]').value;
    const tranfundidoSolicitacao = this.formSolicitacaoHemocomp.querySelector('[name="tranfundidoSolicitacao"]').value;
    const liberadoSolicitacao = this.formSolicitacaoHemocomp.querySelector('[name="liberadoSolicitacao"]').value;
    const solicitadoSolicitacao = this.formSolicitacaoHemocomp.querySelector('[name="solicitadoSolicitacao"]').value;
    const reservadoSolicitacao = this.formSolicitacaoHemocomp.querySelector('[name="reservadoSolicitacao"]').value;
    const formatoSelecionado = this.formSolicitacaoHemocomp.querySelector('[name="formatoSolicitacao"]').value;
    if (!formatoSelecionado) {
        Swal.fire("Selecione um formato de relatório", "", "warning");
        return;
    }

    let url;
    switch (formatoSelecionado) {
        case 'EXCEL':
            url = `http://10.20.20.207/tasy/relatorio/xlsx/gerar_solicitacao_transfusao.php?dataInicioSolicitacao=${dataInicioSolicitacao}&dataFinalSolicitacao=${dataFinalSolicitacao}&canceladoSolicitacao=${canceladoSolicitacao}&tranfundidoSolicitacao=${tranfundidoSolicitacao}&liberadoSolicitacao=${liberadoSolicitacao}&solicitadoSolicitacao${solicitadoSolicitacao}&reservadoSolicitacao${reservadoSolicitacao}`;
            break;
        case 'PDF':
            url = `http://10.20.20.207/tasy/relatorio/pdf/gerar_solicitacao_transfusao.php?dataInicioSolicitacao=${dataInicioSolicitacao}&dataFinalSolicitacao=${dataFinalSolicitacao}&canceladoSolicitacao=${canceladoSolicitacao}&tranfundidoSolicitacao=${tranfundidoSolicitacao}&liberadoSolicitacao=${liberadoSolicitacao}&solicitadoSolicitacao${solicitadoSolicitacao}&reservadoSolicitacao${reservadoSolicitacao}`;
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

submitRelatorioTransf(id) {
    const nm_indicador = id;
    const dtInicial = this.formAgenciaRelatorio.querySelector('[name="dtInicial"]').value;
    const dtFinal = this.formAgenciaRelatorio.querySelector('[name="dtFinal"]').value;
    const formatoSelecionado = this.formAgenciaRelatorio.querySelector('[name="formatoSolicitacao"]').value;
    if (!formatoSelecionado) {
        Swal.fire("Selecione um formato de relatório", "", "warning");
        return;
    }

    let url;
    switch (formatoSelecionado) {
        case 'EXCEL':
            url = `http://10.1.1.108/intranet/src/services/relatorio/pdf/indicadorAnalisePlan.php?dtInicial=${dtInicial}&dtFinal=${dtFinal}&nm_indicador=${nm_indicador}`;
            break;
        case 'PDF':
            url = `http://10.1.1.108/intranet/src/services/relatorio/pdf/indicadorAnalisePlan.php?dtInicial=${dtInicial}&dtFinal=${dtFinal}&nm_indicador=${nm_indicador}`;
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


submitFormTransfusao() {
    const dataInicioTransfusao = this.formTransfusao.querySelector('[name="dataInicioTransfusao"]').value;
    const dataFinalTransfusao = this.formTransfusao.querySelector('[name="dataFinalTransfusao"]').value;
    const irradiadoTransfusao = this.formTransfusao.querySelector('[name="irradiadoTransfusao"]').value;
    const filtradosTransfusao = this.formTransfusao.querySelector('[name="filtradosTransfusao"]').value;
    const alicotadoTransfusao = this.formTransfusao.querySelector('[name="alicotadoTransfusao"]').value;
    const formatoTransfusao = this.formTransfusao.querySelector('[name="formatoTransfusao"]').value;
    if (!formatoTransfusao) {
        Swal.fire("Selecione um formato de relatório", "", "warning");
        return;
    }

    let url;
    switch (formatoTransfusao) {
        case 'EXCEL':
            url = `http://10.20.20.207/tasy/relatorio/xlsx/gerar_transfusao.php?dataInicioTransfusao=${dataInicioTransfusao}&dataFinalTransfusao=${dataFinalTransfusao}&irradiadoTransfusao=${irradiadoTransfusao}&filtradosTransfusao=${filtradosTransfusao}&alicotadoTransfusao=${alicotadoTransfusao}`;
            break;
        case 'PDF':
            url = `http://10.20.20.207/tasy/relatorio/pdf/gerar_transfusao.php?dataInicioTransfusao=${dataInicioTransfusao}&dataFinalTransfusao=${dataFinalTransfusao}&irradiadoTransfusao=${irradiadoTransfusao}&filtradosTransfusao=${filtradosTransfusao}&alicotadoTransfusao=${alicotadoTransfusao}`;
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
*/
