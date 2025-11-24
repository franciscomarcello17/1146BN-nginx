# 🏭 StockFlow  
### Sistema Distribuído de Gerenciamento de Estoque  
Trabalho Final — Tópicos Avançados em Programação  
Curso de Engenharia de Software — Univille

---

## 👨‍🎓 Autores
- **Francisco Marcello Ribeiro Lima**  
- **Deivid da Silva Matos**  
- **Artur de Ávila**

---

## 📌 Sobre o Projeto

O **StockFlow** é um sistema distribuído de **gerenciamento de estoque**, desenvolvido como Trabalho Final da disciplina *Tópicos Avançados em Programação*.  
A aplicação utiliza uma arquitetura moderna com:

- **Microserviços**
- **Spring Cloud (Eureka, Gateway)**
- **Angular + Nginx**
- **Docker e Docker Compose**
- **Arquitetura Hexagonal (Ports & Adapters)**

O objetivo é demonstrar, de maneira prática, como projetar, organizar e orquestrar um ecossistema de serviços escaláveis e independentes.

---

# 🧩 Arquitetura

A aplicação segue o modelo **Hexagonal**, onde cada microserviço possui:

- **Domínio isolado**
- **Ports** (interfaces)
- **Adapters** (controllers, repos, DTOs)
- Regras de negócio desacopladas da infraestrutura

### 🌀 Microserviços:

| Serviço | Responsabilidade |
|--------|------------------|
| **SERVICE-DISCOVERY (Eureka)** | Registro e descoberta dos microserviços |
| **GATEWAY-SERVICE** | Roteamento, segurança e entrada única da API |
| **AUTH-SERVICE** | Autenticação e geração de JWT |
| **CADASTROS-SERVICE** | CRUD de produtos e fornecedores |
| **ESTOQUE-SERVICE** | Entradas, saídas e saldo de estoque |

Cada serviço possui seu próprio **banco H2**, mantendo autonomia total.

### 🖥️ Frontend
- Desenvolvido em **Angular**
- Buildado com **Node.js 20**
- Servido por **Nginx**
- Consome a API exclusivamente via Gateway

---

# 🐳 Execução com Docker

## 1️⃣ Pré-requisitos
- Docker  
- Docker Compose  

## 2️⃣ Rodar toda a aplicação

```bash
docker compose up --build
````

## 3️⃣ Endpoints Principais

| Componente           | URL                                            |
| -------------------- | ---------------------------------------------- |
| **Frontend**         | [http://localhost:4200](http://localhost:4200) |
| **Gateway**          | [http://localhost:8084](http://localhost:8084) |
| **Eureka Dashboard** | [http://localhost:8080](http://localhost:8080) |

---

# 📦 Funcionalidades

### Cadastros

* Criar, listar e remover produtos
* Criar, listar e remover fornecedores

### Estoque

* Registrar entrada
* Registrar saída
* Consultar saldo por produto
* Ver movimentações

### Autenticação

* Cadastro e login
* Token JWT
* Validação via Gateway

---

# 🏁 Conclusão

O **StockFlow** apresenta uma solução moderna, escalável e alinhada às práticas da Engenharia de Software.
O projeto demonstra domínio de arquitetura distribuída, integração de tecnologias e organização modular baseada em microserviços.
