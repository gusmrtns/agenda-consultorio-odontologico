// app.js

// Importando controllers e views
const PacienteController = require('./controllers/PacienteController');
const AgendaController = require('./controllers/AgendaController');
const AgendaView = require('./views/AgendaView');  // Menu principal e de agenda
const PacienteView = require('./views/PacienteView'); // Menu de pacientes e mensagens

// Instanciando controladores
const pacienteController = new PacienteController();
const agendaController = new AgendaController();

// Função principal de inicialização
function startApp() {
    console.log("Bem-vindo ao sistema de administração da agenda odontológica!");
    let exit = false;

    while (!exit) {
        const choice = AgendaView.exibirMenuPrincipal();

        switch (choice) {
            case "1":
                pacienteController.gerenciarPacientes(); // Chama o menu do cadastro de pacientes
                break;
            case "2":
                agendaController.gerenciarAgenda(); // Chama o menu de agenda
                break;
            case "3":
                console.log("Saindo...");
                exit = true;
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

// Inicia a aplicação
startApp();
