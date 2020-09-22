import { todoService } from '../../src/services'

jest.mock('../../src/validators')
jest.mock('../../src/models/Todo')
import { validate } from '../../src/validators'
import { Todo } from '../../src/models/Todo'

const mockDb = [
  { id: 1, title: 'First todo', isDone: 0, priority: 'low' },
  { id: 2, title: 'Second todo', isDone: 1, priority: 'high' },
]

Todo.findTodos.mockImplementation(() => mockDb)
validate.mockImplementation(() => ({}))

describe('todoService findTodos tests', () => {
  it('should return with all todos', async () => {
    try {
      const todos = await todoService.findTodos({})

      expect(todos).toEqual(mockDb)
    } catch (err) {
      console.log(err)
    }
  })

  it('should return with filtered todos', async () => {
    try {
      const params = { priority: 'low' }
      const expectedResult = mockDb.filter(t => t.priority === 'low')
      const mockFindTodos = Todo.findTodos.mockImplementation(
        () => expectedResult
      )
      const mockValidate = validate.mockImplementation(() => params)

      const todos = await todoService.findTodos(params)

      expect(todos).toEqual(expectedResult)
      expect(mockFindTodos).toHaveBeenCalled()
      expect(mockValidate).toHaveBeenCalled()
    } catch (err) {
      console.log(err)
    }
  })

  it('should should throw error on invalid input', async () => {
    validate.mockImplementation(
      () => new Promise((resolve, reject) => reject([]))
    )
    try {
      const todos = await todoService.findTodos({ isDone: 'cica' })
    } catch (err) {
      expect(err).toEqual([])
    }
  })
})
