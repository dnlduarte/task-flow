# Taskboard

Aplicação de gerenciamento de tarefas (to-do) construída como projeto de estudo, com backend em **Spring Boot** e frontend em **React + TypeScript**. O objetivo é praticar a construção de uma API REST com CRUD completo e conectá-la a uma interface web.

> 🚧 Projeto em desenvolvimento (work in progress). Algumas partes ainda estão sendo construídas e refinadas.

## Sobre o projeto

O Taskboard permite criar, listar, editar e excluir tarefas. Cada tarefa tem um título, uma descrição e um status de concluída ou não. A ideia é ter uma base sólida de CRUD para evoluir com mais funcionalidades no futuro (filtros, prioridades, autenticação, etc).

O projeto está organizado em dois módulos independentes dentro do mesmo repositório:

```
taskboard/
├── backend/    → API REST em Spring Boot (Java)
└── frontend/   → Interface web em React + TypeScript (Vite)
```

## Tecnologias

**Backend**
- Java 21
- Spring Boot 3.2
- Spring Web (API REST)
- Spring Data JPA (persistência)
- H2 Database (banco em memória, para desenvolvimento)
- Maven

**Frontend**
- React
- TypeScript
- Vite

## API

A API expõe os endpoints de CRUD na rota base `/api/tasks`:

| Método | Rota              | Descrição                  |
|--------|-------------------|----------------------------|
| GET    | `/api/tasks`      | Lista todas as tarefas     |
| POST   | `/api/tasks`      | Cria uma nova tarefa       |
| PUT    | `/api/tasks/{id}` | Atualiza uma tarefa existente |
| DELETE | `/api/tasks/{id}` | Remove uma tarefa          |

Exemplo de corpo (JSON) para criar ou atualizar uma tarefa:

```json
{
  "title": "Estudar Spring Boot",
  "description": "Praticar a construção de uma API REST",
  "done": false
}
```

## Como rodar

Pré-requisitos: **Java 21**, **Maven** e **Node.js** instalados.

### Backend

```bash
cd backend
mvn spring-boot:run
```

A API sobe em `http://localhost:8080`.

O console do banco H2 fica disponível em `http://localhost:8080/h2-console` (útil para inspecionar os dados durante o desenvolvimento).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A interface sobe em `http://localhost:5173` e consome a API do backend.

> O backend libera requisições do frontend via CORS para a porta `5173`. Os dois precisam estar rodando ao mesmo tempo para a aplicação funcionar.

## Próximos passos

- [ ] Finalizar a integração do PUT e DELETE no frontend
- [ ] Melhorar o layout do dashboard
- [ ] Adicionar filtros por status
- [ ] Configurar um banco de dados persistente
- [ ] Escrever testes

## Autor

Desenvolvido por **dnlduarte** como projeto de estudo de Spring Boot e React.
