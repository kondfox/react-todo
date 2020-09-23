import React from 'react'
import ReactDOM from 'react-dom'
import { render, fireEvent } from '@testing-library/react'
import { toHaveFocus, toHaveValue } from '@testing-library/jest-dom'
import { AddTodo } from '../AddTodo'
import { PRIORITY } from '../../../../constants'

expect.extend({ toHaveFocus, toHaveValue })

describe('AddTodo component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AddTodo />, div)
  })

  it('shows all necessary elements', () => {
    const { getByLabelText, getByText } = render(<AddTodo />)

    getByLabelText(/new todo/i)
    getByLabelText(/priority/i)
    Object.values(PRIORITY).forEach(priority => getByText(priority))
    getByText(/add/i)
  })

  it('has proper default values', () => {
    const { getByLabelText, getByPlaceholderText } = render(<AddTodo />)

    getByPlaceholderText(/new todo/i)
    expect(getByLabelText(/new todo/i)).toHaveFocus()
    expect(getByLabelText(/priority/i)).toHaveValue(PRIORITY.LOW)
  })

  it('calls the given function on click', () => {
    const newTodo = jest.fn()
    const { getByText } = render(<AddTodo newTodo={newTodo} />)

    fireEvent.click(getByText(/add/i))

    expect(newTodo).toHaveBeenCalled()
  })

  it('uses the proper values on click', () => {
    const newTodo = jest.fn()
    const title = 'title'
    const priority = PRIORITY.HIGH
    const { getByText, getByLabelText } = render(<AddTodo newTodo={newTodo} />)

    fireEvent.change(getByLabelText(/new todo/i), {
      target: { value: title },
    })
    fireEvent.change(getByLabelText(/priority/i), {
      target: { value: priority },
    })
    fireEvent.click(getByText(/add/i))

    expect(newTodo).toHaveBeenCalledWith({
      title,
      priority,
      isDone: false,
    })
  })

  it('restores default values after click', () => {
    const newTodo = jest.fn()
    const { getByText, getByLabelText } = render(<AddTodo newTodo={newTodo} />)
    const titleInput = getByLabelText(/new todo/i)
    const priorityInput = getByLabelText(/priority/i)

    fireEvent.change(titleInput, { target: { value: 'some title' } })
    fireEvent.change(priorityInput, { target: { value: PRIORITY.HIGH } })
    fireEvent.click(getByText(/add/i))

    expect(titleInput.value === '').toBeTruthy()
    expect(priorityInput.value === PRIORITY.LOW).toBeTruthy()
  })
})
