import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Login = React.forwardRef(({ handleLogin }, ref) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const reset = () => {
    setUsername('')
    setPassword('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin(username, password)
  }

  useImperativeHandle(ref, () => {
    return {
      reset
    }
  })

  return (
    <div>
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
    </div>
  )
})

Login.displayName = 'Login'

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default Login