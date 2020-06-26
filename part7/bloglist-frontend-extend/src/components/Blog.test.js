import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog display', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'this is a test blog',
      author: 'tester',
      url: 'www.testing.co',
      user: {
        username: 'viet',
        name: 'Viet Phan',
        id: '5ee88f6c061fa8040ced7f9f'
      },
      id: 'randomIdHere'
    }

    component = render(
      <Blog 
        blog={blog}
        handleRemove={mockHandler}
        handleUpdate={mockHandler}
      />
    )
  })

  test('initial blog view', () => {
    const title = component.container.querySelector('.blog-title')
    const author = component.container.querySelector('.blog-author')
    const url = component.container.querySelector('.blog-url')
    const likes = component.container.querySelector('.blog-likes')
    const togglableContent = component.container.querySelector('.togglable-content')

    expect(togglableContent).toHaveStyle('display: none')
    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
    
    expect(title).toHaveTextContent('this is a test blog')
    expect(author).toHaveTextContent('tester')
  })

  test('toggle-button: expand blog details', () => {
    const toggleButton = component.container.querySelector('.btn-toggle')
    fireEvent.click(toggleButton)
  
    const title = component.container.querySelector('.blog-title')
    const author = component.container.querySelector('.blog-author')
    const url = component.container.querySelector('.blog-url')
    const likes = component.container.querySelector('.blog-likes')
    const togglableContent = component.container.querySelector('.togglable-content')

    expect(togglableContent).not.toHaveStyle('display: none')
    expect(url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
    expect(title).toHaveTextContent('this is a test blog')
    expect(author).toHaveTextContent('tester')
  })

  test('toggle-button: hide blog details', () => {
    const toggleButton = component.container.querySelector('.btn-toggle')
    fireEvent.click(toggleButton)
    fireEvent.click(toggleButton)
  
    const url = component.container.querySelector('.blog-url')
    const likes = component.container.querySelector('.blog-likes')
    const togglableContent = component.container.querySelector('.togglable-content')

    expect(togglableContent).toHaveStyle('display: none')
    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
  })

  test('like-button: click like on a blog', () => {
    const toggleButton = component.container.querySelector('.btn-toggle')
    fireEvent.click(toggleButton)

    const btnLikes = component.container.querySelector('.btn-likes')
    fireEvent.click(btnLikes)
    expect(mockHandler.mock.calls).toHaveLength(1)
    fireEvent.click(btnLikes)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})