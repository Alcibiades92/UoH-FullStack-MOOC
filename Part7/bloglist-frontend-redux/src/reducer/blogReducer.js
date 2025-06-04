import { current, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      console.log(current(state))
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
    console.log(newBlog)
    dispatch(appendBlog(newBlog))
    return newBlog
  }
}
export const deleteOneBlog = (id) => {
  console.log(id)
  return async (dispatch, getState) => {
    await blogService.deleteOne(id.id)
    dispatch(deleteBlog(id))
  }
}
export const UpdateOneBlog = (blog) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch(updateBlog(updatedBlog))
  }
}
export default blogSlice.reducer

export const { setBlogs, appendBlog, deleteBlog, updateBlog } =
  blogSlice.actions
