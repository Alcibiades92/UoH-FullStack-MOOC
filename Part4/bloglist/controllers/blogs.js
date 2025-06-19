const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const Comment = require("../models/comment.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const middleware = require("../utils/middleware.js");

// Retrive token from the authorization headder or return null

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate("user", {
        username: 1,
        name: 1,
      })
      .populate("comments", {
        comment: 1,
      });
    // http://localhost:3003/api/blogs});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    // Get all the users from db and assign the note to a random one
    const body = request.body;

    const user = request.user;
    console.log(user);
    if (!user) {
      return response.status(401).json({ error: "token invalid" });
    }
    const userObject = await User.findById(user.toString());

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.toString(),
    });

    try {
      const savedBlog = await blog.save();
      userObject.blogs = userObject.blogs.concat(savedBlog._id);
      await userObject.save();
      response.status(201).json(savedBlog);
    } catch (exception) {
      next(exception);
    }
  }
);

blogRouter.delete(
  `/:id`,
  middleware.userExtractor,
  async (request, response, next) => {
    const blogId = request.params.id;
    // if it misses respond
    if (!request.token) {
      return response.status(401).json({
        error: "Token missing",
      });
    }
    //compare the ids
    try {
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return response.status(204).end();
      }
      const user = request.user;

      console.log(blog.user.toString() === user.toString());
      if (blog.user.toString() === user.toString()) {
        await Blog.findByIdAndDelete(blogId);
        await User.findByIdAndUpdate(user, {
          $pull: { blogs: new mongoose.Types.ObjectId(blog._id) },
        });
        return response.status(204).end();
      }
    } catch (exception) {
      console.log(exception.name);
      if (exception.name === "JsonWebTokenError")
        return response.status(401).json({ message: "Not Authorized" });

      next(exception);
    }
  }
);

blogRouter.patch(
  `/:id`,
  middleware.userExtractor,
  async (request, response, next) => {
    // if it misses respond
    if (!request.token) {
      return response.status(401).json({
        error: "Token missing",
      });
    }
    const id = null || request.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).end();
    }
    const user = request.user;

    const updates = request.body.likes;
    if (!(user.toString() === blog.user.toString())) {
      console.log("Unauthorized");
      return response.status(401).send({ error: "Not Authorized" });
    }
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
  }
);

blogRouter.put(
  `/:id`,
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;
    if (!request.token) {
      return response.status(401).json({
        error: "Token missing",
      });
    }
    const id = null || request.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).end();
    }
    const user = request.user;
    console.log(user, "user");
    if (!(user.toString() === blog.user.toString())) {
      console.log("Unauthorized");
      return response.status(401).send({ error: "Not Authorized" });
    }
    try {
      const BlogToBeUpdated = await Blog.findById(id);
      console.log(BlogToBeUpdated.user);
      BlogToBeUpdated.title = body.title;
      BlogToBeUpdated.author = body.author;
      BlogToBeUpdated.url = body.url;
      BlogToBeUpdated.likes = body.likes;
      // BlogToBeUpdated.user = body.user;

      await BlogToBeUpdated.save();
      response.json(BlogToBeUpdated);
    } catch (exception) {
      next(exception);
    }
  }
);

blogRouter.post("/:id/comments", async (request, response, next) => {
  const body = request.body;

  const BlogId = null || request.params.id;
  const blogToAddComment = await Blog.findById(BlogId);
  const commentToAdd = new Comment({
    comment: body.comment,
    blog: blogToAddComment._id,
  });

  try {
    const savedComment = await commentToAdd.save();
    blogToAddComment.comments = blogToAddComment.comments.concat(
      savedComment._id
    );
    const savedBlog = await blogToAddComment.save();
    const populatedBlog = await Blog.findById(BlogId)
      .populate("user", {
        username: 1,
        name: 1,
      })
      .populate("comments", {
        comment: 1,
      });
    console.log(savedBlog);
    console.log(populatedBlog);
    response.status(201).json(populatedBlog);
  } catch (exception) {
    next(exception);
  }
});
module.exports = blogRouter;
