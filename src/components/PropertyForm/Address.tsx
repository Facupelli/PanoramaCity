import type {
  UseFormWatch,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { provinces } from "~/assets/provinces";
import { san_juan_departamentos } from "~/assets/san_juan_departamentos";
import { type FormData } from "~/types/createProperty";
// import Autocomplete from "./Autocomplete";
// import Autocomplete from "react-google-autocomplete";

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

      {/* <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
        options={{
          types: ["address"],
          setComponentRestrictions: "ar",
        }}
      /> */}

      {/* <Autocomplete /> */}

      <div className="grid">
        <label htmlFor="address" className="pb-2 text-neutral-900">
          Dirección
        </label>
        <input
          id="address"
          className="rounded-md border border-neutral-200 p-2"
          type="text"
          required
          placeholder="Los Cedros 4234 oeste"
          {...register("propertyInfo.address")}
        />
        {errors.propertyInfo?.address && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo.address.message}
          </p>
        )}
      </div>

      {propertyType === "clf1mbf010000e7vkfto3gjcp" && (
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
    </>
  );
}
