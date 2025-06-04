# FinnControl - API

API para um sistema de controle financeiro.

## Configuração

1. Crie um arquivo chamado `.env` na raiz do projeto.
2. Copie o conteúdo de [`.env.example`](./.env.example) para o arquivo `.env`.
3. Preencha os campos conforme suas configurações locais.

**Bom desenvolvimento! 🚀**

---

## Rotas

Rotas disponíveis para consumo da API pelo frontend.

### Autenticação

| Rota             |  Método  | Descrição                                                     |
| ---------------- | :------: | :------------------------------------------------------------ |
| `/auth/register` | **POST** | Cria um novo usuário.                                         |
| `/auth/login`    | **POST** | Realiza o login e gera um token de autenticação.              |
| `/auth/me`       | **GET**  | Retorna informações do usuário autenticado com base no token. |

---

### Transações

> **Todas as rotas abaixo requerem token de autenticação.**

| Rota                       |   Método   | Descrição                                       |
| -------------------------- | :--------: | :---------------------------------------------- |
| `/transactions/list`       |  **GET**   | Retorna todos os lançamentos do usuário logado. |
| `/transactions/create`     |  **POST**  | Cria um novo lançamento.                        |
| `/transactions/:id`        |  **GET**   | Obtém o lançamento pelo identificador único.    |
| `/transactions/:id/edit`   |  **PUT**   | Atualiza os dados do lançamento informado.      |
| `/transactions/:id/delete` | **DELETE** | Remove um lançamento.                           |

---

### Formas de Pagamento

> **Todas as rotas abaixo requerem token de autenticação.**

| Rota                  |   Método   | Descrição                                               |
| --------------------- | :--------: | :------------------------------------------------------ |
| `/methods/list`       |  **GET**   | Retorna todas as formas de pagamento do usuário logado. |
| `/methods/create`     |  **POST**  | Cria uma nova forma de pagamento.                       |
| `/methods/:id`        |  **GET**   | Obtém a forma de pagamento pelo identificador.          |
| `/methods/:id/edit`   |  **PUT**   | Atualiza os dados da forma de pagamento informada.      |
| `/methods/:id/delete` | **DELETE** | Remove uma forma de pagamento.                          |

---

### Categorias

> **Todas as rotas abaixo requerem token de autenticação.**

| Rota                     |   Método   | Descrição                                              |
| ------------------------ | :--------: | :----------------------------------------------------- |
| `/categories/list`       |  **GET**   | Retorna todas as categorias de lançamentos do usuário. |
| `/categories/create`     |  **POST**  | Cria uma nova categoria.                               |
| `/categories/:id`        |  **GET**   | Obtém a categoria pelo identificador.                  |
| `/categories/:id/edit`   |  **PUT**   | Atualiza os dados da categoria informada.              |
| `/categories/:id/delete` | **DELETE** | Remove uma categoria.                                  |
