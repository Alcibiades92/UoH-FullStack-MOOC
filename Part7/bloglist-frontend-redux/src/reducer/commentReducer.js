import { current, createSlice } from '@reduxjs/toolkit'
import CommentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const inititializeComments = () => {
  return async (dispatch) => {
    const comments = await CommentService.getAll()
    dispatch(setComments(comments))
  }
}

export default commentSlice.reducer
export const { setComments, appendComment } = commentSlice.actions
