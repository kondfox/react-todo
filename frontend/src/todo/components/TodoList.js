import React from 'react'
import { Todo } from './Todo'

export const TodoList = ({ todos = [], handleDone }) => {
  return (
    <>
      <h1>My Todos</h1>
      <ul id="todo">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            handleDone={() => handleDone(todo.id)}
          />
        ))}
      </ul>
    </>
  )
}
