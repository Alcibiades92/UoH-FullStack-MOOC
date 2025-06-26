import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { current } from '@reduxjs/toolkit'
import { Alert } from '@mui/material'
function Message() {
  const notification = useSelector((state) => state.notification)

  const successStyle = {
    fontSize: '22px',
    border: '5px solid green',
  }
  const errorStyle = {
    fontSize: '20px',
    border: '5px solid red',
  }
  if (!notification.content) {
    return null
  }
  return (
    <Alert
      severity={notification.severity}
      // style={notification.success ? successStyle : errorStyle}
    >
      {notification.content}
    </Alert>
  )
}
// Message.propTypes = {
//   success: PropTypes.bool.isRequired,
//   message: PropTypes.string.isRequired,
// }
export default Message
