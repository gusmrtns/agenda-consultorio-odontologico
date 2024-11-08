
class Agenda {
    constructor() {
        if (Agenda.instance) {
            return Agenda.instance;
        }

        this.consultas = [];
        Agenda.instance = this; // Salva a instância na classe
    }

    adicionarConsulta(consulta) {
        this.consultas.push(consulta);
    }

    getConsultas() {
        return this.consultas;
    }

    // Método estático para obter a instância
    static getInstance() {
        if (!Agenda.instance) {
            Agenda.instance = new Agenda();
        }
        return Agenda.instance;
    }
}

module.exports = Agenda;
