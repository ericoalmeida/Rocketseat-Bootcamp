'use strict'

const sentry = use('Sentry')
const Env = use('Env')
const Youch = use('youch')
const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  // handle: metodo para retornar o erro para o usuário final
  async handle (error, { request, response }) {
    // Se for um erro de validacao dos campos  da requisicao
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    // Se estiver em ambiente de desenvolvimento
    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }

    // Se estiver em ambiente de produção
    return response.status(error.status)
  }

  async report (error, { request }) {
    sentry.captureException(error)
  }
}

module.exports = ExceptionHandler
