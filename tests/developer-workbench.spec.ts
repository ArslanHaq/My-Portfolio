import { test, expect } from "@playwright/test";

test("developer animation pauses offscreen and follows the motion control", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const stage = page.locator(".hero-composition");
  const signal = page.locator(".workbench-signal");
  await stage.scrollIntoViewIfNeeded();
  await expect(page.locator(".hero img,.hero canvas,.hero video")).toHaveCount(0);
  await expect(signal).toHaveCSS("animation-play-state", "running");
  const position = await signal.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => signal.evaluate(element => getComputedStyle(element).transform)).not.toBe(position);
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(signal).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Pause website animations", exact: true }).click();
  await stage.scrollIntoViewIfNeeded();
  await expect(signal).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Enable website animations", exact: true }).click();
  await expect(signal).toHaveCSS("animation-play-state", "running");
});

test("desktop and mobile previews switch without layout shifts or hidden-view animation", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const stage = page.locator(".hero-composition");
  await stage.scrollIntoViewIfNeeded();
  const initial = await stage.boundingBox();
  const desktop = page.locator(".workbench-output-desktop");
  const mobile = page.locator(".workbench-output-mobile");
  await expect(desktop).toHaveCSS("visibility", "visible");
  await expect(mobile.locator(".workbench-tile").first()).toHaveCSS("animation-play-state", "paused");
  const mobileButton = page.getByRole("button", { name: "Mobile preview", exact: true });
  await mobileButton.click();
  await expect(mobileButton).toHaveAttribute("aria-pressed", "true");
  await expect(mobile).toHaveCSS("opacity", "1");
  await expect(desktop).toHaveCSS("visibility", "hidden");
  await expect(desktop.locator(".workbench-tile").first()).toHaveCSS("animation-play-state", "paused");
  await expect(mobile.locator(".workbench-tile").first()).toHaveCSS("animation-play-state", "running");
  const changed = await stage.boundingBox();
  expect(changed?.height).toBe(initial?.height);
  expect(changed?.width).toBe(initial?.width);
  const desktopButton = page.getByRole("button", { name: "Desktop preview", exact: true });
  await desktopButton.focus();
  await page.keyboard.press("Enter");
  await expect(desktopButton).toHaveAttribute("aria-pressed", "true");
  await expect(desktop).toHaveCSS("visibility", "visible");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test("reduced motion keeps the interface visible and supports preview controls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator(".hero-composition").scrollIntoViewIfNeeded();
  for (const selector of [".workbench-code-focus", ".workbench-caret", ".workbench-signal", ".workbench-output-desktop .workbench-tile-one"]) {
    await expect(page.locator(selector)).toHaveCSS("animation-name", "none");
  }
  await expect(page.locator(".workbench-output-desktop")).toBeVisible();
  await page.getByRole("button", { name: "Mobile preview", exact: true }).click();
  await expect(page.locator(".workbench-output-mobile")).toHaveCSS("visibility", "visible");
  await expect(page.locator(".workbench-output-mobile .workbench-tile-one")).toHaveCSS("opacity", "1");
});

test("the developer illustration remains visible without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!, { waitUntil: "domcontentloaded" });
  await expect(page.locator(".workbench-editor")).toBeVisible();
  await expect(page.locator(".workbench-output-desktop")).toBeVisible();
  await expect(page.locator(".workbench-controls")).toBeHidden();
  await expect(page.locator(".hero img")).toHaveCount(0);
  await context.close();
});
