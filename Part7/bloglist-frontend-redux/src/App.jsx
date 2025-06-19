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
import Users from './views/users/Users'
import Home from './views/home/Home'
import SingleUser from './views/users/SingleUser'
import SingleBlog from './views/singleBlog/SingleBlog'
const App = () => {
  // might delete later

  return (
    <div>
      <div>
        <Link style={{ padding: '1rem' }} to="/users">
          Users
        </Link>
        <Link to="/">Home</Link>
      </div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
    </div>
  )
}

export default App
