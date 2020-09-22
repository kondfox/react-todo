import request from 'supertest'
import app from '../src/app'

jest.mock('../src/data/connection')
import { db } from '../src/data/connection'

const mockDb = [
  { id: 1, title: 'First todo', isDone: 0, priority: 'low' },
  { id: 2, title: 'Second todo', isDone: 1, priority: 'high' },
]

const mockDbResult = {
  results: mockDb,
}

const mockFindTodos = db.query.mockImplementation(() => mockDbResult)

test('should respond with 200 - OK', done => {
  request(app)
    // Act - request
    .get('/api/todos')
    .set('Accept', 'application/json')
    // Assert - response
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err)
      expect(data.body.todos).toEqual(mockDbResult.results)
      expect(mockFindTodos).toHaveBeenCalled()
      return done()
    })
})

test('should create new todo', async done => {
  const mockSaveTodo = db.query.mockImplementation(() => ({
    results: { insertId: 3 },
  }))
  request(app)
    // request
    .post('/api/todos')
    .set('Content-Type', 'application/json')
    .send({
      title: 'New todo',
      priority: 'high',
    })
    // response
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body).toEqual({
        id: 3,
        title: 'New todo',
        priority: 'high',
        isDone: false,
      })
      expect(mockSaveTodo).toHaveBeenCalled()
      return done()
    })
})
