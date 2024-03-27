class NegociacaoService {
    obtemNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/semana');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.log('Obtendo negociações do Servidor');
                        const negociacoes = JSON.parse(xhr.responseText)
                            .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));

                        resolve(negociacoes);
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana');
                    }
                }
            }

            xhr.send();
        });
    }
}