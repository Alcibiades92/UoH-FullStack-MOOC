import { current, createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { content: '', success: null },
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
  },
})

export default notificationSlice.reducer
export const { createNotification } = notificationSlice.actions
