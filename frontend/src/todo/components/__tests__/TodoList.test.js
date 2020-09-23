import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TodoList } from '../TodoList'
import { createTodos, titleSchema } from '../../todoFactory'

describe('TodoList component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TodoList />, div)
  })

  it('shows all necessary information', () => {
    const todos = createTodos(3)

    const { getByText, getAllByText } = render(<TodoList todos={todos} />)

    getByText(/my todos/i)
    expect(getAllByText(titleSchema)).toHaveLength(3)
  })
})
