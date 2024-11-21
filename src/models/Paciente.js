/**
 * Representa um paciente no consultório odontológico.
 * @class
 */
export class Paciente {
    #nome;
    #cpf;
    #data_nascimento;

    /**
     * Cria uma nova instância de Paciente.
     * @param {string} nome - O nome do paciente.
     * @param {string} cpf - O CPF do paciente.
     * @param {string} data_nascimento - A data de nascimento do paciente (formato DD/MM/AAAA).
     */
    constructor(nome, cpf, data_nascimento) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#data_nascimento = data_nascimento;
    }

    /**
     * Retorna o nome do paciente.
     * @returns {string} - O nome do paciente.
     */
    getNome() {
        return this.#nome;
    }

    /**
     * Retorna o CPF do paciente.
     * @returns {string} - O CPF do paciente.
     */
    getCPF() {
        return this.#cpf;
    }

    /**
     * Retorna a data de nascimento do paciente.
     * @returns {string} - A data de nascimento do paciente.
     */
    getDataNascimento() {
        return this.#data_nascimento;
    }

    /**
     * Retorna uma representação legível do paciente.
     * @returns {string} - Representação do paciente.
     */
    toString() {
        return `Nome: ${this.#nome}, CPF: ${this.#cpf}, Data de Nascimento: ${this.#data_nascimento}`;
    }
}
