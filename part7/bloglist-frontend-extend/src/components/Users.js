import React from 'react'
import { useSelector } from 'react-redux'

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
                <td>{user.name}</td>
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