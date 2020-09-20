import React, { useState } from 'react'
import { connect } from 'react-redux'
import { TODO_ACTION } from '../../constants'

const AddTodoComponent = ({ newTodo }) => {
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
      <input
        id="newTitle"
        type="text"
        placeholder="New todo..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
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

const mapDispatchToProps = dispatch => {
  return {
    newTodo: todo =>
      dispatch({
        type: TODO_ACTION.NEW_TODO,
        payload: todo,
      }),
  }
}

export const AddTodo = connect(null, mapDispatchToProps)(AddTodoComponent)
