const { test, beforeEach, expect, describe } = require("@playwright/test");

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
      await page.getByTestId("username").fill("george2");
      await page.getByTestId("password").fill("1234");
      await page.getByRole("button", { name: "Log in" }).click();

      await expect(
        page.getByText("george2 is currently logged in")
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("george2");
      await page.getByTestId("password").fill("123");
      await page.getByRole("button", { name: "Log in" }).click();

      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();

      await expect(
        page.getByText("george2 is currently logged in")
      ).not.toBeVisible();
    });
  });
});
