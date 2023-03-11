import { z } from "zod";

export type FormData = {
  typeId: string;
  userId: string;
  propertyInfo: {
    propertyId: string;
    ambiences: number;
    bathrooms: number;
    bedrooms: number;
    address: string;
    city: string;
    zone: string;
    floor?: number;
    surface: number;
    buildYear: number;
    orientation: string;
  };
  title: string;
  description: string;
  operationId: string;
  price: number;
  locationLat: string;
  locationLng: string;
};

export const validationSchema = z.object({
  typeId: z.string(),
  propertyInfo: z.object({
    ambiences: z.number().gte(1),
    bathrooms: z.number().gte(0),
    bedrooms: z.number().gte(0),
    address: z.string(),
    city: z.string().min(1),
    zone: z.string().min(1),
    floor: z.number().optional(),
    surface: z.number().gte(1),
    buildYear: z.number().lte(new Date().getFullYear()),
    orientation: z.string().min(1),
  }),
  title: z.string().max(50),
  description: z.string(),
  operationId: z.string(),
  price: z.number().gte(1),
  // locationLat: z.string(),
  // locationLng: z.string(),
});
