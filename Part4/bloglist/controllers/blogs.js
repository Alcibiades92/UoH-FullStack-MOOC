const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
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
  const blogId = request.params.id;
  // if it misses respond
  if (!request.token) {
    return response.status(401).json({
      error: "Token missing",
    });
  }
  //compare the ids
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const blog = await Blog.findById(blogId);
    console.log(blog.user);
    console.log(blog.user.toString() === decodedToken.id.toString());
    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndDelete(blogId);
      await User.findByIdAndUpdate(decodedToken.id, {
        $pull: { blogs: new mongoose.Types.ObjectId(blog._id) },
      });
      return response.status(204).end();
    }
  } catch (exception) {
    if (exception.name === "JsonWebTokenError")
      return response.status(401).json({ message: "Not Authorized" });

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
