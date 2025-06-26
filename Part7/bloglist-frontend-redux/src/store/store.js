import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducer/notificationReducer'
import blogReducer from '../reducer/blogReducer'
import userReducer from '../reducer/userReducer'
import commentReducer from '../reducer/commentReducer'
import usersReducer from '../reducer/usersReducer'
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    comments: commentReducer,
    users: usersReducer,
  },
})

export default store
