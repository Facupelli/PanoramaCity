import FavButton from "../UI/FavButton";

import Video from "~/icons/Video";
import ImageIcon from "~/icons/Image";
import Tour from "~/icons/Tour";

import { type MediaActive } from "~/pages/property/[id]";
import { type Dispatch, type SetStateAction } from "react";
import GoBackButton from "../UI/GoBackButton";

type Props = {
  mediaActive: MediaActive;
  setMediaActive: Dispatch<SetStateAction<MediaActive>>;
};

export default function GalleryButtons({ mediaActive, setMediaActive }: Props) {
  return (
    <section className="flex items-center ">
      <div className="flex max-w-sm grow items-center gap-4 font-semibold">
        <div className="flex grow items-center justify-center">
          <GoBackButton />
        </div>
        <button
          onClick={() => {
            setMediaActive({ images: false, video: false, tour: true });
          }}
          className={`flex grow items-center justify-around rounded border border-neutral-200 p-3 ${
            mediaActive.tour ? "bg-s-blue text-white" : "bg-white"
          }`}
        >
          <Tour color={mediaActive.tour ? "#ffffff" : "#000000"} />
          Tour
        </button>
        <button
          onClick={() => {
            setMediaActive({ images: true, video: false, tour: false });
          }}
          className={`flex grow items-center justify-around rounded border border-neutral-200 p-3 ${
            mediaActive.images ? "bg-s-blue text-white" : "bg-white"
          }`}
        >
          <ImageIcon color={mediaActive.images ? "#ffffff" : "#000000"} />
          Fotos
        </button>
        <button
          onClick={() => {
            setMediaActive({ images: false, video: true, tour: false });
          }}
          className={`flex grow items-center justify-around rounded border border-neutral-200 p-3 ${
            mediaActive.video ? "bg-s-blue text-white" : "bg-white"
          }`}
        >
          <Video color={mediaActive.video ? "#ffffff" : "#000000"} />
          Video
        </button>
      </div>
      <div className="ml-auto">
        <FavButton size={20} />
      </div>
    </section>
  );
}
