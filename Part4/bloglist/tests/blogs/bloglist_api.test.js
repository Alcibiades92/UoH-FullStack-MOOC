const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app.js");

const Blog = require("../../models/blog.js");
const helper = require("../test_helper_api.js");
const api = supertest(app);
const jwt = require("jsonwebtoken");
const helper2 = require("./helper_bloglist_api.js");
const bcrypt = require("bcrypt");
const User = require("../../models/user.js");

/// Create two users here
/// Create users and objects
beforeEach(async () => {
  const saltRounds = 10;
  await Blog.deleteMany({});
  await User.deleteMany({});

  //
  const UserObjects = await Promise.all(
    helper2.initialUsers.map(async ({ password, ...rest }) => {
      return { ...rest, passwordHash: await bcrypt.hash(password, saltRounds) };
    })
  );

  const UserObject = Promise.all(
    UserObjects.map((user) => new User(user).save())
  );
  const usersInDb = await User.find({});

  const BlogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promisedArray = BlogObjects.map((blog) => blog.save());
  await Promise.all(promisedArray);
});
describe("get ", () => {
  test.only("all blogs are returned", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });
});

test("name of unique identifier is id", async () => {
  const blogs = await helper.blogsInDb();
  const blogsIds = blogs.map((blog) => blog.id);
  const blogs_Ids = blogs
    .map((blog) => blog._id)
    .filter((blog) => blog !== undefined);

  assert.ok(blogsIds);

  assert.ok(blogs_Ids.length === 0);
});
//
// describe("post request for a blog", () => {});

test("succeeds witha a valid token ", async () => {
  const user = await User.findOne({ username: "george" });
  tokenForUser = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(tokenForUser, process.env.SECRET);

  const newBlog = {
    title: "Budget Traveller",
    author: "not Georgios",
    url: "https://budgettraveller.org/",
    likes: 25,
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(response.body.title, newBlog.title);
  assert.strictEqual(helper.initialBlogs.length + 1, blogsAtEnd.length);
});

test("missing likes property will set the likes to 0", async () => {
  const user = await User.findOne({ username: "george" });
  tokenForUser = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(tokenForUser, process.env.SECRET);
  const newBlog = {
    title: "Song Analysis: Strobe by deadmau5",
    author: "unknown",
    url: "https://ashovertroubledwater.blogspot.com/2017/08/song-analysis-strobe-by-deadmau5.html",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(response.body.likes, 0);
});

test("missing title property results in bad request", async () => {
  const user = await User.findOne({ username: "george" });
  tokenForUser = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(tokenForUser, process.env.SECRET);
  const newBlog = {
    author: "Viggo mortensen",
    url: "this is not a url",
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("missing url property results in bad request", async () => {
  const user = await User.findOne({ username: "george" });
  tokenForUser = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(tokenForUser, process.env.SECRET);
  const newBlog = {
    author: "Viggo mortensen",
    title: "Lord of the rings blog",
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

describe("deletion of a blog", () => {
  beforeEach(async () => {
    const saltRounds = 10;
    await Blog.deleteMany({});
    await User.deleteMany({});

    //
    const UserObjects = await Promise.all(
      helper2.initialUsers.map(async ({ password, ...rest }) => {
        return {
          ...rest,
          passwordHash: await bcrypt.hash(password, saltRounds),
        };
      })
    );

    const UserObject = Promise.all(
      UserObjects.map((user) => new User(user).save())
    );
    const usersInDb = await User.find({});
    const george = usersInDb[0];

    const BlogObjects = helper.initialBlogs.map(
      (blog) => new Blog({ ...blog, user: george._id })
    );

    const promisedArray = BlogObjects.map((blog) => blog.save());
    await Promise.all(promisedArray);
  });

  test("succeeds with status 204 if id is valid", async () => {
    const user = await User.findOne({ username: "george" });
    tokenForUser = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(tokenForUser, process.env.SECRET);
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((blog) => {
      blog.title;
    });

    assert(!titles.includes(blogToDelete.title));
    assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length);
  });

  test("response body is equal to {} with valid non-existant id", async () => {
    const user = await User.findOne({ username: "george" });
    tokenForUser = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(tokenForUser, process.env.SECRET);
    const nonExistant = "507f1f77bcf86cd799439011";
    const response = await api
      .delete(`/api/blogs/${nonExistant}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    assert.deepStrictEqual(response.body, {});
  });
});

// -----------------------------------------------
describe("updating of a single blog", async () => {
  beforeEach(async () => {
    const saltRounds = 10;
    await Blog.deleteMany({});
    await User.deleteMany({});

    //
    const UserObjects = await Promise.all(
      helper2.initialUsers.map(async ({ password, ...rest }) => {
        return {
          ...rest,
          passwordHash: await bcrypt.hash(password, saltRounds),
        };
      })
    );

    const UserObject = Promise.all(
      UserObjects.map((user) => new User(user).save())
    );
    const usersInDb = await User.find({});
    const george = usersInDb[0];

    const BlogObjects = helper.initialBlogs.map(
      (blog) => new Blog({ ...blog, user: george._id })
    );

    const promisedArray = BlogObjects.map((blog) => blog.save());
    await Promise.all(promisedArray);
  });

  test("with a valid id", async () => {
    const user = await User.findOne({ username: "george" });
    tokenForUser = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(tokenForUser, process.env.SECRET);
    const updatedLikes = { likes: 33 };
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const response = await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    assert.strictEqual(response.body.likes, updatedLikes.likes);
    const response2 = await helper.blogsInDb();

    const likess = response2.map((blog) => blog.likes);

    assert(likess.includes(33));
  });
  test("will fail with 401 if id is not matching", async () => {
    const user = await User.findOne({ username: "gus" });
    tokenForUser = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(tokenForUser, process.env.SECRET);

    const updatedLikes = { likes: 33 };
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const response = await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
  });
});
after(async () => {
  await mongoose.connection.close();
});
