const initialNotification = {
  visible: false,
  message: 'This is the initial notification'
}

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

export const setNotification = (message, time) => {
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

export const setTimer = (timeId) => {
  return {
    type: 'SET_TIMER',
    timeId
  }
}

export const clearTimer = (timeId) => {
  return {
    type: 'CLEAR_TIMER',
    timeId
  }
}

const notificationReducer = (state = initialNotification, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'SHOW':
      return {
        visible: true,
        message: action.message
      }
    case 'HIDE':
      return {
        visible: false,
        message: ''
      }
    default:
      return state
  }
}

export default notificationReducer