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

    //TO DO
    toString() {

    }

}
