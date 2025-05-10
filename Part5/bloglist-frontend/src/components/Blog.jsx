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
    console.log(blog.user);
    const response = await BlogService.update(blog.id, blogToSend);
    const blogs = await BlogService.getAll();
    setBlogs(blogs);
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
    </div>
  );
};

export default Blog;
