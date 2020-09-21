import { Todo } from '../models'
import { validate, todoValidator, todoFilterValidator } from '../validators'

export const todoService = {
  async findTodos(params) {
    const validatedParams = await validate(params, todoFilterValidator)
    const todos = await Todo.findTodos(validatedParams)
    return todos
  },

  async saveTodo(todo) {
    const validatedTodo = await validate(todo, todoValidator)
    validatedTodo['isDone'] = validatedTodo.isDone || Todo.defaults.isDone
    validatedTodo['priority'] = validatedTodo.priority || Todo.defaults.priority

    const dbResults = await Todo.save(validatedTodo)

    return {
      id: dbResults.insertId,
      ...validatedTodo,
    }
  },
}
