import React, { useState } from 'react'

export default ({ todo, updateCompletion, removeTodo, updateBody }) => {
  const [editable, setEditable] = useState(false)
  const [body, setBody] = useState('')
  let style = todo.active ? { color: 'red' } : { color: 'green', textDecoration: 'line-through' };
  let statusText = todo.active ? <i className="fas fa-check"></i> : <i className="fas fa-history"></i>

  const updateEditable = () => {
    setEditable(true)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (body.length < 5) {
      alert('Please make sure the task is more than 5 characters')
    } else {
      setBody('')
      setEditable(false)
      updateBody(todo._id, body)
    }
  }

  let task = editable && todo.active ?
    <form onSubmit={handleSubmit} style={{ textAlign: '-webkit-center' }}>
      <div className="input-group w-50">
        <input
          placeholder={todo.body}
          value={body}
          type="text"
          className="form-control"
          onChange={e => setBody(e.target.value)}
        />
        <span className="input-group-append">
          <button className="btn btn-outline-primary" type="submit" value="Submit">Update</button>
        </span>
      </div>
    </form> : <div onClick={() => updateCompletion(todo._id, todo.active)} style={style}>{todo.body}</div>;

  return (
    <div className="list-group-item">
      {task}
      <div>
        {todo.active ?
          <span className="m-3" onClick={() => updateEditable()}>
            <i className="fas fa-edit"></i>
          </span>
          :
          null}
        <span className="m-3" onClick={() => updateCompletion(todo._id, todo.active)}>{statusText}</span>
        <span className="m-3" onClick={() => removeTodo(todo._id)}>
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
    </div>
  )
}