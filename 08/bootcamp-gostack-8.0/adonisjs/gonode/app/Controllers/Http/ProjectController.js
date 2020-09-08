'use strict'

const ProjectModel = use('App/Models/Project')

class ProjectController {
  async index ({ request }) {
    const { page } = request.get()

    // Para implementar a paginacao, troque o .fetch() por .paginate()
    const projects = await ProjectModel.query().with('user').paginate(page)

    return projects
  }

  async store ({ request, auth }) {
    // Pegando os campos que preciso da requisição.
    const data = request.only(['title', 'description'])

    // Criando novo projeto no banco de dados
    const project = await ProjectModel.create({ ...data, user_id: auth.user.id })

    // Retornando o projeto criado
    return project
  }

  async show ({ params }) {
    // Localiza o projeto atraves do id
    const project = await ProjectModel.findOrFail(params.id)

    // Carrega informacoes do relacionamento com usuários
    await project.load('user')

    // Carrega informacoes do relacionamentos com tarefas
    await project.load('tasks')

    return project
  }

  async update ({ params, request }) {
    // Pega os campos da requisicao
    const data = request.only(['title', 'description'])

    // Localiza o projeto atraves do ID
    const project = await ProjectModel.findOrFail(params.id)

    // faz o merge com os novos dados vindo da requisicao
    project.merge(data)

    // Salva as alteracoes no banco de dados
    await project.save()

    // Retorna os dados do projeto atualizado
    return project
  }

  async destroy ({ params }) {
    // Localiza o projeto atraves do ID
    const project = await ProjectModel.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
