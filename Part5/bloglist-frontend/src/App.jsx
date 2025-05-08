import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessase, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userr = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(userr));
      setUser(userr);
      setUsername("");
      setPassword("");

      // console.log(
      //   `You are logged in user ${user.username} with real name ${user.name}`
      // );
    } catch (exception) {
      // setTimeout(() => {
      //   console.log(exception.name);
      // }, 1000);
      console.log(exception);
    }
  };
  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedInJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInJSON) {
      const user = JSON.parse(loggedInJSON);
      setUser(user);
    }
  }, []);
  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            name="Username"
            type="text"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>

        <div>
          password
          <input
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        {loginForm()}
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <button type="button" onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
};

export default App;
