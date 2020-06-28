import React, { useState, useImperativeHandle } from 'react'
import { Button } from '@material-ui/core'

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
        <Button 
          onClick={toggleVisibility} 
          className='btn-toggle-label'
          variant='contained'
          color='primary'
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          {visible ? hideLabel : showLabel}
        </Button>
      }
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable