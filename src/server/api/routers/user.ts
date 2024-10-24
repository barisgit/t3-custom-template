import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedureRole,
  publicProcedure,
} from "~/server/api/trpc";

const createUserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  profileImageUrl: z.string(),
});

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

  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { id: input.id },
      });

      if (existingUser) {
        return existingUser;
      }

      // Create new user
      return ctx.db.user.create({
        data: {
          id: input.id,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          profileImageUrl: input.profileImageUrl,
        },
      });
    }),
});
