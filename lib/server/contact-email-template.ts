import type { ContactMessage } from "@/lib/contact";
import { profile } from "@/lib/site";

export const portraitContentId = "arsalan-portrait@portfolio";

type EmailContent = { subject: string; text: string; html: string };
type TemplateOptions = { siteUrl?: string; replyEmail: string; reference: string };

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

function publicSiteUrl(value?: string): string | undefined {
  try {
    const url = new URL(value ?? "");
    return url.protocol === "https:" ? url.origin : undefined;
  } catch { return undefined; }
}

const paragraphStyle = "margin:0 0 20px;color:#b0bac9;font-size:16px;line-height:1.75;";

function button(label: string, href: string): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td bgcolor="#ff5f56" style="border-radius:8px;background-color:#ff5f56;mso-padding-alt:15px 24px;"><a href="${escapeHtml(href)}" style="display:inline-block;padding:15px 24px;color:#0c1119;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;border-radius:8px;">${escapeHtml(label)} &rarr;</a></td></tr></table>`;
}

function detail(label: string, value: string): string {
  return `<tr><td valign="top" style="padding:10px 12px 10px 0;width:74px;color:#9da9ba;font-size:13px;line-height:1.6;">${label}</td><td style="padding:10px 0;color:#ffffff;font-size:14px;line-height:1.6;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(value)}</td></tr>`;
}

function shell(title: string, preheader: string, label: string, body: string, reference: string, footer: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"><title>${escapeHtml(preheader)}</title>
<style>@media only screen and (max-width:620px){.email-outer{padding:16px 8px!important}.email-inner{padding:28px 20px!important}.email-heading{font-size:30px!important;line-height:1.15!important}}</style></head>
<body style="margin:0;padding:0;width:100%;background-color:#0c1119;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#0c1119;mso-hide:all;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#0c1119"><tr><td class="email-outer" align="center" style="padding:40px 16px;">
<!--[if mso]><table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#151d28" style="width:100%;max-width:600px;background-color:#151d28;border:1px solid #2b3442;border-radius:16px;">
<tr><td style="height:4px;background-color:#ff5f56;border-radius:16px 16px 0 0;font-size:0;line-height:4px;">&nbsp;</td></tr>
<tr><td class="email-inner" style="padding:36px 40px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td width="64" valign="middle"><img src="cid:${portraitContentId}" width="48" height="48" alt="" style="display:block;width:48px;height:48px;border:2px solid #ff8a80;border-radius:50%;"></td><td valign="middle"><p style="margin:0;color:#ffffff;font-size:17px;font-weight:bold;line-height:1.5;">${escapeHtml(profile.name)}</p><p style="margin:2px 0 0;color:#9da9ba;font-size:12px;line-height:1.5;">${escapeHtml(profile.title)} &middot; Islamabad</p></td></tr></table>
<p style="margin:36px 0 14px;color:#ff8a80;font-family:Consolas,monospace;font-size:11px;line-height:1.6;letter-spacing:2px;">${escapeHtml(label)}</p>
<h1 class="email-heading" style="margin:0 0 22px;color:#ffffff;font-size:38px;line-height:1.12;letter-spacing:-1.4px;font-weight:bold;">${title}</h1>
${body}
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;border-top:1px solid #2b3442;"><tr><td style="padding-top:22px;">
<p style="margin:0 0 10px;color:#9da9ba;font-size:12px;line-height:1.75;">${footer}</p>
<p style="margin:0;color:#9da9ba;font-family:Consolas,monospace;font-size:10px;line-height:1.7;letter-spacing:1px;">REFERENCE / ${escapeHtml(reference)}</p>
<p style="margin:18px 0 0;font-size:12px;line-height:1.7;"><a href="${escapeHtml(profile.linkedin)}" style="color:#ff8a80;text-decoration:none;">LinkedIn</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="${escapeHtml(profile.github)}" style="color:#ff8a80;text-decoration:none;">GitHub</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="${escapeHtml(profile.fiverr)}" style="color:#ff8a80;text-decoration:none;">Fiverr</a></p>
</td></tr></table>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
<p style="margin:18px 0 0;color:#9da9ba;font-family:Consolas,monospace;font-size:10px;line-height:1.7;letter-spacing:1px;">THOUGHTFUL INTERFACES. CONNECTED EXPERIENCES.</p>
</td></tr></table></body></html>`;
}

export function renderContactEmails(data: ContactMessage, options: TemplateOptions): { notification: EmailContent; confirmation: EmailContent } {
  const { name, email, topic, message } = data;
  const reference = options.reference;
  const siteUrl = publicSiteUrl(options.siteUrl);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${topic}`)}`;
  const ownerHref = `mailto:${encodeURIComponent(options.replyEmail)}`;
  const notification: EmailContent = {
    subject: `Portfolio enquiry: ${topic}`,
    text: `New portfolio enquiry\n\nName: ${name}\nEmail: ${email}\nEnquiry: ${topic}\n\n${message}\n\nReference: ${reference}\nReply to this email to reach the visitor.`,
    html: shell("A new conversation<span style=\"color:#ff5f56;\">.</span>", `New enquiry about ${topic}.`, "PORTFOLIO / NEW ENQUIRY",
      `<p style="${paragraphStyle}">Someone would like to discuss a project with you. Their details and message are below.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #2b3442;border-bottom:1px solid #2b3442;margin-bottom:24px;table-layout:fixed;">${detail("Name", name)}${detail("Email", email)}${detail("Enquiry", topic)}</table>
      <p style="margin:0 0 10px;color:#ff8a80;font-size:11px;font-weight:bold;letter-spacing:1.5px;">THE MESSAGE</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;margin-bottom:28px;"><tr><td bgcolor="#0c1119" style="padding:20px;border:1px solid #2b3442;border-radius:10px;color:#e5eaf1;font-size:15px;line-height:1.8;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(message).replace(/\r\n|\r|\n/g, "<br>")}</td></tr></table>
      ${button("Reply to this enquiry", replyHref)}`, reference, "Sent from your portfolio contact form. Replying goes directly to the visitor."),
  };

  // Only fixed copy and a validated enquiry category are echoed to the submitted address.
  // This prevents the acknowledgement from forwarding arbitrary user-written content.
  const confirmation: EmailContent = {
    subject: "Thanks for reaching out — Muhammad Arsalan",
    text: `Thanks for reaching out.\n\nYour message has reached my inbox. I’ll review the details and reply personally as soon as I can.\n\nEnquiry: ${topic}\nReference: ${reference}\n\nHave something to add? Reply to this email.\n\nMuhammad Arsalan\n${profile.title}\n${options.replyEmail}${siteUrl ? `\n${siteUrl}` : ""}\n\nThis is an automatic acknowledgement of a portfolio enquiry. If you didn’t submit one, you can ignore this email.`,
    html: shell("Good ideas start<br>with a conversation<span style=\"color:#ff5f56;\">.</span>", "Your message has reached my inbox. I’ll be in touch.", "MESSAGE RECEIVED / THANK YOU",
      `<p style="${paragraphStyle}">Thanks for reaching out. Your message has reached my inbox, and I’m looking forward to learning more about what you have in mind.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0;table-layout:fixed;"><tr><td bgcolor="#0c1119" style="padding:20px;border-left:3px solid #ff5f56;border-radius:0 8px 8px 0;"><p style="margin:0 0 6px;color:#ff8a80;font-size:11px;font-weight:bold;letter-spacing:1px;">WHAT HAPPENS NEXT</p><p style="margin:0;color:#e5eaf1;font-size:15px;line-height:1.8;">I’ll review the details and reply personally as soon as I can.</p><p style="margin:14px 0 0;color:#9da9ba;font-size:12px;line-height:1.7;">${escapeHtml(topic)}</p></td></tr></table>
      <p style="${paragraphStyle}">Have something to add? Just reply to this email.</p>
      ${button(siteUrl ? "Explore my work" : "Continue the conversation", siteUrl ? `${siteUrl}/#work` : ownerHref)}
      <p style="margin:28px 0 0;color:#e5eaf1;font-size:15px;line-height:1.7;">Speak soon,<br><strong style="color:#ffffff;">Arsalan</strong></p>`, reference, "This is an automatic acknowledgement of a portfolio enquiry. If you didn’t submit one, you can ignore this email."),
  };
  return { notification, confirmation };
}
