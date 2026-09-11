import { test, expect } from "@playwright/test";
import { handleContact } from "../lib/server/contact-handler";
import { getSmtpConfig } from "../lib/server/smtp-config";
import { smtpTransportOptions, type ContactMail, type SendContactMail } from "../lib/server/smtp-mailer";

const origin = "https://portfolio.example.test";
const smtp = { host: "smtp.gmail.com", port: 465 as const, user: "sender@example.test", password: "test-password", to: "owner@example.test" };
const config = { smtp, siteUrl: origin };
const submission = {
  name: "Test Visitor",
  email: "visitor@example.test",
  topic: "Website or web application",
  message: "I would like to discuss a new website for my small business.",
  website: "",
  submissionId: "0611c30d-f17a-44c8-8f16-a6652c0cd166",
};

function request(body: unknown = submission, headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/contact`, {
    method: "POST",
    headers: { origin, "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const noDelivery: SendContactMail = async () => { throw new Error("Unexpected provider call"); };

test("SMTP uses fixed addresses and safe reply-to, with stable message IDs", async () => {
  const messages: ContactMail[] = [];
  const transport: SendContactMail = async (settings, mail) => {
    expect(settings).toEqual(smtp);
    messages.push(mail);
    return { accepted: [smtp.to] };
  };
  const first = await handleContact(request({ ...submission, to: "untrusted@example.test", from: "spoofed@example.test" }), config, transport);
  const retry = await handleContact(request(), config, transport);
  const changed = await handleContact(request({ ...submission, message: `${submission.message} Please call next week.` }), config, transport);
  expect(first.status).toBe(200);
  expect(await first.json()).toEqual({ ok: true });
  expect(retry.status).toBe(200);
  expect(changed.status).toBe(200);
  expect(messages[0].to).toBe(smtp.to);
  expect(messages[0].replyTo).toEqual({ name: submission.name, address: submission.email });
  expect(messages[0].from.address).toBe(smtp.user);
  expect(messages[0]).not.toHaveProperty("html");
  expect(messages[0].messageId).toBe(messages[1].messageId);
  expect(messages[0].messageId).not.toBe(messages[2].messageId);
  expect(first.headers.get("cache-control")).toBe("no-store");
});

test("invalid fields return actionable errors before delivery", async () => {
  const response = await handleContact(request({ ...submission, name: "X", email: "invalid", topic: "injected", message: "short" }), config, noDelivery);
  expect(response.status).toBe(400);
  const result = await response.json();
  expect(Object.keys(result.errors).sort()).toEqual(["email", "message", "name", "topic"]);
});

test("cross-origin requests and unsupported media types are rejected", async () => {
  expect((await handleContact(request(submission, { origin: "https://untrusted.example.test" }), config, noDelivery)).status).toBe(403);
  expect((await handleContact(request(submission, { "content-type": "text/plain" }), config, noDelivery)).status).toBe(415);
});

test("malformed JSON, spam fields, and invalid request IDs never send email", async () => {
  const malformed = new Request(`${origin}/api/contact`, { method: "POST", headers: { origin, "content-type": "application/json" }, body: "{" });
  expect((await handleContact(malformed, config, noDelivery)).status).toBe(400);
  expect((await handleContact(request({ ...submission, website: "spam" }), config, noDelivery)).status).toBe(400);
  expect((await handleContact(request({ ...submission, submissionId: "invalid" }), config, noDelivery)).status).toBe(400);
});

test("streamed body limits work without trusting Content-Length", async () => {
  const oversized = request({ ...submission, message: "x".repeat(25 * 1024) });
  expect(oversized.headers.has("content-length")).toBe(false);
  expect((await handleContact(oversized, config, noDelivery)).status).toBe(413);
});

test("missing delivery configuration fails visibly", async () => {
  const response = await handleContact(request(), { smtp: null }, noDelivery);
  expect(response.status).toBe(503);
  expect(await response.json()).toMatchObject({ ok: false });
});

for (const responseCode of [421, 454, 535, 550]) {
  test(`SMTP ${responseCode} never claims success or exposes server details`, async () => {
    const transport: SendContactMail = async () => { throw Object.assign(new Error("private-provider-detail"), { responseCode }); };
    const response = await handleContact(request(), config, transport);
    expect(response.status).toBe(responseCode < 500 ? 503 : 502);
    if (responseCode < 500) expect(response.headers.get("retry-after")).toBe("60");
    const result = await response.text();
    expect(result).not.toContain("private-provider-detail");
    expect(JSON.parse(result).ok).toBe(false);
  });
}

test("network failures and rejected recipients retain an unconfirmed result", async () => {
  const failedTransport: SendContactMail = async () => { throw new DOMException("Timed out", "TimeoutError"); };
  const rejectedRecipient: SendContactMail = async () => ({ accepted: [] });
  const wrongRecipient: SendContactMail = async () => ({ accepted: ["somebody@example.test"] });
  expect((await handleContact(request(), config, failedTransport)).status).toBe(502);
  expect((await handleContact(request(), config, rejectedRecipient)).status).toBe(502);
  expect((await handleContact(request(), config, wrongRecipient)).status).toBe(502);
});

test("SMTP config normalizes Google app passwords and rejects unsafe configuration", () => {
  const env = { SMTP_USER: "owner@gmail.com", SMTP_PASS: "abcd efgh\u00a0ijkl mnop" };
  expect(getSmtpConfig(env)).toMatchObject({ host: "smtp.gmail.com", port: 465, user: env.SMTP_USER, password: "abcdefghijklmnop" });
  expect(getSmtpConfig({ ...env, SMTP_PORT: "587" })?.port).toBe(587);
  for (const overrides of [{ SMTP_PASS: "  " }, { SMTP_PORT: "25" }, { SMTP_PORT: "invalid" }, { SMTP_HOST: "smtp://gmail.com" }, { SMTP_USER: "invalid" }, { CONTACT_TO_EMAIL: "one@example.test,two@example.test" }]) {
    expect(getSmtpConfig({ ...env, ...overrides })).toBeNull();
  }
  expect(getSmtpConfig({ ...env, SMTP_HOST: "smtp.example.test", SMTP_PASS: "password with spaces" })?.password).toBe("password with spaces");
});

test("SMTP enforces TLS for both submission ports and bounded connection timeouts", () => {
  const implicitTLS = smtpTransportOptions(smtp);
  expect(implicitTLS).toMatchObject({ secure: true, auth: { user: smtp.user, pass: smtp.password }, tls: { minVersion: "TLSv1.2", rejectUnauthorized: true }, disableFileAccess: true, disableUrlAccess: true, logger: false, debug: false });
  expect(smtpTransportOptions({ ...smtp, port: 587 })).toMatchObject({ secure: false, requireTLS: true });
  for (const timeout of [implicitTLS.dnsTimeout, implicitTLS.connectionTimeout, implicitTLS.greetingTimeout, implicitTLS.socketTimeout]) {
    expect(timeout).toBeGreaterThan(0);
    expect(timeout).toBeLessThanOrEqual(10000);
  }
});
