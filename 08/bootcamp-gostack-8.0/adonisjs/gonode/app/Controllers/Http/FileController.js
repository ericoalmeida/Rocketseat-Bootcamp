'use strict'

const FileModel = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async show ({ params, response }) {
    // Localiza o arquivo atraves do ID do mesmo
    const file = await FileModel.findOrFail(params.id)

    // Retorna o arquivo envontrado
    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
      // Verifica se tem um arquivo presente na requisicao
      if (!request.file('file')) return

      // Pega o arquivo enviado na requisiçao
      const upload = request.file('file', { size: '2mb' })

      // Dá um novo nome para o arquivo
      const fileName = `${Date.now()}.${upload.subtype}`

      // Move o arquivo para a pasta temporaria de arquivos
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      // Captura o erro do upload
      if (!upload.moved()) {
        throw upload.error()
      }

      // Grava referencia do arquivo no banco de dados
      const file = await FileModel.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo deu errado durante o upload do arquivo' } })
    }
  }
}

module.exports = FileController
