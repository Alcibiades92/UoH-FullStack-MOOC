import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const getId = () => Number((100000 * Math.random()).toFixed(0));

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    createAnecdote(state, action) {
      const content = action.payload;

      state.push(content);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "VOTE": {
//       const id = action.payload.id;
//       const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       };
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : changedAnecdote
//       );
//     }
//     case "CREATE": {
//       return [...state, action.payload];
//     }
//     default:
//       return state;
//   }
// };

// CREATE ANECDOTE ACTION CREAATOR

// export const createAnecdote = (anecdote) => {
//   const newObj = {
//     type: "CREATE",
//     payload: asObject(anecdote),
//   };
//   console.log(newObj);
//   return newObj;
// };
// VOTE ACTION CREATOR
// export const voteFor = (id) => {
//   return { type: "VOTE", payload: { id } };
// };
export const { voteFor, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
