import React from 'react'
import { Button } from './Button'

export const Todo = ({ title, isDone, priority, id, handleDone }) => {
  const content = `${title} | ${priority}`

  return (
    <li className="todo">
      <span>{isDone ? <del data-testid="del">{content}</del> : content}</span>
      <Button title={isDone ? 'Undone' : 'Done'} click={handleDone}></Button>
    </li>
  )
}
