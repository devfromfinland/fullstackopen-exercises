export const updateFilterText = (message) => {
  return {
    type: 'UPDATE',
    message
  }
}

const filterReducer = (state = '', action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'UPDATE':
      return action.message
    default:
      return state
  }
}

export default filterReducer