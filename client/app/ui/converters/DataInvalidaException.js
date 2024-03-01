class DataInvalidaException extends AplicationException {
    constructor() {
        super('A data deve estar no formato dd/mm/aaaa');
    }
}