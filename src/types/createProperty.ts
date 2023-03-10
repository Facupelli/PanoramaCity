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
