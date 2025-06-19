import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateOneBlog } from '../../reducer/blogReducer'
import Comment from './Comment.jsx'

const SingleBlog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const singleBlog = useSelector((state) => state.blogs).find((blog) => {
    return blog.id === id
  })
  console.log('this is ', singleBlog)

  const handleLike = async () => {
    const blogToUpdate = { ...singleBlog, likes: singleBlog.likes + 1 }

    await dispatch(UpdateOneBlog(blogToUpdate))
  }
  return (
    <div>
      <h2>{singleBlog.title}</h2>
      <a href={singleBlog.url}>{singleBlog.url}</a>
      <p>added by : {singleBlog.user.username}</p>
      <p>
        Likes : {singleBlog.likes} <button onClick={handleLike}>Like</button>
      </p>
      <Comment id={id} />
    </div>
  )
}

export default SingleBlog
