import { PRIORITY } from '../constants'

export const todoValidator = {
  id: {
    validate: id => typeof id === 'number' && id >= 0,
    required: false,
    errorMessage: 'Invalid id',
  },
  title: {
    validate: title => typeof title === 'string' && title.length > 0,
    required: true,
    errorMessage: 'Title must be at least 1 characters',
  },
  isDone: {
    validate: isDone =>
      typeof isDone === 'boolean' || ['true', 'false'].includes(isDone),
    required: false,
    errorMessage: 'isDone must be true or false',
  },
  priority: {
    validate: priority => Object.values(PRIORITY).includes(priority),
    required: false,
    errorMessage: `priority must be one of the followings: ${Object.values(
      PRIORITY
    )}`,
  },
}

export const todoFilterValidator = {
  isDone: {
    ...todoValidator.isDone,
    validate: isDone => isDone == 0 || isDone == 1,
    errorMessage: 'isDone must be 0 or 1',
  },
  priority: todoValidator.priority,
}
