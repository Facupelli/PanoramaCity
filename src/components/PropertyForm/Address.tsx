import { UseFormWatch, type UseFormRegister } from "react-hook-form";
import { provinces } from "~/assets/provinces";
import Fieldset from "../UI/FieldSet";
import { type FormData } from "~/types/createProperty";
import axios from "axios";
import { useEffect } from "react";
// import Autocomplete from "./Autocomplete";
import Autocomplete from "react-google-autocomplete";

type Props = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
};

export default function Address({ register, watch }: Props) {
  const propertyType = watch("typeId");
  const address = watch("propertyInfo.address");

  const getPredictions = async (input: string) => {};

  useEffect(() => {}, [address]);

  return (
    <Fieldset title="Dirección">
      <select className="p-2" {...register("propertyInfo.city")}>
        <option>San Juan</option>
      </select>
      <select className="p-2" {...register("propertyInfo.zone")}>
        {provinces.map((province) => (
          <option key={province.id}>{province.nombre}</option>
        ))}
      </select>

      <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
        options={{
          types: ["address"],
          setComponentRestrictions: "ar",
        }}
      />

      {/* <Autocomplete /> */}

      <input
        className="p-2"
        type="text"
        required
        placeholder="Dirección"
        {...register("propertyInfo.address")}
      />
      {propertyType === "clf1mbf010000e7vkfto3gjcp" && (
        <input
          className="p-2"
          type="text"
          required
          placeholder="Piso"
          {...register("propertyInfo.floor")}
        />
      )}
      <input
        className="p-2"
        type="text"
        required
        placeholder="Orientación"
        {...register("propertyInfo.orientation")}
      />
    </Fieldset>
  );
}
