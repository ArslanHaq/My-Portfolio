import { createHash } from "node:crypto";
import { validateContact, type ContactResult } from "@/lib/contact";

const maxBodyBytes = 24 * 1024;
const unavailable = "The form is temporarily unavailable. Please email me directly using the address beside the form.";

type DeliveryConfig = { apiKey?: string; from?: string; to: string; siteUrl?: string };

function reply(result: ContactResult, status: number, headers: Record<string, string> = {}) {
  return Response.json(result, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

async function readBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let text = "";
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) {
        await reader.cancel();
        throw new RangeError("Contact request too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally { reader.releaseLock(); }
}

/** A fixed recipient and endpoint prevent this public form becoming an email relay. */
export async function handleContact(request: Request, config: DeliveryConfig, transport: typeof fetch = fetch): Promise<Response> {
  const origin = request.headers.get("origin");
  if (!origin || (origin !== new URL(request.url).origin && origin !== config.siteUrl)) {
    return reply({ ok: false, message: "Please submit the form from this website." }, 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply({ ok: false, message: "This form requires a JSON request." }, 415);
  }
  if (Number(request.headers.get("content-length")) > maxBodyBytes) {
    return reply({ ok: false, message: "Your message is too large. Please shorten it and try again." }, 413);
  }

  let input: unknown;
  try { input = JSON.parse(await readBody(request)); }
  catch (error) {
    return reply({ ok: false, message: "We couldn’t read that message. Please check the form and try again." }, error instanceof RangeError ? 413 : 400);
  }
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return reply({ ok: false, message: "Please check the form and try again." }, 400);
  }
  const body = input as Record<string, unknown>;
  if (typeof body.website !== "string" || body.website !== "") {
    return reply({ ok: false, message: "We couldn’t submit this message. Please email me directly." }, 400);
  }
  if (typeof body.submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)) {
    return reply({ ok: false, message: "Please refresh this page before sending your message." }, 400);
  }
  const parsed = validateContact(body);
  if (!parsed.ok) return reply({ ok: false, message: "Please check the highlighted fields.", errors: parsed.errors }, 400);
  if (!config.apiKey || !config.from) return reply({ ok: false, message: unavailable }, 503);

  const { name, email, topic, message } = parsed.data;
  const payload = JSON.stringify({
    from: config.from,
    to: [config.to],
    reply_to: email,
    subject: `Portfolio enquiry: ${topic}`,
    text: `Name: ${name}\nEmail: ${email}\nEnquiry: ${topic}\n\n${message}`,
  });
  // Reuse on retries; changed content receives a distinct key even if a client reuses its UUID.
  const digest = createHash("sha256").update(payload).digest("hex");
  try {
    const response = await transport("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `portfolio/${body.submissionId}/${digest}`,
      },
      body: payload,
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (response.status === 429) return reply({ ok: false, message: "The form is busy. Please wait a minute before trying again, or email me directly." }, 429, { "Retry-After": "60" });
    if (!response.ok) return reply({ ok: false, message: "Your message couldn’t be sent. Please try again or email me directly." }, 502);
    const receipt: unknown = await response.json();
    if (typeof receipt !== "object" || receipt === null || !("id" in receipt) || typeof receipt.id !== "string" || !receipt.id) {
      return reply({ ok: false, message: "Sending wasn’t confirmed. Please retry the same message, or email me directly." }, 502);
    }
    return reply({ ok: true }, 200);
  } catch {
    return reply({ ok: false, message: "Sending wasn’t confirmed. Please retry the same message, or email me directly." }, 502);
  }
}
