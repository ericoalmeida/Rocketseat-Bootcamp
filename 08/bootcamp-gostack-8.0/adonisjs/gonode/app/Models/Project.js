'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  // Relacionamento de projetos com a tabela de usuario
  user () {
    return this.belongsTo('App/Models/User')
  }

  // Relacionamento de projetos com a tabela de tarefas
  tasks () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
