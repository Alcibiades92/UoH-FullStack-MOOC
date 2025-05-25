import { createSlice } from "@reduxjs/toolkit";
// import {  current } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterCreator(state, action) {
      const filter = action.payload;

      return filter;
    },
  },
});
// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SET_FILTER": {
//       return action.payload;
//     }
//     default:
//       return state;
//   }
// };

// export const filterCreator = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };
export const { filterCreator } = filterSlice.actions;
export default filterSlice.reducer;
