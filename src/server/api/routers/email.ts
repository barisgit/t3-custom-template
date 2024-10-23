import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendEmail } from "~/utils/mailgun";

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  text: z.string().optional(),
  html: z.string().optional(),
});

export const emailRouter = createTRPCRouter({
  send: publicProcedure.input(emailSchema).mutation(async ({ input }) => {
    const result = await sendEmail(input);

    if (!result.success) {
      throw new Error("Failed to send email");
    }

    return { message: "Email sent successfully" };
  }),
});
