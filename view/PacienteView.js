// views/PacienteView.js
const prompt = require('prompt-sync')();
const PacienteFactory = require('../factories/PacienteFactory');

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

    // Solicita as informações do paciente ao usuário, expecificamente para a criação
    static solicitarDadosPaciente() {
        const cpf = prompt("Digite o CPF do paciente: ");
        const nome = prompt("Digite o nome do paciente: ");
        const dataNascimento = prompt("Digite a data de nascimento (YYYY-MM-DD): ");

        // Tenta criar o paciente usando a factory
        const resultado = PacienteFactory.criarPaciente(cpf, nome, dataNascimento);

        // Verifica o resultado e exibe a mensagem apropriada
        if (resultado.valido) {
            console.log("Paciente cadastrado com sucesso!");
            return resultado.paciente; // Retorna o paciente criado se for válido
        } else {
            console.log(`Erro: ${resultado.erro}`); // Exibe a mensagem de erro se a criação falhar
            return null;
        }
    }
}

module.exports = PacienteView;
