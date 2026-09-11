import { test, expect } from "@playwright/test";

test("hero animation renders, responds to pause, and suspends offscreen", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "WebGL enhancement is desktop only");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const scene = page.locator(".orbit-scene");
  await expect(scene).toHaveAttribute("data-scene", "ready", { timeout: 15000 });
  const canvas = page.locator(".orbit-canvas");
  const first = await canvas.screenshot();
  await expect.poll(async () => (await canvas.screenshot()).equals(first)).toBe(false);
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-rendering", "false");
  await page.getByRole("button", { name: "Pause website animations", exact: true }).click();
  await expect(canvas).toHaveCount(0);
  await expect(page.locator("html")).toHaveClass(/motion-paused/);
  await page.getByRole("button", { name: "Enable website animations", exact: true }).click();
  await page.locator("#hero-title").scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-scene", "ready", { timeout: 15000 });
  await expect(canvas).toHaveCount(1);
});

test("reduced motion never starts WebGL; the illustration remains visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".orbit-fallback")).toHaveCSS("opacity", "1");
  await expect(page.locator(".orbit-canvas")).toHaveCount(0);
  await expect(page.locator(".orbit-fallback-spin")).toHaveCSS("animation-name", "none");
  await expect(page.locator("#hero-title")).toBeVisible();
});
