import { isEmailAddress } from "@/lib/contact";
import { profile } from "@/lib/site";

export type SmtpConfig = {
  host: string;
  port: 465 | 587;
  user: string;
  password: string;
  to: string;
};

/** Used only by the runtime availability and submission handlers. */
export function getSmtpConfig(env: Readonly<Record<string, string | undefined>> = process.env): SmtpConfig | null {
  const host = (env.SMTP_HOST || "smtp.gmail.com").trim().toLowerCase();
  const port = Number(env.SMTP_PORT || "465");
  const user = env.SMTP_USER?.trim() || "";
  const to = (env.CONTACT_TO_EMAIL || profile.email).trim();
  const rawPassword = env.SMTP_PASS || "";
  // Google displays app passwords in groups separated by spaces.
  const password = host === "smtp.gmail.com" ? rawPassword.replace(/\s/g, "") : rawPassword;
  if (!/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(host) || host.length > 253
    || (port !== 465 && port !== 587) || !isEmailAddress(user) || !isEmailAddress(to) || !password.trim()) return null;
  return { host, port, user, password, to };
}
