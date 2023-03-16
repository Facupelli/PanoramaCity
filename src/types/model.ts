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
  propertyMedia?: PropertyMedia | null;
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

export type PropertyMedia = {
  images: string[];
  video: string;
  tour: string | null;
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
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  properties?: Property[];
};
