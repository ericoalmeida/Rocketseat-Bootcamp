# O que é NodeJS

- Javascript no back-end
  - Nao lidamos com eventos do usuário final
  - Rotas e integracoes
- NodeJS é uma plataforma para desenvolvimento back-end
- Construida em cima da V8
- Compativel a PHP/Ruby/Python/Go

# O Que é NPM/Yarn?

- Instalar biblioteca de terceiros
- Fornecer bibliotecas
- Por que utilizaremos o Yarn?
  - Está evoluindo mais rápido

# Caracteristicas do NodeJS

- Arquiterua Event-loop
  - Baseada em eventos
  - Call Stack -> Pilha de eventos
- Node é single thread
  - C++ por tras com libuv
  - Background threads
- non-blocking I/O

# HTTP codes

- 1xx: Informacao
- 2xx: Sucesso
  - 200: Sucesso
  - 201: Criação
- 3xx: Redirecionamento
  - 301: Movido Permanentemente
  - 302: Movido
- 4xx: Erros do cliente
  - 400: Má requisição
  - 401: Não autorizado
  - 404: Não encontrado
- 5xx: Erros de servidor
  - 500: Erro interno no servidor
