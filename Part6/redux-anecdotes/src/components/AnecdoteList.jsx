import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
export const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes = useSelector((state) => state.anecdotes).filter(
    (anec) => anec.content.includes(filter)
  );
  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes
  );

  const dispatch = useDispatch();

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};
