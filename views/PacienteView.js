import prompt from 'prompt-sync';
import Agenda from '../models/Agenda.js';
import {DateTime} from 'luxon';

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
    
        if (!Array.isArray(pacientes) || pacientes.length === 0) {
            console.log('Nenhum paciente encontrado.');
            return;
        }
    
        const consultas = Agenda.getInstance().getConsultas(); // Obtém todas as consultas
        const agora = DateTime.now();

        pacientes.forEach(paciente => {
            console.log(paciente.toString());
    
            // Filtra as consultas futuras para o paciente atual
            const consultasFuturas = consultas.filter(consulta => {
                const dataConsulta = DateTime.fromFormat(consulta.getDataConsulta(), 'dd/MM/yyyy');
               return consulta.getPaciente().getCPF() === paciente.getCPF() && 
                dataConsulta > agora;
        });
    
            if (consultasFuturas.length > 0) {
                console.log('  Consultas Futuras:');
                consultasFuturas.forEach(consulta => {
                    console.log(`    - ${consulta.toString()}`); // Exibe os detalhes da consulta
                });
            } else {
                console.log('  Sem consultas futuras.');
            }
        });
    },

    mostrarErro(erro) {
        console.log(`Erro: ${erro}`);
    },

    mostrarMensagem(mensagem) {
        console.log(mensagem);
    }
};
