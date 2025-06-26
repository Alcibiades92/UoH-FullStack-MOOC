import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
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
import { LoginAction, LogOutAction, setUser } from './reducer/userReducer'
import CreateUser from './components/CreateUser.jsx'
import Users from './views/users/Users'
import Home from './views/home/Home'
import SingleUser from './views/users/SingleUser'
import SingleBlog from './views/singleBlog/SingleBlog'
import { AppBar, Toolbar, IconButton, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
const App = () => {
  // might delete later

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="/signup" element={<CreateUser />} />
      </Routes>
    </div>
  )
}

export default App
