import React, { useState } from 'react'
import { Todo } from './Todo'

export const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      title: 'Buy Milk',
      isDone: true,
      priority: 'low',
    },
    {
      title: 'Walk dog',
      isDone: false,
      priority: 'high',
    },
  ])

  return (
    <>
      <h1>My Todos</h1>
      <ul id="todo">
        {
          todos.map(todo => <Todo todo={todo} />)
        }
      </ul>
    </>
  )
}