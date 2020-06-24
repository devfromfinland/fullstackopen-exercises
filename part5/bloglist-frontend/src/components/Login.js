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
      <form onSubmit={handleSubmit} id='login-form'>
        <div>
          username 
          <input
            type='text' 
            value={username} 
            onChange={e => setUsername(e.target.value)}
            className='input-username'
          />
        </div>
        <div>
          password 
          <input 
            type='password'
            value={password} 
            onChange={e => setPassword(e.target.value)}
            className='input-password'
          />
        </div>
        <button type='submit' className='btn-login'>login</button>
      </form>
    </div>
  )
})

Login.displayName = 'Login'

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default Login