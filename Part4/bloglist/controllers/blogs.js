const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
// Retrive token from the authorization headder or return null

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    // http://localhost:3003/api/blogs});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
});

blogRouter.post("/", async (request, response, next) => {
  // Get all the users from db and assign the note to a random one
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
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
