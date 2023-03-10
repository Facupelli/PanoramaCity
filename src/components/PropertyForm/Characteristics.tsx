import { UseFormWatch, type UseFormRegister } from "react-hook-form";
import Fieldset from "../UI/FieldSet";
import { type FormData } from "~/types/createProperty";

type Props = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
};

export default function Characteristics({ register, watch }: Props) {
  return (
    <Fieldset title="Características del inmueble">
      <div className="grid">
        <label htmlFor="ambiences">Ambientes</label>
        <input
          id="ambiences"
          className="p-2"
          type="text"
          required
          placeholder="4"
          {...register("propertyInfo.ambiences")}
        />
      </div>

      <div className="grid">
        <label htmlFor="bathromms">Baños</label>
        <input
          id="bathrooms"
          className="p-2"
          type="text"
          required
          placeholder="2"
          {...register("propertyInfo.bathrooms")}
        />
      </div>

      <div className="grid">
        <label htmlFor="bedrooms">Habitaciones</label>
        <input
          id="bedrooms"
          className="p-2"
          type="text"
          required
          placeholder="2"
          {...register("propertyInfo.bedrooms")}
        />
      </div>

      <div className="grid">
        <label htmlFor="surface">Superficie m²</label>
        <input
          id="surface"
          className="p-2"
          type="text"
          required
          placeholder="1200"
          {...register("propertyInfo.surface")}
        />
      </div>

      <div className="grid">
        <label htmlFor="buildYear">Año construcción</label>
        <input
          id="buildYear"
          className="p-2"
          type="text"
          required
          placeholder="2003"
          {...register("propertyInfo.buildYear")}
        />
      </div>
    </Fieldset>
  );
}
