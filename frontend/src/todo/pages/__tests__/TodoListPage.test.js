import React, { useState as useStateMock } from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { render, screen, fireEvent } from '@testing-library/react'
import { createTodos, createTodoWithoutId } from '../../todoFactory'
import { TodoListPage } from '../TodoListPage'
import { todoService } from '../../services'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

const createMockfetchTodos = () =>
  jest.spyOn(todoService, 'fetchTodos').mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({ todos: createTodos() })
      })
  )

describe('TodoListPage component tests', () => {
  const mockSetTodos = jest.fn()
  let mockfetchTodos

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, mockSetTodos])
    mockfetchTodos = createMockfetchTodos()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TodoListPage />, div)
  })

  it('fetches todos on mount', async () => {
    await act(async () => render(<TodoListPage />))

    expect(mockfetchTodos).toHaveBeenCalled()
  })

  it('it renders AddTodo and TodoList components', async () => {
    await act(async () => render(<TodoListPage />))

    screen.getByText(/new todo/i)
    screen.getByText(/my todos/i)
  })

  it('it adds new todo to todos', async () => {
    const todo = createTodoWithoutId()
    const savedTodo = { id: 999, ...todo }
    const addTodoMock = jest
      .spyOn(todoService, 'addTodo')
      .mockImplementation(() => Promise.resolve(savedTodo))
    const { getByLabelText, getByText } = render(<TodoListPage />)

    await act(async () => {
      fireEvent.change(getByLabelText(/new todo/i), {
        target: { value: savedTodo.title },
      })
      fireEvent.change(getByLabelText(/priority/i), {
        target: { value: savedTodo.priority },
      })
      fireEvent.click(getByText(/add/i))
    })

    expect(mockSetTodos).toHaveBeenCalledWith([savedTodo])
    // expect(addTodoMock).toHaveBeenCalledWith([todo])
  })
})
