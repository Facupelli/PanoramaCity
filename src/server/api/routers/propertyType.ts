import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const propertyTypeRouter = createTRPCRouter({
  getAllPropertyTypes: publicProcedure.query(async () => {
    const propertyTypes = await prisma.propertyType.findMany({});
    return propertyTypes;
  }),
});
