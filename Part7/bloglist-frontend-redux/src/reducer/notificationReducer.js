import { current, createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { content: '', success: null, severity: 'success' },
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
  },
})

export const createVanishNotification = (notification) => {
  return async (dispatch, getState) => {
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(
        createNotification({ content: '', success: false, severity: 'success' })
      )
    }, 3500)
  }
}

export default notificationSlice.reducer
export const { createNotification } = notificationSlice.actions
