import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote, getAnecdotes } from "./requests";
import { updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./context/NotificationContext";
const App = () => {
  const dispatchNotification = useNotificationDispatch();
  const queryClient = useQueryClient();
  const handleVote = async (anecdote) => {
    const anecdoteToUpdate = queryClient
      .getQueryData(["anecdotes"])
      .find((anec) => anecdote.id === anec.id);

    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    };

    voteAnecdoteMutation.mutate(updatedAnecdote);
    // voteAnecdoteMutation.mutate({anecdote.id})
    // const anecdotes = queryClient.getQueryData(["anecdotes"]);
  };
  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      // const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], (anecdotes) => {
        return anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        );
      });

      dispatchNotification({ type: "VOTE", payload: updatedAnecdote.content });
      setTimeout(() => {
        dispatchNotification({ type: "" });
      }, 5000);
    },
  });
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 2,
  });
  if (result.isLoading) {
    return <div>loading data....</div>;
  }
  if (result.isError) {
    return <span>{result.error.message}</span>;
  }

  const anecdotes = result.data;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
