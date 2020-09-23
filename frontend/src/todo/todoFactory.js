import { PRIORITY } from '../../constants'

export const titleSchema = /todo [0-9]/i

function* idGenerator() {
  for (let i = 0; i < 1_000_000; i++) {
    yield i
  }
}

const generateId = idGenerator()

export const createTodo = () => {
  const id = generateId.next().value
  const randomIsDone = Math.floor(Math.random() * 2)
  const randomPriority = Object.values(PRIORITY)[
    Math.floor(Math.random() * Object.keys(PRIORITY).length)
  ]
  return {
    id,
    title: `todo ${id}`,
    isDone: randomIsDone,
    priority: randomPriority,
  }
}

export const createTodos = (n = 3) => [...Array(n)].map(_ => createTodo())
