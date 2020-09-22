import React from 'react'
import { Todo } from './Todo'

export const TodoList = ({ todos = [], handleDone }) => {
  console.log('todos', todos)
  return (
    <>
      <h1>My Todos</h1>
      <ul id="todo">
        {todos.length > 0 &&
          todos.map(todo => (
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
