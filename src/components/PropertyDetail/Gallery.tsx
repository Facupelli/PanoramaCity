import Image from "next/image";
import Carousel from "nuka-carousel/lib/carousel";
import ChevronLeft from "~/icons/ChevronLeft";
import ChevronRight from "~/icons/ChevronRight";
import { type MediaActive } from "~/pages/property/[id]";
import { type PropertyMedia } from "~/types/model";

export type Props = {
  propertyMedia: PropertyMedia;
  mediaActive: MediaActive;
};

export default function Gallery({ propertyMedia, mediaActive }: Props) {
  const propImages = JSON.parse(propertyMedia.images) as { images: string[] };

  if (mediaActive.tour) {
    return (
      <div className="aspect-[16/6] w-full">
        <iframe
          width="100%"
          height="100%"
          // src="https://my.matterport.com/show/?m=KpBQUvEMirJ"
          src="https://tour.metareal.com/apps/player?asset=9be7133d-0eda-4672-bf3c-51bf6b8f88fb&position=-6.40x1.58y5.38z&rotation=6.53x-19.14y0.00z"
          allow="xr-spatial-tracking"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  if (mediaActive.images) {
    return (
      <div className="aspect-[16/6] w-full">
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
          {propImages?.images.map((image) => (
            <div key={image} className="relative aspect-[16/6] w-full bg-white">
              <Image
                style={{ objectFit: "contain" }}
                src={image}
                alt={image}
                fill
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }

  if (mediaActive.video) {
    return (
      <div className="aspect-[16/6] w-full">
        <iframe
          width="100%"
          height="100%"
          // src="https://my.matterport.com/show/?m=KpBQUvEMirJ"
          src={propertyMedia.video}
          allow="xr-spatial-tracking"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return <div className="aspect-[16/6] w-full">Media error</div>;
}
