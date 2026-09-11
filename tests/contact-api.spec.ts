import { test, expect } from "@playwright/test";
import { handleContact } from "../lib/server/contact-handler";

const origin = "https://portfolio.example.test";
const config = { apiKey: "test-key", from: "Portfolio <sender@example.test>", to: "owner@example.test", siteUrl: origin };
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

const noDelivery: typeof fetch = async () => { throw new Error("Unexpected provider call"); };

test("delivery uses a fixed recipient and reply-to, with stable retry keys", async () => {
  const messages: { key: string | null; body: Record<string, unknown> }[] = [];
  const transport: typeof fetch = async (url, init) => {
    expect(url).toBe("https://api.resend.com/emails");
    messages.push({ key: new Headers(init?.headers).get("Idempotency-Key"), body: JSON.parse(String(init?.body)) });
    return Response.json({ id: "test-receipt" });
  };
  const first = await handleContact(request({ ...submission, to: "untrusted@example.test" }), config, transport);
  const retry = await handleContact(request(), config, transport);
  const changed = await handleContact(request({ ...submission, message: `${submission.message} Please call next week.` }), config, transport);
  expect(first.status).toBe(200);
  expect(await first.json()).toEqual({ ok: true });
  expect(retry.status).toBe(200);
  expect(changed.status).toBe(200);
  expect(messages[0].body.to).toEqual([config.to]);
  expect(messages[0].body.reply_to).toBe(submission.email);
  expect(messages[0].body.from).toBe(config.from);
  expect(messages[0].body).not.toHaveProperty("html");
  expect(messages[0].key).toBe(messages[1].key);
  expect(messages[0].key).not.toBe(messages[2].key);
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
  const response = await handleContact(request(), { to: config.to }, noDelivery);
  expect(response.status).toBe(503);
  expect(await response.json()).toMatchObject({ ok: false });
});

for (const providerStatus of [429, 500]) {
  test(`provider ${providerStatus} responses never claim success or expose provider details`, async () => {
    const transport: typeof fetch = async () => Response.json({ message: "private-provider-detail" }, { status: providerStatus });
    const response = await handleContact(request(), config, transport);
    expect(response.status).toBe(providerStatus === 429 ? 429 : 502);
    if (providerStatus === 429) expect(response.headers.get("retry-after")).toBe("60");
    const result = await response.text();
    expect(result).not.toContain("private-provider-detail");
    expect(JSON.parse(result).ok).toBe(false);
  });
}

test("network failures and invalid receipts retain an unconfirmed result", async () => {
  const failedTransport: typeof fetch = async () => { throw new DOMException("Timed out", "TimeoutError"); };
  const invalidReceipt: typeof fetch = async () => Response.json({ accepted: true });
  expect((await handleContact(request(), config, failedTransport)).status).toBe(502);
  expect((await handleContact(request(), config, invalidReceipt)).status).toBe(502);
});
