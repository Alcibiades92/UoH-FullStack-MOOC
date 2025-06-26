import { current, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { appendComment } from '../reducer/commentReducer'
import { initializeUsers } from './usersReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      state.filter((blog) => blog.id !== action.payload.id)
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    updateBlog(state, action) {
      return state.map((blog) => {
        return blog.id !== action.payload.id ? blog : action.payload
      })
    },
  },
})

export const inititializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createNewBlog = (newObject) => {
  return async (dispatch, getState) => {
    const newBlog = await blogService.create(newObject)
    const allBlogs = await blogService.getAll()
    dispatch(setBlogs(allBlogs))

    return newBlog
  }
}
export const deleteOneBlog = (id) => {
  return async (dispatch, getState) => {
    await blogService.deleteOne(id.id)
    dispatch(deleteBlog(id))
    dispatch(initializeUsers())
  }
}
export const UpdateOneBlog = (blog) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch(updateBlog(updatedBlog))
    dispatch(initializeUsers())
  }
}

//  handling likes
export const UpdateLikes = (blog) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.updateLikes(blog.id, blog)
    dispatch(updateBlog(updatedBlog))
  }
}
export const AddOneComment = (id, commentObject) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.createComment(id, commentObject)

    dispatch(updateBlog(updatedBlog.populatedBlog))
    dispatch(appendComment(updatedBlog.savedComment))
  }
}
export default blogSlice.reducer

export const { setBlogs, appendBlog, deleteBlog, updateBlog } =
  blogSlice.actions
