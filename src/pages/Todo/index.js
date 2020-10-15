import React, { useState, useEffect } from 'react';
import List from './components/List';
import StatusBar from './components/StatusBar';
import TaskForm from './components/TaskForm';

export default () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [displayedTasks, setDisplayedTasks] = useState([])
  const [status, setStatus] = useState('ALL')
  const hostname = 'https://damp-crag-87604.herokuapp.com/'

  // creates a new task to add to the list
  const addTodo = event => {
    event.preventDefault()
    if (todo.length < 5) {
      alert('Please make sure the task is more than 5 characters')
    } else {
      const task = { body: todo, active: true }
      fetch(hostname + 'add-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
        .then(res => res.json())
        .then(data => {
          setTodos([...todos, data])
          setStatus('ALL')
          filteredTasks(data)
          setTodo('')
        })
        .catch(err => console.log(err))
    }
  }

  // removes a task with the given id
  const removeTodo = id => {
    fetch(hostname + 'delete-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: id })
    })
      .then(res => res.json())
      .then(data => {
        const updatedList = todos.filter(item => item._id !== data._id)
        setTodos([...updatedList])
        setDisplayedTasks([...updatedList])
        setStatus('ALL')
      })
      .catch(err => console.log(err))
  }

  // updates the task if completed
  const updateCompletion = (id, active) => {
    const obj = { _id: id, active: !active }
    fetch(hostname + 'update-active', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => {
        const taskIndex = todos.findIndex(item => item._id === data._id)
        todos[taskIndex].active = data.active
        setTodos([...todos])
        setDisplayedTasks([...todos])
        setStatus('ALL')
      })
      .catch(err => console.log(err))
  }

  // updates the body of the task
  const updateBody = (id, body) => {
    const obj = { _id: id, body }
    fetch(hostname + 'update-body', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => {
        const taskIndex = todos.findIndex(item => item._id === data._id)
        todos[taskIndex].body = body
        setTodos([...todos])
        setDisplayedTasks([...todos])
      })
      .catch(err => console.log(err))
  }

  // removes all the completed tasks
  const removeCompletedTasks = () => {
    fetch(hostname + 'delete-completed')
      .then(res => res.json())
      .then(data => {
        const updatedList = todos.filter((item, index) => item.active === true)
        setTodos([...updatedList])
        setDisplayedTasks([...updatedList])
      })
  }

  // filters tasks based on ALL, ACTIVE, or COMPLETE. default is set to ALL
  const filteredTasks = (obj = null) => {
    switch (status) {
      case 'ACTIVE':
        if (obj) {
          setDisplayedTasks([...todos.filter((item, index) => item.active === true), obj])
        } else {
          setDisplayedTasks([...todos.filter((item, index) => item.active === true)])
        }
        return displayedTasks
      case 'COMPLETE':
        if (obj) {
          setDisplayedTasks([...todos.filter((item, index) => item.active === false), obj])
        } else {
          setDisplayedTasks([...todos.filter((item, index) => item.active === false)])
        }
        return displayedTasks
      case 'ALL':
        if (obj) {
          setDisplayedTasks([...todos, obj])
        } else {
          setDisplayedTasks([...todos])
        }
        return displayedTasks
      default:
        if (obj) {
          setDisplayedTasks([...todos, obj])
        } else {
          setDisplayedTasks([...todos])
        }
        return displayedTasks
    }
  }

  const changeStatus = (stat) => setStatus(stat)

  const activeTasks = todos.filter((item, index) => item.active === true).length

  // sets the arrays for todos and displayed tasks on page load
  useEffect(() => {
    fetch(hostname + 'all-tasks')
      .then(res => res.json())
      .then(data => {
        setTodos([...data])
        setDisplayedTasks([...data])
      })
  }, [])

  // updates the filtered tasks any time status is updated
  useEffect(() => {
    filteredTasks()
  }, [status])

  return (
    <div style={{ textAlign: 'center' }}>
      <TaskForm
        addTodo={addTodo}
        todo={todo}
        setTodo={setTodo}
      />
      <div>Total number of tasks: {activeTasks}</div>
      <button className="btn btn-outline-danger m-2" onClick={removeCompletedTasks}>Delete All Completed Tasks</button>
      <div className="card text-center">
        <StatusBar changeStatus={changeStatus} status={status} />
        <List
          list={displayedTasks}
          removeTodo={removeTodo}
          updateCompletion={updateCompletion}
          updateBody={updateBody}
        />
      </div>
    </div>
  )
}
