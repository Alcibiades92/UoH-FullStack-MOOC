import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import Message from './components/Message'
import Toggle from './components/Toggle'
import { useDispatch } from 'react-redux'
import { createNotification } from './reducer/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
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

      dispatch(createNotification({ content: 'Welcome', success: true }))
      setTimeout(() => {
        dispatch(createNotification({ content: '' }))
      }, 3000)
    } catch (exception) {
      dispatch(
        createNotification({
          content: exception.response.data.error,
          success: false,
        })
      )
      setTimeout(() => {
        dispatch(createNotification({ content: '', success: false }))
      }, 5000)
    }
  }
  const handleLogOut = (event) => {
    try {
      event.preventDefault()
      window.localStorage.removeItem('loggedInUser')
      setUser(null)
      blogService.setToken(null)
      dispatch(
        createNotification({ content: 'Logged out complete', success: true })
      )
      setTimeout(() => {
        dispatch(createNotification({ content: '', success: true }))
      }, 5000)
    } catch (exception) {
      dispatch(
        createNotification({ content: 'Error logging out', success: false })
      )
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
      console.log(12)
      dispatch(
        createNotification({
          // content: '123',
          content: `New blog ${newObject.title} by ${newObject.author}`,
          success: true,
        })
      )

      setBlogs(blogs)
      setTimeout(() => {
        dispatch(createNotification({ content: '', success: true }))
      }, 3000)
    } catch (exception) {
      console.log(exception)

      dispatch(
        createNotification({
          content: exception.response.data.error,
          success: false,
        })
      )

      setTimeout(() => {
        dispatch(createNotification({ content: '' }))
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
