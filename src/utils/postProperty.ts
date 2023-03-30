import type { UseFormTrigger } from "react-hook-form";
import type { FormData } from "~/types/createProperty";

export const validateStep1 = async (trigger: UseFormTrigger<FormData>) => {
  const result = await trigger([
    "price",
    "title",
    "description",
    "operationId",
    "typeId",
  ]);
  return result;
};

export const validateStep2 = async (trigger: UseFormTrigger<FormData>) => {
  const result = await trigger([
    "propertyInfo.city",
    "propertyInfo.zone",
    "propertyInfo.address",
    "propertyInfo.floor",
    "propertyInfo.orientation",
  ]);
  return result;
};

export const validateStep3 = async (trigger: UseFormTrigger<FormData>) => {
  const result = await trigger([
    "propertyInfo.ambiences",
    "propertyInfo.bathrooms",
    "propertyInfo.bedrooms",
    "propertyInfo.surface",
    "propertyInfo.buildYear",
  ]);
  return result;
};
