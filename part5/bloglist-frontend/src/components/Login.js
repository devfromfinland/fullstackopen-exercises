import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username 
          <input
            type='text' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password 
          <input 
            type='password'
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
      
    </div>
  )
}

export default Login