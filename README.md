# StockFlow - Sistema Distribuído de Gerenciamento de Estoque

## 📋 Sobre o Projeto

O **StockFlow** é um sistema distribuído de gerenciamento de estoque, desenvolvido como Trabalho Final da disciplina Tópicos Avançados em Programação. A aplicação utiliza uma arquitetura moderna com microserviços, demonstrando na prática como projetar, organizar e orquestrar um ecossistema de serviços escaláveis e independentes.

**👨‍🎓 Autores**
- Francisco Marcello Ribeiro Lima
- Deivid da Silva Matos  
- Artur de Ávila

## 🏗️ Arquitetura

### 🎯 Tecnologias Utilizadas
- **Backend**: Microserviços com Spring Boot + Spring Cloud
- **Frontend**: Angular 20 + TypeScript
- **Serviços**: Eureka (Service Discovery), Gateway, Autenticação
- **Containerização**: Docker + Docker Compose
- **Web Server**: Nginx
- **Arquitetura**: Hexagonal (Ports & Adapters)

### 🌀 Microserviços

| Serviço | Porta | Responsabilidade |
|---------|-------|------------------|
| **SERVICE-DISCOVERY** | `8080` | Registro e descoberta dos microserviços |
| **GATEWAY-SERVICE** | `8084` | Roteamento, segurança e entrada única da API |
| **AUTH-SERVICE** | `8085` | Autenticação e geração de JWT |
| **CADASTROS-SERVICE** | `8087` | CRUD de produtos e fornecedores |
| **ESTOQUE-SERVICE** | `8088` | Entradas, saídas e saldo de estoque |

**🔗 Cada serviço possui seu próprio banco H2, mantendo autonomia total.**

## 🖥️ Frontend Angular

### 📦 Funcionalidades Implementadas

#### 🔐 **Módulo de Autenticação**
- **Login**: `http://localhost:4200/login`
- **Registro**: `http://localhost:4200/register`
- **Redirecionamento automático** após login bem-sucedido

#### 📋 **Módulo de Cadastros**
- **Lista de Produtos**: `http://localhost:4200/cadastros/produtos`
- **Novo Produto**: `http://localhost:4200/cadastros/produtos/novo`
- **Detalhes do Produto**: `http://localhost:4200/cadastros/produtos/{id}`
- **Fornecedores**: `http://localhost:4200/cadastros/fornecedores`

#### 📊 **Módulo de Estoque**
- **Lista Completa de Estoque**: `http://localhost:4200/estoque/lista`
- **Estoque por Produto**: `http://localhost:4200/estoque/produto/{id}`
- **Registrar Entrada**: `http://localhost:4200/estoque/entrada/{id}`
- **Registrar Saída**: `http://localhost:4200/estoque/saida/{id}`
- **Histórico de Movimentações**: `http://localhost:4200/estoque/movimentacoes`

### 🎨 Interface e UX
- **Design responsivo** e moderno
- **Feedback visual** em tempo real
- **Validações** de formulário
- **Mensagens de sucesso/erro**
- **Navegação intuitiva** entre módulos

## 🔄 Fluxo de Funcionamento dos Microserviços

### 📍 **1. Registro no Service Discovery**
```
Todos os serviços se registram automaticamente no Eureka:
📍 http://localhost:8080
```

### 🚪 **2. Gateway como Entrada Única**
```
Frontend (4200) → Gateway (8084) → Serviços Específicos
📌 Exemplo: http://localhost:4200 → http://localhost:8084
```

### 🎯 **3. Exemplos de Fluxos Completos**

#### **🔐 Fluxo de Autenticação:**
```
1. Frontend (4200) → POST http://localhost:8084/auth/login/password
2. Gateway (8084) → Descobre Auth-Service via Eureka (8080)
3. Gateway → Encaminha para Auth-Service (8085)
4. Auth-Service → Valida e retorna JWT
5. Resposta → Gateway → Frontend
```

#### **📦 Fluxo de Cadastro de Produto:**
```
1. Frontend → POST http://localhost:8084/cadastros/produtos
2. Gateway → Valida JWT + Descobre Cadastros-Service
3. Gateway → Encaminha para Cadastros-Service (8087)
4. Cadastros-Service → Salva no seu banco H2
5. Resposta → Gateway → Frontend com confirmação
```

#### **📊 Fluxo de Consulta de Estoque:**
```
1. Frontend → GET http://localhost:8084/estoque/1
2. Gateway → Descobre Estoque-Service via Eureka
3. Gateway → Encaminha para Estoque-Service (8088)
4. Estoque-Service → Consulta saldo no seu banco H2
5. Resposta → Gateway → Frontend com dados do estoque
```

### 🏗️ **Arquitetura Hexagonal por Serviço**
```
┌─────────────────────────────────┐
│           ADAPTERS              │
│  ┌─────────┐  ┌─────────────┐   │
│  │ REST    │  │   Database  │   │
│  │Controller│  │  Adapter   │   │
│  └─────────┘  └─────────────┘   │
│         │              │        │
│         └──────┬───────┘        │
│                ▼                │
│           PORTS (Interfaces)    │
│                │                │
│                ▼                │
│           DOMAIN (Core)         │
│         (Business Logic)        │
└─────────────────────────────────┘
```

## 🐳 Execução com Docker

### 1️⃣ **Pré-requisitos**
- Docker
- Docker Compose

### 2️⃣ **Rodar toda a aplicação**
```bash
docker compose up --build
```

### 3️⃣ **Endpoints Principais**

| Componente | URL | Descrição |
|------------|-----|-----------|
| **Frontend** | http://localhost:4200 | Interface do usuário |
| **Gateway** | http://localhost:8084 | Entrada única da API |
| **Eureka Dashboard** | http://localhost:8080 | Monitoramento de serviços |
| **Auth-Service** | http://localhost:8085 | Serviço de autenticação |
| **Cadastros-Service** | http://localhost:8087 | Serviço de cadastros |
| **Estoque-Service** | http://localhost:8088 | Serviço de estoque |

## 📦 Funcionalidades do Sistema

### 🔐 **Autenticação**
- Cadastro e login de usuários
- Geração e validação de tokens JWT
- Proteção de rotas via Gateway

### 📋 **Cadastros**
- Criar, listar, editar e remover produtos
- Criar, listar, editar e remover fornecedores
- Campos: nome, descrição, preço, documento, telefone

### 📊 **Estoque**
- Registrar entradas e saídas
- Consultar saldo por produto
- Visualizar histórico de movimentações
- Alertas de estoque baixo
- Lista completa com status de estoque

## 🎯 Vantagens da Arquitetura

### ✅ **Benefícios dos Microserviços**
- **Escalabilidade independente** por serviço
- **Desenvolvimento paralelo** entre times
- **Resiliência** - falha em um serviço não afeta os outros
- **Tecnologias adequadas** para cada domínio

### ✅ **Benefícios do Frontend Angular**
- **Single Page Application** responsiva
- **Componentização** e reutilização
- **TypeScript** para maior confiabilidade
- **RxJS** para programação reativa

### ✅ **Benefícios do Docker**
- **Ambiente consistente** entre desenvolvimento e produção
- **Isolamento** de dependências
- **Orquestração simplificada** com Docker Compose
- **Deploy reproduzível**

## 🏁 Conclusão

O **StockFlow** apresenta uma solução moderna, escalável e alinhada às práticas da Engenharia de Software. O projeto demonstra domínio completo de:

- **Arquitetura distribuída** com microserviços
- **Comunicação entre serviços** via Service Discovery
- **Frontend moderno** com Angular
- **Containerização** e orquestração
- **Arquitetura hexagonal** para baixo acoplamento

**🚀 Sistema pronto para produção** com capacidade de escalar horizontalmente e adaptar-se a novas necessidades de negócio.