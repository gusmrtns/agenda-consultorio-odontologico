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

    validarHorario() {
        // Converte os horários para minutos
        const inicioEmMinutos = this.converterParaMinutos(horaInicio);
        const fimEmMinutos = this.converterParaMinutos(horaFim);
    
        // Condição 1: Hora final deve ser maior que hora inicial
        if (fimEmMinutos <= inicioEmMinutos) {
            console.log("Erro: A hora final deve ser maior que a hora inicial.");
            return false;
        }

        // Condição 2: Horários devem estar em intervalos de 15 minutos
        if (!this.ehIntervaloDe15Minutos(inicioEmMinutos) || !this.ehIntervaloDe15Minutos(fimEmMinutos)) {
            console.log("Erro: Os horários devem estar alinhados a intervalos de 15 minutos.");
            return false;
        }

        // Condição 3: Horário de funcionamento (8:00h às 19:00h)
        const abertura = 8 * 60;  // 8:00 em minutos
        const fechamento = 19 * 60; // 19:00 em minutos
        if (inicioEmMinutos < abertura || fimEmMinutos > fechamento) {
            console.log("Erro: O horário deve estar dentro do horário de funcionamento (8:00h às 19:00h).");
            return false;
        }

        // Se todas as condições foram atendidas, o horário é válido
        return true;
        }

    static converterParaMinutos(horario) {
        const horas = parseInt(horario.slice(0, 2), 10);
        const minutos = parseInt(horario.slice(2), 10);
        return horas * 60 + minutos;
    }


    static ehIntervaloDe15Minutos(minutos) {
        return minutos % 15 === 0;
    }

}
