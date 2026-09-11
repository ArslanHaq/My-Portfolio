import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createTransport, type SMTPTransportOptions, type SendMailOptions } from "nodemailer";
import type { SmtpConfig } from "./smtp-config";
import { portraitContentId } from "./contact-email-template";

export type ContactMail = {
  from: { name: string; address: string };
  to: string;
  replyTo: { name: string; address: string };
  subject: string;
  text: string;
  html: string;
  messageId: string;
  headers?: Record<string, string>;
};
export type SendContactMail = (config: SmtpConfig, message: ContactMail) => Promise<{ accepted: string[] }>;

export function smtpTransportOptions(config: SmtpConfig): SMTPTransportOptions {
  return {
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port === 587,
    auth: { user: config.user, pass: config.password },
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    dnsTimeout: 5000,
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
    disableFileAccess: true,
    disableUrlAccess: true,
    logger: false,
    debug: false,
  };
}

export function contactMailOptions(config: SmtpConfig, message: ContactMail, portrait: Buffer): SendMailOptions {
  return {
    ...message,
    envelope: { from: config.user, to: [message.to] },
    attachments: [{ filename: "muhammad-arsalan.jpg", content: portrait, contentType: "image/jpeg", contentDisposition: "inline", cid: portraitContentId }],
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export const sendContactMail: SendContactMail = async (config, message) => {
  // Read only this bundled asset; Nodemailer cannot load arbitrary files or URLs.
  const portrait = await readFile(join(process.cwd(), "public/images/muhammad-arsalan-email.jpg"));
  // Each send has a deadline so both messages fit within the route's 30-second budget.
  const transport = createTransport(smtpTransportOptions(config));
  let deadline: ReturnType<typeof setTimeout> | undefined;
  try {
    const receipt = await Promise.race([
      transport.sendMail(contactMailOptions(config, message, portrait)),
      new Promise<never>((_, reject) => {
        deadline = setTimeout(() => {
          transport.close();
          reject(new Error("SMTP send deadline exceeded"));
        }, 12_000);
      }),
    ]);
    return { accepted: receipt.accepted };
  } finally {
    clearTimeout(deadline);
    transport.close();
  }
};
