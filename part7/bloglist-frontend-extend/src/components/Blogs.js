import React from 'react'
import { useSelector } from 'react-redux'
import ItemLink from './ItemLink'
import { List } from '@material-ui/core'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs ? state.blogs.sort((a, b) => b.likes - a.likes) : null)

  return (
    <div>
      { blogs
        ? <List>
          {blogs.map((blog, index) =>
            <ItemLink key={blog.id} to={'/blogs/' + blog.id} primary={blog.title} pos={index} />
          )}
        </List>
        : <div>Loading...</div>
      }
    </div>
  )
}

export default Blogs