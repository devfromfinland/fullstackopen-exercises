import React from 'react'
import PropTypes from 'prop-types'

const AlertMessage = ({ type, content }) => {
  return (
    <div className={type} id='notification'>
      {content}
    </div>
  )
}

AlertMessage.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default AlertMessage