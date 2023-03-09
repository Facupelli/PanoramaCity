import FavButton from "../UI/FavButton";

export default function GalleryButtons() {
  return (
    <div className="flex items-center ">
      <div className="flex max-w-xs grow items-center gap-4 font-semibold">
        <button className="grow rounded-sm border border-neutral-200 bg-white p-2">
          360°
        </button>
        <button className="grow rounded-sm border border-neutral-200 bg-white p-2">
          Fotos
        </button>
        <button className="grow rounded-sm border border-neutral-200 bg-white p-2">
          Video
        </button>
      </div>
      <div className="ml-auto">
        <FavButton size={20} />
      </div>
    </div>
  );
}
