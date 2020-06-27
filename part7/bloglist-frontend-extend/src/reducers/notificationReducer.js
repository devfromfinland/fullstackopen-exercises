let timeID

export const showNotification = (message) => {
  return {
    type: 'SHOW',
    message
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

export const setNotification = (message, time = 5) => {
  return async dispatch => {
    dispatch(showNotification(message))
    
    if (timeID) {
      clearTimeout(timeID)
    }

    timeID = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

const notificationReducer = (state = null, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'SHOW':
      return action.message
    case 'HIDE':
      return null
    default:
      return state
  }
}

export default notificationReducer