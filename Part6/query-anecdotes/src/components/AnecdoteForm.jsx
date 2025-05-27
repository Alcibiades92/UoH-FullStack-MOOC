import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../context/NotificationContext";
const AnecdoteForm = () => {
  const dispatchNotification = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatchNotification({ type: "CREATE", payload: newAnecdote.content });
      setTimeout(() => {
        dispatchNotification({ type: "" });
      }, 5000);
    },

    onError: (message) => {
      // console.log(message);
      // console.log(message.response.data.error);
      dispatchNotification({
        type: "ERR",
        payload: message.response.data.error,
      });
      setTimeout(() => {
        dispatchNotification({
          type: "ERR",
          payload: message.response.data.error,
        });
      }, 5000);
    },
    // queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
