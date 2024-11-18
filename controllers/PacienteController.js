import { PacienteFactory } from '../factories/PacienteFactory.js';
import Agenda from '../models/Agenda.js';
import PacienteView from '../views/PacienteView.js';


export class PacienteController {
    // Método para cadastrar um novo paciente
    static async cadastrarPaciente() {
        const { cpf, nome, dataNascimento } = await PacienteView.obterDadosPaciente();
        const resultado = PacienteFactory.criarPaciente(cpf, nome, dataNascimento);

        if (!resultado.valido) {
            PacienteView.mostrarErro(resultado.erro);
        } else {
            PacienteView.mostrarMensagem(`Paciente ${resultado.paciente.getNome()} cadastrado com sucesso!`);
            Agenda.getInstance().adicionarPaciente(resultado.paciente); // Adiciona paciente à agenda
        }
    }

    // Método para excluir um paciente
    static async excluirPaciente() {
        const cpf = await PacienteView.obterCpfPaciente();

        try {
            // Verifica se o paciente existe na agenda e remove
            Agenda.getInstance().removerPaciente(cpf);
            PacienteView.mostrarMensagem('Paciente excluído com sucesso.');
        } catch (erro) {
            PacienteView.mostrarErro(erro.message); // Caso o paciente não seja encontrado
        }
    }

    // Método para listar todos os pacientes
    static listarPacientes() {
        const pacientes = Agenda.getInstance().getPacientes();
        PacienteView.listarPacientes(pacientes);
    }
}
