# Administração da Agenda de um Consultório Odontológico

Este projeto é uma aplicação console desenvolvida em JavaScript puro, seguindo os padrões de projeto **MVC**, **Services** e **Factories** para organizar a administração de uma agenda de consultório odontológico. As classes de View são responsáveis por toda a interação com o usuário, enquanto as Factories gerenciam a validação e criação das instâncias.

## Estrutura do Projeto

### Models

1. **Paciente**

   - **Atributos**:
     - `cpf: string`
     - `nome: string`
     - `dataNascimento: Date`
   - **Descrição**: Representa os dados básicos de um paciente, que são validados no momento de criação por meio da `PacienteFactory`.

2. **Consulta**

   - **Atributos**:
     - `paciente: Paciente`
     - `dataConsulta: Date`
     - `horaInicio: string`
     - `horaFim: string`
   - **Descrição**: Representa uma consulta de um paciente no consultório. A `ConsultaFactory` verifica o horário, sobreposição e outros requisitos antes de criar uma instância.

3. **Agenda** (Singleton)
   - **Atributos**:
     - `consultas: Consulta[]`
   - **Métodos**:
     - `adicionarConsulta(consulta: Consulta)`: Adiciona uma nova consulta à lista de consultas.
     - `getConsultas()`: Retorna a lista de consultas agendadas.
   - **Descrição**: Mantém um array de consultas e usa o padrão Singleton para garantir que apenas uma instância de `Agenda` exista em toda a aplicação. Permite que o código acesse a lista de consultas sem precisar passá-la como parâmetro.

### Factories

1. **PacienteFactory**

   - **Métodos**:
     - `criarPaciente(cpf: string, nome: string, dataNascimento: Date)`: Valida o CPF e a idade mínima. Retorna um objeto `{ valido: boolean, erro?: string, paciente?: Paciente }` com a instância do paciente ou uma mensagem de erro.
     - `validarCPF(cpf: string)`: Valida o CPF usando o algoritmo de cálculo dos dígitos verificadores. Retorna `true` se o CPF é válido e `false` caso contrário.
     - `validarIdadeMinima(dataNascimento: Date)`: Verifica se a idade do paciente é igual ou superior a 13 anos. Retorna `true` se a idade é válida e `false` caso contrário.
   - **Descrição**: Gerencia a criação de instâncias de `Paciente` e centraliza a validação de CPF e idade mínima.

2. **ConsultaFactory**
   - **Métodos**:
     - `criarConsulta(paciente: Paciente, dataConsulta: Date, horaInicio: string, horaFim: string)`: Valida o horário, a data futura e a sobreposição de consultas. Retorna um objeto `{ valido: boolean, erro?: string, consulta?: Consulta }` com a instância da consulta ou uma mensagem de erro.
     - `validarHorario(horaInicio: string, horaFim: string)`: Valida se o horário atende às regras de negócio (hora final maior que a inicial, intervalos de 15 minutos, e horário de funcionamento). Retorna `{ valido: boolean, erro?: string }`.
     - `ehFuturo(dataConsulta: Date)`: Verifica se a data da consulta é uma data futura. Retorna `true` se a data é válida e `false` caso contrário.
     - `verificarSobreposicao(dataConsulta: Date, horaInicio: string, horaFim: string)`: Verifica se a consulta se sobrepõe a outras já agendadas para a mesma data e horário. Retorna `true` se não há sobreposição e `false` caso contrário.
     - `converterParaMinutos(horario: string)`: Converte o horário no formato `HHMM` para minutos totais. Retorna o número de minutos.
     - `ehIntervaloDe15Minutos(minutos: number)`: Verifica se o horário está alinhado a intervalos de 15 minutos. Retorna `true` se é múltiplo de 15 e `false` caso contrário.
   - **Descrição**: Gerencia a criação de instâncias de `Consulta`, validando todos os requisitos necessários antes da criação.

### Services

1. **PacienteService**

   - **Métodos**:
     - `adicionarPaciente(cpf: string, nome: string, dataNascimento: Date)`: Adiciona um paciente à lista geral.
     - `removerPaciente(cpf: string)`: Remove um paciente da lista geral.
   - **Descrição**: Realiza operações de negócio relacionadas aos pacientes.

2. **ConsultaService**
   - **Métodos**:
     - `agendarConsulta(cpf: string, dataConsulta: Date, horaInicio: string, horaFim: string)`: Agrega uma consulta à agenda.
     - `cancelarConsulta(cpf: string, dataConsulta: Date, horaInicio: string)`: Cancela uma consulta existente.
   - **Descrição**: Realiza operações de agendamento e cancelamento de consultas.

### Controllers

1. **PacienteController**

   - **Métodos**:
     - `cadastrarPaciente()`: Chama a `PacienteView` para obter dados e, em seguida, chama `PacienteService` para cadastrar o paciente.
     - `excluirPaciente()`: Solicita um CPF pela `PacienteView` e remove o paciente pelo `PacienteService`.
     - `listarPacientes(ordenadoPor: string)`: Lista os pacientes ordenados conforme o critério.
   - **Descrição**: Coordena a interação entre a `PacienteView` e o `PacienteService` para o gerenciamento de pacientes.

2. **AgendaController**
   - **Métodos**:
     - `agendarConsulta()`: Captura informações de agendamento da `AgendaView` e coordena a criação de uma consulta com a `ConsultaService`.
     - `cancelarConsulta()`: Solicita uma consulta para cancelamento e executa o cancelamento via `ConsultaService`.
     - `listarAgenda(periodoInicio?: Date, periodoFim?: Date)`: Lista as consultas de acordo com o período especificado.
   - **Descrição**: Coordena a interação entre a `AgendaView` e o `ConsultaService` para o gerenciamento das consultas na agenda.

### Views

1. **PacienteView**

   - **Métodos**:
     - `solicitarDadosPaciente()`: Captura dados do paciente e exibe mensagens conforme o retorno da `PacienteFactory`.
   - **Descrição**: Exibe e captura dados relacionados a pacientes, incluindo CPF, nome e data de nascimento. Mostra mensagens de erro ou sucesso de acordo com o resultado das factories.

2. **AgendaView**
   - **Métodos**:
     - `exibirMenuPrincipal()`: Exibe o menu principal da aplicação.
     - `exibirMenuAgenda()`: Exibe o menu de opções de agendamento.
     - `solicitarHorario()`: Captura horários para a consulta e exibe mensagens conforme o resultado da `ConsultaFactory`.
   - **Descrição**: Exibe o menu principal e o menu de agendamento, capturando horários e exibindo mensagens de erro ou sucesso com base no retorno da `ConsultaFactory`.

## Organização e Fluxo

- **Factories**: Gerenciam as validações e criação das instâncias `Paciente` e `Consulta`, incluindo os métodos de validação necessários para garantir que os dados estejam corretos antes de criar uma nova instância.
- **Controllers**: Coordenam a lógica entre Services e Views, chamando as factories quando necessário.
- **Views**: Responsáveis pela interação com o usuário, incluindo a exibição de mensagens e a solicitação de dados. As Views agora exibem todas as mensagens de erro e sucesso com base nos retornos das factories, melhorando a separação de responsabilidades.
- **Singleton em Agenda**: A classe `Agenda` foi implementada como Singleton para permitir acesso global e consistente à lista de consultas.
