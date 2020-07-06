import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
// import { saveAuthedUser, getAuthedUser, removeAuthedUser } from '../utils/helpers'

const Login = ({ show, handleLoginSuccess, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login ] = useMutation(LOGIN, {
    onError: error => {
      notify('error', error.graphQLErrors[0].message)
      // console.log(error.graphQLErrors)
    }
  })
  
  if (!show) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (username === '' || password === '') {
      notify('error', 'provide username and password first')
      return
    }

    const response = await login({ variables: { 
      username, 
      password 
    }})

    const token = response ? response.data.login : null
    console.log('token', token)

    if (token) {
      setUsername('')
      setPassword('')
      handleLoginSuccess(token)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username 
        <input
          type='text' 
          value={username} 
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        password 
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default Login