import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

function CreateNewBlog({ user, setBlogs }) {
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
      setBlogs(blogs);
    } catch (exception) {
      console.log("error creating user");
      console.log(exception);
      console.log(exception.name);
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
