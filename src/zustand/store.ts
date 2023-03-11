import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { FiltersData } from "~/components/Filters/Filters";

type FilterState = {
  filters: FiltersData;
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
      },
      setFilters: (filters) => set((state) => ({ ...state, filters })),
    }),
    {
      name: "filters-storage",
    }
  )
);
