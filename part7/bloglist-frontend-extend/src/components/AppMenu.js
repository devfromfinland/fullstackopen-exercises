import React, { useState } from 'react'
import ItemLink from './ItemLink'

import { 
  AppBar, Toolbar, Typography, 
  Button, IconButton, 
  Drawer,
  List,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/authedReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}))

const AppMenu = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.authedUser)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton 
            edge='start' 
            className={classes.menuButton} 
            color='inherit' 
            aria-label='menu'
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Blog app
          </Typography>
          { user && <>
              <Typography variant='body1'>
                {user.name} -
              </Typography>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </>
          }
        </Toolbar>
      </AppBar>

      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
      >
        <div
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
          className={classes.list}
        >
          <List>
            <ItemLink to='/' primary='Blogs' icon='book'/>
            <ItemLink to='/users' primary='Users' icon='group'/>
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default AppMenu