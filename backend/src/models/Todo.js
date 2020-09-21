import { db } from '../data/connection'
import { PRIORITY } from '../constants'

const tableName = 'todos'

export const Todo = {
  defaults: {
    isDone: false,
    priority: PRIORITY.LOW,
  },

  async findTodos(params) {
    let query = `SELECT * FROM ${tableName}`
    if (Object.keys(params).length) {
      query +=
        ' WHERE ' +
        Object.entries(params)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' AND ')
    }
    console.log('query', query)
    const { results } = await db.query(query)
    return results
  },

  async save(todo) {
    const query = `INSERT INTO ${tableName} SET ?`
    const { results } = await db.query(query, todo)
    return results
  },
}
