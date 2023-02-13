// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax, virtual } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const messageSchema = {
  $id: 'Message',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'text'],
  properties: {
    _id: {
      type: 'string'
    },
    text: {
      type: 'string'
    },
    createdAt: {
      type: 'number'
    },
    userId: {
      type: 'string'
    },
    user: {
      type: 'string'
    }
  }
}
export const messageValidator = getValidator(messageSchema, dataValidator)
export const messageResolver = resolve({
  user: virtual(async (message, context) => {
    // Associate the user that sent the message
    return context.app.service('users').get(message.userId)
  })
})

export const messageExternalResolver = resolve({})

// Schema for creating new data
export const messageDataSchema = {
  $id: 'MessageData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    text: {
      type: 'string'
    }
  }
}
export const messageDataValidator = getValidator(messageDataSchema, dataValidator)
export const messageDataResolver = resolve({
  userId: async (_value, _message, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user._id
  },
  createdAt: async () => {
    return Date.now()
  }
})

// Schema for updating existing data
export const messagePatchSchema = {
  $id: 'MessagePatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...messageSchema.properties
  }
}
export const messagePatchValidator = getValidator(messagePatchSchema, dataValidator)
export const messagePatchResolver = resolve({})

// Schema for allowed query properties
export const messageQuerySchema = {
  $id: 'MessageQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(messageSchema.properties)
  }
}
export const messageQueryValidator = getValidator(messageQuerySchema, queryValidator)
export const messageQueryResolver = resolve({})
