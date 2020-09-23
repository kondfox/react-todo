import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { render, screen } from '@testing-library/react'
import { createTodos } from '../../todoFactory'
import { TodoListPage } from '../TodoListPage'
import { todoService } from '../../services'

jest.spyOn(todoService, 'fetchTodos').mockImplementation(
  () =>
    new Promise((resolve, reject) => {
      resolve({ todos: createTodos() })
    })
)

describe('TodoListPage component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TodoListPage />, div)
  })

  it('it renders AddTodo and TodoList components', async () => {
    await act(async () => render(<TodoListPage />))

    screen.getByText(/new todo/i)
    screen.getByText(/my todos/i)
  })
})
