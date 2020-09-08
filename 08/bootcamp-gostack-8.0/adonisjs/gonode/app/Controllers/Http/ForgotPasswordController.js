'use strict'

const moment = require('moment')
const crypto = require('crypto')
const UserModel = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ response, request }) {
    try {
      const email = request.input('email')

      // Localiza o usuario atraves do email
      const user = await UserModel.findByOrFail('email', email)

      // Gera um token para ser utilizado no reset de senha
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      // Salva o token do usuario
      await user.save()

      // Envia um email com o token e o link de para reset de senha
      await Mail.send(
        ['emails.forgot_password'], // Template para o envio de email
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` }, // Valores para as variáveis utilizadas
        message => {
          message
            .to(user.email) // Substitui os dados da mensagem a ser enviada
            .from('ericoalmeidadev@gmail.com', 'Erico | ERG Software')
            .subject('Recuperacao de senha')
        }
      )
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo não deu certo, esse e-mail existe?' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()

      const user = await UserModel.findByOrFail('token', token)

      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'Seu token ja expirou!' } })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo deu erado ao resetar sua senha' } })
    }
  }
}

module.exports = ForgotPasswordController
