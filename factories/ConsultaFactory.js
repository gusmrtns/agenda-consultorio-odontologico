import Consulta from '../models/Consulta';

export class ConsultaFactory {

    static criarConsulta(paciente, dataConsulta, horaInicio, horaFim) {
        if(!this.validarHorario()){
            console.log("Horário inválido");
            return null;
        }

        if(!this.ehFuturo()){
            console.log("A consulta deve ser para um período futuro.")
            return null;
        }

        if(!this.verificarSobreposicao()){
            console.log("Consulta agendada em uma data ou horário indisponível.")
            return null
        }

        return new Consulta(paciente, dataConsulta, horaInicio, horaFim);
    }

}