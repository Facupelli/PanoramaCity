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
    <>
      <div className="grid">
        <label htmlFor="type">Tipo de inmueble</label>
        <select id="type" className="p-2" {...register("typeId")}>
          {propertyTypes?.map((type) => (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        <label htmlFor="operation">Operación</label>
        <select id="operation" className="p-2" {...register("operation")}>
          <option>Venta</option>
          <option>Alquiler</option>
        </select>
      </div>

      <div className="grid">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          className="p-2"
          type="text"
          required
          placeholder="Departamento en San Juan centro 540m"
          {...register("title")}
        />
      </div>

      <div className="grid">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          className="p-2"
          required
          placeholder="Breve Descripción del inmueble"
          {...register("description")}
        />
      </div>

      <div className="grid">
        <label htmlFor="price">Precio</label>
        <input
          id="price"
          className="p-2"
          type="text"
          required
          placeholder="15.000"
          {...register("price")}
        />
      </div>
    </>
  );
}
