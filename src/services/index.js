import { message } from './messages/messages.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(message)
  app.configure(user)

  // all registered services will automatically become event listeners
  app.service('users').on('created', (data) => {
    console.log('New message created', data)
  })

  // All services will be registered here
}
