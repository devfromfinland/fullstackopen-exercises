import React, { useState } from 'react'

const SearchFilter = ({ handleFilter }) => {
  const [ searchValue, setSearchValue ] = useState('')

  const doChange = (e) => {
    setSearchValue(e.target.value)
    handleFilter(e.target.value)
  }

  return (
    <div>
      filter shown with
      <input value={searchValue} onChange={doChange} />
    </div>
  )
}

export default SearchFilter