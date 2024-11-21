# Desafio Node.js #1.2

## Formação Back-end - Node.js/Express Desafio #1.2

### Administração da Agenda de um Consultório Odontológico

---

### Instruções

- A aplicação deve ser desenvolvida individualmente.
- A aplicação deve ser versionada e disponibilizada no Github.

### Descrição

Desenvolver uma aplicação console em Javascript para administrar a agenda de um consultório odontológico. As funcionalidades da aplicação estão definidas a seguir e os layouts da interface com o usuário estão definidos no final deste documento.

---

### Funcionalidades

| Requisito                                                                                                                                      | Status      |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| **1. Inclusão de pacientes no cadastro**: são necessários CPF, nome e data de nascimento.                                                      | **Done**    |
| O CPF deve ser válido (vide Anexo A).                                                                                                          | **Done**    |
| O nome do usuário deve ter pelo menos 5 caracteres.                                                                                            | **Done**    |
| A data de nascimento deve ser fornecida no formato DD/MM/AAAA.                                                                                 | **Done**    |
| Caso algum dado seja inválido, deve ser apresentada uma mensagem de erro e o dado deve ser solicitado novamente.                               | **Done**    |
| Não podem existir dois pacientes com o mesmo CPF.                                                                                              | **Done**    |
| O dentista não atende crianças; logo, o paciente deve ter 13 anos ou mais no momento do cadastro (data atual).                                 | **Done**    |
| **2. Exclusão de pacientes do cadastro**: é necessário fornecer o CPF.                                                                         | **Done**    |
| Um paciente com uma consulta agendada futura não pode ser excluído.                                                                            | **Done**    |
| Se o paciente tiver uma ou mais consultas agendadas passadas, ele pode ser excluído, e os respectivos agendamentos também devem ser excluídos. | **Done**    |
| **3. Agendamento de uma consulta**: são necessários CPF do paciente, data da consulta, hora inicial e hora final.                              | **Done**    |
| CPF deve existir no cadastro.                                                                                                                  | **Done**    |
| A data da consulta deve ser fornecida no formato DD/MM/AAAA.                                                                                   | **Done**    |
| Hora inicial e final devem ser fornecidos no formato HHMM (padrão brasileiro).                                                                 | **Done**    |
| O agendamento deve ser para um período futuro.                                                                                                 | **Done**    |
| Hora final > hora inicial.                                                                                                                     | **Done**    |
| Cada paciente só pode realizar um agendamento futuro por vez.                                                                                  | **Done**    |
| Não pode haver agendamentos sobrepostos.                                                                                                       | **Done**    |
| As horas inicial e final são definidas sempre de 15 em 15 minutos.                                                                             | **Done**    |
| O horário de funcionamento do consultório é das 8:00h às 19:00h.                                                                               | **Done**    |
| **4. Cancelamento de um agendamento**: são necessários CPF do paciente, data da consulta e hora inicial.                                       | **Done**    |
| O cancelamento só pode ser realizado se for de um agendamento futuro.                                                                          | **Done**    |
| **5. Listagem dos Pacientes**                                                                                                                  | **Done**    |
| A listagem de pacientes deve ser apresentada conforme o layout e pode estar ordenada de forma crescente por CPF ou nome.                       | **Done**    |
| Se o paciente possuir um agendamento futuro, os dados do agendamento devem ser apresentados abaixo dos dados do paciente.                      | **Done**    |
| **6. Listagem da Agenda**                                                                                                                      | **Pending** |
| A listagem da agenda deve ser apresentada conforme o layout e deve estar ordenada de forma crescente por data e hora inicial.                  | **Pending** |
| O usuário pode listar toda a agenda ou a agenda de um período específico.                                                                      | **Pending** |

---

### Regras

- Todas as datas e horas fornecidas pelo usuário devem ser válidas.
- Nas listagens, os dados devem estar formatados e alinhados conforme os layouts definidos.

### Dicas

- Para realizar entrada via console use a API [prompt-sync](https://www.npmjs.com/package/prompt-sync).
- Para trabalhar com data/hora use a API [Luxon](https://moment.github.io/luxon/#/).

---

### Interface com o Usuário

#### Layouts dos Menus

**Menu Principal**

### Interface com o Usuário

#### Layouts dos Menus

**Menu Principal**

```
1-Cadastro de pacientes
2-Agenda
3-Fim
```

**Menu do Cadastro de Pacientes**

```
1-Cadastrar novo paciente
2-Excluir paciente
3-Listar pacientes (ordenado por CPF)
4-Listar pacientes (ordenado por nome)
5-Voltar p/ menu principal
```

**Menu da Agenda**

```
1-Agendar consulta
2-Cancelar agendamento
3-Listar agenda
4-Voltar p/ menu principal
```

#### Layouts das Listagens

**Listagem dos Pacientes**

```
------------------------------------------------------------
CPF         Nome                        Dt.Nasc.  Idade
------------------------------------------------------------
99999999999 Nome Completo               99/99/9999  999
Agendado para: 99/99/9999 HH:MM às HH:MM
```

**Listagem da Agenda**

```
Apresentar a agenda T-Toda ou P-Periodo: P
Data inicial: 01/01/2022
Data final: 05/01/2022
-------------------------------------------------------------
Data        H.Ini H.Fim  Tempo Nome              Dt.Nasc.
-------------------------------------------------------------
01/01/2022  07:30 08:00  00:30 Nome Completo     99/99/9999
```

#### Layouts do Cadastro de Pacientes

**Cadastramento de Pacientes**

```
CPF: 12345678901
Nome: Joao da Silva
Data de nascimento: 05/07/1999
Paciente cadastrado com sucesso!
```

---

### Critérios de Avaliação

- Aderência ao paradigma OO.
- Qualidade do código (indentação, nome de variáveis e métodos, documentação).
- Comportamento do programa deve seguir as regras definidas.
- Mensagens de erro apropriadas.

---

### Anexo A - Validação de CPF

Um CPF é válido se obedece às seguintes regras:

- Possui exatamente 11 dígitos.
- Os 11 dígitos não podem ser todos iguais.
- O cálculo dos dígitos verificadores é detalhado conforme especificações.
