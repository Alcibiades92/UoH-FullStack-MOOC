const commentRouter = require("express").Router();
const Comment = require("../models/comment.js");

commentRouter.get("/", async (request, response, next) => {
  try {
    const comments = await Comment.find({});
    console.log(comments);
    response.status(200).json(comments);
  } catch (exception) {
    next(exception);
  }
});

module.exports = commentRouter;
