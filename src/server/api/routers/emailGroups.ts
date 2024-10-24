import { z } from "zod";
import { createTRPCRouter, protectedProcedureRole } from "~/server/api/trpc";
import { getNextRunDate, validateCronExpression } from "~/utils/cronUtils";

const emailGroupSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  members: z.array(z.string().email()),
});

const scheduleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  templateId: z.string(),
  groupId: z.string().optional(),
  cronExpression: z
    .string()
    .refine((val) => validateCronExpression(val), "Invalid cron expression"),
  isActive: z.boolean().default(true),
});

export const emailGroupRouter = createTRPCRouter({
  createGroup: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(emailGroupSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.emailGroup.create({ data: input });
    }),

  updateGroup: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(emailGroupSchema.extend({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.emailGroup.update({
        where: { id },
        data,
      });
    }),

  deleteGroup: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.emailGroup.update({
        where: { id: input.id },
        data: { isArchived: true },
      });
    }),

  getGroups: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"]).query(
    ({ ctx }) => {
      return ctx.db.emailGroup.findMany({
        where: { isArchived: false },
        orderBy: { createdAt: "desc" },
      });
    },
  ),

  createSchedule: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(scheduleSchema)
    .mutation(async ({ ctx, input }) => {
      const nextRun = getNextRunDate(input.cronExpression);

      return ctx.db.emailSchedule.create({
        data: {
          ...input,
          nextRun,
        },
      });
    }),

  updateSchedule: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(scheduleSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const nextRun = getNextRunDate(input.cronExpression);

      return ctx.db.emailSchedule.update({
        where: { id },
        data: {
          ...data,
          nextRun,
        },
      });
    }),

  toggleSchedule: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(z.object({ id: z.string(), isActive: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.emailSchedule.update({
        where: { id: input.id },
        data: { isActive: input.isActive },
      });
    }),

  deleteSchedule: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.emailSchedule.delete({
        where: { id: input.id },
      });
    }),

  getSchedules: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"]).query(
    ({ ctx }) => {
      return ctx.db.emailSchedule.findMany({
        include: {
          template: true,
          group: true,
        },
        orderBy: { createdAt: "desc" },
      });
    },
  ),

  getScheduleById: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.emailSchedule.findUnique({
        where: { id: input.id },
        include: {
          template: true,
          group: true,
        },
      });
    }),
});
