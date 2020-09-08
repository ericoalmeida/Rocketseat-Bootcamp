'use strict'
// Implementacao de validação dos campos enviados nas rotas

const Antl = use('Antl')

class User {
  // Metodo para dizer para o adonis validar todos os campos.
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
