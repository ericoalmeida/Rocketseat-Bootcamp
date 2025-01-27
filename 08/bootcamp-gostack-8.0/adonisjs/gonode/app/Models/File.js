'use strict'

const Model = use('Model')
const Env = use('Env')

class File extends Model {
  // Criando campo virtual para retornar a url da imagem
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
