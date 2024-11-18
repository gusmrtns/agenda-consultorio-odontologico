export class Paciente {
    #nome;
    #cpf;
    #data_nascimento;

    constructor(nome, cpf, data_nascimento) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#data_nascimento = data_nascimento;
    }

    getNome() {
        return this.#nome;
    }

    getCPF() {
        return this.#cpf;
    }

    getDataNascimento() {
        return this.#data_nascimento;
    }

    // Método toString para retornar uma representação legível do paciente
    toString() {
        return `Nome: ${this.#nome}, CPF: ${this.#cpf}, Data de Nascimento: ${this.#data_nascimento}`;
    }
}
