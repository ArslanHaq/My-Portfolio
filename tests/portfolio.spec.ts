import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const resumePath = "/resume/Muhammad-Arsalan-Resume.pdf";

test("homepage has six projects and a responsive layout", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Muhammad Arsalan/);
  await expect(page.locator("h1")).toContainText("engineered.");
  await expect(page.locator(".project-card:visible")).toHaveCount(6);
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
  await expect(page.locator(".project-card:visible")).toHaveCount(6);
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
  await page.locator(".resume-nav").click();
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
