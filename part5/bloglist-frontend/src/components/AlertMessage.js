import React from 'react'
import PropTypes from 'prop-types'

const AlertMessage = ({ type, message }) => {
  return (
    <div className={type} id='notification'>
      {message}
    </div>
  )
}

AlertMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default AlertMessage