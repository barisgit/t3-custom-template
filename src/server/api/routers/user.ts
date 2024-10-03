import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedureRole,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getRole: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: { role: true },
      });
      return user;
    }),

  getUser: protectedProcedureRole(["ADMIN", "SUPER_ADMIN"])
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      return user;
    }),
});
