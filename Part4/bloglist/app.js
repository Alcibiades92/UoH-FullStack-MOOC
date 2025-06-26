const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/config");
const Blog = require("./models/blog.js");
const logger = require("./utils/logger.js");
const middleware = require("./utils/middleware.js");
const blogRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users.js");
const loginRouter = require("./controllers/login.js");
const commentsRouter = require("./controllers/comments.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to DB");
  })
  .catch((error) => {
    logger.error("Error connecting to DB:", error.message); // Logs connection errors
    process.exit(1); // Exit if connection fails
  });
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use(middleware.errorHandler);

module.exports = app;
