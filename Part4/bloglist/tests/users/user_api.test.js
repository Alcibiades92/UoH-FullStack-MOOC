const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../../models/user");
const app = require("../../app");
const api = supertest(app);

describe("adding invalid users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.init();
    const passwordHash = await bcrypt.hash("1234", 10);
    const toBeAdded = {
      name: "georgeeee",
      passwordHash,
      username: "JimiTheMan",
    };
    const newUser = new User(toBeAdded);
    await newUser.save({});
  });

  test("fails when adding a username that already exists", async () => {
    const invalidUser = {
      name: "georgeeee",
      password: "1234",
      username: "JimiTheMan",
    };
    const response = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    assert.equal(response.body.error, "Expected username to be unique");
  });

  test("fails when adding a username under 3 chars", async () => {
    const newUser = {
      username: "Li",
      name: "Ketchup",
      password: "1213",
    };
    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    assert.equal(
      response.body.error,
      "Username and name must be at least 3 characters long"
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
