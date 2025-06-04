import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import Message from './components/Message'
import Toggle from './components/Toggle'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNotification,
  createVanishNotification,
} from './reducer/notificationReducer'
import {
  createNewBlog,
  setBlogs,
  inititializeBlogs,
} from './reducer/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userr = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(userr))
      setUser(userr)
      setUsername('')
      setPassword('')
      blogService.setToken(userr.token)
      dispatch(createVanishNotification({ content: 'Welcome', success: true }))
    } catch (exception) {
      dispatch(
        createVanishNotification({
          content: exception.response.data.error,
          success: false,
        })
      )
    }
  }
  const handleLogOut = (event) => {
    try {
      event.preventDefault()
      window.localStorage.removeItem('loggedInUser')
      setUser(null)
      blogService.setToken(null)
      dispatch(
        createVanishNotification({
          content: 'Logged out complete',
          success: true,
        })
      )
    } catch (exception) {
      dispatch(
        createVanishNotification({
          content: 'Error logging out',
          success: false,
        })
      )
    }
  }

  useEffect(() => {
    dispatch(inititializeBlogs())
  }, [])
  const blogs = useSelector((state) => state.blogs)
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

      const newBl = await dispatch(createNewBlog(newObject))

      console.log(newBl)
      dispatch(
        createVanishNotification({
          // content: '123',
          content: `New blog ${newBl.title} by ${newBl.author}`,
          success: true,
        })
      )
    } catch (exception) {
      console.log(exception)
      dispatch(
        createVanishNotification({
          content: exception.response.data.error,
          success: false,
        })
      )
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
            data-testid="username"
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
            data-testid="password"
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
        <Message />
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Message />
      <p>
        <strong>{user.username}</strong> is currently logged in
      </p>
      <button type="button" onClick={handleLogOut}>
        Log out
      </button>
      <div data-testid="blogs">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        ))}
      </div>
      <Toggle buttonLabel="New blog">
        <CreateNewBlog addBlog={createBlog} />
      </Toggle>
    </div>
  )
}

export default App
