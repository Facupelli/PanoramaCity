import Image from "~/icons/Image";
import Tour from "~/icons/Tour";
import Video from "~/icons/Video";
import FavButton from "../UI/FavButton";

export default function GalleryButtons() {
  return (
    <div className="flex items-center ">
      <div className="flex max-w-sm grow items-center gap-4 font-semibold">
        <button className="flex grow items-center justify-around rounded-sm border border-neutral-200 bg-white p-3">
          <Tour />
          Tour
        </button>
        <button className="flex grow items-center justify-around rounded-sm border border-neutral-200 bg-white p-3">
          <Image />
          Fotos
        </button>
        <button className="flex grow items-center justify-around rounded-sm border border-neutral-200 bg-white p-3">
          <Video />
          Video
        </button>
      </div>
      <div className="ml-auto">
        <FavButton size={20} />
      </div>
    </div>
  );
}
