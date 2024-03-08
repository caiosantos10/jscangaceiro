class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView('#negociacoes'), 'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), new MensagemView('#mensagensView'), 'texto');
    }

    importaNegociacoes() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Obtendo negociações do Servidor');
                    JSON.parse(xhr.responseText)
                        .map(obj => this._negociacoes.adiciona(new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));

                    this._mensagem.texto = 'Negociações importadas com sucesso!';
                } else {
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possível obter as negociações da semana';
                }
            }
        }

        xhr.send();
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