import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Container, TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const Login = React.forwardRef(({ handleLogin }, ref) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()

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
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          This app requires logged in
        </Typography>
        <form 
          onSubmit={handleSubmit} 
          id='login-form' 
          className={classes.form} 
          noValidate 
          autoComplete="off"
        >
          <TextField 
            id='input-username'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Username'
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField 
            id='input-password'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            name='password'
            type='password'
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  )
})

Login.displayName = 'Login'

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default Login