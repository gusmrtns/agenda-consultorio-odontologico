import {ConsultaFactory} from '../factories/ConsultaFactory.js';
import Agenda from '../models/Agenda.js';
import ConsultaView from '../views/ConsultaView.js';

export class ConsultaController {
    // Método para agendar uma consulta
    static async agendarConsulta() {
        const { cpf, dataConsulta, horaInicio, horaFim } = await ConsultaView.obterDadosConsulta();
        const paciente = Agenda.getInstance().getPacientes().find(p => p.getCPF() === cpf);

        if (!paciente) {
            ConsultaView.mostrarErro('Paciente não encontrado.');
            return;
        }

        const resultado = ConsultaFactory.criarConsulta(paciente, dataConsulta, horaInicio, horaFim);

        if (!resultado.valido) {
            ConsultaView.mostrarErro(resultado.erro);
        } else {
            Agenda.getInstance().adicionarConsulta(resultado.consulta);
            ConsultaView.mostrarMensagem(`Consulta agendada para ${resultado.consulta.getPaciente()} em ${dataConsulta} das ${horaInicio} às ${horaFim}`);
        }
    }

    // Método para cancelar uma consulta
    static async cancelarConsulta() {
        const { cpf, dataConsulta, horaInicio } = await ConsultaView.obterDadosCancelamento();
        const sucesso = Agenda.getInstance().cancelarConsulta(cpf, dataConsulta, horaInicio);

        if (sucesso) {
            ConsultaView.mostrarMensagem('Consulta cancelada com sucesso.');
        } else {
            ConsultaView.mostrarErro('Erro ao cancelar consulta.');
        }
    }

    // Método para listar a agenda
    static listarAgenda() {
        const agenda = Agenda.getInstance().getConsultas();
        ConsultaView.listarAgenda(agenda);
    }
}
