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