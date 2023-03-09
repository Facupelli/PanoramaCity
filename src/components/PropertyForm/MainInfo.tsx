import { UseFormWatch, type UseFormRegister } from "react-hook-form";
import Fieldset from "../UI/FieldSet";
import { type FormData } from "~/types/createProperty";
import { type PropertyType, type Property } from "~/types/model";

type Props = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  propertyTypes: PropertyType[];
};

export default function MainInfo({ register, watch, propertyTypes }: Props) {
  return (
    <Fieldset title="Información principal">
      <select className="p-2" {...register("typeId")}>
        {propertyTypes?.map((type) => (
          <option value={type.id} key={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <select className="p-2" {...register("operation")}>
        <option>Venta</option>
        <option>Alquiler</option>
      </select>

      <input
        className="p-2"
        type="text"
        required
        placeholder="Título"
        {...register("title")}
      />
      <input
        className="p-2"
        type="text"
        required
        placeholder="Descripción"
        {...register("description")}
      />
      <input
        className="p-2"
        type="text"
        required
        placeholder="Precio"
        {...register("price")}
      />
    </Fieldset>
  );
}
