import React from 'react'
import './App.css'
import { TodoList } from './components/TodoList'
import { AddTodo } from './components/AddTodo'
import { store } from './store'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <AddTodo />
        <TodoList />
      </div>
    </Provider>
  )
}

export default App;
