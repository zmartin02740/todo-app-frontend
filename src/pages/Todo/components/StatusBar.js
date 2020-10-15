import React from 'react'
import Button from './Button';

export default ({ changeStatus, status }) => {
  return (
    <div className="card-header">
      <ul className="nav nav-tabs card-header-tabs">
        <div style={{ display: 'inline-flex' }} className="row">
          <li className="nav-item">
            <Button
              status={status}
              btnText="All Tasks"
              btnStatus="ALL"
              changeStatus={changeStatus}
            />
          </li>
          <li className="nav-item">
            <Button
              status={status}
              btnText="Active Tasks"
              btnStatus="ACTIVE"
              changeStatus={changeStatus}
            />
          </li>
          <li className="nav-item">
            <Button
              status={status}
              btnText="Completed Tasks"
              btnStatus="COMPLETE"
              changeStatus={changeStatus}
            />
          </li>
        </div>
      </ul>
    </div>
  )
}
