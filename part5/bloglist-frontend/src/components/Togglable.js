import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const { showLabel, hideLabel, noButtonLabel, children } = props

  return (
    <div>
      <div  className='togglable-content' style={{ display: visible ? '' : 'none' }}>
        {visible ? children : null}
      </div>
      { !noButtonLabel && 
        <button onClick={toggleVisibility} className='btn-toggle-label'>
          {visible ? hideLabel : showLabel}
        </button>
      }
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable