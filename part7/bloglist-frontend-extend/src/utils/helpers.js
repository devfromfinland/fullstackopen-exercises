// import React from 'react'

const saveAuthedUser = (authedUser) => {
  window.localStorage.setItem('authedUser',JSON.stringify(authedUser))
}

const getAuthedUser = () => {
  const authedUser = window.localStorage.getItem('authedUser')
  return authedUser
    ? JSON.parse(authedUser)  // { name, username, token }
    : null
}

const removeAuthedUser = () => {
  window.localStorage.removeItem('authedUser')
}

export { saveAuthedUser, getAuthedUser, removeAuthedUser }