import { useState, useEffect } from 'react'
import Blog from '../../components/Blog'
import blogService from '../../services/blogs'
import loginService from '../../services/login'
import CreateNewBlog from '../../components/CreateNewBlog'
import Message from '../../components/Message'
import Toggle from '../../components/Toggle'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNotification,
  createVanishNotification,
} from '../../reducer/notificationReducer'
import {
  createNewBlog,
  setBlogs,
  inititializeBlogs,
} from '../../reducer/blogReducer'
import { LoginAction, LogOutAction, setUser } from '../../reducer/userReducer'

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const password = event.target.password.value
      const username = event.target.username.value
      console.log(password, username)

      const userr = await dispatch(LoginAction(username, password))
      console.log('userr is ', userr)

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

      dispatch(LogOutAction())

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
  console.log(blogs)
  useEffect(() => {
    const loggedInJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInJSON) {
      const user = JSON.parse(loggedInJSON)
      dispatch(setUser(user))
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
          <input name="username" type="text" data-testid="username" />
        </div>

        <div>
          password
          <input name="password" type="password" data-testid="password" />
        </div>
        <button type="submit">Log in</button>
      </form>
    )
  }

  if (!user) {
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

export default Home
