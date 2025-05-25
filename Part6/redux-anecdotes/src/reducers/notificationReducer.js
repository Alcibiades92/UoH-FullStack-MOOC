import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "This is a notification",
  reducers: {
    voteNotification(state, action) {
      return `${action.payload}`;
    },
    clearNotification() {
      return "";
    },
    createNotification(state, action) {
      return `${action.payload}`;
    },
  },
});

export default notificationSlice.reducer;
export const { voteNotification, clearNotification, createNotification } =
  notificationSlice.actions;

export const setNotification = (payload, time) => {
  return async (dispatch) => {
    dispatch(createNotification(payload));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};
