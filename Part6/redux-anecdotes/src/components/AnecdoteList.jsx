import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
export const AnecdoteList = () => {
  const sortedAnecdotes = useSelector((state) =>
    [...state].sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteFor(id));
    console.log("vote", id);
  };

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};
