# Obras API 🏗️

Este projeto é uma aplicação web desenvolvida como parte de um teste técnico. Seu objetivo é permitir o gerenciamento de obras e suas respectivas etapas de forma organizada, oferecendo operações CRUD e acompanhamento de progresso.

## 🛠 Tecnologias Utilizadas

**Backend:**
- Java 17
- Spring Boot
- Spring Data JPA + Hibernate
- MySQL
- Maven

## 📚 Funcionalidades

### 🔹 Obras
- Criar, listar, atualizar e deletar obras.
- Cada obra possui:
  - `id` (auto-incremento)
  - `nome`
  - `descrição`
  - `data de início`
  - `data de previsão de fim`

### 🔹 Etapas
- Criar, listar, atualizar e deletar etapas vinculadas a uma obra.
- Cada etapa possui:
  - `id`
  - `obraId` (relacionamento com obra)
  - `nome`
  - `responsável`
  - `status` (`PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA`)
  - `data de início`
  - `data de fim`

### 🔹 Progresso da Obra
- Endpoint específico para calcular o progresso da obra com base nas etapas concluídas.
- Exemplo: `3 de 5 etapas concluídas (60%)`.

## 📦 Como Rodar o Projeto Localmente

### Pré-requisitos
- Java 17 instalado
- MySQL Server rodando
- Maven instalado

### Configuração do Banco de Dados

# 1. Crie o banco:

  /* CREATE DATABASE obra_db;
   Atualize o arquivo application.properties com suas credenciais:

  spring.datasource.url=jdbc:mysql://localhost:3306/obra_db
  spring.datasource.username=root
  spring.datasource.password=senha_do_seu_mysql */



# 2. No terminal, dentro da pasta obras-api, execute:

          mvn spring-boot:run
 


# 3. 🔗 Endpoints da API:
# Método	      Endpoint	                    Descrição:

GET	        /api/obras	                  Listar todas as obras
POST	      /api/obras	                  Criar uma nova obra
PUT	        /api/obras/{id}	              Atualizar uma obra existente
DELETE	    /api/obras/{id}	              Deletar uma obra
GET	        /api/obras/{id}/progresso	    Ver progresso da obra
GET	        /api/etapas	                  Listar todas as etapas
POST	      /api/etapas	                  Criar nova etapa para uma obra
PUT	        /api/etapas/{id}	            Atualizar etapa existente
DELETE	    /api/etapas/{id}	            Deletar uma etapa

# 4. 🎥 Vídeo de Demonstração
 Link será adicionado aqui 



📌 Status do Projeto:

✅ Backend finalizado com sucesso.
🕒 Próxima etapa: desenvolvimento do frontend com React + Redux Toolkit.