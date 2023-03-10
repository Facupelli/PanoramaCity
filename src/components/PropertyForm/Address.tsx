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
      <div className="grid">
        <label htmlFor="city">Ciudad</label>
        <select id="city" className="p-2" {...register("propertyInfo.city")}>
          <option>San Juan</option>
        </select>
      </div>

      <div className="grid">
        <label htmlFor="zone">Departamento</label>
        <select id="zone" className="p-2" {...register("propertyInfo.zone")}>
          {provinces.map((province) => (
            <option key={province.id}>{province.nombre}</option>
          ))}
        </select>
      </div>

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

      <div className="grid">
        <label htmlFor="address">Dirección</label>
        <input
          id="address"
          className="p-2"
          type="text"
          required
          placeholder="Los Cedros 4234 oeste"
          {...register("propertyInfo.address")}
        />
      </div>

      {propertyType === "clf1mbf010000e7vkfto3gjcp" && (
        <div className="grid">
          <label htmlFor="floor">Piso</label>
          <input
            id="floor"
            className="p-2"
            type="text"
            required
            placeholder="3"
            {...register("propertyInfo.floor")}
          />
        </div>
      )}

      <div className="grid">
        <label htmlFor="orientation">Orientación</label>
        <input
          id="orientation"
          className="p-2"
          type="text"
          required
          placeholder="Oeste"
          {...register("propertyInfo.orientation")}
        />
      </div>
    </Fieldset>
  );
}
