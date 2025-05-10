function Message({ message, success }) {
  const successStyle = {
    fontSize: "22px",
    border: "5px solid green",
  };
  const errorStyle = {
    fontSize: "20px",
    border: "5px solid red",
  };
  return <div style={success ? successStyle : errorStyle}>{message}</div>;
}

export default Message;
