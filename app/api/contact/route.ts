import { handleContact } from "@/lib/server/contact-handler";
import { getSiteUrl } from "@/lib/site";
import { getSmtpConfig } from "@/lib/server/smtp-config";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

// Read deployment configuration at request time without opening an SMTP connection.
export async function GET() {
  return Response.json({ available: getSmtpConfig() !== null }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  return handleContact(request, {
    smtp: getSmtpConfig(),
    siteUrl: getSiteUrl(),
  });
}
