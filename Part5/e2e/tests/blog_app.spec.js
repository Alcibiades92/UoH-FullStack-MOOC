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
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "alcibiades",
        password: "1234",
        name: "alcibiades",
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
        beforeEach(async ({ page, request }) => {
          await createBlog(
            page,
            "The man on the silver",
            "Rainbow",
            "http://localhost:10000"
          );
          await page.getByRole("button", { name: "Cancel" }).click();
          await createBlog(
            page,
            "All Aboard",
            "Deep purple",
            "http://localhost:5005"
          );
          const divElement = await page
            .locator("p", { hasText: "Rainbow" })
            .locator("..");
          await divElement.getByRole("button", { name: "view" }).click();
          await divElement.getByRole("button", { name: "👍" }).click();
          await divElement.getByRole("button", { name: "hide" }).click();
        });

        test("a blog can be liked", async ({ page, request }) => {
          const divElement = await page
            .locator("p", { hasText: "Rainbow" })
            .locator("..");
          await divElement.getByRole("button", { name: "view" }).click();
          await divElement.getByRole("button", { name: "👍" }).click();
          await expect(page.getByText("36")).toBeVisible();
        });
        test("a blog can be deleted", async ({ page }) => {
          page.on("dialog", async (dialog) => await dialog.accept("deleted"));
          const divElement = await page
            .locator("p", { hasText: "Rainbow" })
            .locator("..");
          await divElement.getByRole("button", { name: "Delete Blog" }).click();
          await expect(
            divElement.locator("p", { hasText: "The man on the silver" })
          ).not.toBeVisible();
        });

        describe("Another user ", () => {
          beforeEach(async ({ page }) => {
            await page.getByRole("button", { name: "Log out" }).click();
            await loginWith(page, "alcibiades", "1234");
          });

          test("cannot delete other users blog", async ({ page }) => {
            page.on("dialog", async (dialog) => await dialog.accept("deleted"));
            const divElement = await page
              .locator("p", { hasText: "Rainbow" })
              .locator("..");
            await divElement
              .getByRole("button", { name: "Delete Blog" })
              .click();
            await expect(
              divElement.locator("p", { hasText: "The man on the silver" })
            ).toBeVisible();
          });
          test("tests are ordered in a descending way ", async ({ page }) => {
            const blogs = page.locator('[data-testid="blogg"]');
            await expect(blogs.first()).toBeVisible();
            const count = await blogs.count();

            const likes = [];
            for (let i = 0; i < count; i++) {
              const blog = blogs.nth(i);
              await blog.getByRole("button", { name: "view" }).click();
              const para = await blog
                .getByRole("button", { name: "👍" })
                .locator("..");
              const text = await para.textContent();
              const match = await text.match(/\d+/);
              likes.push(Number(match[0]));
            }
            console.log(likes);
            for (let i = 0; i < likes.length - 1; i++) {
              expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1]);
            }
            // const hm = page.locator("button", { hasText: "hide" });

            // await expect(hm.first()).toBeVisible();
            // const hmCount = await hm.count();
          });
        });
      });
    });
  });
});
