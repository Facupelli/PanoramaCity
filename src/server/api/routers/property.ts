import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const propertyRouter = createTRPCRouter({
  getFilteredProperties: publicProcedure
    .input(
      z.object({
        ambiences: z.string().optional(),
        bathrooms: z.string().optional(),
        bedrooms: z.string().optional(),
        operation: z.string().optional(),
        price: z.object({
          min: z.string().optional(),
          max: z.string().optional(),
        }),
        surface: z.object({
          min: z.string().optional(),
          max: z.string().optional(),
        }),
        type: z.string().array().optional(),
      })
    )
    .mutation(async ({ input }) => {
      let wherePipe: any = { propertyInfo: {} };

      if (input.price.min || input.price.max) {
        if (input.price.min && input.price.max) {
          wherePipe.price = {
            gte: Number(input.price.min),
            lte: Number(input.price.max),
          };
        } else {
          if (input.price.min) {
            wherePipe.price = {
              gte: Number(input.price.min),
            };
          }
          if (input.price.max) {
            wherePipe.price = {
              lte: Number(input.price.max),
            };
          }
        }
      }

      if (input.type && input.type?.length !== 2) {
        wherePipe.typeId = input.type[0];
      }

      if (input.operation !== "all") {
        wherePipe.operationId = input.operation;
      }

      if (input.surface.min || input.surface.max) {
        if (input.surface.min && input.surface.max) {
          wherePipe.propertyInfo.surface = {
            gte: Number(input.surface.min),
            lte: Number(input.surface.max),
          };
        } else {
          if (input.surface.min) {
            wherePipe.propertyInfo.surface = {
              gte: Number(input.surface.min),
            };
          }
          if (input.surface.max) {
            wherePipe.propertyInfo.surface = {
              lte: Number(input.surface.max),
            };
          }
        }
      }

      if (input.ambiences) {
        console.log("NUMBER", Number(input.ambiences));
        wherePipe.propertyInfo.ambiences = { gte: Number(input.ambiences) };
      }

      if (input.bathrooms) {
        wherePipe.propertyInfo.bathrooms = { gte: Number(input.bathrooms) };
      }

      if (input.bedrooms) {
        wherePipe.propertyInfo.bedrooms = { gte: Number(input.bedrooms) };
      }

      console.log("PIPE", wherePipe);

      try {
        const properties = await prisma.property.findMany({
          where: wherePipe,
          include: {
            propertyType: true,
            propertyInfo: true,
          },
        });
        return { properties };
      } catch (err) {
        console.log(err);
        return { error: "error fetching properties" };
      }
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
