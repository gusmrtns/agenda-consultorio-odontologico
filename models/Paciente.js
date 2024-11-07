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

    //TO DO 
    toString() {
        
    }

}

