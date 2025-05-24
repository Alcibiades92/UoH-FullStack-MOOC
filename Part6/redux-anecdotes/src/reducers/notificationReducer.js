import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "This is a notification",
  reducers: {
    voteNotification(state, action) {
      return `Voted for ${action.payload}`;
    },
    clearNotification() {
      return "";
    },
    createNotification(state, action) {
      return `You created a new anecdote ${action.payload}`;
    },
  },
});

export default notificationSlice.reducer;
export const { voteNotification, clearNotification, createNotification } =
  notificationSlice.actions;
