import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const userRouter = createTRPCRouter({
  putUserInfo: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        phone: z.string(),
        companyName: z.string().optional(),
        companyLogoUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (input.id && input.phone) {
          await prisma.user.update({
            where: { id: input.id },
            data: {
              name: input.name,
              phone: input.phone,
              companyName: input.companyName,
              companyLogoUrl: input.companyLogoUrl,
            },
          });

          return { updated: true };
        }

        return { error: "missing data" };
      } catch (err) {
        console.log(err);
        return { error: "error updating user" };
      }
    }),
});
