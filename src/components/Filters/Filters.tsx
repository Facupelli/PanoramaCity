import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import RadioFilters from "../UI/RadioFilters";

import { type Operation, type PropertyType } from "~/types/model";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
};

type Props = {
  operations: Operation[];
  types: PropertyType[];
};

const initialState = {
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
};

export default function Filters({ operations, types }: Props) {
  const { register, handleSubmit, reset, watch } = useForm<FiltersData>({
    defaultValues: initialState,
  });

  const ambiences = watch("ambiences");
  const bathrooms = watch("bathrooms");
  const bedrooms = watch("bedrooms");

  const getFilteredProperties =
    api.property.getFilteredProperties.useMutation();

  const onSubmit = async (data: FiltersData) => {
    console.log(data);
    const properties = getFilteredProperties.mutate(data);
    console.log(properties);
  };

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
            <option value="all">Todos</option>
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
          <RadioFilters
            register={register}
            field="ambiences"
            active={ambiences}
          />
        </div>

        <div className="border-netrual-800 flex justify-between gap-2 border-b py-6">
          <label className="py-2 font-semibold" htmlFor="baths">
            Baños
          </label>
          <RadioFilters
            register={register}
            field="bathrooms"
            active={bathrooms}
          />
        </div>

        <div className="border-netrual-800 flex justify-between gap-2 border-b py-6">
          <label className="py-2 font-semibold" htmlFor="bedrooms">
            Habitaciones
          </label>
          <RadioFilters
            register={register}
            field="bedrooms"
            active={bedrooms}
          />
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
        <button
          className="rounded-sm border border-marino p-2"
          onClick={() => reset(initialState)}
        >
          Limpiar filtros
        </button>
        <button className="rounded-sm border-none bg-oliva p-2 font-semibold text-white">
          Aplicar filtros
        </button>
      </div>
    </form>
  );
}