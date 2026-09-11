import { test, expect } from "@playwright/test";

test("contact details and social links are correct and responsive", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/muhammadarsalanulhaq/");
  await expect(contact.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/ArslanHaq");
  await expect(contact.getByRole("link", { name: /Fiverr/ })).toHaveAttribute("href", "https://www.fiverr.com/s/50rr0vb");
  await expect(contact.getByRole("link", { name: "0309 3244976" })).toHaveAttribute("href", "tel:+923093244976");
  await expect(contact).toContainText("Based in Islamabad, Pakistan");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const send = contact.getByRole("button", { name: "Send message", exact: true });
  if (await send.isDisabled()) await expect(contact).toContainText("The form is currently unavailable.");
});

test("contact form validates, retains failed messages, and confirms accepted submissions", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const form = page.locator(".contact-form-fields");
  const send = form.getByRole("button", { name: "Send message", exact: true });
  test.skip(await form.getAttribute("data-configured") !== "true", "Run against a preview with delivery configuration; requests are mocked.");
  await expect(form).toHaveAttribute("data-ready", "true");
  const submissions: Record<string, unknown>[] = [];
  await page.route("**/api/contact", async route => {
    submissions.push(route.request().postDataJSON());
    if (submissions.length === 1) {
      await route.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ ok: false, message: "Sending wasn’t confirmed. Please retry the same message." }) });
    } else {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    }
  });
  await send.click();
  await expect(form.getByLabel("Your name")).toBeFocused();
  await expect(page.locator("#contact-name-error")).toBeVisible();
  expect(submissions).toHaveLength(0);
  await form.getByLabel("Your name").fill("Test Visitor");
  await form.getByLabel("Email address").fill("visitor@example.test");
  await form.getByLabel("What can I help with?").selectOption("Website or web application");
  const message = "I would like to discuss a new website for my small business.";
  await form.getByLabel("Your message").fill(message);
  await send.click();
  await expect(form.getByRole("status")).toContainText("Sending wasn’t confirmed.");
  await expect(form.getByLabel("Your message")).toHaveValue(message);
  await send.click();
  await expect(form.getByRole("status")).toContainText("Your message has been submitted");
  await expect(form.getByLabel("Your message")).toHaveValue("");
  expect(submissions).toHaveLength(2);
  expect(submissions[0].submissionId).toBe(submissions[1].submissionId);
});
