/**
 * Representa uma consulta de um paciente no consultório odontológico.
 * @class
 */
export class Consulta {
    #paciente;
    #dataConsulta;
    #horaInicio;
    #horaFim;

    /**
     * Cria uma nova instância de Consulta.
     * @param {Paciente} paciente - O paciente que está agendando a consulta.
     * @param {string} dataConsulta - A data da consulta (formato DD/MM/AAAA).
     * @param {string} horaInicio - A hora de início da consulta (formato HHMM).
     * @param {string} horaFim - A hora de fim da consulta (formato HHMM).
     */
    constructor(paciente, dataConsulta, horaInicio, horaFim) {
        this.#paciente = paciente;
        this.#dataConsulta = dataConsulta;
        this.#horaInicio = horaInicio;
        this.#horaFim = horaFim;
    }

    /**
     * Retorna o paciente relacionado à consulta.
     * @returns {Paciente} - O paciente que agendou a consulta.
     */
    getPaciente() {
        return this.#paciente;
    }

    /**
     * Retorna a data da consulta.
     * @returns {string} - A data da consulta.
     */
    getDataConsulta() {
        return this.#dataConsulta;
    }

    /**
     * Retorna a hora de início da consulta.
     * @returns {string} - A hora de início da consulta.
     */
    getHoraInicio() {
        return this.#horaInicio;
    }

    /**
     * Retorna a hora de fim da consulta.
     * @returns {string} - A hora de fim da consulta.
     */
    getHoraFim() {
        return this.#horaFim;
    }

    /**
     * Retorna uma representação legível da consulta.
     * @returns {string} - Representação da consulta.
     */
    toString() {
        return `Consulta de ${this.#paciente.getNome()} em ${this.#dataConsulta} das ${this.#horaInicio} às ${this.#horaFim}`;
    }
}
