# Como funciona uma API Rest

- Fluxo da requisição e resposta:

  - Requisicao feita por um cliente
  - Resposta retornada atraves de uma estrutura de dados
  - Cliente recebe resposta e processa resultado

- As Rotas utilizam metodos HTTP:

  - GET, POST, PUT, DELETE
  - GET => http://minhaapi.com/users
  - POST => http://minhaapi.com/users
  - PUT => http://minhaapi.com/users/1
  - DELETE => http://minhaapi.com/users/1

  # Beneficios

- Multiplos CLientes(front-end), mesmo back-end
- Protocolo de utilizacao padronizado

  - Mesma estrutura pra web / mobile / API Publica
  - Comunicacao com servicos externos (JSON - JavaScript Object Notation)

  {
  "user": "erico almeida",
  "email": "ericoalmeida@gmail.com"
  }
