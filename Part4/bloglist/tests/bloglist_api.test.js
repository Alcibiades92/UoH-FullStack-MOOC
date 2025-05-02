const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");

const Blog = require("../models/blog");
const helper = require("./test_helper_api.js");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const BlogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promisedArray = BlogObjects.map((blog) => blog.save());
  await Promise.all(promisedArray);
});

test.only("all blogs are returned", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
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

test("post requrest creates a new blog", async () => {
  const newBlog = {
    title: "Budget Traveller",
    author: "Kashyap Bhattacharya ",
    url: "https://budgettraveller.org/",
    likes: 25,
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  //   const what = await api.post("/api/blogs").send(newBlog);
  //   console.log(what);
  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(response.body.title, newBlog.title);
  assert.strictEqual(helper.initialBlogs.length + 1, blogsAtEnd.length);
});

test("missing likes property will set the likes to 0", async () => {
  const newBlog = {
    title: "Song Analysis: Strobe by deadmau5",
    author: "unknown",
    url: "https://ashovertroubledwater.blogspot.com/2017/08/song-analysis-strobe-by-deadmau5.html",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(response.body.likes, 0);
});

test("missing title property results in bad request", async () => {
  const newBlog = {
    author: "Viggo mortensen",
    url: "this is not a url",
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("missing url property results in bad request", async () => {
  const newBlog = {
    author: "Viggo mortensen",
    title: "Lord of the rings blog",
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

describe("deletion of a blog", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const BlogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promisedArray = BlogObjects.map((blog) => blog.save());
    await Promise.all(promisedArray);
  });
  test("succeeds with status 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((blog) => {
      blog.title;
    });

    assert(!titles.includes(blogToDelete.title));
    assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length);
  });
  test("response body is equal to {} with valid non-existant id", async () => {
    const nonExistant = "507f1f77bcf86cd799439011";
    const response = await api.delete(`/api/blogs/${nonExistant}`).expect(204);
    assert.deepStrictEqual(response.body, {});
  });
});

// -----------------------------------------------
describe("updating of a single blog", async () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const BlogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promisedArray = BlogObjects.map((blog) => blog.save());
    await Promise.all(promisedArray);
  });

  test("with a valid id", async () => {
    const updatedLikes = { likes: 33 };
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const response = await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200);

    assert.strictEqual(response.body.likes, updatedLikes.likes);
    const response2 = await helper.blogsInDb();

    const likess = response2.map((blog) => blog.likes);

    assert(likess.includes(33));
  });
});
after(async () => {
  await mongoose.connection.close();
});
