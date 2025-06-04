import { useState } from 'react'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createVanishNotification } from '../reducer/notificationReducer'
import { setBlogs } from '../reducer/blogReducer'
import { deleteOneBlog, UpdateOneBlog } from '../reducer/blogReducer'
const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  const dispatch = useDispatch()

  const toggleShowAll = () => {
    setShowAll((showAll) => !showAll)
  }
  const handleLike = async () => {
    const blogToSend = {
      ...blog,
      likes: blog.likes + 1,
      // title: blog.title,
      // author: blog.author,
      // url: blog.url,
      // id: blog.id,
      // user: blog.user,
      // likes: blog.likes + 1,
    }
    dispatch(UpdateOneBlog(blogToSend))
    // const response = await BlogService.update(blog.id, blogToSend)
    // console.log(response)
    // const blogs = await BlogService.getAll()
    // dispatch(setBlogs(blogs))
  }
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
      <p>{blog.title}</p>
      <p>{blog.author}</p>

      {showAll && <Button blog={blog} handleLike={handleLike} />}
      <button onClick={toggleShowAll} data-testid="show">
        {showAll ? 'hide' : 'view'}
      </button>
      <button
        onClick={handleDelete}
        style={{ border: '2px solid red', fontWeight: '600' }}
      >
        Delete Blog
      </button>
    </div>
  )
}

export const Button = ({ blog, handleLike }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>
        {blog.likes} <button onClick={handleLike}>👍</button>
      </p>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default Blog
