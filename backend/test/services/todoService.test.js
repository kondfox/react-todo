import { todoService } from '../../src/services'

jest.mock('../../src/data/connection')
import { db } from '../../src/data/connection'

const mockDb = [
  { id: 1, title: 'First todo', isDone: 0, priority: 'low' },
  { id: 2, title: 'Second todo', isDone: 1, priority: 'high' },
]

const mockDbResult = {
  results: mockDb,
}

test('should return with all todos', async () => {
  db.query.mockImplementation(() => mockDbResult)

  try {
    const todos = await todoService.findTodos({})
    expect(todos).toEqual(mockDb)
  } catch (err) {
    console.log(err)
  }
})
