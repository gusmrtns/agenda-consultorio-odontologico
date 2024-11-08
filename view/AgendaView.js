// views/AgendaView.js

const prompt = require('prompt-sync')();
const ConsultaFactory = require('../factories/ConsultaFactory');

class AgendaView {
    static exibirMenuPrincipal() {
        console.log("\nMenu Principal");
        console.log("1. Cadastro de pacientes");
        console.log("2. Agenda");
        console.log("3. Sair");
        return prompt("Escolha uma opção: ");
    }

    static exibirMenuAgenda() {
        console.log("\nMenu de Agenda");
        console.log("1. Agendar consulta");
        console.log("2. Cancelar agendamento");
        console.log("3. Listar agenda");
        console.log("4. Voltar para o menu principal");
        return prompt("Escolha uma opção: ");
    }

    static solicitarConsulta(paciente) {
        const dataConsulta = prompt("Digite a data da consulta (YYYY-MM-DD): ");
        const horaInicio = prompt("Digite a hora de início (HHMM): ");
        const horaFim = prompt("Digite a hora de fim (HHMM): ");

        const resultado = ConsultaFactory.criarConsulta(paciente, new Date(dataConsulta), horaInicio, horaFim);

        if (resultado.valido) {
            console.log("Consulta agendada com sucesso!");
            return resultado.consulta;
        } else {
            console.log(`Erro: ${resultado.erro}`);
            return null;
        }
    }
}

module.exports = AgendaView;
