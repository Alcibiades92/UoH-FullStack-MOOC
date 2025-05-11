import { useState } from "react";
import BlogService from "../services/blogs";
const Blog = ({ blog, setBlogs }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((showAll) => !showAll);
  };
  const handleLike = async () => {
    console.log(blog);
    const blogToSend = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
    };

    const response = await BlogService.update(blog.id, blogToSend);
    const blogs = await BlogService.getAll();
    setBlogs(blogs);
  };
  const handleDelete = async () => {
    const decision = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (decision) {
      await BlogService.deleteOne(blog.id);
      const blogs = await BlogService.getAll();
      setBlogs(blogs);
    }
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <p>Title : {blog.title}</p>

      {showAll && (
        <div>
          <p>Author: {blog.author}</p>
          <p>Url :{blog.url}</p>
          <p>
            Likes : {blog.likes} <button onClick={handleLike}>👍</button>
          </p>
        </div>
      )}
      <button onClick={toggleShowAll}>{showAll ? "hide" : "view"}</button>
      <button
        onClick={handleDelete}
        style={{ border: "2px solid red", fontWeight: "600" }}
      >
        Delete Blog
      </button>
    </div>
  );
};

export default Blog;
