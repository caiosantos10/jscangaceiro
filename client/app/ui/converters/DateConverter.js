class DateConverter {
    constructor() {
        throw Error('Esta classe não pode ser instanciada');
    }

    static paraTexto(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    static paraData(texto) {
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
            throw Error('Deve estar no formato aaaa-mm-dd');
        }
        return new Date(
            ...texto
                .split('-')
                .map((item, index) => item - index % 2));
    }
}