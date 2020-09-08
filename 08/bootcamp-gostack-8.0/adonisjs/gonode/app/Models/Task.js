'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
  }

  // Relacionamento de projetos com a tabela de projeto
  project () {
    return this.belongsTo('App/Models/Project')
  }

  // Relacionamento de projetos com a tabela de usuario
  user () {
    return this.belongsTo('App/Models/User')
  }

  // Relacionamento de projetos com a tabela de arquivo
  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
