import React from 'react'

export default ({ btnText, btnStatus, status, changeStatus }) => {
  return (
    <a className={`nav-link ${status === btnStatus ? 'active' : ''}`} onClick={() => changeStatus(btnStatus)}>
      {btnText}
    </a>
  )
}
