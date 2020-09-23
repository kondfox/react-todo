import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { TodoListPage } from './todo/pages'

ReactDOM.render(
  <React.StrictMode>
    <TodoListPage />
  </React.StrictMode>,
  document.getElementById('root')
)
