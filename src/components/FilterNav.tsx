import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useFilterStore } from "~/zustand/store";

import Filter from "~/icons/Filter";
import Filters from "./Filters/Filters";
import Modal from "./UI/Modal";

import type { Operation, PropertyType, Property, Amenity } from "~/types/model";

type Props = {
  setPropertiesList: Dispatch<SetStateAction<Property[]>>;
  operations: Operation[];
  propertyTypes: PropertyType[];
  amenities: Amenity[];
};

export default function FilterNav({
  setPropertiesList,
  operations,
  propertyTypes,
  amenities,
}: Props) {
  const sort = useFilterStore((state) => state.sort);
  const setSort = useFilterStore((state) => state.setSort);

  const { register } = useForm<{ sort: string }>({
    defaultValues: { sort: sort },
  });

  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    setSort(sort);
  };

  return (
    <>
      {showFiltersModal && (
        <Modal
          isOpen={showFiltersModal}
          setOpen={() => setShowFiltersModal(false)}
          title="Filtros"
        >
          <Filters
            operations={operations}
            types={propertyTypes}
            setPropertiesList={setPropertiesList}
            setShowFiltersModal={setShowFiltersModal}
            amenities={amenities}
          />
        </Modal>
      )}

      <div className="flex justify-between font-barlow sm:pb-4">
        <button
          onClick={() => setShowFiltersModal(true)}
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-sm "
        >
          <div>
            <Filter />
          </div>
          Filtrar
        </button>
        <div className="flex items-baseline gap-2">
          <label className="text-sm text-neutral-500">Ordenar por</label>
          <select
            {...register("sort")}
            onChange={handleOnChange}
            className="cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-sm"
          >
            <option value="">Más relevantes</option>
            <option value="newest">Más nuevos</option>
            <option value="lower-price">Menor costo</option>
            <option value="higher-price">Mayor costo</option>
          </select>
        </div>
      </div>
    </>
  );
}
