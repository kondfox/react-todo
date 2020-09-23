import React, { useState } from 'react'

export const AddTodo = ({ newTodo }) => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('low')

  const handleClick = () => {
    newTodo({
      title,
      priority,
      isDone: false,
    })
    setTitle('')
    setPriority('low')
  }

  return (
    <div className="addTodo">
      <label htmlFor="newTitle">New todo:</label>
      <input
        id="newTitle"
        type="text"
        placeholder="New todo..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoFocus
      />
      <label htmlFor="priority">Priority:</label>
      <select
        name="priority"
        id="priority"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>
      <button onClick={handleClick}>Add</button>
    </div>
  )
}
