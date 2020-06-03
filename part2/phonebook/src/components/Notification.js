import React from 'react'

const Notification = ({ type, message }) => {
  return (
    <div className={type} style={{position: 'fixed', top: 0}}>
      {message}
    </div>
  )
}

export default Notification