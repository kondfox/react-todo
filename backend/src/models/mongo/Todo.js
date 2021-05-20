import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { PRIORITY } from '../../constants'

const todoSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4(),
  },
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH],
    default: PRIORITY.MEDIUM,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: String,
  },
})

const TodoModel = mongoose.model('Todo', todoSchema)

export const Todo = {
  defaults: {
    isDone: false,
    priority: PRIORITY.LOW,
  },
  async findTodos(params) {
    if (params['isDone']) params['isDone'] = params['isDone'] == 1
    const todos = await TodoModel.find(params)
    return todos
  },

  async save(todoDTO) {
    const savedTodo = await TodoModel.create(todoDTO)
    return savedTodo
  },
}
