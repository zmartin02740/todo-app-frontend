import React from 'react'

export default ({ addTodo, todo, setTodo }) => {
  return (
    <form onSubmit={addTodo} style={{ textAlign: '-webkit-center' }}>
      <div className="input-group mt-5 w-50">
        <input type="text" className="form-control" placeholder="Add Task" value={todo} onChange={e => setTodo(e.target.value)} />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="submit" value="Submit">Submit</button>
        </div>
      </div>
    </form>
  )
}
