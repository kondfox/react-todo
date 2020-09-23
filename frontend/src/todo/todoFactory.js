import { PRIORITY } from '../../constants'

export const titleSchema = /todo [0-9]/i

function* idGenerator() {
  for (let i = 0; i < 1_000_000; i++) {
    yield i
  }
}

const generateId = idGenerator()

export const createTodoWithoutId = () => {
  const randomIsDone = Math.floor(Math.random() * 2)
  const randomPriority = Object.values(PRIORITY)[
    Math.floor(Math.random() * Object.keys(PRIORITY).length)
  ]
  return {
    title: `todo`,
    isDone: randomIsDone,
    priority: randomPriority,
  }
}

export const createTodo = () => {
  const id = generateId.next().value
  return {
    id,
    ...createTodoWithoutId(),
    title: `todo ${id}`,
  }
}

export const createTodos = (n = 3) => [...Array(n)].map(_ => createTodo())
