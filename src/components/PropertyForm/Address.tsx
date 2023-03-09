import { UseFormWatch, type UseFormRegister } from "react-hook-form";
import { provinces } from "~/assets/provinces";
import { type Property } from "~/types/model";
import Fieldset from "../UI/FieldSet";

type Props = {
  register: UseFormRegister<Property>;
  watch: UseFormWatch<Property>;
};

export default function Address({ register, watch }: Props) {
  const propertyType = watch("typeId");

  return (
    <Fieldset title="Dirección">
      <select {...register("propertyInfo.city")}>
        <option>San Juan</option>
      </select>
      <select {...register("propertyInfo.zone")}>
        {provinces.map((province) => (
          <option key={province.id}>{province.nombre}</option>
        ))}
      </select>
      <input
        type="text"
        required
        placeholder="Dirección"
        {...register("propertyInfo.address")}
      />
      {propertyType === "Deparamento" && (
        <input
          type="text"
          required
          placeholder="Dirección"
          {...register("propertyInfo.floor")}
        />
      )}
      <input
        type="text"
        required
        placeholder="Orientación"
        {...register("propertyInfo.orientation")}
      />
    </Fieldset>
  );
}
