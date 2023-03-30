import type {
  UseFormWatch,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { type FormData } from "~/types/createProperty";
import type { PropertyType, Operation } from "~/types/model";

type Props = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  propertyTypes: PropertyType[];
  operations: Operation[];
  errors: FieldErrors<FormData>;
};

export default function MainInfo({
  register,
  // watch,
  propertyTypes,
  operations,
  errors,
}: Props) {
  return (
    <>
      <div className="grid">
        <label htmlFor="type">Tipo de inmueble</label>
        <select
          id="type"
          className="rounded-md border border-neutral-200  p-2"
          {...register("typeId")}
        >
          {propertyTypes?.map((type) => (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        <label htmlFor="operation">Operación</label>
        <select
          id="operation"
          className="rounded-md border border-neutral-200  p-2"
          {...register("operationId")}
        >
          {operations?.map((operation) => (
            <option value={operation.id} key={operation.id}>
              {operation.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="Departamento en San Juan centro 540m"
          {...register("title")}
        />
        {errors.title && (
          <p className="pt-1 text-sm text-red-700">{errors.title.message}</p>
        )}
      </div>

      <div className="grid">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          className="rounded-md border border-neutral-200  p-2"
          required
          placeholder="Breve Descripción del inmueble"
          {...register("description")}
        />
        {errors.title && (
          <p className="pt-1 text-sm text-red-700">{errors.title.message}</p>
        )}
      </div>

      <div className="grid">
        <label htmlFor="price">Precio</label>
        <input
          id="price"
          className="rounded-md border border-neutral-200  p-2"
          type="text"
          required
          placeholder="15.000"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="pt-1 text-sm text-red-700">{errors.price.message}</p>
        )}
      </div>
    </>
  );
}
