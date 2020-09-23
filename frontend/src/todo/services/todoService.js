import { backend } from '../../settings'

export const todoService = {
  async fetchTodos(params) {
    const queryParams = this.convertToQueryParams(params)
    const response = await fetch(`${backend.url}/todos${queryParams}`)
    const todos = await response.json()
    return todos
  },

  async addTodo(todo) {
    const response = await fetch(`${backend.url}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    const savedTodo = await response.json()
    return savedTodo
  },

  convertToQueryParams(params) {
    if (!params || Object.keys(params).length === 0) {
      return ''
    }
    return (
      '?' +
      Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    )
  },
}
