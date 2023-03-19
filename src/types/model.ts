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

export type Utility = {
  id: string;
  name: string;
  properties?: Property[];
};

export type Property = {
  id: string;
  typeId: string;
  type?: PropertyType;
  userId: string;
  user?: User;
  propertyInfo?: PropertyInfo | null;
  propertyMedia?: PropertyMedia | null;
  amenities?: Amenity[];
  utilities?: Utility[];
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
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  properties?: Property[];
  phone: string;
  companyName?: string;
  companyLogoUrl?: string;
};
