import prompt from 'prompt-sync';

const input = prompt();

export default {
    async obterDadosPaciente() {
        console.log('Cadastro de Paciente');
        const cpf = input('Digite o CPF: ');
        const nome = input('Digite o nome: ');
        const dataNascimento = input('Digite a data de nascimento (DD/MM/AAAA): ');
        return { cpf, nome, dataNascimento };
    },

    async obterCpfPaciente() {
        console.log('Excluir Paciente');
        return input('Digite o CPF do paciente a ser excluído: ');
    },

    listarPacientes(pacientes) {
        console.log('Listagem de Pacientes');
        pacientes.forEach(paciente => {
            console.log(paciente.toString());
        });
    },

    mostrarErro(erro) {
        console.log(`Erro: ${erro}`);
    },

    mostrarMensagem(mensagem) {
        console.log(mensagem);
    }
};
