<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://i.ibb.co/SsFMvqh/logo.png" width="150px" />
</h1>

<h3 align="center">
  Certificação Rocketseat: Gympoint.
</h3>

## 🚀 Considerações iniciais.

Optei por desenvolver toda a parte do código que não pertence a liguagem em português, para forçar a pensar em cada variável, e como cada trexo do código se comportaria/funcionaria. para não me sentir que estava apenas copiando o código das aulas. pegar com mais facilidade o funcinamento das tecnologias envolvidas no **Bootcamp**.

A versão mobile do projeto Gympoint foi desenvolvida apenas para andróid, pois, era a única plataforma disponível no momento, para realizar testes.

## Ambiente
- S.O: Debian GNU/Linux 10 (Buster)
- Node: v10.16.3
- npm: 6.9.0
- npx: 6.9.0
- yarn: 1.21.1


## Servidor da aplicação (Back-end)
#### Configurando o servidor da aplicação

**ATENÇÃO!** </br>
_Para os passos a seguir, é necessário o ambiente de de desenvolvimento ja estar configurado. com NVM, NODEJS, YARN instalados._

- Crie/Inicie containers utilizando docker para os seguintes bancos: **MongoDB, Redis, PostgreSQL**.
- Crie um banco de dados postgreSQL com o nome **gympoint**
- Crie um arquivo **.env** na raíz do projeto com as variáveis descritas no arquivo **.env.exemple**
- Preencha as variáveis do arquivo **.env** que acabou de criar.
- Execute o comando ```yarn install``` para baixar/instalar as dependências do projeto.
- Execute o comando ```yarn sequelize db:migrate``` para sincronizar o banco de dados.
- Execute o comando ```yarn sequelize db:seed:all``` para sincronizar os valores padrão do banco de dados.
- Execute o script ```yarn dev``` para iniciar o servidor.
- Execute o script ```yarn dev:jobs``` para iniciar o servidor de trabalhos em background.



_Conteúdo de um arquivo **.env.exemple** de amostra:_
```
# App
APP_URL=
APP_PORT=
NODE_ENV=

# Autenticação
APP_SEGREDO=

# Tratamento de Erros
# Sentry
SENTRY_DNS=

# Banco de Dados
# PostgresSQL
DB_DIALECT=
DB_HOST=
DB_USER=
DB_PASS=
DB_DATABASE=

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Email
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
```


## Aplicação Web (Front-end)
#### Iniciando a aplicação WEB.

- Caso necessário, substitua ```baseURL://localhost:3333``` para ```baseURL://Ip_Do-Servidor:3333``` com o IP da do servidor dentro de ```frontend/src/servicos/api.js```. comforme exemplo:

- Deve ser a mesma porta utilizada na configuracao do back-end da aplicação.

- Execute o comando ```yarn install``` para baixar/instalar as dependências do projeto.
- Execute o script ```yarn start``` para iniciar a aplicação.

## Aplicação Mobile (Android)
#### Iniciando a aplicação Mobile.

- Crie um arquivo **.env** na raíz do projeto com as variáveis descritas no arquivo **.env.exemple**
- Preencha as variáveis do arquivo **.env** que acabou de criar.
- Execute o comando ```yarn install``` para baixar/instalar as dependências do projeto.
- Execute o script ```yarn react-native run-android``` para iniciar a aplicação.
- Caso  o app nao execute direto com o comando anterior, execute: ```yarn react-native start --reset-cache``` para iniciar a aplicação.

_Conteúdo de um arquivo **.env.exemple** de amostra:_
```
# App
APP_IP_SERVIDOR=
APP_PORTA=

```
