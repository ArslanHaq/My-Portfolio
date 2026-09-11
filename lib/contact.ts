export const contactTopics = [
  "Website or web application",
  "Mobile application",
  "AI integration",
  "Technical consultation",
  "Collaboration or a role",
  "Something else",
] as const;

export const contactLimits = { name: 80, email: 254, message: 4000, minMessage: 20 } as const;
export type ContactField = "name" | "email" | "topic" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactMessage = {
  name: string;
  email: string;
  topic: typeof contactTopics[number];
  message: string;
};
export type ContactResult = { ok: true; confirmation?: "sent" | "unavailable" } | { ok: false; message: string; errors?: ContactErrors };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isEmailAddress(value: string): boolean {
  return value.length <= contactLimits.email && /^[^\s@<>,;"\\]+@[^\s@<>,;"\\]+\.[^\s@<>,;"\\]+$/.test(value);
}

export function validateContact(value: unknown): { ok: true; data: ContactMessage } | { ok: false; errors: ContactErrors } {
  const input = isRecord(value) ? value : {};
  const text = (field: ContactField) => typeof input[field] === "string" ? input[field].trim() : "";
  const name = text("name");
  const email = text("email");
  const topic = contactTopics.find(item => item === text("topic"));
  const message = text("message");
  const errors: ContactErrors = {};
  if (name.length < 2 || name.length > contactLimits.name || /[\r\n\t]/.test(name)) errors.name = "Enter your name (2–80 characters).";
  if (!isEmailAddress(email)) errors.email = "Enter a valid email address.";
  if (!topic) errors.topic = "Choose what you’d like to discuss.";
  if (message.length < contactLimits.minMessage || message.length > contactLimits.message || message.includes("\0")) errors.message = "Share a little more detail (20–4,000 characters).";
  if (Object.keys(errors).length || !topic) return { ok: false, errors };
  return { ok: true, data: { name, email, topic, message } };
}

export function isContactResult(value: unknown): value is ContactResult {
  if (!isRecord(value)) return false;
  if (value.ok === true) return value.confirmation === undefined || value.confirmation === "sent" || value.confirmation === "unavailable";
  if (value.ok !== false || typeof value.message !== "string") return false;
  return value.errors === undefined || (isRecord(value.errors) && Object.entries(value.errors).every(([field, error]) =>
    ["name", "email", "topic", "message"].includes(field) && typeof error === "string"));
}
