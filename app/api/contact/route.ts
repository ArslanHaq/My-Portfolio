import { handleContact } from "@/lib/server/contact-handler";
import { getSiteUrl } from "@/lib/site";
import { getSmtpConfig } from "@/lib/server/smtp-config";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  return handleContact(request, {
    smtp: getSmtpConfig(),
    siteUrl: getSiteUrl(),
  });
}
