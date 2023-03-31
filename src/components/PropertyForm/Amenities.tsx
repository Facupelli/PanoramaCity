import { type UseFormRegister, type UseFormWatch } from "react-hook-form";
import { type FormData } from "~/types/createProperty";
import { type Amenity, type Utility } from "~/types/model";

type Props = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  amenities: Amenity[];
  utilites: Utility[];
};

export default function Amenities({
  register,
  amenities,
  utilites,
  watch,
}: Props) {
  const amenitiesFilter = watch("amenities");
  const utilitiesFilter = watch("utilities");

  const setValueAsArray = (value: "string" | boolean) => {
    if (value === false) {
      return [];
    }
    return value;
  };

  return (
    <>
      <div className="grid gap-2 ">
        <label className="pb-2 font-semibold" htmlFor="surface">
          Comodidades
        </label>
        <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-3">
          {amenities?.map((amenity) => (
            <div key={amenity.id} className="col-span-1">
              <label
                className={`cursor-pointer whitespace-nowrap rounded-lg border p-1 text-sm sm:text-base ${
                  amenitiesFilter &&
                  amenitiesFilter?.find((a) => a === amenity.id)
                    ? "border-t-blue text-t-blue "
                    : "border-white"
                }`}
                htmlFor={`amenity/${amenity.name}`}
              >
                {amenity.name}
              </label>
              <input
                {...register("amenities", { setValueAs: setValueAsArray })}
                className="hidden"
                value={amenity.id}
                type="checkbox"
                id={`amenity/${amenity.name}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-2 ">
        <label className="pb-2 font-semibold" htmlFor="surface">
          Utilidades
        </label>
        <div className="grid grid-cols-3 gap-y-3">
          {utilites?.map((utility) => (
            <div key={utility.id} className="col-span-1">
              <label
                className={`cursor-pointer whitespace-nowrap rounded-lg border p-1 text-sm sm:text-base ${
                  utilitiesFilter &&
                  utilitiesFilter?.find((a) => a === utility.id)
                    ? "border-t-blue text-t-blue "
                    : "border-white"
                }`}
                htmlFor={`amenity/${utility.name}`}
              >
                {utility.name}
              </label>
              <input
                {...register("utilities", { setValueAs: setValueAsArray })}
                className="hidden"
                value={utility.id}
                type="checkbox"
                id={`amenity/${utility.name}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
