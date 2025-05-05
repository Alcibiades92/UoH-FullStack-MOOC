const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
});

blogRouter.post("/", async (request, response, next) => {
  // console.log("POST request for /api/blogs");

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  });

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.patch(`/:id`, async (request, response, next) => {
  const id = request.params.id;

  const updates = request.body.likes;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes: updates },
      { new: true, runValidators: true, upsert: false }
    );
    response.status(200).json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});
module.exports = blogRouter;
