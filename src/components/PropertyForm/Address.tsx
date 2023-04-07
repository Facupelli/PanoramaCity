import type {
  UseFormWatch,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { provinces } from "~/assets/provinces";
import { san_juan_departamentos } from "~/assets/san_juan_departamentos";
import { type FormData } from "~/types/createProperty";

type Props = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  step: number;
  errors: FieldErrors<FormData>;
};

export default function Address({ register, watch, errors }: Props) {
  const propertyType = watch("typeId");

  return (
    <>
      <div className="grid">
        <label htmlFor="city" className="pb-2 text-neutral-900">
          Provincia
        </label>
        <select
          id="city"
          className="w-full rounded-md border border-neutral-200 p-2"
          {...register("propertyInfo.city")}
        >
          {provinces.map((province) => (
            <option
              key={province.id}
              value={province.nombre}
              disabled={province.nombre !== "San Juan"}
            >
              {province.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        <label htmlFor="zone" className="pb-2 text-neutral-900">
          Departamento
        </label>
        <select
          id="zone"
          className="rounded-md border border-neutral-200 p-2"
          {...register("propertyInfo.zone")}
        >
          {san_juan_departamentos.map((departamento) => (
            <option key={departamento.id} value={departamento.nombre}>
              {departamento.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        <label htmlFor="street-name" className="pb-2 text-neutral-900">
          Calle
        </label>
        <input
          id="street-name"
          className="rounded-md border border-neutral-200 p-2"
          type="text"
          required
          placeholder="Los Cedros"
          {...register("propertyInfo.street_name")}
        />
        {errors.propertyInfo?.street_name && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo.street_name.message}
          </p>
        )}
      </div>

      <div className="grid">
        <label htmlFor="orientation" className="pb-2 text-neutral-900">
          Orientación
        </label>
        <input
          id="orientation"
          className="rounded-md border border-neutral-200 p-2"
          type="text"
          required
          placeholder="Oeste"
          {...register("propertyInfo.orientation")}
        />
        {errors.propertyInfo?.orientation && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo.orientation.message}
          </p>
        )}
      </div>

      <div className="grid">
        <label htmlFor="stree-number" className="pb-2 text-neutral-900">
          Número
        </label>
        <input
          id="stree-number"
          className="rounded-md border border-neutral-200 p-2"
          type="text"
          required
          placeholder="4234"
          {...register("propertyInfo.street_number", { valueAsNumber: true })}
        />
        {errors.propertyInfo?.street_number && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo.street_number.message}
          </p>
        )}
      </div>

      {propertyType === "clfrb1uv3001ue78wc2bqsg85" && (
        <div className="grid">
          <label htmlFor="floor" className="pb-2 text-neutral-900">
            Piso
          </label>
          <input
            id="floor"
            className="rounded-md border border-neutral-200 p-2"
            type="text"
            required
            placeholder="3"
            {...register("propertyInfo.floor", { valueAsNumber: true })}
          />
        </div>
      )}

      <div className="grid">
        <label htmlFor="zip-code" className="pb-2 text-neutral-900">
          Códgio Postal
        </label>
        <input
          id="zip-code"
          className="rounded-md border border-neutral-200 p-2"
          type="text"
          required
          placeholder="5400"
          {...register("propertyInfo.zip_code", { valueAsNumber: true })}
        />
        {errors.propertyInfo?.zip_code && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo.zip_code.message}
          </p>
        )}
      </div>
    </>
  );
}
