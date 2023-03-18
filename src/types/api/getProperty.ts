export type WherePipe = {
  price?: {
    gte?: number;
    lte?: number;
  };
  typeId?: string;
  operationId?: string;
  propertyInfo: {
    surface?: {
      gte?: number;
      lte?: number;
    };
    ambiences?: { gte?: number };
    bathrooms?: { gte?: number };
    bedrooms?: { gte?: number };
  };
  amenities?: {
    every: {
      id: {
        in: string[];
      };
    };
  };
};

export type OrderPipe = Array<object>;
