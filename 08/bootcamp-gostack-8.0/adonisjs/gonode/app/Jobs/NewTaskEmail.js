'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskEmail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewTaskEmail-job'
  }

  async handle ({ email, username, title, file }) {
    console.log(`Job: ${NewTaskEmail.key}`)

    await Mail.send(
      ['emails.new_task'],
      { username, title, hasAttachment: !!file },
      message => {
        message
          .to(email)
          .from('ericoalmeida.suporte@gmail.com', 'Erico Almeida | ERG Software')
          .subject('Nova tarefa para voce')

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      }

    )
  }
}

module.exports = NewTaskEmail
