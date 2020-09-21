import { todoService } from '../services'

export const todoController = {
  async get(req, res) {
    todoService
      .findTodos(req.query)
      .then(todos => res.status(200).send({ todos }))
      .catch(err =>
        res.status(err.status || 500).send(err.message || 'Unkown error')
      )
  },

  async post(req, res) {
    todoService
      .saveTodo(req.body)
      .then(savedTodo => res.status(201).send(savedTodo))
      .catch(err =>
        res.status(err.status || 500).send(err.message || 'Unkown error')
      )
  },
}
