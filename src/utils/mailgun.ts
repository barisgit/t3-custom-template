import formData from "form-data";
import Mailgun from "mailgun.js";
// Removed crypto import since it's not available in Edge Runtime
import { env } from "~/env";
import type { MailgunMessageData } from "mailgun.js";
import type { NextRequest } from "next/server";

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: env.MAILGUN_API_KEY,
});

export interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailData) {
  try {
    const messageData = {
      from: env.MAILGUN_FROM,
      to,
      subject,
      text,
      html,
    } as const;

    const response = await client.messages.create(
      env.MAILGUN_DOMAIN,
      messageData as unknown as MailgunMessageData, // Force type assertion for Mailgun
    );
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export async function verifyMailgunWebhook(req: NextRequest): Promise<boolean> {
  try {
    const formData = await req.formData();

    const timestamp = formData.get("timestamp") as string;
    const token = formData.get("token") as string;
    const signature = formData.get("signature") as string;

    if (!timestamp || !token || !signature) {
      console.error("Missing webhook verification parameters");
      return false;
    }

    // Convert the signing key to Uint8Array
    const encoder = new TextEncoder();
    const keyData = encoder.encode(env.MAILGUN_WEBHOOK_SIGNING_KEY);
    const message = encoder.encode(timestamp.concat(token));

    // Create a crypto key from the signing key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    // Generate the signature
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      message,
    );

    // Convert the signature to hex string
    const encodedToken = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Compare the signatures
    return encodedToken === signature;
  } catch (error) {
    console.error("Error verifying Mailgun webhook:", error);
    return false;
  }
}
