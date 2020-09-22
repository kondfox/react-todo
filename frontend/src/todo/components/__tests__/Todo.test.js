import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Todo } from '../Todo'

afterEach(cleanup)

describe('Todo component test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Todo />, div)
  })

  it('shows all necessary todo information', () => {
    const title = 'title'
    const priority = 'low'
    const { getByText } = render(<Todo title={title} priority={priority} />)
    getByText(`${title} | ${priority}`)
  })

  it('strikethroughs done todos', () => {
    const title = 'title'
    const priority = 'low'
    const isDone = true
    const { getByTestId } = render(
      <Todo title={title} isDone={isDone} priority={priority} />
    )

    getByTestId('del')
  })

  it("doesn't strikethroughs not done todos", () => {
    const title = 'title'
    const priority = 'low'
    const isDone = false
    const { queryByTestId } = render(
      <Todo title={title} isDone={isDone} priority={priority} />
    )

    expect(queryByTestId('del')).toBeNull()
  })

  it('shows done button when todo is not done', () => {
    const title = 'title'
    const priority = 'low'
    const isDone = false
    const { queryByText } = render(
      <Todo title={title} isDone={isDone} priority={priority} />
    )

    queryByText(/done/i)
  })

  it('shows undone button when todo is done', () => {
    const title = 'title'
    const priority = 'low'
    const isDone = true
    const { queryByText } = render(
      <Todo title={title} isDone={isDone} priority={priority} />
    )

    queryByText(/undone/i)
  })

  it('calls the given function on click', () => {
    const isDone = false
    const handleDone = jest.fn()
    const { getByText } = render(
      <Todo isDone={isDone} handleDone={handleDone} />
    )

    fireEvent.click(getByText(/done/i))
    expect(handleDone).toBeCalled()
  })
})
