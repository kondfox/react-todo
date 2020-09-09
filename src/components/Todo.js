import React from 'react';
import { Button } from './Button';

export const Todo = ({ todo: {title, isDone, priority, id}, handleDone }) => {
  const content = `${title} | ${priority}`

  return (
    <li className='todo'>
      <span>{isDone ? <del>{content}</del> : content}</span>
      <Button title={isDone ? 'Undone' : 'Done'} click={() => handleDone(id)}></Button>
    </li>
  )
}