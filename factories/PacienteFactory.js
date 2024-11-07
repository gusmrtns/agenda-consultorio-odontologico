// factories/PacienteFactory.js
import Paciente from '../models/Paciente';

export class PacienteFactory {
    static criarPaciente(cpf, nome, dataNascimento) {
        if (!this.validarCPF(cpf)) {
            console.log("CPF inválido.");
            return null;
        }

        if (!this.validarIdadeMinima(dataNascimento)) {
            console.log("Paciente deve ter pelo menos 13 anos.");
            return null;
        }

        return new Paciente(cpf, nome, dataNascimento);
    }

    static validarCPF(cpf) {
        return cpf && cpf.length === 11; 
    }

    static validarIdadeMinima(dataNascimento) {
        const idadeMinima = 13;
        const anoNascimento = new Date(dataNascimento).getFullYear();
        const anoAtual = new Date().getFullYear();
        return anoAtual - anoNascimento >= idadeMinima;
    }
}


