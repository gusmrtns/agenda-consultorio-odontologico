import {Paciente} from '../models/Paciente.js';
import Agenda from '../models/Agenda.js';
import { DateTime } from 'luxon';

/**
 * Fábrica responsável por criar instâncias de Paciente após validar as informações.
 * @class
 */
export class PacienteFactory {

    /**
     * Cria uma instância de `Paciente` após validar CPF, nome e idade mínima de 13 anos.
     * Verifica também se o CPF já está cadastrado na agenda.
     * @param {string} cpf - O CPF do paciente.
     * @param {string} nome - O nome do paciente.
     * @param {string} dataNascimento - A data de nascimento do paciente no formato 'DD/MM/AAAA'.
     * @returns {Object} Retorna um objeto com a propriedade `valido` indicando se a criação foi bem-sucedida,
     * ou `erro` com a mensagem de erro, e a instância de `Paciente` se válida.
     */
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

    /**
     * Valida o CPF usando o algoritmo de cálculo dos dígitos verificadores.
     * @param {string} strCPF - O CPF a ser validado.
     * @returns {boolean} Retorna `true` se o CPF for válido, ou `false` caso contrário.
     */
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

    /**
     * Verifica se o paciente tem a idade mínima exigida (13 anos).
     * @param {string} dataNascimento - A data de nascimento do paciente no formato 'DD/MM/AAAA'.
     * @returns {boolean} Retorna `true` se o paciente tiver a idade mínima de 13 anos, caso contrário, `false`.
     */
    static validarIdadeMinima(dataNascimento) {
        const idadeMinima = 13;
        const hoje = DateTime.local(); // Data atual
        const nascimento = DateTime.fromFormat(dataNascimento, 'dd/MM/yyyy'); // Converte a data de nascimento
        const idade = hoje.year - nascimento.year;

        // Ajuste se o paciente ainda não fez aniversário este ano
        const ajusteAniversario = hoje < nascimento.plus({ years: idade }) ? 1 : 0;
        return idade - ajusteAniversario >= idadeMinima;
    }

    /**
     * Valida se o nome do paciente possui pelo menos 5 caracteres.
     * @param {string} nome - O nome do paciente.
     * @returns {boolean} Retorna `true` se o nome tiver 5 ou mais caracteres, ou `false` caso contrário.
     */
    static validarNome(nome) {
        return nome.length >= 5;
    }

    /**
     * Verifica se já existe um paciente com o mesmo CPF.
     * @param {string} cpf - O CPF a ser verificado.
     * @returns {boolean} Retorna `true` se o CPF já estiver cadastrado, ou `false` caso contrário.
     */
    static verificarExistencia(cpf) {
        return Agenda.getInstance().getPacientes().some(p => p.getCPF() === cpf);
    }
}
