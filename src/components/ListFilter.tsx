import Filter from "~/icons/Filter";

export default function ListFilter() {
  return (
    <div className="border-netrual-500 flex justify-between border-b pb-4 font-barlow">
      <button className="flex items-center gap-2 rounded-sm border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold ">
        <div>
          <Filter />
        </div>
        Filtrar
      </button>
      <select className="rounded-sm border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold">
        <option>Más relevantes</option>
        <option>Más nuevos</option>
        <option>Menor costo</option>
        <option>Mayor costo</option>
      </select>
    </div>
  );
}
