import React from 'react'

const AlertMessage = ({ type, message }) => {
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default AlertMessage