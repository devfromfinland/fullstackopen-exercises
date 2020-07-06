  
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = ({ show, authors, user, notify }) => {
  const [ name, setName ] = useState('none')
  const [ born, setBorn ] = useState('')
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    onError: error => [
      console.log(error.graphQLErrors[0].message)
    ],
    update: (cache, response) => {
      const { editAuthor } = response.data
      const cacheData = cache.readQuery({ query: ALL_AUTHORS })
      
      cache.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...cacheData,
          allAuthors: cacheData.allAuthors.map(item => item.name === editAuthor.name 
            ? editAuthor
            : item
            )
        }
      })
    }
  })

  if (!show) {
    return null
  }

  if (!authors) {
    return <div>Nothing to show</div>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name === 'none') {
      notify('error', 'select an author first')
    } else if (born === '') {
      notify('error', 'enter which year to be updated')
    } else {
      const year = parseInt(born)
      await updateAuthor({ variables: {name, year} })

      notify('success', `${name}'s born year has been updated to ${born}`)
      setName('none')
      setBorn('')
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      { !user
        ? null
        : <>
          <h3>Set birthyear</h3>
          <form onSubmit={handleSubmit}>
            <div>
              name 
              <select value={name} onChange={(e) => setName(e.target.value)}>
                <option value='none'>Select author</option>
                {authors.map(a =>
                  <option key={a.id} value={a.name}>{a.name}</option>
                )}
              </select>
              
            </div>
            <div>
              born <input type='text' value={born} onChange={(e) => setBorn(e.target.value)}/>
            </div>
            <button type='submit'>update author</button>
          </form>
        </>
      }
    </div>
  )
}

export default Authors
