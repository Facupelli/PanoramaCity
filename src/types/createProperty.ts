import { z } from "zod";

export type File = {
  name: string;
  type: string;
};

export type FormData = {
  typeId: string;
  userId: string;
  title: string;
  description: string;
  operationId: string;
  price: number;
  propertyInfo: {
    propertyId: string;
    ambiences: number;
    bathrooms: number;
    bedrooms: number;
    zip_code: number;
    street_number: number;
    street_name: string;
    city: string;
    zone: string;
    floor?: number;
    surface: number;
    buildYear: number;
    orientation: string;
  };
  locationLat: string;
  locationLng: string;
  amenities: string[];
  utilities: string[];
};

export const validationSchema = z.object({
  typeId: z.string(),
  propertyInfo: z.object({
    ambiences: z.number().gte(1),
    bathrooms: z.number().gte(0),
    bedrooms: z.number().gte(0),
    street_name: z.string().nonempty(),
    street_number: z.number(),
    zip_code: z.number(),
    city: z.string().min(1),
    zone: z.string().min(1),
    floor: z.number().optional(),
    surface: z.number().gte(1),
    buildYear: z.number().lte(new Date().getFullYear()),
    orientation: z.string(),
  }),
  title: z.string().nonempty().max(50),
  description: z.string(),
  operationId: z.string(),
  price: z.number().gte(1),
  amenities: z.string().array().optional(),
  utilities: z.string().array().optional(),
  // locationLat: z.string(),
  // locationLng: z.string(),
});
