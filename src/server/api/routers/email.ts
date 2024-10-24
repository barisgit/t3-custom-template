import { z } from "zod";
import { createTRPCRouter, protectedProcedureRole } from "~/server/api/trpc";
import { sendEmail } from "~/utils/mailgun";

const emailTemplateSchema = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  text: z.string().min(1),
  html: z.string().optional(),
});

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  text: z.string().min(1),
  html: z.string().optional(),
});

export const emailRouter = createTRPCRouter({
  send: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(emailSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await sendEmail(input);

      // Log the email
      await ctx.db.emailLog.create({
        data: {
          to: input.to,
          subject: input.subject,
          text: input.text,
          html: input.html,
          status: result.success ? "success" : "failed",
          error: result.success ? null : String(result.error),
          userId: ctx.user.id,
        },
      });

      if (!result.success) {
        throw new Error("Failed to send email");
      }

      return { message: "Email sent successfully" };
    }),

  getTemplates: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"]).query(
    ({ ctx }) => {
      return ctx.db.emailTemplate.findMany({
        where: { isArchived: false },
        orderBy: { createdAt: "desc" },
      });
    },
  ),

  createTemplate: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(emailTemplateSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.emailTemplate.create({ data: input });
    }),

  deleteTemplate: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.emailTemplate.update({
        where: { id: input.id },
        data: { isArchived: true },
      });
    }),

  getLogs: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"]).query(({ ctx }) => {
    return ctx.db.emailLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }),
});
