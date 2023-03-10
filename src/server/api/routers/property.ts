import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const propertyRouter = createTRPCRouter({
  getAllProperties: publicProcedure.query(async () => {
    try {
    } catch (e) {}
  }),

  createProperty: publicProcedure
    .input(
      z.object({
        typeId: z.string(),
        userId: z.string(),
        title: z.string(),
        description: z.string(),
        operationId: z.string(),
        price: z.number(),
        locationLat: z.number(),
        locationLng: z.number(),
        //PropertyInfo
        propertyInfo: z.object({
          ambiences: z.number(),
          bathrooms: z.number(),
          bedrooms: z.number(),
          address: z.string(),
          city: z.string(),
          zone: z.string(),
          floor: z.number().optional(),
          surface: z.number(),
          buildYear: z.number(),
          orientation: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      let newProperty;

      try {
        newProperty = await prisma.property.create({
          data: {
            propertyType: { connect: { id: input.typeId } },
            user: { connect: { id: input.userId } },
            title: input.title,
            description: input.description,
            operation: { connect: { id: input.operationId } },
            price: Number(input.price),
            locationLat: input.locationLat,
            locationLng: input.locationLng,
          },
        });
      } catch (err) {
        console.log("createProperty newProperty error:", err);
      }

      try {
        if (newProperty) {
          await prisma.propertyInfo.create({
            data: {
              property: { connect: { id: newProperty.id } },
              ambiences: Number(input.propertyInfo.ambiences),
              bathrooms: Number(input.propertyInfo.bathrooms),
              bedrooms: Number(input.propertyInfo.bedrooms),
              address: input.propertyInfo.address,
              city: input.propertyInfo.city,
              zone: input.propertyInfo.zone,
              surface: Number(input.propertyInfo.surface),
              buildYear: Number(input.propertyInfo.buildYear),
              orientation: input.propertyInfo.orientation,
            },
          });
        }
      } catch (err) {
        console.log("createProperty newPropertyInfo error:", err);
      }

      return { created: true, newProperty };
    }),
});
