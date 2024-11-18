import prompt from 'prompt-sync';

const input = prompt();

export default {
    async obterDadosConsulta() {
        console.log('Agendar Consulta');
        const cpf = input('Digite o CPF do paciente: ');
        const dataConsulta = input('Digite a data da consulta (DD/MM/AAAA): ');
        const horaInicio = input('Digite a hora de início (HHMM): ');
        const horaFim = input('Digite a hora de fim (HHMM): ');
        return { cpf, dataConsulta, horaInicio, horaFim };
    },

    async obterDadosCancelamento() {
        console.log('Cancelar Consulta');
        const cpf = input('Digite o CPF do paciente: ');
        const dataConsulta = input('Digite a data da consulta (DD/MM/AAAA): ');
        const horaInicio = input('Digite a hora de início da consulta (HHMM): ');
        return { cpf, dataConsulta, horaInicio };
    },

    listarAgenda(consultas) {
        console.log('Agenda');
        consultas.forEach(consulta => {
            console.log(consulta.toString());
        });
    },

    mostrarErro(erro) {
        console.log(`Erro: ${erro}`);
    },

    mostrarMensagem(mensagem) {
        console.log(mensagem);
    }
};
