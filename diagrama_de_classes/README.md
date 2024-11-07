# Administração da Agenda de um Consultório Odontológico

Este projeto é uma aplicação console desenvolvida em JavaScript puro, seguindo os padrões de projeto **MVC**, **Services** e **Factories** para organizar a administração de uma agenda de consultório odontológico.

## Estrutura do Projeto

### Models

1. **Paciente**

   - **Atributos**:
     - `cpf: string`
     - `nome: string`
     - `dataNascimento: Date`
   - **Métodos**:
     - `validarCPF(): boolean`
     - `validarIdadeMinima(): boolean`

2. **Consulta**

   - **Atributos**:
     - `paciente: Paciente`
     - `dataConsulta: Date`
     - `horaInicio: string`
     - `horaFim: string`
   - **Métodos**:
     - `validarHorario(): boolean`
     - `calcularTempo(): string`
     - `ehFuturo(): boolean`
     - `verificarSobreposicao(outraConsulta: Consulta): boolean`

3. **Agenda**
   - **Atributos**:
     - `consultas: Consulta[]`
   - **Métodos**:
     - `adicionarConsulta(consulta: Consulta): void`
     - `cancelarConsulta(paciente: Paciente, data: Date, horaInicio: string): void`
     - `listarConsultas(periodoInicio?: Date, periodoFim?: Date): Consulta[]`

### Factories

1. **PacienteFactory**

   - **Método**:
     - `criarPaciente(cpf: string, nome: string, dataNascimento: Date): Paciente`
     - Realiza validações iniciais e cria uma instância de **Paciente** com os dados corretos.

2. **ConsultaFactory**
   - **Método**:
     - `criarConsulta(paciente: Paciente, dataConsulta: Date, horaInicio: string, horaFim: string): Consulta`
     - Valida os horários e outros requisitos antes de instanciar **Consulta**.

### Services

1. **PacienteService**

   - Responsável por operações de negócio relacionadas aos pacientes.
   - **Métodos**:
     - `adicionarPaciente(cpf: string, nome: string, dataNascimento: Date): void`
     - `removerPaciente(cpf: string): void`
     - `listarPacientes(ordenadoPor: string): Paciente[]`

2. **ConsultaService**
   - Lida com operações e regras de negócio das consultas, verificando sobreposições, horários válidos, e outras regras de agendamento.
   - **Métodos**:
     - `agendarConsulta(cpf: string, dataConsulta: Date, horaInicio: string, horaFim: string): void`
     - `cancelarConsulta(cpf: string, dataConsulta: Date, horaInicio: string): void`
     - `listarAgenda(periodoInicio?: Date, periodoFim?: Date): Consulta[]`

### Controllers

1. **PacienteController**

   - Lida com a entrada e saída relacionadas aos pacientes e coordena o fluxo de informações entre o usuário e o **PacienteService**.
   - **Métodos**:
     - `cadastrarPaciente()`
     - `excluirPaciente()`
     - `listarPacientes(ordenadoPor: string)`

2. **AgendaController**
   - Controla o fluxo de informações para a agenda de consultas.
   - **Métodos**:
     - `agendarConsulta()`
     - `cancelarConsulta()`
     - `listarAgenda(periodoInicio?: Date, periodoFim?: Date)`

### Views

1. **PacienteView** e **AgendaView**
   - Exibem dados formatados e coletam entradas do usuário (menus, mensagens de erro ou sucesso).

## Organização e Fluxo

- **Controllers**: Coordenam a comunicação entre o usuário, Services e Views.
- **Services**: Realizam a lógica de negócio e interagem com os Models, chamando Factories para criar instâncias quando necessário.
- **Factories**: Criam e validam instâncias de **Paciente** e **Consulta**, centralizando a lógica de criação.
- **Models**: Contêm os dados e métodos centrais do domínio.
- **Views**: Tratam a interação visual com o usuário.

Esse modelo organiza a lógica de negócios e a criação de objetos de forma clara, facilitando testes e futuras alterações ou expansões no sistema.
