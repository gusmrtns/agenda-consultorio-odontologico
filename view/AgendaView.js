// views/AgendaView.js

const prompt = require('prompt-sync')();

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
}

module.exports = AgendaView;
