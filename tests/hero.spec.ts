import { test, expect } from "@playwright/test";

test("work preview animates, pauses offscreen, and respects the motion control", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const preview = page.locator(".hero-browser");
  await page.locator(".hero-composition").scrollIntoViewIfNeeded();
  const image = preview.locator("img");
  await expect.poll(() => image.evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
  await expect(preview).toHaveCSS("animation-play-state", "running");
  const position = await preview.evaluate(element => getComputedStyle(element).translate);
  await expect.poll(() => preview.evaluate(element => getComputedStyle(element).translate)).not.toBe(position);
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(preview).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Pause website animations", exact: true }).click();
  await page.locator(".hero-composition").scrollIntoViewIfNeeded();
  await expect(preview).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Enable website animations", exact: true }).click();
  await expect(preview).toHaveCSS("animation-play-state", "running");
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("reduced motion keeps the work preview visible and still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const preview = page.locator(".hero-browser");
  await page.locator(".hero-composition").scrollIntoViewIfNeeded();
  await expect(preview).toBeVisible();
  await expect(preview).toHaveCSS("animation-name", "none");
  await expect(page.locator(".hero-code-card")).toHaveCSS("animation-name", "none");
  await expect(page.locator("canvas")).toHaveCount(0);
});
