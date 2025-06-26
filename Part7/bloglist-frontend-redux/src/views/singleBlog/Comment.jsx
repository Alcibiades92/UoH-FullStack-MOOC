import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import BlogService from '../../services/blogs'
import {
  updateBlog,
  UpdateOneBlog,
  AddOneComment,
} from '../../reducer/blogReducer'
import { inititializeComments } from '../../reducer/commentReducer'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material'
const Comment = ({ id }) => {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments).filter((comment) => {
    return comment.blog === id
  })

  const singleBlog = useSelector((state) => state.blogs).find((blog) => {
    return blog.id === id
  })

  const handleAddComment = async (event) => {
    event.preventDefault()
    const commentToAdd = { comment: event.target.comment.value }
    dispatch(AddOneComment(singleBlog.id, commentToAdd))
    event.target.comment.value = ''

    // await BlogService.createComment
  }

  return (
    <div>
      <List>
        {singleBlog.comments.length === 0 && (
          <div>No comments yet.You may add</div>
        )}
        {comments.map((comment) => {
          return (
            <>
              <Divider />
              <ListItem key={comment.id}>
                <ListItemText>{comment.comment}</ListItemText>
              </ListItem>
            </>
          )
        })}
      </List>
      <form onSubmit={handleAddComment}>
        <input type="text" name="comment"></input>
        <button type="submit">Add comment</button>
      </form>
    </div>
  )
}

export default Comment
