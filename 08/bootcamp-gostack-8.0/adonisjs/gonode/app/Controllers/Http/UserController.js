'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    // Pega o array de endereços dentro da requisição
    const addresses = request.input('addresses')

    // declarando a transaction
    const trx = Database.beginTransaction()

    // passe a transaction como ultimo parametro em todos os metodos
    const user = await User.create(data, trx)

    // Grava os dados do array de enderecos no banco de dados
    await user.addresses().createMany(addresses, trx)

    // Se nao ocorreu nenhum erro, salva definitivamente os dados no banco
    trx.commit()

    return user
  }
}

module.exports = UserController
