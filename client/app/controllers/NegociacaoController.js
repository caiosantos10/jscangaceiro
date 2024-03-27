class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView('#negociacoes'), 'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), new MensagemView('#mensagensView'), 'texto');

        this._service = new NegociacaoService();
    }

    adiciona(event) {
        try {
            event.preventDefault();
            this._negociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limpaFormulario();
        } catch (e) {
            console.log(e);
            console.log(e.stack)

            if (e instanceof DataInvalidaException) {
                this._mensagem.texto = e.message;
            } else {
                this._mensagem.texto = "Um erro não esperado ocorreu! Por favor entre em contato com o suporte."
            }
        }
    }

    importaNegociacoes() {
        this._service.obtemNegociacoesDaSemana()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso!'
            }, err => this._mensagem.texto = err);
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    _criaNegociacao() {
        let data = DateConverter.paraData(this._inputData.value);
        return new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }
}