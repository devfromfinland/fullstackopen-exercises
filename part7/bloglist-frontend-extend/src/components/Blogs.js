import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs ? state.blogs.sort((a, b) => b.likes - a.likes) : null)

  const styleBlogItem = {
    padding: 5, borderWidth: 1, borderStyle: 'solid', marginTop: 5, marginBottom: 5
  }

  return (
    <div>
      { blogs
        ? blogs.map(blog =>
            // <Blog
            //   key={blog.id}
            //   blog={blog}
            // />
            <div style={styleBlogItem} key={blog.id}>
              <Link to={'/blogs/' + blog.id}>{blog.title}</Link>
            </div>
          )
        : <div>Loading...</div>
      }
    </div>
  )
}

export default Blogs