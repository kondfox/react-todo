import React from 'react';

export const Todo = ({ todo: {title, isDone, priority} }) => {
  const content = `${title} | ${priority}`

  return (
    <li className='todo'>
      {isDone ? <del>{content}</del> : content}
    </li>
  )
}