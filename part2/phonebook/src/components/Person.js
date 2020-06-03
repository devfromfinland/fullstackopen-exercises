import React from 'react'

const Person = ({ person, handleRemove }) => {
  const doRemove = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      handleRemove(person.id)
    }
  }

  return <div>
    {person.name} {person.number}
    <button onClick={doRemove}>delete</button>
  </div>
}

export default Person