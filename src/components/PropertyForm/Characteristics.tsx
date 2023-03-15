import { type UseFormWatch, type UseFormRegister } from "react-hook-form";
import { type FormData } from "~/types/createProperty";

type Props = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  step: number;
};

export default function Characteristics({ register }: Props) {
  return (
    <>
      <div className="grid">
        <label htmlFor="ambiences">Ambientes</label>
        <input
          id="ambiences"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="4"
          {...register("propertyInfo.ambiences", { valueAsNumber: true })}
        />
      </div>

      <div className="grid">
        <label htmlFor="bathromms">Baños</label>
        <input
          id="bathrooms"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="2"
          {...register("propertyInfo.bathrooms", { valueAsNumber: true })}
        />
      </div>

      <div className="grid">
        <label htmlFor="bedrooms">Habitaciones</label>
        <input
          id="bedrooms"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="2"
          {...register("propertyInfo.bedrooms", { valueAsNumber: true })}
        />
      </div>

      <div className="grid">
        <label htmlFor="surface">Superficie m²</label>
        <input
          id="surface"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="1200"
          {...register("propertyInfo.surface", { valueAsNumber: true })}
        />
      </div>

      <div className="grid">
        <label htmlFor="buildYear">Año construcción</label>
        <input
          id="buildYear"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="2003"
          {...register("propertyInfo.buildYear", { valueAsNumber: true })}
        />
      </div>
    </>
  );
}
