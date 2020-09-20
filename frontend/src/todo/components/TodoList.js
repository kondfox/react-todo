import React from 'react'
import { Todo } from './Todo'
import { connect } from 'react-redux'
import { TODO_ACTION } from '../../constants'

const TodoListComponent = ({ todos, handleDone }) => {
  return (
    <>
      <h1>My Todos</h1>
      <ul id="todo">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            handleDone={() => handleDone(todo.id)}
          />
        ))}
      </ul>
    </>
  )
}

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleDone: id =>
      dispatch({
        type: TODO_ACTION.TOGGLE_DONE,
        payload: id,
      }),
  }
}

export const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListComponent)
