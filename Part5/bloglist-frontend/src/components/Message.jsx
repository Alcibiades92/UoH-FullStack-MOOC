import PropTypes from 'prop-types'
function Message({ message, success }) {
  const successStyle = {
    fontSize: '22px',
    border: '5px solid green',
  }
  const errorStyle = {
    fontSize: '20px',
    border: '5px solid red',
  }
  return <div style={success ? successStyle : errorStyle}>{message}</div>
}
Message.propTypes = {
  success: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}
export default Message
