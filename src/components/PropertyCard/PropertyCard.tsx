import Image from "next/image";
import Carousel from "nuka-carousel/lib/carousel";
import ChevronLeft from "~/icons/ChevronLeft";
import ChevronRight from "~/icons/ChevronRight";
import { type Property } from "~/types/model";
import { formatPrice } from "../utils/price";
import { formatSurface } from "../utils/surface";

type Props = {
  property: Property;
};

export default function PropertyCard({ property }: Props) {
  return (
    <article className="w-p-card rounded-lg bg-white shadow-sm">
      <Carousel
        dragging={true}
        swiping={true}
        style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        // renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
        //   <button onClick={previousSlide} disabled={previousDisabled}>
        //     {"<"}
        //   </button>
        // )}
        // renderCenterRightControls={({ nextDisabled, nextSlide }) => (
        //   <button onClick={nextSlide} disabled={nextDisabled}>
        //     {">"}
        //   </button>
        // )}
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
      <section className="grid gap-y-1 p-2 font-barlow">
        <p className=" text-sm text-neutral-600">{property.type?.name}</p>
        <div className="grid ">
          <p className="font-semibold">{property.propertyInfo?.address}</p>
          <p className=" text-sm text-neutral-600">{`${property.propertyInfo?.zone}, ${property.propertyInfo?.city}`}</p>
        </div>
        <div className="flex gap-x-4 ">
          <p>{formatSurface(property.propertyInfo?.surface ?? 0)} m²</p>
          <p>{property.propertyInfo?.ambiences} amb.</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-bold">{formatPrice(property.price)}</p>
          <div>
            <button className="text-sm font-semibold text-oliva">FAV</button>
          </div>
        </div>
      </section>
    </article>
  );
}
