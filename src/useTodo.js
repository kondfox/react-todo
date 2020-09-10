import { useState } from 'react'

export const useTodo = () => {
  const [todos, setTodos] = useState([])

  const newTodo = (todo) => {
    setTodos([...todos, {...todo, id: todos.length}])
  }

  const handleDone = (id) => {
    const todo = todos.filter(t => t.id === id)[0]
    todo.isDone = !todo.isDone
    setTodos([...todos.map(t => t.id !== id ? t : todo)])
  }

  return [newTodo, todos, handleDone]
}