import { useForm } from "react-hook-form";
import { type Operation, type PropertyType } from "~/types/model";
import RadioFilters from "../UI/RadioFilters";

export type FiltersData = {
  type: string[];
  operation: string;
  price: {
    min: number;
    max: number;
  };
  ambiences: string[];
  bathrooms: string[];
  bedrooms: string[];
  surface: {
    min: number;
    max: number;
  };
};

type Props = {
  operations: Operation[];
  types: PropertyType[];
};

export default function Filters({ operations, types }: Props) {
  const { register, handleSubmit } = useForm<FiltersData>();

  const onSubmit = (data: FiltersData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
      <div className="max-h-[calc(100vh_-_200px)] overflow-y-auto p-10">
        <div className="border-netrual-800 grid gap-2 border-b pb-6">
          <label className="pb-2 font-semibold">Tipo de inmueble</label>
          <div className="flex gap-10">
            {types?.map((type) => (
              <div key={type.id}>
                <input
                  type="checkbox"
                  value={type.id}
                  id={`type/${type.name}`}
                  {...register("type")}
                />
                <label
                  htmlFor={`type/${type.name}`}
                  className="pl-2 font-medium"
                >
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-netrual-800 grid border-b py-6">
          <label className="pb-2 font-semibold" htmlFor="operation">
            Operación
          </label>
          <select
            id="operation"
            className="rounded-sm border border-neutral-300 p-2"
            {...register("operation")}
          >
            <option>Todos</option>
            {operations?.map((operation) => (
              <option key={operation.id} value={operation.id}>
                {operation.name}
              </option>
            ))}
          </select>
        </div>

        <div className="border-netrual-800 grid gap-2 border-b py-6">
          <label className="pb-2 font-semibold" htmlFor="zone">
            Departamento
          </label>
          <select
            id="zone"
            className="rounded-sm border border-neutral-300 p-2"
          >
            <option>Todos</option>
          </select>
        </div>

        <div className="border-netrual-800 grid gap-2 border-b py-6">
          <label className="pb-2 font-semibold" htmlFor="price">
            Precio
          </label>
          <div className="flex gap-4">
            <div className="grid grow">
              <label htmlFor="price.min">Mínimo $</label>
              <input
                id="price.min"
                type="text"
                {...register("price.min")}
                className="border-netrual-300  rounded-sm border p-2"
              />
            </div>
            <div className="grid grow">
              <label htmlFor="price.max">Máximo $</label>
              <input
                id="price.max"
                type="text"
                {...register("price.max")}
                className="border-netrual-300  rounded-sm border p-2"
              />
            </div>
          </div>
        </div>

        <div className="border-netrual-800 flex items-center gap-2 border-b py-6">
          <label className="py-2 font-semibold" htmlFor="ambiences">
            Ambientes
          </label>
          <RadioFilters register={register} field="ambiences" />
        </div>

        <div className="border-netrual-800 flex justify-between gap-2 border-b py-6">
          <label className="py-2 font-semibold" htmlFor="baths">
            Baños
          </label>
          <RadioFilters register={register} field="bathrooms" />
        </div>

        <div className="border-netrual-800 flex justify-between gap-2 border-b py-6">
          <label className="py-2 font-semibold" htmlFor="bedrooms">
            Habitaciones
          </label>
          <RadioFilters register={register} field="bedrooms" />
        </div>

        <div className="border-netrual-800 grid gap-2 pt-6">
          <label className="pb-2 font-semibold" htmlFor="surface">
            Superficie
          </label>
          <div className="flex gap-4">
            <div className="grid grow">
              <label>Mínimo m²</label>
              <input
                id="surface"
                type="text"
                {...register("surface.min")}
                className="rounded-sm border border-neutral-300 p-2"
              />
            </div>
            <div className="grid grow">
              <label>Máximo m²</label>
              <input
                id="surface"
                type="text"
                {...register("surface.max")}
                className="rounded-sm border border-neutral-300 p-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-marino bg-white  p-3 ">
        <button className="rounded-sm border border-marino p-2">
          Limpiar filtros
        </button>
        <button className="rounded-sm border-none bg-oliva p-2 font-semibold text-white">
          Aplicar filtros
        </button>
      </div>
    </form>
  );
}
