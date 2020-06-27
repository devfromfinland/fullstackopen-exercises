import userService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log('fetched users', users)
    dispatch({
      type: 'RECEIVE',
      users
    })
  }
}

const userReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'RECEIVE':
      return action.users
    default:
      return state
  }
}

export default userReducer