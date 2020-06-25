import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { updateFilterText } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()
  // const filterText = useSelector(state => state.filterText)
  const { filterText, dispatch } = props

  const handleChange = (e) => {
    const value = e.target.value
    dispatch(updateFilterText(value))
  }

  return (
    <div style={{ marginBottom: 10, marginTop: 10 }}>
      filter <input onChange={handleChange} value={filterText} />
    </div>
  )
}

const mapStateToProps = ({ filterText }) => {
  return {
    filterText
  }
}

export default connect(mapStateToProps)(Filter)