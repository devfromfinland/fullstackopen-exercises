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

const allGenres = (items) => {
  let genres = []
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].genres.length; j++) {
      if (genres.indexOf(items[i].genres[j]) === -1) {
        genres.push(items[i].genres[j])
      }
    }
  }

  return genres
}

export { saveAuthedUser, getAuthedUser, removeAuthedUser, allGenres }