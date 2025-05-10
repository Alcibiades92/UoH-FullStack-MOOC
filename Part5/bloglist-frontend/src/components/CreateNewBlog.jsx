import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

function CreateNewBlog({ user, setBlogs, setMessage, setSuccess }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = async (event, user) => {
    event.preventDefault();
    try {
      const newObject = {
        author,
        title,
        url,
        likes: 35,
      };
      await blogService.create(newObject);
      const blogs = await blogService.getAll();
      setSuccess(true);
      setMessage(`New blog ${newObject.title} by ${newObject.author}`);
      setBlogs(blogs);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (exception) {
      console.log(exception.response.data.error);
      setSuccess(false);
      setMessage(exception.response.data.error);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event, user)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="Author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label>Url</label>
          <input
            type="url"
            name="Url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">Create new Blog</button>
      </form>
    </div>
  );
}

export default CreateNewBlog;
