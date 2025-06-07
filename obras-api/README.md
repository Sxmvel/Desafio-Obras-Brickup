# 🏗️ Obras API — Sistema de Gerenciamento de Obras

Este projeto é uma aplicação web desenvolvida como parte de um teste técnico. Seu objetivo é permitir o **gerenciamento de obras e suas etapas**, com suporte a operações **CRUD completas** e **acompanhamento do progresso** de execução.

---

## 🛠 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot
- Spring Data JPA (Hibernate)
- MySQL
- Maven

---

## 📚 Funcionalidades

### 🔹 Obras
- Criar, listar, editar e remover obras.
- Campos:
  - `id` (auto-incremento)
  - `nome`
  - `descrição`
  - `data de início`
  - `data de previsão de fim`

### 🔹 Etapas da Obra
- Criar, listar, editar e excluir etapas associadas a uma obra.
- Campos:
  - `id`
  - `obraId` (relacionamento)
  - `nome`
  - `responsável`
  - `status` (`PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA`)
  - `data de início`
  - `data de fim`

### 🔹 Progresso da Obra
- Cálculo automático do progresso da obra com base nas etapas concluídas.
- Exemplo: `3 de 5 etapas concluídas (60%)`.

---

## ⚙️ Como Executar Localmente

### ✅ Pré-requisitos

- Java 17 ou superior
- Maven instalado
- MySQL Server rodando

### 1. 📦 Clonar o projeto

git clone https://github.com/Sxmvel/Desafio-Obras-Brickup.git

### 2. 🛠 Criar o banco de dados

No MySQL:

CREATE DATABASE obra_db;
USE obra_db

### 3. ⚙️ Configurar o application.properties

No arquivo src/main/resources/application.properties`, atualize com suas credenciais:

properties
spring.datasource.url=jdbc:mysql://localhost:3306/obra_db
spring.datasource.username=root
spring.datasource.password= sua_senha ( troca sua senha aqui )!!
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4. ▶️ Rodar o projeto

mvn spring-boot:run

A API estará disponível em: [http://localhost:8080](http://localhost:8080)

---

















## 🔗 Endpoints Disponíveis
-------------------------------------------------------------------------------------
| Método | Endpoint                         | Descrição                             |
|--------|----------------------------------|---------------------------------------|
| GET    | `/api/obras`                     | Listar todas as obras                 |
| POST   | `/api/obras`                     | Criar nova obra                       |
| PUT    | `/api/obras/{id}`                | Atualizar obra por ID                 |
| DELETE | `/api/obras/{id}`                | Remover obra por ID                   |
| GET    | `/api/obras/{id}/progresso`      | Ver progresso da obra                 |
| GET    | `/api/etapas`                    | Listar todas as etapas                |
| POST   | `/api/etapas`                    | Criar nova etapa                      |
| PUT    | `/api/etapas/{id}`               | Atualizar etapa                       |
| DELETE | `/api/etapas/{id}`               | Deletar etapa                         |
-------------------------------------------------------------------------------------

## 🎥 Vídeo de Demonstração

> *(Em breve será adicionado um link demonstrando o sistema em funcionamento.)*

---

## 📌 Status do Projeto

- ✅ Backend finalizado com sucesso.
- 🧠 Totalmente funcional com regras de negócio e DTOs
- 🕒 Frontend com React + Redux Toolkit **em desenvolvimento**

---

## 👨‍💻 Autor

Desenvolvido por Samuel Resende:
  
https://www.linkedin.com/in/samuel-res/ 
https://github.com/Sxmvel
