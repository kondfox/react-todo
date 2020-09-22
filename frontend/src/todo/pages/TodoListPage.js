import React, { useEffect, useState } from 'react'
import './TodoListPage.css'
import { TodoList } from '../components/TodoList'
import { AddTodo } from '../components/AddTodo'
import { todoService } from '../services'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    console.log('useEffect hook')
    todoService.fetchTodos().then(fetchedTodos => setTodos(fetchedTodos.todos))
  }, [])

  const newTodo = async todo => {
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

export default App
