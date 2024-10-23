import formData from "form-data";
import Mailgun from "mailgun.js";
import { env } from "~/env";
import type { MailgunMessageData } from "mailgun.js";

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
