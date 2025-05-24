import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "This is a notification",
  reducers: {
    voteNotification(state, action) {
      return state;
    },
  },
});

export default notificationSlice.reducer;
export const { voteNotification } = notificationSlice.actions;
