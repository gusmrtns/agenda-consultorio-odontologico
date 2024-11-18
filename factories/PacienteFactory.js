import {Paciente} from '../models/Paciente.js';
import Agenda from '../models/Agenda.js';
import { DateTime } from 'luxon';

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

        // Valida o nome do paciente
        if (!this.validarNome(nome)) {
            return { valido: false, erro: "Nome do paciente deve ter pelo menos 5 caracteres." }; // Retorna erro se o nome for inválido
        }

        // Verifica se já existe um paciente com o mesmo CPF
        if (this.verificarExistencia(cpf)) {
            return { valido: false, erro: "CPF já cadastrado." }; // Retorna erro se o paciente já estiver cadastrado
        }

        // Retorna a instância de Paciente se todas as validações forem aprovadas
        const paciente = new Paciente(nome, cpf, dataNascimento);
        return { valido: true, paciente };
    }

    // Valida o CPF usando o algoritmo de cálculo dos dígitos verificadores
    static validarCPF(strCPF) {
        // Remove caracteres não numéricos do CPF
        strCPF = strCPF.replace(/[^\d]+/g, '');

        // Verifica se o CPF possui 11 dígitos e não é uma sequência de números repetidos
        if (strCPF.length !== 11 || /^(\d)\1{10}$/.test(strCPF)) return false;

        let soma = 0;
        let resto;

        // Cálculo do primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(strCPF.charAt(i - 1)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(strCPF.charAt(9))) return false;

        soma = 0;

        // Cálculo do segundo dígito verificador
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(strCPF.charAt(i - 1)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(strCPF.charAt(10))) return false;

        return true;
    }

    // Verifica se o paciente tem a idade mínima exigida (13 anos)
    static validarIdadeMinima(dataNascimento) {
        const idadeMinima = 13;
        const hoje = DateTime.local(); // Data atual
        const nascimento = DateTime.fromFormat(dataNascimento, 'dd/MM/yyyy'); // Converte a data de nascimento
        const idade = hoje.year - nascimento.year;

        // Ajuste se o paciente ainda não fez aniversário este ano
        const ajusteAniversario = hoje < nascimento.plus({ years: idade }) ? 1 : 0;
        return idade - ajusteAniversario >= idadeMinima;
    }

    // Verifica se o nome do paciente tem pelo menos 5 caracteres
    static validarNome(nome) {
        return nome.length >= 5;
    }

    // Verifica se ja existe um paciente com o mesmo CPF
    static verificarExistencia(cpf) {
        return Agenda.getInstance().getPacientes().some(p => p.getCPF() === cpf);
    }
}
