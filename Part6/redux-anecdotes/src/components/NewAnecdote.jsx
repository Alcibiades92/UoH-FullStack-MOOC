import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

export const NewAnecdote = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log(content);
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
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
