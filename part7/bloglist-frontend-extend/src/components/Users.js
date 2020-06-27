import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return !users
    ? <div>no users to display</div>
    : <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>

        <tbody>
          {
            users
              ? users.map(user => <tr key={user.id}>
                <td><Link to={'/users/' + user.id}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>)
              : <tr>
                <td colspan='2'>
                  Loading...
                </td>
              </tr>
          }
        </tbody>
      </table>
    </div>
}

export default Users