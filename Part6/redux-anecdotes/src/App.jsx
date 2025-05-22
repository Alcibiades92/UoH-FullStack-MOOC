import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "./reducers/anecdoteReducer";
import { NewAnecdote } from "./components/NewAnecdote";
const App = () => {
  // const anecdotes = useSelector((state) => state);
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
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <NewAnecdote />
    </div>
  );
};

export default App;
