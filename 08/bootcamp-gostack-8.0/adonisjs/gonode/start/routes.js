'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { online: true }
})

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('forgotpassword', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('forgotpassword', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[
      ['projects.store'],
      ['Project']
    ]]))

  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[
      ['projects.tasks.store'],
      ['Task']
    ]]))
}).middleware(['auth'])
