import Image from "next/image";
import { useRouter } from "next/router";
import Carousel from "nuka-carousel/lib/carousel";
import { useRef } from "react";

import FavButton from "../UI/FavButton";
import ChevronLeft from "~/icons/ChevronLeft";
import ChevronRight from "~/icons/ChevronRight";

import { formatSurface } from "../utils/surface";
import { formatPrice } from "../utils/price";

import { type Property } from "~/types/model";
import Ruler from "~/icons/Ruler";
import Ambiences from "~/icons/Ambiences";
import Link from "next/link";

type Props = {
  property: Property;
  activeProperty?: string;
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
      className={`w-full min-w-[300px] cursor-pointer scroll-m-44 rounded-lg bg-white font-barlow shadow-sm ${
        activeProperty === property.id ? "animate-[blink_0.6s_ease-out_2]" : ""
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
            src="https://panorama-city.s3.sa-east-1.amazonaws.com/images/sdf/cart2.png"
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
      <Link href={`/property/${property.id}`}>
        <div className="grid  gap-y-1 py-2 px-4 ">
          <p className=" text-sm text-neutral-600">{property.type?.name}</p>
          <div className="grid ">
            <h1 className="text-lg font-semibold">
              {property.propertyInfo?.address}
            </h1>
            <p className=" text-sm text-neutral-600">{`${
              property.propertyInfo?.zone ?? ""
            }, ${property.propertyInfo?.city ?? ""}`}</p>
          </div>
          <div className="flex gap-x-6 py-2">
            <div className="flex items-center gap-1">
              <Ruler stroke={1} />
              <p>{formatSurface(property.propertyInfo?.surface ?? 0)} m²</p>
            </div>
            <div className="flex items-center gap-1">
              <Ambiences stroke={1} />
              <p>{property.propertyInfo?.ambiences ?? 0} amb</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between rounded-b-lg bg-neutral-50 py-2 px-4 ">
          <p className="text-xl font-bold">{formatPrice(property.price)}</p>
          <div className="flex items-center ">
            <FavButton size={15} border />
          </div>
        </div>
      </Link>
    </article>
  );
}
