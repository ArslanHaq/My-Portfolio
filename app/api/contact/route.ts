import { handleContact } from "@/lib/server/contact-handler";
import { getSiteUrl, profile } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function POST(request: Request) {
  return handleContact(request, {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL || profile.email,
    siteUrl: getSiteUrl(),
  });
}
