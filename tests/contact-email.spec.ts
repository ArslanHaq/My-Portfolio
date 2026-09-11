import { test, expect } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";
import { createTransport } from "nodemailer";
import { renderContactEmails, portraitContentId } from "../lib/server/contact-email-template";
import { contactMailOptions, type ContactMail } from "../lib/server/smtp-mailer";
import { isContactResult, type ContactMessage } from "../lib/contact";

const data: ContactMessage = {
  name: "Test Visitor",
  email: "visitor@example.test",
  topic: "Website or web application",
  message: "I’m planning a new website for my business and would love to discuss the project.\n\nThe goal is a clear, responsive experience that makes it easy for customers to get in touch.",
};
const options = { siteUrl: "https://portfolio.example.test", replyEmail: "owner@example.test", reference: "0611C30D" };

test("email templates escape submitted content and keep the acknowledgement fixed", () => {
  const input = { ...data, name: '<b>Visitor</b> & "Company"', message: '<img src=x onerror="alert(1)">\nhttps://untrusted.example.test/?a=1&b=2' };
  const templates = renderContactEmails(input, options);
  expect(templates.notification.html).toContain("&lt;b&gt;Visitor&lt;/b&gt; &amp; &quot;Company&quot;");
  expect(templates.notification.html).toContain('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;<br>');
  expect(templates.notification.html).not.toContain('<img src=x');
  expect(templates.notification.text).toContain(input.message);
  for (const content of [templates.confirmation.html, templates.confirmation.text]) {
    expect(content).not.toContain("untrusted.example.test");
    expect(content).not.toContain("Company");
    expect(content).not.toContain(data.email);
  }
  expect(templates.notification.html).toContain('mailto:visitor%40example.test?subject=Re%3A%20Website%20or%20web%20application');
  expect(renderContactEmails(data, { ...options, siteUrl: "javascript:alert(1)" }).confirmation.html).not.toContain("javascript:");
  expect(isContactResult({ ok: true, confirmation: "sent" })).toBe(true);
  expect(isContactResult({ ok: true, confirmation: "unavailable" })).toBe(true);
  expect(isContactResult({ ok: true, confirmation: "invented" })).toBe(false);
});

test("both email envelopes route correctly and the portrait is embedded in the MIME message", async () => {
  const smtp = { host: "smtp.gmail.com", port: 465 as const, user: "sender@example.test", password: "unused", to: options.replyEmail };
  const templates = renderContactEmails(data, options);
  const portrait = await readFile("public/images/muhammad-arsalan-email.jpg");
  for (const [kind, to] of [["notification", smtp.to], ["confirmation", data.email]] as const) {
    const mail: ContactMail = { from: { name: "Muhammad Arsalan", address: smtp.user }, to, replyTo: { name: "Reply recipient", address: kind === "notification" ? data.email : smtp.to }, ...templates[kind], messageId: `<${kind}@example.test>` };
    const messageOptions = contactMailOptions(smtp, mail, portrait);
    expect(messageOptions.envelope).toEqual({ from: smtp.user, to: [to] });
    expect(messageOptions).toMatchObject({ disableFileAccess: true, disableUrlAccess: true });
    expect(messageOptions.attachments?.[0]).toMatchObject({ cid: portraitContentId, content: portrait, contentDisposition: "inline", contentType: "image/jpeg" });
    // Stream transport composes MIME locally; it does not connect to an SMTP server.
    const transport = createTransport({ streamTransport: true, buffer: true });
    try {
      const receipt = await transport.sendMail(messageOptions);
      const mime = receipt.message.toString();
      expect(mime).toContain(`To: ${to}`);
      expect(mime).toContain(`Content-ID: <${portraitContentId}>`);
      expect(mime).toContain("Content-Type: text/plain");
      expect(mime).toContain("Content-Type: text/html");
      expect(mime).toContain("Content-Type: image/jpeg");
    } finally { transport.close(); }
  }
});

test("themed email previews remain readable on desktop and mobile", async ({ page }, testInfo) => {
  const portrait = await readFile("public/images/muhammad-arsalan-email.jpg");
  const templates = renderContactEmails(data, options);
  for (const [kind, template] of Object.entries(templates)) {
    const html = template.html.replace(`cid:${portraitContentId}`, `data:image/jpeg;base64,${portrait.toString("base64")}`);
    await page.setContent(html);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`${kind}.png`), fullPage: true });
    await writeFile(testInfo.outputPath(`${kind}.html`), html);
  }
});
