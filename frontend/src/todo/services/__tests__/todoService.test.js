import { backend } from '../../../settings'
import { PRIORITY } from '../../../../constants'
import { createTodos, createTodoWithoutId } from '../../todoFactory'
import { todoService } from '../todoService'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('todoService unit tests', () => {
  describe('fetchTodos unit tests', () => {
    it('fetches todos from backend', async () => {
      const mockResponse = { todos: createTodos() }
      const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      )
      const mockConvertToQueryParams = jest
        .spyOn(todoService, 'convertToQueryParams')
        .mockImplementation(() => '')

      const todos = await todoService.fetchTodos({})

      expect(todos).toEqual(mockResponse)
      expect(mockConvertToQueryParams).toHaveBeenCalledWith({})
      expect(mockFetch).toHaveBeenCalledWith(`${backend.url}/todos`)
    })

    it('fetches todos from backend with proper query params', async () => {
      const isDone = 1
      const priority = PRIORITY.HIGH
      const queryParams = `?isDone=${isDone}&priority=${priority}`

      const mockResponse = { todos: createTodos() }
      const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      )
      const mockConvertToQueryParams = jest
        .spyOn(todoService, 'convertToQueryParams')
        .mockImplementation(() => queryParams)

      const todos = await todoService.fetchTodos({ isDone, priority })

      expect(todos).toEqual(mockResponse)
      expect(mockConvertToQueryParams).toHaveBeenCalledWith({
        isDone,
        priority,
      })
      expect(mockFetch).toHaveBeenCalledWith(
        `${backend.url}/todos${queryParams}`
      )
    })
  })

  describe('addTodo unit tests', () => {
    it('sends todo to backend', async () => {
      const todo = createTodoWithoutId()
      const savedTodo = { id: 1, ...todo }

      const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(savedTodo),
        })
      )

      const result = await todoService.addTodo(todo)

      expect(result).toEqual(savedTodo)
      expect(mockFetch).toHaveBeenCalledWith(`${backend.url}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })
    })
  })

  describe('convertToQueryParams unit tests', () => {
    it('returns empty string when empty object is given', () => {
      const result = todoService.convertToQueryParams({})

      expect(result).toEqual('')
    })

    it('returns proper query string when object is given', () => {
      const isDone = 0
      const priority = PRIORITY.MEDIUM
      const result = todoService.convertToQueryParams({ isDone, priority })

      expect(result).toEqual(`?isDone=${isDone}&priority=${priority}`)
    })
  })
})
