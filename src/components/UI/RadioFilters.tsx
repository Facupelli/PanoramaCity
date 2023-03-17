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
    | `ambiences`
    | `bathrooms`
    | `bedrooms`
    | "surface.min"
    | "surface.max";
  active: string;
};

export default function RadioFilters({ register, field, active }: Props) {
  return (
    <div className="ml-auto flex gap-2 ">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border  ${
          active === "1"
            ? "border-[#79AADB] bg-neutral-100 font-medium"
            : "border-s-blue"
        }`}
      >
        <label htmlFor={`${field}.1`} className="cursor-pointer">
          +1
        </label>
        <input
          id={`${field}.1`}
          type="radio"
          value={1}
          {...register(field)}
          className="hidden"
        />
      </div>
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border  ${
          active === "2"
            ? "border-[#79AADB] bg-neutral-100 font-medium"
            : "border-s-blue"
        }`}
      >
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
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border  ${
          active === "3"
            ? "border-[#79AADB] bg-neutral-100 font-medium"
            : "border-s-blue"
        }`}
      >
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
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border  ${
          active === "4"
            ? "border-[#79AADB] bg-neutral-100 font-medium"
            : "border-s-blue"
        }`}
      >
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
