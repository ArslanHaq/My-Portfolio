import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const resumePath = "/resume/Muhammad-Arsalan-Resume.pdf";

test("homepage has eight projects and a responsive layout", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Muhammad Arsalan/);
  await expect(page.locator("h1")).toContainText("experiences");
  await expect(page.locator(".project-card:visible")).toHaveCount(8);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  expect(errors).toEqual([]);
});

test("category filtering works", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(3);
  await expect(page.locator("#project-count")).toHaveText("03 projects");
  await page.getByRole("button", { name: "Web3", exact: true }).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(1);
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(8);
});

test("project dialog supports keyboard dismissal and restores focus", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Explore CVVID", exact: true });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("heading", { name: "CVVID", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("theme selection persists after reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();
});

test("project details keep unconfirmed roles and technologies out of the UI", async ({ page }) => {
  await page.goto("/");
  for (const title of ["XcelTube", "Pherrix"]) {
    await page.getByRole("button", { name: `Explore ${title}`, exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: "Interface highlights", exact: true })).toBeVisible();
    await expect(dialog.locator(".dialog-role")).toHaveCount(0);
    await expect(dialog.getByRole("heading", { name: "Technology", exact: true })).toHaveCount(0);
    await expect(dialog.getByRole("link", { name: "Visit project" })).toHaveAttribute("href", /^https:\/\//);
    await page.keyboard.press("Escape");
  }
  await page.getByRole("button", { name: "Explore Fitcoin", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("The linked Webflow website is a product showcase.");
  await expect(page.getByRole("dialog").getByRole("link", { name: "View Fitcoin showcase" })).toHaveAttribute("href", "https://fitcoin-client.webflow.io/");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Explore DDID Wallet", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Visit project" })).toHaveCount(0);
});

test("gallery references match the multi-project presentations", async ({ page }) => {
  await page.goto("/");
  const first = page.locator(".showcase-card").first();
  await expect(first.getByRole("link", { name: /Fitcoin showcase/ })).toHaveAttribute("href", "https://fitcoin-client.webflow.io/");
  await expect(first.getByRole("link", { name: /SupplyED prototype/ })).toHaveAttribute("href", "https://supplyed.vercel.app/");
  await expect(first.getByRole("link", { name: /XcelTube/ })).toHaveAttribute("href", "https://www.xceltube.com/");
  await expect(page.locator(".showcase-card").nth(2)).toContainText("mobile UI concepts");
  await expect(page.locator(".showcase-card").nth(3)).toContainText("sample results");
});

test("resume URL serves the original PDF", async ({ request }) => {
  const response = await request.get(resumePath);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  const original = await readFile(`public${resumePath}`);
  const served = await response.body();
  expect(createHash("sha256").update(served).digest("hex")).toBe(createHash("sha256").update(original).digest("hex"));
});

test("resume button downloads a PDF", async ({ page }) => {
  await page.goto("/");
  const pending = page.waitForEvent("download");
  await page.locator(".contact-resume").click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe("Muhammad-Arsalan-Resume.pdf");
});

test("mobile navigation opens and closes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only control");
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#main-navigation")).toBeVisible();
  await page.getByRole("navigation").getByRole("link", { name: "About", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
});

test("reduced motion and direct resume access are supported", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-paused/);
  await expect(page.locator(".resume-nav")).toHaveAttribute("href", resumePath);
});

test("showcase images load at their natural ratio and open full presentations", async ({ page }) => {
  await page.goto("/");
  const images = page.locator(".showcase-image");
  await expect(images).toHaveCount(5);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0), { timeout: 15_000 }).toBe(true);
    const box = await image.boundingBox();
    expect(box!.width / box!.height).toBeCloseTo(1619 / 971, 1);
  }
  const presentation = page.locator(".showcase-image-link").first();
  const popup = page.waitForEvent("popup");
  await presentation.click();
  const fullImage = await popup;
  await fullImage.waitForLoadState();
  expect(fullImage.url()).toContain("/media/custom-websites.webp");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test("showreel loads only on play and supports seeking", async ({ page, request }) => {
  const mediaRequests: string[] = [];
  page.on("request", request => {
    if (request.url().endsWith(".mp4")) mediaRequests.push(request.url());
  });
  await page.goto("/");
  const video = page.locator(".showreel-video");
  await video.scrollIntoViewIfNeeded();
  await expect(video).toBeVisible();
  expect(mediaRequests).toEqual([]);
  await video.evaluate(async element => {
    const player = element as HTMLVideoElement;
    player.muted = true;
    await player.play();
  });
  await expect.poll(() => video.evaluate(element => (element as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
  expect(mediaRequests.length).toBeGreaterThan(0);
  expect(await video.evaluate(element => (element as HTMLVideoElement).duration)).toBeCloseTo(58, 0);
  const range = await request.get("/media/portfolio-showreel.mp4", { headers: { Range: "bytes=0-1023" } });
  expect(range.status()).toBe(206);
  expect(range.headers()["content-type"]).toContain("video/mp4");
});
