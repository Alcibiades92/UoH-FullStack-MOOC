const usersRouter = require("express").Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response, next) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    author: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  console.log(request.body);
  if (username.length < 3 || name.length < 3) {
    return response
      .status(400)
      .json({ error: "Username and name must be at least 3 characters long" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
