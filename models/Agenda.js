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

        // verifica se o paciente tem agendamentos futuros
        const consultas = this.#consultas.filter(consulta => consulta.getPaciente().getCPF() === cpf);
        if (consultas.length > 0) {
            throw new Error('Paciente possui consultas agendadas.');
        }

        const index = this.#pacientes.findIndex(paciente => paciente.getCPF() === cpf);
        if (index === -1) {
            throw new Error('Paciente não encontrado na agenda.');
        }
        this.#pacientes.splice(index, 1);  // Remove paciente
    }

    // Obtém os pacientes da agenda
    getPacientes() {
        return this.#pacientes || []; // Retorna um array vazio se `this.pacientes` for nulo ou indefinido.
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

        // Verifica se o agendamente é futuro
        if(DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy') < DateTime.now()) {
            throw new Error('Não é possível cancelar consultas passadas.');
        }

        const index = this.#consultas.findIndex(
            consulta => consulta.getPaciente().getCPF() === cpf && consulta.getDataConsulta() === dataConsulta && consulta.getHoraInicio() === horaInicio
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
