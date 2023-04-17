import { type Dispatch, type SetStateAction } from "react";

import FavButton from "../UI/FavButton";
import GoBackButton from "../UI/GoBackButton";

import Video from "~/icons/Video";
import ImageIcon from "~/icons/Image";
import Tour from "~/icons/Tour";

import { type MediaActive } from "~/pages/property/[id]";

type Props = {
  mediaActive: MediaActive;
  setMediaActive: Dispatch<SetStateAction<MediaActive>>;
};

export default function GalleryButtons({ mediaActive, setMediaActive }: Props) {
  const buttonClass =
    "flex items-center justify-around gap-2 rounded border border-neutral-200 px-2 py-2 sm:px-6";
  return (
    <section className="grid gap-2">
      <GoBackButton />
      <div className="flex grow flex-wrap items-center justify-between gap-4 font-semibold">
        <button
          onClick={() => {
            setMediaActive({ images: false, video: false, tour: true });
          }}
          className={`${buttonClass} ${
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
          className={`${buttonClass} ${
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
          className={`${buttonClass} ${
            mediaActive.video ? "bg-s-blue text-white" : "bg-white"
          }`}
        >
          <Video color={mediaActive.video ? "#ffffff" : "#000000"} />
          Video
        </button>
        <div className="ml-auto">
          <FavButton size={20} />
        </div>
      </div>
    </section>
  );
}
