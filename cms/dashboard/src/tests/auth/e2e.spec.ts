import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";
import { login } from "../helpers";
import wait from "../../utils/wait";

const { beforeAll, describe } = test;
const url = "http://localhost:5173";

describe("auth", () => {
    let page: Page;

    beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        await login({
            page,
            url
        });
    });

    describe("authenticated user", () => {
        test("should have access to user store page", async () => {
            await page.goto(`${url}/store`);
            await wait(1000);
            console.log(page.url());

            expect(page.url()).toContain("store");
        });
    });
});
