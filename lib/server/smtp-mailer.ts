import { createTransport, type SMTPTransportOptions } from "nodemailer";
import type { SmtpConfig } from "./smtp-config";

export type ContactMail = {
  from: { name: string; address: string };
  to: string;
  replyTo: { name: string; address: string };
  subject: string;
  text: string;
  messageId: string;
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

export const sendContactMail: SendContactMail = async (config, message) => {
  // One connection per enquiry; never leave a reusable pool alive in a Vercel function.
  const transport = createTransport(smtpTransportOptions(config));
  try {
    const receipt = await transport.sendMail({
      ...message,
      envelope: { from: config.user, to: [config.to] },
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    return { accepted: receipt.accepted };
  } finally { transport.close(); }
};
