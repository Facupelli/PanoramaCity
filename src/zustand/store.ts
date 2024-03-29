import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type FiltersData } from "~/types/filters";

type FilterState = {
  filters: FiltersData;
  sort: string;
  setSort: (sort: string) => void;
  setFilters: (filters: FiltersData) => void;
};

export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      filters: {
        type: ["", ""],
        operation: "all",
        price: {
          min: "",
          max: "",
        },
        ambiences: "",
        bathrooms: "",
        bedrooms: "",
        surface: {
          min: "",
          max: "",
        },
        amenities: [""],
        location: "all",
      },
      setFilters: (filters) => set(() => ({ filters })),
      sort: "",
      setSort: (sort) => set(() => ({ sort: sort })),
    }),
    {
      name: "filters-storage",
    }
  )
);
