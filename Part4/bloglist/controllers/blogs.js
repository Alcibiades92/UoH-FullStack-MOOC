const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");

blogRouter.get("/", (request, response) => {
  console.log("GET request for /api/blogs");
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response) => {
  console.log("POST request for /api/blogs");
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
