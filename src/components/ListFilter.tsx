import { Dispatch, SetStateAction } from "react";
import Filter from "~/icons/Filter";

type Props = {
  setShowFiltersModal: Dispatch<SetStateAction<boolean>>;
};

export default function ListFilter({ setShowFiltersModal }: Props) {
  return (
    <div className="border-netrual-500 flex justify-between border-b pb-4 font-barlow">
      <button
        onClick={() => setShowFiltersModal(true)}
        className="flex items-center gap-2 rounded-sm border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold "
      >
        <div>
          <Filter />
        </div>
        Filtrar
      </button>
      <div className="flex items-baseline gap-2">
        <label className="text-sm text-neutral-500">Ordenar por</label>
        <select className="rounded-sm border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold">
          <option value="relevant">Más relevantes</option>
          <option value="newer">Más nuevos</option>
          <option value="lower-price">Menor costo</option>
          <option value="higher-price">Mayor costo</option>
        </select>
      </div>
    </div>
  );
}
