import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Icon from './Icon'

const MenuItemLink = (props) => {
  const { to, primary, icon, pos } = props

  const CustomLink = useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  )

  return (
    <ListItem button component={CustomLink} 
      style={(pos && pos % 2) ? { backgroundColor: 'rgba(211, 211, 211, 0.2)' } : null }>
      { icon && <ListItemIcon>
          <Icon name={icon} />
        </ListItemIcon>
      }
      <ListItemText primary={primary} />
    </ListItem>
  )
}

export default MenuItemLink