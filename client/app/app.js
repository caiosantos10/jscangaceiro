const controller = new NegociacaoController();
const $ = document.querySelector.bind(document);

document.querySelector('.form').addEventListener('submit', controller.adiciona.bind(controller));
document.querySelector('#botao-apaga').addEventListener('click', controller.apaga.bind(controller));
document.querySelector('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));