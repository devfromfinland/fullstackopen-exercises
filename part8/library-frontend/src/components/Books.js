import React, { useState } from 'react'
import { allGenres } from '../utils/helpers'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('')

  if (!show) {
    return null
  }

  if (!books) {
    return <div>Nothing to show</div>
  }

  const genres = allGenres(books)

  return (
    <div>
      <h2>books</h2>

      { genres && genres.map(item => <button key={item} onClick={() => setGenre(item)}>
        {item}
      </button>)}
      <button onClick={() => setGenre('')}>all genres</button>

      { genre && <div>
          in genre <span style={{ fontWeight: 'bold', color: 'blue'}}>{genre}</span>
        </div>
      }

      <table style={{ marginTop: '16px'}}>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          { genre === ''
            ? books.map(a =>
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>)
            : books.filter(item => item.genres.indexOf(genre) > -1)
              .map(a =>
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Books