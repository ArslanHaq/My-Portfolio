import { test, expect } from "@playwright/test";

test("cursor follows the mouse, settles, and preserves native controls", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Mouse enhancement only");
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  const cursor = page.locator(".cursor-aura");
  await page.mouse.move(100, 200);
  await page.mouse.move(280, 250);
  await expect.poll(() => cursor.evaluate(element => {
    const box = element.getBoundingClientRect();
    return Math.abs(box.x + 20 - 280) + Math.abs(box.y + 20 - 250);
  })).toBe(0);
  await expect(cursor).toHaveCSS("opacity", "1");
  await expect(cursor).toHaveCSS("pointer-events", "none");
  expect(await page.locator("body").evaluate(element => getComputedStyle(element).cursor)).not.toBe("none");
  const idleWrites = await cursor.evaluate(element => new Promise<number>(resolve => {
    let writes = 0;
    const observer = new MutationObserver(records => { writes += records.length; });
    observer.observe(element, { attributes: true, attributeFilter: ["style"] });
    setTimeout(() => { observer.disconnect(); resolve(writes); }, 250);
  }));
  expect(idleWrites).toBe(0);
  await page.locator(".hero-buttons .button-primary").hover();
  await expect(cursor).toHaveAttribute("data-active", "true");
  await page.keyboard.press("Tab");
  await expect(cursor).toHaveCSS("opacity", "0");
  await page.locator(".showreel-video").hover();
  await expect(cursor).toHaveCSS("opacity", "0");
});

test("scroll reveals preserve hover and stop offscreen loops", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop motion only");
  await page.goto("/");
  const artwork = page.locator(".discipline-track");
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveCSS("animation-play-state", "running");
  const card = page.locator("#project-cvvid");
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveCSS("opacity", "1");
  await expect(artwork).toHaveCSS("animation-play-state", "paused");
  await card.hover();
  await expect.poll(() => card.evaluate(element => getComputedStyle(element).transform)).not.toBe("none");
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/motion-paused/);
  await expect(page.locator(".cursor-aura")).toHaveCSS("display", "none");
  await expect(artwork).toHaveCSS("animation-play-state", "paused");
  await expect(page.locator(".showcase-card").last()).toHaveCSS("opacity", "1");
});

test("reduced motion updates live and touch devices have no cursor effect", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.mouse.move(150, 150);
    await expect(page.locator(".cursor-aura")).toHaveCSS("display", "none");
    await expect(page.locator("canvas")).toHaveCount(0);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveClass(/motion-paused/);
  await expect(page.locator(".cursor-aura")).toHaveCSS("display", "none");
  await expect(page.locator(".showcase-card").last()).toHaveCSS("opacity", "1");
  await expect(page.locator(".showcase-card").last()).toHaveCSS("translate", "none");
});

test("content stays visible without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  // Check the server-rendered content independently of media network completion.
  await page.goto(baseURL!, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#project-cvvid")).toHaveCSS("opacity", "1");
  await expect(page.locator(".showcase-card").last()).toHaveCSS("opacity", "1");
  await expect(page.locator(".cursor-aura")).toHaveCSS("opacity", "0");
  await context.close();
});
