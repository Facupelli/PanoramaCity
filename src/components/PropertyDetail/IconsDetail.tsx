import { formatSurface } from "~/components/utils/surface";

import Bath from "~/icons/Bath";
import Ruler from "~/icons/Ruler";
import Ambiences from "~/icons/Ambiences";
import Bed from "~/icons/Bed";
import Calendar from "~/icons/Calendar";
import Building from "~/icons/Building";
import Compass from "~/icons/Compass";

import { type Property } from "~/types/model";

type Props = {
  property: Property;
};

export default function IconDetails({ property }: Props) {
  return (
    <div className="grid gap-2">
      <div className="flex gap-4">
        <div className="grid">
          <div>
            <Ambiences stroke={1.5} />
          </div>
          <p className="text-sm text-neutral-500">
            {property.propertyInfo?.ambiences}{" "}
            {property.propertyInfo && property.propertyInfo.ambiences > 1
              ? "ambientes"
              : "ambiente"}
          </p>
        </div>
        <div className="grid">
          <div>
            <Bed />
          </div>
          <p className="text-sm text-neutral-500">
            {property.propertyInfo?.bedrooms}{" "}
            {property.propertyInfo && property.propertyInfo.bedrooms > 1
              ? "habitaciones"
              : "habitación"}
          </p>
        </div>
        <div className="grid">
          <div>
            <Bath />
          </div>
          <p className="text-sm text-neutral-500">
            {property.propertyInfo?.bathrooms}{" "}
            {property.propertyInfo && property.propertyInfo?.bathrooms > 1
              ? "baños"
              : "baño"}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        {property.type?.name === "Departamento" && (
          <div className="grid">
            <div>
              <Building />
            </div>
            <p className="text-sm text-neutral-500">
              {`${property.propertyInfo?.floor as string}°`} piso
            </p>
          </div>
        )}
        <div className="grid">
          <div>
            <Compass />
          </div>
          <p className="text-sm text-neutral-500">
            orientación {property.propertyInfo?.orientation}
          </p>
        </div>
        <div className="grid">
          <div>
            <Ruler stroke={1.5} />
          </div>
          <p className="text-sm text-neutral-500">
            {formatSurface(property.propertyInfo?.surface ?? 0)}m²
          </p>
        </div>
        <div className="grid">
          <div>
            <Calendar />
          </div>
          <p className="text-sm text-neutral-500">
            {property.propertyInfo?.buildYear} construcción
          </p>
        </div>
      </div>
    </div>
  );
}
