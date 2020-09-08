'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class File extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('file').notNullable()
      table.string('name').notNullable()
      table.string('type', 60)
      table.string('subtype', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = File
