import React from 'react'
// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)
  const { notification } = props

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'rgb(174, 214, 241)'
  }

  return notification.visible 
    ? <div style={style}>
        {notification.message}
      </div>
    : <div></div>
}

const mapStateToProps = ({ notification }) => {
  return {
    notification
  }
}

export default connect(mapStateToProps)(Notification)