import React from 'react'
import './TodoListPage.css'
import { TodoList } from '../components/TodoList'
import { AddTodo } from '../components/AddTodo'
import { store } from '../../db/store'
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

export default App
