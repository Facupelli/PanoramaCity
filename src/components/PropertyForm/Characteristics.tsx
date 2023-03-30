import type {
  UseFormWatch,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { type FormData } from "~/types/createProperty";

type Props = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  step: number;
  errors: FieldErrors<FormData>;
};

export default function Characteristics({ register, errors }: Props) {
  return (
    <>
      <div className="grid">
        <label htmlFor="ambiences" className="font-semibold">
          Ambientes
        </label>
        <input
          id="ambiences"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="4"
          {...register("propertyInfo.ambiences", { valueAsNumber: true })}
        />
        {errors.propertyInfo?.ambiences && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo?.ambiences.message}
          </p>
        )}
      </div>

      <div className="grid">
        <label htmlFor="bathromms" className="font-semibold">
          Baños
        </label>
        <input
          id="bathrooms"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="2"
          {...register("propertyInfo.bathrooms", { valueAsNumber: true })}
        />
        {errors.propertyInfo?.bathrooms && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo?.bathrooms.message}
          </p>
        )}
      </div>

      <div className="grid">
        <label htmlFor="bedrooms" className="font-semibold">
          Habitaciones
        </label>
        <input
          id="bedrooms"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="2"
          {...register("propertyInfo.bedrooms", { valueAsNumber: true })}
        />
        {errors.propertyInfo?.bedrooms && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo?.bedrooms.message}
          </p>
        )}
      </div>

      <div className="grid">
        <label htmlFor="surface" className="font-semibold">
          Superficie m²
        </label>
        <input
          id="surface"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="1200"
          {...register("propertyInfo.surface", { valueAsNumber: true })}
        />
        {errors.propertyInfo?.surface && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo?.surface.message}
          </p>
        )}
      </div>

      <div className="grid">
        <label htmlFor="buildYear" className="font-semibold">
          Año construcción
        </label>
        <input
          id="buildYear"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="2003"
          {...register("propertyInfo.buildYear", { valueAsNumber: true })}
        />
        {errors.propertyInfo?.buildYear && (
          <p className="pt-1 text-sm text-red-700">
            {errors.propertyInfo?.buildYear.message}
          </p>
        )}
      </div>
    </>
  );
}
