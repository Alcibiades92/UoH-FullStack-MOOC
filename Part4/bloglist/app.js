const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/config");
const Blog = require("./models/blog.js");
const logger = require("./utils/logger.js");
const middleware = require("./utils/middleware.js");
const blogRouter = require("./controllers/blogs.js");

const app = express();
app.use(middleware.requestLogger);
app.use(cors());
app.use(express.json());
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
app.use("/api/blogs", blogRouter);
app.use(middleware.errorHandler);

module.exports = app;
