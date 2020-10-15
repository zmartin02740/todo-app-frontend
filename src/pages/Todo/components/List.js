import React from 'react'
import ListItem from './ListItem';

export default ({ list, removeTodo, updateCompletion, updateBody }) => {
  return (
    <div className="card">
      {list.map((todo, index) => {
        return (
          <ListItem
            updateBody={updateBody}
            key={todo._id}
            todo={todo}
            updateCompletion={updateCompletion}
            removeTodo={removeTodo}
          />
        )
      })}
    </div>
  )
}
