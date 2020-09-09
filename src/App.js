import React, { useState } from 'react'
import './App.css'
import { TodoList } from './components/TodoList'
import { AddTodo } from './components/AddTodo'

function App() {
  const [todos, setTodos] = useState([])

  const newTodo = (todo) => {
    setTodos([...todos, {...todo, id: todos.length}])
  }

  const handleDone = (id) => {
    const todo = todos.filter(t => t.id == id)[0]
    todo.isDone = !todo.isDone
    setTodos([...todos.map(t => t.id != id ? t : todo)])
  }

  return (
    <div className="App">
      <AddTodo newTodo={newTodo} />
      <TodoList todos={todos} handleDone={handleDone} />
    </div>
  )
}

export default App;
