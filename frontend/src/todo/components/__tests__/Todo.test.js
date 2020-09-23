import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Todo } from '../Todo'
import { createTodo } from '../../todoFactory'

afterEach(cleanup)

describe('Todo component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Todo />, div)
  })

  it('shows all necessary todo information', () => {
    const todo = createTodo()
    const { getByText } = render(<Todo {...todo} />)
    getByText(`${todo.title} | ${todo.priority}`)
  })

  it('strikethroughs done todos', () => {
    const todo = { ...createTodo(), isDone: true }
    const { getByTestId } = render(<Todo {...todo} />)
    getByTestId('del')
  })

  it("doesn't strikethroughs not done todos", () => {
    const todo = { ...createTodo(), isDone: false }
    const { queryByTestId } = render(<Todo {...todo} />)
    expect(queryByTestId('del')).toBeNull()
  })

  it('shows done button when todo is not done', () => {
    const todo = { ...createTodo(), isDone: false }
    const { queryByText } = render(<Todo {...todo} />)
    queryByText(/done/i)
  })

  it('shows undone button when todo is done', () => {
    const todo = { ...createTodo(), isDone: true }
    const { queryByText } = render(<Todo {...todo} />)
    queryByText(/undone/i)
  })

  it('calls the given function on click', () => {
    const todo = { ...createTodo(), isDone: false }
    const handleDone = jest.fn()
    const { getByText } = render(<Todo {...todo} handleDone={handleDone} />)

    fireEvent.click(getByText(/done/i))

    expect(handleDone).toBeCalled()
  })
})
