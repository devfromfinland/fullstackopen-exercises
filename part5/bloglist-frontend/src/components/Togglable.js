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
      <div style={{ display: visible ? '' : 'none' }}>
        {visible ? children : null}
      </div>
      { !noButtonLabel && 
        <button onClick={toggleVisibility}>
          {visible ? hideLabel : showLabel}
        </button>
      }
    </div>
  )
})

export default Togglable