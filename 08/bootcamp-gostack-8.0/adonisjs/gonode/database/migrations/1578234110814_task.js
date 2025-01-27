'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Task extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()

      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.string('title').notNullable()
      table.text('description').notNullable()
      table.date('due_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = Task
