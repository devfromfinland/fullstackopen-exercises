import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ type, message }) => {
  return (
    <div className={type} id='notification'>
      {message}
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default Notification