import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import Filter from "~/icons/Filter";
import {
  type Operation,
  type PropertyType,
  type Property,
} from "~/types/model";
import { api } from "~/utils/api";
import { useFilterStore } from "~/zustand/store";
import Filters from "./Filters/Filters";
import Modal from "./UI/Modal";

type Props = {
  setPropertiesList: Dispatch<SetStateAction<Property[]>>;
  operations: Operation[];
  propertyTypes: PropertyType[];
};

export default function FilterNav({
  setPropertiesList,
  operations,
  propertyTypes,
}: Props) {
  const { register, handleSubmit, reset, watch } = useForm<{ sort: string }>({
    defaultValues: { sort: "" },
  });
  const setSort = useFilterStore((state) => state.setSort);
  const filters = useFilterStore((state) => state.filters);

  const getFilteredProperties =
    api.property.getFilteredProperties.useMutation();

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    setSort(sort);
    getFilteredProperties.mutate(
      { ...filters, sort },
      {
        onSuccess(data, variables, context) {
          if (data.properties) {
            setPropertiesList(data.properties);
            setShowFiltersModal(false);
          }
        },
      }
    );
  };

  const [showFiltersModal, setShowFiltersModal] = useState(false);

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
          />
        </Modal>
      )}

      <div className="flex justify-between pb-4 font-barlow">
        <button
          onClick={() => setShowFiltersModal(true)}
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold "
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
            className="cursor-pointer rounded-xl bg-white px-4 py-2 text-sm font-semibold"
          >
            <option value="">M??s relevantes</option>
            <option value="newest">M??s nuevos</option>
            <option value="lower-price">Menor costo</option>
            <option value="higher-price">Mayor costo</option>
          </select>
        </div>
      </div>
    </>
  );
}
