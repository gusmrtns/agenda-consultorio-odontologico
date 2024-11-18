class Agenda {
    #consultas = [];
    #pacientes = [];

    constructor() {
        if (Agenda.instance) {
            return Agenda.instance;
        }
        Agenda.instance = this;
    }

    // Adiciona um paciente à lista de pacientes na agenda
    adicionarPaciente(paciente) {
        this.#pacientes.push(paciente);
    }

    // Remover paciente da agenda
    removerPaciente(cpf) {
        const index = this.#pacientes.findIndex(paciente => paciente.getCPF() === cpf);
        if (index === -1) {
            throw new Error('Paciente não encontrado na agenda.');
        }
        this.#pacientes.splice(index, 1);  // Remove paciente
    }

    // Obtém os pacientes da agenda
    getPacientes() {
        return this.#pacientes;
    }

    // Adiciona uma consulta à agenda
    adicionarConsulta(consulta) {
        this.#consultas.push(consulta);
    }

    // Obtém as consultas agendadas
    getConsultas() {
        return this.#consultas;
    }

    // Método para cancelar consulta
    cancelarConsulta(cpf, dataConsulta, horaInicio) {
        const index = this.#consultas.findIndex(
            c => c.paciente.getCPF() === cpf && c.dataConsulta === dataConsulta && c.horaInicio === horaInicio
        );
        if (index === -1) return false;
        this.#consultas.splice(index, 1);
        return true;
    }

    // Método estático para obter a instância
    static getInstance() {
        if (!Agenda.instance) {
            Agenda.instance = new Agenda();
        }
        return Agenda.instance;
    }
}

export default Agenda;
