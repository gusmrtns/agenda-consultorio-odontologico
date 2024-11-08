import Consulta from '../models/Consulta';
import Agenda from '../models/Agenda';

export class ConsultaFactory {
    // Cria uma nova consulta após realizar todas as validações necessárias.
    // Retorna um objeto com "valido: true" e a instância de consulta criada se as validações forem aprovadas.
    // Se alguma validação falhar, retorna "valido: false" e uma mensagem de erro para ser exibida pela View.
    static criarConsulta(paciente, dataConsulta, horaInicio, horaFim) {
        // Verifica se o horário está de acordo com as regras (hora de término, intervalos de 15 minutos, etc.)
        const horarioValido = this.validarHorario(horaInicio, horaFim);
        if (!horarioValido.valido) {
            return { valido: false, erro: horarioValido.erro }; // Retorna erro se o horário for inválido
        }

        // Verifica se a data da consulta é uma data futura
        if (!this.ehFuturo(dataConsulta)) {
            return { valido: false, erro: "A consulta deve ser para um período futuro." };
        }

        // Verifica se há sobreposição com outras consultas já agendadas no mesmo horário
        if (!this.verificarSobreposicao(dataConsulta, horaInicio, horaFim)) {
            return { valido: false, erro: "Consulta agendada em uma data ou horário indisponível." };
        }

        // Cria uma nova instância de Consulta se todas as validações foram aprovadas
        const consulta = new Consulta(paciente, dataConsulta, horaInicio, horaFim);
        return { valido: true, consulta };
    }

    // Verifica se o horário de início e término está dentro das regras definidas:
    // 1. Hora final deve ser maior que a hora inicial.
    // 2. Horários devem estar alinhados a intervalos de 15 minutos.
    // 3. O horário deve estar dentro do horário de funcionamento do consultório (8:00 às 19:00).
    static validarHorario(horaInicio, horaFim) {
        const inicioEmMinutos = this.converterParaMinutos(horaInicio);
        const fimEmMinutos = this.converterParaMinutos(horaFim);

        // Verifica se a hora final é maior que a hora inicial
        if (fimEmMinutos <= inicioEmMinutos) {
            return { valido: false, erro: "A hora final deve ser maior que a hora inicial." };
        }

        // Verifica se os horários estão alinhados a intervalos de 15 minutos
        if (!this.ehIntervaloDe15Minutos(inicioEmMinutos) || !this.ehIntervaloDe15Minutos(fimEmMinutos)) {
            return { valido: false, erro: "Os horários devem estar alinhados a intervalos de 15 minutos." };
        }

        // Verifica se o horário está dentro do horário de funcionamento (8:00 às 19:00)
        const abertura = 8 * 60;  // Representa 8:00 em minutos
        const fechamento = 19 * 60; // Representa 19:00 em minutos
        if (inicioEmMinutos < abertura || fimEmMinutos > fechamento) {
            return { valido: false, erro: "O horário deve estar dentro do horário de funcionamento (8:00h às 19:00h)." };
        }

        return { valido: true }; // Retorna válido se todas as regras forem atendidas
    }

    // Verifica se a data da consulta está no futuro, comparando com a data atual
    static ehFuturo(dataConsulta) {
        const hoje = new Date();
        return dataConsulta > hoje; // Retorna true se a consulta estiver em uma data futura
    }

    // Verifica se há sobreposição com consultas já existentes para a mesma data e horário
    // Acessa a instância singleton de Agenda para obter a lista de consultas atuais
    static verificarSobreposicao(dataConsulta, horaInicio, horaFim) {
        const agenda = Agenda.getInstance(); // Obtém a instância única de Agenda
        const inicioEmMinutos = this.converterParaMinutos(horaInicio);
        const fimEmMinutos = this.converterParaMinutos(horaFim);

        // Itera sobre as consultas na agenda para verificar sobreposição
        for (const consulta of agenda.getConsultas()) {
            // Verifica se é para a mesma data
            if (consulta.dataConsulta.toDateString() === dataConsulta.toDateString()) {
                const consultaInicio = this.converterParaMinutos(consulta.horaInicio);
                const consultaFim = this.converterParaMinutos(consulta.horaFim);

                // Verifica sobreposição de horários
                if (
                    (inicioEmMinutos >= consultaInicio && inicioEmMinutos < consultaFim) ||
                    (fimEmMinutos > consultaInicio && fimEmMinutos <= consultaFim) ||
                    (inicioEmMinutos <= consultaInicio && fimEmMinutos >= consultaFim)
                ) {
                    return false; // Retorna falso se houver sobreposição
                }
            }
        }
        return true; // Retorna verdadeiro se não houver sobreposição
    }

    // Converte o horário no formato HHMM para minutos (ex: "0830" para 510 minutos)
    static converterParaMinutos(horario) {
        const horas = parseInt(horario.slice(0, 2), 10);
        const minutos = parseInt(horario.slice(2), 10);
        return horas * 60 + minutos;
    }

    // Verifica se o horário está alinhado a intervalos de 15 minutos
    static ehIntervaloDe15Minutos(minutos) {
        return minutos % 15 === 0; // Retorna true se o horário for múltiplo de 15
    }
}
