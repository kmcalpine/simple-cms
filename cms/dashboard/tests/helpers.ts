import { devUser } from "./credentials";
import type { Page } from "@playwright/test";

type LoginArgs = {
    page: Page;
    url: string;
};

export const login = async (args: LoginArgs): Promise<void> => {
    const { page, url } = args;

    await page.goto(`${url}/login`);
    await page.fill("#email", devUser.email);
    await page.fill("#password", devUser.password);
    await page.click("[type=submit]");
    await page.waitForURL(url);
};
