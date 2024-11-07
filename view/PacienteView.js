// views/PacienteView.js

const prompt = require('prompt-sync')();

class PacienteView {
    static exibirMenuPaciente() {
        console.log("\nMenu de Pacientes");
        console.log("1. Cadastrar novo paciente");
        console.log("2. Excluir paciente");
        console.log("3. Listar pacientes por CPF");
        console.log("4. Listar pacientes por nome");
        console.log("5. Voltar para o menu principal");
        return prompt("Escolha uma opção: ");
    }

    static exibirMensagemSucesso(mensagem) {
        console.log(`Sucesso: ${mensagem}`);
    }

    static exibirMensagemErro(mensagem) {
        console.log(`Erro: ${mensagem}`);
    }

    static solicitarCPF() {
        return prompt("Digite o CPF do paciente: ");
    }

    static solicitarNome() {
        return prompt("Digite o nome do paciente: ");
    }

    static solicitarDataNascimento() {
        return prompt("Digite a data de nascimento do paciente (DD/MM/AAAA): ");
    }
}

module.exports = PacienteView;
