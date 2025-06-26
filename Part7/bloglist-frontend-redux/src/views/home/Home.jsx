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
import { inititializeComments } from '../../reducer/commentReducer'
import { LoginAction, LogOutAction, setUser } from '../../reducer/userReducer'

import { initializeUsers } from '../../reducer/usersReducer'
import { Link } from 'react-router-dom'
// style imports

import { TextField, Button, Box, Container, List } from '@mui/material'
const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const password = event.target.password.value
      const username = event.target.username.value

      const userr = await dispatch(LoginAction(username, password))

      dispatch(
        createVanishNotification({
          content: 'Welcome',
          success: true,
          severity: 'success',
        })
      )
    } catch (exception) {
      dispatch(
        createVanishNotification({
          content: exception.response.data.error,
          success: false,
          severity: 'error',
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
          severity: 'success',
        })
      )
    } catch (exception) {
      dispatch(
        createVanishNotification({
          content: 'Error logging out',
          success: false,
          severity: 'error',
        })
      )
    }
  }

  useEffect(() => {
    dispatch(inititializeBlogs())
    dispatch(inititializeComments())
    dispatch(initializeUsers())
  }, [])
  const blogs = useSelector((state) => state.blogs)
  // delete after

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
      dispatch(initializeUsers())
      dispatch(
        createVanishNotification({
          // content: '123',
          content: `New blog ${newBl.title} by ${newBl.author}`,
          success: true,
          severity: 'success',
        })
      )
    } catch (exception) {
      dispatch(
        createVanishNotification({
          content: exception.response.data.error,
          success: false,
          severity: 'error',
        })
      )
    }
  }

  // Style LoginForm
  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            name="username"
            type="text"
            data-testid="username"
          />
        </div>

        <div>
          <TextField
            label="Password"
            name="password"
            type="password"
            data-testid="password"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Log in
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          component={Link}
          to="/signup"
        >
          Sign up
        </Button>
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
        <List
          sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
        >
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
          ))}
        </List>
      </div>

      <Toggle buttonLabel="New blog">
        <CreateNewBlog addBlog={createBlog} />
      </Toggle>
    </div>
  )
}

export default Home
