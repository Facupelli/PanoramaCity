import { UseFormWatch, type UseFormRegister } from "react-hook-form";
import { type Property } from "~/types/model";
import Fieldset from "../UI/FieldSet";

type Props = {
  register: UseFormRegister<Property>;
  watch: UseFormWatch<Property>;
};

export default function MainInfo({ register, watch }: Props) {
  return (
    <Fieldset title="Información principal">
      <select className="p-2" {...register("typeId")}>
        <option>Casa</option>
        <option>Departamento</option>
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
