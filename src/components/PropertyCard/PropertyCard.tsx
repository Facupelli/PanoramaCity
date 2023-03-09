import Image from "next/image";
import { useRouter } from "next/router";
import Carousel from "nuka-carousel/lib/carousel";
import ChevronLeft from "~/icons/ChevronLeft";
import ChevronRight from "~/icons/ChevronRight";
import Heart from "~/icons/Heart";
import { formatPrice } from "../utils/price";
import { formatSurface } from "../utils/surface";
import { type Property } from "~/types/model";
import { useRef } from "react";

type Props = {
  property: Property;
  activeProperty: string;
};

export default function PropertyCard({ property, activeProperty }: Props) {
  const router = useRouter();

  const cardRef = useRef<HTMLDivElement>(null);

  if (property.id === activeProperty && cardRef.current) {
    cardRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <article
      ref={cardRef}
      className={`w-full min-w-[280px] scroll-m-44 rounded-lg bg-white shadow-sm ${
        activeProperty === property.id
          ? "border border-oliva shadow-lg"
          : "border border-white"
      }`}
    >
      <Carousel
        dragging={true}
        swiping={true}
        style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        defaultControlsConfig={{
          nextButtonStyle: {
            backgroundColor: "transparent",
            filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))",
          },
          prevButtonStyle: {
            backgroundColor: "transparent",
            filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))",
          },
          nextButtonText: <ChevronRight />,
          prevButtonText: <ChevronLeft />,
          pagingDotsStyle: {
            padding: "0 2px",
          },
        }}
      >
        <div className="relative h-52 w-full rounded-lg bg-slate-50">
          <Image
            src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt={property.id}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative h-52 w-full bg-slate-50 ">
          <Image
            src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt={property.id}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative h-52 w-full bg-slate-50 ">
          <Image
            src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt={property.id}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative h-52 w-full bg-slate-50 ">
          <Image
            src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt={property.id}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </Carousel>
      <section className="grid gap-y-1 py-2 px-4 font-barlow">
        <p className=" text-sm text-neutral-600">{property.type?.name}</p>
        <div className="grid ">
          <p className="font-semibold">{property.propertyInfo?.address}</p>
          <p className=" text-sm text-neutral-600">{`${property.propertyInfo?.zone}, ${property.propertyInfo?.city}`}</p>
        </div>
        <div className="flex gap-x-4 ">
          <p>{formatSurface(property.propertyInfo?.surface ?? 0)} m²</p>
          <p>{property.propertyInfo?.ambiences} amb</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-bold">{formatPrice(property.price)}</p>
          <div className="flex items-center">
            <button
              aria-label="fav-button"
              className="rounded-full border border-neutral-400 p-1 text-sm font-semibold text-oliva"
            >
              <Heart />
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}
