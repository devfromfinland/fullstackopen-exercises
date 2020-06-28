import React from 'react'

const Icon = (props) => {
  return (
    <i className='material-icons'>{props.name ? props.name : 'HelpOutline'}</i>
  )
}

export default Icon