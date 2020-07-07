import React from 'react'
import { getAuthedUser } from '../utils/helpers'

const Recommend = ({ show, books }) => {
  if (!show) {
    return null
  }

  if (!books) {
    return <div>Nothing to show</div>
  }

  // user: { username, favoriteGenre }
  const authedUser = getAuthedUser()
  const user = authedUser ? authedUser.user : null
  const genre = user ? user.favoriteGenre : null

  return (
    <div>
      <h2>recommendations</h2>

      { genre
        ? <div>
            books in your favorite genre <span style={{ fontWeight: 'bold', color: 'blue'}}>
              {genre}
              </span>
          </div>
        : <div>you don't have any genre in your favorite, add one to see recommendations</div>
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
          { genre && books.filter(item => item.genres.indexOf(genre) > -1)
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

export default Recommend