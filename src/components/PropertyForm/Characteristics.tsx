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
      <input
        className="p-2"
        type="text"
        required
        placeholder="Ambientes"
        {...register("propertyInfo.ambiences")}
      />
      <input
        className="p-2"
        type="text"
        required
        placeholder="Baños"
        {...register("propertyInfo.bathrooms")}
      />
      <input
        className="p-2"
        type="text"
        required
        placeholder="Habitaciones"
        {...register("propertyInfo.bedrooms")}
      />

      <input
        className="p-2"
        type="text"
        required
        placeholder="Superficie m²"
        {...register("propertyInfo.surface")}
      />
      <input
        className="p-2"
        type="text"
        required
        placeholder="Año construcción"
        {...register("propertyInfo.buildYear")}
      />
    </Fieldset>
  );
}
