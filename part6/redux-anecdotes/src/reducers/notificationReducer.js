const initialNotification = {
  visible: false,
  message: 'This is the initial notification'
}

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
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
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