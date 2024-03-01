class DateConverter {
    constructor() {
        throw Error('Esta classe não pode ser instanciada');
    }

    static paraTexto(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    static paraData(texto) {
        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)) {
            throw new DataInvalidaException('Deve estar no formato dd/mm/aaaa');
        }
        return new Date(
            ...texto
                .split('/')
                .reverse()
                .map((item, index) => item - index % 2));
    }
}