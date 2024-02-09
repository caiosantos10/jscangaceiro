var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade')
]

var tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', (event) => {
    // Cancelando submissão do formulário
    event.preventDefault();
    var tr = document.createElement('tr');

    // Para campos Data, Valor, Qtde
    campos.forEach((campo) => {
        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
    });

    // Calculando volume e atribuindo a td
    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(tdVolume);
    tbody.appendChild(tr);

    campos.forEach(campo => {
        campo.value = '';
    });
    campos[0].focus();
});