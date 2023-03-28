export type FiltersData = {
  type: string[];
  operation: string;
  price: {
    min: string;
    max: string;
  };
  ambiences: string;
  bathrooms: string;
  bedrooms: string;
  surface: {
    min: string;
    max: string;
  };
  amenities: string[];
  location: string;
};
