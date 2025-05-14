import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import Message from './components/Message'
import Toggle from './components/Toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userr = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(userr))
      setUser(userr)
      setUsername('')
      setPassword('')
      blogService.setToken(userr.token)
      setSuccess(true)
      setMessage(`Succesfully logged in . Welcome ${userr.username}`)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (exception) {
      // setTimeout(() => {
      //   console.log(exception.name);
      // }, 1000);
      setSuccess(false)
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }
  const handleLogOut = (event) => {
    try {
      event.preventDefault()
      window.localStorage.removeItem('loggedInUser')
      setUser(null)
      blogService.setToken(null)
      setSuccess(true)
      setMessage('Logged out complete')
    } catch (exception) {
      setSuccess(false)
      setMessage('Error logging out')
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedInJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInJSON) {
      const user = JSON.parse(loggedInJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  // might delete later
  const createBlog = async (obj) => {
    try {
      const newObject = {
        author: obj.author,
        title: obj.title,
        url: obj.url,
        likes: 35,
      }
      await blogService.create(newObject)
      const blogs = await blogService.getAll()
      setSuccess(true)
      setMessage(`New blog ${newObject.title} by ${newObject.author}`)
      setBlogs(blogs)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (exception) {
      console.log(exception)
      // console.log(exception.response.data.error)
      setSuccess(false)
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }
  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            name="Username"
            type="text"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>

        <div>
          password
          <input
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        {loginForm()}
        {message && <Message message={message} success={success} />}
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      {message && <Message message={message} success={success} />}
      <p>
        <strong>{user.username}</strong> is currently logged in
      </p>
      <button type="button" onClick={handleLogOut}>
        Log out
      </button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      ))}
      <Toggle buttonLabel="New blog">
        <CreateNewBlog addBlog={createBlog} />
      </Toggle>
    </div>
  )
}

export default App
