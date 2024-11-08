// factories/PacienteFactory.js
import Paciente from '../models/Paciente';

export class PacienteFactory {
    // Cria uma instância de Paciente após validar CPF e idade mínima
    static criarPaciente(cpf, nome, dataNascimento) {
        // Valida o CPF
        if (!this.validarCPF(cpf)) {
            return { valido: false, erro: "CPF inválido." }; // Retorna erro se o CPF for inválido
        }

        // Valida a idade mínima de 13 anos
        if (!this.validarIdadeMinima(dataNascimento)) {
            return { valido: false, erro: "Paciente deve ter pelo menos 13 anos." }; // Retorna erro se a idade for insuficiente
        }

        // Retorna a instância de Paciente se todas as validações forem aprovadas
        const paciente = new Paciente(cpf, nome, dataNascimento);
        return { valido: true, paciente };
    }

    // Valida o CPF usando o algoritmo de cálculo dos dígitos verificadores
    static validarCPF(strCPF) {
        let Soma = 0;
        let Resto;
    
        // Verifica se o CPF é uma sequência de zeros, o que é inválido
        if (strCPF == "00000000000") return false;
    
        // Primeiro passo: Cálculo do primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            // Multiplica cada dígito por um peso decrescente de 10 a 2 e acumula a soma
            Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        // Calcula o resto da divisão da soma por 11 após multiplicar por 10
        Resto = (Soma * 10) % 11;
    
        // Se o resto for 10 ou 11, o dígito verificador é considerado 0
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        // Verifica se o primeiro dígito verificador está correto
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;
    
        // Reinicia a soma para o cálculo do segundo dígito verificador
        Soma = 0;
        // Segundo passo: Cálculo do segundo dígito verificador
        for (let i = 1; i <= 10; i++) {
            // Multiplica cada dígito por um peso decrescente de 11 a 2 e acumula a soma
            Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }
        // Calcula o resto da divisão da soma por 11 após multiplicar por 10
        Resto = (Soma * 10) % 11;
    
        // Se o resto for 10 ou 11, o dígito verificador é considerado 0
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        // Verifica se o segundo dígito verificador está correto
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    
        // Se todas as verificações passaram, o CPF é válido
        return true;
    }
    

    // Verifica se o paciente tem a idade mínima exigida (13 anos)
    static validarIdadeMinima(dataNascimento) {
        const idadeMinima = 13;
        const anoNascimento = new Date(dataNascimento).getFullYear();
        const anoAtual = new Date().getFullYear();
        return anoAtual - anoNascimento >= idadeMinima;
    }
}
