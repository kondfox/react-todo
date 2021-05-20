import React, { useEffect, useState } from 'react'
import './TodoListPage.css'
import { TodoList } from '../components/TodoList'
import { AddTodo } from '../components/AddTodo'
import { todoService } from '../services'

export const TodoListPage = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    todoService.fetchTodos().then(fetchedTodos => setTodos(fetchedTodos.todos))
  }, [])

  const newTodo = async todo => {
    console.log('newTodo called with:', todo)
    const savedTodo = await todoService.addTodo(todo)
    setTodos([...todos, savedTodo])
  }

  const handleDone = id => {
    const todo = todos.reduce((target, t) => (t.id === id ? t : target))
    todo.isDone = !todo.isDone
    setTodos([...todos.map(t => (t.id === id ? todo : t))])
  }

  return (
    <div className="App">
      <AddTodo newTodo={newTodo} />
      <TodoList todos={todos} handleDone={handleDone} />
    </div>
  )
}
