const { test, beforeEach, expect, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", async () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "george2",
        password: "1234",
        name: "Georgios",
      },
    });
    await page.goto("http://localhost:5173");
  });
  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByText("username");
    await expect(locator).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      loginWith(page, "george2", "1234");

      await expect(
        page.getByText("george2 is currently logged in")
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "george2", "123");

      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();

      await expect(
        page.getByText("george2 is currently logged in")
      ).not.toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page, request }) => {
        await loginWith(page, "george2", "1234");
      });

      test("a new blog can be created", async ({ page, request }) => {
        await createBlog(
          page,
          "The man on the silver",
          "Rainbow",
          "http://localhost:10000"
        );
        await expect(
          page.locator("p", { hasText: "The man on the silver" })
        ).toBeVisible();
      });

      describe("When created a  blog", () => {
        beforeEach(async ({ page }) => {
          await createBlog(
            page,
            "The man on the silver",
            "Rainbow",
            "http://localhost:10000"
          );
        });
        test("a blog can be liked", async ({ page, request }) => {
          await page.getByRole("button", { name: "view" }).click();
          await page.getByRole("button", { name: "👍" }).click();
          await expect(page.getByText("36")).toBeVisible();
        });
        test("a blog can be deleted", async ({ page }) => {
          page.on("dialog", async (dialog) => await dialog.accept("deleted"));
          await page.getByRole("button", { name: "Delete Blog" }).click();
          await expect(
            page.locator("p", { hasText: "The man on the silver" })
          ).not.toBeVisible();
        });
      });
    });
  });
});
