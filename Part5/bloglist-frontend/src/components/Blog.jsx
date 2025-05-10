import { useState } from "react";
const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false);
  console.log(blog);
  const toggleShowAll = () => {
    setShowAll((showAll) => !showAll);
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
          <p>Likes : {blog.likes}</p>
        </div>
      )}
      <button onClick={toggleShowAll}>{showAll ? "hide" : "view"}</button>
    </div>
  );
};

export default Blog;
