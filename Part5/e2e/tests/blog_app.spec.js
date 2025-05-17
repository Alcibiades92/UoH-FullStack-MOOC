const { test, beforeEach, expect, describe } = require("@playwright/test");
const { loginWith } = require("./helper");

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
        await page.getByRole("button", { name: "New blog" }).click();
        await page.getByTestId("title").fill("The man on the silver");
        await page.getByTestId("author").fill("Rainbow");
        await page.getByTestId("url").fill("http://localhost:10000");
        await page.getByRole("button", { name: "Create new blog" }).click();
        await expect(
          page.locator("p", { hasText: "The man on the silver" })
        ).toBeVisible();
      });
    });
  });
});
