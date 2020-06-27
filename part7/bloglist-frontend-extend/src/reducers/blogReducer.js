import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'RECEIVE_BLOGS',
      blogs
    })
  }
}

export const newBlog = (blog, authedUser) => {
  return async dispatch => {
    try {
      const savedBlog = await blogService.create(blog)

      const toSaveBlog = {
        ...blog,
        id: savedBlog.id,
        user: {
          username: authedUser.username,
          name: authedUser.name,
          id: savedBlog.user
        },
        likes: 0
      }
  
      dispatch({
        type: 'NEW_BLOG',
        toSaveBlog 
      })
  
      dispatch(setNotification({
        type: 'success',
        content: `a new blog ${blog.title} by ${blog.author} was added`
      }))

    } catch (error) {
      console.log(error)
      dispatch(setNotification({
        type: 'error',
        content: 'failed adding a new blog due to bad request'
      }))
    }
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)

      dispatch({
        type: 'REMOVE_BLOG',
        id
      })

      dispatch(setNotification({
        type: 'success',
        content: 'the blog has been removed'
      }))
    } catch (error) {
      console.log(error)
      dispatch(setNotification({
        type: 'error',
        content: 'failed to remove the blog'
      }))
    }
  }
}

export const updateBlog = (blog, updatedData) => {
  return async dispatch => {
    try {
      let updatedBlog = await blogService.update(blog.id, updatedData)
      updatedBlog.user = { ...blog.user }
  
      dispatch({
        type: 'UPDATE_BLOG',
        updatedBlog
      })
    } catch (error) {
      console.log(error)
      dispatch(setNotification({
        type: 'error',
        content: 'failed to update the blog'
      }))
    }
    
  }
}

const blogReducer = (state = null, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'RECEIVE_BLOGS':
      return action.blogs
    case 'NEW_BLOG':
      return [
        ...state,
        action.toSaveBlog
      ]
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.id)
    case 'UPDATE_BLOG':
      return state.map(item => item.id === action.updatedBlog.id ? action.updatedBlog : item)
    default:
      return state
  }
}

export default blogReducer