import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import BlogService from '../../services/blogs'
import {
  updateBlog,
  UpdateOneBlog,
  AddOneComment,
} from '../../reducer/blogReducer'
const Comment = ({ id }) => {
  const dispatch = useDispatch()
  // const id =
  const singleBlog = useSelector((state) => state.blogs).find((blog) => {
    return blog.id === id
  })
  const handleAddComment = async (event) => {
    event.preventDefault()
    const commentToAdd = { comment: event.target.comment.value }
    dispatch(AddOneComment(singleBlog.id, commentToAdd))
    // await BlogService.createComment
  }

  return (
    <div>
      <ul>
        {singleBlog.comments.length === 0 && (
          <div>No comments yet.You may add</div>
        )}
        {singleBlog.comments.map((comment) => {
          console.log(comment)
          return <li key={comment.id}>{comment.comment}</li>
        })}
      </ul>
      <form onSubmit={handleAddComment}>
        <input type="text" name="comment"></input>
        <button type="submit">Add comment</button>
      </form>
    </div>
  )
}

export default Comment
