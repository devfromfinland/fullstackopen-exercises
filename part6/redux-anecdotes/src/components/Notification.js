import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'rgb(220, 220, 220)'
  }

  return notification.visible 
    ? <div style={style}>
        {notification.message}
      </div>
    : <div></div>
}

export default Notification