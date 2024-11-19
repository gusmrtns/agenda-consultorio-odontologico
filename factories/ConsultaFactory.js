import {Consulta} from '../models/Consulta.js';
import Agenda from '../models/Agenda.js';
import {DateTime} from 'luxon';

export class ConsultaFactory {
    static criarConsulta(paciente, dataConsulta, horaInicio, horaFim) {
        const horarioValido = this.validarHorario(horaInicio, horaFim);
        if (!horarioValido.valido) {
            return { valido: false, erro: horarioValido.erro };
        }

        if (!this.ehFuturo(dataConsulta)) {
            return { valido: false, erro: "A consulta deve ser para um período futuro." };
        }

        if (!this.verificarSobreposicao(dataConsulta, horaInicio, horaFim)) {
            return { valido: false, erro: "Horário indisponível para agendamento." };
        }

        const consulta = new Consulta(paciente, dataConsulta, horaInicio, horaFim);
        return { valido: true, consulta };
    }

    static validarHorario(horaInicio, horaFim) {
        const inicio = this.converterParaMinutos(horaInicio);
        const fim = this.converterParaMinutos(horaFim);
        const abertura = 8 * 60;
        const fechamento = 19 * 60;

        if (fim <= inicio) {
            return { valido: false, erro: "A hora final deve ser maior que a hora inicial." };
        }

        if (!this.ehIntervaloDe15Minutos(inicio) || !this.ehIntervaloDe15Minutos(fim)) {
            return { valido: false, erro: "Horários devem ser múltiplos de 15 minutos." };
        }

        if (inicio < abertura || fim > fechamento) {
            return { valido: false, erro: "Horários fora do expediente (8:00 às 19:00)." };
        }

        return { valido: true };
    }

    static ehFuturo(dataConsulta) {
        const hoje = DateTime.local();
        const dataConsultaLuxon = DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy');
        return dataConsultaLuxon > hoje; 
    }

    static verificarSobreposicao(dataConsulta, horaInicio, horaFim) {
        const agenda = Agenda.getInstance();
        const inicio = this.converterParaMinutos(horaInicio);
        const fim = this.converterParaMinutos(horaFim);
        const dataConsultaLuxon = DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy');

        return !agenda.getConsultas().some(consulta => {
            const dataConsultaLuxonAuxiliar = DateTime.fromFormat(consulta.getDataConsulta(), 'dd/MM/yyyy');

            if (dataConsultaLuxonAuxiliar.equals(dataConsultaLuxon)) {
                const consultaInicio = this.converterParaMinutos(consulta.getHoraInicio());
                const consultaFim = this.converterParaMinutos(consulta.getHoraFim());
                return (
                    (inicio >= consultaInicio && inicio < consultaFim) ||
                    (fim > consultaInicio && fim <= consultaFim) ||
                    (inicio <= consultaInicio && fim >= consultaFim)
                );
            }
            return false;
        });
    }

    static converterParaMinutos(horario) {
        const horas = parseInt(horario.slice(0, 2), 10);
        const minutos = parseInt(horario.slice(2), 10);
        return horas * 60 + minutos;
    }

    static ehIntervaloDe15Minutos(minutos) {
        return minutos % 15 === 0;
    }
}
