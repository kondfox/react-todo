import React from 'react'
import './App.css'
import { TodoList } from './components/TodoList'
import { AddTodo } from './components/AddTodo'
import { useTodo } from './useTodo'

function App() {
  const [newTodo, todos, handleDone] = useTodo();

  return (
    <div className="App">
      <AddTodo newTodo={newTodo} />
      <TodoList todos={todos} handleDone={handleDone} />
    </div>
  )
}

export default App;
