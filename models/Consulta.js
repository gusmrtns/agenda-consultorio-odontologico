export class Consulta {
    #paciente;
    #dataConsulta;
    #horaInicio;
    #horaFim;

    constructor(paciente, dataConsulta, horaInicio, horaFim) {
        this.#paciente = paciente;
        this.#dataConsulta = dataConsulta;
        this.#horaInicio = horaInicio;
        this.#horaFim = horaFim;
    }

    getPaciente() {
        return this.#paciente.toString();
    }

    getDataConsulta() {
        return this.#dataConsulta;
    }

    getHoraInicio() {
        return this.#horaInicio;
    }

    getHoraFim() {
        return this.#horaFim;
    }

    // Método toString para retornar uma representação legível da consulta
    toString() {
        return `Consulta de ${this.#paciente.getNome()} em ${this.#dataConsulta} das ${this.#horaInicio} às ${this.#horaFim}`;
    }
}
