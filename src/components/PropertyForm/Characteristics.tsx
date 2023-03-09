import { UseFormWatch, type UseFormRegister } from "react-hook-form";
import { type Property } from "~/types/model";
import Fieldset from "../UI/FieldSet";

type Props = {
  register: UseFormRegister<Property>;
  watch: UseFormWatch<Property>;
};

export default function Characteristics({ register, watch }: Props) {
  return (
    <Fieldset title="Características del inmueble">
      <input
        type="text"
        required
        placeholder="Ambientes"
        {...register("propertyInfo.ambiences")}
      />
      <input
        type="text"
        required
        placeholder="Baños"
        {...register("propertyInfo.bathrooms")}
      />
      <input
        type="text"
        required
        placeholder="Habitaciones"
        {...register("propertyInfo.bedrooms")}
      />

      <input
        type="text"
        required
        placeholder="Superficie m²"
        {...register("propertyInfo.surface")}
      />
      <input
        type="text"
        required
        placeholder="Año construcción"
        {...register("propertyInfo.buildYear")}
      />
    </Fieldset>
  );
}
