# 🏋️ Sistema de Gestão para Academia de Musculação

Sistema desenvolvido para **digitalizar e centralizar a gestão de uma academia de musculação**, automatizando o controle de alunos, pagamentos, acesso, fichas de treino e indicadores financeiros.

A plataforma tem como objetivo reduzir processos manuais e facilitar o trabalho de **gestores, professores e alunos**, disponibilizando as principais informações em um único sistema.

## 🚀 Principais Funcionalidades

### 👤 Gestão de Alunos

* Cadastro e gerenciamento de alunos
* Consulta de informações pessoais
* Controle de planos e mensalidades
* Histórico de pagamentos
* Controle de status do aluno
* Identificação de alunos ativos e inadimplentes

### 💳 Gestão Financeira

* Cadastro de planos e mensalidades
* Registro de pagamentos
* Controle de contas a receber
* Identificação de mensalidades atrasadas
* Acompanhamento do faturamento
* Indicadores financeiros para o gestor

### 🔐 Controle de Acesso

* Registro de entrada dos alunos
* Validação do plano ativo
* Bloqueio de acesso para alunos inadimplentes
* Histórico de acessos
* Estrutura preparada para integração com QR Code, catracas ou leitores

### 🏋️ Fichas de Treino

* Criação de fichas de treino
* Cadastro de exercícios
* Organização dos exercícios por treino
* Definição de séries, repetições e cargas
* Associação de fichas aos alunos
* Atualização dos treinos pelos professores

### 📊 Relatórios e Indicadores

* Número de alunos ativos
* Alunos inadimplentes
* Faturamento
* Controle de mensalidades
* Taxa de cancelamento (churn)
* Histórico de acessos
* Indicadores para auxiliar na tomada de decisões

---

## 🎯 Objetivo do Projeto

O projeto foi desenvolvido com o propósito de aplicar conceitos de **desenvolvimento de sistemas, banco de dados, APIs e regras de negócio** em uma situação próxima à realidade de uma empresa.

A proposta é substituir processos como fichas de treino em papel, controles financeiros em planilhas e registros manuais de acesso por uma solução centralizada.

---

## 🏗️ Estrutura do Sistema

O sistema é dividido em diferentes módulos:

```text
                    ┌─────────────────────┐
                    │       SISTEMA       │
                    │      ACADEMIA       │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
   │   Alunos    │      │ Financeiro  │      │  Treinos    │
   └─────────────┘      └─────────────┘      └─────────────┘
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │
                               ▼
                       ┌───────────────┐
                       │   Relatórios  │
                       │  e Indicadores│
                       └───────────────┘
```

---

## 👥 Perfis de Usuário

### Administrador / Gestor

Responsável pelo gerenciamento geral da academia.

* Gerenciar alunos
* Gerenciar planos
* Acompanhar pagamentos
* Consultar relatórios
* Visualizar indicadores financeiros

### Professor

Responsável pela parte de treinamento.

* Consultar alunos
* Criar fichas de treino
* Atualizar exercícios
* Definir séries, repetições e cargas

### Aluno

Acesso às suas próprias informações.

* Consultar ficha de treino
* Visualizar exercícios
* Consultar séries e repetições
* Acompanhar seu plano

---

## 🗄️ Principais Entidades

A estrutura do banco de dados pode ser organizada a partir das seguintes entidades:

```text
Aluno
 ├── Plano
 ├── Pagamentos
 ├── Acessos
 └── Ficha de Treino
       ├── Exercícios
       ├── Séries
       ├── Repetições
       └── Cargas

Professor
 └── Fichas de Treino

Plano
 └── Mensalidades
```

---

## 🔄 Regras de Negócio

Algumas das principais regras previstas no sistema:

* Um aluno deve possuir um plano cadastrado.
* O acesso do aluno pode ser bloqueado quando houver mensalidade em atraso.
* Apenas usuários autorizados podem cadastrar ou alterar fichas de treino.
* O professor pode administrar os treinos dos alunos vinculados a ele.
* Pagamentos devem ficar registrados no histórico financeiro.
* O sistema deve manter o histórico de acessos dos alunos.
* Informações financeiras devem ser acessíveis apenas por usuários autorizados.

---

## 🛠️ Tecnologias

> As tecnologias abaixo podem ser adaptadas conforme a implementação do projeto.

* **Backend:** Python / Java
* **Framework:** Django / Spring Boot
* **Banco de dados:** MySQL
* **API:** REST
* **Versionamento:** Git e GitHub
* **Documentação:** Swagger / OpenAPI

---

## 📁 Organização do Projeto

Uma possível organização:

```text
sistema-academia/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── repositories/
│   └── routes/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── database/
│   └── migrations/
│
├── docs/
│
├── .gitignore
├── README.md
└── requirements.txt
```

---

## 🔮 Funcionalidades Futuras

* [ ] Integração com catracas
* [ ] Leitura de QR Code
* [ ] Integração com WhatsApp
* [ ] Envio automático de lembretes de pagamento
* [ ] Aplicativo mobile para alunos
* [ ] Notificações de treino
* [ ] Dashboard financeiro avançado
* [ ] Controle de estoque de suplementos e produtos
* [ ] Sistema de avaliação física
* [ ] Histórico de evolução do aluno
* [ ] Integração com sistemas de pagamento

---

## 📈 Benefícios

O sistema busca proporcionar:

* **Mais organização** para a academia
* **Redução de processos manuais**
* **Maior controle financeiro**
* **Agilidade no gerenciamento dos alunos**
* **Melhor acompanhamento dos treinos**
* **Centralização das informações**
* **Facilidade para tomada de decisões**

---

## 👨‍💻 Sobre o Projeto

Projeto desenvolvido com finalidade **acadêmica e prática**, visando aplicar conhecimentos de desenvolvimento de software, banco de dados, APIs, arquitetura de sistemas e regras de negócio em uma aplicação voltada para o gerenciamento de academias.

---

## 📌 Status

🚧 **Em desenvolvimento**

Novas funcionalidades e melhorias serão adicionadas conforme a evolução do projeto.
