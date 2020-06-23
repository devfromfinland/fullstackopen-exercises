import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import NewBlog from './NewBlog'

describe('New blog', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <NewBlog handleNewBlog={mockHandler}/>
    )
  })

  test('initial form display', () => {
    const title = component.container.querySelector('.new-title')
    const author = component.container.querySelector('.new-author')
    const url = component.container.querySelector('.new-url')
    const btnSubmit = component.container.querySelector('.btn-submit')
    const newForm = component.container.querySelector('.new-form')
    
    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()
    expect(url).toBeInTheDocument()
    expect(btnSubmit).toBeInTheDocument()
    expect(newForm).toBeInTheDocument()
  })

  test('input', () => {
    const title = component.container.querySelector('.new-title').querySelector('input')
    const author = component.container.querySelector('.new-author').querySelector('input')
    const url = component.container.querySelector('.new-url').querySelector('input')
    const newForm = component.container.querySelector('.new-form')

    fireEvent.change(title, { target: { value: 'test title' } })
    fireEvent.change(author, { target: { value: 'Viet Phan' } })
    fireEvent.change(url, { target: { value: 'www.test.com' } })

    fireEvent.submit(newForm)
    
    // console.log('calls:', mockHandler.mock.calls[0][0])
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual({
      title: 'test title',
      author: 'Viet Phan',
      url: 'www.test.com'
    })
  })
})