export type PropertyType = {
  id: string;
  name: string;
  properties?: Property[];
};

export type Operation = {
  id: string;
  name: string;
  properties?: Property[];
};

export type Amenity = {
  id: string;
  name: string;
  properties?: Property[];
};

export type Property = {
  id: string;
  typeId: string;
  type?: PropertyType;
  userId: string;
  propertyInfo?: PropertyInfo | null;
  title: string;
  description: string;
  operationId: string;
  operation?: Operation;
  price: number;
  locationLat: number;
  locationLng: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyInfo = {
  id: string;
  propertyId: string;
  ambiences: number;
  bathrooms: number;
  bedrooms: number;
  address: string;
  city: string;
  zone: string;
  floor: string | null;
  surface: number;
  buildYear: number;
  orientation: string;
};

export type User = {
  id: string;
};
