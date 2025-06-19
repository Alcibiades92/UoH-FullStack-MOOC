import { useState } from 'react'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createVanishNotification } from '../reducer/notificationReducer'
import { setBlogs } from '../reducer/blogReducer'
import { deleteOneBlog, UpdateOneBlog } from '../reducer/blogReducer'
import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleDelete = async () => {
    const decision = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (decision) {
      // await BlogService.deleteOne(blog.id)
      // const blogs = await BlogService.getAll()
      dispatch(deleteOneBlog({ id: blog.id }))

      dispatch(
        createVanishNotification({ content: 'Blog deleted', success: true })
      )
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle} data-testid="blogg">
      <p>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} authored by {blog.author} ,uploaded by {blog.user.name}
        </Link>
      </p>

      <button
        onClick={handleDelete}
        style={{ border: '2px solid red', fontWeight: '600' }}
      >
        Delete Blog
      </button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default Blog
