import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  clearNotification,
} from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log(content);
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(createNotification(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
  return (
    <>
      <h2>Create new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
