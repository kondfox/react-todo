import { TODO_ACTION } from '../constants'

const defaultState = {
  todos: [],
}

export const todos = (state = defaultState, action) => {
  switch(action.type) {
    case (TODO_ACTION.NEW_TODO):
      const newTodo = action.payload
      newTodo.id = state.todos.length
      return {
        ...state,
        todos: [...state.todos, newTodo],
      }
    case (TODO_ACTION.TOGGLE_DONE):
      return {
        ...state,
        todos: [...state.todos].map(t =>
          t.id !== action.payload ? t : {...t, isDone: !t.isDone})
      }
    default:
      return state
  }
}