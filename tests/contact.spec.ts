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
  await expect(contact.locator("form")).not.toHaveAttribute("data-availability", "checking");
  if (await send.isDisabled()) await expect(contact).toContainText("The form is currently unavailable.");
});

test("contact form validates, retains failed messages, and confirms accepted submissions", async ({ page }) => {
  const submissions: Record<string, unknown>[] = [];
  await page.route("**/api/contact", async route => {
    if (route.request().method() === "GET") {
      await route.fulfill({ json: { available: true } });
      return;
    }
    submissions.push(route.request().postDataJSON());
    if (submissions.length === 1) {
      await route.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ ok: false, message: "Sending wasn’t confirmed. Please retry the same message." }) });
    } else {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, confirmation: "sent" }) });
    }
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const form = page.locator(".contact-form-fields");
  await form.scrollIntoViewIfNeeded();
  const send = form.getByRole("button", { name: "Send message", exact: true });
  await expect(form).toHaveAttribute("data-configured", "true");
  await expect(form).toHaveAttribute("data-ready", "true");
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
  await expect(form.getByRole("status")).toContainText("A confirmation email is on its way");
  await expect(form.getByLabel("Your message")).toHaveValue("");
  expect(submissions).toHaveLength(2);
  expect(submissions[0].submissionId).toBe(submissions[1].submissionId);
});

test("a failed confirmation still displays the accepted enquiry and clears the form", async ({ page }) => {
  await page.route("**/api/contact", async route => {
    await route.fulfill({ json: route.request().method() === "GET" ? { available: true } : { ok: true, confirmation: "unavailable" } });
  });
  await page.goto("/");
  const form = page.locator(".contact-form-fields");
  await form.scrollIntoViewIfNeeded();
  await expect(form).toHaveAttribute("data-configured", "true");
  await form.getByLabel("Your name").fill("Test Visitor");
  await form.getByLabel("Email address").fill("visitor@example.test");
  await form.getByLabel("What can I help with?").selectOption("Website or web application");
  await form.getByLabel("Your message").fill("I would like to discuss a new website for my business.");
  await form.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(form.getByRole("status")).toContainText("I have your enquiry and will reply by email");
  await expect(form.locator(".contact-feedback")).toHaveClass(/is-success/);
  await expect(form.getByLabel("Your message")).toHaveValue("");
});

test("availability is checked near the form and recovers through manual retry", async ({ page }) => {
  let checks = 0;
  await page.route("**/api/contact", async route => {
    expect(route.request().method()).toBe("GET");
    checks++;
    if (checks === 1) await route.abort("failed");
    else await route.fulfill({ json: { available: checks > 2 } });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(checks).toBe(0);
  const form = page.locator(".contact-form-fields");
  await form.scrollIntoViewIfNeeded();
  await expect(form).toHaveAttribute("data-availability", "error");
  await expect(form.getByRole("button", { name: "Send message", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "try again", exact: true }).click();
  await expect(form).toHaveAttribute("data-availability", "unavailable");
  await expect(page.locator(".contact-availability")).toContainText("The form is currently unavailable.");
  await page.getByRole("button", { name: "try again", exact: true }).click();
  await expect(form).toHaveAttribute("data-availability", "available");
  await expect(form.getByRole("button", { name: "Send message", exact: true })).toBeEnabled();
  expect(checks).toBe(3);
});

test("runtime availability is uncached and only returns a boolean", async ({ request }) => {
  const response = await request.get("/api/contact");
  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toContain("no-store");
  const result = await response.json();
  expect(Object.keys(result)).toEqual(["available"]);
  expect(typeof result.available).toBe("boolean");
});
