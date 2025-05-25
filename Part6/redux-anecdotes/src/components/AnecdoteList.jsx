import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
// import anecdotesService from "../services/anecdotes";

export const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);

  const filteredAnecdotes = useSelector((state) => state.anecdotes).filter(
    (anec) => anec.content.includes(filter)
  );
  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes
  );

  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(voteFor(anecdote));
    dispatch(setNotification(`You voted for ${anecdote.content}`, 10));
  };

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};
