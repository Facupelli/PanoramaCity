import { type UseFormRegister } from "react-hook-form";
import { type FiltersData } from "../Filters/Filters";

type Props = {
  register: UseFormRegister<FiltersData>;
  field:
    | "type"
    | "price"
    | "ambiences"
    | "bathrooms"
    | "bedrooms"
    | "surface"
    | `type.${number}`
    | "price.min"
    | "price.max"
    | `ambiences.${number}`
    | `bathrooms.${number}`
    | `bedrooms.${number}`
    | "surface.min"
    | "surface.max";
};

export default function RadioFilters({ register, field }: Props) {
  return (
    <div className="ml-auto flex gap-2 ">
      <div className=" flex h-10 w-10 items-center justify-center rounded-full border border-marino">
        <label htmlFor={`${field}.1`} className="cursor-pointer">
          1+
        </label>
        <input
          id={`${field}.1`}
          type="radio"
          value={1}
          {...register(field)}
          className="hidden"
        />
      </div>
      <div className=" flex h-10 w-10 items-center justify-center rounded-full border border-marino">
        <label htmlFor={`${field}.2`} className="cursor-pointer">
          +2
        </label>
        <input
          id={`${field}.2`}
          type="radio"
          value={2}
          {...register(field)}
          className="hidden"
        />
      </div>
      <div className=" flex h-10 w-10 items-center justify-center rounded-full border border-marino">
        <label htmlFor={`${field}.3`} className="cursor-pointer">
          +3
        </label>
        <input
          id={`${field}.3`}
          type="radio"
          value={3}
          {...register(field)}
          className="hidden"
        />
      </div>
      <div className=" flex h-10 w-10 items-center justify-center rounded-full border border-marino">
        <label htmlFor={`${field}.4`} className="cursor-pointer">
          +4
        </label>
        <input
          id={`${field}.4`}
          type="radio"
          value={4}
          {...register(field)}
          className="hidden"
        />
      </div>
    </div>
  );
}
